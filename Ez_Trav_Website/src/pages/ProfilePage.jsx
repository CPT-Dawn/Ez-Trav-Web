import React, { useState } from "react";
import { motion } from "framer-motion";

const ProfilePage = ({ onLogout }) => {
  const [activeTab, setActiveTab] = useState("profile");
  const [user, setUser] = useState({
    name: "John Doe",
    email: "john.doe@example.com",
    phone: "+1 (555) 123-4567",
    address: "123 Main St, New York, NY",
  });
  const [editing, setEditing] = useState(false);
  const [editForm, setEditForm] = useState({ ...user });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSaveChanges = (e) => {
    e.preventDefault();
    setUser({ ...editForm });
    setEditing(false);
  };

  const tabItems = [
    { id: "profile", label: "Profile" },
    { id: "rides", label: "My Rides" },
    { id: "payment", label: "Payment Methods" },
  ];

  // Mocked ride history
  const rideHistory = [
    {
      id: 1,
      date: "2025-04-25",
      from: "Home",
      to: "Office",
      amount: "$15.50",
      status: "Completed",
    },
    {
      id: 2,
      date: "2025-04-22",
      from: "Airport",
      to: "Hotel",
      amount: "$32.75",
      status: "Completed",
    },
    {
      id: 3,
      date: "2025-04-18",
      from: "Office",
      to: "Restaurant",
      amount: "$12.20",
      status: "Completed",
    },
    {
      id: 4,
      date: "2025-04-15",
      from: "Home",
      to: "Mall",
      amount: "$18.90",
      status: "Cancelled",
    },
  ];

  // Mocked payment methods
  const paymentMethods = [
    {
      id: 1,
      type: "Credit Card",
      name: "Visa ending in 4242",
      isDefault: true,
    },
    { id: 2, type: "PayPal", name: "john.doe@example.com", isDefault: false },
  ];

  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="container mx-auto px-4 py-8"
    >
      <div className="max-w-4xl mx-auto bg-white rounded-lg shadow-md overflow-hidden">
        {/* Header */}
        <div className="bg-purple-600 p-6 text-white">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">My Profile</h1>
              <p className="text-purple-200">
                Manage your account settings and preferences
              </p>
            </div>
            <div className="h-16 w-16 bg-white rounded-full flex items-center justify-center text-purple-600 font-bold text-xl">
              {user.name
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="border-b">
          <nav className="flex">
            {tabItems.map((tab) => (
              <button
                key={tab.id}
                className={`px-6 py-4 text-sm font-medium ${
                  activeTab === tab.id
                    ? "border-b-2 border-purple-600 text-purple-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
                onClick={() => setActiveTab(tab.id)}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Tab Content */}
        <div className="p-6">
          {/* Profile Tab */}
          {activeTab === "profile" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Personal Information
                </h2>
                {!editing && (
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="btn btn-outline"
                    onClick={() => setEditing(true)}
                  >
                    Edit Profile
                  </motion.button>
                )}
              </div>

              {!editing ? (
                <div className="bg-gray-50 rounded-lg p-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <p className="text-gray-500 mb-1">Full Name</p>
                      <p className="font-medium">{user.name}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Email</p>
                      <p className="font-medium">{user.email}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Phone</p>
                      <p className="font-medium">{user.phone}</p>
                    </div>
                    <div>
                      <p className="text-gray-500 mb-1">Address</p>
                      <p className="font-medium">{user.address}</p>
                    </div>
                  </div>

                  <div className="mt-8 pt-6 border-t border-gray-200">
                    <h3 className="font-semibold mb-4 text-gray-700">
                      Account Actions
                    </h3>
                    <div className="flex space-x-4">
                      <button className="btn btn-outline text-gray-600 border-gray-300">
                        Change Password
                      </button>
                      <button
                        className="btn bg-red-600 text-white hover:bg-red-700"
                        onClick={onLogout}
                      >
                        Log Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <motion.form
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  onSubmit={handleSaveChanges}
                >
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="name"
                      >
                        Full Name
                      </label>
                      <input
                        id="name"
                        name="name"
                        type="text"
                        className="input"
                        value={editForm.name}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="email"
                      >
                        Email
                      </label>
                      <input
                        id="email"
                        name="email"
                        type="email"
                        className="input"
                        value={editForm.email}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="phone"
                      >
                        Phone
                      </label>
                      <input
                        id="phone"
                        name="phone"
                        type="tel"
                        className="input"
                        value={editForm.phone}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                    <div>
                      <label
                        className="block text-gray-700 mb-2"
                        htmlFor="address"
                      >
                        Address
                      </label>
                      <input
                        id="address"
                        name="address"
                        type="text"
                        className="input"
                        value={editForm.address}
                        onChange={handleInputChange}
                        required
                      />
                    </div>
                  </div>

                  <div className="flex justify-end mt-6 space-x-4">
                    <button
                      type="button"
                      className="btn btn-outline"
                      onClick={() => setEditing(false)}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="btn btn-primary">
                      Save Changes
                    </button>
                  </div>
                </motion.form>
              )}
            </motion.div>
          )}

          {/* Rides Tab */}
          {activeTab === "rides" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <h2 className="text-xl font-semibold text-gray-800 mb-6">
                My Ride History
              </h2>

              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead className="bg-gray-50 text-left">
                    <tr>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Date
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        From
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        To
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Amount
                      </th>
                      <th className="px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider">
                        Status
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-200">
                    {rideHistory.map((ride) => (
                      <tr key={ride.id} className="hover:bg-gray-50">
                        <td className="px-6 py-4 whitespace-nowrap">
                          {ride.date}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {ride.from}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {ride.to}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          {ride.amount}
                        </td>
                        <td className="px-6 py-4 whitespace-nowrap">
                          <span
                            className={`px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full ${
                              ride.status === "Completed"
                                ? "bg-green-100 text-green-800"
                                : "bg-red-100 text-red-800"
                            }`}
                          >
                            {ride.status}
                          </span>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {rideHistory.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">
                    You haven't taken any rides yet.
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Payment Methods Tab */}
          {activeTab === "payment" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-semibold text-gray-800">
                  Payment Methods
                </h2>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="btn btn-outline"
                >
                  Add Payment Method
                </motion.button>
              </div>

              <div className="space-y-4">
                {paymentMethods.map((method) => (
                  <div
                    key={method.id}
                    className="border rounded-lg p-4 flex justify-between items-center"
                  >
                    <div className="flex items-center">
                      <div className="bg-purple-100 text-purple-700 rounded-full p-3 mr-4">
                        {method.type === "Credit Card" ? "💳" : "💰"}
                      </div>
                      <div>
                        <p className="font-medium">{method.name}</p>
                        <p className="text-sm text-gray-500">{method.type}</p>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      {method.isDefault && (
                        <span className="bg-purple-100 text-purple-700 text-xs font-medium px-2 py-1 rounded">
                          Default
                        </span>
                      )}
                      <button className="text-gray-500 hover:text-gray-700">
                        <span className="sr-only">Edit</span>
                        ✏️
                      </button>
                      <button className="text-gray-500 hover:text-red-600">
                        <span className="sr-only">Delete</span>
                        🗑️
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {paymentMethods.length === 0 && (
                <div className="text-center py-8">
                  <p className="text-gray-500">No payment methods added yet.</p>
                </div>
              )}
            </motion.div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default ProfilePage;
