import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PHONE = '+917396706488'; 

const FloatingCallButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="call-container">
      {/* Floating Button */}
      <motion.a
        href={`tel:${PHONE}`}
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.6, type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        className="floating-btn"
        style={{
          background: 'linear-gradient(135deg, #f59e0b, #b45309)',
          boxShadow: '0 4px 20px rgba(245, 158, 11, 0.5)',
          animation: 'call-pulse 2.5s ease-in-out infinite',
        }}
        aria-label="Call Us"
      >
        {/* Phone SVG Icon */}
        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
        </svg>
      </motion.a>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: -10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: -10, scale: 0.9 }}
            transition={{ duration: 0.2 }}
            style={{
              background: '#1a1714',
              border: '1px solid rgba(245, 158, 11, 0.3)',
              borderRadius: '10px',
              padding: '0.5rem 1rem',
              whiteSpace: 'nowrap',
              boxShadow: '0 4px 20px rgba(0,0,0,0.4)',
            }}
          >
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontWeight: 700,
              fontSize: '0.85rem',
              color: 'white',
              margin: 0,
            }}>
              Call us directly
            </p>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.75rem',
              color: 'rgba(245, 158, 11, 0.9)',
              margin: 0,
            }}>
              +91 7396 706 488
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse ring animation */}
      <style>{`
        @keyframes call-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(245, 158, 11, 0.5); }
          50% { box-shadow: 0 4px 35px rgba(245, 158, 11, 0.85), 0 0 0 10px rgba(245, 158, 11, 0.1); }
        }
      `}</style>
    </div>
  );
};

export default FloatingCallButton;
