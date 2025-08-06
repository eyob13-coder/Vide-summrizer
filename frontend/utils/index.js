import { 
  FaCloudUploadAlt, 
  FaMagic, 
  FaFilm, 
  FaBrain, 
  FaVideo, 
  FaUserEdit 
} from "react-icons/fa";

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

// 4️⃣ Steps
// export const steps = [
//   {
//     title: "Upload or Connect",
//     description: "Upload your video or connect your YouTube, Twitch, or Zoom account."
//   },
//   {
//     title: "AI Analyzes Everything",
//     description: "Our AI analyzes frames, audio, and text to detect the most impactful highlights."
//   },
//   {
//     title: "Edit & Export Highlights",
//     description: "Tweak your highlight reel, add narration, captions, and export instantly."
//   }
// ];

// 5️⃣ Reviews
export const reviews = [
  {
    name: "Sarah J.",
    role: "Content Creator",
    text: "This AI summarizer saved me hours of editing. I can now upload highlight reels in minutes!",
    img: "/avatars/user1.png"
  },
  {
    name: "James T.",
    role: "Educator",
    text: "I summarize long Zoom lectures automatically and share key points with my students. Game-changer!",
    img: "/avatars/user2.png"
  },
  {
    name: "Liam P.",
    role: "Streamer",
    text: "Real-time Twitch highlights are crazy! My community loves instant recaps.",
    img: "/avatars/user3.png"
  }
];
