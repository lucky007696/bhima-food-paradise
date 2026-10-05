require('dotenv').config();
const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const cloudinary = require('cloudinary').v2;
const { CloudinaryStorage } = require('multer-storage-cloudinary');
const multer = require('multer');

const app = express();

app.use(cors());
app.use(express.json());

// Configure Cloudinary (Automatically uses CLOUDINARY_URL from .env if present)
const storage = new CloudinaryStorage({
  cloudinary: cloudinary,
  params: {
    folder: 'bhima_menu',
    allowedFormats: ['jpeg', 'png', 'jpg', 'webp']
  }
});
const upload = multer({ storage: storage });

// Define Menu Schema
const menuItemSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: String, required: true },
  category: { type: String, required: true },
  image: { type: String, default: 'https://placehold.co/400x300?text=No+Image' },
  isVeg: { type: Boolean, default: false }
});
const MenuItem = mongoose.model('MenuItem', menuItemSchema);

// Define Settings Schema (for logo, etc.)
const settingsSchema = new mongoose.Schema({
  key: { type: String, unique: true },
  value: String
});
const Settings = mongoose.model('Settings', settingsSchema);

// Get Settings
app.get('/api/settings', async (req, res) => {
  try {
    const settings = await Settings.find();
    const settingsMap = {};
    settings.forEach(s => settingsMap[s.key] = s.value);
    res.json(settingsMap);
  } catch (err) {
    res.status(500).json({ error: 'Failed to fetch settings' });
  }
});

// Get Menu (with automatic DB seeding if empty)
app.get('/api/menu', async (req, res) => {
  try {
    let items = await MenuItem.find();
    if (items.length === 0) {
      // Seed with initial data if empty
      const initialMenu = require('./menuData');
      const cleanedMenu = initialMenu.map(item => {
        const { _id, id, ...rest } = item;
        return rest;
      });
      await MenuItem.insertMany(cleanedMenu);
      items = await MenuItem.find();
    }
    res.json(items);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to fetch menu' });
  }
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

    // Send WhatsApp Notification via CallMeBot
    try {
      const callMeBotPhone = process.env.CALLMEBOT_PHONE;
      const callMeBotApiKey = process.env.CALLMEBOT_API_KEY;
      if (callMeBotPhone && callMeBotApiKey) {
        const text = `🔔 *New Table Reservation!*\n\n*Name:* ${name}\n*Phone:* ${phone}\n*Date:* ${new Date(date).toLocaleDateString()}\n*Time:* ${time}\n*Guests:* ${guests} people`;
        const encodedText = encodeURIComponent(text);
        const url = `https://api.callmebot.com/whatsapp.php?phone=${callMeBotPhone}&text=${encodedText}&apikey=${callMeBotApiKey}`;
        fetch(url).catch(e => console.error("CallMeBot error:", e.message));
      }
    } catch (waErr) {
      console.error("WhatsApp notification failed:", waErr);
    }

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

// Admin Add Menu Item
app.post('/api/admin/menu', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, isVeg } = req.body;
    const image = req.file ? req.file.path : '';
    
    if (!name || !price || !category || !image) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    
    const newItem = new MenuItem({
      name, description, price, category, image, isVeg: isVeg === 'true'
    });
    
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to create menu item' });
  }
});

// Admin Delete Menu Item
app.delete('/api/admin/menu/:id', adminAuth, async (req, res) => {
  try {
    await MenuItem.findByIdAndDelete(req.params.id);
    res.json({ message: 'Item deleted' });
  } catch (err) {
    res.status(500).json({ error: 'Failed to delete item' });
  }
});

// Admin Update Menu Item
app.put('/api/admin/menu/:id', adminAuth, upload.single('image'), async (req, res) => {
  try {
    const { name, description, price, category, isVeg } = req.body;
    const updateData = { name, description, price, category, isVeg: isVeg === 'true' };
    
    if (req.file) {
      updateData.image = req.file.path;
    }
    
    const updatedItem = await MenuItem.findByIdAndUpdate(req.params.id, updateData, { new: true });
    res.json(updatedItem);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update item' });
  }
});

// Admin Update Logo
app.post('/api/admin/settings/logo', adminAuth, upload.single('logo'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ error: 'No image uploaded' });
    
    await Settings.findOneAndUpdate(
      { key: 'logo' }, 
      { value: req.file.path }, 
      { upsert: true }
    );
    res.json({ message: 'Logo updated successfully', logoUrl: req.file.path });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Failed to update logo' });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
