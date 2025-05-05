import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';
import logo from '../../assets/images/logo.png';
import {FaSignOutAlt } from 'react-icons/fa';
const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      console.log("Access Token:", accessToken);

      // Make an API call to logout
      const response = await axios.post('http://127.0.0.1:5000/logout', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      console.log("Logout Response:", response);

      // Clear local storage and redirect to login page
      localStorage.removeItem('accessToken');
      console.log("Access Token removed from local storage");

      navigate('/');
      console.log("Navigated to login page");
    } catch (error) {
      console.error("Failed to logout. Please try again later.", error);
      alert("Failed to logout. Please try again later.");
    }
  };

  return (
    <nav className="navbar">
      <div className="container-fluid">
        <div className="navbar-logo">
          <a href='/dashboard'>
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <div className="navbar-actions">
          <button onClick={handleLogout} className="logout-button mobile-res">
          <FaSignOutAlt className="logout-icon" />
            <span className="logout-text">Logout</span>
          </button>
        </div>
        
      </div>
    </nav>
  );
};

export default Navbar;
