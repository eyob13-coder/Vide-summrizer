import fs from 'fs/promises';
import path from 'path';
import { Whisper } from 'whisper-turbo';

export default {
  /**
   * Process Zoom recording file
   * @param {string} filePath - Path to Zoom recording (MP4/MP3)
   * @returns {Promise<Object>} 
   */
  async processRecording(filePath) {
    const whisper = new Whisper('tiny.en');
    
    // 1. Extract audio if video
    const isVideo = filePath.endsWith('.mp4');
    const audioPath = isVideo 
      ? await this._extractAudio(filePath)
      : filePath;

    // 2. Transcribe
    const transcription = await whisper.transcribe(audioPath);

    // 3. Cleanup
    if (isVideo) await fs.unlink(audioPath);

    return {
      duration: this._getDuration(transcription),
      transcript: transcription.text,
      segments: transcription.segments.map(seg => ({
        start: seg.start,
        end: seg.end,
        text: seg.text
      }))
    };
  },

  async _extractAudio(videoPath) {
    const audioPath = videoPath.replace('.mp4', '.wav');
    await new Promise((resolve, reject) => {
      ffmpeg(videoPath)
        .noVideo()
        .audioCodec('pcm_s16le')
        .output(audioPath)
        .on('end', resolve)
        .on('error', reject)
        .run();
    });
    return audioPath;
  },

  _getDuration(transcription) {
    if (!transcription.segments.length) return 0;
    const lastSegment = transcription.segments[transcription.segments.length - 1];
    return lastSegment.end;
  }
};