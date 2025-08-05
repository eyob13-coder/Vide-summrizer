import { FaCloudUploadAlt, FaMagic, FaFilm, FaBrain, FaVideo, FaUserEdit } from "react-icons/fa";
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



export const Demosteps = [
    {
      icon: <FaCloudUploadAlt className="text-5xl text-indigo-600 mb-4" />,
      title: "1. Upload or Paste Link",
      description: "Upload your video or provide a YouTube, Twitch, or Zoom link to start the summarization process."
    },
    {
      icon: <FaMagic className="text-5xl text-cyan-500 mb-4" />,
      title: "2. AI Analysis",
      description: "Our AI analyzes video frames, audio emotion, and text transcripts to detect highlights automatically."
    },
    {
      icon: <FaFilm className="text-5xl text-indigo-600 mb-4" />,
      title: "3. Get Interactive Highlights",
      description: "Download, edit, and share your AI-generated highlights with captions, narration, and effects."
    }
  ];

export const features = [
    {
      icon: <FaBrain className="text-4xl text-indigo-600 mb-4" />,
      title: "Multimodal AI Understanding",
      description:
        "Analyzes video, audio, and transcripts together to capture the most exciting or emotional moments automatically."
    },
    {
      icon: <FaUserEdit className="text-4xl text-cyan-500 mb-4" />,
      title: "Interactive & Personalized Highlights",
      description:
        "Choose the type of moments you care about. Reorder, edit, and fine-tune your highlights effortlessly with AI."
    },
    {
      icon: <FaVideo className="text-4xl text-indigo-600 mb-4" />,
      title: "Cross-Platform Aggregation",
      description:
        "Summarize content from YouTube, Twitch, TikTok, Zoom, and more. Merge multiple sources into one highlight reel."
    }
];

export const steps = [
    {
      title: "Upload or Connect",
      description: "Upload your video or connect your YouTube, Twitch, or Zoom account."
    },
    {
      title: "AI Analyzes Everything",
      description: "Our AI analyzes frames, audio, and text to detect the most impactful highlights."
    },
    {
      title: "Edit & Export Highlights",
      description: "Tweak your highlight reel, add narration, captions, and export instantly."
    }
  ];

  export const reviews = [
    {
      name: "Sarah J.",
      role: "Content Creator",
      text: "This AI summarizer saved me hours of editing. I can now upload highlight reels in minutes!"
    },
    {
      name: "James T.",
      role: "Educator",
      text: "I summarize long Zoom lectures automatically and share key points with my students. Game-changer!",
      img: "./client1.png"
    },
    {
      name: "Liam P.",
      role: "Streamer",
      text: "Real-time Twitch highlights are crazy! My community loves instant recaps."
    }
  ];

