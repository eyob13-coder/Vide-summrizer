import mongoose from 'mongoose';

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'User Name is required'],
    trim: true,
    minLength: 2,
    maxLength: 50,
  },
  email: {
    type: String,
    required: [true, 'User Email is required'],
    unique: true,
    trim: true,
    lowercase: true,
    match: [/\S+@\S+\.\S+/, 'Please enter a valid email address'],
  },
  password: {
    type: String,
    required: [true, 'User Password is required'],
    minLength: 6,
  },
  profilePhoto: {
    type: String, // Optional profile image URL
  },
  preferences: {
    highlightType: { type: String, default: 'funny' }, // e.g., funny, emotional, educational
    captionStyle: {
      font: { type: String, default: 'Arial' },
      emoji: { type: Boolean, default: true },
    },
    musicType: { type: String, default: 'upbeat' },
    preferredLength: { type: Number, default: 60 }, // seconds
  }
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

export default User;
