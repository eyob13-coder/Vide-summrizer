import axios from 'axios';
import { pipeline } from '@xenova/transformers';
import ffmpeg from 'fluent-ffmpeg';
import fs from 'fs/promises';
import path from 'path';

export default {
  /**
   * Fetch YouTube video metadata and comments
   * @param {string} url - YouTube URL or ID
   * @returns {Promise<Object>} Video data with context
   */
  async fetchVideoData(url) {
    // Extract video ID (works with URLs or raw IDs)
    const videoId = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/)?.[1] || url;
    
    // Use YouTube's free oEmbed API for basic data
    const oEmbedResponse = await axios.get(
      `https://www.youtube.com/oembed?url=https://youtube.com/watch?v=${videoId}&format=json`
    );

    // Get comments using scraper (no API key needed)
    const comments = await this._scrapeComments(videoId);

    return {
      id: videoId,
      title: oEmbedResponse.data.title,
      thumbnail: oEmbedResponse.data.thumbnail_url,
      duration: await this._getDuration(videoId),
      comments,
      metadata: {
        author: oEmbedResponse.data.author_name,
        provider: 'youtube'
      }
    };
  },

  /**
   * Download YouTube audio/video (using yt-dlp wrapper)
   * @param {string} videoId 
   * @returns {Promise<string>} Path to downloaded file
   */
  async downloadVideo(videoId) {
    const tempPath = path.join('./tmp', `${videoId}.mp4`);
    
    // Requires yt-dlp installed system-wide
    await new Promise((resolve, reject) => {
      ffmpeg(`https://youtube.com/watch?v=${videoId}`)
        .output(tempPath)
        .audioCodec('copy')
        .videoCodec('copy')
        .on('end', resolve)
        .on('error', reject)
        .run();
    });

    return tempPath;
  },

  // Private methods
  async _scrapeComments(videoId, limit = 50) {
    // Fallback: Use a lightweight scraper
    try {
      const response = await axios.get(
        `https://yt-comments-scraper.vercel.app/api/comments?videoId=${videoId}&limit=${limit}`
      );
      return response.data.comments;
    } catch (error) {
      console.error('Failed to scrape comments:', error);
      return [];
    }
  },

  async _getDuration(videoId) {
    try {
      const response = await axios.get(
        `https://www.youtube.com/get_video_info?video_id=${videoId}`
      );
      const durationMatch = response.data.match(/length_seconds=(\d+)/);
      return durationMatch ? parseInt(durationMatch[1]) : 0;
    } catch {
      return 0;
    }
  }
};