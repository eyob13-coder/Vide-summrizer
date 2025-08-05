import React from 'react'
import { reviews } from '../utils'


const ReviewsSection = () => {
  return (
    <section className="section bg-white text-center">
      <h2 className="section-title text-gradient">What People Say</h2>
      <p className="section-subtitle">Creators, educators, and streamers love our app.</p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
        {reviews.map((review, index) => (
          <div key={index} className="card text-left">
            <p className="text-gray-700 mb-4">“{review.text}”</p>
            <h3 className="font-semibold text-gray-900">{review.name}</h3>
            <p className="text-sm text-gray-500">{review.role}</p>
          </div>
        ))}
      </div>
    </section>
  )
}

export default ReviewsSection