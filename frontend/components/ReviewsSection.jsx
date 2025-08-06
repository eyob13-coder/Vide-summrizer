import { reviews } from "../utils";

const ReviewsSection = () => {
  return (
    <section className="py-16 bg-white">
      <div className="max-w-6xl mx-auto text-center">
        <h2 className="text-3xl font-bold mb-6">What Our Users Say</h2>

        <div className="grid md:grid-cols-3 gap-8 mt-8">
          {reviews.map(({ name, role, text, img }, idx) => (
            <div
              key={idx}
              className="bg-gray-50 shadow-md rounded-lg p-6 text-center hover:shadow-xl transition"
            >
              {img && (
                <img
                  src={img}
                  alt={name}
                  className="w-16 h-16 rounded-full mx-auto mb-4 object-cover"
                />
              )}
              <p className="text-gray-700 italic mb-3">"{text}"</p>
              <h4 className="font-semibold text-indigo-600">{name}</h4>
              <span className="text-gray-500 text-sm">{role}</span>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewsSection;
