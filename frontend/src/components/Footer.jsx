import { MapPin, Phone, Mail, Clock } from 'lucide-react';

const InstagramIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
    <circle cx="12" cy="12" r="4" />
    <circle cx="17.5" cy="6.5" r="1" fill="currentColor" stroke="none" />
  </svg>
);

const FacebookIcon = ({ size = 16 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="currentColor">
    <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
  </svg>
);


const Footer = ({ logoUrl = '/logo.png' }) => {
  return (
    <footer style={{ background: '#06050a', borderTop: '1px solid rgba(245,158,11,0.1)' }}>

      {/* Main Footer */}
      <div className="container" style={{ padding: '4rem 1.5rem 3rem' }}>
        <div style={{ display: 'grid', gap: '3rem' }} className="md:grid-cols-3">

          {/* Brand */}
          <div>
            <a href="#home" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1.25rem' }}>
              <img src={logoUrl} alt="Bhima" style={{ height: '55px', filter: 'drop-shadow(0 0 8px rgba(245,158,11,0.4))' }} />
            </a>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--text-muted)', fontSize: '0.9rem', lineHeight: 1.8, marginBottom: '1.5rem' }}>
              Inspired by legend, crafted for you. The ultimate destination for authentic flavors and premium dining in Inkollu, Andhra Pradesh.
            </p>
            {/* Social Icons */}
            <div style={{ display: 'flex', gap: '0.75rem' }}>
              {[
                { Icon: InstagramIcon, href: '#' },
                { Icon: FacebookIcon, href: '#' },
              ].map(({ Icon, href }, i) => (
                <a
                  key={i}
                  href={href}
                  style={{
                    width: '38px', height: '38px',
                    border: '1px solid rgba(245,158,11,0.25)',
                    borderRadius: '50%',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    color: 'var(--primary)',
                    transition: 'all 0.3s ease',
                    textDecoration: 'none',
                  }}
                  onMouseOver={e => { e.currentTarget.style.background = 'var(--primary)'; e.currentTarget.style.color = '#000'; }}
                  onMouseOut={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = 'var(--primary)'; }}
                >
                  <Icon size={16} />
                </a>
              ))}
            </div>
          </div>

          {/* Contact */}
          <div>
            <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--primary)', marginBottom: '1.5rem' }}>
              Contact Us
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
              {[
                { Icon: MapPin, text: 'Inkollu, Andhra Pradesh, India', href: 'https://maps.app.goo.gl/dfmUTbLas1p7xozaA?g_st=aw' },
                { Icon: Phone, text: '+91 7396 706 488', href: 'tel:+917396706488' },
                { Icon: Mail, text: 'poda.charan1@gmail.com', href: 'mailto:poda.charan1@gmail.com' },
              ].map(({ Icon, text, href }, i) => (
                <a key={i} href={href} target={href.startsWith('http') ? '_blank' : '_self'} rel="noopener noreferrer" style={{ display: 'flex', alignItems: 'flex-start', gap: '0.75rem', color: 'var(--text-muted)', fontFamily: "'Outfit', sans-serif", fontSize: '0.9rem', textDecoration: 'none', transition: 'color 0.3s' }} onMouseOver={e => e.currentTarget.style.color = 'var(--primary)'} onMouseOut={e => e.currentTarget.style.color = 'var(--text-muted)'}>
                  <Icon size={16} color="var(--primary)" style={{ marginTop: '3px', flexShrink: 0 }} />
                  <span>{text}</span>
                </a>
              ))}
            </div>
          </div>

          {/* Hours */}
          <div>
            <h4 style={{ fontFamily: "'Outfit', sans-serif", fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '3px', color: 'var(--primary)', marginBottom: '1.5rem' }}>
              Opening Hours
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
              {[
                { day: 'Monday – Friday', time: '11:00 AM – 11:00 PM' },
                { day: 'Saturday – Sunday', time: '11:00 AM – 12:00 AM' },
              ].map(({ day, time }, i) => (
                <div key={i} style={{ display: 'flex', justifyContent: 'space-between', fontFamily: "'Outfit', sans-serif", fontSize: '0.88rem' }}>
                  <span style={{ color: 'var(--text-muted)' }}>{day}</span>
                  <span style={{ color: 'rgba(255,255,255,0.75)', fontWeight: 600 }}>{time}</span>
                </div>
              ))}
              <div style={{
                display: 'flex', alignItems: 'center', gap: '0.5rem',
                marginTop: '0.5rem',
                padding: '0.6rem 1rem',
                background: 'rgba(34,197,94,0.08)',
                border: '1px solid rgba(34,197,94,0.2)',
                borderRadius: '8px',
              }}>
                <div style={{ width: '8px', height: '8px', borderRadius: '50%', background: '#22c55e' }} />
                <span style={{ fontFamily: "'Outfit', sans-serif", color: '#4ade80', fontSize: '0.82rem', fontWeight: 600 }}>We're Open Now</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div style={{ borderTop: '1px solid rgba(255,255,255,0.05)', padding: '1.25rem 0' }}>
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '0.5rem' }}>
          <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            © {new Date().getFullYear()} Bhima Food Paradise. All rights reserved.
          </p>
          <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--text-muted)', fontSize: '0.82rem' }}>
            Made with ❤️ in Inkollu
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
