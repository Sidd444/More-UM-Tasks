import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8 text-xl">
      <div className="container mx-auto flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="text-sm">
          © {new Date().getFullYear()} All rights reserved.
        </div>
        <div className="flex flex-col md:flex-row md:space-x-6 space-y-4 md:space-y-0 text-center">
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Privacy Policy</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Terms of Service</a>
          <a href="#" className="text-gray-400 hover:text-white transition duration-300">Contact Us</a>
        </div>
        <div className="flex space-x-4">
          <a href="#" className="text-white hover:text-2xl transition duration-500">
            <i className="fa fa-2x fab fa-facebook-f"></i>
          </a>
          <a href="#" className="text-blue-400 hover:text-2xl transition duration-500">
            <i className="fa fa-2x fab fa-twitter"></i>
          </a>
          <a href="#" className="text-pink-400 hover:text-2xl transition duration-500">
            <i className="fa fa-2x fab fa-instagram"></i>
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;