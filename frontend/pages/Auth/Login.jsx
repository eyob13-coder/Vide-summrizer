import { useState } from "react";
import AuthLayout from "../../src/components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../src/components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { FaSpinner, FaLock, FaEnvelope, FaGoogle, FaYoutube, FaVideo, FaGamepad } from "react-icons/fa";
import { SiTiktok, SiZoom } from "react-icons/si";
import apiService from "../../services/api";

const Login = () => {
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError(null);
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError("");

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (!formData.password) {
      setError("Please enter your password");
      return;
    }

    setIsLoading(true);

    try {
      const data = await apiService.login(formData.email, formData.password);
      
      // Store token and user data
      localStorage.setItem("token", data.data.token);
      localStorage.setItem("user", JSON.stringify(data.data.user));
      
      // Redirect to dashboard
      navigate("/dashboard");
    } catch (err) {
      setError(err.message || "Something went wrong. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleOAuthLogin = (provider) => {
    const baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:8080';
    window.location.href = `${baseUrl}/api/v1/auth/${provider}`;
  };

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        {/* Glass-like container */}
        <div className="backdrop-blur-lg bg-white/20 rounded-3xl shadow-2xl border border-white/30 p-8 md:p-12">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-gradient-to-r from-indigo-400 via-purple-500 to-pink-500 rounded-3xl flex items-center justify-center mx-auto mb-6 shadow-2xl">
              <FaLock className="w-10 h-10 text-white" />
            </div>
            <h3 className="text-3xl font-bold text-gray-900 mb-3">Welcome Back</h3>
            <p className="text-gray-600 text-lg">
              Sign in to your account and continue your journey
            </p>
          </div>

          {/* OAuth Buttons */}
          <div className="mb-8 space-y-4">
            <button
              onClick={() => handleOAuthLogin('google')}
              className="w-full flex items-center justify-center space-x-3 bg-white/80 backdrop-blur-sm border border-gray-200 rounded-xl px-6 py-4 text-gray-700 hover:bg-white hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaGoogle className="w-5 h-5 text-red-500" />
              <span className="font-medium">Continue with Google</span>
            </button>
            
            <button
              onClick={() => handleOAuthLogin('tiktok')}
              className="w-full flex items-center justify-center space-x-3 bg-black/90 backdrop-blur-sm text-white rounded-xl px-6 py-4 hover:bg-black hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <SiTiktok className="w-5 h-5" />
              <span className="font-medium">Continue with TikTok</span>
            </button>
            
            <button
              onClick={() => handleOAuthLogin('youtube')}
              className="w-full flex items-center justify-center space-x-3 bg-red-600/90 backdrop-blur-sm text-white rounded-xl px-6 py-4 hover:bg-red-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaYoutube className="w-5 h-5" />
              <span className="font-medium">Continue with YouTube</span>
            </button>
            
            <button
              onClick={() => handleOAuthLogin('zoom')}
              className="w-full flex items-center justify-center space-x-3 bg-blue-600/90 backdrop-blur-sm text-white rounded-xl px-6 py-4 hover:bg-blue-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <SiZoom className="w-5 h-5" />
              <span className="font-medium">Continue with Zoom</span>
            </button>
            
            <button
              onClick={() => handleOAuthLogin('twitch')}
              className="w-full flex items-center justify-center space-x-3 bg-purple-600/90 backdrop-blur-sm text-white rounded-xl px-6 py-4 hover:bg-purple-600 hover:shadow-lg transition-all duration-300 transform hover:scale-105"
            >
              <FaGamepad className="w-5 h-5" />
              <span className="font-medium">Continue with Twitch</span>
            </button>
          </div>

          {/* Divider */}
          <div className="relative mb-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300/50" />
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-white/20 backdrop-blur-sm text-gray-600 font-medium">Or continue with email</span>
            </div>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-4">
              <div className="relative">
                <div className="absolute inset-y-12 left-0 pl-3 flex items-center pointer-events-none">
                  <FaEnvelope className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  value={formData.email}
                  onChange={({ target }) => handleInputChange('email', target.value)}
                  label="Email Address"
                  placeholder="Enter your email"
                  type="email"
                  className="pl-10 bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-indigo-500 focus:ring-indigo-500"
                />
              </div>

              <div className="relative">
                <div className="absolute inset-y-12 left-0 pl-3 flex items-center pointer-events-none">
                  <FaLock className="h-5 w-5 text-gray-400" />
                </div>
                <Input
                  value={formData.password}
                  onChange={({ target }) => handleInputChange('password', target.value)}
                  label="Password"
                  placeholder="Enter your password"
                  type={showPassword ? "text" : "password"}
                  className="pl-10 pr-12 bg-white/50 backdrop-blur-sm border-gray-200/50 focus:border-indigo-500 focus:ring-indigo-500"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
                >
                  
                </button>
              </div>
            </div>

            {error && (
              <div className="bg-red-50/80 backdrop-blur-sm border border-red-200/50 rounded-xl p-4">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-400" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div className="ml-3">
                    <p className="text-sm text-red-800">{error}</p>
                  </div>
                </div>
              </div>
            )}

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-600 text-white font-semibold py-4 px-6 rounded-xl hover:from-indigo-700 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none"
            >
              {isLoading ? (
                <div className="flex items-center justify-center space-x-2">
                  <FaSpinner className="w-5 h-5 animate-spin" />
                  <span>Signing In...</span>
                </div>
              ) : (
                "Sign In"
              )}
            </button>

            <div className="text-center space-y-3">
              <p className="text-sm text-gray-600">
                Don't have an account?{" "}
                <Link 
                  className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors underline decoration-2 underline-offset-2" 
                  to="/signup"
                >
                  Sign Up
                </Link>
              </p>
              <p className="text-sm">
                <Link 
                  className="text-gray-500 hover:text-gray-700 transition-colors" 
                  to="/forgot-password"
                >
                  Forgot your password?
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </AuthLayout>
  );
};

export default Login;
