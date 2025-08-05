import  { useState } from "react";
import { faqs } from "../utils";

const FAQSection = () => {

  const [activeIndex, setActiveIndex] = useState(null);

  const toggleFAQ = (index) => {
    setActiveIndex(activeIndex === index ? null : index);
  };
  return (
    <section className="section bg-gray-50">
    <h2 className="section-title text-gradient">Frequently Asked Questions</h2>
    <div className="max-w-3xl mx-auto mt-8 space-y-4">
      {faqs.map((faq, index) => (
        <div
          key={index}
          className="border border-gray-200 bg-white rounded-xl p-4 shadow cursor-pointer hover:shadow-md transition"
          onClick={() => toggleFAQ(index)}
        >
          <h3 className="font-semibold text-gray-800 flex justify-between">
            {faq.question}
            <span>{activeIndex === index ? "−" : "+"}</span>
          </h3>
          {activeIndex === index && <p className="mt-2 text-gray-600">{faq.answer}</p>}
        </div>
      ))}
    </div>
  </section>
  )
}

export default FAQSection