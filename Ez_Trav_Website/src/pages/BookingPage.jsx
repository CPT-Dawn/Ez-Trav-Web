import React, { useState } from 'react';
import { motion } from 'framer-motion';

const BookingPage = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    rideType: 'standard'
  });
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails(prev => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => {
    setBookingStep(bookingStep + 1);
  };

  const handlePrevStep = () => {
    setBookingStep(bookingStep - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsBookingConfirmed(true);
  };

  const rideTypes = [
    { id: 'standard', name: 'Standard', price: '$15', time: '5 min' },
    { id: 'comfort', name: 'Comfort', price: '$22', time: '7 min' },
    { id: 'premium', name: 'Premium', price: '$30', time: '10 min' }
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center text-gray-800">Book Your Ride</h1>
        
        {!isBookingConfirmed ? (
          <div className="bg-white rounded-lg shadow-md p-6">
            {/* Progress Indicator */}
            <div className="flex mb-8 justify-center">
              {[1, 2, 3].map((step) => (
                <div key={step} className="flex items-center">
                  <div 
                    className={`flex items-center justify-center w-10 h-10 rounded-full ${
                      bookingStep >= step ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'
                    }`}
                  >
                    {step}
                  </div>
                  {step < 3 && (
                    <div 
                      className={`w-16 h-1 ${
                        bookingStep > step ? 'bg-purple-600' : 'bg-gray-200'
                      }`}
                    />
                  )}
                </div>
              ))}
            </div>
            
            {bookingStep === 1 && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="pickup">
                    Pickup Location
                  </label>
                  <input
                    id="pickup"
                    name="pickup"
                    type="text"
                    className="input"
                    value={bookingDetails.pickup}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter pickup address"
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="destination">
                    Destination
                  </label>
                  <input
                    id="destination"
                    name="destination"
                    type="text"
                    className="input"
                    value={bookingDetails.destination}
                    onChange={handleInputChange}
                    required
                    placeholder="Enter destination address"
                  />
                </div>
                
                <div className="flex justify-end mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNextStep}
                  >
                    Next
                  </motion.button>
                </div>
              </motion.form>
            )}
            
            {bookingStep === 2 && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="date">
                    Date
                  </label>
                  <input
                    id="date"
                    name="date"
                    type="date"
                    className="input"
                    value={bookingDetails.date}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="mb-4">
                  <label className="block text-gray-700 mb-2" htmlFor="time">
                    Time
                  </label>
                  <input
                    id="time"
                    name="time"
                    type="time"
                    className="input"
                    value={bookingDetails.time}
                    onChange={handleInputChange}
                    required
                  />
                </div>
                
                <div className="flex justify-between mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="btn btn-outline"
                    onClick={handlePrevStep}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="btn btn-primary"
                    onClick={handleNextStep}
                  >
                    Next
                  </motion.button>
                </div>
              </motion.form>
            )}
            
            {bookingStep === 3 && (
              <motion.form
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.3 }}
                onSubmit={handleSubmit}
              >
                <div className="mb-6">
                  <label className="block text-gray-700 mb-2">
                    Select Ride Type
                  </label>
                  <div className="space-y-3">
                    {rideTypes.map((ride) => (
                      <label
                        key={ride.id}
                        className={`block p-4 border rounded-lg cursor-pointer transition-all ${
                          bookingDetails.rideType === ride.id 
                            ? 'border-purple-600 bg-purple-50' 
                            : 'border-gray-200 hover:border-purple-300'
                        }`}
                      >
                        <div className="flex items-center">
                          <input
                            type="radio"
                            name="rideType"
                            value={ride.id}
                            checked={bookingDetails.rideType === ride.id}
                            onChange={handleInputChange}
                            className="mr-3 text-purple-600 focus:ring-purple-500"
                          />
                          <div className="flex justify-between w-full">
                            <span className="font-medium">{ride.name}</span>
                            <div className="text-right">
                              <div className="font-semibold text-purple-600">{ride.price}</div>
                              <div className="text-sm text-gray-500">Arrives in {ride.time}</div>
                            </div>
                          </div>
                        </div>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="flex justify-between mt-6">
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="button"
                    className="btn btn-outline"
                    onClick={handlePrevStep}
                  >
                    Back
                  </motion.button>
                  <motion.button
                    whileHover={{ scale: 1.03 }}
                    whileTap={{ scale: 0.97 }}
                    type="submit"
                    className="btn btn-primary"
                  >
                    Confirm Booking
                  </motion.button>
                </div>
              </motion.form>
            )}
          </div>
        ) : (
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
            className="bg-white rounded-lg shadow-md p-8 text-center"
          >
            <div className="text-5xl mb-4">🎉</div>
            <h2 className="text-2xl font-bold mb-4 text-purple-600">Booking Confirmed!</h2>
            <p className="text-lg mb-6 text-gray-700">
              Your ride has been booked successfully. A driver will pick you up at the scheduled time.
            </p>
            <div className="bg-gray-50 p-4 rounded-lg mb-6">
              <div className="grid grid-cols-2 gap-4 text-left">
                <div>
                  <p className="text-gray-500">From</p>
                  <p className="font-medium">{bookingDetails.pickup}</p>
                </div>
                <div>
                  <p className="text-gray-500">To</p>
                  <p className="font-medium">{bookingDetails.destination}</p>
                </div>
                <div>
                  <p className="text-gray-500">Date & Time</p>
                  <p className="font-medium">{bookingDetails.date} at {bookingDetails.time}</p>
                </div>
                <div>
                  <p className="text-gray-500">Ride Type</p>
                  <p className="font-medium capitalize">{bookingDetails.rideType}</p>
                </div>
              </div>
            </div>
            <motion.button
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="btn btn-primary px-8"
              onClick={() => setIsBookingConfirmed(false)}
            >
              Book Another Ride
            </motion.button>
          </motion.div>
        )}
      </div>
    </motion.div>
  );
};

export default BookingPage;