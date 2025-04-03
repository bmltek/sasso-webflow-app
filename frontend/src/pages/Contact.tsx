import React, { useState } from 'react';

const Contact: React.FC = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle form submission
    console.log('Form submitted:', formData);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  return (
    <div className="contact-page">
      <h1>Contact Us</h1>
      <div className="contact-container">
        <form onSubmit={handleSubmit} className="contact-form">
          <div className="form-group">
            <label htmlFor="name">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="message">Message</label>
            <textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit">Send Message</button>
        </form>
        <div className="contact-info">
          <h2>Get in Touch</h2>
          <p>Have questions? We'd love to hear from you.</p>
          <div className="info-item">
            <strong>Email:</strong>
            <p>contact@example.com</p>
          </div>
          <div className="info-item">
            <strong>Phone:</strong>
            <p>+1 (555) 123-4567</p>
          </div>
          <div className="info-item">
            <strong>Address:</strong>
            <p>123 Business Street<br />Tech City, TC 12345</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contact; 