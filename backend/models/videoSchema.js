import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  timestamp: {  // Format: "HH:MM:SS" or seconds (float)
    type: String,
    required: [true, 'Highlight timestamp is required'],
    match: [/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]:[0-5][0-9]$/, 'Invalid timestamp format']
  },
  text: {
    type: String,
    trim: true,
    maxlength: 500
  },
  description: {  // AI-generated description of the moment
    type: String,
    trim: true
  },
  emotion: {
    type: String,
    enum: ['happy', 'sad', 'angry', 'excited', 'funny', 'neutral'],
    default: 'neutral'
  },
  intensity: {  // 0-1 scale for highlight importance
    type: Number,
    min: 0,
    max: 1,
    default: 0.5
  },
  objects: [{  // Detected objects/scenes (Multimodal AI)
    name: String,
    confidence: Number
  }],
  audioTone: {  // From speech analysis
    type: String,
    enum: ['calm', 'energetic', 'authoritative', 'casual']
  },
  upvotes: {
    type: Number,
    default: 0,
    min: 0
  },
  userFeedback: [{  // RLHF data
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User'
    },
    action: {
      type: String,
      enum: ['like', 'dislike', 'skip', 'share']
    },
    timestamp: Date
  }],
  socialFormats: {  // Auto-generated social clips
    tiktok: String,
    youtube: String,
    instagram: String
  }
}, { _id: false });

const videoSchema = new mongoose.Schema({
  // Core Metadata
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    index: true
  },
  originalUrl: {
    type: String,
    required: true,
    index: true
  },
  sourcePlatform: {  // For cross-platform aggregation
    type: String,
    enum: ['upload', 'youtube', 'twitch', 'zoom', 'tiktok'],
    default: 'upload'
  },
  sourceMetadata: {  // Platform-specific data
    youtubeId: String,
    twitchClipId: String,
    zoomMeetingId: String
  },

  // Content Analysis
  status: {
    type: String,
    enum: ['uploaded', 'processing', 'summarized', 'failed'],
    default: 'uploaded'
  },
  aiModelVersion: String,  // Track which AI generated this
  summary: {
    type: String,
    trim: true
  },
  transcript: {
    type: String,
    trim: true
  },
  transcriptTimestamps: [{
    text: String,
    start: Number,  // in seconds
    end: Number
  }],
  mood: {
    type: String,
    enum: ['happy', 'sad', 'intense', 'funny', 'neutral', 'educational'],
    default: 'neutral'
  },
  moodScores: {  // Detailed emotion breakdown
    happy: { type: Number, min: 0, max: 1 },
    sad: { type: Number, min: 0, max: 1 },
    exciting: { type: Number, min: 0, max: 1 }
  },
  highlights: {
    type: [highlightSchema],
    default: []
  },

  // Media Assets
  thumbnailUrl: String,
  previewGifUrl: String,
  audioSummaryUrl: String,  // Generated narration
  processedVideoUrl: String,  // Final edited version

  // Social Features
  sharedOn: [{
    platform: String,
    url: String,
    shareDate: Date
  }],
  communityEngagement: {
    views: { type: Number, default: 0 },
    likes: { type: Number, default: 0 }
  },

  // Technical Metadata
  duration: Number,  // in seconds
  fileSize: Number,  // in bytes
  mimetype: String,
  storagePath: String,  // S3/Cloudinary path

  // Montage Features
  isMontage: {
    type: Boolean,
    default: false
  },
  montageSources: [{
    videoId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Video'
    },
    usedSeconds: [Number]  // [start, end] pairs
  }],

  // Indexes
  indexedAt: {
    type: Date,
    default: Date.now,
    index: true
  }
}, { 
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes for performance
videoSchema.index({ userId: 1, status: 1 });
videoSchema.index({ 'highlights.emotion': 1 });
videoSchema.index({ mood: 1, 'highlights.intensity': -1 });

// Virtuals
videoSchema.virtual('engagementScore').get(function() {
  return (this.communityEngagement.likes * 2) + this.communityEngagement.views;
});

// Middleware
videoSchema.pre('save', function(next) {
  if (this.isModified('highlights')) {
    this.mood = calculateDominantMood(this.highlights);
  }
  next();
});

const Video = mongoose.model('Video', videoSchema);

// Helper function
function calculateDominantMood(highlights) {
  const moodCounts = {};
  highlights.forEach(h => {
    moodCounts[h.emotion] = (moodCounts[h.emotion] || 0) + 1;
  });
  return Object.entries(moodCounts).sort((a, b) => b[1] - a[1])[0]?.[0] || 'neutral';
}

export default Video;