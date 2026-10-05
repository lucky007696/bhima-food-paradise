import { useState, useEffect } from 'react';
import axios from 'axios';
import { motion, AnimatePresence } from 'framer-motion';
import { Search } from 'lucide-react';

const categoryEmojis = {
  'Veg Snacks': '🥦',
  'Non-Veg Snacks': '🍗',
  'Sea Food': '🦐',
  'Biryani': '🍚',
  'Curries': '🍛',
  'Rice & Breads': '🫓',
};

const categoryImages = {
  'Veg Snacks': '/images/starter_veg.jpg',
  'Non-Veg Snacks': '/images/starter_nonveg.jpg',
  'Sea Food': '/images/starter_nonveg.jpg',
  'Biryani': '/images/biryani.jpg',
  'Curries': '/images/curry.jpg',
  'Rice & Breads': '/images/curry.jpg',
};

const tabs = [
  { label: 'Starters', categories: ['Veg Snacks', 'Non-Veg Snacks', 'Sea Food'] },
  { label: 'Biryani', categories: ['Biryani'] },
  { label: 'Main Course', categories: ['Curries', 'Rice & Breads'] },
];

const Menu = () => {
  const [menuItems, setMenuItems] = useState([]);
  const [activeTab, setActiveTab] = useState(0);
  const [search, setSearch] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
    axios.get(`${API_URL}/api/menu`)
      .then(res => setMenuItems(res.data))
      .catch(err => console.error(err))
      .finally(() => setLoading(false));
  }, []);

  const currentCategories = tabs[activeTab].categories;

  const filteredItems = (category) =>
    menuItems
      .filter(item => item.category === category)
      .filter(item =>
        search.trim() === '' ||
        item.name.toLowerCase().includes(search.toLowerCase()) ||
        item.description.toLowerCase().includes(search.toLowerCase())
      );

  const hasResults = currentCategories.some(cat => filteredItems(cat).length > 0);

  return (
    <section
      id="menu"
      style={{
        padding: '6rem 0',
        background: 'var(--bg-darker)',
        position: 'relative',
      }}
    >
      {/* Top gradient accent */}
      <div style={{
        position: 'absolute', top: 0, left: 0, right: 0, height: '1px',
        background: 'linear-gradient(90deg, transparent, var(--primary), transparent)',
      }} />

      <div className="container">

        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.7 }}
          style={{ textAlign: 'center', marginBottom: '3rem' }}
        >
          <span className="section-label">Our Menu</span>
          <h2 className="section-title" style={{ marginBottom: '0.75rem' }}>
            Crafted with <span style={{ color: 'var(--primary)', fontStyle: 'italic' }}>Passion</span>
          </h2>
          <div className="gold-divider" />
        </motion.div>

        {/* Search Bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          style={{
            maxWidth: '480px',
            margin: '0 auto 2.5rem',
            position: 'relative',
          }}
        >
          <Search
            size={17}
            color="var(--primary)"
            style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none' }}
          />
          <input
            type="text"
            placeholder="Search dishes..."
            value={search}
            onChange={e => setSearch(e.target.value)}
            style={{ paddingLeft: '2.8rem', borderRadius: '50px', background: 'rgba(255,255,255,0.06)' }}
          />
        </motion.div>

        {/* Tabs */}
        <div style={{
          display: 'flex',
          justifyContent: 'center',
          gap: '0.5rem',
          marginBottom: '2.5rem',
          flexWrap: 'wrap',
        }}>
          {tabs.map((tab, idx) => (
            <motion.button
              key={tab.label}
              whileHover={{ scale: 1.04 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => setActiveTab(idx)}
              style={{
                padding: '0.6rem 1.8rem',
                borderRadius: '50px',
                border: 'none',
                fontFamily: "'Outfit', sans-serif",
                fontWeight: 600,
                fontSize: '0.9rem',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                letterSpacing: '0.5px',
                background: activeTab === idx
                  ? 'linear-gradient(135deg, var(--primary), #d97706)'
                  : 'rgba(255,255,255,0.06)',
                color: activeTab === idx ? '#0a0908' : 'var(--text-muted)',
                boxShadow: activeTab === idx ? '0 4px 16px rgba(245,158,11,0.35)' : 'none',
              }}
            >
              {tab.label}
            </motion.button>
          ))}
        </div>

        {/* Menu Content */}
        {loading ? (
          <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '4rem', fontFamily: "'Outfit', sans-serif" }}>
            Loading culinary delights...
          </div>
        ) : (
          <div style={{
            background: 'var(--bg-card)',
            border: '1px solid rgba(255,255,255,0.06)',
            borderRadius: '20px',
            overflow: 'hidden',
          }}>
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.35 }}
                className="menu-scroll-area"
                style={{ padding: '1.5rem' }}
              >
                {!hasResults ? (
                  <div style={{ textAlign: 'center', color: 'var(--text-muted)', padding: '3rem', fontFamily: "'Outfit', sans-serif" }}>
                    No dishes match your search.
                  </div>
                ) : (
                  currentCategories.map((category) => {
                    const items = filteredItems(category);
                    if (items.length === 0) return null;
                    return (
                      <div key={category} style={{ marginBottom: '2rem' }}>
                        {/* Category Header */}
                        <div style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.75rem',
                          marginBottom: '1rem',
                          padding: '0.6rem 1rem',
                          background: 'rgba(245,158,11,0.06)',
                          borderLeft: '3px solid var(--primary)',
                          borderRadius: '0 8px 8px 0',
                        }}>
                          <span style={{ fontSize: '1.3rem' }}>{categoryEmojis[category] || '🍽️'}</span>
                          <h3 style={{
                            color: 'white',
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 700,
                            fontSize: '1rem',
                            textTransform: 'uppercase',
                            letterSpacing: '2px',
                            margin: 0,
                          }}>{category}</h3>
                          <span style={{
                            marginLeft: 'auto',
                            background: 'rgba(245,158,11,0.15)',
                            color: 'var(--primary)',
                            fontSize: '0.75rem',
                            fontFamily: "'Outfit', sans-serif",
                            fontWeight: 700,
                            padding: '0.2rem 0.7rem',
                            borderRadius: '50px',
                          }}>
                            {items.length} items
                          </span>
                        </div>

                        {/* Items Grid */}
                        <div style={{
                          display: 'grid',
                          gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))',
                          gap: '0.75rem',
                        }}>
                          {items.map((item, index) => (
                            <motion.div
                              key={item._id}
                              initial={{ opacity: 0, y: 10 }}
                              animate={{ opacity: 1, y: 0 }}
                              transition={{ delay: index * 0.03 }}
                              whileHover={{ y: -3, boxShadow: '0 8px 24px rgba(0,0,0,0.3)' }}
                              style={{
                                display: 'flex',
                                alignItems: 'center',
                                gap: '0.85rem',
                                padding: '0.85rem',
                                background: 'rgba(255,255,255,0.03)',
                                border: '1px solid rgba(255,255,255,0.06)',
                                borderRadius: '12px',
                                cursor: 'default',
                                transition: 'all 0.25s ease',
                              }}
                            >
                              {/* Item Image */}
                              <div style={{
                                width: '58px',
                                height: '58px',
                                borderRadius: '8px',
                                overflow: 'hidden',
                                flexShrink: 0,
                                border: '1px solid rgba(245,158,11,0.2)',
                              }}>
                                <img
                                  src={categoryImages[category]}
                                  alt={item.name}
                                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                                />
                              </div>

                              {/* Item Info */}
                              <div style={{ flex: 1, minWidth: 0 }}>
                                <p style={{
                                  fontFamily: "'Outfit', sans-serif",
                                  fontWeight: 700,
                                  fontSize: '0.95rem',
                                  color: 'var(--text-light)',
                                  marginBottom: '0.2rem',
                                  whiteSpace: 'nowrap',
                                  overflow: 'hidden',
                                  textOverflow: 'ellipsis',
                                }}>
                                  {item.name}
                                </p>
                                <p style={{
                                  fontFamily: "'Outfit', sans-serif",
                                  fontSize: '0.78rem',
                                  color: 'var(--text-muted)',
                                  lineHeight: 1.4,
                                  display: '-webkit-box',
                                  WebkitLineClamp: 2,
                                  WebkitBoxOrient: 'vertical',
                                  overflow: 'hidden',
                                }}>
                                  {item.description}
                                </p>
                              </div>

                              {/* Price */}
                              <div style={{
                                flexShrink: 0,
                                fontFamily: "'Outfit', sans-serif",
                                fontWeight: 800,
                                fontSize: '1.05rem',
                                color: 'var(--primary)',
                              }}>
                                ₹{item.price}
                              </div>
                            </motion.div>
                          ))}
                        </div>
                      </div>
                    );
                  })
                )}
              </motion.div>
            </AnimatePresence>
          </div>
        )}
      </div>
    </section>
  );
};

export default Menu;
