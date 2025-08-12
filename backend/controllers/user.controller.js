import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import User from "../models/User.js";

// @desc    Get all users (admin only)
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password"); // exclude password
    res.status(200).json({
      success: true,
      count: users.length,
      data: users
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Get single user by ID
export const getUserById = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid user ID");
      error.statusCode = 400;
      throw error;
    }

    const user = await User.findById(id).select("-password");
    if (!user) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      data: user
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Update user (self or admin)
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;
    const { name, email, password } = req.body;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid user ID");
      error.statusCode = 400;
      throw error;
    }

    const updateData = { name, email };

    if (password) {
      const salt = await bcrypt.genSalt(10);
      updateData.password = await bcrypt.hash(password, salt);
    }

    const updatedUser = await User.findByIdAndUpdate(id, updateData, {
      new: true,
      runValidators: true,
      select: "-password"
    });

    if (!updatedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: updatedUser
    });
  } catch (error) {
    next(error);
  }
};

// @desc    Delete user (admin only)
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      const error = new Error("Invalid user ID");
      error.statusCode = 400;
      throw error;
    }

    const deletedUser = await User.findByIdAndDelete(id);

    if (!deletedUser) {
      const error = new Error("User not found");
      error.statusCode = 404;
      throw error;
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully"
    });
  } catch (error) {
    next(error);
  }
};
