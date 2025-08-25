import React, { useEffect, useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { FaSpinner, FaCheckCircle, FaExclamationCircle } from 'react-icons/fa';
import { useAuth } from '../context/AuthContext';

const OAuthCallback = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const { loginWithOAuth } = useAuth();
  const [status, setStatus] = useState('processing'); // 'processing', 'success', 'error'
  const [message, setMessage] = useState('Completing authentication...');

  useEffect(() => {
    const handleOAuthCallback = async () => {
      try {
        const token = searchParams.get('token');
        const userParam = searchParams.get('user');
        const error = searchParams.get('error');

        if (error) {
          setStatus('error');
          setMessage(`Authentication failed: ${error}`);
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        if (!token || !userParam) {
          setStatus('error');
          setMessage('No authentication data received');
          setTimeout(() => navigate('/login'), 3000);
          return;
        }

        // Parse user object from encoded string
        const user = JSON.parse(decodeURIComponent(userParam));

        // Store token + user in AuthContext
        await loginWithOAuth({ token, user });

        setStatus('success');
        setMessage('Authentication successful! Redirecting to dashboard...');
        setTimeout(() => navigate('/dashboard'), 2000);

      } catch (error) {
        console.error('OAuth callback error:', error);
        setStatus('error');
        setMessage(`Authentication failed: ${error.message}`);
        setTimeout(() => navigate('/login'), 3000);
      }
    };

    handleOAuthCallback();
  }, [searchParams, navigate, loginWithOAuth]); 

  const renderStatusIcon = () => {
    switch (status) {
      case 'success': return <FaCheckCircle className="w-12 h-12 text-green-500" />;
      case 'error': return <FaExclamationCircle className="w-12 h-12 text-red-500" />;
      default: return <FaSpinner className="w-12 h-12 animate-spin text-blue-500" />;
    }
  };

  const renderStatusMessage = () => {
    const bgColor = status === 'success' ? 'bg-green-50/80' : 
                   status === 'error' ? 'bg-red-50/80' : 'bg-blue-50/80';
    const borderColor = status === 'success' ? 'border-green-200/50' : 
                       status === 'error' ? 'border-red-200/50' : 'border-blue-200/50';
    const textColor = status === 'success' ? 'text-green-800' : 
                     status === 'error' ? 'text-red-800' : 'text-blue-800';

    return (
      <div className={`${bgColor} backdrop-blur-sm border ${borderColor} rounded-xl p-6 mb-6`}>
        <div className="flex items-center space-x-4">
          {renderStatusIcon()}
          <div>
            <p className={`text-lg font-medium ${textColor}`}>{message}</p>
            {status === 'processing' && (
              <p className="text-sm text-blue-600 mt-1">
                Please wait while we complete your authentication...
              </p>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-6">
      <div className="max-w-md w-full">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Completing Authentication</h1>
          <p className="text-gray-600">Please wait while we complete your sign-in process</p>
        </div>
        <div className="bg-white rounded-2xl shadow-xl border border-gray-200 p-8">
          {renderStatusMessage()}
          {status === 'error' && (
            <div className="text-center">
              <button
                onClick={() => navigate('/login')}
                className="bg-indigo-600 text-white font-medium py-3 px-6 rounded-lg hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors"
              >
                Return to Login
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OAuthCallback;
