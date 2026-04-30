import React from 'react';
import { Smartphone, Laptop, BarChart2, Cpu, Newspaper, ShoppingBag } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'phones',  label: 'Điện thoại', icon: Smartphone },
  { id: 'laptops', label: 'Laptop',     icon: Laptop },
  { id: 'compare', label: 'So Sánh',   icon: BarChart2 },
  { id: 'news',    label: 'Tin Tức',   icon: Newspaper },
  { id: 'ai',      label: 'AI Tư Vấn', icon: Cpu },
];

const Header = ({ activeTab, setActiveTab }) => {
  return (
    <header className="header">
      <div className="header-content">
        {/* Logo */}
        <div
          className="logo"
          onClick={() => setActiveTab('phones')}
          style={{ cursor: 'pointer', gap: '6px' }}
        >
          <span style={{
            display: 'inline-flex', alignItems: 'center', justifyContent: 'center',
            width: '32px', height: '32px', borderRadius: '8px',
            background: 'linear-gradient(135deg, #3858f6, #8224e3)',
            fontSize: '1.1rem'
          }}>B</span>
          <span style={{ color: 'white', fontWeight: 900, fontSize: '1.4rem', letterSpacing: '-0.5px' }}>Better</span>
        </div>

        {/* Nav */}
        <nav style={{ display: 'flex', gap: '2px', alignItems: 'center', overflowX: 'auto' }}>
          {NAV_ITEMS.map(item => {
            const Icon = item.icon;
            const isActive = activeTab === item.id;
            return (
              <button
                key={item.id}
                onClick={() => setActiveTab(item.id)}
                className={`nav-btn ${isActive ? 'active' : ''}`}
              >
                <Icon size={15} />
                {item.label}
              </button>
            );
          })}
        </nav>
      </div>
    </header>
  );
};

export default Header;
