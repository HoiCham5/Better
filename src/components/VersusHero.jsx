import React, { useState, useRef, useEffect } from 'react';
import { Search, Zap } from 'lucide-react';

const VersusHero = ({ products = [] }) => {
  const [item1, setItem1] = useState('');
  const [item2, setItem2] = useState('');
  
  const [showSuggestions1, setShowSuggestions1] = useState(false);
  const [showSuggestions2, setShowSuggestions2] = useState(false);
  
  const wrapperRef1 = useRef(null);
  const wrapperRef2 = useRef(null);

  // Đóng gợi ý khi click ra ngoài
  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef1.current && !wrapperRef1.current.contains(event.target)) {
        setShowSuggestions1(false);
      }
      if (wrapperRef2.current && !wrapperRef2.current.contains(event.target)) {
        setShowSuggestions2(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  const handleCompare = (e) => {
    e.preventDefault();
    if(item1 && item2) {
      alert(`Tính năng đang phát triển: So sánh ${item1} vs ${item2}`);
    } else {
      alert('Vui lòng nhập đủ 2 sản phẩm để so sánh!');
    }
  };

  const filteredProducts1 = item1 ? products.filter(p => p.name.toLowerCase().includes(item1.toLowerCase()) || p.brand.toLowerCase().includes(item1.toLowerCase())).slice(0, 5) : [];
  const filteredProducts2 = item2 ? products.filter(p => p.name.toLowerCase().includes(item2.toLowerCase()) || p.brand.toLowerCase().includes(item2.toLowerCase())).slice(0, 5) : [];

  const SuggestionList = ({ items, onSelect }) => (
    <div style={{
      position: 'absolute', top: 'calc(100% + 5px)', left: 0, right: 0,
      background: 'var(--bg-secondary)', border: '1px solid var(--glass-border)',
      borderRadius: '15px', zIndex: 100, overflow: 'hidden',
      boxShadow: '0 10px 25px rgba(0,0,0,0.5)',
      textAlign: 'left'
    }}>
      {items.length > 0 ? items.map(p => (
        <div 
          key={p.id} 
          onClick={() => onSelect(p.name)}
          style={{
            padding: '10px 15px', display: 'flex', alignItems: 'center', gap: '10px',
            cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.05)',
            color: 'var(--text-primary)', transition: 'background 0.2s'
          }}
          onMouseEnter={(e) => e.currentTarget.style.background = 'rgba(255,255,255,0.1)'}
          onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
        >
          <img src={p.image} alt={p.name} style={{ width: '35px', height: '35px', borderRadius: '5px', objectFit: 'cover' }} />
          <div style={{ flex: 1, overflow: 'hidden' }}>
            <div style={{ fontSize: '0.95rem', fontWeight: 'bold', whiteSpace: 'nowrap', textOverflow: 'ellipsis', overflow: 'hidden' }}>{p.name}</div>
            <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>{p.brand} - {p.price}</div>
          </div>
        </div>
      )) : (
        <div style={{ padding: '15px', textAlign: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
          Không tìm thấy sản phẩm
        </div>
      )}
    </div>
  );

  return (
    <div className="versus-hero animate-fade-in" style={{
      textAlign: 'center',
      padding: '60px 20px',
      background: 'var(--bg-secondary)',
      borderRadius: '20px',
      marginBottom: '40px',
      position: 'relative',
      overflow: 'visible',
      zIndex: 50
    }}>
      <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '300px', height: '300px', background: 'var(--accent-primary)', filter: 'blur(150px)', opacity: 0.2, zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '300px', height: '300px', background: 'var(--accent-secondary)', filter: 'blur(150px)', opacity: 0.2, zIndex: 0 }}></div>
      
      <div style={{ position: 'relative', zIndex: 2 }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '15px', letterSpacing: '-1px' }}>
          Chúng tôi <span style={{ color: 'var(--accent-primary)' }}>so sánh.</span> Bạn quyết định.
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          Khám phá sự khác biệt thực sự giữa các thiết bị với hệ thống điểm số và phân tích chuyên sâu.
        </p>

        <form onSubmit={handleCompare} className="versus-search-box" style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          gap: '15px',
          maxWidth: '800px',
          margin: '0 auto',
          background: 'var(--bg-primary)',
          padding: '15px',
          borderRadius: '50px',
          boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
          border: '1px solid var(--glass-border)',
          flexWrap: 'wrap'
        }}>
          
          <div ref={wrapperRef1} style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Điện thoại, Laptop..." 
              value={item1}
              onChange={(e) => {
                setItem1(e.target.value);
                setShowSuggestions1(true);
              }}
              onFocus={() => { if(item1) setShowSuggestions1(true); }}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: '30px', border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1.1rem', outline: 'none' }}
            />
            {showSuggestions1 && item1 && (
              <SuggestionList items={filteredProducts1} onSelect={(name) => { setItem1(name); setShowSuggestions1(false); }} />
            )}
          </div>

          <div className="vs-badge" style={{
            width: '40px',
            height: '40px',
            borderRadius: '50%',
            background: 'var(--gradient-accent)',
            color: 'white',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontWeight: 'bold',
            fontSize: '1.2rem',
            flexShrink: 0,
            boxShadow: '0 5px 15px rgba(59, 130, 246, 0.4)'
          }}>VS</div>

          <div ref={wrapperRef2} style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Sản phẩm để so sánh..." 
              value={item2}
              onChange={(e) => {
                setItem2(e.target.value);
                setShowSuggestions2(true);
              }}
              onFocus={() => { if(item2) setShowSuggestions2(true); }}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: '30px', border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1.1rem', outline: 'none' }}
            />
            {showSuggestions2 && item2 && (
              <SuggestionList items={filteredProducts2} onSelect={(name) => { setItem2(name); setShowSuggestions2(false); }} />
            )}
          </div>

          <button type="submit" className="btn hover-lift" style={{
            padding: '15px 30px',
            borderRadius: '30px',
            background: 'var(--text-primary)',
            color: 'var(--bg-primary)',
            border: 'none',
            fontSize: '1.1rem',
            fontWeight: 'bold',
            display: 'flex',
            alignItems: 'center',
            gap: '10px'
          }}>
            <Zap size={20} /> So Sánh
          </button>
        </form>
      </div>
    </div>
  );
};

export default VersusHero;
