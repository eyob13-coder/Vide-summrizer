import { useEffect, useState } from 'react';
import { FaCheck, FaStar } from 'react-icons/fa';
import Navbar from '../src/components/Navbar';
import apiService from '../services/api';

const Pricing = () => {
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const load = async () => {
      try {
        setLoading(true);
        const { data } = await apiService.getPlans();
        setPlans(data.data || []);
      } catch (e) {
        console.error(e);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      
      <main>
        {/* Hero Section */}
        <section className="section text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="section-title">
              Simple, Transparent Pricing
            </h1>
            <p className="section-subtitle">
              Choose the plan that fits your needs.
            </p>
          </div>
        </section>

        {/* Pricing Cards */}
        <section className="section">
          <div className="max-w-7xl mx-auto">
            {loading ? (
              <div className=' flex items-center justify-center'>Loading...</div>
            ) : (

              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {plans.map(({name, price, period, description, features, popular}, index) => (
                  <div
                    key={index}
                    className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                      popular 
                        ? 'border-indigo-500 scale-105' 
                        : 'border-gray-200 hover:border-gray-300'
                    }`}
                  >
                    {popular && (
                      <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                        <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                          <FaStar className="w-4 h-4" />
                          <span>Most Popular</span>
                        </div>
                      </div>
                    )}

                    <div className="p-8">
                      <div className="text-center mb-8">
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">
                          {name}
                        </h3>
                        <div className="flex items-baseline justify-center mb-2">
                          <span className="text-4xl font-bold text-gray-900">
                            {price}
                          </span>
                          <span className="text-lg text-gray-600 ml-1">
                            {period}
                          </span>
                        </div>
                        <p className="text-gray-600">
                          {description}
                        </p>
                      </div>

                      <ul className="space-y-4 mb-8">
                        {features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-start space-x-3">
                            <FaCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                            <span className="text-gray-700">{feature}</span>
                          </li>
                        ))}
                      </ul>

                      <button className="w-full py-3 px-6 rounded-lg font-medium transition-colors btn-primary">
                        Select Plan
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </section>
      </main>
    </div>
  );
};

export default Pricing; 