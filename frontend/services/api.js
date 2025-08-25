import axiosInstance from '../utils/axiosInstance';
import { API_PATHS } from '../utils/apiPath';

const apiService = {
  // Auth
  login: (email, password) => axiosInstance.post(API_PATHS.AUTH.SIGNIN, { email, password }),
  signup: (payload) => axiosInstance.post(API_PATHS.AUTH.SIGNUP, payload),
  logout: () => axiosInstance.post(API_PATHS.AUTH.SIGNOUT),
  forgotPassword: (email) => axiosInstance.post(API_PATHS.AUTH.FORGOT_PASSWORD, { email }),
  resetPassword: (token, newPassword) => axiosInstance.post(API_PATHS.AUTH.RESET_PASSWORD, { token, newPassword }),
  verifyResetToken: (token) => axiosInstance.get(API_PATHS.AUTH.VERIFY_RESET_TOKEN(token)),

  // User
  getProfile: () => axiosInstance.get(API_PATHS.USER.PROFILE),
  updateProfile: (payload) => axiosInstance.put(API_PATHS.USER.UPDATE, payload),
  getHistory: () => axiosInstance.get(API_PATHS.USER.HISTORY),
  getNotificationSettings: () => axiosInstance.get(API_PATHS.USER.SETTINGS_NOTIFICATIONS),
  updateNotificationSettings: (payload) => axiosInstance.put(API_PATHS.USER.SETTINGS_NOTIFICATIONS, payload),

  // Video
  uploadVideo: (formData, onUploadProgress) =>
    axiosInstance.post(API_PATHS.VIDEO.UPLOAD, formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
      onUploadProgress,
    }),
  getVideos: () => axiosInstance.get(API_PATHS.VIDEO.GET_ALL),
  summarizeVideo: (videoId) => axiosInstance.post(API_PATHS.VIDEO.SUMMARIZE(videoId)),
  deleteVideo: (videoId) => axiosInstance.delete(API_PATHS.VIDEO.DELETE(videoId)),
  
  // AI Processing
  processVideoWithAI: (videoId, options) => axiosInstance.post(API_PATHS.VIDEO.PROCESS_AI(videoId), options),
  createHighlightVideo: (videoId, highlights, narration) => axiosInstance.post(API_PATHS.VIDEO.CREATE_HIGHLIGHTS(videoId), { highlights, narration }),
  
  // Platform Integration
  processPlatformUrl: (url) => axiosInstance.post(API_PATHS.VIDEO.PROCESS_PLATFORM_URL, { url }),
  
  // Social Sharing
  shareToSocialPlatforms: (videoId, platforms) => axiosInstance.post(API_PATHS.VIDEO.SHARE(videoId), { platforms }),
  
  // Feedback
  updateVideoFeedback: (videoId, feedback) => axiosInstance.post(API_PATHS.VIDEO.FEEDBACK(videoId), feedback),

  // Live
  startLive: (streamUrl) => axiosInstance.post(API_PATHS.LIVE.START, { streamUrl }),
  getLiveHighlights: (sessionId) => axiosInstance.get(API_PATHS.LIVE.HIGHLIGHTS(sessionId)),
  endLive: (sessionId) => axiosInstance.post(API_PATHS.LIVE.END(sessionId)),

  // Notifications
  getNotifications: (limit) => axiosInstance.get(API_PATHS.NOTIFICATIONS.LIST, { params: { limit } }),
  markNotificationRead: (id) => axiosInstance.post(API_PATHS.NOTIFICATIONS.READ(id)),
  markAllNotificationsRead: () => axiosInstance.post(API_PATHS.NOTIFICATIONS.READ_ALL),

  // Analytics
  getAnalyticsOverview: () => axiosInstance.get(API_PATHS.ANALYTICS.OVERVIEW),

  // Billing
  getPlans: () => axiosInstance.get(API_PATHS.BILLING.PLANS),
  getSubscription: () => axiosInstance.get(API_PATHS.BILLING.SUBSCRIPTION),
  subscribe: (planId, billingCycle = 'monthly') => axiosInstance.post(API_PATHS.BILLING.SUBSCRIBE, { planId, billingCycle }),
  cancelSubscription: () => axiosInstance.post(API_PATHS.BILLING.CANCEL),
};

export default apiService; 