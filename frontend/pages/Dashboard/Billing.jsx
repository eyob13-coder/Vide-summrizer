import { FaCheck, FaStar, FaSpinner } from "react-icons/fa";
import DashboardLayout from "../../src/components/DashboardLayout";
import { useEffect, useState } from 'react';
import apiService from '../../services/api';

const Billing = () => {
  const [plans, setPlans] = useState([]);
  const [sub, setSub] = useState(null);
  const [loading, setLoading] = useState(true);
  const [billingCycle, setBillingCycle] = useState('monthly'); // 'monthly' or 'yearly'
  const [processing, setProcessing] = useState(false);

  const load = async () => {
    try {
      setLoading(true);
      const [plansRes, subRes] = await Promise.all([
        apiService.getPlans(),
        apiService.getSubscription()
      ]);
      setPlans(plansRes.data.data || []);
      setSub(subRes.data.data || null);
    } catch (e) {
      console.error(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => { load(); }, []);

  const onSubscribe = async (planId) => {
    try {
      setProcessing(true);
      const response = await apiService.subscribe(planId, billingCycle);
      
      if (response.data?.checkoutUrl) {
        // Redirect to Stripe Checkout
        window.location.href = response.data.checkoutUrl;
      } else {
        await load(); // Refresh data if no redirect
      }
    } catch (e) { 
      console.error(e);
      alert('Subscription failed. Please try again.');
    } finally {
      setProcessing(false);
    }
  };

  const onCancel = async () => {
    try {
      await apiService.cancelSubscription();
      await load();
    } catch (e) { console.error(e); }
  };

  const getPlanPrice = (plan) => {
    if (billingCycle === 'yearly') {
      return plan.yearlyPrice || `$${Math.round(parseFloat(plan.price.replace('$', '')) * 10)}`;
    }
    return plan.price;
  };

  const getPlanPeriod = (plan) => {
    if (billingCycle === 'yearly') {
      return '/year';
    }
    return plan.period || '/month';
  };

  const getYearlySavings = (plan) => {
    if (billingCycle === 'yearly' && plan.price) {
      const monthlyPrice = parseFloat(plan.price.replace('$', ''));
      const yearlyPrice = monthlyPrice * 12;
      const discountedPrice = monthlyPrice * 10; // 2 months free
      return Math.round(((yearlyPrice - discountedPrice) / yearlyPrice) * 100);
    }
    return 0;
  };
  
  return (
    <DashboardLayout>
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Simple, Transparent Pricing
          </h1>
          <p className="text-xl text-gray-600 mb-8">
            Choose the plan that fits your needs.
          </p>

          {/* Billing Cycle Toggle */}
          <div className="flex items-center justify-center space-x-4 mb-8">
            <span className={`text-lg ${billingCycle === 'monthly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Monthly
            </span>
            <button
              onClick={() => setBillingCycle(billingCycle === 'monthly' ? 'yearly' : 'monthly')}
              className={`relative inline-flex h-8 w-16 items-center rounded-full transition-colors ${
                billingCycle === 'yearly' ? 'bg-indigo-600' : 'bg-gray-200'
              }`}
            >
              <span
                className={`inline-block h-6 w-6 transform rounded-full bg-white transition-transform ${
                  billingCycle === 'yearly' ? 'translate-x-9' : 'translate-x-1'
                }`}
              />
            </button>
            <span className={`text-lg ${billingCycle === 'yearly' ? 'text-gray-900' : 'text-gray-500'}`}>
              Yearly
              {billingCycle === 'yearly' && (
                <span className="ml-2 inline-block bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full">
                  Save up to 17%
                </span>
              )}
            </span>
          </div>
        </div>

        {/* Plans Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {loading ? (
            <div className="col-span-3 flex justify-center">
              <FaSpinner className="w-8 h-8 animate-spin text-indigo-600" />
            </div>
          ) : (
            plans.map((plan, index) => {
              const yearlySavings = getYearlySavings(plan);
              
              return (
                <div
                  key={index}
                  className={`relative bg-white rounded-2xl shadow-lg border-2 transition-all duration-300 hover:shadow-xl ${
                    plan.popular 
                      ? 'border-indigo-500 scale-105' 
                      : 'border-gray-200 hover:border-gray-300'
                  }`}
                >
                  {plan.popular && (
                    <div className="absolute -top-4 left-1/2 transform -translate-x-1/2">
                      <div className="bg-gradient-to-r from-indigo-600 to-cyan-600 text-white px-4 py-2 rounded-full text-sm font-medium flex items-center space-x-1">
                        <FaStar className="w-4 h-4" />
                        <span>Most Popular</span>
                      </div>
                    </div>
                  )}

                  {yearlySavings > 0 && billingCycle === 'yearly' && (
                    <div className="absolute -top-4 right-4">
                      <div className="bg-green-100 text-green-800 text-xs px-2 py-1 rounded-full font-medium">
                        Save {yearlySavings}%
                      </div>
                    </div>
                  )}

                  <div className="p-8">
                    <div className="text-center mb-8">
                      <h3 className="text-2xl font-bold text-gray-900 mb-2">
                        {plan.name}
                      </h3>
                      <div className="flex items-baseline justify-center mb-2">
                        <span className="text-4xl font-bold text-gray-900">
                          {getPlanPrice(plan)}
                        </span>
                        <span className="text-lg text-gray-600 ml-1">
                          {getPlanPeriod(plan)}
                        </span>
                      </div>
                      <p className="text-gray-600">
                        {plan.description}
                      </p>
                    </div>

                    <ul className="space-y-4 mb-8">
                      {plan.features.map((feature, featureIndex) => (
                        <li key={featureIndex} className="flex items-start space-x-3">
                          <FaCheck className="w-5 h-5 text-green-500 mt-0.5 flex-shrink-0" />
                          <span className="text-gray-700">{feature}</span>
                        </li>
                      ))}
                    </ul>

                    {sub?.status === 'active' && sub?.planId === plan.id ? (
                      <button 
                        className="w-full bg-gray-100 text-gray-700 py-3 rounded-lg hover:bg-gray-200 transition-colors" 
                        onClick={onCancel}
                      >
                        Cancel Subscription
                      </button>
                    ) : (
                      <button 
                        className="w-full py-3 px-6 rounded-lg font-medium transition-colors btn-primary disabled:opacity-50 disabled:cursor-not-allowed" 
                        onClick={() => onSubscribe(plan.id)}
                        disabled={processing}
                      >
                        {processing ? (
                          <div className="flex items-center justify-center space-x-2">
                            <FaSpinner className="w-4 h-4 animate-spin" />
                            <span>Processing...</span>
                          </div>
                        ) : (
                          `Choose ${plan.name}`
                        )}
                      </button>
                    )}
                  </div>
                </div>
              );
            })
          )}
        </div>

        {/* Additional Info */}
        <div className="mt-12 text-center">
          <p className="text-gray-600 mb-4">
            All plans include a 14-day free trial. Cancel anytime.
          </p>
          <p className="text-sm text-gray-500">
            Need a custom plan? <a href="/contact" className="text-indigo-600 hover:text-indigo-700 underline">Contact us</a>
          </p>
        </div>
      </div>
    </DashboardLayout>
  );
};

export default Billing; 