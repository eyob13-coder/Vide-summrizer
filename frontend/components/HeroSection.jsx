import React from 'react'

const HeroSection = () => {
  return (
    <section className="relative h-screen flex items-center justify-center text-center overflow-hidden">
      
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute w-full h-full object-cover"
      >
        <source src="/background-video.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>

      {/* Dark overlay */}
      <div className="absolute inset-0 bg-black opacity-50"></div>

      {/* Hero content */}
      <div className="relative z-10 max-w-3xl mx-auto text-white px-6">
        <h1 className="text-4xl md:text-6xl font-bold mb-6 text-gradient">
          AI Video & Audio Summarizer
        </h1>
        <p className="text-lg md:text-xl mb-8">
          Turn long videos into bite-sized highlights in seconds.  
          Upload, summarize, and share effortlessly with AI.
        </p>
        <div className="flex justify-center gap-4">
          <button className="btn-primary">Try Demo</button>
          <button className="btn-secondary">Learn More</button>
        </div>
      </div>
    </section>
  );
  
}

export default HeroSection