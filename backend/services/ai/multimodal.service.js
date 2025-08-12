import { pipeline } from '@xenova/transformers';
import { Whisper } from 'whisper-turbo';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs/promises';
import path from 'path';
import chroma from 'chroma-js';

// Initialize models (load once)
let whisper, summarizer, sceneDetector, emotionAnalyzer;

async function initModels() {
  [whisper, summarizer, sceneDetector, emotionAnalyzer] = await Promise.all([
    new Whisper('tiny.en'), // 50MB English model
    pipeline('summarization', 'Xenova/distilbart-cnn-6-6'), // Lightweight
    pipeline('image-classification', 'Xenova/vit-base-patch16-224'),
    pipeline('text-classification', 'Xenova/distilbert-base-uncased-emotion')
  ]);
}

export default {
  async analyzeVideo(videoPath) {
    // 1. Extract frames and audio
    const [frames, audioPath] = await this._extractMedia(videoPath);

    // 2. Parallel multimodal analysis
    const [transcript, scenes, audioEmotion] = await Promise.all([
      whisper.transcribe(audioPath),
      this._analyzeFrames(frames),
      this._analyzeAudioTone(audioPath)
    ]);

    // 3. Fuse insights
    const highlights = await this._generateHighlights(
      transcript, 
      scenes, 
      audioEmotion
    );

    // 4. Cleanup
    await fs.unlink(audioPath);
    frames.forEach(frame => fs.unlink(frame.path));

    return {
      summary: await summarizer(transcript.text, { max_length: 100 }),
      highlights,
      mood: this._detectDominantMood(highlights)
    };
  },

  // Private methods
  async _extractMedia(videoPath) {
    const tempDir = path.join('./tmp', path.basename(videoPath, '.mp4'));
    await fs.mkdir(tempDir, { recursive: true });

    // Extract 1 frame per second
    const framePaths = [];
    await new Promise((resolve) => {
      ffmpeg(videoPath)
        .screenshots({
          count: 0,
          timestamps: Array.from({ length: 10 }, (_, i) => i + 1),
          folder: tempDir,
          filename: 'frame_%i.jpg'
        })
        .on('end', resolve);
    });

    for (let i = 1; i <= 10; i++) {
      framePaths.push({
        path: path.join(tempDir, `frame_${i}.jpg`),
        timestamp: i
      });
    }

    // Extract audio
    const audioPath = path.join(tempDir, 'audio.wav');
    await new Promise((resolve) => {
      ffmpeg(videoPath)
        .noVideo()
        .audioCodec('pcm_s16le')
        .output(audioPath)
        .on('end', resolve)
        .run();
    });

    return [framePaths, audioPath];
  },

  async _analyzeFrames(frames) {
    return Promise.all(
      frames.map(async (frame) => {
        const img = await fs.readFile(frame.path);
        const predictions = await sceneDetector(img);
        return {
          timestamp: frame.timestamp,
          objects: predictions.map(p => p.label),
          dominantScene: predictions[0]?.label
        };
      })
    );
  },

  async _analyzeAudioTone(audioPath) {
    // Convert audio to spectrogram (visual emotion analysis)
    const spectrogramPath = path.join(path.dirname(audioPath), 'spectrogram.png');
    await new Promise((resolve) => {
      ffmpeg(audioPath)
        .complexFilter('showspectrumpic=s=640x360')
        .output(spectrogramPath)
        .on('end', resolve)
        .run();
    });

    const spectrogram = await fs.readFile(spectrogramPath);
    const analysis = await sceneDetector(spectrogram); // Reuse scene detector
    await fs.unlink(spectrogramPath);

    return {
      emotion: analysis[0]?.label,
      intensity: chroma(analysis[0]?.score * 100).hex()
    };
  },

  async _generateHighlights(transcript, scenes, audioEmotion) {
    // Simple heuristic: combine high-energy scenes with emotional speech
    return scenes.map((scene) => {
      const matchingTranscript = transcript.segments.find(
        seg => Math.abs(seg.start - scene.timestamp) <= 1
      );

      return {
        start: scene.timestamp,
        objects: scene.objects,
        text: matchingTranscript?.text || '',
        emotion: audioEmotion.emotion,
        color: audioEmotion.intensity,
        score: this._calculateHighlightScore(scene, audioEmotion)
      };
    }).filter(h => h.score > 0.5);
  },

  _calculateHighlightScore(scene, audio) {
    // Weights: object diversity + emotion intensity
    const objectScore = scene.objects.length * 0.2;
    const emotionScore = audio.emotion === 'happy' ? 0.8 : 0.3;
    return (objectScore + emotionScore) / 2;
  },

  _detectDominantMood(highlights) {
    const moodCounts = {};
    highlights.forEach(h => {
      moodCounts[h.emotion] = (moodCounts[h.emotion] || 0) + 1;
    });
    return Object.entries(moodCounts).sort((a,b) => b[1] - a[1])[0]?.[0] || 'neutral';
  }
};

// Initialize on startup
await initModels();