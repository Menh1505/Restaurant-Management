// server/index.js

const express = require('express');
const app = express();

// Set a port
const PORT = process.env.PORT || 5000;

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

// Example API route for testing
app.get('/api/test', (req, res) => {
  res.json({ message: 'API test route is working!' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

