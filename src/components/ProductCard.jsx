import React from 'react';
import { ShoppingCart, Video, Cpu, Monitor, Battery, Camera, MemoryStick, Award, Info, Heart } from 'lucide-react';
import Tooltip from './Tooltip';
import { useAuth } from '../context/AuthContext';

const ProductCard = ({ product, userPreference = '', onViewDetails }) => {
  const { userProfile, toggleWishlist } = useAuth() || {};
  if (!product) return null;

  const isSaved = userProfile?.wishlist?.includes(product.id);

  return (
    <div className="product-card glass-panel animate-fade-in">
      <div className="product-image-container">
        <div style={{ position: 'absolute', top: '10px', left: '10px', display: 'flex', gap: '5px', alignItems: 'center', zIndex: 10 }}>
          <div style={{
            width: '45px', height: '45px', borderRadius: '50%', background: 'var(--bg-primary)',
            border: '3px solid var(--accent-primary)', display: 'flex', alignItems: 'center',
            justifyContent: 'center', fontWeight: '900', fontSize: '1.2rem', color: 'var(--text-primary)',
            boxShadow: '0 4px 10px rgba(0,0,0,0.3)'
          }}>
            {Math.floor(Math.random() * 15 + 85)}
          </div>
          <span className="badge">{product.brand}</span>
          {product.isFeatured && (
            <span className="badge" style={{ background: 'var(--gradient-accent)', color: 'white', border: 'none' }}>Nổi Bật ✨</span>
          )}
        </div>

        <div style={{ position: 'absolute', top: '10px', right: '10px', display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end', zIndex: 10 }}>
          {userPreference && (
            <div style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(5px)', borderRadius: '20px', padding: '5px 12px', display: 'flex', gap: '5px', alignItems: 'center', border: '1px solid var(--glass-border)' }}>
              <Award size={14} className="text-accent-primary" />
              <b style={{ color: 'var(--text-primary)', fontSize: '0.85rem' }}>Phù hợp: {Math.floor(Math.random() * 20 + 80)}%</b>
            </div>
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
