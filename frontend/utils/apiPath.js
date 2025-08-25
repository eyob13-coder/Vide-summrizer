export const BASE_URL = "http://localhost:8080"; 

const API_PREFIX = "/api/v1";
const LIVE_PREFIX = "/v1/live";

export const API_PATHS = {
  AUTH: {
    SIGNUP: `${API_PREFIX}/auth/sign-up`,
    SIGNIN: `${API_PREFIX}/auth/sign-in`,
    SIGNOUT: `${API_PREFIX}/auth/sign-out`,
    FORGOT_PASSWORD: `${API_PREFIX}/auth/forgot-password`,
    RESET_PASSWORD: `${API_PREFIX}/auth/reset-password`,
    VERIFY_RESET_TOKEN: (token) => `${API_PREFIX}/auth/verify-reset-token/${token}`,
    UPLOAD_IMAGE: `${API_PREFIX}/auth/upload-image`,
  },

  USER: {
    PROFILE: `${API_PREFIX}/user/profile`,
    UPDATE: `${API_PREFIX}/user/profile`,  
    HISTORY: `${API_PREFIX}/user/history`,
    SETTINGS_NOTIFICATIONS: `${API_PREFIX}/user/settings/notifications`,
  },

  VIDEO: {
    UPLOAD: `${API_PREFIX}/videos/upload`,
    SUMMARIZE: (videoId) => `${API_PREFIX}/videos/summarize/${videoId}`,
    GET_ALL: `${API_PREFIX}/videos`,
    GET_ONE: (videoId) => `${API_PREFIX}/videos/${videoId}`,
    DELETE: (videoId) => `${API_PREFIX}/videos/${videoId}`,
    
    // AI Processing
    PROCESS_AI: (videoId) => `${API_PREFIX}/videos/${videoId}/process-ai`,
    CREATE_HIGHLIGHTS: (videoId) => `${API_PREFIX}/videos/${videoId}/create-highlights`,
    
    // Platform Integration
    PROCESS_PLATFORM_URL: `${API_PREFIX}/videos/process-platform-url`,
    
    // Social Sharing
    SHARE: (videoId) => `${API_PREFIX}/videos/${videoId}/share`,
    
    // Feedback
    FEEDBACK: (videoId) => `${API_PREFIX}/videos/${videoId}/feedback`,
  },

  LIVE: {
    START: `${LIVE_PREFIX}/start`,
    HIGHLIGHTS: (sessionId) => `${LIVE_PREFIX}/${sessionId}/highlights`,
    END: (sessionId) => `${LIVE_PREFIX}/${sessionId}/end`,
  },

  NOTIFICATIONS: {
    LIST: `${API_PREFIX}/notifications`,
    READ: (id) => `${API_PREFIX}/notifications/${id}/read`,
    READ_ALL: `${API_PREFIX}/notifications/read-all`,
  },

  ANALYTICS: {
    OVERVIEW: `${API_PREFIX}/analytics/overview`,
  },

  BILLING: {
    PLANS: `${API_PREFIX}/billing/plans`,
    SUBSCRIPTION: `${API_PREFIX}/billing/subscription`,
    SUBSCRIBE: `${API_PREFIX}/billing/subscribe`,
    CANCEL: `${API_PREFIX}/billing/cancel`,
  },

  COMMUNITY: {
    SHARE: (videoId) => `${API_PREFIX}/community/share/${videoId}`,
    UPVOTE: (clipId) => `${API_PREFIX}/community/upvote/${clipId}`,
    TRENDING: `${API_PREFIX}/community/trending`,
  },

 
};