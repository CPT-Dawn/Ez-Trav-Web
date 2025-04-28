import React, { useState, useEffect, useRef } from "react";
import {
  GoogleMap,
  DirectionsRenderer,
  useJsApiLoader,
} from "@react-google-maps/api";

const containerStyle = {
  width: "100%",
  height: "400px",
  borderRadius: "16px",
};

const dummyVehicles = [
  { id: 1, type: "Standard", price: "₹150" },
  { id: 2, type: "Comfort", price: "₹220" },
  { id: 3, type: "Luxury", price: "₹400" },
];

const BookingPage = () => {
  const [pickup, setPickup] = useState("");
  const [destination, setDestination] = useState("");
  const pickupRef = useRef(null);
  const destinationRef = useRef(null);
  const [directionsResponse, setDirectionsResponse] = useState(null);
  const [selectedVehicle, setSelectedVehicle] = useState(null);
  const [rideConfirmed, setRideConfirmed] = useState(false);
  const [eta, setEta] = useState("");
  const [aqi, setAqi] = useState(null);

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: "AIzaSyC7egbUiZzouXh68Qg5C95YrbzuGT0av_Y", // <-- Replace with your actual key
    libraries: ["places"],
  });

  useEffect(() => {
    if (isLoaded && window.google) {
      if (pickupRef.current) {
        const autocompletePickup = new window.google.maps.places.Autocomplete(
          pickupRef.current,
          { types: ["geocode"] }
        );
        autocompletePickup.addListener("place_changed", () => {
          const place = autocompletePickup.getPlace();
          setPickup(place.formatted_address || "");
        });
      }
      if (destinationRef.current) {
        const autocompleteDestination = new window.google.maps.places.Autocomplete(
          destinationRef.current,
          { types: ["geocode"] }
        );
        autocompleteDestination.addListener("place_changed", () => {
          const place = autocompleteDestination.getPlace();
          setDestination(place.formatted_address || "");
        });
      }
    }
  }, [isLoaded]);

  useEffect(() => {
    if (pickup && destination && isLoaded && window.google) {
      const directionsService = new window.google.maps.DirectionsService();
      directionsService.route(
        {
          origin: pickup,
          destination: destination,
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (result, status) => {
          if (status === "OK" && result) {
            setDirectionsResponse(result);
            const durationText = result.routes[0].legs[0].duration.text;
            setEta(durationText);

            const point = result.routes[0].overview_path[0];
            fetchAQI(point.lat(), point.lng());
          } else {
            console.error("Error fetching directions:", status);
          }
        }
      );
    }
  }, [pickup, destination, isLoaded]);

  const fetchAQI = async (lat, lng) => {
    try {
      const apiKey = "YOUR_GOOGLE_API_KEY"; // <-- Replace your key
      const response = await fetch(
        `https://airquality.googleapis.com/v1/currentConditions:lookup?key=${apiKey}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            location: { latitude: lat, longitude: lng },
            extraComputations: ["LOCAL_AQI"],
            languageCode: "en",
          }),
        }
      );
  
      const data = await response.json();
      console.log("Google AQI Data:", data);
  
      if (Array.isArray(data.indexes) && data.indexes.length > 0) {
        const aqiValue = data.indexes[0].aqi; // <-- Correct place!
        setAqi(aqiValue);
      } else {
        console.error("Invalid AQI response:", data);
        setAqi("unavailable");
      }
    } catch (error) {
      console.error("Failed to fetch AQI:", error);
      setAqi("unavailable");
    }
  };
  

  const handleVehicleSelect = (vehicle) => {
    setSelectedVehicle(vehicle);
    setRideConfirmed(false);
  };

  const handleConfirmRide = () => {
    setRideConfirmed(true);
  };

  const getAQILevel = (aqi) => {
    if (typeof aqi !== "number") return "Unavailable";
    if (aqi <= 50) return "Good";
    if (aqi <= 100) return "Fair";
    if (aqi <= 150) return "Moderate";
    if (aqi <= 200) return "Poor";
    return "Very Poor";
  };

  const getAQIColor = (aqi) => {
    if (typeof aqi !== "number") return "bg-gray-400";
    if (aqi <= 50) return "bg-green-400";
    if (aqi <= 100) return "bg-yellow-400";
    if (aqi <= 150) return "bg-orange-400";
    if (aqi <= 200) return "bg-red-400";
    return "bg-purple-800";
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 flex flex-col items-center p-6">
      <h1 className="text-5xl font-extrabold text-purple-700 mb-10 drop-shadow-lg">
        EzTrav
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 w-full max-w-7xl">
        {/* Left Side */}
        <div className="bg-white p-8 rounded-3xl shadow-2xl flex flex-col">
          <div className="space-y-6">
            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Pickup Location
              </label>
              <input
                type="text"
                ref={pickupRef}
                placeholder="Enter pickup address"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
              />
            </div>

            <div>
              <label className="block text-gray-700 font-semibold mb-2">
                Destination
              </label>
              <input
                type="text"
                ref={destinationRef}
                placeholder="Enter destination address"
                className="w-full p-4 border border-gray-300 rounded-xl focus:outline-none focus:ring-4 focus:ring-purple-400 transition"
              />
            </div>
          </div>

          {/* Vehicle Selection */}
          <div className="mt-8">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              Choose Your Vehicle
            </h2>
            <div className="grid grid-cols-1 gap-4">
              {dummyVehicles.map((vehicle) => (
                <div
                  key={vehicle.id}
                  onClick={() => handleVehicleSelect(vehicle)}
                  className={`p-5 border rounded-2xl flex justify-between items-center cursor-pointer transition transform hover:scale-105
                    ${
                      selectedVehicle?.id === vehicle.id
                        ? "border-purple-500 bg-purple-100"
                        : "bg-gray-50"
                    }
                  `}
                >
                  <span className="text-lg font-semibold">{vehicle.type}</span>
                  <span className="text-lg font-bold">{vehicle.price}</span>
                </div>
              ))}
            </div>

            {selectedVehicle && !rideConfirmed && (
              <div className="text-center mt-8">
                <button
                  onClick={handleConfirmRide}
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 text-white px-8 py-4 rounded-full font-bold text-lg shadow-lg hover:scale-105 transition transform"
                >
                  Confirm {selectedVehicle.type} Ride
                </button>
              </div>
            )}

            {rideConfirmed && (
              <div className="text-center mt-8">
                <h2 className="text-3xl font-bold text-green-600">
                  🎉 Ride Confirmed!
                </h2>
                <p className="mt-2 text-gray-600">
                  Your {selectedVehicle.type} ride is on its way!
                </p>
              </div>
            )}
          </div>
        </div>

        {/* Right Side - Map */}
        <div className="flex flex-col">
          <div className="bg-white p-6 rounded-3xl shadow-2xl">
            {!isLoaded ? (
              <div className="w-full h-[400px] bg-gray-200 animate-pulse rounded-2xl"></div>
            ) : (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={
                  directionsResponse
                    ? directionsResponse.routes[0].overview_path[0]
                    : { lat: 28.6139, lng: 77.209 }
                }
                zoom={13}
                options={{ disableDefaultUI: true }}
              >
                {directionsResponse && (
                  <DirectionsRenderer
                    directions={directionsResponse}
                    options={{
                      polylineOptions: {
                        strokeColor: "#7c3aed",
                        strokeOpacity: 0.9,
                        strokeWeight: 6,
                      },
                    }}
                  />
                )}
              </GoogleMap>
            )}
          </div>

          {/* ETA and AQI Details */}
          <div className="mt-6 bg-white p-6 rounded-3xl shadow-2xl flex flex-col md:flex-row justify-around text-center text-lg font-semibold">
            <div>
              ⏰ Estimated Time:
              <span className="text-purple-600 ml-2">{eta || "N/A"}</span>
            </div>
            <div className="mt-4 md:mt-0 flex flex-col items-center">
              🌫️ Air Quality:
              {aqi && typeof aqi === "number" && (
                <div className="flex items-center gap-2 mt-2">
                  <div className={`w-4 h-4 rounded-full ${getAQIColor(aqi)}`}></div>
                  <span className="text-green-600">{`${getAQILevel(aqi)} (${aqi})`}</span>
                </div>
              )}
              {aqi === "unavailable" && <span className="text-gray-500 ml-2">Unavailable</span>}
              {!aqi && aqi !== "unavailable" && <span className="text-gray-500 ml-2">Loading...</span>}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default BookingPage;
