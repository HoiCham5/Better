import React, { useState, useEffect } from 'react';
import { Smartphone, Laptop, BarChart2, Cpu, Newspaper, Zap, Sun, Moon } from 'lucide-react';

const NAV_ITEMS = [
  { id: 'phones',  label: 'Điện thoại', icon: Smartphone },
  { id: 'laptops', label: 'Laptop',     icon: Laptop },
  { id: 'compare', label: 'So Sánh',   icon: BarChart2 },
  { id: 'news',    label: 'Tin Tức',   icon: Newspaper },
  { id: 'ai',      label: 'AI Tư Vấn', icon: Cpu },
];

const Header = ({ activeTab, setActiveTab, darkMode, toggleDark }) => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header className={`vs-header ${scrolled ? 'vs-header--scrolled' : ''}`}>
        <div className="vs-header-inner">
          {/* Logo */}
          <div className="vs-logo" onClick={() => setActiveTab('phones')}>
            <div className="vs-logo-icon">
              <Zap size={16} color="white" />
            </div>
            <span className="vs-logo-text">Better</span>
            <span className="vs-logo-tag">BETA</span>
          </div>

          {/* Nav */}
          <nav className="vs-nav">
            {NAV_ITEMS.map(item => {
              const Icon = item.icon;
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => setActiveTab(item.id)}
                  className={`vs-nav-btn ${isActive ? 'vs-nav-btn--active' : ''}`}
                >
                  <Icon size={14} />
                  <span>{item.label}</span>
                  {isActive && <span className="vs-nav-indicator" />}
                </button>
              );
            })}
          </nav>

          {/* Right: Dark Mode Toggle */}
          <div className="vs-header-right">
            <button
              className="vs-theme-toggle"
              onClick={toggleDark}
              title={darkMode ? 'Chuyển sang sáng' : 'Chuyển sang tối'}
              aria-label="Toggle theme"
            >
              <div className={`vs-toggle-track ${darkMode ? 'vs-toggle-track--dark' : ''}`}>
                <span className="vs-toggle-icon vs-toggle-icon--sun"><Sun size={11} /></span>
                <span className="vs-toggle-icon vs-toggle-icon--moon"><Moon size={11} /></span>
                <div className={`vs-toggle-thumb ${darkMode ? 'vs-toggle-thumb--dark' : ''}`} />
              </div>
            </button>
          </div>
        </div>
      </header>

      <style>{`
        .vs-header {
          position: sticky;
          top: 0;
          z-index: 200;
          background: rgba(15, 12, 41, 0.85);
          backdrop-filter: blur(20px) saturate(1.8);
          -webkit-backdrop-filter: blur(20px) saturate(1.8);
          border-bottom: 1px solid rgba(255,255,255,0.06);
          transition: all 0.3s ease;
        }
        .vs-header--scrolled {
          background: rgba(10, 8, 30, 0.96);
          border-bottom-color: rgba(130, 36, 227, 0.25);
          box-shadow: 0 4px 30px rgba(0,0,0,0.4), 0 1px 0 rgba(130,36,227,0.2);
        }

        .vs-header-inner {
          max-width: 1200px;
          margin: 0 auto;
          padding: 0 24px;
          height: 62px;
          display: flex;
          align-items: center;
          gap: 24px;
        }

        /* Logo */
        .vs-logo {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          flex-shrink: 0;
          transition: opacity 0.2s;
        }
        .vs-logo:hover { opacity: 0.85; }

        .vs-logo-icon {
          width: 30px;
          height: 30px;
          border-radius: 8px;
          background: linear-gradient(135deg, #3858f6, #8224e3);
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 2px 10px rgba(130,36,227,0.5);
        }

        .vs-logo-text {
          font-size: 1.2rem;
          font-weight: 900;
          color: white;
          letter-spacing: -0.5px;
        }

        .vs-logo-tag {
          font-size: 0.55rem;
          font-weight: 800;
          letter-spacing: 1px;
          background: linear-gradient(135deg, #a78bfa, #60a5fa);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          margin-top: 2px;
          align-self: flex-start;
        }

        /* Nav */
        .vs-nav {
          display: flex;
          align-items: center;
          gap: 2px;
          flex: 1;
          justify-content: center;
          overflow-x: auto;
          scrollbar-width: none;
        }
        .vs-nav::-webkit-scrollbar { display: none; }

        .vs-nav-btn {
          position: relative;
          display: flex;
          align-items: center;
          gap: 6px;
          padding: 8px 16px;
          border-radius: 8px;
          background: transparent;
          color: rgba(255,255,255,0.5);
          border: none;
          cursor: pointer;
          font-size: 0.875rem;
          font-weight: 600;
          font-family: 'Plus Jakarta Sans', 'Inter', sans-serif;
          white-space: nowrap;
          transition: all 0.2s ease;
          letter-spacing: 0.1px;
        }

        .vs-nav-btn:hover {
          color: rgba(255,255,255,0.9);
          background: rgba(255,255,255,0.07);
        }

        .vs-nav-btn--active {
          color: white !important;
          background: rgba(130,36,227,0.15) !important;
        }

        .vs-nav-indicator {
          position: absolute;
          bottom: -1px;
          left: 50%;
          transform: translateX(-50%);
          width: 60%;
          height: 2px;
          background: linear-gradient(90deg, #3858f6, #8224e3);
          border-radius: 2px 2px 0 0;
          box-shadow: 0 0 8px rgba(130,36,227,0.6);
        }

        /* Right */
        .vs-header-right {
          display: flex;
          align-items: center;
          flex-shrink: 0;
        }
        .vs-header-divider {
          width: 2px;
          height: 22px;
          background: linear-gradient(to bottom, transparent, rgba(130,36,227,0.6), transparent);
          border-radius: 1px;
        }

        /* Theme Toggle Switch */
        .vs-theme-toggle {
          background: none;
          border: none;
          cursor: pointer;
          padding: 4px;
          display: flex;
          align-items: center;
        }

        .vs-toggle-track {
          position: relative;
          width: 52px;
          height: 27px;
          background: linear-gradient(135deg, #f59e0b, #fbbf24);
          border-radius: 30px;
          display: flex;
          align-items: center;
          padding: 0 5px;
          justify-content: space-between;
          transition: background 0.35s ease;
          box-shadow: 0 2px 8px rgba(245,158,11,0.4);
        }
        .vs-toggle-track--dark {
          background: linear-gradient(135deg, #3858f6, #8224e3);
          box-shadow: 0 2px 8px rgba(130,36,227,0.5);
        }

        .vs-toggle-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: white;
          z-index: 0;
        }
        .vs-toggle-icon--sun  { order: 1; }
        .vs-toggle-icon--moon { order: 2; }

        .vs-toggle-thumb {
          position: absolute;
          left: 3px;
          width: 21px;
          height: 21px;
          border-radius: 50%;
          background: white;
          box-shadow: 0 2px 6px rgba(0,0,0,0.25);
          transition: left 0.3s cubic-bezier(0.4, 0, 0.2, 1), transform 0.3s ease;
          z-index: 1;
        }
        .vs-toggle-thumb--dark {
          left: 28px;
          transform: rotate(360deg);
        }

        /* Responsive */
        @media (max-width: 600px) {
          .vs-header-inner { padding: 0 12px; gap: 8px; }
          .vs-logo-tag { display: none; }
          .vs-nav-btn span { display: none; }
          .vs-nav-btn { padding: 8px 10px; }
        }
      `}</style>
    </>
  );
};

export default Header;
