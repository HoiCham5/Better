import React from 'react';
import { Smartphone, Laptop, BarChart2, Cpu, Newspaper, ShoppingBag } from 'lucide-react';

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="header glass-panel animate-fade-in" style={{ borderRadius: 0, borderTop: 0, borderLeft: 0, borderRight: 0 }}>
      <div className="container header-content" style={{ flexDirection: 'column', gap: '20px', position: 'relative' }}>
        <div className="logo cursor-pointer" onClick={() => setActiveTab('news')} style={{ cursor: 'pointer' }}>
          <Smartphone className="text-accent-primary" size={32} />
          <Laptop className="text-accent-secondary" size={32} />
          <span style={{ fontSize: '1.8rem' }}>Better</span>
        </div>
        <nav style={{ display: 'flex', gap: '10px', background: 'var(--bg-secondary)', padding: '5px', borderRadius: '30px', border: '1px solid var(--glass-border)' }}>
          <button 
            onClick={() => setActiveTab('phones')}
            className={`btn ${activeTab === 'phones' ? 'bg-accent-primary' : ''}`}
            style={{ 
              background: activeTab === 'phones' ? 'var(--gradient-accent)' : 'transparent', 
              color: activeTab === 'phones' ? 'white' : 'var(--text-secondary)',
              border: 'none', borderRadius: '25px', padding: '10px 20px', display: 'flex', gap: '8px'
            }}
          >
            <Smartphone size={18} /> Điện thoại
          </button>
          
          <button 
            onClick={() => setActiveTab('laptops')}
            style={{ 
              background: activeTab === 'laptops' ? 'var(--gradient-accent)' : 'transparent', 
              color: activeTab === 'laptops' ? 'white' : 'var(--text-secondary)',
              border: 'none', borderRadius: '25px', padding: '10px 20px', display: 'flex', gap: '8px', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            <Laptop size={18} /> Laptop
          </button>
          
          <button 
            onClick={() => setActiveTab('compare')}
            style={{ 
              background: activeTab === 'compare' ? 'var(--gradient-accent)' : 'transparent', 
              color: activeTab === 'compare' ? 'white' : 'var(--text-secondary)',
              border: 'none', borderRadius: '25px', padding: '10px 20px', display: 'flex', gap: '8px', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            <BarChart2 size={18} /> So Sánh
          </button>

          <button 
            onClick={() => setActiveTab('news')}
            style={{ 
              background: activeTab === 'news' ? 'var(--gradient-accent)' : 'transparent', 
              color: activeTab === 'news' ? 'white' : 'var(--text-secondary)',
              border: 'none', borderRadius: '25px', padding: '10px 20px', display: 'flex', gap: '8px', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            <Newspaper size={18} /> Tin Tức
          </button>

          <button 
            onClick={() => setActiveTab('ai')}
            style={{ 
              background: activeTab === 'ai' ? 'var(--gradient-accent)' : 'transparent', 
              color: activeTab === 'ai' ? 'white' : 'var(--text-secondary)',
              border: 'none', borderRadius: '25px', padding: '10px 20px', display: 'flex', gap: '8px', cursor: 'pointer', fontWeight: 'bold'
            }}
          >
            <Cpu size={18} /> AI Tư Vấn
          </button>
        </nav>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .header-content { flex-direction: row !important; }
        }
      `}</style>
    </header>
  );
};

export default Header;
