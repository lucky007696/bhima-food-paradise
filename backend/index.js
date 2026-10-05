require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');

const app = express();

app.use(cors());
app.use(express.json());

// Load the comprehensive menu from external file
const menuItems = require('./menuData');

app.get('/api/menu', (req, res) => {
  res.json(menuItems);
});

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log('✅ MongoDB Connected Successfully'))
  .catch(err => console.error('❌ MongoDB Connection Error:', err));

// Define Reservation Schema and Model
const reservationSchema = new mongoose.Schema({
  name: { type: String, required: true },
  phone: { type: String, required: true },
  date: { type: String, required: true },
  time: { type: String, required: true },
  guests: { type: String, required: true },
  status: { type: String, default: 'Pending' },
  createdAt: { type: Date, default: Date.now }
});

const Reservation = mongoose.model('Reservation', reservationSchema);

app.post('/api/reservations', async (req, res) => {
  const { name, phone, date, time, guests } = req.body;
  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  
  try {
    const newReservation = new Reservation({ name, phone, date, time, guests });
    await newReservation.save();
    res.status(201).json({ message: 'Reservation confirmed', reservation: newReservation });
  } catch (err) {
    res.status(500).json({ error: 'Failed to save reservation.' });
  }
});

// Admin Authentication Middleware
const adminAuth = (req, res, next) => {
  const password = req.headers['x-admin-password'];
  const correctPassword = process.env.ADMIN_PASSWORD || 'bhima123';
  if (password === correctPassword) {
    next();
  } else {
    res.status(401).json({ error: 'Unauthorized. Incorrect password.' });
  }
};

app.get('/api/admin/reservations', adminAuth, async (req, res) => {
  try {
    const reservations = await Reservation.find().sort({ createdAt: -1 });
    res.json(reservations);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch reservations.' });
  }
});

app.delete('/api/admin/reservations/:id', adminAuth, async (req, res) => {
  try {
    await Reservation.findByIdAndDelete(req.params.id);
    res.json({ message: 'Reservation removed successfully' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to remove reservation.' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
