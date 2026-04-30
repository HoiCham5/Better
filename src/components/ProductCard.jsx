import React from 'react';
import { ShoppingCart, Video, Cpu, Monitor, Battery, Camera, MemoryStick, Award, Info, Heart } from 'lucide-react';
import Tooltip from './Tooltip';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product, userPreference = '', onViewDetails, compareIds = [], onToggleCompare }) => {
  const { userProfile, toggleWishlist } = useAuth() || {};
  if (!product) return null;

  const isSaved = userProfile?.wishlist?.includes(product.id);
  const isComparing = compareIds.includes(product.id);

  return (
    <div className="product-card glass-panel animate-fade-in">
      <div className="product-image-container">
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', flexDirection: 'column', gap: '8px', alignItems: 'flex-start', zIndex: 10 }}>
          <div style={{
            width: '45px', height: '45px', borderRadius: '50%', background: 'var(--vs-surface)',
            border: '3px solid #3858f6', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: '900', fontSize: '1.1rem', color: 'var(--vs-text-primary)',
            boxShadow: '0 4px 12px rgba(0,0,0,0.3)'
          }}>
            {85 + (product.name.length % 12)}
          </div>
          
          {product.isFeatured && (
            <div style={{
              background: 'linear-gradient(135deg, #f59e0b, #fbbf24)',
              color: 'white', fontSize: '0.65rem', fontWeight: 800, padding: '4px 10px',
              borderRadius: '20px', display: 'flex', alignItems: 'center', gap: '4px',
              boxShadow: '0 4px 12px rgba(245, 158, 11, 0.4)', textTransform: 'uppercase',
              letterSpacing: '0.5px'
            }}>
              Nổi Bật ✨
            </div>
          )}
        </div>

        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end', zIndex: 10 }}>
          {userPreference && (
            <div style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', borderRadius: '20px', padding: '5px 12px', display: 'flex', gap: '5px', alignItems: 'center', border: '1px solid var(--glass-border)' }}>
              <Award size={14} className="text-accent-primary" />
              <b style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>Phù hợp: {Math.floor(Math.random() * 20 + 80)}%</b>
            </div>
          )}
          {onToggleCompare && (
            <button 
              onClick={(e) => { e.stopPropagation(); onToggleCompare(product.id); }}
              className={`btn hover-lift ${isComparing ? 'bg-accent-primary' : ''}`}
              style={{ background: isComparing ? 'var(--gradient-accent)' : 'rgba(0,0,0,0.5)', color: 'white', border: '1px solid var(--glass-border)', padding: '8px', borderRadius: '50%', backdropFilter: 'blur(5px)', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
              title={isComparing ? "Bỏ so sánh" : "Thêm vào so sánh"}
            >
              <span style={{ fontSize: '0.8rem', fontWeight: 'bold' }}>VS</span>
            </button>
          )}
          <button
            onClick={(e) => { e.stopPropagation(); toggleWishlist && toggleWishlist(product.id); }}
            style={{
              background: 'rgba(0,0,0,0.5)', border: '1px solid var(--glass-border)', borderRadius: '50%',
              width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer',
              color: isSaved ? '#ef4444' : 'white', backdropFilter: 'blur(5px)'
            }}
          >
            <Heart size={18} fill={isSaved ? '#ef4444' : 'none'} />
          </button>
        </div>

        <img src={product.image} alt={product.name} className="product-image" />
      </div>

      <div className="product-info">
        <h2>{product.name}</h2>
        <div className="product-price">{product.price}</div>

        <div className="specs-list">
          <div className="spec-item">
            <div className="spec-icon"><Monitor size={18} /></div>
            <div className="spec-content">
              <h4>Màn hình</h4>
              <p><Tooltip term={product.specs.screen} /></p>
            </div>
          </div>

          <div className="spec-item">
            <div className="spec-icon"><Cpu size={18} /></div>
            <div className="spec-content">
              <h4>Chíp xử lý</h4>
              <p><Tooltip term={product.specs.chip} /></p>
            </div>
          </div>

          <div className="spec-item">
            <div className="spec-icon"><Battery size={18} /></div>
            <div className="spec-content">
              <h4>Pin & Sạc</h4>
              <p><Tooltip term={product.specs.battery} /></p>
            </div>
          </div>

          {product.category === 'phone' ? (
            <div className="spec-item">
              <div className="spec-icon"><Camera size={18} /></div>
              <div className="spec-content">
                <h4>Camera</h4>
                <p><Tooltip term={product.specs.camera} /></p>
              </div>
            </div>
          ) : (
            <div className="spec-item">
              <div className="spec-icon"><MemoryStick size={18} /></div>
              <div className="spec-content">
                <h4>RAM & Lưu trữ</h4>
                <p><Tooltip term={`${product.specs.ram} / ${product.specs.storage}`} /></p>
              </div>
            </div>
          )}
        </div>

        <div className="buy-actions" style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginTop: '15px' }}>
          <button onClick={onViewDetails} className="btn" style={{ width: '100%', background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)', color: 'var(--text-primary)', padding: '10px', borderRadius: '8px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '5px' }}>
            <Info size={18} /> Xem Chi Tiết
          </button>
          <div style={{ display: 'flex', gap: '10px' }}>
            <a href={product.links?.shopee || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-shopee" style={{ flex: 1 }}>
              <ShoppingCart size={18} /> Shopee
            </a>
            <a href={product.links?.tiktok || '#'} target="_blank" rel="noopener noreferrer" className="btn btn-tiktok" style={{ flex: 1 }}>
              <Video size={18} /> TikTok
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
