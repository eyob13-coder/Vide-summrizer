// import React, { useState } from "react";
// import { FaCloudUploadAlt, FaSpinner, FaCheckCircle, FaExclamationCircle } from "react-icons/fa";
// import apiService from "../../services/api";

// const UploadDemo = () => {
//   const [file, setFile] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [summary, setSummary] = useState("");
//   const [error, setError] = useState("");
//   const [uploadProgress, setUploadProgress] = useState(0);

//   const handleFileChange = (e) => {
//     const selectedFile = e.target.files[0];
//     setError("");
//     setSummary("");
    
//     if (selectedFile) {
//       // Validate file type
//       if (!selectedFile.type.startsWith('video/')) {
//         setError("Please select a valid video file");
//         setFile(null);
//         return;
//       }
      
//       // Validate file size (500MB limit)
//       const maxSize = 500 * 1024 * 1024; // 500MB
//       if (selectedFile.size > maxSize) {
//         setError("File size must be less than 500MB");
//         setFile(null);
//         return;
//       }
      
//       setFile(selectedFile);
//     }
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setError("Please select a file first!");
//       return;
//     }
    
//     const formData = new FormData();
//     formData.append("video", file);

//     try {
//       setLoading(true);
//       setError("");
//       setSummary("");
//       setUploadProgress(0);
      
//       // Upload video with progress tracking
//       const uploadRes = await apiService.uploadVideo(formData, (progressEvent) => {
//         if (progressEvent.total) {
//           const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
//           setUploadProgress(progress);
//         }
//       });
      
//       if (uploadRes.data?.success) {
//         const video = uploadRes.data.data.video;
//         setUploadProgress(100);
        
//         // Process video with AI
//         const sumRes = await apiService.processVideoWithAI(video._id, {
//           generateNarration: true,
//           targetEmotions: ['happy', 'excited', 'intense']
//         });

//         if (sumRes.data?.success) {
//           setSummary(sumRes.data.data.summary || "AI processing completed successfully!");
//         } else {
//           setError("AI processing failed: " + (sumRes.data?.message || "Unknown error"));
//         }
//       } else {
//         setError("Upload failed: " + (uploadRes.data?.message || "Unknown error"));
//       }
//     } catch (err) {
//       console.error("Upload error:", err);
//       if (err.code === 'ECONNABORTED') {
//         setError("Upload timed out. Please try again with a smaller file or check your connection.");
//       } else {
//         setError("Error: " + (err.response?.data?.message || err.message || "Could not process the video."));
//       }
//     } finally {
//       setLoading(false);
//       setUploadProgress(0);
//     }
//   };

//   const formatFileSize = (bytes) => {
//     if (bytes === 0) return '0 Bytes';
//     const k = 1024;
//     const sizes = ['Bytes', 'KB', 'MB', 'GB'];
//     const i = Math.floor(Math.log(bytes) / Math.log(k));
//     return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
//   };

//   return (
//     <section className="section bg-white text-center">
//       <h2 className="section-title text-gradient">Try It Yourself</h2>
//       <p className="section-subtitle">
//         Upload a short video and see how our AI generates instant highlights.
//       </p>

//       Upload box
//       <div className="border-2 border-dashed border-gray-400 p-10 rounded-xl mt-10 max-w-xl mx-auto hover:border-indigo-700 transition cursor-pointer">
//         <input
//           type="file"
//           accept="video/*"
//           onChange={handleFileChange}
//           className="hidden"
//           id="fileUpload"
//         />
//         <label htmlFor="fileUpload" className="flex flex-col items-center">
//           <FaCloudUploadAlt className="text-5xl text-indigo-600 mb-4" />
//           {file ? (
//             <div className="text-center">
//               <p className="font-medium text-gray-700">{file.name}</p>
//               <p className="text-sm text-gray-500">{formatFileSize(file.size)}</p>
//             </div>
//           ) : (
//             <p className="text-gray-500">Drag & drop or click to upload video</p>
//           )}
//         </label>
//       </div>

//       {/* Error Display */}
//       {error && (
//         <div className="mt-4 max-w-xl mx-auto bg-red-50 border border-red-200 p-4 rounded-xl text-left">
//           <div className="flex items-center space-x-2">
//             <FaExclamationCircle className="text-red-500" />
//             <p className="text-red-700 text-sm">{error}</p>
//           </div>
//         </div>
//       )}

//       {/* Upload Progress */}
//       {loading && uploadProgress > 0 && (
//         <div className="mt-4 max-w-xl mx-auto">
//           <div className="bg-gray-200 rounded-full h-2">
//             <div 
//               className="bg-indigo-600 h-2 rounded-full transition-all duration-300"
//               style={{ width: `${uploadProgress}%` }}
//             ></div>
//           </div>
//           <p className="text-sm text-gray-600 mt-2">Uploading... {uploadProgress}%</p>
//         </div>
//       )}

//       {/* Upload button */}
//       <button
//         className="btn-primary mt-6 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
//         onClick={handleUpload}
//         disabled={loading || !file}
//       >
//         {loading ? (
//           <div className="flex items-center space-x-2">
//             <FaSpinner className="animate-spin" />
//             <span>{uploadProgress > 0 ? "Uploading..." : "Processing..."}</span>
//           </div>
//         ) : (
//           "Upload & Process"
//         )}
//       </button>

//       {/* Summary output */}
//       {summary && (
//         <div className="mt-6 max-w-xl mx-auto bg-green-50 border border-green-200 p-6 rounded-xl text-left shadow">
//           <div className="flex items-center space-x-2 mb-2">
//             <FaCheckCircle className="text-green-500" />
//             <h3 className="font-semibold text-lg text-green-800">AI Processing Complete:</h3>
//           </div>
//           <p className="text-green-700">{summary}</p>
//         </div>
//       )}
//     </section>
//   );
// };

// export default UploadDemo;