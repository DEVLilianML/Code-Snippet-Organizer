
import React, { useState } from 'react';
import SearchBar from './SearchBar';
import List from './List';
import Form from './Form';
import './Dashboard.css';

function Dashboard({ token, setToken }) {
  const [activeSection, setActiveSection] = useState('snippets'); // ✅ Default active

  const logout = () => {
    localStorage.removeItem('token');
    setToken(null);
    window.location.href = '/login';
  };

  return (
    <div className="dashboard">
      <h2>Welcome to Snippet Organiser</h2>

      <div className="snip-container">
        <div>
          <button onClick={() => setActiveSection('snippets')}>Search Snippets</button>
          <button onClick={() => setActiveSection('add')}>Add Snippet</button>
          <button onClick={logout}>Logout</button>
        </div>
      </div>

      <div className="content-section">
        {activeSection === 'add' && <Form token={token} />}
        {activeSection === 'snippets' && <List token={token} />}
      </div>
    </div>
  );
}

export default Dashboard;
