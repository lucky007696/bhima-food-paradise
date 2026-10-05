import { useState } from 'react';
import axios from 'axios';
import { motion } from 'framer-motion';
import { User, Phone, Calendar, Clock, Users, CheckCircle } from 'lucide-react';

const ReservationForm = () => {
  const [formData, setFormData] = useState({ name: '', phone: '', date: '', time: '', guests: '2' });
  const [status, setStatus] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.post(`${API_URL}/api/reservations`, formData);
      setStatus('success');
      setFormData({ name: '', phone: '', date: '', time: '', guests: '2' });
    } catch (error) {
      console.error(error);
      setStatus('error');
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => setFormData({ ...formData, [e.target.name]: e.target.value });

  return (
    <section
      id="reservation"
      style={{
        padding: '6rem 0',
        background: 'var(--bg-dark)',
        position: 'relative',
        overflow: 'hidden',
      }}
    >
      {/* Glow accents */}
      <div style={{ position: 'absolute', top: '15%', right: '-8%', width: '350px', height: '350px', background: 'radial-gradient(circle, rgba(245,158,11,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />
      <div style={{ position: 'absolute', bottom: '15%', left: '-8%', width: '280px', height: '280px', background: 'radial-gradient(circle, rgba(180,83,9,0.1) 0%, transparent 70%)', pointerEvents: 'none' }} />

      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3.5rem' }}
        >
          <span className="section-label">Join Us</span>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
            Reserve Your <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Table</span>
          </h2>
          <div className="gold-divider" />
          <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--text-muted)', marginTop: '1.25rem', fontSize: '0.95rem' }}>
            Book your table and we'll make sure everything is perfect for your arrival.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.1 }}
          style={{ maxWidth: '680px', margin: '0 auto' }}
        >
          {status === 'success' ? (
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              style={{
                textAlign: 'center',
                padding: '4rem 2rem',
                background: 'rgba(34, 197, 94, 0.06)',
                border: '1px solid rgba(34, 197, 94, 0.3)',
                borderRadius: '20px',
              }}
            >
              <CheckCircle size={60} color="#22c55e" style={{ margin: '0 auto 1.5rem' }} />
              <h3 style={{ color: 'white', marginBottom: '0.75rem', fontSize: '1.6rem' }}>Reservation Confirmed!</h3>
              <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--text-muted)', marginBottom: '2rem' }}>
                We've received your booking. See you soon at Bhima Food Paradise!
              </p>
              <button onClick={() => setStatus(null)} className="btn-primary">Make Another Booking</button>
            </motion.div>
          ) : (
            <form
              onSubmit={handleSubmit}
              style={{
                background: 'rgba(255,255,255,0.03)',
                border: '1px solid rgba(255,255,255,0.08)',
                borderRadius: '20px',
                padding: '2.5rem',
              }}
            >
              {status === 'error' && (
                <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', padding: '1rem', borderRadius: '10px', marginBottom: '1.5rem', fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', textAlign: 'center' }}>
                  Something went wrong. Please try again.
                </div>
              )}

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.25rem', marginBottom: '1.25rem' }}>
                <div>
                  <label><User size={13} style={{ display: 'inline', marginRight: '0.4rem' }} />Name</label>
                  <input type="text" name="name" required value={formData.name} onChange={handleChange} placeholder="Your full name" />
                </div>
                <div>
                  <label><Phone size={13} style={{ display: 'inline', marginRight: '0.4rem' }} />Phone</label>
                  <input type="tel" name="phone" required value={formData.phone} onChange={handleChange} placeholder="+91 98765 43210" />
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '1.25rem', marginBottom: '2rem' }}>
                <div>
                  <label><Calendar size={13} style={{ display: 'inline', marginRight: '0.4rem' }} />Date</label>
                  <input type="date" name="date" required value={formData.date} onChange={handleChange} />
                </div>
                <div>
                  <label><Clock size={13} style={{ display: 'inline', marginRight: '0.4rem' }} />Time</label>
                  <input type="time" name="time" required value={formData.time} onChange={handleChange} />
                </div>
                <div>
                  <label><Users size={13} style={{ display: 'inline', marginRight: '0.4rem' }} />Guests</label>
                  <select name="guests" value={formData.guests} onChange={handleChange}>
                    {[1, 2, 3, 4, 5, 6, 7, 8].map(n => (
                      <option key={n} value={n} style={{ background: 'var(--bg-card)' }}>{n} {n === 1 ? 'Person' : 'People'}</option>
                    ))}
                    <option value="9+" style={{ background: 'var(--bg-card)' }}>9+ People</option>
                  </select>
                </div>
              </div>

              <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="btn-primary"
                style={{ width: '100%', fontSize: '1rem', padding: '1rem', opacity: loading ? 0.7 : 1 }}
              >
                {loading ? 'Confirming...' : 'Confirm Reservation'}
              </motion.button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
};

export default ReservationForm;
