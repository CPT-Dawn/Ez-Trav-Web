import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const NotFound = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-16 text-center"
    >
      <div className="max-w-md mx-auto">
        <div className="text-6xl mb-4">😕</div>
        <h1 className="text-4xl font-bold mb-4 text-gray-800">
          Page Not Found
        </h1>
        <p className="text-lg text-gray-600 mb-8">
          The page you're looking for doesn't exist or has been moved.
        </p>
        <Link to="/">
          <motion.button
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn btn-primary px-6"
          >
            Back to Homepage
          </motion.button>
        </Link>
      </div>
    </motion.div>
  );
};

export default NotFound;
