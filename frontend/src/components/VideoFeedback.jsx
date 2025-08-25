import React, { useState } from 'react';
import { FaThumbsUp, FaThumbsDown, FaShare,  FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import apiService from '../../services/api';
import { platforms } from '../../utils/data';

const VideoFeedback = ({ video, onFeedbackUpdate }) => {
  const [feedback, setFeedback] = useState({
    action: '',
    rating: 0,
    comment: ''
  });
  const [sharing, setSharing] = useState(false);
  const [selectedPlatforms, setSelectedPlatforms] = useState([]);
  const [status, setStatus] = useState('idle');
  const [message, setMessage] = useState('');

  

  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    if (!feedback.action) return;

    try {
      setStatus('processing');
      const response = await apiService.updateVideoFeedback(video._id, feedback);
      
      if (response.data?.success) {
        setStatus('success');
        setMessage('Feedback submitted successfully!');
        setFeedback({ action: '', rating: 0, comment: '' });
        onFeedbackUpdate?.(feedback);
        
        setTimeout(() => setStatus('idle'), 3000);
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to submit feedback');
    }
  };

  const handleShare = async () => {
    if (selectedPlatforms.length === 0) {
      setMessage('Please select at least one platform to share to');
      return;
    }

    try {
      setSharing(true);
      setStatus('processing');
      
      const response = await apiService.shareToSocialPlatforms(video._id, selectedPlatforms);
      
      if (response.data?.success) {
        setStatus('success');
        setMessage('Video shared successfully!');
        setSelectedPlatforms([]);
      } else {
        throw new Error('Sharing failed');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to share video');
    } finally {
      setSharing(false);
    }
  };

  const togglePlatform = (platformId) => {
    setSelectedPlatforms(prev => 
      prev.includes(platformId)
        ? prev.filter(p => p !== platformId)
        : [...prev, platformId]
    );
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
      <div className={`${bgColor} backdrop-blur-sm border ${borderColor} rounded-xl p-4 mb-4`}>
        <div className="flex items-center space-x-3">
          {status === 'success' && <FaCheckCircle className="w-5 h-5 text-green-500" />}
          {status === 'error' && <FaExclamationCircle className="w-5 h-5 text-red-500" />}
          {status === 'processing' && <FaSpinner className="w-5 h-5 animate-spin text-blue-500" />}
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <h3 className="text-xl font-semibold text-gray-900 mb-6">Video Feedback & Sharing</h3>

      {renderStatusMessage()}

      {/* Feedback Section */}
      <div className="mb-8">
        <h4 className="text-lg font-medium text-gray-900 mb-4">Rate & Comment</h4>
        
        <form onSubmit={handleFeedbackSubmit} className="space-y-4">
          {/* Action Buttons */}
          <div className="flex space-x-4">
            <button
              type="button"
              onClick={() => setFeedback(prev => ({ ...prev, action: 'liked' }))}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                feedback.action === 'liked'
                  ? 'border-green-500 bg-green-50 text-green-700'
                  : 'border-gray-300 hover:border-green-400 hover:bg-green-50'
              }`}
            >
              <FaThumbsUp className="w-5 h-5" />
              <span>Like</span>
            </button>
            
            <button
              type="button"
              onClick={() => setFeedback(prev => ({ ...prev, action: 'disliked' }))}
              className={`flex items-center space-x-2 px-4 py-2 rounded-lg border transition-all duration-200 ${
                feedback.action === 'disliked'
                  ? 'border-red-500 bg-red-50 text-red-700'
                  : 'border-gray-300 hover:border-red-400 hover:bg-red-50'
              }`}
            >
              <FaThumbsDown className="w-5 h-5" />
              <span>Dislike</span>
            </button>
          </div>

          {/* Rating */}
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating (1-5 stars)
            </label>
            <div className="flex space-x-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setFeedback(prev => ({ ...prev, rating: star }))}
                  className={`w-8 h-8 rounded-full border-2 transition-all duration-200 ${
                    feedback.rating >= star
                      ? 'border-yellow-400 bg-yellow-400 text-white'
                      : 'border-gray-300 hover:border-yellow-400'
                  }`}
                >
                  ★
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div>
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Comment (optional)
            </label>
            <textarea
              id="comment"
              value={feedback.comment}
              onChange={(e) => setFeedback(prev => ({ ...prev, comment: e.target.value }))}
              rows={3}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-indigo-500 focus:border-transparent"
              placeholder="Share your thoughts about this video..."
            />
          </div>

          <button
            type="submit"
            disabled={!feedback.action}
            className="bg-indigo-600 text-white font-medium py-2 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Submit Feedback
          </button>
        </form>
      </div>

      {/* Social Sharing Section */}
      <div>
        <h4 className="text-lg font-medium text-gray-900 mb-4">Share to Social Platforms</h4>
        
        <div className="mb-4">
          <p className="text-sm text-gray-600 mb-3">
            Select platforms to share your video:
          </p>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {platforms.map((platform) => {
              const Icon = platform.icon;
              return (
                <button
                  key={platform.id}
                  onClick={() => togglePlatform(platform.id)}
                  className={`flex items-center space-x-2 p-3 rounded-lg border transition-all duration-200 ${
                    selectedPlatforms.includes(platform.id)
                      ? 'border-indigo-500 bg-indigo-50 text-indigo-700'
                      : 'border-gray-300 hover:border-indigo-400 hover:bg-indigo-50'
                  }`}
                >
                  <Icon className={`w-5 h-5 ${platform.color}`} />
                  <span className="text-sm font-medium">{platform.name}</span>
                </button>
              );
            })}
          </div>
        </div>

        <button
          onClick={handleShare}
          disabled={selectedPlatforms.length === 0 || sharing}
          className="w-full bg-gradient-to-r from-green-600 to-blue-600 text-white font-semibold py-3 px-6 rounded-lg hover:from-green-700 hover:to-blue-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-300 transform hover:scale-105"
        >
          {sharing ? (
            <div className="flex items-center justify-center space-x-2">
              <FaSpinner className="w-5 h-5 animate-spin" />
              <span>Sharing...</span>
            </div>
          ) : (
            <div className="flex items-center justify-center space-x-2">
              <FaShare className="w-5 h-5" />
              <span>Share to Selected Platforms</span>
            </div>
          )}
        </button>
      </div>
    </div>
  );
};

export default VideoFeedback; 