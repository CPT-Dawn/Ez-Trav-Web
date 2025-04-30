import React from "react";
import { Link } from "react-router-dom";
import {
  FaInstagram,
  FaLinkedinIn,
  FaYoutube,
  FaSpotify,
} from "react-icons/fa";

const Footer = () => {
  const socialLinks = [
    {
      icon: <FaYoutube />,
      link: "https://www.youtube.com/channel/UCw-Rb6RBJNqzLDhpB-ZdE3Q",
      label: "YouTube",
    },
    {
      icon: <FaSpotify />,
      link: "https://open.spotify.com/artist/7oWuvB2J1W94Y9M8jiPneB?si=vnOoBEeFTB6oMzSk6XARgQ&utm_medium=share&utm_source=linktree&nd=1&dlsi=024eb94e3bf44538",
      label: "Spotify",
    },
    {
      icon: <FaInstagram />,
      link: "https://www.instagram.com/at17music/",
      label: "Instagram",
    },
    {
      icon: <FaLinkedinIn />,
      link: "https://www.linkedin.com/in/alok-tiwari-13831b250/",
      label: "LinkedIn",
    },
  ];

  return (
    <footer className="bg-gray-800 text-white">
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-wrap justify-between">
          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h3 className="text-xl font-bold mb-4">Ez Trav</h3>
            <img
              src="/assets/icon.png"
              alt="Ez Trav Logo"
              className="w-32 h-32 mb-4"
            />
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-white font-semibold mb-4">Quick Links</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/" className="text-gray-300 hover:text-white">
                  Home
                </Link>
              </li>
              <li>
                <Link to="/about" className="text-gray-300 hover:text-white">
                  About Us
                </Link>
              </li>
              <li>
                <Link to="/booking" className="text-gray-300 hover:text-white">
                  Book a Ride
                </Link>
              </li>
              <li>
                <Link to="/login" className="text-gray-300 hover:text-white">
                  Login
                </Link>
              </li>
            </ul>
          </div>

          <div className="w-full md:w-1/4 mb-6 md:mb-0">
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-2 text-gray-300">
              <li>Bennett University, Greater Noida</li>
              <li>E23CSEU0004@bennett.edu.in</li>
              <li>+91 86024 32021</li>
            </ul>
          </div>

          <div className="w-full md:w-1/4">
            <h4 className="text-white font-semibold mb-4">Follow Me @</h4>
            <div className="flex space-x-4">
              {socialLinks.map(({ icon, link, label }) => (
                <a
                  key={label}
                  href={link}
                  className="text-gray-300 hover:text-white text-2xl transition-transform transform hover:scale-110"
                  aria-label={label}
                  target="_blank"
                >
                  {icon}
                </a>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-8 pt-6 border-t border-gray-700 text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} Ez Trav. All rights reserved.</p>
          <div className="mt-2">
            <Link to="#" className="hover:text-white mr-4">
              Privacy Policy
            </Link>
            <Link to="#" className="hover:text-white mr-4">
              Terms of Service
            </Link>
            <Link to="#" className="hover:text-white">
              Cookie Policy
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
