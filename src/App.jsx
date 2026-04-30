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

  return (
    <>
      <Header 
        activeTab={activeTab} 
        setActiveTab={setActiveTab} 
        onLoginClick={() => setShowAuthModal(true)}
        onProfileClick={() => setShowProfileModal(true)}
      />
      
      <main className="main-layout container">
        <section className="title-section animate-fade-in">
          <h1 className="main-title">
            Tìm Thiết Bị <span className="text-accent-primary">Hoàn Hảo</span> Cho Bạn
          </h1>
          <p className="sub-title">
            So sánh chi tiết thông số và giá bán của các dòng điện thoại thông minh và laptop thịnh hành nhất. Đặt mua nhanh chóng qua Shopee và TikTok.
          </p>
        </section>

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
                <CompareSection products={phonesList} />
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
             <CompareSection products={products} />
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
             <StoreSection products={products} onViewDetails={setSelectedProduct} />
          </div>
        )}

      </main>

      <footer className="glass-panel" style={{ marginTop: '80px', padding: '40px 0', textAlign: 'center', borderRadius: 0, borderBottom: 0, borderLeft: 0, borderRight: 0 }}>
        <div className="container">
          <p className="text-secondary">&copy; 2026 Better. Built with premium aesthetics and AI.</p>
        </div>
      </footer>

      {/* Floating Actions Container */}
      <div className="floating-actions-container" style={{ position: 'fixed', bottom: '30px', right: '30px', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', zIndex: 1000 }}>
        
        {/* User Login/Profile Floating Button */}
        <button 
          className="user-btn hover-focus-btn"
          onClick={() => currentUser ? setShowProfileModal(true) : setShowAuthModal(true)}
          style={{ background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: 'var(--text-secondary)', overflow: 'hidden' }}
        >
          {currentUser ? (
            <img src={currentUser.photoURL || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=100&h=100&fit=crop'} style={{ width: '100%', height: '100%', objectFit: 'cover' }} alt="Avatar" />
          ) : (
            <User size={24} />
          )}
        </button>

        {/* Admin Toggle Floating Button */}
        <button 
          className="admin-btn hover-focus-btn"
          onClick={() => setShowAdmin(!showAdmin)}
          style={{
            width: '60px',
            height: '60px',
            borderRadius: '50%',
            background: 'var(--gradient-accent)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 10px 25px rgba(59, 130, 246, 0.5)',
            border: 'none',
            cursor: 'pointer'
          }}
        >
          <Settings size={28} />
        </button>
      </div>

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
              onClick={() => setShowAdmin(false)}
              style={{
                position: 'absolute',
                top: '20px',
                right: '20px',
                background: 'rgba(255,255,255,0.1)',
                border: 'none',
                borderRadius: '50%',
                width: '40px',
                height: '40px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'white',
                cursor: 'pointer',
                zIndex: 10
              }}
            >
              <X size={24} />
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
