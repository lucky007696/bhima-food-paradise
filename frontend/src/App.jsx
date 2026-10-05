import { Routes, Route } from 'react-router-dom';
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
  return (
    <Routes>
      <Route path="/" element={
        <>
          <Navbar />
          <Hero />
          <About />
          <Menu />
          <ReservationForm />
          <Footer />
          <WhatsAppButton />
          <FloatingCallButton />
        </>
      } />
      
      <Route path="/admin" element={<Admin />} />
    </Routes>
  );
}

export default App;
