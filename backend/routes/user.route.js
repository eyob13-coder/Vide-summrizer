import { Router } from "express";
import { authorize } from '../middlewares/auth.middleware.js';
import {
  getUserProfile,
  updateUserProfile,
  getUserHistory
} from '../controllers/user.controller.js';

const userRouter = Router();

// @route   GET /api/users/profile
userRouter.get('/profile', authorize, getUserProfile);

// @route   PUT /api/users/profile
userRouter.put('/profile', authorize, updateUserProfile);

// @route   GET /api/users/history
userRouter.get('/history', authorize, getUserHistory);

export default userRouter;
