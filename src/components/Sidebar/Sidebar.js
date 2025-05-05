// Sidebar.js
import React, { useState } from 'react';
import axios from 'axios';
import { NavLink, useNavigate } from 'react-router-dom';
import { Nav } from 'react-bootstrap';
import { FaHome, FaChartLine, FaBars, FaSignOutAlt } from 'react-icons/fa';
import './Sidebar.css';
import logo from '../../assets/images/logo.png';

const Sidebar = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      const accessToken = localStorage.getItem('accessToken');
      const response = await axios.post('http://127.0.0.1:5000/logout', null, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      });

      localStorage.removeItem('accessToken');
      navigate('/');
    } catch (error) {
      console.error("Failed to logout. Please try again later.", error);
      alert("Failed to logout. Please try again later.");
    }
  };

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div>
      <button className="sidebar-toggle" onClick={toggleSidebar}>
        <FaBars />
      </button>
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <div className="sidebar-header mobile-only">
          <a href='/dashboard' className="sidebar-logo">
            <img src={logo} alt="Logo" />
          </a>
        </div>
        <Nav defaultActiveKey="/Token" className="flex-column">
          <Nav.Link as={NavLink} to="/dashboard" onClick={toggleSidebar}>
            <FaHome className="nav-icon" /> Token
          </Nav.Link>
          <Nav.Link as={NavLink} to="/analytics" onClick={toggleSidebar}>
            <FaChartLine className="nav-icon" /> Analytics
          </Nav.Link>
          {/* <Nav.Link as={NavLink} to="/TopGainers" onClick={toggleSidebar}>
            <FaArrowUp className="nav-icon" /> Top Gainer
          </Nav.Link>
          <Nav.Link as={NavLink} to="/TopVolume" onClick={toggleSidebar}>
            <FaArrowCircleUp className="nav-icon" /> Top Volume
          </Nav.Link> */}
          <div className="logout-container">
            <button onClick={handleLogout} className="logout-button mobile-only">
              <FaSignOutAlt className="logout-icon" />
              <span className="logout-text">Logout</span>
            </button>
          </div>
        </Nav>
      </div>
    </div>
  );
};

export default Sidebar;
