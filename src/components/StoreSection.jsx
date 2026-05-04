import React, { useState, useMemo } from 'react';
import { ShoppingBag, Search, Package } from 'lucide-react';
import { proxyImage } from '../utils/imageProxy';

const StoreSection = ({ products, onViewDetails }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [brandFilter, setBrandFilter] = useState('all');

  // Lấy danh sách các hãng duy nhất từ kho sản phẩm
  const brands = useMemo(() => {
    const allBrands = products.map(p => p.brand).filter(Boolean);
    return [...new Set(allBrands)].sort();
  }, [products]);

  const filteredProducts = products.filter(p => {
    const matchBrand = brandFilter === 'all' || p.brand === brandFilter;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchBrand && matchSearch;
  });

  const renderCard = (p) => (
    <div key={p.id} onClick={() => onViewDetails(p)} className="hover-lift" style={{ cursor: 'pointer' }}>
      <div style={{ position: 'relative', borderRadius: '20px', overflow: 'hidden', height: '300px', backgroundColor: 'var(--vs-surface)', border: '1px solid var(--vs-border)' }}>
        <img 
          src={proxyImage(p.image)} 
          alt={p.name} 
          style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
          onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
          onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
        />
        <div style={{ 
          position: 'absolute', bottom: 0, left: 0, right: 0, 
          background: 'linear-gradient(transparent, rgba(0,0,0,0.85))', 
          padding: '50px 20px 20px 20px', pointerEvents: 'none'
        }}>
          <h4 style={{ color: 'white', margin: 0, fontSize: '1.4rem', fontWeight: 800, textShadow: '0 2px 10px rgba(0,0,0,0.5)', lineHeight: 1.3 }}>
            {p.name}
          </h4>
        </div>
      </div>
      <div style={{ marginTop: '15px', fontSize: '0.95rem', color: 'var(--vs-text-secondary)' }}>
        <span style={{ fontWeight: 800, color: 'var(--vs-text-primary)' }}>New product</span> <span style={{ opacity: 0.5, margin: '0 5px' }}>/</span> {p.brand}
      </div>
    </div>
  );

  return (
    <section className="animate-fade-in container" style={{ paddingBottom: '80px', marginTop: '40px' }}>
      {/* Banner */}
      <div style={{ background: 'var(--gradient-accent)', borderRadius: '24px', padding: '50px 40px', textAlign: 'center', marginBottom: '50px', color: 'white', boxShadow: '0 20px 40px rgba(130, 36, 227, 0.2)' }}>
        <h2 style={{ fontSize: '3.5rem', marginBottom: '15px', fontWeight: 900, letterSpacing: '-1px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '15px' }}>
          <Package size={45} /> Kho Better
        </h2>
        <p style={{ fontSize: '1.2rem', opacity: 0.9, maxWidth: '600px', margin: '0 auto', fontWeight: 500 }}>
          Khám phá toàn bộ danh sách sản phẩm công nghệ. Được phân loại chi tiết theo từng hãng để bạn dễ dàng tra cứu.
        </p>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '50px', flexWrap: 'wrap', gap: '20px' }}>
        <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
          <button 
            onClick={() => setBrandFilter('all')} 
            style={{ 
              padding: '12px 25px', borderRadius: '30px', border: '1px solid var(--vs-border)', 
              background: brandFilter === 'all' ? 'var(--vs-text-primary)' : 'var(--bg-secondary)', 
              color: brandFilter === 'all' ? 'var(--bg-primary)' : 'var(--vs-text-primary)', 
              cursor: 'pointer', fontWeight: 800, fontSize: '0.95rem', transition: 'all 0.2s',
              boxShadow: brandFilter === 'all' ? '0 10px 20px rgba(0,0,0,0.1)' : 'none'
            }}
          >
            Tất cả
          </button>
          {brands.map(brand => (
            <button 
              key={brand}
              onClick={() => setBrandFilter(brand)} 
              style={{ 
                padding: '12px 25px', borderRadius: '30px', border: '1px solid var(--vs-border)', 
                background: brandFilter === brand ? 'var(--vs-text-primary)' : 'var(--bg-secondary)', 
                color: brandFilter === brand ? 'var(--bg-primary)' : 'var(--vs-text-primary)', 
                cursor: 'pointer', fontWeight: 800, fontSize: '0.95rem', transition: 'all 0.2s',
                boxShadow: brandFilter === brand ? '0 10px 20px rgba(0,0,0,0.1)' : 'none'
              }}
            >
              {brand}
            </button>
          ))}
        </div>

        <div style={{ position: 'relative', width: '350px', maxWidth: '100%' }}>
          <Search size={20} style={{ position: 'absolute', left: '20px', top: '50%', transform: 'translateY(-50%)', color: 'var(--vs-text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo Tên, Hãng..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              width: '100%', padding: '16px 20px 16px 55px', borderRadius: '30px', 
              border: '2px solid var(--vs-border)', background: 'var(--vs-surface)', 
              color: 'var(--vs-text-primary)', fontWeight: 600, fontSize: '1.05rem',
              boxShadow: 'inset 0 2px 4px rgba(0,0,0,0.05)'
            }}
          />
        </div>
      </div>

      {/* Grid Layout grouped by Brand or filtered */}
      {filteredProducts.length > 0 ? (
        brandFilter === 'all' && searchTerm === '' ? (
          brands.map(brand => {
            const brandProducts = filteredProducts.filter(p => p.brand === brand);
            if (brandProducts.length === 0) return null;
            return (
              <div key={brand} style={{ marginBottom: '60px' }} className="animate-fade-in">
                <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '30px', borderBottom: '2px solid var(--vs-border)', paddingBottom: '15px', display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--vs-text-primary)' }}>
                  {brand} 
                  <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--vs-text-secondary)', background: 'var(--vs-surface)', padding: '6px 15px', borderRadius: '30px', border: '1px solid var(--vs-border)' }}>
                    {brandProducts.length}
                  </span>
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
                  {brandProducts.map(p => renderCard(p))}
                </div>
              </div>
            );
          })
        ) : (
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '30px' }}>
            {filteredProducts.map(p => renderCard(p))}
          </div>
        )
      ) : (
        <div style={{ textAlign: 'center', padding: '100px 20px', background: 'var(--vs-surface)', borderRadius: '24px', color: 'var(--vs-text-secondary)', border: '2px dashed var(--vs-border)' }}>
          <Package size={64} style={{ opacity: 0.2, marginBottom: '20px' }} />
          <h3 style={{ fontSize: '1.8rem', fontWeight: 800, marginBottom: '15px', color: 'var(--vs-text-primary)' }}>Không tìm thấy sản phẩm</h3>
          <p style={{ fontSize: '1.1rem' }}>Không có sản phẩm nào khớp với tìm kiếm "{searchTerm}" trong kho.</p>
        </div>
      )}
    </section>
  );
};

export default StoreSection;
