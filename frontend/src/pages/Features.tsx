import React from 'react';

const Features: React.FC = () => {
  return (
    <div className="features-page">
      <h1>Features</h1>
      <div className="features-grid">
        <div className="feature-card">
          <h2>Feature 1</h2>
          <p>Description of feature 1</p>
        </div>
        <div className="feature-card">
          <h2>Feature 2</h2>
          <p>Description of feature 2</p>
        </div>
        <div className="feature-card">
          <h2>Feature 3</h2>
          <p>Description of feature 3</p>
        </div>
      </div>
    </div>
  );
};

export default Features; 