import React from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
import Login from '../pages/Auth/Login';
import SignUp from '../pages/Auth/SignUp';
import ForgotPassword from '../pages/Auth/ForgotPassword';
import ResetPassword from '../pages/Auth/ResetPassword';
import Home from '../pages/Home';
import Dashboard from '../pages/Dashboard/Dashboard';
import Pricing from '../pages/Pricing';
import Profile from '../pages/Profile';
import UploadVideo from '../pages/Dashboard/upload';
import Analytics from '../pages/Dashboard/Analytics';
import Billing from '../pages/Dashboard/Billing'
import Videos from '../pages/Dashboard/Videos';
import VideoSummary from '../pages/Dashboard/VideoSummary';
import Notifications from '../pages/Dashboard/Notifications';
import Settings from '../pages/Dashboard/Settings'
import Support from '../pages/Dashboard/Support';
import Summaries from '../pages/Dashboard/Summaries';
import OAuthCallback from './components/OAuthCallback';

const App = () => {
  return (
    <Router>
      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<Root />} />
        <Route path="/home" element={<Home />} />
        <Route path="/pricing" element={<Pricing />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/oauth-callback" element={<OAuthCallback />} />
        
        {/* Dashboard Routes - All use DashboardLayout for persistent sidebar */}
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/dashboard/videos" element={<Videos />} />
        <Route path="/dashboard/analytics" element={<Analytics />} />
        <Route path="/dashboard/billing" element={<Billing />} />
        <Route path="/dashboard/support" element={<Support />} />
        <Route path="/dashboard/videos/upload" element={<UploadVideo />} />
        <Route path="/dashboard/videos/:id/summary" element={<VideoSummary />} />
        <Route path="/dashboard/summaries" element={<Summaries/>} />
        <Route path="/dashboard/notifications" element={<Notifications />} />
        <Route path="/dashboard/settings" element={<Settings />} />
        
        {/* Profile route - Also uses DashboardLayout */}
        <Route path="/profile" element={<Profile />} />
        
        {/* 404 Fallback */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
};

const Root = () => {
  const isAuthenticated = !!localStorage.getItem('token');
  return isAuthenticated ? <Navigate to="/dashboard" /> : <Navigate to="/home" />;
};

export default App;