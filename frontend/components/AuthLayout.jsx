import React from "react";

const AuthLayout = ({ children }) => {
  return (
    <div className="relative w-full h-screen flex items-center justify-center bg-gray-100 overflow-hidden">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/background-video.mp4" type="video/mp4" />
      </video>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black bg-opacity-50"></div>

      {/* Split Layout for Desktop */}
      <div className="relative z-10 w-full max-w-6xl mx-auto flex flex-col md:flex-row bg-white bg-opacity-10 backdrop-blur-lg border border-white border-opacity-20 rounded-2xl shadow-lg overflow-hidden">
        
        {/* Left Side - Branding */}
        <div className="hidden md:flex flex-1 items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 text-white p-10">
          <div className="text-center">
            <h1 className="text-3xl font-bold mb-4">AI Video Summarizer</h1>
            <p className="text-sm opacity-90">
              Summarize your videos, extract key highlights, and save hours of editing.
            </p>
          </div>
        </div>

        {/* Right Side - Form */}
        <div className="flex-1 bg-white bg-opacity-5 backdrop-blur-md p-8 flex items-center justify-center">
          <div className="w-full max-w-md">{children}</div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
