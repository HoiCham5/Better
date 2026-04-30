import React, { useState, useRef, useEffect } from 'react';
import { Search, Zap, Smartphone, Laptop } from 'lucide-react';

const POPULAR_SEARCHES = [
  'iPhone 16 Pro', 'Samsung Galaxy S24', 'MacBook Air M3',
  'Pixel 9 Pro', 'Galaxy Z Fold 6', 'Dell XPS 15',
];

const VersusHero = ({ products = [], onCompare }) => {
  const [item1, setItem1] = useState('');
  const [item2, setItem2] = useState('');
  const [showSuggestions1, setShowSuggestions1] = useState(false);
  const [showSuggestions2, setShowSuggestions2] = useState(false);
  const wrapperRef1 = useRef(null);
  const wrapperRef2 = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (wrapperRef1.current && !wrapperRef1.current.contains(event.target)) setShowSuggestions1(false);
      if (wrapperRef2.current && !wrapperRef2.current.contains(event.target)) setShowSuggestions2(false);
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleCompare = (e) => {
    e.preventDefault();
    if (!item1 || !item2) { alert('Vui lòng chọn đủ 2 sản phẩm để so sánh!'); return; }
    const p1 = products.find(p => p.name.toLowerCase() === item1.toLowerCase() || p.name.toLowerCase().includes(item1.toLowerCase()));
    const p2 = products.find(p => p.name.toLowerCase() === item2.toLowerCase() || p.name.toLowerCase().includes(item2.toLowerCase()));
    if (p1 && p2 && onCompare) { onCompare(p1.id, p2.id); }
    else { alert('Vui lòng chọn tên sản phẩm chính xác từ danh sách gợi ý!'); }
  };

  const getFiltered = (query) =>
    query ? products.filter(p =>
      p.name.toLowerCase().includes(query.toLowerCase()) ||
      p.brand.toLowerCase().includes(query.toLowerCase())
    ).slice(0, 6) : [];

  const SuggestionDropdown = ({ items, onSelect, visible }) => {
    if (!visible || !items.length) return null;
    return (
      <div style={{
        position: 'absolute', top: 'calc(100% + 6px)', left: 0, right: 0,
        background: 'white', borderRadius: '12px', zIndex: 999, overflow: 'hidden',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18)', border: '1px solid #e5e7eb',
        animation: 'slideDown 0.2s ease'
      }}>
        {items.map((p, i) => (
          <div
            key={p.id}
            onClick={() => onSelect(p.name)}
            style={{
              padding: '10px 14px', display: 'flex', alignItems: 'center', gap: '10px',
              cursor: 'pointer', borderBottom: i < items.length - 1 ? '1px solid #f3f4f6' : 'none',
              transition: 'background 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <img src={p.image} alt={p.name} style={{ width: '36px', height: '36px', objectFit: 'cover', borderRadius: '6px', background: '#f3f4f6' }} />
            <div>
              <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1a1a1a' }}>{p.name}</div>
              <div style={{ fontSize: '0.75rem', color: '#6b7280' }}>{p.brand} · {p.price}</div>
            </div>
            <span style={{ marginLeft: 'auto', fontSize: '0.7rem', color: '#aaa', textTransform: 'capitalize' }}>
              {p.category === 'phone' ? '📱' : '💻'}
            </span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="versus-hero" style={{ borderRadius: 0, marginBottom: '32px' }}>
      {/* Hero Title */}
      <h1 style={{
        fontSize: 'clamp(2rem, 5vw, 3.5rem)', fontWeight: 900, color: 'white',
        marginBottom: '16px', letterSpacing: '-1px', lineHeight: 1.15
      }}>
        Chúng tôi <span style={{ color: '#a78bfa' }}>so sánh.</span><br />Bạn quyết định.
      </h1>
      <p style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.65)', marginBottom: '36px', maxWidth: '500px', margin: '0 auto 36px' }}>
        Khám phá sự khác biệt thực sự giữa điện thoại và laptop với phân tích chuyên sâu và điểm số trực quan.
      </p>

      {/* Category Chips */}
      <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '28px', flexWrap: 'wrap' }}>
        {[{ label: '📱 Điện thoại', cat: 'phone' }, { label: '💻 Laptop', cat: 'laptop' }].map(c => (
          <span key={c.cat} style={{
            background: 'rgba(255,255,255,0.12)', color: 'white', padding: '6px 16px',
            borderRadius: '20px', fontSize: '0.85rem', fontWeight: 600,
            border: '1px solid rgba(255,255,255,0.2)', cursor: 'default'
          }}>{c.label}</span>
        ))}
      </div>

      {/* Search Bar */}
      <form onSubmit={handleCompare} style={{ maxWidth: '700px', margin: '0 auto', position: 'relative' }}>
        <div className="vs-search-bar">
          {/* Input 1 */}
          <div ref={wrapperRef1} style={{ flex: 1, position: 'relative', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={16} style={{ color: '#aaa', flexShrink: 0 }} />
              <input
                type="text"
                className="vs-search-input"
                placeholder="Điện thoại, Laptop..."
                value={item1}
                onChange={e => { setItem1(e.target.value); setShowSuggestions1(true); }}
                onFocus={() => { if (item1) setShowSuggestions1(true); }}
              />
            </div>
            <SuggestionDropdown
              items={getFiltered(item1)}
              visible={showSuggestions1 && !!item1}
              onSelect={name => { setItem1(name); setShowSuggestions1(false); }}
            />
          </div>

          {/* VS Divider */}
          <div className="vs-badge" style={{ flexShrink: 0 }}>VS</div>

          {/* Input 2 */}
          <div ref={wrapperRef2} style={{ flex: 1, position: 'relative', minWidth: 0 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Search size={16} style={{ color: '#aaa', flexShrink: 0 }} />
              <input
                type="text"
                className="vs-search-input"
                placeholder="Sản phẩm để so sánh..."
                value={item2}
                onChange={e => { setItem2(e.target.value); setShowSuggestions2(true); }}
                onFocus={() => { if (item2) setShowSuggestions2(true); }}
              />
            </div>
            <SuggestionDropdown
              items={getFiltered(item2)}
              visible={showSuggestions2 && !!item2}
              onSelect={name => { setItem2(name); setShowSuggestions2(false); }}
            />
          </div>

          {/* Compare Button */}
          <button type="submit" className="btn btn-primary" style={{ borderRadius: '40px', padding: '12px 24px', flexShrink: 0, fontSize: '0.95rem' }}>
            <Zap size={16} /> So Sánh
          </button>
        </div>
      </form>

      {/* Popular Searches */}
      <div style={{ marginTop: '20px', display: 'flex', gap: '8px', justifyContent: 'center', flexWrap: 'wrap' }}>
        <span style={{ fontSize: '0.8rem', color: 'rgba(255,255,255,0.5)', alignSelf: 'center' }}>Phổ biến:</span>
        {POPULAR_SEARCHES.map(s => (
          <span
            key={s}
            onClick={() => !item1 ? setItem1(s) : setItem2(s)}
            style={{
              background: 'rgba(255,255,255,0.1)', color: 'rgba(255,255,255,0.8)',
              padding: '4px 12px', borderRadius: '20px', fontSize: '0.78rem',
              cursor: 'pointer', border: '1px solid rgba(255,255,255,0.15)',
              transition: 'all 0.2s ease'
            }}
            onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; e.currentTarget.style.color = 'white'; }}
            onMouseLeave={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.1)'; e.currentTarget.style.color = 'rgba(255,255,255,0.8)'; }}
          >{s}</span>
        ))}
      </div>
    </div>
  );
};

export default VersusHero;
