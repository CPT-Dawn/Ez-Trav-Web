import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';

const About = () => {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto">
        <h1 className="text-4xl font-bold mb-8 text-center text-gray-800">About Ez Trav</h1>
        
        <div className="bg-white rounded-lg shadow-md p-8 mb-8">
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Our Mission</h2>
          <p className="text-lg text-gray-700 mb-6">
            At Ez Trav, we believe transportation should be simple, reliable, and accessible to everyone. 
            Our mission is to transform the way people move around cities by providing fast, affordable, 
            and safe rides at the tap of a button.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Our Story</h2>
          <p className="text-lg text-gray-700 mb-6">
            Founded in 2020, Ez Trav began with a simple idea: make booking a ride as easy as possible. 
            What started as a small operation in a single city has grown into a service available in over 
            50 cities nationwide, with plans for international expansion in the coming years.
          </p>
          
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Our Values</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-6">
            {[
              { title: 'Reliability', description: 'We are there when you need us, rain or shine.' },
              { title: 'Safety', description: 'Your security is our top priority, always.' },
              { title: 'Innovation', description: 'Constantly improving to serve you better.' }
            ].map((value, index) => (
              <motion.div
                key={value.title}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.1 }}
                className="bg-gray-50 p-5 rounded-lg"
              >
                <h3 className="text-xl font-medium mb-2 text-gray-800">{value.title}</h3>
                <p className="text-gray-600">{value.description}</p>
              </motion.div>
            ))}
          </div>
          
          <h2 className="text-2xl font-semibold mb-4 text-purple-600">Join Us</h2>
          <p className="text-lg text-gray-700 mb-6">
            Whether you're a rider looking for convenient transportation or a driver seeking flexible 
            earning opportunities, Ez Trav welcomes you to join our growing community.
          </p>
          
          <div className="flex justify-center">
            <Link to="/booking">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn btn-primary px-8 py-3 text-lg"
              >
                Book a Ride Now
              </motion.button>
            </Link>
          </div>
        </div>
        
        <div className="bg-white rounded-lg shadow-md p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-gray-800">Contact Us</h2>
          
          <div className="grid md:grid-cols-3 gap-6 mb-8">
            {[
              { title: 'Customer Support', contact: 'support@eztrav.com', icon: '📧' },
              { title: 'Phone', contact: '1-800-EZ-TRAV', icon: '📞' },
              { title: 'Headquarters', contact: '123 Transit Ave, San Francisco, CA', icon: '📍' }
            ].map((item) => (
              <div key={item.title} className="text-center">
                <div className="text-4xl mb-2">{item.icon}</div>
                <h3 className="font-semibold mb-1">{item.title}</h3>
                <p className="text-gray-600">{item.contact}</p>
              </div>
            ))}
          </div>
          
          {/* Contact Form */}
          <form className="max-w-lg mx-auto">
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="name">
                Your Name
              </label>
              <input
                id="name"
                type="text"
                className="input"
                placeholder="John Doe"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                className="input"
                placeholder="john@example.com"
                required
              />
            </div>
            
            <div className="mb-4">
              <label className="block text-gray-700 mb-2" htmlFor="message">
                Message
              </label>
              <textarea
                id="message"
                className="input min-h-[150px]"
                placeholder="How can we help you?"
                required
              ></textarea>
            </div>
            
            <div className="text-center">
              <motion.button
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                type="submit"
                className="btn btn-primary px-8"
              >
                Send Message
              </motion.button>
            </div>
          </form>
        </div>
      </div>
    </motion.div>
  );
};

export default About;