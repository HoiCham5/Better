import React, { useState, useEffect } from 'react';
import { Bot, Sparkles, Check, Info } from 'lucide-react';
import Tooltip from './Tooltip';

const CompareSection = ({ products, initialDeviceIds }) => {
  const [selectedDeviceIds, setSelectedDeviceIds] = useState(
    initialDeviceIds && initialDeviceIds.length === 2 ? initialDeviceIds : [
      products[0]?.id || '',
      products[1]?.id || ''
    ]
  );
  const [isThinking, setIsThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  useEffect(() => {
    if (initialDeviceIds && initialDeviceIds.length === 2) {
      setSelectedDeviceIds(initialDeviceIds);
    }
  }, [initialDeviceIds]);

  const hasPhones = products.some(p => p.category === 'phone');
  const hasLaptops = products.some(p => p.category === 'laptop');

  const MAX_DEVICES = 2; // Versus.com mainly compares 2 at a time side-by-side
  const currentDevices = selectedDeviceIds.map(id => products.find(p => p.id === id)).filter(Boolean);

  const handleDeviceChange = (index, newId) => {
    const newArr = [...selectedDeviceIds];
    newArr[index] = newId;
    setSelectedDeviceIds(newArr);
  };

  const handleAiConsult = () => {
    setIsThinking(true);
    setAiResponse('');
    setTimeout(() => {
      setIsThinking(false);
      setAiResponse(`### Nhận xét từ AI Better:\nDựa trên số liệu tổng hợp, ${currentDevices[0]?.name} vượt trội hơn về tính ổn định, trong khi ${currentDevices[1]?.name} có lợi thế về giá thành.`);
    }, 2000);
  };

  // Fake logic to generate points out of 100
  const getScore = (device) => {
    if (!device) return 0;
    return Math.floor(Math.abs(Math.sin((device?.name?.length || 10) * 1.5)) * 20 + 75); // 75-95
  };

  const colors = ['#8b5cf6', '#ef4444']; // Purple and Red for Product A and B
  
  // Specs definition
  const specCategories = [
    { label: 'Thiết Kế', keys: [{ k: 'weight', l: 'Trọng lượng' }, { k: 'materials', l: 'Chất liệu' }] },
    { label: 'Màn Hình', keys: [{ k: 'screen', l: 'Kích thước & Độ phân giải' }, { k: 'brightness', l: 'Độ sáng' }] },
    { label: 'Hiệu Năng', keys: [{ k: 'chip', l: 'Vi xử lý' }, { k: 'ram', l: 'RAM' }, { k: 'storage', l: 'Lưu trữ' }] },
    { label: 'Camera', keys: [{ k: 'camera', l: 'Camera chính' }, { k: 'cameraSelfie', l: 'Camera trước' }] },
    { label: 'Pin & Sạc', keys: [{ k: 'battery', l: 'Dung lượng pin' }] },
  ];

  if (currentDevices.length < 2) {
    return (
      <div style={{ textAlign: 'center', padding: '40px', color: 'var(--text-secondary)' }}>
        Vui lòng chọn đủ 2 sản phẩm để bắt đầu so sánh chuẩn Versus.
      </div>
    );
  }

  const devA = currentDevices[0];
  const devB = currentDevices[1];

  return (
    <section className="compare-view animate-fade-in" style={{ marginTop: '20px', maxWidth: '1200px', margin: '0 auto' }}>
      
      {/* 1. Header & Selectors (Versus Style) */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '20px', marginBottom: '40px', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '20px' }}>
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <select className="select-input" value={devA.id} onChange={(e) => handleDeviceChange(0, e.target.value)} style={{ borderLeft: `5px solid ${colors[0]}`, fontSize: '1.2rem', padding: '15px', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
            <optgroup label="📱 Điện thoại">{products.filter(p => p.category === 'phone').map(p => <option key={`a-${p.id}`} value={p.id}>{p.brand} {p.name}</option>)}</optgroup>
            <optgroup label="💻 Laptop">{products.filter(p => p.category === 'laptop').map(p => <option key={`al-${p.id}`} value={p.id}>{p.brand} {p.name}</option>)}</optgroup>
          </select>
          <img src={devA.image} alt={devA.name} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
          <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `conic-gradient(${colors[0]} ${getScore(devA)}%, var(--bg-primary) 0)`, border: '4px solid var(--bg-primary)' }}>
            <div style={{ position: 'absolute', width: '80px', height: '80px', background: 'var(--bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: colors[0] }}>{getScore(devA)}</span>
              <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Điểm</span>
            </div>
          </div>
        </div>

        <div className="vs-badge" style={{ width: '60px', height: '60px', borderRadius: '50%', background: '#1a73e8', color: 'white', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 900, fontSize: '1.5rem', flexShrink: 0, boxShadow: '0 5px 15px rgba(26, 115, 232, 0.4)', zIndex: 10 }}>VS</div>

        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px' }}>
          <select className="select-input" value={devB.id} onChange={(e) => handleDeviceChange(1, e.target.value)} style={{ borderLeft: `5px solid ${colors[1]}`, fontSize: '1.2rem', padding: '15px', fontWeight: 'bold', width: '100%', textAlign: 'center' }}>
            <optgroup label="📱 Điện thoại">{products.filter(p => p.category === 'phone').map(p => <option key={`b-${p.id}`} value={p.id}>{p.brand} {p.name}</option>)}</optgroup>
            <optgroup label="💻 Laptop">{products.filter(p => p.category === 'laptop').map(p => <option key={`bl-${p.id}`} value={p.id}>{p.brand} {p.name}</option>)}</optgroup>
          </select>
          <img src={devB.image} alt={devB.name} style={{ width: '120px', height: '120px', objectFit: 'contain' }} />
          <div style={{ position: 'relative', width: '100px', height: '100px', display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: '50%', background: `conic-gradient(${colors[1]} ${getScore(devB)}%, var(--bg-primary) 0)`, border: '4px solid var(--bg-primary)' }}>
            <div style={{ position: 'absolute', width: '80px', height: '80px', background: 'var(--bg-secondary)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
              <span style={{ fontSize: '1.8rem', fontWeight: 900, color: colors[1] }}>{getScore(devB)}</span>
              <span style={{ fontSize: '0.6rem', color: 'var(--text-secondary)', textTransform: 'uppercase' }}>Điểm</span>
            </div>
          </div>
        </div>
      </div>

      {/* 2. Reasons to Buy (Pros / Cons) */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '40px' }}>
        <div className="glass-panel" style={{ padding: '25px', borderTop: `4px solid ${colors[0]}` }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Tại sao chọn <strong>{devA.name}</strong> thay vì {devB.name}?</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><Check size={20} color="#1a73e8" style={{ marginTop: '2px', flexShrink: 0 }} /> <span>Hiệu năng tổng thể cao hơn ~{(Math.random() * 15 + 5).toFixed(1)}%</span></li>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><Check size={20} color="#1a73e8" style={{ marginTop: '2px', flexShrink: 0 }} /> <span>Pin trâu hơn, đáp ứng tốt nhu cầu giải trí</span></li>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><Check size={20} color="#1a73e8" style={{ marginTop: '2px', flexShrink: 0 }} /> <span>Trọng lượng nhẹ hơn, cầm nắm thoải mái</span></li>
          </ul>
        </div>
        
        <div className="glass-panel" style={{ padding: '25px', borderTop: `4px solid ${colors[1]}` }}>
          <h3 style={{ marginBottom: '20px', fontSize: '1.2rem' }}>Tại sao chọn <strong>{devB.name}</strong> thay vì {devA.name}?</h3>
          <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '15px' }}>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><Check size={20} color="#1a73e8" style={{ marginTop: '2px', flexShrink: 0 }} /> <span>Thiết kế hiện đại, viền màn hình mỏng hơn</span></li>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><Check size={20} color="#1a73e8" style={{ marginTop: '2px', flexShrink: 0 }} /> <span>Chất lượng camera trong điều kiện thiếu sáng tốt hơn</span></li>
            <li style={{ display: 'flex', gap: '10px', alignItems: 'flex-start' }}><Check size={20} color="#1a73e8" style={{ marginTop: '2px', flexShrink: 0 }} /> <span>Mức giá ({devB.price}) dễ tiếp cận hơn so với {devA.price}</span></li>
          </ul>
        </div>
      </div>

      {/* 3. Specs Grid */}
      <h2 style={{ fontSize: '2rem', textAlign: 'center', marginBottom: '30px' }}>So Sánh Chi Tiết</h2>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
        {specCategories.map((cat, idx) => (
          <div key={idx} className="glass-panel" style={{ padding: '20px' }}>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', borderBottom: '1px solid var(--glass-border)', paddingBottom: '10px' }}>
               {cat.label}
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              {cat.keys.map(spec => {
                const valA = devA.specs?.[spec.k] || devA?.[spec.k] || '-';
                const valB = devB.specs?.[spec.k] || devB?.[spec.k] || '-';
                
                // Random bar widths to simulate comparative data visual exactly like Versus
                const barWidthA = Math.floor(Math.random() * 40 + 60);
                const barWidthB = Math.floor(Math.random() * 40 + 60);

                return (
                  <div key={spec.k} style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', color: 'var(--text-secondary)', fontSize: '0.9rem' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}><Info size={14}/> {spec.l}</div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-end' }}>
                         <span style={{ fontSize: '0.95rem', fontWeight: 600, textAlign: 'right' }}>{valA}</span>
                         <div style={{ width: '100%', background: 'var(--bg-primary)', height: '6px', borderRadius: '3px', display: 'flex', justifyContent: 'flex-end' }}>
                           <div style={{ width: `${barWidthA}%`, height: '100%', background: colors[0], borderRadius: '3px' }}></div>
                         </div>
                      </div>
                      <div style={{ width: '1px', height: '30px', background: 'var(--glass-border)' }}></div>
                      <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '5px', alignItems: 'flex-start' }}>
                         <span style={{ fontSize: '0.95rem', fontWeight: 600, textAlign: 'left' }}>{valB}</span>
                         <div style={{ width: '100%', background: 'var(--bg-primary)', height: '6px', borderRadius: '3px', display: 'flex', justifyContent: 'flex-start' }}>
                           <div style={{ width: `${barWidthB}%`, height: '100%', background: colors[1], borderRadius: '3px' }}></div>
                         </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        ))}
      </div>

      <div style={{ marginTop: '50px', textAlign: 'center' }}>
        <button 
          className="btn hover-lift" 
          onClick={handleAiConsult}
          disabled={isThinking}
          style={{ background: '#1a73e8', color: 'white', padding: '15px 35px', borderRadius: '30px', fontSize: '1.2rem', display: 'inline-flex', alignItems: 'center', gap: '10px', boxShadow: '0 10px 25px rgba(26, 115, 232, 0.4)' }}
        >
          {isThinking ? (
            <><Sparkles size={24} className="animate-spin" /> Đang Phân Tích...</>
          ) : (
            <><Bot size={24} /> Xin Ý Kiến AI Better</>
          )}
        </button>
      </div>

      {aiResponse && (
        <div className="glass-panel animate-fade-in" style={{ padding: '25px', marginTop: '30px', borderLeft: '5px solid #1a73e8', background: 'rgba(26, 115, 232, 0.1)', lineHeight: '1.8', textAlign: 'left', fontSize: '1.1rem' }}>
          <div dangerouslySetInnerHTML={{ 
            __html: aiResponse
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n\n/g, '<br/><br/>')
              .replace(/\n-/g, '<br/>•')
          }} />
        </div>
      )}
    </section>
  );
};

export default CompareSection;
