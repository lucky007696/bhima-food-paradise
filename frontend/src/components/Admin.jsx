import { useState, useEffect } from 'react';
import axios from 'axios';
import { Users, Calendar, Clock, Phone, User, Home, PlusCircle, Image as ImageIcon, Trash2, Edit } from 'lucide-react';
import { Link } from 'react-router-dom';

const Admin = () => {
  const [activeTab, setActiveTab] = useState('reservations');
  const [reservations, setReservations] = useState([]);
  const [menuItems, setMenuItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [passwordInput, setPasswordInput] = useState('');
  const [authError, setAuthError] = useState('');

  // Menu Form State
  const [menuForm, setMenuForm] = useState({
    name: '', description: '', price: '', category: 'Starters', isVeg: 'true', image: null
  });
  const [isUploading, setIsUploading] = useState(false);
  const [editingMenuId, setEditingMenuId] = useState(null);

  const fetchData = async (password) => {
    setLoading(true);
    setAuthError('');
    try {
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      const [resResponse, menuResponse] = await Promise.all([
        axios.get(`${API_URL}/api/admin/reservations`, { headers: { 'x-admin-password': password } }),
        axios.get(`${API_URL}/api/menu`)
      ]);

      setReservations(resResponse.data.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt)));
      setMenuItems(menuResponse.data);
      
      setIsAuthenticated(true);
      sessionStorage.setItem('adminPassword', password);
    } catch (err) {
      console.error(err);
      if (err.response && err.response.status === 401) {
        setAuthError('Incorrect password. Please try again.');
        setIsAuthenticated(false);
        sessionStorage.removeItem('adminPassword');
      } else {
        setError('Failed to fetch data.');
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const savedPassword = sessionStorage.getItem('adminPassword');
    if (savedPassword) {
      fetchData(savedPassword);
    } else {
      setLoading(false);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (!passwordInput) return;
    fetchData(passwordInput);
  };

  const handleComplete = async (id) => {
    try {
      const password = sessionStorage.getItem('adminPassword');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.delete(`${API_URL}/api/admin/reservations/${id}`, {
        headers: { 'x-admin-password': password }
      });
      setReservations(reservations.filter(res => res._id !== id));
    } catch (err) {
      console.error('Failed to complete reservation:', err);
      alert('Failed to remove reservation. Please try again.');
    }
  };

  const handleEditClick = (item) => {
    setEditingMenuId(item._id);
    setMenuForm({
      name: item.name,
      description: item.description,
      price: item.price,
      category: item.category,
      isVeg: item.isVeg ? 'true' : 'false',
      image: null // user can optionally upload a new image
    });
    // scroll to form
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleCancelEdit = () => {
    setEditingMenuId(null);
    setMenuForm({ name: '', description: '', price: '', category: 'Starters', isVeg: 'true', image: null });
  };

  const handleMenuSubmit = async (e) => {
    e.preventDefault();
    if (!editingMenuId && !menuForm.image) return alert('Please select an image file first.');

    const formData = new FormData();
    formData.append('name', menuForm.name);
    formData.append('description', menuForm.description);
    formData.append('price', menuForm.price);
    formData.append('category', menuForm.category);
    formData.append('isVeg', menuForm.isVeg);
    if (menuForm.image) {
      formData.append('image', menuForm.image);
    }

    setIsUploading(true);
    try {
      const password = sessionStorage.getItem('adminPassword');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      
      if (editingMenuId) {
        await axios.put(`${API_URL}/api/admin/menu/${editingMenuId}`, formData, {
          headers: { 'x-admin-password': password, 'Content-Type': 'multipart/form-data' }
        });
        alert('Menu Item Updated Successfully!');
      } else {
        await axios.post(`${API_URL}/api/admin/menu`, formData, {
          headers: { 'x-admin-password': password, 'Content-Type': 'multipart/form-data' }
        });
        alert('Menu Item Added Successfully!');
      }
      
      setMenuForm({ name: '', description: '', price: '', category: 'Starters', isVeg: 'true', image: null });
      setEditingMenuId(null);
      // Refresh menu
      const menuResponse = await axios.get(`${API_URL}/api/menu`);
      setMenuItems(menuResponse.data);
      
    } catch (err) {
      console.error(err);
      alert('Failed to save menu item.');
    } finally {
      setIsUploading(false);
    }
  };

  const handleMenuDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this menu item?")) return;
    try {
      const password = sessionStorage.getItem('adminPassword');
      const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000';
      await axios.delete(`${API_URL}/api/admin/menu/${id}`, {
        headers: { 'x-admin-password': password }
      });
      setMenuItems(menuItems.filter(item => item._id !== id));
    } catch (err) {
      console.error(err);
      alert('Failed to delete menu item.');
    }
  };

  // Group menu items by category
  const categoriesList = ['Starters', 'Main Course', 'Breads & Rice', 'Desserts', 'Beverages'];
  const groupedMenu = {};
  categoriesList.forEach(cat => groupedMenu[cat] = []);
  menuItems.forEach(item => {
    if (groupedMenu[item.category]) {
      groupedMenu[item.category].push(item);
    } else {
      if (!groupedMenu['Other']) groupedMenu['Other'] = [];
      groupedMenu['Other'].push(item);
    }
  });

  if (!isAuthenticated && !loading) {
    return (
      <div style={{ minHeight: '100vh', background: 'var(--bg-darker)', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '2rem' }}>
        <div style={{ background: 'var(--bg-card)', padding: '3rem', borderRadius: '20px', width: '100%', maxWidth: '400px', border: '1px solid rgba(255,255,255,0.05)', textAlign: 'center' }}>
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--primary)', marginBottom: '1.5rem' }}>Admin Access</h2>
          {authError && <div style={{ color: '#f87171', marginBottom: '1rem', fontSize: '0.9rem' }}>{authError}</div>}
          <form onSubmit={handleLogin}>
            <input 
              type="password" 
              value={passwordInput} 
              onChange={(e) => setPasswordInput(e.target.value)} 
              placeholder="Enter admin password"
              style={{ width: '100%', padding: '1rem', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white', marginBottom: '1.5rem', outline: 'none', fontFamily: "'Outfit', sans-serif" }}
              autoFocus
            />
            <button type="submit" className="btn-primary" style={{ width: '100%' }}>Login</button>
          </form>
          <Link to="/" style={{ display: 'block', marginTop: '1.5rem', color: 'var(--text-muted)', textDecoration: 'none', fontSize: '0.9rem' }}>&larr; Back to Site</Link>
        </div>
      </div>
    );
  }

  return (
    <div style={{ minHeight: '100vh', background: 'var(--bg-darker)', color: 'white', padding: '3rem 0' }}>
      <div className="container">
        
        {/* Header */}
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '1.5rem' }}>
          <div>
            <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '2.5rem', color: 'var(--primary)', margin: 0 }}>Admin Dashboard</h1>
            <p style={{ fontFamily: "'Outfit', sans-serif", color: 'var(--text-muted)' }}>Manage reservations and menu</p>
          </div>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'white', textDecoration: 'none', background: 'rgba(255,255,255,0.1)', padding: '0.5rem 1rem', borderRadius: '8px', transition: 'all 0.2s' }} onMouseOver={e => e.currentTarget.style.background = 'rgba(255,255,255,0.2)'} onMouseOut={e => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}>
            <Home size={18} />
            Back to Site
          </Link>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', gap: '1rem', marginBottom: '2rem' }}>
          <button 
            onClick={() => setActiveTab('reservations')}
            style={{ padding: '0.75rem 1.5rem', background: activeTab === 'reservations' ? 'var(--primary)' : 'rgba(255,255,255,0.1)', color: activeTab === 'reservations' ? 'black' : 'white', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}
          >
            Reservations
          </button>
          <button 
            onClick={() => setActiveTab('menu')}
            style={{ padding: '0.75rem 1.5rem', background: activeTab === 'menu' ? 'var(--primary)' : 'rgba(255,255,255,0.1)', color: activeTab === 'menu' ? 'black' : 'white', borderRadius: '8px', border: 'none', fontWeight: 600, cursor: 'pointer', fontFamily: "'Outfit', sans-serif" }}
          >
            Manage Menu
          </button>
        </div>

        {loading ? (
          <div style={{ textAlign: 'center', padding: '3rem', color: 'var(--text-muted)' }}>Loading...</div>
        ) : error ? (
          <div style={{ background: 'rgba(239,68,68,0.1)', color: '#f87171', padding: '1rem', borderRadius: '10px', textAlign: 'center' }}>{error}</div>
        ) : activeTab === 'reservations' ? (
          /* RESERVATIONS TAB */
          reservations.length === 0 ? (
            <div style={{ textAlign: 'center', padding: '5rem', background: 'var(--bg-card)', borderRadius: '16px' }}>
              <Calendar size={48} color="var(--primary)" style={{ opacity: 0.5, marginBottom: '1rem' }} />
              <h3>No reservations yet</h3>
            </div>
          ) : (
            <div style={{ display: 'grid', gap: '1rem' }}>
              {reservations.map((res) => (
                <div key={res._id} style={{ background: 'var(--bg-card)', border: '1px solid rgba(255,255,255,0.08)', borderRadius: '12px', padding: '1.5rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1.5rem', alignItems: 'center' }}>
                  <div>
                    <h4 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0', color: 'var(--primary)' }}>
                      <User size={16} /> {res.name}
                    </h4>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0, color: 'var(--text-muted)' }}><Phone size={14} /> {res.phone}</p>
                  </div>
                  <div>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: '0 0 0.5rem 0' }}><Calendar size={16} /> {new Date(res.date).toLocaleDateString()}</p>
                    <p style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', margin: 0 }}><Clock size={16} /> {res.time}</p>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <div style={{ background: 'rgba(245,158,11,0.1)', padding: '0.75rem', borderRadius: '50%', color: 'var(--primary)' }}><Users size={20} /></div>
                    <div><p style={{ margin: 0, fontSize: '1.2rem', fontWeight: 700 }}>{res.guests} people</p></div>
                  </div>
                  <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.75rem' }}>
                    <div style={{ background: 'rgba(34,197,94,0.15)', color: '#4ade80', padding: '0.2rem 0.6rem', borderRadius: '50px', fontSize: '0.75rem', fontWeight: 600 }}>{res.status || 'New'}</div>
                    <button onClick={() => handleComplete(res._id)} style={{ background: 'rgba(34, 197, 94, 0.15)', border: '1px solid rgba(34, 197, 94, 0.4)', color: '#4ade80', padding: '0.6rem 1.2rem', borderRadius: '8px', cursor: 'pointer', fontWeight: 600 }}>Complete</button>
                  </div>
                </div>
              ))}
            </div>
          )
        ) : (
          /* MENU TAB */
          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: '3rem' }}>
            {/* Add/Edit Menu Form */}
            <div style={{ background: 'var(--bg-card)', padding: '2rem', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <h3 style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--primary)', marginBottom: '1.5rem', fontFamily: "'Playfair Display', serif" }}>
                {editingMenuId ? <><Edit size={20} /> Edit Menu Item</> : <><PlusCircle size={20} /> Add New Menu Item</>}
              </h3>
              <form onSubmit={handleMenuSubmit} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '1rem' }}>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Item Name</label>
                  <input type="text" required value={menuForm.name} onChange={e => setMenuForm({...menuForm, name: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Description</label>
                  <input type="text" required value={menuForm.description} onChange={e => setMenuForm({...menuForm, description: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white' }} />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Price</label>
                  <input type="text" required value={menuForm.price} onChange={e => setMenuForm({...menuForm, price: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white' }} placeholder="e.g. ₹299 or $12" />
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Category</label>
                  <select value={menuForm.category} onChange={e => setMenuForm({...menuForm, category: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white' }}>
                    <option value="Starters">Starters</option>
                    <option value="Main Course">Main Course</option>
                    <option value="Breads & Rice">Breads & Rice</option>
                    <option value="Desserts">Desserts</option>
                    <option value="Beverages">Beverages</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Type</label>
                  <select value={menuForm.isVeg} onChange={e => setMenuForm({...menuForm, isVeg: e.target.value})} style={{ width: '100%', padding: '0.8rem', borderRadius: '8px', border: '1px solid rgba(255,255,255,0.1)', background: 'rgba(0,0,0,0.3)', color: 'white' }}>
                    <option value="true">Vegetarian 🟢</option>
                    <option value="false">Non-Vegetarian 🔴</option>
                  </select>
                </div>
                <div>
                  <label style={{ display: 'block', marginBottom: '0.5rem', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Image {editingMenuId && '(Optional to replace)'}</label>
                  <input type="file" accept="image/*" onChange={e => setMenuForm({...menuForm, image: e.target.files[0]})} style={{ width: '100%', padding: '0.6rem', color: 'white' }} />
                </div>
                
                <div style={{ gridColumn: '1 / -1', marginTop: '1rem', display: 'flex', gap: '1rem' }}>
                  <button type="submit" disabled={isUploading} className="btn-primary" style={{ opacity: isUploading ? 0.7 : 1 }}>
                    {isUploading ? (editingMenuId ? 'Updating...' : 'Uploading...') : (editingMenuId ? 'Update Item' : 'Add Item to Menu')}
                  </button>
                  {editingMenuId && (
                    <button type="button" onClick={handleCancelEdit} style={{ background: 'transparent', border: '1px solid rgba(255,255,255,0.2)', color: 'white', padding: '0.8rem 1.5rem', borderRadius: '50px', cursor: 'pointer' }}>
                      Cancel Edit
                    </button>
                  )}
                </div>
              </form>
            </div>

            {/* Menu List */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: 'var(--primary)', marginBottom: '2rem', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '0.5rem' }}>
                Current Menu ({menuItems.length})
              </h2>
              
              {Object.keys(groupedMenu).map(category => (
                groupedMenu[category].length > 0 && (
                  <div key={category} style={{ marginBottom: '3rem' }}>
                    <h3 style={{ marginBottom: '1.5rem', color: 'white', fontFamily: "'Outfit', sans-serif", fontSize: '1.4rem' }}>
                      {category} <span style={{ color: 'var(--text-muted)', fontSize: '1rem' }}>({groupedMenu[category].length})</span>
                    </h3>
                    
                    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1.5rem' }}>
                      {groupedMenu[category].map(item => (
                        <div key={item._id} style={{ background: 'var(--bg-card)', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(255,255,255,0.05)', position: 'relative' }}>
                          <div style={{ height: '180px', overflow: 'hidden' }}>
                            <img src={item.image} alt={item.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <div style={{ padding: '1.25rem' }}>
                            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '0.5rem' }}>
                              <h4 style={{ margin: 0, fontSize: '1.1rem' }}>
                                <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: item.isVeg ? '#22c55e' : '#ef4444', marginRight: '8px' }}></span>
                                {item.name}
                              </h4>
                              <span style={{ color: 'var(--primary)', fontWeight: 'bold' }}>{item.price}</span>
                            </div>
                            
                            <div style={{ display: 'flex', gap: '0.5rem', marginTop: '1.5rem' }}>
                              <button onClick={() => handleEditClick(item)} style={{ flex: 1, background: 'rgba(255, 255, 255, 0.1)', color: 'white', border: 'none', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', fontSize: '0.85rem' }}>
                                <Edit size={14} /> Edit
                              </button>
                              <button onClick={() => handleMenuDelete(item._id)} style={{ flex: 1, background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.3)', padding: '0.5rem', borderRadius: '6px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '0.5rem', justifyContent: 'center', fontSize: '0.85rem' }}>
                                <Trash2 size={14} /> Delete
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )
              ))}

            </div>
          </div>
        )}

      </div>
    </div>
  );
};

export default Admin;
