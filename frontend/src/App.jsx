import { Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { Toaster } from 'react-hot-toast';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Menu from './components/Menu';
import ReservationForm from './components/ReservationForm';
import Footer from './components/Footer';
import WhatsAppButton from './components/WhatsAppButton';
import FloatingCallButton from './components/FloatingCallButton';
import Admin from './components/Admin';

function App() {
  const [logoUrl, setLogoUrl] = useState('/logo.png');

  useEffect(() => {
    const fetchSettings = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const res = await axios.get(`${API_URL}/api/settings`);
        if (res.data.logo) {
          setLogoUrl(res.data.logo);
        }
      } catch (err) {
        console.error('Failed to fetch settings', err);
      }
    };
    fetchSettings();
  }, []);

  return (
    <>
      <Toaster position="bottom-center" toastOptions={{ 
        style: { background: '#333', color: '#fff', borderRadius: '10px' },
        success: { iconTheme: { primary: '#4ade80', secondary: '#333' } }
      }} />
      <Routes>
        <Route path="/" element={
          <>
            <Navbar logoUrl={logoUrl} />
            <Hero logoUrl={logoUrl} />
            <About />
            <Menu />
            <ReservationForm />
            <Footer logoUrl={logoUrl} />
            <WhatsAppButton />
            <FloatingCallButton />
          </>
        } />
        
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </>
  );
}

export default App;
