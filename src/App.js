import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Login from './components/Login/Login';
import Signup from './components/Signup/Signup';
import Dashboard from './components/Dashboard/Dashboard';
import CurrencyDetail from './components/Dashboard/CurrencyDetail';
import './App.css';
import TopGainers from './components/Dashboard/TopGainers'; // Assuming you have a TopGainer component
import Analytics from './components/Analytics/Analytics';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/analytics" element={<Analytics/>} />
        <Route path="/top-gainer/:base_address" element={<TopGainers />} />

        <Route path="/currency-detail/:base_address" element={<CurrencyDetail />} />
        
      </Routes>
    </BrowserRouter>
  );
}

export default App;
