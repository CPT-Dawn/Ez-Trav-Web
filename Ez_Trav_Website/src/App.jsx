import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AnimatePresence } from 'framer-motion';

// Pages
import Login from './pages/Login';
import Signup from './pages/Signup';
import Homepage from './pages/Homepage';
import BookingPage from './pages/BookingPage';
import ProfilePage from './pages/ProfilePage';
import About from './pages/About';
import NotFound from './pages/NotFound';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

function App() {
  // Simple auth state (would connect to actual auth in a real app)
  const [isAuthenticated, setIsAuthenticated] = React.useState(
    localStorage.getItem('ezTravAuth') === 'true'
  );

  const login = () => {
    localStorage.setItem('ezTravAuth', 'true');
    setIsAuthenticated(true);
  };

  const logout = () => {
    localStorage.removeItem('ezTravAuth');
    setIsAuthenticated(false);
  };

  return (
    <Router>
      <div className="flex flex-col min-h-screen bg-gray-50">
        <Navbar isAuthenticated={isAuthenticated} onLogout={logout} />
        <main className="flex-grow">
          <AnimatePresence mode="wait">
            <Routes>
              <Route 
                path="/login" 
                element={
                  isAuthenticated ? 
                  <Navigate to="/" /> : 
                  <Login onLogin={login} />
                } 
              />
              <Route 
                path="/signup" 
                element={
                  isAuthenticated ? 
                  <Navigate to="/" /> : 
                  <Signup onSignup={login} />
                } 
              />
              <Route 
                path="/" 
                element={
                  isAuthenticated ? 
                  <Homepage /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/booking" 
                element={
                  isAuthenticated ? 
                  <BookingPage /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route 
                path="/profile" 
                element={
                  isAuthenticated ? 
                  <ProfilePage onLogout={logout} /> : 
                  <Navigate to="/login" />
                } 
              />
              <Route path="/about" element={<About />} />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </AnimatePresence>
        </main>
        <Footer />
      </div>
    </Router>
  );
}

export default App;