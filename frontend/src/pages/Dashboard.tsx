import React, { useState } from 'react';

const Dashboard: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <h1>Dashboard</h1>
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button onClick={() => setShowFilters(!showFilters)}>
            Filter
          </button>
        </div>
      </div>

      {showFilters && (
        <div className="filter-options">
          <h3>Filter Options</h3>
          <div className="filter-group">
            <label>
              <input type="checkbox" /> Option 1
            </label>
            <label>
              <input type="checkbox" /> Option 2
            </label>
            <label>
              <input type="checkbox" /> Option 3
            </label>
          </div>
        </div>
      )}

      <div className="dashboard-content">
        <div className="stats-grid">
          <div className="stat-card">
            <h3>Total Users</h3>
            <p>1,234</p>
          </div>
          <div className="stat-card">
            <h3>Active Sessions</h3>
            <p>56</p>
          </div>
          <div className="stat-card">
            <h3>Revenue</h3>
            <p>$12,345</p>
          </div>
        </div>

        <div className="recent-activity">
          <h2>Recent Activity</h2>
          <ul>
            <li>User John Doe logged in</li>
            <li>New order #12345 received</li>
            <li>System update completed</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Dashboard; 