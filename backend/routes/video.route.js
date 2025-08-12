import { Router } from "express";
import  authorize  from '../middlewares/auth.middleware.js';
import { upload } from "../controllers/video.controller.js";
import {
  uploadVideo,
  summarizeVideo,
  getUserVideos,
  deleteVideo
} from '../controllers/video.controller.js';

const videoRouter = Router();

// @route   POST /api/videos/upload
videoRouter.post('/upload', authorize, upload.single('video'), uploadVideo);

// @route   POST /api/videos/summarize/:id
videoRouter.post('/summarize/:id', authorize, summarizeVideo);

// @route   GET /api/videos
videoRouter.get('/', authorize, getUserVideos);

// @route   DELETE /api/videos/:id
videoRouter.delete('/:id', authorize, deleteVideo);

export default videoRouter;
