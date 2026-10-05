import { useState, useEffect } from 'react';
import { Menu as MenuIcon, X, Phone } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = ({ logoUrl = '/logo.png' }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#home', label: 'Home' },
    { href: '#about', label: 'About' },
    { href: '#menu', label: 'Menu' },
    { href: '#reservation', label: 'Reservation' },
  ];

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setIsOpen(false);
    const target = document.querySelector(href);
    if (target) {
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  };

  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7, ease: 'easeOut' }}
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 1000,
        padding: scrolled ? '0.6rem 0' : '1rem 0',
        background: scrolled
          ? 'rgba(10, 9, 8, 0.97)'
          : 'transparent',
        borderBottom: scrolled ? '1px solid rgba(245,158,11,0.12)' : 'none',
        backdropFilter: scrolled ? 'blur(20px)' : 'none',
        transition: 'all 0.4s ease',
        boxShadow: scrolled ? '0 4px 30px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div className="container" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>

        {/* Logo */}
        <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center' }}>
          <AnimatePresence mode="wait">
            {scrolled ? (
              <motion.img
                key="logo-small"
                initial={{ opacity: 0, scale: 0.7 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.7 }}
                transition={{ duration: 0.3 }}
                src={logoUrl}
                alt="Bhima Food Paradise"
                style={{
                  height: '55px',
                  width: 'auto',
                  filter: 'drop-shadow(0 0 10px rgba(245,158,11,0.5))',
                }}
              />
            ) : (
              <motion.div
                key="logo-text"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
              >
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: '1.6rem',
                  fontWeight: 900,
                  color: 'var(--primary)',
                  letterSpacing: '1px',
                  display: 'block',
                  lineHeight: 1,
                  textShadow: '0 0 20px rgba(245,158,11,0.4)',
                }}>BHIMA</span>
                <span style={{
                  fontSize: '0.6rem',
                  fontWeight: 700,
                  color: 'rgba(255,255,255,0.7)',
                  letterSpacing: '3px',
                  textTransform: 'uppercase',
                  fontFamily: "'Outfit', sans-serif",
                }}>Food Paradise</span>
              </motion.div>
            )}
          </AnimatePresence>
        </a>

        {/* Desktop Nav Links */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '2.5rem' }}>
          {navLinks.map((link) => (
            <motion.a
              key={link.href}
              href={link.href}
              onClick={(e) => handleNavClick(e, link.href)}
              whileHover={{ color: 'var(--primary)' }}
              style={{
                color: 'rgba(255,255,255,0.85)',
                textDecoration: 'none',
                fontWeight: 500,
                fontSize: '0.9rem',
                fontFamily: "'Outfit', sans-serif",
                textTransform: 'uppercase',
                letterSpacing: '1.5px',
                transition: 'color 0.3s',
                position: 'relative',
              }}
            >
              {link.label}
            </motion.a>
          ))}
        </div>

        {/* CTA Button */}
        <div className="hidden md:flex" style={{ alignItems: 'center', gap: '1rem' }}>
          <a href="tel:+917396706488" style={{ color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.85rem', textDecoration: 'none', fontFamily: "'Outfit', sans-serif" }}>
            <Phone size={15} color="var(--primary)" />
            +91 7396 706 488
          </a>
          <motion.a
            href="#reservation"
            onClick={(e) => handleNavClick(e, '#reservation')}
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="btn-primary"
            style={{ padding: '0.65rem 1.4rem', fontSize: '0.8rem' }}
          >
            Book a Table
          </motion.a>
        </div>

        {/* Mobile Hamburger */}
        <button
          className="md:hidden"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.5rem',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onClick={() => setIsOpen(!isOpen)}
        >
          {isOpen ? <X size={26} color="var(--primary)" /> : <MenuIcon size={26} color="var(--primary)" />}
        </button>
      </div>

      {/* Mobile Menu Drawer */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            style={{ overflow: 'hidden', background: 'rgba(10,9,8,0.98)', borderTop: '1px solid rgba(245,158,11,0.1)' }}
          >
            <div className="container" style={{ padding: '1.5rem', display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              {navLinks.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  style={{
                    color: 'var(--text-light)',
                    textDecoration: 'none',
                    fontWeight: 600,
                    fontSize: '1.1rem',
                    fontFamily: "'Outfit', sans-serif",
                    padding: '0.5rem 0',
                    borderBottom: '1px solid rgba(255,255,255,0.05)',
                  }}
                >
                  {link.label}
                </a>
              ))}
              <a href="#reservation" onClick={(e) => handleNavClick(e, '#reservation')} className="btn-primary" style={{ textAlign: 'center', marginTop: '0.5rem' }}>
                Book a Table
              </a>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.nav>
  );
};

export default Navbar;
