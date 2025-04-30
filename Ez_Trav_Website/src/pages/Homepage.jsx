import React from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import backgroundImage from "./BG.png";

const Homepage = () => {
  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 },
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="relative w-full h-screen overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="absolute inset-0 bg-black opacity-40 z-0"></div>

      <div
        className="relative z-10 container mx-auto px-4 py-4 bg-white bg-opacity-10 backdrop-blur-md rounded-lg mt-16 max-h-full overflow-y-auto"
        style={{
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.3)",
        }}
      >
        <motion.div className="relative z-10 mx-auto px-4 py-8">
          <motion.section
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl text-white z-10 px-4 py-8 md:px-8 md:py-12"
          >
            <div className="max-w-3xl">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">
                Book Your Ride in Seconds
              </h1>
              <p className="text-lg md:text-xl mb-6">
                Fast, reliable, and affordable rides anywhere in the city.
              </p>
              <Link to="/booking">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="bg-white text-purple-700 px-6 py-3 rounded-lg font-semibold text-lg shadow-md hover:bg-gray-100 transition-colors"
                >
                  Book a Ride Now
                </motion.button>
              </Link>
            </div>
          </motion.section>

          <section className="z-10 px-4 py-8 md:px-0 md:py-12">
            <h2 className="text-2xl font-bold mb-6 text-gray-800">
              Why Choose Ez Trav?
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {[
                {
                  title: "Garanteed Trip",
                  description: "Trip will be garanteed!",
                  icon: "✅",
                },
                {
                  title: "Low Prices",
                  description: "Affordable rides for every budget",
                  icon: "💰",
                },
                {
                  title: "Safe Rides",
                  description: "Vetted drivers and regular vehicle inspections",
                  icon: "🛡️",
                },
              ].map((feature, index) => (
                <motion.div
                  key={feature.title}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className="bg-white p-6 rounded-lg shadow-md"
                >
                  <div className="text-3xl mb-4">{feature.icon}</div>
                  <h3 className="text-xl font-semibold mb-2 text-gray-800">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600">{feature.description}</p>
                </motion.div>
              ))}
            </div>
          </section>

          <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            className="bg-purple-100 rounded-lg text-center z-10 px-4 py-8 md:px-8 md:py-12"
          >
            <h2 className="text-2xl font-bold mb-4 text-purple-800">
              Ready to ride with Ez Trav?
            </h2>
            <p className="text-lg mb-6 text-gray-700">
              Join thousands of satisfied customers who rely on Ez Trav daily.
            </p>
            <Link to="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary px-8 py-3 text-lg"
              >
                Book Your First Ride
              </motion.button>
            </Link>
          </motion.section>
        </motion.div>
      </div>
    </motion.div>
  );
};

export default Homepage;
