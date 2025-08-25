import { 
  FaCloudUploadAlt, 
  FaMagic, 
  FaFilm, 
  FaBrain, 
  FaVideo, 
  FaUserEdit, 
  FaHome,
  FaFileAlt,
  FaChartBar,
  FaUser,
  FaCreditCard,
  FaCog,
  FaBell,
  FaQuestionCircle,
  FaYoutube,
  FaTiktok,
  FaTwitch
} from "react-icons/fa";
import { SiZoom } from "react-icons/si";

// 1️⃣ FAQs
export const faqs = [
  {
    question: "Is my uploaded video private?",
    answer: "Yes. All uploads are processed securely and deleted after summarization unless you choose to save them."
  },
  {
    question: "Can I edit the AI-generated highlights?",
    answer: "Absolutely! Our interactive editor allows you to reorder, trim, and modify highlights before exporting."
  },
  {
    question: "Does it work with live streams?",
    answer: "Yes. You can connect Twitch, YouTube Live, or Zoom streams and generate real-time summaries."
  }
];


export const demoSteps = [
  {
    icon: FaCloudUploadAlt,
    title: "1. Upload or Paste Link",
    description: "Upload your video or provide a YouTube, Twitch, or Zoom link to start the summarization process."
  },
  {
    icon: FaMagic,
    title: "2. AI Analysis",
    description: "Our AI analyzes video frames, audio emotion, and text transcripts to detect highlights automatically."
  },
  {
    icon: FaFilm,
    title: "3. Get Interactive Highlights",
    description: "Download, edit, and share your AI-generated highlights with captions, narration, and effects."
  }
];

// 3️⃣ Features
export const features = [
  {
    icon: FaBrain,
    title: "Multimodal AI Understanding",
    description: "Analyzes video, audio, and transcripts together to capture the most exciting or emotional moments automatically."
  },
  {
    icon: FaUserEdit,
    title: "Interactive & Personalized Highlights",
    description: "Choose the type of moments you care about. Reorder, edit, and fine-tune your highlights effortlessly with AI."
  },
  {
    icon: FaVideo,
    title: "Cross-Platform Aggregation",
    description: "Summarize content from YouTube, Twitch, TikTok, Zoom, and more. Merge multiple sources into one highlight reel."
  }
];

export const plans = [
  {
    name: 'Free',
    price: '$0',
    period: '/month',
    description: 'Perfect for getting started with video summarization',
    features: [
      '5 video summaries per month',
      'Basic summary format',
      '720p video quality support',
      'Email support',
      'Standard processing time'
    ],
    buttonText: 'Get Started Free',
    buttonVariant: 'secondary',
    popular: false
  },
  {
    name: 'Pro',
    price: '$29',
    period: '/month',
    description: 'Best for professionals and small teams',
    features: [
      'Unlimited video summaries',
      'Advanced summary formats (bullet points, paragraphs)',
      '4K video quality support',
      'Priority processing',
      'Priority email support',
      'Custom summary length',
      'Export to multiple formats',
      'API access'
    ],
    buttonText: 'Start Pro Trial',
    buttonVariant: 'primary',
    popular: true
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    description: 'For large organizations with custom requirements',
    features: [
      'Everything in Pro',
      'Custom integrations',
      'Dedicated account manager',
      'Phone & video support',
      'Custom branding',
      'Advanced analytics',
      'Team management',
      'SLA guarantees',
      'On-premise deployment options'
    ],
    buttonText: 'Contact Sales',
    buttonVariant: 'secondary',
    popular: false
  }
];

// 5️⃣ Reviews
export const reviews = [
  {
    name: "Sarah J.",
    role: "Content Creator",
    text: "This AI summarizer saved me hours of editing. I can now upload highlight reels in minutes!",
    img: "/client4.png"
  },
  {
    name: "James T.",
    role: "Educator",
    text: "I summarize long Zoom lectures automatically and share key points with my students. Game-changer!",
    img: "/client2.png"
  },
  {
    name: "Liam P.",
    role: "Streamer",
    text: "Real-time Twitch highlights are crazy! My community loves instant recaps.",
    img: "/client1.png"
  }
];

export   const navigationItems = [
  { icon: FaHome, label: 'Dashboard', path: '/dashboard' },
  { icon: FaVideo, label: 'My Videos', path: '/dashboard/videos' },
  { icon: FaFileAlt, label: 'Summaries', path: '/dashboard/summaries' },
  { icon: FaChartBar, label: 'Analytics', path: '/dashboard/analytics' },
  { icon: FaUser, label: 'Profile', path: '/profile' },
  { icon: FaCreditCard, label: 'Billing', path: '/dashboard/billing' },
  { icon: FaCog, label: 'Settings', path: '/dashboard/settings' },
];


export const bottomItems = [
  { icon: FaBell, label: 'Notifications', path: '/dashboard/notifications' },
  { icon: FaQuestionCircle, label: 'Help & Support', path: '/dashboard/support' },
];

// Emotion options for video processing
export const emotionOptions = [
  {
    value: 'happy',
    label: 'Happy',
    color: 'bg-yellow-100 text-yellow-800 border-yellow-200'
  },
  {
    value: 'excited',
    label: 'Excited',
    color: 'bg-orange-100 text-orange-800 border-orange-200'
  },
  {
    value: 'intense',
    label: 'Intense',
    color: 'bg-red-100 text-red-800 border-red-200'
  },
  {
    value: 'calm',
    label: 'Calm',
    color: 'bg-blue-100 text-blue-800 border-blue-200'
  },
  {
    value: 'mysterious',
    label: 'Mysterious',
    color: 'bg-purple-100 text-purple-800 border-purple-200'
  },
  {
    value: 'energetic',
    label: 'Energetic',
    color: 'bg-green-100 text-green-800 border-green-200'
  },
  {
    value: 'dramatic',
    label: 'Dramatic',
    color: 'bg-indigo-100 text-indigo-800 border-indigo-200'
  },
  {
    value: 'peaceful',
    label: 'Peaceful',
    color: 'bg-teal-100 text-teal-800 border-teal-200'
  }
];

// Narration tone options
export const narrationTones = [
  {
    value: 'energetic',
    label: 'Energetic & Exciting'
  },
  {
    value: 'calm',
    label: 'Calm & Soothing'
  },
  {
    value: 'professional',
    label: 'Professional & Informative'
  },
  {
    value: 'casual',
    label: 'Casual & Friendly'
  },
  {
    value: 'dramatic',
    label: 'Dramatic & Engaging'
  },
  {
    value: 'neutral',
    label: 'Neutral & Balanced'
  }
];

// Social media platforms for sharing
export const platforms = [
  {
    id: 'youtube',
    name: 'YouTube',
    icon: 'FaYoutube',
    color: 'text-red-500',
    description: 'Share to YouTube'
  },
  {
    id: 'tiktok',
    name: 'TikTok',
    icon: 'FaTiktok',
    color: 'text-black',
    description: 'Share to TikTok'
  },
  {
    id: 'twitch',
    name: 'Twitch',
    icon: 'FaTwitch',
    color: 'text-purple-500',
    description: 'Share to Twitch'
  },
  {
    id: 'instagram',
    name: 'Instagram',
    icon: 'FaInstagram',
    color: 'text-pink-500',
    description: 'Share to Instagram'
  },
  {
    id: 'twitter',
    name: 'Twitter',
    icon: 'FaTwitter',
    color: 'text-blue-400',
    description: 'Share to Twitter'
  },
  {
    id: 'facebook',
    name: 'Facebook',
    icon: 'FaFacebook',
    color: 'text-blue-600',
    description: 'Share to Facebook'
  }
];

// Video processing status options
export const processingStatuses = [
  {
    value: 'uploading',
    label: 'Uploading',
    color: 'text-blue-600',
    icon: 'FaCloudUploadAlt'
  },
  {
    value: 'processing',
    label: 'Processing with AI',
    color: 'text-yellow-600',
    icon: 'FaCog'
  },
  {
    value: 'analyzing',
    label: 'Analyzing Content',
    color: 'text-purple-600',
    icon: 'FaBrain'
  },
  {
    value: 'generating',
    label: 'Generating Highlights',
    color: 'text-green-600',
    icon: 'FaStar'
  },
  {
    value: 'completed',
    label: 'Completed',
    color: 'text-green-600',
    icon: 'FaCheckCircle'
  },
  {
    value: 'error',
    label: 'Error',
    color: 'text-red-600',
    icon: 'FaExclamationCircle'
  }
];

// Video quality options
export const videoQualities = [
  {
    value: '720p',
    label: '720p HD',
    description: 'Good quality, smaller file size'
  },
  {
    value: '1080p',
    label: '1080p Full HD',
    description: 'High quality, balanced file size'
  },
  {
    value: '4k',
    label: '4K Ultra HD',
    description: 'Ultra high quality, larger file size'
  }
];

// Export formats
export const exportFormats = [
  {
    value: 'mp4',
    label: 'MP4',
    description: 'Most compatible format'
  },
  {
    value: 'mov',
    label: 'MOV',
    description: 'High quality, Apple devices'
  },
  {
    value: 'avi',
    label: 'AVI',
    description: 'Universal compatibility'
  },
  {
    value: 'gif',
    label: 'GIF',
    description: 'Animated highlights'
  }
];

// Default user preferences
export const defaultUserPreferences = {
  targetEmotions: ['happy', 'excited', 'intense'],
  narrationTone: 'energetic',
  highlightLength: 60,
  videoQuality: '1080p',
  exportFormat: 'mp4',
  autoShare: false,
  preferredPlatforms: ['youtube', 'tiktok']
};

// Platform-specific settings
export const platformSettings = {
  youtube: {
    maxDuration: 600, // 10 minutes
    supportedFormats: ['mp4', 'mov', 'avi'],
    maxFileSize: 128 * 1024 * 1024, // 128MB
    autoCaption: true
  },
  tiktok: {
    maxDuration: 180, // 3 minutes
    supportedFormats: ['mp4'],
    maxFileSize: 287 * 1024 * 1024, // 287MB
    autoCaption: true
  },
  twitch: {
    maxDuration: 3600, // 1 hour
    supportedFormats: ['mp4', 'mov'],
    maxFileSize: 512 * 1024 * 1024, // 512MB
    autoCaption: false
  },
  instagram: {
    maxDuration: 60, // 1 minute
    supportedFormats: ['mp4'],
    maxFileSize: 100 * 1024 * 1024, // 100MB
    autoCaption: true
  }
};

// Error messages for different scenarios
export const errorMessages = {
  upload: {
    fileTooLarge: 'File size exceeds the maximum limit for your plan',
    unsupportedFormat: 'This video format is not supported',
    uploadFailed: 'Upload failed. Please check your connection and try again',
    quotaExceeded: 'You have reached your monthly upload limit. Upgrade to continue.'
  },
  processing: {
    aiServiceUnavailable: 'AI processing service is temporarily unavailable',
    processingFailed: 'Video processing failed. Please try again',
    invalidVideo: 'The video file appears to be corrupted or invalid'
  },
  sharing: {
    platformUnavailable: 'This platform is currently unavailable',
    sharingFailed: 'Failed to share video. Please try again',
    authenticationRequired: 'Please connect your account to share to this platform'
  }
};

// Success messages
export const successMessages = {
  upload: 'Video uploaded successfully!',
  processing: 'AI processing completed!',
  highlights: 'Highlights generated successfully!',
  sharing: 'Video shared successfully!',
  feedback: 'Feedback submitted successfully!'
};

// Loading messages
export const loadingMessages = {
  upload: 'Uploading your video...',
  processing: 'Processing with AI...',
  analyzing: 'Analyzing video content...',
  generating: 'Generating highlights...',
  sharing: 'Sharing to platforms...'
};
