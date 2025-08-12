import multer from "multer";
import path from "path";

// Allowed video formats
const allowedExtensions = [".mp4", ".mov", ".avi", ".mkv", ".webm"];

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/videos"); // make sure this folder exists
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + "-" + uniqueSuffix + ext);
  }
});

// File filter
const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname).toLowerCase();
  if (allowedExtensions.includes(ext)) {
    cb(null, true);
  } else {
    cb(new Error("Invalid file type. Only video files are allowed."));
  }
};

// Max file size (2GB for example)
const limits = {
  fileSize: 2000 * 1024 * 1024 // 2 GB
};

export const uploadVideo = multer({ storage, fileFilter, limits });
