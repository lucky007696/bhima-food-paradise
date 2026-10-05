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

const reservations = [];

app.post('/api/reservations', (req, res) => {
  const { name, phone, date, time, guests } = req.body;
  if (!name || !phone || !date || !time || !guests) {
    return res.status(400).json({ error: 'All fields are required.' });
  }
  const newReservation = { _id: Date.now().toString(), name, phone, date, time, guests };
  reservations.push(newReservation);
  res.status(201).json({ message: 'Reservation confirmed', reservation: newReservation });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
