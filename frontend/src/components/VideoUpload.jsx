import React, { useState, useCallback } from 'react';
import { useDropzone } from 'react-dropzone';
import { FaCloudUploadAlt, FaLink, FaYoutube, FaTwitch, FaTiktok, FaVideo, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { SiZoom } from 'react-icons/si';
import apiService from '../../services/api';

import { narrationTones } from '../../utils/data';
import { emotionOptions } from '../../utils/data';

const VideoUpload = ({ onUploadSuccess, onUploadError }) => {
    const [uploadMethod, setUploadMethod] = useState('file'); // 'file' or 'url'
  const [platformUrl, setPlatformUrl] = useState('');
  const [uploading, setUploading] = useState(false);
  const [processing, setProcessing] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'uploading', 'processing', 'success', 'error'
  const [message, setMessage] = useState('');
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [emotionPreferences, setEmotionPreferences] = useState({
    targetEmotions: ['happy', 'excited', 'intense'],
    narrationTone: 'energetic'
  });


  const onDrop = useCallback(async (acceptedFiles) => {
    if (acceptedFiles.length === 0) return;

    const file = acceptedFiles[0];
    if (!file.type.startsWith('video/')) {
      setStatus('error');
      setMessage('Please select a valid video file');
      return;
    }

    await handleFileUpload(file);
  }, []);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    onDrop,
    accept: {
      'video/*': ['.mp4', '.avi', '.mov', '.mkv', '.wmv']
    },
    multiple: false
  });

  const handleFileUpload = async (file) => {
    try {
      setUploading(true);
      setStatus('uploading');
      setMessage('Uploading video...');

      const formData = new FormData();
      formData.append('video', file);

      const response = await apiService.uploadVideo(formData, (progressEvent) => {
        if (progressEvent.total) {
          const progress = Math.round((progressEvent.loaded * 100) / progressEvent.total);
          setMessage(`Uploading video... ${progress}%`);
        }
      });
      
      if (response.data?.success) {
        setUploadedVideo(response.data.data.video);
        setStatus('success');
        setMessage('Video uploaded successfully! Processing with AI...');
        
        // Automatically process with AI
        await processVideoWithAI(response.data.data.video._id);
      } else {
        throw new Error(response.data?.message || 'Upload failed');
      }
    } catch (error) {
      setStatus('error');
      if (error.code === 'ECONNABORTED') {
        setMessage('Upload timed out. Please try again with a smaller file or check your connection.');
      } else {
        setMessage(error.response?.data?.message || error.message);
      }
      onUploadError?.(error);
    } finally {
      setUploading(false);
    }
  };

  const handlePlatformUrlSubmit = async (e) => {
    e.preventDefault();
    if (!platformUrl.trim()) return;

    try {
      setProcessing(true);
      setStatus('processing');
      setMessage('Processing platform URL...');

      const response = await apiService.processPlatformUrl(platformUrl);
      
      if (response.data?.success) {
        setStatus('success');
        setMessage(`Successfully processed ${response.data.data.platform} content!`);
        onUploadSuccess?.(response.data.data);
      } else {
        throw new Error(response.data?.message || 'Processing failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || error.message);
      onUploadError?.(error);
    } finally {
      setProcessing(false);
    }
  };

  const processVideoWithAI = async (videoId) => {
    try {
      setProcessing(true);
      setStatus('processing');
      setMessage('Processing video with AI...');

      const response = await apiService.processVideoWithAI(videoId, {
        targetEmotions: emotionPreferences.targetEmotions,
        narrationTone: emotionPreferences.narrationTone,
        generateNarration: true
      });

      if (response.data?.success) {
        setStatus('success');
        setMessage('AI processing completed! Video highlights generated.');
        onUploadSuccess?.(response.data.data);
      } else {
        throw new Error(response.data?.message || 'AI processing failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || error.message);
      onUploadError?.(error);
    } finally {
      setProcessing(false);
    }
  };

  const handleEmotionToggle = (emotion) => {
    setEmotionPreferences(prev => ({
      ...prev,
      targetEmotions: prev.targetEmotions.includes(emotion)
        ? prev.targetEmotions.filter(e => e !== emotion)
        : [...prev.targetEmotions, emotion]
    }));
  };

  const renderStatusIcon = () => {
    switch (status) {
      case 'success':
        return <FaCheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <FaExclamationCircle className="w-6 h-6 text-red-500" />;
      case 'uploading':
      case 'processing':
        return <FaSpinner className="w-6 h-6 animate-spin text-blue-500" />;
      default:
        return null;
    }
  };

  const renderStatusMessage = () => {
    if (status === 'idle') return null;

    const bgColor = status === 'success' ? 'bg-green-50/80' : 
                   status === 'error' ? 'bg-red-50/80' : 'bg-blue-50/80';
    const borderColor = status === 'success' ? 'border-green-200/50' : 
                       status === 'error' ? 'border-red-200/50' : 'border-blue-200/50';
    const textColor = status === 'success' ? 'text-green-800' : 
                     status === 'error' ? 'text-red-800' : 'text-blue-800';

    return (
      <div className={`${bgColor} backdrop-blur-sm border ${borderColor} rounded-xl p-4 mb-6`}>
        <div className="flex items-center space-x-3">
          {renderStatusIcon()}
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      {/* Upload Method Toggle */}
      <div className="flex items-center justify-center space-x-4 mb-8">
        <button
          onClick={() => setUploadMethod('file')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            uploadMethod === 'file'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FaCloudUploadAlt className="inline-block w-5 h-5 mr-2" />
          Upload Video
        </button>
        <button
          onClick={() => setUploadMethod('url')}
          className={`px-6 py-3 rounded-lg font-medium transition-all duration-300 ${
            uploadMethod === 'url'
              ? 'bg-indigo-600 text-white shadow-lg'
              : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
          }`}
        >
          <FaLink className="inline-block w-5 h-5 mr-2" />
          Platform URL
        </button>
      </div>

      {/* Emotion Preferences */}
      <div className="mb-8">
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Emotion Preferences</h3>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Target Emotions
            </label>
            <div className="flex flex-wrap gap-2">
              {emotionOptions.map((emotion) => (
                <button
                  key={emotion.value}
                  onClick={() => handleEmotionToggle(emotion.value)}
                  className={`px-3 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    emotionPreferences.targetEmotions.includes(emotion.value)
                      ? `${emotion.color} ring-2 ring-offset-2 ring-indigo-500`
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  {emotion.label}
                </button>
              ))}
            </div>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Narration Tone
            </label>
            <select
              value={emotionPreferences.narrationTone}
              onChange={(e) => setEmotionPreferences(prev => ({
                ...prev,
                narrationTone: e.target.value
              }))}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
            >
              {narrationTones.map((tone) => (
                <option key={tone.value} value={tone.value}>
                  {tone.label}
                </option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {renderStatusMessage()}

      {/* File Upload Section */}
      {uploadMethod === 'file' && (
        <div
          {...getRootProps()}
          className={`border-2 border-dashed rounded-xl p-12 text-center cursor-pointer transition-all duration-300 ${
            isDragActive
              ? 'border-indigo-500 bg-indigo-50'
              : 'border-gray-300 hover:border-indigo-400 hover:bg-gray-50'
          }`}
        >
          <input {...getInputProps()} />
          <FaCloudUploadAlt className="w-16 h-16 text-gray-400 mx-auto mb-4" />
          {isDragActive ? (
            <p className="text-lg text-indigo-600 font-medium">Drop the video here...</p>
          ) : (
            <div>
              <p className="text-lg text-gray-600 mb-2">
                Drag & drop your video here, or click to select
              </p>
              <p className="text-sm text-gray-500">
                Supports MP4, AVI, MOV, MKV, WMV (Max 500MB)
              </p>
            </div>
          )}
        </div>
      )}

      {/* Platform URL Section */}
      {uploadMethod === 'url' && (
        <div className="space-y-6">
          <div className="text-center mb-6">
            <div className="flex items-center justify-center space-x-4 mb-4">
              <FaYoutube className="w-8 h-8 text-red-500" />
              <FaTwitch className="w-8 h-8 text-purple-500" />
              <FaTiktok className="w-8 h-8 text-black" />
              <SiZoom className="w-8 h-8 text-blue-500" />
            </div>
            <p className="text-gray-600">
              Paste a link from YouTube, Twitch, TikTok, or Zoom
            </p>
          </div>

          <form onSubmit={handlePlatformUrlSubmit} className="space-y-4">
            <div>
              <input
                type="url"
                value={platformUrl}
                onChange={(e) => setPlatformUrl(e.target.value)}
                placeholder="https://youtube.com/watch?v=..."
                className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent text-lg"
                disabled={processing}
              />
            </div>
            
            <button
              type="submit"
              disabled={!platformUrl.trim() || processing}
              className="w-full bg-indigo-600 text-white font-semibold py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300"
            >
              {processing ? (
                <div className="flex items-center justify-center space-x-2">
                  <FaSpinner className="w-5 h-5 animate-spin" />
                  <span>Processing...</span>
                </div>
              ) : (
                'Process URL'
              )}
            </button>
          </form>
        </div>
      )}

      {/* AI Processing Button for Uploaded Videos */}
      {uploadedVideo && !processing && (
        <div className="mt-8 text-center">
          <button
            onClick={() => processVideoWithAI(uploadedVideo._id)}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-3 px-8 rounded-lg hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-all duration-300 transform hover:scale-105"
          >
            <FaVideo className="inline-block w-5 h-5 mr-2" />
            Process with AI
          </button>
        </div>
      )}
    </div>
  );
};

export default VideoUpload; 