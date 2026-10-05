import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Calendar, Clock, Phone, User, Home } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [reservations, setReservations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReservations = async () => {
      try {
        const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
        const response = await axios.get(`${API_URL}/api/admin/reservations`);
        // Sort newest first
        setReservations(response.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      } catch (err) {
        console.error(err);
        setError('Failed to fetch reservations.');
      } finally {
        setLoading(false);
      }
    };
    
    fetchReservations();
  }, []);

  const handleComplete = async (id) => {
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.delete(`${API_URL}/api/admin/reservations/${id}`);
      setReservations(reservations.filter(res => res._id !== id));
    } catch (err) {
      console.error('Failed to complete reservation:', err);
      alert('Failed to remove reservation. Please try again.');
    }
  };

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-darker)', color: 'white', padding: '3rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '3rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>Admin Dashboard</h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--text-muted)' }}>Manage your reservations</p>
          </div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            <Home size={18} />
            Back to Site
          </Link>
        </div>

        {/* Content */}
        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif" }}>Loading reservations...</div>
        ) : error ? (
          <div style={{ background: 'rgba(239,68,68,0.1)', border: '1px solid rgba(239,68,68,0.4)', color: '#f87171', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>{error}</div>
        ) : reservations.length === 0 ? (
          <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--bg-card)', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
            <Calendar size={48} color="var(--primary)" style={{ opacity: 0.5, marginBottom: '1rem' }} />
            <h3 style={{ fontSize: '1.5rem', marginBottom: '0.5rem' }}>No reservations yet</h3>
            <p style={{ color: 'var(--text-muted)' }}>When customers book a table, they will appear here.</p>
          </div>
        ) : (
          <div style={{ display: 'grid', gap: '1rem' }}>
            {reservations.map((res) => (
              <div key={res._id} style={{ 
                background: 'var(--bg-card)', 
                border: '1px solid rgba(255,255,255,0.08)', 
                borderRadius: '12px', 
                padding: '1.5rem',
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
                gap: '1.5rem',
                alignItems: 'center',
                position: 'relative'
              }}>

                {/* Customer Info */}
                <div>
                  <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0', fontSize: '1.1rem', color: 'var(--primary)' }}>
                    <User size={16} /> {res.name}
                  </h4>
                  <a href={`tel:${res.phone}`} style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-light)', textDecoration: 'none', fontSize: '0.9rem' }}>
                    <Phone size={14} color="var(--text-muted)" /> {res.phone}
                  </a>
                </div>

                {/* Date & Time */}
                <div>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0', color: 'var(--text-light)' }}>
                    <Calendar size={16} color="var(--text-muted)" /> {new Date(res.date).toLocaleDateString(undefined, { weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' })}
                  </p>
                  <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: 'var(--text-light)' }}>
                    <Clock size={16} color="var(--text-muted)" /> {res.time}
                  </p>
                </div>

                {/* Guests */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(245,158,11,0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)' }}>
                    <Users size={20} />
                  </div>
                  <div>
                    <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px' }}>Party Size</p>
                    <p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>{res.guests} <span style={{ fontSize: '0.9rem', fontWeight: 400 }}>people</span></p>
                  </div>
                </div>

                {/* Actions */}
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                  <div style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600, textTransform: 'uppercase', alignSelf: 'flex-end' }}>
                    {res.status || 'New'}
                  </div>
                  <button 
                    onClick={() => handleComplete(res._id)}
                    style={{
                      background: 'rgba(34, 197, 94, 0.15)',
                      border: '1px solid rgba(34, 197, 94, 0.4)',
                      color: '#4ade80',
                      padding: '0.6rem 1.2rem',
                      borderRadius: '8px',
                      cursor: 'pointer',
                      fontWeight: 600,
                      fontFamily: "'Outfit', sans-serif",
                      transition: 'all 0.2s',
                      width: '100%',
                      maxWidth: '120px'
                    }}
                    onMouseOver={e => { e.currentTarget.style.background = 'rgba(34, 197, 94, 0.25)'; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                    onMouseOut={e => { e.currentTarget.style.background = 'rgba(34, 197, 94, 0.15)'; e.currentTarget.style.transform = 'translateY(0)'; }}
                  >
                    Complete
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Admin;
