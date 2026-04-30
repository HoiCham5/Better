import React from 'react';
import { X, Award, Heart, Shield, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { allProducts } from '../data/products';

const UserProfileModal = ({ onClose, onViewDetails }) => {
  const { currentUser, userProfile, logout } = useAuth();

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const wishlistProducts = allProducts.filter(p => userProfile?.wishlist?.includes(p.id));

  // Tính toán Gamification
  const xp = userProfile?.points || 0;
  let rank = "Newbie";
  let rankColor = "#9ca3af";
  if (xp > 50) { rank = "Người Chơi Hệ Tech"; rankColor = "#3b82f6"; }
  if (xp > 200) { rank = "Chuyên Gia Đánh Giá"; rankColor = "#f59e0b"; }
  if (xp > 1000) { rank = "Ngôi Sao Nền Tảng"; rankColor = "#ec4899"; }

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{ 
        width: '100%', maxWidth: '800px', maxHeight: '90vh', overflowY: 'auto',
        position: 'relative', borderRadius: '20px', padding: '0', display: 'flex', flexDirection: 'column'
      }}>
        {/* Sticky Header */}
        <div style={{ position: 'sticky', top: 0, background: 'var(--bg-primary)', padding: '20px 30px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <h2 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
            Hồ Sơ Của Tôi
          </h2>
          <button className="close-btn hover-focus-btn" onClick={onClose} style={{ background: 'var(--vs-border)', border: 'none', color: 'var(--vs-text-primary)', cursor: 'pointer', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '30px' }}>
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'center', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '15px', marginBottom: '30px' }}>
             <img 
               src={currentUser.photoURL || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop'} 
               alt="Avatar" 
               style={{ width: '80px', height: '80px', borderRadius: '50%', border: `3px solid ${rankColor}` }} 
             />
             <div style={{ flex: 1 }}>
               <h3 style={{ fontSize: '1.5rem', marginBottom: '5px' }}>{userProfile?.displayName || currentUser.email}</h3>
               <div style={{ display: 'flex', gap: '10px', alignItems: 'center', color: 'var(--text-secondary)' }}>
                 <Shield size={16} color={rankColor} /> 
                 <span style={{ color: rankColor, fontWeight: 'bold' }}>Hạng: {rank}</span> 
                 <span style={{ opacity: 0.5 }}>|</span>
                 <Award size={16} className="text-accent-primary" /> {xp} XP
               </div>
             </div>
             <div>
               <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.2)', color: '#ef4444', border: 'none', display: 'flex', alignItems: 'center', gap: '8px' }}>
                 <LogOut size={16} /> Thoát
               </button>
             </div>
          </div>

          <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
             <Heart className="text-accent-secondary" /> Danh Sách Thiết Bị Yêu Thích 
          </h3>
          
          {wishlistProducts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '15px' }}>
              {wishlistProducts.map(p => (
                <div key={p.id} style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '12px', textAlign: 'center', border: '1px solid var(--glass-border)' }}>
                  <img src={p.imageUrl} alt={p.name} style={{ width: '80%', height: '120px', objectFit: 'contain', marginBottom: '10px' }} />
                  <h4 style={{ fontSize: '1rem', marginBottom: '5px' }}>{p.brand} {p.name}</h4>
                  <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '0.9rem', marginBottom: '15px' }}>{p.price}</p>
                  <button 
                    className="btn" 
                    onClick={() => { onClose(); onViewDetails(p); }} 
                    style={{ width: '100%', fontSize: '0.9rem', padding: '8px' }}
                  >
                    Xem Lại
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '40px', background: 'var(--bg-secondary)', borderRadius: '15px' }} className="text-secondary">
              Bạn chưa thả tim thiết bị nào! Hãy ra ngoài trang chủ và bấm vào góc phải sản phẩm nhé.
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
