const express = require('express');
const app = express();
const cors = require('cors');

// Middleware
app.use(express.json());

// CORS configuration
app.use(cors({
  origin: "http://localhost:3000", // Sửa lại URL của client
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true
}));

// Set port
const PORT = process.env.PORT || 5000;

// Database
const db = require('./models');

// Routes
const homeRoute = require('./routes/homeRoute');
const userRoute = require('./routes/userRoute');
const dishRoute = require('./routes/dishRoute');
const menuRoute = require('./routes/menuRoute');
const invoiceRoute = require('./routes/invoiceRoute');
const detailInvoiceRoute = require('./routes/detailInvoiceRoute');
const bookingTableRoute = require('./routes/bookingTableRoute');
const authRoute = require('./routes/authRoute');

// Route middlewares
app.use('/auth', authRoute);
app.use('/', homeRoute);
app.use('/users', userRoute);
app.use('/dishes', dishRoute);
app.use('/menu', menuRoute);
app.use('/invoices', invoiceRoute);
app.use('/detail-invoice', detailInvoiceRoute);
app.use('/booking-table', bookingTableRoute);

// Basic route to check server status
app.get('/', (req, res) => {
  res.send('Server is running successfully!');
});

// Error handling middleware
app.use((err, req, res, next) => {
  console.error('Error:', err.stack);
  res.status(500).json({
    success: false,
    message: 'Internal server error'
  });
});

// Sync database and start server
db.sequelize.sync()
  .then(() => {
    console.log('Database synced');
    // Start server after database sync
    app.listen(PORT, () => {
      console.log(`Server is running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Failed to sync database:', err);
  });