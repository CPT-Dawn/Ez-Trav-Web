import React from 'react';
import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Ez Trav</h3>
            <p className="text-gray-300">
              Fast, reliable, and affordable rides anywhere in the city.
            </p>
          </div>
          
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li><Link to="/" className="text-gray-300 hover:text-white">Home</Link></li>
              <li><Link to="/about" className="text-gray-300 hover:text-white">About Us</Link></li>
              <li><Link to="/booking" className="text-gray-300 hover:text-white">Book a Ride</Link></li>
              <li><Link to="/login" className="text-gray-300 hover:text-white">Login</Link></li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>123 Transit Ave, San Francisco, CA</li>
              <li>support@eztrav.com</li>
              <li>1-800-EZ-TRAV</li>
            </ul>
          </div>
          
          <div className="w-full md:w-1/4">
            <h4 className="text-white font-semibold mb-4">Follow Us</h4>
            <div className="flex space-x-4">
              {['Facebook', 'Twitter', 'Instagram', 'LinkedIn'].map((social) => (
                <a 
                  key={social}
                  href="#" 
                  className="text-gray-300 hover:text-white"
                  aria-label={social}
                >
                  {social[0]}
                </a>
              ))}
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Ez Trav. All rights reserved.</p>
          <div className="mt-2">
            <Link to="#" className="hover:text-white mr-4">Privacy Policy</Link>
            <Link to="#" className="hover:text-white mr-4">Terms of Service</Link>
            <Link to="#" className="hover:text-white">Cookie Policy</Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;