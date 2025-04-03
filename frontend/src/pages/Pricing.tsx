import React from 'react';

const Pricing: React.FC = () => {
  return (
    <div className="pricing-page">
      <h1>Pricing</h1>
      <div className="pricing-grid">
        <div className="pricing-card">
          <h2>Basic</h2>
          <p className="price">$9.99/month</p>
          <ul>
            <li>Feature 1</li>
            <li>Feature 2</li>
            <li>Feature 3</li>
          </ul>
          <button>Get Started</button>
        </div>
        <div className="pricing-card">
          <h2>Pro</h2>
          <p className="price">$19.99/month</p>
          <ul>
            <li>All Basic features</li>
            <li>Feature 4</li>
            <li>Feature 5</li>
          </ul>
          <button>Get Started</button>
        </div>
        <div className="pricing-card">
          <h2>Enterprise</h2>
          <p className="price">$49.99/month</p>
          <ul>
            <li>All Pro features</li>
            <li>Feature 6</li>
            <li>Feature 7</li>
          </ul>
          <button>Get Started</button>
        </div>
      </div>
    </div>
  );
};

export default Pricing; 