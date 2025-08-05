import { steps } from "../utils"




const HowItWorks = () => {
  return (
    <section className="section bg-gray-50">
    <h2 className="section-title text-gradient">How It Works</h2>
    <p className="section-subtitle">From upload to ready-to-share highlight reel in minutes.</p>

    <div className="max-w-4xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
      {steps.map((step, index) => (
        <div
          key={index}
          className="card text-center hover:scale-105 transform transition duration-300"
        >
          <div className="text-4xl font-bold text-indigo-600 mb-2">{index + 1}</div>
          <h3 className="text-xl font-semibold mb-2">{step.title}</h3>
          <p className="text-gray-600">{step.description}</p>
        </div>
      ))}
    </div>
  </section>
  )
}

export default HowItWorks