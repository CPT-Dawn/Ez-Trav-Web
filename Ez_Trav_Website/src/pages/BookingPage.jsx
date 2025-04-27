import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const BookingPage = () => {
  const [bookingStep, setBookingStep] = useState(1);
  const [bookingDetails, setBookingDetails] = useState({
    pickup: '',
    destination: '',
    date: '',
    time: '',
    rideType: 'standard',
  });
  const [isBookingConfirmed, setIsBookingConfirmed] = useState(false);

  const rideTypes = [
    { id: 'standard', name: 'Standard', price: '$15', time: '5 min' },
    { id: 'comfort', name: 'Comfort', price: '$22', time: '7 min' },
    { id: 'premium', name: 'Premium', price: '$30', time: '10 min' },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setBookingDetails((prev) => ({ ...prev, [name]: value }));
  };

  const handleNextStep = () => setBookingStep((prev) => prev + 1);
  const handlePrevStep = () => setBookingStep((prev) => prev - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsBookingConfirmed(true);
  };

  const InputField = ({ label, name, type = "text", placeholder }) => (
    <div className="mb-4">
      <label className="block text-gray-700 mb-2" htmlFor={name}>
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        value={bookingDetails[name]}
        onChange={handleInputChange}
        className="w-full p-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500"
        placeholder={placeholder}
        required
      />
    </div>
  );

  const ProgressBar = () => (
    <div className="flex mb-8 justify-center">
      {[1, 2, 3].map((step) => (
        <div key={step} className="flex items-center">
          <div className={`flex items-center justify-center w-10 h-10 rounded-full 
            ${bookingStep >= step ? 'bg-purple-600 text-white' : 'bg-gray-200 text-gray-600'}`}>
            {step}
          </div>
          {step < 3 && (
            <div className={`w-16 h-1 ${bookingStep > step ? 'bg-purple-600' : 'bg-gray-200'}`} />
          )}
        </div>
      ))}
    </div>
  );

  const MotionButton = ({ children, ...props }) => (
    <motion.button
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      {...props}
    >
      {children}
    </motion.button>
  );

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-10"
    >
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-10 text-center text-gray-800">
          Book Your Ride
        </h1>

        <AnimatePresence mode="wait">
          {!isBookingConfirmed ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, x: -30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 30 }}
              transition={{ duration: 0.4 }}
              className="bg-white rounded-lg shadow-lg p-8"
            >
              <ProgressBar />

              <form onSubmit={handleSubmit}>
                {bookingStep === 1 && (
                  <>
                    <InputField label="Pickup Location" name="pickup" placeholder="Enter pickup address" />
                    <InputField label="Destination" name="destination" placeholder="Enter destination address" />
                  </>
                )}

                {bookingStep === 2 && (
                  <>
                    <InputField label="Date" name="date" type="date" />
                    <InputField label="Time" name="time" type="time" />
                  </>
                )}

                {bookingStep === 3 && (
                  <div className="mb-6">
                    <label className="block text-gray-700 mb-2">Select Ride Type</label>
                    <div className="space-y-3">
                      {rideTypes.map((ride) => (
                        <label
                          key={ride.id}
                          className={`flex items-center p-4 border rounded-lg cursor-pointer 
                          ${bookingDetails.rideType === ride.id 
                            ? 'border-purple-600 bg-purple-50' 
                            : 'border-gray-300 hover:border-purple-400'}`}
                        >
                          <input
                            type="radio"
                            name="rideType"
                            value={ride.id}
                            checked={bookingDetails.rideType === ride.id}
                            onChange={handleInputChange}
                            className="mr-4 accent-purple-600"
                          />
                          <div className="flex justify-between w-full">
                            <span className="font-medium">{ride.name}</span>
                            <div className="text-right">
                              <div className="text-purple-600 font-bold">{ride.price}</div>
                              <div className="text-sm text-gray-500">Arrives in {ride.time}</div>
                            </div>
                          </div>
                        </label>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between mt-8">
                  {bookingStep > 1 && (
                    <MotionButton
                      type="button"
                      className="btn btn-outline"
                      onClick={handlePrevStep}
                    >
                      Back
                    </MotionButton>
                  )}
                  {bookingStep < 3 ? (
                    <MotionButton
                      type="button"
                      className="btn btn-primary ml-auto"
                      onClick={handleNextStep}
                    >
                      Next
                    </MotionButton>
                  ) : (
                    <MotionButton
                      type="submit"
                      className="btn btn-primary ml-auto"
                    >
                      Confirm Booking
                    </MotionButton>
                  )}
                </div>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="confirmation"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.5 }}
              className="bg-white rounded-lg shadow-lg p-8 text-center"
            >
              <div className="text-5xl mb-6">🎉</div>
              <h2 className="text-2xl font-bold mb-4 text-purple-600">Booking Confirmed!</h2>
              <p className="text-lg mb-6 text-gray-700">
                Your ride is booked successfully. Your driver will arrive on time.
              </p>

              <div className="bg-gray-50 p-4 rounded-lg mb-6">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <p className="text-gray-500">From</p>
                    <p className="font-semibold">{bookingDetails.pickup}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">To</p>
                    <p className="font-semibold">{bookingDetails.destination}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Date & Time</p>
                    <p className="font-semibold">{bookingDetails.date} at {bookingDetails.time}</p>
                  </div>
                  <div>
                    <p className="text-gray-500">Ride Type</p>
                    <p className="font-semibold capitalize">{bookingDetails.rideType}</p>
                  </div>
                </div>
              </div>

              <MotionButton
                type="button"
                className="btn btn-primary px-8"
                onClick={() => {
                  setIsBookingConfirmed(false);
                  setBookingStep(1);
                  setBookingDetails({
                    pickup: '',
                    destination: '',
                    date: '',
                    time: '',
                    rideType: 'standard',
                  });
                }}
              >
                Book Another Ride
              </MotionButton>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default BookingPage;
