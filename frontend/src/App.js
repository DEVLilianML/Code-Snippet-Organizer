
import React, { useState } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Auth from './components/Auth';
import Dashboard from './components/Dashboard';
import './App.css';

function App() {
  const [token, setToken] = useState(localStorage.getItem('token'));

  return (
    <Router>
      <div className="app-container">
        <Routes>
          {/* ✅ Login/Register page */}
          <Route path="/login" element={<Auth setToken={setToken} />} />

          {/* ✅ Dashboard page */}
          <Route
            path="/dashboard"
            element={token ? <Dashboard token={token} setToken={setToken} /> : <Navigate to="/login" />}
          />

          {/* ✅ Default route → redirect to dashboard */}
          <Route path="/" element={<Navigate to="/login" />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
