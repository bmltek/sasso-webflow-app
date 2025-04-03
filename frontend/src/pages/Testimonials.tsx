import React from 'react';

const Testimonials: React.FC = () => {
  return (
    <div className="testimonials-page">
      <h1>Testimonials</h1>
      <div className="testimonials-grid">
        <div className="testimonial-card">
          <div className="testimonial-content">
            <p>"This product has transformed our workflow. Highly recommended!"</p>
          </div>
          <div className="testimonial-author">
            <h3>John Doe</h3>
            <p>CEO, Tech Corp</p>
          </div>
        </div>
        <div className="testimonial-card">
          <div className="testimonial-content">
            <p>"The best solution we've found for our team's needs."</p>
          </div>
          <div className="testimonial-author">
            <h3>Jane Smith</h3>
            <p>CTO, Innovation Labs</p>
          </div>
        </div>
        <div className="testimonial-card">
          <div className="testimonial-content">
            <p>"Exceptional service and outstanding features."</p>
          </div>
          <div className="testimonial-author">
            <h3>Mike Johnson</h3>
            <p>Lead Developer, StartUp Inc</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Testimonials; 