import Video from '../models/videoSchema.js';
import aiService from '../services/ai.service.js';
import ffmpegService from '../services/ffmpeg.service.js';

export const uploadVideo = async (req, res, next) => {
  try {

    
    if (!req.user?._id) {
      return res.status(401).json({ message: 'Unauthorized.' });
    }

    
    if (!req.file) {
      return res.status(400).json({ message: 'No video file uploaded.' });
    }

    const { path, originalname, mimetype, size } = req.file;

    // You might want to process the video first (e.g., convert or extract audio)
    // await ffmpegService.processVideo(path);

    // Save video metadata to DB
    const newVideo = new Video({
      filename: originalname,
      filepath: path,
      mimetype,
      size,
      user: req.user._id, // Assuming auth middleware attached user to req
    });

    await newVideo.save();

    res.status(201).json({ message: 'Video uploaded successfully.', video: newVideo });
  } catch (error) {
    next(error);
  }
};

export const getUserVideos = async (req, res, next) => {
  try {
    if (!req.user?._id) {
      return res.status(401).json({message: 'Unauthorized'})
    }

    const videos = await Video.find({ user: req.user._id })
      .select('-__v -filepath') // Exclude sensitive/irrelevant fields
      .sort({ createdAt: -1 });

    res.json(videos);
  } catch (error) {
    next(error);
  }
};



export const summarizeVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findById(videoId);

    if (!video) {
      return res.status(404).json({ message: 'Video not found.' });
    }

    // Call AI service to generate summary
    const summary = await aiService.summarizeVideo(video.filepath);

    // Update video doc with summary
    video.summary = summary;
    await video.save();

    res.json({ summary });
  } catch (error) {
    next(error);
  }
};

export const deleteVideo = async (req, res, next) => {
  try {
    const { videoId } = req.params;
    const video = await Video.findOneAndDelete({ 
      _id: videoId, 
      user: req.user._id 
    });

    if (!video) {
      return res.status(404).json({ message: 'Video not found.' });
    }

    // Cleanup file
    await cleanupFile(video.filepath);

    res.json({ message: 'Video deleted successfully.' });
  } catch (error) {
    next(error);
  }
};
