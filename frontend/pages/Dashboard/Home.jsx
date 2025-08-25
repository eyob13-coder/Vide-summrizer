import FAQSection from '../../components/FAQSection';
import FeaturesSection from '../../components/FeaturesSection';
import Footer from '../../components/Footer';
import ReviewsSection from '../../components/ReviewsSection';
import UploadDemo from '../../components/UploadDemo';
import VideoDemoSection from '../../components/VideoDemoSection';
import HeroSection from '../components/HeroSection';

const Home = () => {
  return (
    <>
    <HeroSection />
      <FeaturesSection/>
      <VideoDemoSection />
      <UploadDemo />
      <ReviewsSection />
      <FAQSection />
      <Footer />
      </>
  )
}

export default Home