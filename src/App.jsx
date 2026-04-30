import React, { useState } from 'react';
import Header from './components/Header';
import ProductCard from './components/ProductCard';
import CompareSection from './components/CompareSection';
import AIAnalyzer from './components/AIAnalyzer';
import StoreSection from './components/StoreSection';
import AdminPanel from './components/AdminPanel';
import NewsFeed from './components/NewsFeed';
import FilterSidebar from './components/FilterSidebar';
import AuthModal from './components/AuthModal';
import ProductDetailsModal from './components/ProductDetailsModal';
import UserProfileModal from './components/UserProfileModal';
import VersusHero from './components/VersusHero';
import { Settings, X, User } from 'lucide-react';
import { allProducts } from './data/products';
import { useEffect } from 'react';
import { useAuth } from './context/AuthContext';
import './index.css';
import './index.css';

function App() {
  const { currentUser } = useAuth() || {};
  const [activeTab, setActiveTab] = useState('phones');
  const [products, setProducts] = useState([]);
  const [posts, setPosts] = useState([]);
  const [showAdmin, setShowAdmin] = useState(false);
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [showProfileModal, setShowProfileModal] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [userPreference, setUserPreference] = useState('Không thiết lập');
  const [compareIds, setCompareIds] = useState([]);
  const [darkMode, setDarkMode] = useState(() => localStorage.getItem('theme') === 'dark');

  useEffect(() => {
    document.documentElement.setAttribute('data-theme', darkMode ? 'dark' : 'light');
    localStorage.setItem('theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  const toggleDark = () => setDarkMode(d => !d);

  useEffect(() => {
    // Tải Sản phẩm từ Node Backend
    const fetchProducts = async () => {
      try {
        let res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`);
        let data = await res.json();
        
        // Seeding nếu rỗng
        if (data.length === 0) {
          console.log("Seeding products to MongoDB...");
          await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/seed`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(allProducts)
          });
          res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`);
          data = await res.json();
        }
        setProducts(data);
      } catch (e) {
        console.error("Lỗi tải Sản phẩm: ", e);
      }
    };

    // Tải Bài viết tải Backend
    const fetchPosts = async () => {
      try {
        let res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/posts`);
        let data = await res.json();
        if (data.length === 0) {
           const sample = { id: '1', title: 'Chào mừng đến Better', summary: 'Nơi so sánh uy tín nhất', content: 'Đây là bài viết mẫu.', image: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?q=80&w=800&auto=format&fit=crop', date: new Date().toLocaleDateString() };
           await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/posts`, {
             method: 'POST',
             headers: { 'Content-Type': 'application/json' },
             body: JSON.stringify(sample)
           });
           data = [sample];
        }
        setPosts(data.sort((a,b) => b.id - a.id));
      } catch (e) {
        console.error("Lỗi tải Bài viết: ", e);
      }
    };

    fetchProducts();
    fetchPosts();
  }, []);

  // Danh sách toàn bộ sản phẩm theo danh mục (Dùng cho So Sánh)
  const phonesList = products.filter(p => p.category === 'phone');
  const laptopsList = products.filter(p => p.category === 'laptop');

  // Danh sách Nổi Bật (Chỉ hiển thị lên khu vực chính trang chủ)
  const featuredPhones = phonesList.filter(p => p.isFeatured);
  const featuredLaptops = laptopsList.filter(p => p.isFeatured);

  const handleHeroCompare = (id1, id2) => {
    setCompareIds([id1, id2]);
    setActiveTab('compare');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const toggleCompare = (id) => {
    setCompareIds(prev => {
      if (prev.includes(id)) return prev.filter(x => x !== id);
      if (prev.length >= 3) return [prev[1], prev[2], id];
      return [...prev, id];
    });
  };

  const renderComparePopup = () => {
    if (compareIds.length === 0) return null;
    return (
      <div className="animate-fade-in" style={{ position: 'fixed', bottom: '20px', right: '20px', background: 'var(--vs-surface)', borderRadius: '16px', boxShadow: '0 8px 30px rgba(0,0,0,0.3)', border: '1px solid var(--vs-border)', zIndex: 1000, width: '320px', overflow: 'hidden' }}>
        <div style={{ background: 'var(--gradient-accent)', padding: '12px 16px', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 'bold' }}>
            <span style={{ background: 'rgba(255,255,255,0.2)', padding: '4px 8px', borderRadius: '4px' }}>VS</span>
            Danh sách so sánh
          </div>
          <button onClick={() => setCompareIds([])} style={{ background: 'none', border: 'none', color: 'white', cursor: 'pointer', padding: '4px' }}><X size={18} /></button>
        </div>
        <div style={{ padding: '10px' }}>
          {compareIds.map(id => {
            const p = products.find(x => x.id === id);
            if (!p) return null;
            return (
              <div key={id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px', borderBottom: '1px solid var(--vs-border)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <img src={p.image} style={{ width: '30px', height: '30px', objectFit: 'contain' }} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: 'var(--vs-text-primary)' }}>{p.name}</span>
                </div>
                <button onClick={() => toggleCompare(id)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--vs-text-secondary)', padding: '4px' }}><X size={16} /></button>
              </div>
            );
          })}
          <div style={{ padding: '10px' }}>
            <button 
              onClick={() => { setActiveTab('compare'); window.scrollTo({ top: 0, behavior: 'smooth' }); }}
              disabled={compareIds.length < 2}
              className="btn hover-lift" 
              style={{ width: '100%', padding: '10px', borderRadius: '8px', background: compareIds.length < 2 ? 'var(--vs-border)' : 'var(--gradient-accent)', color: compareIds.length < 2 ? 'var(--vs-text-secondary)' : 'white', fontWeight: 'bold', border: 'none', cursor: compareIds.length < 2 ? 'not-allowed' : 'pointer' }}
            >
              So Sánh Ngay ({compareIds.length})
            </button>
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLoginClick={() => setShowAuthModal(true)}
        onProfileClick={() => setShowProfileModal(true)}
        darkMode={darkMode}
        toggleDark={toggleDark}
        currentUser={currentUser}
        onAdminClick={() => setShowAdmin(!showAdmin)}
      />

      {/* Hero: full-width, outside container */}
      <VersusHero products={products} onCompare={handleHeroCompare} />
      
      <main className="main-layout container">

        {activeTab === 'phones' && (
          <section className="animate-fade-in" style={{ marginBottom: '60px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <span style={{ width: '40px', height: '4px', background: 'var(--gradient-accent)', borderRadius: '2px' }}></span>
              Điện Thoại Mới Nổi Bật
            </h2>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px', alignItems: 'start' }}>
              <FilterSidebar userPreference={userPreference} setUserPreference={setUserPreference} />
              <div className="compare-container" style={{ margin: 0, padding: 0 }}>
                {featuredPhones.length > 0 ? (
                  featuredPhones.map(phone => (
                    <ProductCard 
                      key={phone.id} 
                      product={phone} 
                      userPreference={userPreference === 'Không thiết lập' ? '' : userPreference} 
                      onViewDetails={() => setSelectedProduct(phone)}
                      compareIds={compareIds}
                      onToggleCompare={toggleCompare}
                    />
                  ))
                ) : (
                  <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '15px' }} className="text-secondary">
                    Chưa có sản phẩm điện thoại nào được đánh dấu nổi bật. Vui lòng vào Admin để chọn thiết bị hiển thị lên trang chủ!
                  </div>
                )}
              </div>
            </div>
            <div style={{ textAlign: 'center', marginTop: '30px' }}>
              <button 
                onClick={() => setActiveTab('store')} 
                className="btn hover-lift" 
                style={{ padding: '12px 30px', background: 'transparent', border: '2px solid var(--accent-primary)', color: 'var(--accent-primary)', borderRadius: '30px', fontWeight: 'bold' }}
              >
                Xem Toàn Bộ Mẫu Điện Thoại Khác →
              </button>
            </div>
            {phonesList.length > 1 && (
              <div style={{ marginTop: '40px' }}>
                <CompareSection products={phonesList} initialDeviceIds={compareIds} />
              </div>
            )}
          </section>
        )}

        {activeTab === 'laptops' && (
           <section className="animate-fade-in" style={{ marginBottom: '60px' }}>
             <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '10px' }}>
               <span style={{ width: '40px', height: '4px', background: 'var(--gradient-accent)', borderRadius: '2px' }}></span>
               Laptop Làm Việc / Chơi Game
             </h2>
             <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: '30px', alignItems: 'start' }}>
               <FilterSidebar userPreference={userPreference} setUserPreference={setUserPreference} />
               <div className="compare-container" style={{ margin: 0, padding: 0 }}>
                 {featuredLaptops.length > 0 ? (
                   featuredLaptops.map(laptop => (
                     <ProductCard 
                       key={laptop.id} 
                       product={laptop} 
                       userPreference={userPreference === 'Không thiết lập' ? '' : userPreference} 
                       onViewDetails={() => setSelectedProduct(laptop)}
                       compareIds={compareIds}
                       onToggleCompare={toggleCompare}
                     />
                   ))
                 ) : (
                   <div style={{ gridColumn: '1 / -1', padding: '40px', textAlign: 'center', background: 'var(--bg-secondary)', borderRadius: '15px' }} className="text-secondary">
                     Chưa có sản phẩm laptop nào được đánh dấu nổi bật. Vui lòng vào Admin để chọn thiết bị hiển thị lên trang chủ!
                   </div>
                 )}
               </div>
             </div>
             <div style={{ textAlign: 'center', marginTop: '30px' }}>
               <button 
                 onClick={() => setActiveTab('store')} 
                 className="btn hover-lift" 
                 style={{ padding: '12px 30px', background: 'transparent', border: '2px solid var(--accent-secondary)', color: 'var(--accent-secondary)', borderRadius: '30px', fontWeight: 'bold' }}
               >
                 Xem Toàn Bộ Mẫu Laptop Khác →
               </button>
             </div>
             {laptopsList.length > 1 && (
               <div style={{ marginTop: '40px' }}>
                 <CompareSection products={laptopsList} />
               </div>
             )}
           </section>
        )}

        {activeTab === 'compare' && (
          <div className="animate-fade-in">
             <CompareSection products={products} initialDeviceIds={compareIds} />
          </div>
        )}

        {activeTab === 'ai' && (
          <div className="animate-fade-in">
             <AIAnalyzer products={products} />
          </div>
        )}

        {activeTab === 'news' && (
          <div className="animate-fade-in">
             <NewsFeed posts={posts} />
          </div>
        )}

        {activeTab === 'store' && (
          <div className="animate-fade-in">
             <StoreSection products={products} onViewDetails={setSelectedProduct} compareIds={compareIds} onToggleCompare={toggleCompare} />
          </div>
        )}

        {renderComparePopup()}
      </main>

      <footer className="glass-panel" style={{ marginTop: '80px', padding: '40px 0', textAlign: 'center', borderRadius: 0, borderBottom: 0, borderLeft: 0, borderRight: 0 }}>
        <div className="container">
          <p className="text-secondary">&copy; 2026 Better. Built with premium aesthetics and AI.</p>
        </div>
      </footer>

      {/* Floating action buttons moved to Header */}

      {/* Admin Panel Popup / Modal */}
      {showAdmin && (
        <div style={{
          position: 'fixed',
          top: 0, left: 0, right: 0, bottom: 0,
          background: 'rgba(0, 0, 0, 0.8)',
          backdropFilter: 'blur(8px)',
          zIndex: 1100,
          display: 'flex',
          alignItems: 'flex-start',
          justifyContent: 'center',
          overflowY: 'auto',
          padding: '40px 20px'
        }}>
          <div style={{ position: 'relative', width: '100%', maxWidth: '1200px', background: 'var(--bg-primary)', borderRadius: '20px', padding: '30px', border: '1px solid var(--glass-border)' }}>
            <button 
              className="close-btn hover-focus-btn"
              onClick={() => setShowAdmin(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'var(--vs-border)',
                border: 'none',
                borderRadius: '50%',
                width: '36px',
                height: '36px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--vs-text-primary)',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={20} />
            </button>
            <AdminPanel products={products} setProducts={setProducts} posts={posts} setPosts={setPosts} />
          </div>
        </div>
      )}

      {showAuthModal && <AuthModal onClose={() => setShowAuthModal(false)} />}
      {showProfileModal && (
        <UserProfileModal 
          onClose={() => setShowProfileModal(false)} 
          onViewDetails={(p) => {
             setShowProfileModal(false);
             setSelectedProduct(p);
          }}
        />
      )}
      {selectedProduct && <ProductDetailsModal product={selectedProduct} onClose={() => setSelectedProduct(null)} />}
    </>
  );
}

export default App;
