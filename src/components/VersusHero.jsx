import React, { useState } from 'react';
import { Search, Zap } from 'lucide-react';

const VersusHero = () => {
  const [item1, setItem1] = useState('');
  const [item2, setItem2] = useState('');

  const handleCompare = (e) => {
    e.preventDefault();
    if(item1 && item2) {
      alert(`Tính năng đang phát triển: So sánh ${item1} vs ${item2}`);
    } else {
      alert('Vui lòng nhập đủ 2 sản phẩm để so sánh!');
    }
  };

  return (
    <div className="versus-hero animate-fade-in" style={{
      textAlign: 'center',
      padding: '60px 20px',
      background: 'var(--bg-secondary)',
      borderRadius: '20px',
      marginBottom: '40px',
      position: 'relative',
      overflow: 'hidden'
    }}>
      <div style={{ position: 'absolute', top: '-50%', left: '-10%', width: '300px', height: '300px', background: 'var(--accent-primary)', filter: 'blur(150px)', opacity: 0.2, zIndex: 0 }}></div>
      <div style={{ position: 'absolute', bottom: '-50%', right: '-10%', width: '300px', height: '300px', background: 'var(--accent-secondary)', filter: 'blur(150px)', opacity: 0.2, zIndex: 0 }}></div>
      
      <div style={{ position: 'relative', zIndex: 1 }}>
        <h1 style={{ fontSize: '3.5rem', fontWeight: 900, marginBottom: '15px', letterSpacing: '-1px' }}>
          Chúng tôi <span style={{ color: 'var(--accent-primary)' }}>so sánh.</span> Bạn quyết định.
        </h1>
        <p style={{ fontSize: '1.2rem', color: 'var(--text-secondary)', marginBottom: '40px', maxWidth: '600px', margin: '0 auto 40px auto' }}>
          Khám phá sự khác biệt thực sự giữa các thiết bị với hệ thống điểm số và phân tích chuyên sâu chuẩn Versus.
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
          <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Điện thoại, Laptop..." 
              value={item1}
              onChange={(e) => setItem1(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: '30px', border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1.1rem', outline: 'none' }}
            />
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

          <div style={{ flex: 1, position: 'relative', minWidth: '200px' }}>
            <Search size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-secondary)' }} />
            <input 
              type="text" 
              placeholder="Sản phẩm để so sánh..." 
              value={item2}
              onChange={(e) => setItem2(e.target.value)}
              style={{ width: '100%', padding: '15px 15px 15px 45px', borderRadius: '30px', border: 'none', background: 'var(--bg-secondary)', color: 'var(--text-primary)', fontSize: '1.1rem', outline: 'none' }}
            />
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
