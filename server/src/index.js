// server/index.js
const express = require('express');
const app = express();
const cors = require('cors');
app.use(express.json());

app.use(cors({
  origin: "http://localhost:5000", // URL của client
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
  credentials: true // Nếu bạn sử dụng cookies/sessions
}));

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

//router

const homeRoute = require('./routes/homeRoute');
const userRoute = require('./routes/userRoute');
const dishRoute = require('./routes/dishRoute');
const menuRoute = require('./routes/menuRoute');
const invoiceRoute = require('./routes/invoiceRoute');
const detailInvoiceRoute = require('./routes/detailInvoiceRoute');
const bookingTableRoute = require('./routes/bookingTableRoute');

app.use('/', homeRoute);
app.use('/users', userRoute);
app.use('/dishes', dishRoute);
app.use('/menu', menuRoute);
app.use('/invoices', invoiceRoute);
app.use('/detail-invoice', detailInvoiceRoute);
app.use('/booking-table', bookingTableRoute);

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

const db = require('./models');

db.sequelize.sync().then(() => {
  console.log('Database synced');
}).catch((err) => {
  console.error('Failed to sync database:', err);
});

// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(500).json({
//     status: 'error',
//     message: 'Something went wrong!'
//   });
// });