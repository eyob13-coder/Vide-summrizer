import { useState } from "react";
import AuthLayout from "../../src/components/AuthLayout";
import { Link, useNavigate } from "react-router-dom";
import Input from "../../src/components/Inputs/Input";
import { validateEmail } from "../../utils/helper";
import { FaSpinner, FaUser, FaEnvelope, FaBuilding, FaLock, FaCheck } from "react-icons/fa";
import apiService from "../../services/api";
import uploadImage from "../../utils/upladImage";
import ProfilePhotoSelector from "../../src/components/Inputs/ProfilePhotoSelector";

const SignUp = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    profileImageUrl: "",
    confirmPassword: "",
    company: "",
    agreeToTerms: false
  });
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [profilePic, setProfilePic] = useState(null)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const navigate = useNavigate();

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
    if (error) setError(null);
  };

  const handleSignUp = async (e) => {
    e.preventDefault();

    let profileImageUrl = "";
    setError("");

    // Validation
    if (!formData.name.trim()) {
      setError("Name is required");
      return;
    }

    if (!validateEmail(formData.email)) {
      setError("Please enter a valid email address");
      return;
    }

    if (formData.password.length < 8) {
      setError("Password must be at least 8 characters long");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    if (!formData.agreeToTerms) {
      setError("You must agree to the terms and conditions");
      return;
    }

    setIsLoading(true);

    try {

      if(profilePic){
        const imageUploadRes = await uploadImage(profilePic);
        profileImageUrl = imageUploadRes.imageUrl || ''
      }
      const data = await apiService.signup(formData.name, formData.email, formData.password, formData.profileImageUrl);
      
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

  return (
    <AuthLayout>
      <div className="lg:w-[100%] h-auto md:h-full mt-10 md:mt-0 flex flex-col justify-center">
        {/* Header */}
        <div className="text-center mb-8">
          
          <h3 className="text-2xl font-bold text-gray-900 mb-2">Create Your Account</h3>
          <p className="text-gray-600">
            Join thousands of users who are already saving time with video summarization
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSignUp} className="space-y-6">
        <ProfilePhotoSelector image={profilePic}
        setImage={setProfilePic}/>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <div className="absolute inset-y-12 left-0 pl-3 flex items-center pointer-events-none">
                <FaUser className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                value={formData.name}
                onChange={({ target }) => handleInputChange('name', target.value)}
                label="Full Name"
                placeholder="John Doe"
                type="text"
                className="pl-10"
              />
            </div>

            <div className="relative">
              <div className="absolute inset-y-12 left-0 pl-3 flex items-center pointer-events-none">
                <FaBuilding className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                value={formData.company}
                onChange={({ target }) => handleInputChange('company', target.value)}
                label="Company (Optional)"
                placeholder="Your Company"
                type="text"
                className="pl-10"
              />
            </div>
          </div>

          <div className="space-y-4">
            <div className="relative">
              <div className="absolute inset-y-12 left-0 pl-3 flex items-center pointer-events-none">
                <FaEnvelope className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                value={formData.email}
                onChange={({ target }) => handleInputChange('email', target.value)}
                label="Email Address"
                placeholder="john@example.com"
                type="email"
                className="pl-10"
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
                placeholder="Create a strong password"
                type={showPassword ? "text" : "password"}
                className="pl-10 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
                
              </button>
            </div>

            <div className="relative">
              <div className="absolute inset-y-12 left-0 pl-3 flex items-center pointer-events-none">
                <FaLock className="h-5 w-5 text-gray-400" />
              </div>
              <Input
                value={formData.confirmPassword}
                onChange={({ target }) => handleInputChange('confirmPassword', target.value)}
                label="Confirm Password"
                placeholder="Confirm your password"
                type={showConfirmPassword ? "text" : "password"}
                className="pl-10 pr-12"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600 transition-colors"
              >
               
              </button>
            </div>
          </div>

          {/* Password Requirements */}
          <div className="bg-gray-50 rounded-lg p-4">
            <h4 className="text-sm font-medium text-gray-900 mb-3">Password Requirements:</h4>
            <div className="space-y-2">
              <div className="flex items-center space-x-2">
                <FaCheck className={`w-4 h-4 ${formData.password.length >= 8 ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={`text-sm ${formData.password.length >= 8 ? 'text-green-700' : 'text-gray-500'}`}>
                  At least 8 characters
                </span>
              </div>
              <div className="flex items-center space-x-2">
                <FaCheck className={`w-4 h-4 ${formData.password === formData.confirmPassword && formData.password.length > 0 ? 'text-green-500' : 'text-gray-400'}`} />
                <span className={`text-sm ${formData.password === formData.confirmPassword && formData.password.length > 0 ? 'text-green-700' : 'text-gray-500'}`}>
                  Passwords match
                </span>
              </div>
            </div>
          </div>

          {/* Terms and Conditions */}
          <div className="flex items-start space-x-3">
            <input
              type="checkbox"
              checked={formData.agreeToTerms}
              onChange={(e) => handleInputChange('agreeToTerms', e.target.checked)}
              className="mt-1 w-4 h-4 text-indigo-600 border-gray-300 rounded focus:ring-indigo-500"
            />
            <label className="text-sm text-gray-700">
              I agree to the{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 underline font-medium">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="text-indigo-600 hover:text-indigo-700 underline font-medium">
                Privacy Policy
              </a>
            </label>
          </div>

          {/* Error Message */}
          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4">
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

          {/* Submit Button */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full bg-gradient-to-r from-indigo-600 to-cyan-600 text-white font-semibold py-3 px-6 rounded-xl hover:from-indigo-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transform transition-all duration-200 hover:scale-[1.02] disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
          >
            {isLoading ? (
              <div className="flex items-center justify-center space-x-2">
                <FaSpinner className="w-5 h-5 animate-spin" />
                <span>Creating Account...</span>
              </div>
            ) : (
              "Create Account"
            )}
          </button>

          {/* Sign In Link */}
          <div className="text-center">
            <p className="text-sm text-gray-600">
              Already have an account?{" "}
              <Link 
                className="font-semibold text-indigo-600 hover:text-indigo-700 transition-colors underline decoration-2 underline-offset-2" 
                to="/login"
              >
                Sign In
              </Link>
            </p>
          </div>
        </form>
      </div>
    </AuthLayout>
  );
};

export default SignUp;