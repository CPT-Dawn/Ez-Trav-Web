import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

const Homepage = () => {
  const cities = [
    { name: 'New York', image: '/api/placeholder/400/320', price: '$15' },
    { name: 'Los Angeles', image: '/api/placeholder/400/320', price: '$18' },
    { name: 'Chicago', image: '/api/placeholder/400/320', price: '$14' },
    { name: 'Miami', image: '/api/placeholder/400/320', price: '$16' }
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.5 }
  };

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      {/* Hero Section */}
      <motion.section
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-2xl p-8 md:p-12 text-white mb-12"
      >
        <div className="max-w-3xl">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">Book Your Ride in Seconds</h1>
          <p className="text-lg md:text-xl mb-6">Fast, reliable, and affordable rides anywhere in the city.</p>
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

      {/* Popular Cities */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Popular in Your City</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {cities.map((city, index) => (
            <motion.div
              key={city.name}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
            >
              <img src={city.image} alt={city.name} className="w-full h-48 object-cover" />
              <div className="p-4">
                <h3 className="font-bold text-lg">{city.name}</h3>
                <div className="flex justify-between items-center mt-2">
                  <span className="text-gray-600">Starting from {city.price}</span>
                  <Link to="/booking" className="text-purple-600 hover:underline">Book Now</Link>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Features */}
      <section className="mb-12">
        <h2 className="text-2xl font-bold mb-6 text-gray-800">Why Choose Ez Trav?</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { title: 'Fast Pickup', description: 'Get a ride in minutes, even during peak hours', icon: '🚀' },
            { title: 'Low Prices', description: 'Affordable rides for every budget', icon: '💰' },
            { title: 'Safe Rides', description: 'Vetted drivers and regular vehicle inspections', icon: '🛡️' }
          ].map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              className="bg-white p-6 rounded-lg shadow-md"
            >
              <div className="text-3xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold mb-2 text-gray-800">{feature.title}</h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* CTA */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3, duration: 0.5 }}
        className="bg-purple-100 rounded-lg p-8 text-center"
      >
        <h2 className="text-2xl font-bold mb-4 text-purple-800">Ready to ride with Ez Trav?</h2>
        <p className="text-lg mb-6 text-gray-700">Join thousands of satisfied customers who rely on Ez Trav daily.</p>
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
  );
};

export default Homepage;