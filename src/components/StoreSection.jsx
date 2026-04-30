import React, { useState } from 'react';
import ProductCard from './ProductCard';
import { ShoppingBag, Search, Smartphone, Laptop } from 'lucide-react';

const StoreSection = ({ products, onViewDetails, compareIds, onToggleCompare }) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('all'); // all, phone, laptop

  const filteredProducts = products.filter(p => {
    const matchType = filter === 'all' || p.category === filter;
    const matchSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.brand.toLowerCase().includes(searchTerm.toLowerCase());
    return matchType && matchSearch;
  });

  const phones = filteredProducts.filter(p => p.category === 'phone');
  const laptops = filteredProducts.filter(p => p.category === 'laptop');

  return (
    <section className="animate-fade-in" style={{ paddingBottom: '60px', marginTop: '40px' }}>
      {/* Banner */}
      <div style={{ background: 'var(--gradient-accent)', borderRadius: '15px', padding: '40px', textAlign: 'center', marginBottom: '40px', color: 'white' }}>
        <h2 style={{ fontSize: '2.5rem', marginBottom: '10px' }}><ShoppingBag style={{ display: 'inline', marginRight: '10px' }} />Cửa Hàng Better</h2>
        <p style={{ fontSize: '1.1rem', opacity: 0.9 }}>Khám phá toàn bộ danh sách sản phẩm công nghệ. Được liệt kê và tuyển chọn kỹ càng phục vụ so sánh.</p>
      </div>

      {/* Toolbar */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', flexWrap: 'wrap', gap: '15px' }}>
        <div style={{ display: 'flex', gap: '10px', background: 'var(--bg-secondary)', padding: '5px', borderRadius: '30px' }}>
          <button 
            onClick={() => setFilter('all')} 
            style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', background: filter === 'all' ? 'var(--accent-primary)' : 'transparent', color: filter === 'all' ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Tất cả
          </button>
          <button 
            onClick={() => setFilter('phone')} 
            style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', background: filter === 'phone' ? 'var(--accent-primary)' : 'transparent', color: filter === 'phone' ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Điện Thoại
          </button>
          <button 
            onClick={() => setFilter('laptop')} 
            style={{ padding: '8px 20px', borderRadius: '20px', border: 'none', background: filter === 'laptop' ? 'var(--accent-primary)' : 'transparent', color: filter === 'laptop' ? 'white' : 'var(--text-secondary)', cursor: 'pointer', fontWeight: 'bold' }}
          >
            Laptop
          </button>
        </div>

        <div style={{ position: 'relative', width: '300px' }}>
          <Search size={18} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
          <input 
            type="text" 
            placeholder="Tìm kiếm theo Tên, Hãng..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ width: '100%', padding: '10px 15px 10px 40px', borderRadius: '20px', border: '1px solid var(--glass-border)', background: 'var(--bg-secondary)', color: 'var(--text-primary)' }}
          />
        </div>
      </div>

      {/* Phone Grid */}
      {(filter === 'all' || filter === 'phone') && phones.length > 0 && (
        <div style={{ marginBottom: '50px' }}>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
            <Smartphone className="text-accent-primary" /> Tất Cả Cấp Bậc Điện Thoại
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {phones.map(p => <ProductCard key={p.id} product={p} onViewDetails={() => onViewDetails(p)} compareIds={compareIds} onToggleCompare={onToggleCompare} />)}
          </div>
        </div>
      )}

      {/* Laptop Grid */}
      {(filter === 'all' || filter === 'laptop') && laptops.length > 0 && (
        <div>
          <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
            <Laptop className="text-accent-secondary" /> Tất Cả Dòng Laptop
          </h3>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '20px' }}>
            {laptops.map(p => <ProductCard key={p.id} product={p} onViewDetails={() => onViewDetails(p)} compareIds={compareIds} onToggleCompare={onToggleCompare} />)}
          </div>
        </div>
      )}
      
      {filteredProducts.length === 0 && (
        <div style={{ textAlign: 'center', padding: '50px', background: 'var(--bg-secondary)', borderRadius: '15px', color: 'var(--text-secondary)' }}>
          Không tìm thấy sản phẩm nào khớp với tìm kiếm "{searchTerm}"
        </div>
      )}
    </section>
  );
};

export default StoreSection;
