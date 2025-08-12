import axios from 'axios';
import fs from 'fs/promises';
import path from 'path';

export default {
  /**
   * Fetch Twitch clip/stream data
   * @param {string} url - Twitch clip URL or stream ID
   * @returns {Promise<Object>} 
   */
  async fetchStreamData(url) {
    const isClip = url.includes('clip.twitch.tv');
    const id = isClip 
      ? url.match(/clip\.twitch\.tv\/([a-zA-Z0-9_-]+)/)?.[1] 
      : url.match(/twitch\.tv\/([a-zA-Z0-9_-]+)/)?.[1];

    if (!id) throw new Error('Invalid Twitch URL');

    return isClip 
      ? this._fetchClipData(id)
      : this._fetchStreamData(id);
  },

  async _fetchClipData(clipId) {
    // Use Twitch's public GraphQL endpoint
    const response = await axios.post(
      'https://gql.twitch.tv/gql',
      {
        query: `{
          clip(slug: "${clipId}") {
            title
            thumbnailURL
            durationSeconds
            video {
              id
            }
            broadcaster {
              displayName
            }
          }
        }`
      },
      {
        headers: {
          'Client-ID': 'kimne78kx3ncx6brgo4mv6wki5h1ko' // Public client ID
        }
      }
    );

    return {
      id: clipId,
      title: response.data.data.clip.title,
      duration: response.data.data.clip.durationSeconds,
      thumbnail: response.data.data.clip.thumbnailURL,
      metadata: {
        broadcaster: response.data.data.clip.broadcaster.displayName,
        type: 'clip'
      }
    };
  },

  async _fetchStreamData(channel) {
    // Use Twitch's unofficial API
    const response = await axios.get(
      `https://twitch-proxy.freecodecamp.rocks/helix/streams?user_login=${channel}`
    );

    if (!response.data.data.length) {
      throw new Error('Stream not live');
    }

    const stream = response.data.data[0];
    return {
      id: stream.id,
      title: stream.title,
      thumbnail: stream.thumbnail_url
        .replace('{width}', '640')
        .replace('{height}', '360'),
      metadata: {
        viewers: stream.viewer_count,
        startedAt: stream.started_at,
        type: 'stream'
      }
    };
  }
};