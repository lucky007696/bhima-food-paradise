import { motion } from 'framer-motion';
import { Award, Users, Clock, Star } from 'lucide-react';

const stats = [
  { icon: <Award size={24} color="var(--primary)" />, value: '10+', label: 'Years of Excellence' },
  { icon: <Users size={24} color="var(--primary)" />, value: '50K+', label: 'Happy Guests' },
  { icon: <Star size={24} color="var(--primary)" />, value: '100+', label: 'Menu Items' },
  { icon: <Clock size={24} color="var(--primary)" />, value: '7 Days', label: 'Open Every Week' },
];

const About = () => {
  return (
    <section id="about" style={{ padding: '6rem 0', background: 'var(--bg-dark)', position: 'relative', overflow: 'hidden' }}>
      {/* Decorative blur */}
      <div style={{
        position: 'absolute', top: '-10%', right: '-5%',
        width: '400px', height: '400px',
        background: 'radial-gradient(circle, rgba(245,158,11,0.07) 0%, transparent 70%)',
        pointerEvents: 'none',
      }} />

      <div className="container">

        <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '4rem', alignItems: 'center' }}>

          {/* Two column layout on desktop */}
          <div style={{ display: 'grid', gap: '4rem', alignItems: 'center' }}
            className="md:grid-cols-2"
          >
            {/* Image */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <div style={{
                position: 'relative',
                borderRadius: '16px',
                overflow: 'hidden',
                boxShadow: '0 30px 60px rgba(0,0,0,0.6)',
                border: '1px solid rgba(245,158,11,0.15)',
              }}>
                <img
                  src="/hero_bg.jpg"
                  alt="Restaurant interior"
                  style={{ width: '100%', height: '480px', objectFit: 'cover', display: 'block' }}
                />
                {/* Floating badge */}
                <div style={{
                  position: 'absolute', bottom: '1.5rem', left: '1.5rem',
                  background: 'rgba(10,9,8,0.92)',
                  backdropFilter: 'blur(10px)',
                  border: '1px solid rgba(245,158,11,0.3)',
                  borderRadius: '12px',
                  padding: '1rem 1.5rem',
                }}>
                  <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--primary)', fontWeight: 700, fontSize: '1.5rem', lineHeight: 1 }}>10+</p>
                  <p style={{ fontFamily: "'Outfit', sans-serif", color: 'rgba(255,255,255,0.7)', fontSize: '0.8rem', textTransform: 'uppercase', letterSpacing: '1px' }}>Years Serving</p>
                </div>
              </div>
            </motion.div>

            {/* Text Content */}
            <motion.div
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
            >
              <span className="section-label">Our Story</span>
              <h2 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 700, color: 'white', marginBottom: '1.5rem', lineHeight: 1.15 }}>
                Welcome to <span style={{ color: 'var(--primary)' }}>Bhima</span><br />Food Paradise
              </h2>
              <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '1.2rem' }}>
                Inspired by the mythological hero Bhima — known for his immense strength and legendary appetite — we bring you a dining experience fit for legends.
              </p>
              <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--text-muted)', fontSize: '1rem', lineHeight: 1.9, marginBottom: '2.5rem' }}>
                Located in the heart of <strong style={{ color: 'rgba(255,255,255,0.85)' }}>Inkollu, Andhra Pradesh</strong>, we craft every dish with the finest ingredients, rich spices, and recipes passed down through generations.
              </p>

              <motion.a
                href="#menu"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary"
                style={{ display: 'inline-flex' }}
              >
                View Our Menu
              </motion.a>
            </motion.div>
          </div>

          {/* Stats Row */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7, delay: 0.2 }}
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(2, 1fr)',
              gap: '1rem',
            }}
            className="md:grid-cols-4"
          >
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                whileHover={{ y: -5, borderColor: 'rgba(245,158,11,0.5)' }}
                style={{
                  padding: '1.5rem',
                  background: 'rgba(255,255,255,0.03)',
                  border: '1px solid rgba(255,255,255,0.07)',
                  borderRadius: '14px',
                  textAlign: 'center',
                  transition: 'all 0.3s ease',
                }}
              >
                <div style={{ marginBottom: '0.75rem' }}>{stat.icon}</div>
                <p style={{ fontFamily: "'Playfair Display', serif", fontSize: '1.8rem', fontWeight: 700, color: 'white', lineHeight: 1 }}>{stat.value}</p>
                <p style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', color: 'var(--text-muted)', textTransform: 'uppercase', letterSpacing: '1px', marginTop: '0.4rem' }}>{stat.label}</p>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
