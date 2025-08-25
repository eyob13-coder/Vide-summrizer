import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaEnvelope, FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import AuthLayout from '../../src/components/AuthLayout';
import apiService from '../../services/api';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [loading, setLoading] = useState(false);
  const [status, setStatus] = useState('idle'); // 'idle', 'success', 'error'
  const [message, setMessage] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!email) {
      setStatus('error');
      setMessage('Please enter your email address');
      return;
    }

    setLoading(true);
    setStatus('idle');

    try {
      const response = await apiService.forgotPassword(email);
      
      if (response.data?.success) {
        setStatus('success');
        setMessage(response.data.message);
      } else {
        setStatus('error');
        setMessage(response.data?.message || 'Something went wrong. Please try again.');
      }
    } catch (error) {
      setStatus('error');
      setMessage(error.response?.data?.message || 'Failed to send reset email. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const renderStatusIcon = () => {
    switch (status) {
      case 'success':
        return <FaCheckCircle className="w-6 h-6 text-green-500" />;
      case 'error':
        return <FaExclamationCircle className="w-6 h-6 text-red-500" />;
      default:
        return null;
    }
  };

  const renderStatusMessage = () => {
    if (status === 'idle') return null;

    const bgColor = status === 'success' ? 'bg-green-50/80' : 'bg-red-50/80';
    const borderColor = status === 'success' ? 'border-green-200/50' : 'border-red-200/50';
    const textColor = status === 'success' ? 'text-green-800' : 'text-red-800';

    return (
      <div className={`${bgColor} backdrop-blur-sm border ${borderColor} rounded-xl p-4 mb-6`}>
        <div className="flex items-center space-x-3">
          {renderStatusIcon()}
          <p className={`text-sm ${textColor}`}>{message}</p>
        </div>
      </div>
    );
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        {/* Glass-like container */}
        <div className="backdrop-blur-lg bg-white/20 rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12 max-w-md mx-auto">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <FaEnvelope className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Forgot Password?</h3>
            <p className="text-gray-600 text-lg">
              Enter your email address and we'll send you a link to reset your password.
            </p>
          </div>

          {renderStatusMessage()}

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Email Address
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Enter your email"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300/50 rounded-xl focus:ring-2 focus:ring-indigo-500 focus:border-transparent bg-white/50 backdrop-blur-sm"
                  disabled={loading}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {loading ? (
                <div className="flex items-center justify-center space-x-2">
                  <FaSpinner className="w-5 h-5 animate-spin" />
                  <span>Sending Reset Link...</span>
                </div>
              ) : (
                "Send Reset Link"
              )}
            </button>

            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                Remember your password?{" "}
                <Link 
                  className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors underline decoration-2 underline-offset-2" 
                  to="/login"
                >
                  Sign In
                </Link>
              </p>
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link 
                  className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors underline decoration-2 underline-offset-2" 
                  to="/signup"
                >
                  Sign Up
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default ForgotPassword; 