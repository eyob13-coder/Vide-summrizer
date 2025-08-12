import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../models/User.js";
import { JWT_EXPIRES_IN, JWT_SECRET } from "../config/env.js";

// @desc    Register new user
export const signUp = async (req, res, next) => {
  const session = await mongoose.startSession();
  session.startTransaction();

  try {
    const { name, email, password } = req.body;

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      const error = new Error("User already exists");
      error.statusCode = 409;
      throw error;
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUsers = await User.create(
      [{ name, email, password: hashedPassword }],
      { session }
    );

    const token = jwt.sign(
      { userId: newUsers[0]._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    await session.commitTransaction();
    session.endSession();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      data: {
        token,
        user: {
          _id: newUsers[0]._id,
          name: newUsers[0].name,
          email: newUsers[0].email
        }
      }
    });
  } catch (error) {
    await session.abortTransaction();
    session.endSession();
    next(error);
  }
};

// @desc    Login user
export const signIn = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      const error = new Error("Invalid password");
      error.statusCode = 401;
      throw error;
    }

    const token = jwt.sign(
      { userId: user._id },
      JWT_SECRET,
      { expiresIn: JWT_EXPIRES_IN }
    );

    res.status(200).json({
      success: true,
      message: "User signed in successfully",
      data: {
        token,
        user: {
          _id: user._id,
          name: user.name,
          email: user.email
        }
      }
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Logout user (client should delete token)
export const signOut = async (req, res, next) => {
  try {
    // For JWT-based auth, sign-out is handled client-side by removing the token.
    // You could also maintain a token blacklist in Redis for advanced security.
    res.status(200).json({
      success: true,
      message: "User signed out successfully"
    });
  } catch (error) {
    next(error);
  }
};
