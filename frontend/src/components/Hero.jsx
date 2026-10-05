import { motion } from 'framer-motion';
import { ChevronDown } from 'lucide-react';

const Hero = ({ logoUrl = '/logo.png' }) => {
  return (
    <section
      id="home"
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        position: 'relative',
        overflow: 'hidden',
        backgroundImage: 'url(/hero_bg.jpg)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
      }}
    >
      {/* Dark overlay */}
      <div style={{
        position: 'absolute', inset: 0,
        background: 'linear-gradient(to bottom, rgba(10,9,8,0.7) 0%, rgba(10,9,8,0.5) 50%, rgba(10,9,8,0.95) 100%)',
        zIndex: 1,
      }} />

      {/* Ambient glow */}
      <div style={{
        position: 'absolute', top: '30%', left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '600px', height: '600px',
        background: 'radial-gradient(circle, rgba(245,158,11,0.12) 0%, transparent 70%)',
        zIndex: 1,
      }} />

      <div className="container" style={{ position: 'relative', zIndex: 2, textAlign: 'center', paddingTop: '100px', paddingBottom: '5rem' }}>

        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          style={{
            display: 'inline-block',
            marginBottom: '2rem',
            animation: 'float 6s ease-in-out infinite',
          }}
        >
          <img
            src={logoUrl}
            alt="Bhima Food Paradise"
            style={{
              maxWidth: '380px',
              width: '80vw',
              height: 'auto',
              filter: 'drop-shadow(0 0 40px rgba(245,158,11,0.6))',
              animation: 'pulse-glow 3s ease-in-out infinite',
            }}
          />
        </motion.div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
          style={{
            fontSize: 'clamp(1rem, 2.5vw, 1.2rem)',
            color: 'rgba(253,250,246,0.75)',
            maxWidth: '600px',
            margin: '0 auto 3rem',
            fontFamily: "'Outfit', sans-serif",
            lineHeight: 1.8,
            letterSpacing: '0.3px',
          }}
        >
          A feast for the mighty. Experience the grandest flavors, heartiest portions,
          and an unforgettable dining atmosphere in <span style={{ color: 'var(--primary)', fontWeight: 600 }}>Inkollu</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.9, duration: 0.7 }}
          style={{ display: 'flex', justifyContent: 'center', gap: '1.2rem', flexWrap: 'wrap' }}
        >
          <motion.a
            href="#menu"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-primary"
            style={{ padding: '1rem 2.5rem', fontSize: '0.95rem' }}
          >
            Explore Menu
          </motion.a>
          <motion.a
            href="#reservation"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="btn-outline"
            style={{ padding: '1rem 2.5rem', fontSize: '0.95rem' }}
          >
            Book a Table
          </motion.a>
        </motion.div>

        {/* Scroll hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          style={{ position: 'absolute', bottom: '2rem', left: '50%', transform: 'translateX(-50%)' }}
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.6, ease: 'easeInOut' }}
            style={{ color: 'rgba(245,158,11,0.6)', cursor: 'pointer' }}
            onClick={() => document.querySelector('#about').scrollIntoView({ behavior: 'smooth' })}
          >
            <ChevronDown size={32} />
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Hero;
