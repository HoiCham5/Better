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
        <nav style={{ display: 'flex', gap: '10px', background: 'var(--bg-secondary)', padding: '5px', borderRadius: '30px', border: '1px solid var(--glass-border)', overflowX: 'auto' }}>
          <button 
            onClick={() => setActiveTab('phones')}
            className={`nav-btn ${activeTab === 'phones' ? 'active' : ''}`}
          >
            <Smartphone size={18} /> Điện thoại
          </button>
          
          <button 
            onClick={() => setActiveTab('laptops')}
            className={`nav-btn ${activeTab === 'laptops' ? 'active' : ''}`}
          >
            <Laptop size={18} /> Laptop
          </button>
          
          <button 
            onClick={() => setActiveTab('compare')}
            className={`nav-btn ${activeTab === 'compare' ? 'active' : ''}`}
          >
            <BarChart2 size={18} /> So Sánh
          </button>

          <button 
            onClick={() => setActiveTab('news')}
            className={`nav-btn ${activeTab === 'news' ? 'active' : ''}`}
          >
            <Newspaper size={18} /> Tin Tức
          </button>

          <button 
            onClick={() => setActiveTab('ai')}
            className={`nav-btn ${activeTab === 'ai' ? 'active' : ''}`}
          >
            <Cpu size={18} /> AI Tư Vấn
          </button>
        </nav>
      </div>
      <style>{`
        @media (min-width: 768px) {
          .header-content { flex-direction: row !important; }
        }
        
        .nav-btn {
          background: transparent;
          color: var(--text-secondary);
          border: none;
          border-radius: 25px;
          padding: 10px 20px;
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          font-weight: 600;
          font-size: 0.95rem;
          transition: all 0.3s ease;
          white-space: nowrap;
        }

        .nav-btn.active {
          background: var(--gradient-accent);
          color: white;
          box-shadow: 0 4px 15px rgba(59, 130, 246, 0.4);
        }

        .nav-btn:not(.active):hover {
          background: rgba(255, 255, 255, 0.05);
          color: var(--accent-primary);
          transform: translateY(-2px);
        }
      `}</style>
    </header>
  );
};

export default Header;
