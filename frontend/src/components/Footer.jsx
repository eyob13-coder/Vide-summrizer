import { FaGithub, FaTwitter, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-10 mt-20">
    <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center">
      <h3 className="text-xl font-bold mb-4 md:mb-0">AI Video Summarizer</h3>
      <div className="flex space-x-6 mb-4 md:mb-0">
        <a href="#" className="hover:text-cyan-400"><FaTwitter size={24} /></a>
        <a href="#" className="hover:text-cyan-400"><FaGithub size={24} /></a>
        <a href="#" className="hover:text-cyan-400"><FaLinkedin size={24} /></a>
      </div>
      <p className="text-gray-400 text-sm">© 2025 All rights reserved.</p>
    </div>
  </footer>
  )
}

export default Footer