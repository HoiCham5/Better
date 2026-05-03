import React, { useState } from 'react';
import { Search, HelpCircle } from 'lucide-react';

const FilterSidebar = ({ userPreference, setUserPreference }) => {
  const [brands, setBrands] = useState(['Apple', 'Samsung', 'Xiaomi', 'OPPO', 'vivo', 'ASUS', 'Sony', 'Nokia', 'Realme', 'Black Shark', 'BlackBerry', 'Blackphone', 'Blackview', 'BLU']);
  const [searchBrand, setSearchBrand] = useState('');

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', position: 'sticky', top: '80px' }}>
      
      {/* SORT BY */}
      <div style={{ marginBottom: '4px' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '8px', textTransform: 'uppercase', color: 'var(--vs-text-primary)' }}>Sắp xếp theo</h4>
        <select className="select-input" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--vs-border)', background: 'var(--vs-surface)', cursor: 'pointer', outline: 'none', color: 'var(--vs-text-primary)', fontSize: '0.9rem' }}>
          <option>Điểm Versus</option>
          <option>Giá: Thấp đến Cao</option>
          <option>Giá: Cao đến Thấp</option>
          <option>Mới nhất</option>
        </select>
      </div>

      {/* PRICE CARD */}
      <div className="vs-card" style={{ padding: '16px', borderRadius: '8px', display: 'flex', flexDirection: 'column', gap: '16px' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <h4 style={{ fontSize: '1rem', fontWeight: '500', color: 'var(--vs-text-primary)' }}>Giá bán</h4>
          <HelpCircle size={16} color="#999" style={{ cursor: 'pointer' }} />
        </div>
        
        <div>
          {/* Histogram */}
          <div style={{ display: 'flex', alignItems: 'flex-end', height: '60px', gap: '2px', padding: '0 8px' }}>
            {[5, 5, 8, 9, 7, 7, 6, 5, 4, 4, 3, 3, 2, 2].map((h, i) => (
              <div key={i} style={{ flex: 1, backgroundColor: '#e5e7eb', height: `${h * 10}%`, borderTopLeftRadius: '2px', borderTopRightRadius: '2px' }}></div>
            ))}
          </div>
          
          {/* Slider track & handles */}
          <div style={{ position: 'relative', width: '100%', height: '3px', backgroundColor: 'var(--vs-accent)', borderRadius: '2px', marginTop: '-1px' }}>
            {/* Left Handle */}
            <div style={{ position: 'absolute', left: '0', top: '50%', transform: 'translate(-50%, -50%)', width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', border: '1px solid #d1d5db', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 2 }}></div>
            {/* Right Handle */}
            <div style={{ position: 'absolute', right: '15%', top: '50%', transform: 'translate(50%, -50%)', width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', border: '1px solid #d1d5db', cursor: 'pointer', boxShadow: '0 2px 4px rgba(0,0,0,0.1)', zIndex: 2 }}></div>
            {/* Unselected right track */}
            <div style={{ position: 'absolute', right: '0', top: '0', bottom: '0', width: '15%', backgroundColor: '#e5e7eb', borderRadius: '0 2px 2px 0' }}></div>
          </div>
          
          <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.8rem', color: 'var(--vs-text-primary)', marginTop: '12px' }}>
            <span>2,000,000 ₫</span>
            <span>45,000,000+ ₫</span>
          </div>
        </div>

        <select className="select-input" style={{ width: '100%', padding: '10px 12px', borderRadius: '8px', border: '1px solid var(--vs-border)', background: 'var(--vs-surface)', cursor: 'pointer', outline: 'none', color: 'var(--vs-text-primary)', fontSize: '0.9rem' }}>
          <option>VND • ₫</option>
          <option>USD • $</option>
        </select>
      </div>

      {/* SHOW ALL VARIANTS */}
      <div className="vs-card" style={{ padding: '14px 16px', borderRadius: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.95rem', fontWeight: '400', color: 'var(--vs-text-primary)' }}>Hiện tất cả phiên bản</span>
        <div style={{ width: '36px', height: '20px', backgroundColor: '#e5e7eb', borderRadius: '12px', position: 'relative', cursor: 'pointer' }}>
          <div style={{ position: 'absolute', left: '2px', top: '2px', width: '16px', height: '16px', backgroundColor: 'white', borderRadius: '50%', boxShadow: '0 1px 3px rgba(0,0,0,0.2)' }}></div>
        </div>
      </div>

      {/* SEARCH BRAND */}
      <div className="vs-card" style={{ display: 'flex', flexDirection: 'column', height: '300px', borderRadius: '8px', overflow: 'hidden' }}>
        <div style={{ padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '8px', background: 'var(--vs-bg)' }}>
          <Search size={16} color="var(--vs-accent)" />
          <input 
            type="text" 
            placeholder="Tìm kiếm hãng..." 
            value={searchBrand}
            onChange={(e) => setSearchBrand(e.target.value)}
            style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%', fontSize: '0.9rem', color: 'var(--vs-accent)' }}
          />
        </div>
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px', display: 'flex', flexDirection: 'column', gap: '14px', scrollbarWidth: 'thin' }}>
          {brands.filter(b => b.toLowerCase().includes(searchBrand.toLowerCase())).map(brand => (
            <label key={brand} style={{ display: 'flex', alignItems: 'center', gap: '12px', cursor: 'pointer', fontSize: '0.9rem', color: 'var(--vs-text-primary)' }}>
              <input type="checkbox" style={{ width: '16px', height: '16px', border: '1px solid #ccc', borderRadius: '3px', cursor: 'pointer' }} />
              {brand}
            </label>
          ))}
        </div>
      </div>

      {/* DESIGN (Placeholder) */}
      <div style={{ marginTop: '4px' }}>
        <h4 style={{ fontSize: '0.85rem', fontWeight: '800', marginBottom: '8px', textTransform: 'uppercase', color: 'var(--vs-text-primary)' }}>Thiết kế</h4>
        <div className="vs-card" style={{ padding: '16px', borderRadius: '8px', height: '60px' }}>
        </div>
      </div>

    </div>
  );
};

export default FilterSidebar;
