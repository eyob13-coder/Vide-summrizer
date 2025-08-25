// Frontend Platform Adapters
// This file provides utility functions for handling different platform content

export const platformAdapters = {
  // Platform detection
  detectPlatform(url) {
    if (url.includes('youtube.com') || url.includes('youtu.be')) return 'youtube';
    if (url.includes('twitch.tv')) return 'twitch';
    if (url.includes('tiktok.com')) return 'tiktok';
    if (url.includes('zoom.us') || url.includes('zoom.gov')) return 'zoom';
    return null;
  },

  // Platform validation
  validateUrl(platform, url) {
    const patterns = {
      youtube: /^(https?:\/\/)?(www\.)?(youtube\.com|youtu\.be)\/.+/,
      twitch: /^(https?:\/\/)?(www\.)?(twitch\.tv|clips\.twitch\.tv)\/.+/,
      tiktok: /^(https?:\/\/)?(www\.)?(tiktok\.com)\/.+/,
      zoom: /^(https?:\/\/)?(www\.)?(zoom\.us|zoom\.gov)\/.+/
    };

    return patterns[platform]?.test(url) || false;
  },

  // Platform icons and colors
  getPlatformInfo(platform) {
    const info = {
      youtube: {
        name: 'YouTube',
        icon: '🎥',
        color: '#FF0000',
        bgColor: 'bg-red-500',
        textColor: 'text-red-500'
      },
      twitch: {
        name: 'Twitch',
        icon: '🎮',
        color: '#9146FF',
        bgColor: 'bg-purple-500',
        textColor: 'text-purple-500'
      },
      tiktok: {
        name: 'TikTok',
        icon: '🎵',
        color: '#000000',
        bgColor: 'bg-black',
        textColor: 'text-black'
      },
      zoom: {
        name: 'Zoom',
        icon: '📹',
        color: '#2D8CFF',
        bgColor: 'bg-blue-500',
        textColor: 'text-blue-500'
      }
    };

    return info[platform] || {
      name: 'Unknown',
      icon: '❓',
      color: '#6B7280',
      bgColor: 'bg-gray-500',
      textColor: 'text-gray-500'
    };
  },

  // URL formatting
  formatUrl(platform, url) {
    const formatters = {
      youtube: (url) => {
        // Convert youtu.be to youtube.com
        if (url.includes('youtu.be')) {
          const videoId = url.split('youtu.be/')[1];
          return `https://www.youtube.com/watch?v=${videoId}`;
        }
        return url;
      },
      twitch: (url) => {
        // Ensure proper twitch.tv format
        if (url.includes('clips.twitch.tv')) {
          return url;
        }
        if (url.includes('twitch.tv')) {
          return url;
        }
        return url;
      },
      tiktok: (url) => {
        // Ensure proper tiktok.com format
        return url.replace('vm.tiktok.com', 'www.tiktok.com');
      },
      zoom: (url) => {
        // Ensure proper zoom.us format
        return url;
      }
    };

    const formatter = formatters[platform];
    return formatter ? formatter(url) : url;
  },

  // Extract platform-specific IDs
  extractId(platform, url) {
    const extractors = {
      youtube: (url) => {
        const match = url.match(/(?:v=|\/)([a-zA-Z0-9_-]{11})/);
        return match ? match[1] : null;
      },
      twitch: (url) => {
        if (url.includes('clip.twitch.tv')) {
          const match = url.match(/clip\.twitch\.tv\/([a-zA-Z0-9_-]+)/);
          return match ? match[1] : null;
        }
        const match = url.match(/twitch\.tv\/([a-zA-Z0-9_-]+)/);
        return match ? match[1] : null;
      },
      tiktok: (url) => {
        const patterns = [
          /tiktok\.com\/@[\w.-]+\/video\/(\d+)/,
          /tiktok\.com\/v\/(\d+)/,
          /vm\.tiktok\.com\/(\w+)/
        ];
        
        for (const pattern of patterns) {
          const match = url.match(pattern);
          if (match) return match[1];
        }
        return null;
      },
      zoom: (url) => {
        const match = url.match(/zoom\.us\/j\/(\d+)/);
        return match ? match[1] : null;
      }
    };

    const extractor = extractors[platform];
    return extractor ? extractor(url) : null;
  },

  // Generate preview URLs
  generatePreviewUrl(platform, id) {
    const previewUrls = {
      youtube: `https://img.youtube.com/vi/${id}/maxresdefault.jpg`,
      twitch: `https://clips-media-assets2.twitch.tv/${id}/clip.jpg`,
      tiktok: `https://p16-sign-va.tiktokcdn.com/${id}/image.jpg`,
      zoom: null // Zoom doesn't have public preview images
    };

    return previewUrls[platform] || null;
  },

  // Platform-specific error messages
  getErrorMessage(platform, error) {
    const errorMessages = {
      youtube: {
        'Video not found': 'This YouTube video could not be found or is private.',
        'Invalid URL': 'Please provide a valid YouTube video URL.',
        'default': 'Unable to process this YouTube video. Please check the URL and try again.'
      },
      twitch: {
        'Stream not live': 'This Twitch channel is not currently live streaming.',
        'Clip not found': 'This Twitch clip could not be found or is private.',
        'Invalid URL': 'Please provide a valid Twitch URL.',
        'default': 'Unable to process this Twitch content. Please check the URL and try again.'
      },
      tiktok: {
        'Video not found': 'This TikTok video could not be found or is private.',
        'Invalid URL': 'Please provide a valid TikTok video URL.',
        'default': 'Unable to process this TikTok video. Please check the URL and try again.'
      },
      zoom: {
        'Recording not found': 'This Zoom recording could not be found.',
        'Invalid URL': 'Please provide a valid Zoom recording URL.',
        'default': 'Unable to process this Zoom recording. Please check the URL and try again.'
      }
    };

    const platformErrors = errorMessages[platform];
    if (!platformErrors) return error;

    return platformErrors[error] || platformErrors.default || error;
  }
};

export default platformAdapters; 