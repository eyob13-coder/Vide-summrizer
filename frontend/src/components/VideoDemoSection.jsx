import React from 'react'
import { demoSteps } from '../../utils/data';
const VideoDemoSection = () => {

  return (
    <section className="section bg-gray-50">
      <h2 className="section-title text-gradient">How It Works</h2>
      <p className="section-subtitle">
        Summarize and enhance your videos in just three simple steps.
      </p>

      
      <div className="max-w-5xl mx-auto mt-12 relative">
        <div className="w-full h-64 md:h-96 bg-black rounded-xl shadow-lg overflow-hidden relative">
          <video
            autoPlay
            loop
            muted
            playsInline
            className="w-full h-full object-cover opacity-70"
          >
            <source src="loop.mp4" type="video/mp4" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-xl glass">
            AI Generating Highlights...
          </div>
        </div>
      </div>

      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-16">
      {demoSteps.map(({icon: Icon ,title, description }, index) => (
          <div
            key={index}
            className="card text-center hover:scale-105 transform transition duration-300"
          >
            <Icon className="text-5xl text-indigo-600 mb-4 mx-auto" />
            <h3 className="text-xl font-semibold mb-2">{title}</h3>
            <p className="text-gray-600">{description}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default VideoDemoSection