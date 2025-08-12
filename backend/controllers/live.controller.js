import { pipeline } from '@xenova/transformers';
import { Whisper } from 'whisper-turbo';
import ffmpeg from 'fluent-ffmpeg';
import { WebSocketServer } from 'ws';
import fs from 'fs/promises';
import path from 'path';
import dayjs from 'dayjs'

// Initialize models (load once at startup)
let whisper;
let summarizer;
let sceneDetector;

async function initModels() {
  whisper = new Whisper('tiny.en'); // 50MB English-only model
  summarizer = await pipeline('summarization', 'Xenova/bart-large-cnn');
  sceneDetector = await pipeline('image-classification', 'Xenova/vit-base-patch16-224');
}

// Temporary storage
const TEMP_DIR = './tmp';
await fs.mkdir(TEMP_DIR, { recursive: true });

export class LiveController {
  constructor() {
    this.wss = new WebSocketServer({ noServer: true });
    this.sessions = new Map(); // sessionId -> { stream, client }

    this.wss.on('connection', (ws, request) => {
      const sessionId = request.url.split('=')[1];
      this.sessions.set(sessionId, { ws });
      
      ws.on('close', () => this.cleanupSession(sessionId));
    });
  }

  async handleStream(streamUrl, sessionId) {
    const tempFile = path.join(TEMP_DIR, `${sessionId}.webm`);
    const session = this.sessions.get(sessionId);

    // 1. Capture 5-second chunks
    const chunkProcessor = ffmpeg(streamUrl)
      .output(tempFile)
      .duration(5)
      .on('end', async () => {
        const analysis = await this.analyzeChunk(tempFile);
        session.ws.send(JSON.stringify(analysis));
        
        // Process next chunk
        this.handleStream(streamUrl, sessionId); 
      })
      .on('error', err => console.error('FFmpeg error:', err));

    chunkProcessor.run();
  }

  async analyzeChunk(filePath) {
    // 1. Extract audio
    const audioPath = path.join(TEMP_DIR, `audio_${Date.now()}.wav`);
    await new Promise((resolve) => {
      ffmpeg(filePath)
        .noVideo()
        .audioCodec('pcm_s16le')
        .output(audioPath)
        .on('end', resolve)
        .run();
    });

    // 2. Parallel analysis
    const [transcript, frames] = await Promise.all([
      whisper.transcribe(audioPath),
      this.extractKeyFrames(filePath)
    ]);

    // 3. Detect highlights
    const sceneAnalysis = await Promise.all(
      frames.map(frame => sceneDetector(frame))
    );

    // 4. Generate summary
    const summary = await summarizer(transcript.text, {
      max_length: 100,
      min_length: 30
    });

    // Cleanup
    await fs.unlink(audioPath);
    await fs.unlink(filePath);

    return {
      timestamp: Date.now(),
      transcript: transcript.text,
      scenes: sceneAnalysis,
      summary: summary[0].summary_text
    };
  }

  async extractKeyFrames(videoPath, count=3) {
    const tempDir = path.join(TEMP_DIR, 'frames');
    await fs.mkdir(tempDir, { recursive: true });

    await new Promise((resolve) => {
      ffmpeg(videoPath)
        .screenshots({
          count,
          folder: tempDir,
          filename: 'frame_%i.jpg'
        })
        .on('end', resolve);
    });

    const frames = [];
    for (let i = 1; i <= count; i++) {
      const framePath = path.join(tempDir, `frame_${i}.jpg`);
      frames.push(await fs.readFile(framePath));
      await fs.unlink(framePath);
    }
    
    return frames;
  }

  cleanupSession(sessionId) {
    const session = this.sessions.get(sessionId);
    if (session?.stream) session.stream.destroy();
    this.sessions.delete(sessionId);
  }
}

// Initialize models when server starts
await initModels();