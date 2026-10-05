import { motion, AnimatePresence } from 'framer-motion';
import { useState } from 'react';

const PHONE = '917396706488'; // international format, no +
const MESSAGE = encodeURIComponent("Hello! I'd like to know more about Bhima Food Paradise 🍽️");
const WA_LINK = `https://wa.me/${PHONE}?text=${MESSAGE}`;

const WhatsAppButton = () => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div className="whatsapp-container">
      {/* Floating Button */}
      <motion.a
        href={WA_LINK}
        target="_blank"
        rel="noopener noreferrer"
        initial={{ scale: 0, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ delay: 1.5, type: 'spring', stiffness: 200, damping: 15 }}
        whileHover={{ scale: 1.15 }}
        whileTap={{ scale: 0.9 }}
        onHoverStart={() => setShowTooltip(true)}
        onHoverEnd={() => setShowTooltip(false)}
        className="floating-btn"
        style={{
          background: 'linear-gradient(135deg, #f59e0b, #b45309)',
          boxShadow: '0 4px 20px rgba(245, 158, 11, 0.5)',
          animation: 'wa-pulse 2.5s ease-in-out infinite',
        }}
        aria-label="Chat on WhatsApp"
      >
        {/* WhatsApp SVG Icon */}
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 32 32"
          width="34"
          height="34"
          fill="white"
        >
          <path d="M16 3C8.82 3 3 8.82 3 16c0 2.3.6 4.47 1.65 6.35L3 29l6.82-1.62A12.93 12.93 0 0 0 16 29c7.18 0 13-5.82 13-13S23.18 3 16 3zm0 23.75a10.7 10.7 0 0 1-5.47-1.5l-.39-.23-4.05.96.98-3.95-.25-.4A10.7 10.7 0 0 1 5.25 16C5.25 10.04 10.04 5.25 16 5.25S26.75 10.04 26.75 16 21.96 26.75 16 26.75zm5.86-7.97c-.32-.16-1.9-.94-2.2-1.04-.29-.1-.5-.16-.71.16-.21.32-.82 1.04-1.01 1.25-.19.21-.37.24-.69.08-.32-.16-1.34-.49-2.55-1.57-.94-.84-1.58-1.87-1.76-2.19-.19-.32-.02-.5.14-.65.14-.14.32-.37.48-.55.16-.19.21-.32.32-.53.1-.21.05-.4-.03-.55-.08-.16-.71-1.71-.97-2.34-.26-.61-.52-.53-.71-.54h-.61c-.21 0-.55.08-.84.4-.29.32-1.1 1.07-1.1 2.61s1.13 3.03 1.28 3.24c.16.21 2.22 3.39 5.38 4.75.75.32 1.34.51 1.8.66.76.24 1.45.21 2 .13.61-.09 1.9-.78 2.16-1.53.27-.75.27-1.39.19-1.53-.08-.13-.29-.21-.61-.37z"/>
        </svg>
      </motion.a>

      {/* Tooltip */}
      <AnimatePresence>
        {showTooltip && (
          <motion.div
            initial={{ opacity: 0, x: 10, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, scale: 1 }}
            exit={{ opacity: 0, x: 10, scale: 0.9 }}
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
              Chat with us!
            </p>
            <p style={{
              fontFamily: "'Outfit', sans-serif",
              fontSize: '0.75rem',
              color: 'rgba(245, 158, 11, 0.9)',
              margin: 0,
            }}>
              We reply instantly 🟢
            </p>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Pulse ring animation */}
      <style>{`
        @keyframes wa-pulse {
          0%, 100% { box-shadow: 0 4px 20px rgba(245, 158, 11, 0.5); }
          50% { box-shadow: 0 4px 35px rgba(245, 158, 11, 0.85), 0 0 0 10px rgba(245, 158, 11, 0.1); }
        }
      `}</style>
    </div>
  );
};

export default WhatsAppButton;
