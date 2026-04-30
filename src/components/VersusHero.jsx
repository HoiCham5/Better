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
    const p1 = products.find(p => p.name.toLowerCase().includes(item1.toLowerCase()));
    const p2 = products.find(p => p.name.toLowerCase().includes(item2.toLowerCase()));
    if (p1 && p2 && onCompare) { onCompare(p1.id, p2.id); }
    else { alert('Vui lòng chọn tên sản phẩm từ danh sách gợi ý!'); }
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
        position: 'absolute', top: 'calc(100% + 8px)', left: 0, right: 0,
        background: 'white', borderRadius: '16px', zIndex: 9999, overflow: 'hidden',
        boxShadow: '0 20px 60px rgba(0,0,0,0.25)', border: '1px solid rgba(255,255,255,0.5)',
        animation: 'dropIn 0.2s cubic-bezier(0.16,1,0.3,1)'
      }}>
        {items.map((p, i) => (
          <div key={p.id} onClick={() => onSelect(p.name)}
            style={{
              padding: '12px 16px', display: 'flex', alignItems: 'center', gap: '12px',
              cursor: 'pointer', borderBottom: i < items.length - 1 ? '1px solid #f3f4f6' : 'none',
              transition: 'background 0.15s'
            }}
            onMouseEnter={e => e.currentTarget.style.background = '#f0f4ff'}
            onMouseLeave={e => e.currentTarget.style.background = 'transparent'}
          >
            <img src={p.image} alt={p.name} style={{ width: '40px', height: '40px', objectFit: 'cover', borderRadius: '8px', background: '#f3f4f6' }} />
            <div style={{ flex: 1 }}>
              <div style={{ fontSize: '0.92rem', fontWeight: 700, color: '#1a1a1a' }}>{p.name}</div>
              <div style={{ fontSize: '0.78rem', color: '#6b7280' }}>{p.brand} · {p.price}</div>
            </div>
            <span style={{ fontSize: '1rem' }}>{p.category === 'phone' ? '📱' : '💻'}</span>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="versus-hero-wrapper">
      {/* Animated floating orbs */}
      <div className="hero-orb hero-orb-1" />
      <div className="hero-orb hero-orb-2" />
      <div className="hero-orb hero-orb-3" />

      {/* Particle dots */}
      {[...Array(20)].map((_, i) => (
        <div key={i} className="hero-particle" style={{
          left: `${(i * 17 + 5) % 95}%`,
          top: `${(i * 23 + 10) % 85}%`,
          animationDelay: `${(i * 0.4) % 4}s`,
          animationDuration: `${3 + (i % 3)}s`,
          width: i % 3 === 0 ? '6px' : '4px',
          height: i % 3 === 0 ? '6px' : '4px',
          opacity: 0.15 + (i % 4) * 0.07,
        }} />
      ))}

      <div className="hero-content-wrapper">
        {/* Badge */}
        <div className="hero-badge">
          <span style={{ color: '#a78bfa' }}>✦</span> Công cụ so sánh điện tử #1 Việt Nam
        </div>

        {/* Title */}
        <h1 className="hero-title">
          Chúng tôi{' '}
          <span className="hero-title-gradient">so sánh.</span>
          <br />
          Bạn quyết định.
        </h1>

        <p className="hero-subtitle">
          Khám phá sự khác biệt thực sự giữa điện thoại và laptop với
          phân tích chuyên sâu, điểm số trực quan và nhận xét từ AI.
        </p>

        {/* Category chips */}
        <div style={{ display: 'flex', gap: '10px', justifyContent: 'center', marginBottom: '32px', flexWrap: 'wrap' }}>
          {[
            { label: '📱 Điện thoại', count: products.filter(p=>p.category==='phone').length },
            { label: '💻 Laptop',      count: products.filter(p=>p.category==='laptop').length },
          ].map(c => (
            <span key={c.label} className="hero-chip">
              {c.label}
              {c.count > 0 && <span className="hero-chip-count">{c.count}</span>}
            </span>
          ))}
        </div>

        {/* Search bar */}
        <form onSubmit={handleCompare} className="hero-search-form">
          <div className="hero-search-bar">
            {/* Input 1 */}
            <div ref={wrapperRef1} className="hero-input-wrap">
              <Search size={16} className="hero-search-icon" />
              <input
                type="text"
                className="hero-input"
                placeholder="Điện thoại, Laptop..."
                value={item1}
                onChange={e => { setItem1(e.target.value); setShowSuggestions1(true); }}
                onFocus={() => { if (item1) setShowSuggestions1(true); }}
              />
              <SuggestionDropdown items={getFiltered(item1)} visible={showSuggestions1 && !!item1}
                onSelect={name => { setItem1(name); setShowSuggestions1(false); }} />
            </div>

            {/* VS Badge */}
            <div className="hero-vs-badge">VS</div>

            {/* Input 2 */}
            <div ref={wrapperRef2} className="hero-input-wrap">
              <Search size={16} className="hero-search-icon" />
              <input
                type="text"
                className="hero-input"
                placeholder="Sản phẩm để so sánh..."
                value={item2}
                onChange={e => { setItem2(e.target.value); setShowSuggestions2(true); }}
                onFocus={() => { if (item2) setShowSuggestions2(true); }}
              />
              <SuggestionDropdown items={getFiltered(item2)} visible={showSuggestions2 && !!item2}
                onSelect={name => { setItem2(name); setShowSuggestions2(false); }} />
            </div>

            {/* Compare Button */}
            <button type="submit" className="hero-compare-btn">
              <Zap size={16} /> So Sánh
            </button>
          </div>
        </form>

        {/* Popular tags */}
        <div className="hero-popular">
          <span className="hero-popular-label">Phổ biến:</span>
          {POPULAR_SEARCHES.map(s => (
            <button key={s} type="button" className="hero-popular-tag"
              onClick={() => !item1 ? setItem1(s) : setItem2(s)}>
              {s}
            </button>
          ))}
        </div>
      </div>

      {/* Wave SVG at bottom */}
      <div className="hero-wave-wrapper">
        <svg viewBox="0 0 1440 80" preserveAspectRatio="none" xmlns="http://www.w3.org/2000/svg">
          <path className="hero-wave-path-back" d="M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z" />
          <path className="hero-wave-path-front" d="M0,55 C200,20 400,70 600,45 C800,20 1000,65 1200,45 C1300,35 1380,55 1440,50 L1440,80 L0,80 Z" />
        </svg>
      </div>

      <style>{`
        .versus-hero-wrapper {
          background: linear-gradient(135deg, #0f0c29 0%, #302b63 45%, #24243e 100%);
          position: relative;
          overflow: hidden;
          padding: 0 20px;
          text-align: center;
          min-height: calc(100vh - 62px);
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
        }

        /* Floating orbs */
        .hero-orb {
          position: absolute;
          border-radius: 50%;
          filter: blur(80px);
          pointer-events: none;
        }
        .hero-orb-1 {
          width: 500px; height: 500px;
          background: radial-gradient(circle, rgba(130,36,227,0.5), transparent 70%);
          top: -150px; left: -100px;
          animation: orbFloat 8s ease-in-out infinite;
        }
        .hero-orb-2 {
          width: 400px; height: 400px;
          background: radial-gradient(circle, rgba(56,88,246,0.45), transparent 70%);
          bottom: -100px; right: -80px;
          animation: orbFloat 10s ease-in-out infinite reverse;
        }
        .hero-orb-3 {
          width: 300px; height: 300px;
          background: radial-gradient(circle, rgba(255,46,81,0.25), transparent 70%);
          top: 50%; left: 50%; transform: translate(-50%, -50%);
          animation: orbPulse 6s ease-in-out infinite;
        }

        /* Particles */
        .hero-particle {
          position: absolute;
          border-radius: 50%;
          background: white;
          pointer-events: none;
          animation: particleFloat 3s ease-in-out infinite alternate;
        }

        /* Content */
        .hero-content-wrapper {
          position: relative;
          z-index: 10;
          max-width: 800px;
          margin: 0 auto;
          width: 100%;
          padding: 60px 0 100px;
        }

        .hero-badge {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.08);
          backdrop-filter: blur(12px);
          border: 1px solid rgba(255,255,255,0.15);
          border-radius: 30px;
          padding: 8px 20px;
          font-size: 0.82rem;
          font-weight: 600;
          color: rgba(255,255,255,0.85);
          margin-bottom: 24px;
          letter-spacing: 0.3px;
        }

        .hero-title {
          font-size: clamp(2.4rem, 6vw, 4rem);
          font-weight: 900;
          color: white;
          line-height: 1.15;
          letter-spacing: -1.5px;
          margin-bottom: 20px;
        }

        .hero-title-gradient {
          background: linear-gradient(135deg, #a78bfa, #60a5fa, #f472b6);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          animation: gradientShift 4s ease infinite;
          background-size: 200% 200%;
        }

        .hero-subtitle {
          font-size: 1.05rem;
          color: rgba(255,255,255,0.6);
          line-height: 1.7;
          max-width: 520px;
          margin: 0 auto 32px;
        }

        /* Chips */
        .hero-chip {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.1);
          backdrop-filter: blur(8px);
          border: 1px solid rgba(255,255,255,0.2);
          border-radius: 25px;
          padding: 8px 18px;
          color: rgba(255,255,255,0.9);
          font-size: 0.85rem;
          font-weight: 600;
          transition: all 0.25s ease;
        }
        .hero-chip:hover {
          background: rgba(255,255,255,0.18);
          transform: translateY(-2px);
        }
        .hero-chip-count {
          background: rgba(255,255,255,0.25);
          border-radius: 10px;
          padding: 1px 8px;
          font-size: 0.75rem;
          font-weight: 700;
        }

        /* Search */
        .hero-search-form { max-width: 740px; margin: 0 auto; }

        .hero-search-bar {
          display: flex;
          align-items: center;
          gap: 8px;
          background: rgba(255,255,255,0.95);
          backdrop-filter: blur(20px);
          border-radius: 60px;
          padding: 8px 8px 8px 20px;
          box-shadow: 0 20px 60px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.1);
          transition: box-shadow 0.3s ease;
        }
        .hero-search-bar:focus-within {
          box-shadow: 0 25px 70px rgba(0,0,0,0.5), 0 0 0 2px rgba(130,36,227,0.5);
        }

        .hero-input-wrap {
          flex: 1;
          position: relative;
          min-width: 0;
          display: flex;
          align-items: center;
          gap: 8px;
        }
        .hero-search-icon { color: #aaa; flex-shrink: 0; }
        .hero-input {
          flex: 1;
          border: none;
          outline: none;
          font-size: 0.97rem;
          font-family: 'Inter', sans-serif;
          color: #1a1a1a;
          background: transparent;
          min-width: 0;
          font-weight: 500;
        }
        .hero-input::placeholder { color: #bbb; font-weight: 400; }

        .hero-vs-badge {
          background: linear-gradient(135deg, #3858f6, #8224e3);
          color: white;
          font-weight: 900;
          font-size: 0.85rem;
          letter-spacing: 0.5px;
          border-radius: 50%;
          width: 40px;
          height: 40px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
          box-shadow: 0 4px 15px rgba(56,88,246,0.5);
          animation: vsPulse 2.5s ease-in-out infinite;
        }

        .hero-compare-btn {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 12px 26px;
          border-radius: 50px;
          background: linear-gradient(135deg, #3858f6, #8224e3);
          color: white;
          font-weight: 700;
          font-size: 0.95rem;
          border: none;
          cursor: pointer;
          flex-shrink: 0;
          transition: all 0.25s ease;
          box-shadow: 0 4px 20px rgba(56,88,246,0.4);
          font-family: 'Inter', sans-serif;
        }
        .hero-compare-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 30px rgba(56,88,246,0.6);
        }
        .hero-compare-btn:active { transform: translateY(0); }

        /* Popular */
        .hero-popular {
          display: flex;
          align-items: center;
          gap: 8px;
          justify-content: center;
          flex-wrap: wrap;
          margin-top: 20px;
        }
        .hero-popular-label {
          font-size: 0.78rem;
          color: rgba(255,255,255,0.4);
          font-weight: 500;
        }
        .hero-popular-tag {
          background: rgba(255,255,255,0.08);
          border: 1px solid rgba(255,255,255,0.15);
          color: rgba(255,255,255,0.75);
          padding: 5px 14px;
          border-radius: 20px;
          font-size: 0.78rem;
          cursor: pointer;
          font-family: 'Inter', sans-serif;
          font-weight: 500;
          transition: all 0.2s ease;
        }
        .hero-popular-tag:hover {
          background: rgba(255,255,255,0.18);
          color: white;
          transform: translateY(-1px);
          border-color: rgba(167,139,250,0.5);
        }

        /* Wave */
        .hero-wave-wrapper {
          position: absolute;
          bottom: -1px;
          left: 0; right: 0;
          height: 80px;
          z-index: 5;
        }
        .hero-wave-wrapper svg {
          width: 100%; height: 100%;
        }
        .hero-wave-path-back {
          fill: rgba(242,245,247,0.4);
          animation: waveAnim 6s ease-in-out infinite;
        }
        .hero-wave-path-front {
          fill: #f2f5f7;
          animation: waveAnim 4s ease-in-out infinite reverse;
        }

        /* Keyframes */
        @keyframes orbFloat {
          0%, 100% { transform: translate(0, 0) scale(1); }
          33%       { transform: translate(30px, -20px) scale(1.05); }
          66%       { transform: translate(-20px, 15px) scale(0.97); }
        }
        @keyframes orbPulse {
          0%, 100% { transform: translate(-50%,-50%) scale(0.9); opacity: 0.6; }
          50%       { transform: translate(-50%,-50%) scale(1.1); opacity: 1; }
        }
        @keyframes particleFloat {
          from { transform: translateY(0); }
          to   { transform: translateY(-12px); }
        }
        @keyframes gradientShift {
          0%   { background-position: 0% 50%; }
          50%  { background-position: 100% 50%; }
          100% { background-position: 0% 50%; }
        }
        @keyframes vsPulse {
          0%, 100% { box-shadow: 0 4px 15px rgba(56,88,246,0.5); }
          50%       { box-shadow: 0 4px 30px rgba(130,36,227,0.8); }
        }
        @keyframes waveAnim {
          0%        { d: path("M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"); }
          50%       { d: path("M0,30 C240,60 480,10 720,50 C960,80 1200,20 1440,30 L1440,80 L0,80 Z"); }
          100%      { d: path("M0,40 C240,80 480,0 720,40 C960,80 1200,0 1440,40 L1440,80 L0,80 Z"); }
        }
        @keyframes dropIn {
          from { opacity: 0; transform: translateY(-8px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        @media (max-width: 640px) {
          .hero-search-bar { flex-wrap: wrap; border-radius: 20px; padding: 12px; gap: 12px; }
          .hero-compare-btn { width: 100%; justify-content: center; border-radius: 12px; }
          .hero-vs-badge { display: none; }
        }
      `}</style>
    </div>
  );
};

export default VersusHero;
