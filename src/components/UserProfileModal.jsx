import React, { useState } from 'react';
import { X, Award, Heart, Shield, LogOut, Edit2, Save, Image as ImageIcon } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { allProducts } from '../data/products';
import { proxyImage } from '../utils/imageProxy';

const UserProfileModal = ({ onClose, onViewDetails }) => {
  const { currentUser, userProfile, logout, updateProfile } = useAuth();
  const [isEditing, setIsEditing] = useState(false);
  const [editName, setEditName] = useState(userProfile?.displayName || currentUser?.email || '');
  const [editAvatar, setEditAvatar] = useState(currentUser?.photoURL || '');

  if (!currentUser) return null;

  const handleLogout = () => {
    logout();
    onClose();
  };

  const handleSaveProfile = async () => {
    await updateProfile({
      displayName: editName,
      photoURL: editAvatar
    });
    setIsEditing(false);
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
          
          <div style={{ display: 'flex', gap: '20px', alignItems: 'flex-start', background: 'var(--bg-secondary)', padding: '25px', borderRadius: '15px', marginBottom: '30px', position: 'relative' }}>
             
             {!isEditing && (
               <button onClick={() => setIsEditing(true)} title="Chỉnh sửa hồ sơ" style={{ position: 'absolute', top: '20px', right: '20px', background: 'transparent', border: 'none', color: 'var(--vs-text-secondary)', cursor: 'pointer', padding: '5px' }} className="hover-focus-btn">
                 <Edit2 size={18} />
               </button>
             )}

             <img 
               src={proxyImage(currentUser.photoURL || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=150&h=150&fit=crop')} 
               alt="Avatar" 
               style={{ width: '90px', height: '90px', borderRadius: '50%', border: `3px solid ${rankColor}`, objectFit: 'cover' }} 
             />
             
             <div style={{ flex: 1 }}>
               {isEditing ? (
                 <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                   <div>
                     <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)', marginBottom: '5px', display: 'block' }}>Tên Hiển Thị</label>
                     <input 
                       type="text" 
                       value={editName} 
                       onChange={e => setEditName(e.target.value)}
                       className="select-input"
                       style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--vs-border)' }}
                     />
                   </div>
                   <div>
                     <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)', marginBottom: '5px', display: 'flex', alignItems: 'center', gap: '5px' }}>
                       <ImageIcon size={14} /> Link Ảnh Đại Diện (Avatar URL)
                     </label>
                     <input 
                       type="text" 
                       value={editAvatar} 
                       onChange={e => setEditAvatar(e.target.value)}
                       className="select-input"
                       placeholder="https://..."
                       style={{ width: '100%', padding: '10px', borderRadius: '8px', border: '1px solid var(--vs-border)' }}
                     />
                   </div>
                   <div style={{ display: 'flex', gap: '10px', marginTop: '5px' }}>
                     <button onClick={handleSaveProfile} className="btn btn-primary" style={{ padding: '8px 20px', borderRadius: '8px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                       <Save size={16} /> Lưu Thay Đổi
                     </button>
                     <button onClick={() => setIsEditing(false)} className="btn" style={{ padding: '8px 20px', borderRadius: '8px', background: 'var(--vs-border)' }}>
                       Hủy
                     </button>
                   </div>
                 </div>
               ) : (
                 <>
                   <h3 style={{ fontSize: '1.6rem', marginBottom: '8px', color: 'var(--vs-text-primary)' }}>{userProfile?.displayName || currentUser.email}</h3>
                   <div style={{ display: 'flex', gap: '15px', alignItems: 'center', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                       <Shield size={18} color={rankColor} /> 
                       <span style={{ color: rankColor, fontWeight: 'bold' }}>Hạng: {rank}</span> 
                     </span>
                     <span style={{ opacity: 0.5 }}>|</span>
                     <span style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                       <Award size={18} className="text-accent-primary" /> 
                       <span style={{ fontWeight: 'bold', color: 'var(--vs-text-primary)' }}>{xp} XP</span>
                     </span>
                   </div>
                 </>
               )}
             </div>

             {!isEditing && (
               <div style={{ alignSelf: 'center', marginLeft: 'auto', paddingLeft: '20px' }}>
                 <button onClick={handleLogout} className="btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: '1px solid rgba(239, 68, 68, 0.2)', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '10px', fontWeight: 'bold' }}>
                   <LogOut size={16} /> Thoát
                 </button>
               </div>
             )}
          </div>

          <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
             <Heart className="text-accent-secondary" /> Danh Sách Thiết Bị Yêu Thích 
          </h3>
          
          {wishlistProducts.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(200px, 1fr))', gap: '20px' }}>
              {wishlistProducts.map(p => (
                <div key={p.id} style={{ background: 'var(--bg-secondary)', padding: '15px', borderRadius: '16px', textAlign: 'center', border: '1px solid var(--vs-border)', transition: 'transform 0.2s', cursor: 'pointer' }} className="hover-lift" onClick={() => { onClose(); onViewDetails(p); }}>
                  <img src={proxyImage(p.image)} alt={p.name} style={{ width: '100%', height: '140px', objectFit: 'contain', marginBottom: '15px' }} />
                  <h4 style={{ fontSize: '1rem', marginBottom: '5px', color: 'var(--vs-text-primary)' }}>{p.brand} {p.name}</h4>
                  <p style={{ color: 'var(--accent-primary)', fontWeight: 'bold', fontSize: '0.95rem', marginBottom: '0' }}>{p.price}</p>
                </div>
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '50px 20px', background: 'var(--bg-secondary)', borderRadius: '15px', border: '1px dashed var(--vs-border)' }} className="text-secondary">
              <Heart size={40} style={{ opacity: 0.2, margin: '0 auto 15px auto' }} />
              <p>Bạn chưa thả tim thiết bị nào! Hãy ra ngoài trang chủ và bấm vào góc phải sản phẩm nhé.</p>
            </div>
          )}

        </div>
      </div>
    </div>
  );
};

export default UserProfileModal;
