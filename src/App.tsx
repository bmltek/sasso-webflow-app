import React, { useState } from 'react';
import { Link, Route, BrowserRouter as Router, Routes } from 'react-router-dom';

// Components
const Dashboard = () => (
  <div>
    <h1>Dashboard</h1>
    <input type="text" placeholder="Search..." aria-label="search" />
    <button>Filter</button>
    <div className="filter-options" style={{ display: 'none' }}>Filter Options</div>
  </div>
);

const Analytics = () => <div><h1>Analytics Dashboard</h1></div>;
const Metrics = () => <div><h1>Metrics Dashboard</h1></div>;

// Error Boundary Component
class ErrorBoundary extends React.Component<
  { children: React.ReactNode },
  { hasError: boolean }
> {
  constructor(props: { children: React.ReactNode }) {
    super(props);
    this.state = { hasError: false };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  render() {
    if (this.state.hasError) {
      return <div>Something went wrong</div>;
    }
    return this.props.children;
  }
}

const App: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  return (
    <ErrorBoundary>
      <Router>
        <div className="app">
          <nav>
            <ul>
              <li><Link to="/">Dashboard</Link></li>
              <li><Link to="/analytics">Analytics</Link></li>
              <li><Link to="/metrics">Metrics</Link></li>
            </ul>
          </nav>

          <main>
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

            {showFilters && (
              <div className="filter-options">
                Filter options
              </div>
            )}

            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/analytics" element={<Analytics />} />
              <Route path="/metrics" element={<Metrics />} />
            </Routes>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;