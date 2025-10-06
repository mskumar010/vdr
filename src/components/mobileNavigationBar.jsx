import React, { useState } from 'react';
import { Link } from 'react-router-dom'; // Import Link from React Router
import './mobileNavigationBar.css';
import { FaHome } from "react-icons/fa";


import {
  Search,
  Shield,
  Home,
  Bell,
  ShoppingBag,
  ShieldQuestion,
  LogIn,
} from 'lucide-react'; // Import Lucide icons

const MobileNavigationBar = () => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleNavClick = (index) => {
    setActiveIndex(index);
  };

  return (
    <div className="bottom-nav-bar">
      <Link
        to="/" // React Router Link for Home
        className={`nav-item ${activeIndex === 0 ? 'active' : ''}`}
        onClick={() => handleNavClick(0)}
      >
        <Home />
        <span className="nav-label">Home</span>
      </Link>

      <Link
        to="/findDoctorPage" // React Router Link for Search
        className={`nav-item ${activeIndex === 1 ? 'active' : ''}`}
        onClick={() => handleNavClick(1)}
      >
        <Search />
        <span className="nav-label">Search</span>
      </Link>

      <Link
        to="/verifyDoc" // React Router Link for Add
        className={`nav-item ${activeIndex === 2 ? 'active' : ''}`}
        onClick={() => handleNavClick(2)}
      >
        <Shield />
        <span className="nav-label">Verify aDoc</span>
      </Link>

      <Link
        to="/sosPage" // React Router Link for Favorites
        className={`nav-item ${activeIndex === 3 ? 'active' : ''}`}
        onClick={() => handleNavClick(3)}
      >
        <Bell />
        <span className="nav-label">SOS</span>
      </Link>

      <Link
        to="/whyVhc" // React Router Link for Profile
        className={`nav-item ${activeIndex === 4 ? 'active' : ''}`}
        onClick={() => handleNavClick(4)}
      >
        <ShieldQuestion />
        <span className="nav-label">Why VDr</span>
      </Link>

      <Link
        to="https://vdr-door-delivery-medicines.netlify.app/" // React Router Link for Notifications
        className={`nav-item ${activeIndex === 5 ? 'active' : ''}`}
        onClick={() => handleNavClick(5)}
      >
        <ShoppingBag />
        <span className="nav-label">Doorstep</span>
      </Link>

      <Link
        to="https://vdr-insurance.netlify.app/" // React Router Link for Settings
        className={`nav-item ${activeIndex === 6 ? 'active' : ''}`}
        onClick={() => handleNavClick(6)}
      >
        <Shield />
        <span className="nav-label">Insurance</span>
      </Link>
     

      <Link
        to="/LoginAndRegistrationPage" // React Router Link for Info
        className={`nav-item ${activeIndex === 7 ? 'active' : ''}`}
        onClick={() => handleNavClick(7)}
      >
        < LogIn />
        <span className="nav-label">Login</span>
      </Link>
    </div>
  );
};

export default MobileNavigationBar;
