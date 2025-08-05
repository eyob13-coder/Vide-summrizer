import React from 'react'
// import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom"
// import Login from '../pages/Auth/Login';
// import SignUp from '../pages/Auth/SignUp';
// import Home from '../pages/Dashboard/Home';


import HeroSection from '../components/HeroSection';
import FeaturesSection from '../components/FeaturesSection';
import VideoDemoSection from '../components/VideoDemoSection';
import UploadDemo from '../components/UploadDemo';
import HowItWorks from '../components/HowItWorks';
import ReviewsSection from '../components/ReviewsSection';
import FAQSection from '../components/FAQSection';
import Footer from '../components/Footer';
const App = () => {
  return (
    <>
      <HeroSection />
      <FeaturesSection />
      <VideoDemoSection />
      <UploadDemo />
      <HowItWorks />
      <ReviewsSection />
      <FAQSection />
      <Footer />

      {/* <div>
      <Router>
        <Routes>
          <Route path="/" element={<Root />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
          <Route path="/dashboard" element={<Home />} />
        </Routes>
      </Router>
    </div> */}
    </>
    
  )
}

export default App

// const Root = () =>{
//   const isAuthenticated  = !!localStorage.getItem("token");

//   return isAuthenticated ? (
//     <Navigate to="/dashboard"/>
//   ) : (
//     <Navigate to= "/login"/>
//   )
// }