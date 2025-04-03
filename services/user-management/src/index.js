const express = require('express');
const app = express();
const port = process.env.PORT || 4002;

// Middleware
app.use(express.json());

// Health check endpoint
app.get('/health', (req, res) => {
  res.status(200).json({ status: 'healthy' });
});

// Start server
app.listen(port, () => {
  console.log(`User service listening on port ${port}`);
}); 