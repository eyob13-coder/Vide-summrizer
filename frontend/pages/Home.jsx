import React from 'react';
import { Link } from 'react-router-dom';
import Navbar from '../src/components/Navbar';
import Footer from '../src/components/Footer';
import HeroSection from '../src/components/HeroSection';
import FeaturesSection from '../src/components/FeaturesSection';
import VideoDemoSection from '../src/components/VideoDemoSection';
// import UploadDemo from '../src/components/UploadDemo';
import ReviewsSection from '../src/components/ReviewsSection';
import FAQSection from '../src/components/FAQSection';
import VideoUpload from '../src/components/VideoUpload';



const Home = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <Navbar />
      <main>
        <HeroSection />
        <FeaturesSection />
        <VideoDemoSection />
        {/* <UploadDemo/> */}
        <VideoUpload/>
        <ReviewsSection />
        <FAQSection />
        
        {/* CTA Section */}
        <section className="section bg-gradient-to-r from-indigo-300 to-cyan-600 text-white">
          <div className="text-center">
            <h2 className="text-3xl md:text-4xl font-bold mb-4">
              Ready to Get Started?
            </h2>
            <p className="text-xl mb-8 opacity-90">
              Join thousands of users who are already transforming their workflow
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link
                to="/signup"
                className="btn-secondary bg-white text-indigo-600 hover:bg-gray-100"
              >
                Start Free Trial
              </Link>
              <Link
                to="/pricing"
                className="btn-secondary bg-transparent border-2 border-white text-white hover:bg-white hover:text-indigo-600"
              >
                View Pricing
              </Link>
            </div>
          </div>
        </section>

       
      </main>
      <Footer />
    </div>
  );
};

export default Home; 