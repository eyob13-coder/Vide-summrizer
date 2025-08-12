import mongoose from 'mongoose';

const preferenceEmbeddingSchema = new mongoose.Schema({
  // Vector embedding for AI personalization (768d for most ML models)
  vector: {
    type: [Number],
    validate: {
      validator: v => v.length === 768,
      message: 'Embedding must be 768-dimensional'
    }
  },
  lastUpdated: Date
}, { _id: false });

const socialPreferencesSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['tiktok', 'youtube', 'instagram', 'twitter'],
    required: true
  },
  autoShare: { type: Boolean, default: false },
  captionStyle: {
    type: String,
    enum: ['bold', 'subtle', 'emoji-heavy', 'minimal'],
    default: 'bold'
  },
  hashtags: [String]
}, { _id: false });

const rlhfFeedbackSchema = new mongoose.Schema({
  videoId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Video',
    required: true
  },
  action: {
    type: String,
    enum: ['liked', 'skipped', 'shared', 'edited', 'reordered'],
    required: true
  },
  timestamp: {
    type: Date,
    default: Date.now
  },
  // Contextual metadata
  highlightType: String,
  mood: String,
  duration: Number
}, { _id: false });

const connectedAccountSchema = new mongoose.Schema({
  platform: {
    type: String,
    enum: ['youtube', 'twitch', 'zoom', 'tiktok'],
    required: true
  },
  accessToken: String,
  refreshToken: String,
  username: String,
  lastSynced: Date
}, { _id: false });

const userSchema = new mongoose.Schema({
  // Authentication
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Invalid email']
  },
  password: {
    type: String,
    required: true,
    minlength: 8,
    select: false
  },
  oauthProvider: {
    type: String,
    enum: ['google', 'github', null],
    default: null
  },

  // Profile
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 2,
    maxlength: 50
  },
  profilePhoto: {
    url: String,
    cloudinaryId: String
  },
  bio: {
    type: String,
    maxlength: 160
  },

  // AI Personalization
  preferenceEmbedding: preferenceEmbeddingSchema,
  learnedPreferences: {
    highlightTypes: {
      type: Map,
      of: Number, // Weight (0-1)
      default: () => new Map([['funny', 0.8], ['emotional', 0.3], ['educational', 0.5]])
    },
    preferredMoods: {
      type: Map,
      of: Number,
      default: () => new Map([['happy', 0.9], ['intense', 0.6]])
    },
    avoidConcepts: [String] // e.g., "politics", "violence"
  },

  // Content Preferences
  defaultPreferences: {
    highlightLength: { // in seconds
      type: Number,
      min: 15,
      max: 300,
      default: 60
    },
    narration: {
      voice: {
        type: String,
        enum: ['male-energetic', 'female-calm', 'ai-robotic'],
        default: 'male-energetic'
      },
      speed: {
        type: Number,
        min: 0.5,
        max: 2,
        default: 1
      }
    },
    socialFormats: [socialPreferencesSchema]
  },

  // Behavioral Data
  feedbackHistory: [rlhfFeedbackSchema],
  connectedAccounts: [connectedAccountSchema],

  // Usage Metrics
  stats: {
    videosProcessed: {
      type: Number,
      default: 0
    },
    lastActive: Date,
    favoriteHighlightTypes: [String]
  },

  // System
  roles: {
    type: [String],
    enum: ['user', 'pro', 'admin'],
    default: ['user']
  },
  emailVerified: {
    type: Boolean,
    default: false
  }
}, {
  timestamps: true,
  toJSON: { virtuals: true },
  toObject: { virtuals: true }
});

// Indexes
userSchema.index({ email: 1 }, { unique: true });
userSchema.index({ 'preferenceEmbedding.vector': 'knnVector' }); // For vector search
userSchema.index({ 'learnedPreferences.highlightTypes': 1 });

// Virtuals
userSchema.virtual('preferredPlatforms').get(function() {
  return this.defaultPreferences.socialFormats.map(f => f.platform);
});

// Middleware
userSchema.pre('save', function(next) {
  if (this.isModified('feedbackHistory')) {
    this.updateLearnedPreferences();
  }
  next();
});

// Methods
userSchema.methods.updateLearnedPreferences = function() {
  // RLHF-based weight updates
  this.feedbackHistory.forEach(feedback => {
    if (feedback.action === 'liked' && feedback.highlightType) {
      const current = this.learnedPreferences.highlightTypes.get(feedback.highlightType) || 0;
      this.learnedPreferences.highlightTypes.set(
        feedback.highlightType,
        Math.min(1, current + 0.1)
      );
    }
  });
};

const User = mongoose.model('User', userSchema);

export default User;