import mongoose from 'mongoose';

const highlightSchema = new mongoose.Schema({
  timestamp: {
    type: String,
    required: [true, 'Highlight timestamp is required'], // e.g., "00:01:45"
  },
  text: {
    type: String,
    required: [true, 'Highlight text is required'],
    trim: true,
  },
  emotion: {
    type: String,
    enum: ['happy', 'sad', 'intense', 'funny', 'neutral'],
    default: 'neutral',
  },
  upvotes: {
    type: Number,
    default: 0,
    min: 0,
  },
}, { _id: false });

const videoSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: [true, 'User ID is required'],
  },
  title: {
    type: String,
    required: [true, 'Video title is required'],
    trim: true,
    minLength: 2,
    maxLength: 200,
  },
  originalUrl: {
    type: String,
    required: [true, 'Original video URL is required'],
    trim: true,
  },
  thumbnailUrl: {
    type: String,
    trim: true,
  },
  duration: {
    type: Number,
    min: 0,
  },
  summary: {
    type: String,
    trim: true,
  },
  transcript: {
    type: String,
    trim: true,
  },
  highlights: {
    type: [highlightSchema],
    default: [],
  },
  mood: {
    type: String,
    enum: ['happy', 'sad', 'intense', 'funny', 'neutral'],
    default: 'neutral',
  },
  montageGroupId: {
    type: String,
    trim: true,
  },
  isMontage: {
    type: Boolean,
    default: false,
  },
  socialShared: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

const Video = mongoose.model('Video', videoSchema);

export default Video;
