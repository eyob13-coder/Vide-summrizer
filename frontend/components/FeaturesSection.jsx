import React from 'react'
import { features } from '../utils';
const FeaturesSection = () => {

  
  return (
    <section className="section bg-white">
      <h2 className="section-title text-gradient">Powerful Features</h2>
      <p className="section-subtitle">
        Transform long videos into short, engaging highlights using cutting-edge AI technology.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {features.map((feature, index) => (
          <div
            key={index}
            className="card text-center hover:scale-105 transform transition duration-300"
          >
            {feature.icon}
            <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
            <p className="text-gray-600">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
  
}

export default FeaturesSection