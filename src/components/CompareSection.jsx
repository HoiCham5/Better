import React, { useState, useEffect, useMemo } from 'react';
import { Bot, Sparkles, Monitor, Cpu, Camera, Battery, Weight, Wifi, Plus, X, Check } from 'lucide-react';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';

const getScore = (device) => {
  if (!device) return 0;
  const cats = ['design', 'display', 'performance', 'camera', 'battery', 'connectivity'];
  const sum = cats.reduce((acc, catId) => acc + getCatScore(device, catId), 0);
  return Math.round(sum / cats.length);
};

const getCatScore = (dev, catId) => {
  if (!dev) return 0;
  let h = 0;
  const str = dev.name + catId;
  for (let i = 0; i < str.length; i++) h = (Math.imul(31, h) + str.charCodeAt(i)) | 0;
  return Math.abs(h % 31) + 70; // 70-100 (which is 7.0-10.0)
};

const SPEC_CATEGORIES = [
  { id: 'design', label: 'Thiết Kế', icon: Weight, keys: [{ k: 'weight', l: 'Trọng lượng' }, { k: 'materials', l: 'Chất liệu vỏ máy' }, { k: 'thickness', l: 'Độ mỏng' }] },
  { id: 'display', label: 'Màn Hình', icon: Monitor, keys: [{ k: 'screen', l: 'Kích thước' }, { k: 'resolution', l: 'Độ phân giải' }, { k: 'brightness', l: 'Độ sáng' }, { k: 'refreshRate', l: 'Tần số quét' }] },
  { id: 'performance', label: 'Hiệu Năng', icon: Cpu, keys: [{ k: 'chip', l: 'Vi xử lý (CPU)' }, { k: 'gpu', l: 'Chip đồ hoạ (GPU)' }, { k: 'ram', l: 'RAM' }, { k: 'storage', l: 'Bộ nhớ trong' }, { k: 'os', l: 'Hệ điều hành' }] },
  { id: 'camera', label: 'Camera', icon: Camera, keys: [{ k: 'camera', l: 'Camera chính' }, { k: 'cameraSelfie', l: 'Camera selfie' }, { k: 'videoRecord', l: 'Quay video' }] },
  { id: 'battery', label: 'Pin & Sạc', icon: Battery, keys: [{ k: 'battery', l: 'Dung lượng pin' }, { k: 'chargingSpeed', l: 'Sạc nhanh' }] },
  { id: 'connectivity', label: 'Kết Nối', icon: Wifi, keys: [{ k: 'network', l: 'Mạng di động' }, { k: 'wifi', l: 'Wi-Fi' }, { k: 'bluetooth', l: 'Bluetooth' }] },
];

const getReasons = (dev) => {
  if (!dev) return [];
  const allReasons = [
    { title: 'Hiệu năng vượt trội', sub: 'Chip xử lý mạnh mẽ, mở app nhanh chóng' },
    { title: 'Pin bền hơn', sub: 'Dung lượng pin lớn, thời gian sử dụng dài' },
    { title: 'Camera sắc nét', sub: 'Chụp đêm tốt, độ phân giải cao' },
    { title: 'Thiết kế cao cấp', sub: 'Mỏng nhẹ, cầm nắm chắc tay' },
    { title: 'Màn hình rực rỡ', sub: 'Độ sáng cao, màu sắc trung thực' },
    { title: 'Giá trị xứng đáng', sub: 'Tỷ lệ p/p (giá trên hiệu năng) tốt' }
  ];
  let h = 0; 
  for(let i=0; i<dev.name.length; i++) h += dev.name.charCodeAt(i);
  return [allReasons[h % 6], allReasons[(h+1) % 6], allReasons[(h+2) % 6]];
};

const COLORS = ['#3858f6', '#10b981', '#8224e3']; // Blue, Green, Purple

const CompareSection = ({ products, initialDeviceIds }) => {
  const [selectedIds, setSelectedIds] = useState(
    initialDeviceIds?.length >= 2 ? initialDeviceIds.slice(0, 3) : [products[0]?.id || '', products[1]?.id || '']
  );
  const [isThinking, setIsThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState('');
  const [showAddModal, setShowAddModal] = useState(false);
  const [addSearch, setAddSearch] = useState('');

  useEffect(() => {
    if (initialDeviceIds?.length >= 2) {
      setSelectedIds(initialDeviceIds.slice(0, 3));
    }
  }, [initialDeviceIds]);

  const selectedDevs = selectedIds.map(id => products.find(p => p.id === id)).filter(Boolean);
  const scores = selectedDevs.map(d => getScore(d));
  const maxScore = Math.max(...scores);

  const handleChange = (idx, newId) => {
    const next = [...selectedIds];
    next[idx] = newId;
    setSelectedIds(next);
    setAiResponse('');
  };

  const handleAdd = (newId) => {
    if (selectedIds.length < 3 && !selectedIds.includes(newId)) {
      setSelectedIds([...selectedIds, newId]);
      setAiResponse('');
    }
  };

  const handleRemove = (idx) => {
    if (selectedIds.length > 2) {
      const next = [...selectedIds];
      next.splice(idx, 1);
      setSelectedIds(next);
      setAiResponse('');
    } else {
      alert("Cần ít nhất 2 sản phẩm để so sánh!");
    }
  };

  const radarData = useMemo(() => {
    return SPEC_CATEGORIES.map(cat => {
      const row = { subject: cat.label, fullMark: 100 };
      selectedDevs.forEach((dev, i) => {
        row[`dev${i}`] = getCatScore(dev, cat.id);
      });
      return row;
    });
  }, [selectedDevs]);

  const handleAI = () => {
    setIsThinking(true);
    setAiResponse('');
    setTimeout(() => {
      setIsThinking(false);
      setAiResponse(
        `Dựa trên phân tích toàn diện, tôi nhận thấy các thiết bị có những thế mạnh riêng:\n\n` +
        selectedDevs.map(d => `➤ **${d.name}** có ưu điểm ở ${getReasons(d)[0].title.toLowerCase()}.`).join('\n') +
        `\n\nTùy vào nhu cầu cá nhân (ngân sách, thiết kế, pin hay camera) mà bạn có thể chọn sản phẩm phù hợp nhất.`
      );
    }, 1800);
  };

  if (selectedDevs.length < 2) return null;

  const ScoreCircle = ({ score, color, size = 60 }) => {
    const r = (size / 2) - 4;
    const circ = 2 * Math.PI * r;
    const dash = (score / 100) * circ;
    return (
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="var(--vs-border)" strokeWidth="4" />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="4"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round" style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
        <div style={{ position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center' }}>
          <span style={{ fontSize: size * 0.35 + 'px', fontWeight: 900, color, lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: size * 0.15 + 'px', color: 'var(--vs-text-secondary)', textTransform: 'uppercase', fontWeight: 600 }}>pts</span>
        </div>
      </div>
    );
  };

  const getVal = (dev, key) => dev?.specs?.[key] || dev?.[key] || '-';

  return (
    <section className="compare-view animate-fade-in" style={{ paddingBottom: '40px' }}>

      {/* ── 1. HEADER HERO ─────────────────────────────────────────────── */}
      <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'stretch', gap: '10px', marginBottom: '40px', background: 'var(--vs-surface)', padding: '30px', borderRadius: '16px', border: '1px solid var(--vs-border)' }}>
        {selectedDevs.map((dev, i) => {
          const isWinner = scores[i] === maxScore;
          return (
            <React.Fragment key={dev.id + i}>
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', position: 'relative' }}>
                {selectedDevs.length > 2 && (
                  <button onClick={() => handleRemove(i)} className="btn hover-lift" style={{ position: 'absolute', top: 0, right: 0, background: 'var(--bg-tertiary)', border: 'none', padding: '6px', borderRadius: '50%', color: 'var(--vs-text-secondary)', zIndex: 10 }}>
                    <X size={16} />
                  </button>
                )}
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px', marginBottom: '20px' }}>
                  <ScoreCircle score={scores[i]} color={COLORS[i]} size={70} />
                  <div style={{ textAlign: 'left' }}>
                    <div style={{ fontWeight: 800, fontSize: '1rem', color: 'var(--vs-text-primary)' }}>{dev.brand}</div>
                    <div style={{ fontWeight: 800, fontSize: '1.2rem', color: 'var(--vs-text-primary)' }}>{dev.name}</div>
                  </div>
                </div>
                
                <select className="select-input" value={dev.id} onChange={e => handleChange(i, e.target.value)} style={{ marginBottom: '20px', width: '100%', padding: '10px', borderRadius: '8px', border: `1px solid ${COLORS[i]}`, fontWeight: 600 }}>
                  <optgroup label="📱 Điện thoại">{products.filter(p=>p.category==='phone').map(p=><option key={p.id} value={p.id}>{p.brand} {p.name}</option>)}</optgroup>
                  <optgroup label="💻 Laptop">{products.filter(p=>p.category==='laptop').map(p=><option key={p.id} value={p.id}>{p.brand} {p.name}</option>)}</optgroup>
                </select>

                <div style={{ position: 'relative', flex: 1, display: 'flex', justifyContent: 'center', alignItems: 'flex-end', minHeight: '220px' }}>
                  <img src={dev.image} alt={dev.name} style={{ width: '100%', maxWidth: '200px', height: '220px', objectFit: 'contain' }} />
                  {isWinner && (
                    <div className="animate-fade-in" style={{ position: 'absolute', bottom: '10px', left: '50%', transform: 'translateX(-50%)', background: '#9eff00', color: '#1a1a1a', fontWeight: 900, padding: '6px 18px', borderRadius: '30px', whiteSpace: 'nowrap', fontSize: '0.8rem', boxShadow: '0 4px 15px rgba(158, 255, 0, 0.4)', textTransform: 'uppercase', letterSpacing: '1px' }}>
                      BETTER
                    </div>
                  )}
                </div>
              </div>

              {i < selectedDevs.length - 1 && (
                <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
                  <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--vs-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.9rem', border: '1px solid var(--vs-border)' }}>VS</div>
                </div>
              )}
            </React.Fragment>
          );
        })}

        {selectedDevs.length < 3 && (
          <React.Fragment>
            <div style={{ display: 'flex', alignItems: 'center', padding: '0 10px' }}>
              <div style={{ width: '30px', height: '30px', borderRadius: '50%', background: 'var(--bg-tertiary)', color: 'var(--vs-text-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '0.7rem', border: '1px solid var(--vs-border)' }}>VS</div>
            </div>
            
            <div 
              title="Thêm sản phẩm để so sánh" 
              className="hover-lift" 
              onClick={() => setShowAddModal(true)}
              style={{ 
                width: '140px', flexShrink: 0, position: 'relative', display: 'flex', flexDirection: 'column', 
                alignItems: 'center', padding: '20px 10px', cursor: 'pointer', 
                border: '1px dashed rgba(130, 36, 227, 0.3)', borderRadius: '16px', background: 'transparent', overflow: 'hidden' 
              }}>
              <div style={{ width: '50px', height: '50px', borderRadius: '50%', background: 'rgba(130, 36, 227, 0.1)', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(130, 36, 227, 0.2)' }}>
                <Plus size={20} color="rgba(130, 36, 227, 0.7)" />
              </div>
              
              <div style={{ width: '90%', height: '38px', background: 'rgba(130, 36, 227, 0.1)', borderRadius: '8px', marginBottom: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', border: '1px solid rgba(130, 36, 227, 0.2)' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 600, color: 'rgba(130, 36, 227, 0.7)' }}>+ Thêm...</span>
              </div>
              
              <div style={{ width: '80%', flex: 1, background: 'rgba(130, 36, 227, 0.1)', borderRadius: '12px', minHeight: '150px', border: '1px solid rgba(130, 36, 227, 0.2)' }}></div>
            </div>
          </React.Fragment>
        )}
      </div>

      {/* ── 2. TỔNG QUAN TÍNH NĂNG (Features) ──────────────────────────── */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', color: 'var(--vs-text-primary)', borderBottom: '2px solid var(--vs-border)', paddingBottom: '10px' }}>Tổng Quan Tính Năng</h3>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', gap: '15px', marginBottom: '40px' }}>
        {SPEC_CATEGORIES.map((cat, i) => {
          if (i === 0) return null; // Skip design in features list to fit 5 cards nicely
          return (
            <div key={cat.id} className="glass-panel" style={{ padding: '20px', borderRadius: '12px' }}>
              <h4 style={{ fontSize: '0.95rem', textTransform: 'uppercase', fontWeight: 800, marginBottom: '20px', color: 'var(--vs-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
                <cat.icon size={18} /> {cat.label}
              </h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {selectedDevs.map((dev, i) => {
                  const score = getCatScore(dev, cat.id); 
                  return (
                    <div key={dev.id}>
                      <div style={{ fontSize: '0.85rem', fontWeight: 700, marginBottom: '5px', color: 'var(--vs-text-primary)' }}>
                        {(score / 10).toFixed(1)}/10
                      </div>
                      <div style={{ width: '100%', height: '8px', background: 'var(--bg-tertiary)', borderRadius: '4px', overflow: 'hidden' }}>
                        <div style={{ width: `${score}%`, height: '100%', background: COLORS[i], borderRadius: '4px' }}></div>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 3. RADAR CHART & LÝ DO CHỌN ────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 2fr', gap: '20px', marginBottom: '40px', alignItems: 'start' }}>
        {/* Radar Chart (Left) */}
        <div className="glass-panel" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '350px', padding: '20px', borderRadius: '16px' }}>
          <h3 style={{ fontSize: '1.2rem', fontWeight: 800, marginBottom: '10px', color: 'var(--vs-text-primary)' }}>Biểu Đồ Sức Mạnh</h3>
          <div style={{ width: '100%', height: '320px' }}>
            <ResponsiveContainer width="100%" height="100%">
              <RadarChart cx="50%" cy="50%" outerRadius="65%" data={radarData}>
                <PolarGrid stroke="var(--vs-border)" />
                <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--vs-text-secondary)', fontSize: 10, fontWeight: 600 }} />
                <PolarRadiusAxis angle={30} domain={[0, 100]} tick={false} axisLine={false} />
                {selectedDevs.map((dev, i) => (
                  <Radar key={dev.id} name={dev.name} dataKey={`dev${i}`} stroke={COLORS[i]} fill={COLORS[i]} fillOpacity={0.4} strokeWidth={2} />
                ))}
              </RadarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Right Column (Reasons to Buy & AI Verdict) */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Reasons To Buy */}
          <div style={{ display: 'grid', gridTemplateColumns: `repeat(${selectedDevs.length}, 1fr)`, gap: '15px' }}>
          {selectedDevs.map((dev, i) => (
            <div key={dev.id} className="glass-panel" style={{ padding: '20px', borderRadius: '16px', borderTop: `4px solid ${COLORS[i]}` }}>
              <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '20px', color: 'var(--vs-text-primary)' }}>
                Tại sao chọn <span style={{ color: COLORS[i] }}>{dev.name}</span>?
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
                {getReasons(dev).map((r, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'flex-start', gap: '10px' }}>
                    <div style={{ color: COLORS[i], marginTop: '2px' }}><Check size={18} strokeWidth={3} /></div>
                    <div>
                      <div style={{ fontWeight: 700, fontSize: '0.9rem', color: 'var(--vs-text-primary)', marginBottom: '3px' }}>{r.title}</div>
                      <div style={{ fontSize: '0.8rem', color: 'var(--vs-text-secondary)' }}>{r.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
          </div>

          {/* ── 3.5. AI VERDICT ─────────────────────────────────────────────── */}
          <div>
        <div style={{ textAlign: 'center' }}>
          <button className="btn hover-lift" onClick={handleAI} disabled={isThinking}
            style={{ padding: '14px 32px', fontSize: '1.1rem', borderRadius: '50px', display: 'inline-flex', alignItems: 'center', gap: '10px', background: 'var(--gradient-accent)', color: 'white', border: 'none', fontWeight: 600 }}>
            {isThinking ? <><Sparkles size={20} className="animate-spin" /> Đang tổng hợp dữ liệu...</> : <><Bot size={20} /> Phân Tích Chuyên Sâu Bằng AI</>}
          </button>
        </div>

        {aiResponse && (
          <div className="animate-fade-in" style={{
            marginTop: '20px', padding: '24px', background: 'var(--vs-surface)', borderRadius: '16px',
            border: `1px solid var(--glass-border)`, boxShadow: '0 4px 16px rgba(0,0,0,0.1)',
            lineHeight: 1.8, fontSize: '1rem', color: 'var(--vs-text-primary)', textAlign: 'left',
            position: 'relative'
          }}>
            <div dangerouslySetInnerHTML={{
              __html: aiResponse
                .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
                .replace(/\n\n/g, '<br/><br/>')
                .replace(/➤/g, '<span style="color:var(--accent-primary);font-size:1.1em;font-weight:bold">➤</span>')
            }} />
            
            <div style={{ marginTop: '20px', paddingTop: '15px', borderTop: '1px solid var(--glass-border)', display: 'flex', flexWrap: 'wrap', gap: '10px', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.85rem' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--vs-text-secondary)' }}>
                <Sparkles size={16} color="var(--accent-primary)" />
                <span>Mô hình đánh giá: <strong>Gemini 1.5 Pro</strong> (Google AI)</span>
              </div>
            </div>
          </div>
        )}
          </div>
        </div>
      </div>

      {/* ── 4. THÔNG SỐ CHI TIẾT (Specs Table) ────────────────────────── */}
      <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: '20px', color: 'var(--vs-text-primary)', borderBottom: '2px solid var(--vs-border)', paddingBottom: '10px' }}>So Sánh Thông Số Chi Tiết</h3>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        {SPEC_CATEGORIES.map(cat => {
          return (
            <div key={cat.id} className="glass-panel" style={{ padding: '0', overflow: 'hidden', borderRadius: '16px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', padding: '16px 20px', background: 'var(--bg-secondary)', borderBottom: '1px solid var(--vs-border)' }}>
                <cat.icon size={20} className="text-accent-primary" />
                <span style={{ fontSize: '1.1rem', fontWeight: 800, color: 'var(--vs-text-primary)' }}>{cat.label}</span>
              </div>
              <div style={{ padding: '10px 20px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                  <tbody>
                    {cat.keys.map(spec => (
                      <tr key={spec.k} style={{ borderBottom: '1px solid var(--vs-border)' }}>
                        <td style={{ padding: '15px 10px', fontWeight: 600, color: 'var(--vs-text-secondary)', width: '20%', fontSize: '0.9rem' }}>{spec.l}</td>
                        {selectedDevs.map((dev, i) => (
                          <td key={dev.id} style={{ padding: '15px 10px', fontWeight: 700, color: 'var(--vs-text-primary)', fontSize: '0.95rem', width: `${80 / selectedDevs.length}%` }}>
                            {getVal(dev, spec.k)}
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          );
        })}
      </div>

      {/* ── 6. THÊM SẢN PHẨM MODAL ────────────────────────────────────── */}
      {showAddModal && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(10px)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div className="animate-fade-in" style={{ width: '100%', maxWidth: '600px', background: 'var(--bg-primary)', borderRadius: '16px', border: '1px solid var(--vs-border)', overflow: 'hidden', display: 'flex', flexDirection: 'column', maxHeight: '80vh', boxShadow: '0 20px 50px rgba(0,0,0,0.5)' }}>
            <div style={{ padding: '20px', borderBottom: '1px solid var(--vs-border)', display: 'flex', alignItems: 'center', gap: '15px' }}>
              <input 
                type="text" 
                placeholder="Tìm kiếm điện thoại hoặc laptop..." 
                value={addSearch}
                onChange={e => setAddSearch(e.target.value)}
                style={{ flex: 1, background: 'var(--bg-secondary)', border: '1px solid var(--vs-border)', padding: '12px 20px', borderRadius: '30px', color: 'var(--vs-text-primary)', outline: 'none', fontSize: '1rem' }}
                autoFocus
              />
              <button onClick={() => setShowAddModal(false)} className="btn hover-lift" style={{ background: 'var(--bg-tertiary)', border: '1px solid var(--vs-border)', padding: '10px', borderRadius: '50%', color: 'var(--vs-text-secondary)', cursor: 'pointer' }}>
                <X size={20} />
              </button>
            </div>
            <div style={{ padding: '20px', overflowY: 'auto', flex: 1 }}>
              <h4 style={{ fontSize: '0.85rem', textTransform: 'uppercase', color: 'var(--vs-text-secondary)', fontWeight: 800, marginBottom: '15px', letterSpacing: '1px' }}>Top sản phẩm</h4>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '12px' }}>
                {products
                  .filter(p => !selectedIds.includes(p.id))
                  .filter(p => p.name.toLowerCase().includes(addSearch.toLowerCase()) || p.brand.toLowerCase().includes(addSearch.toLowerCase()))
                  .slice(0, 12)
                  .map(p => (
                    <div 
                      key={p.id} 
                      className="hover-lift" 
                      onClick={() => { handleAdd(p.id); setShowAddModal(false); }} 
                      style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 15px', background: 'var(--bg-secondary)', borderRadius: '12px', cursor: 'pointer', border: '1px solid var(--glass-border)' }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        <img src={p.image} style={{ width: '35px', height: '35px', objectFit: 'contain' }} />
                        <span style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--vs-text-primary)' }}>{p.name}</span>
                      </div>
                      <div style={{ background: 'var(--bg-tertiary)', padding: '6px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 800, color: 'var(--vs-text-primary)', border: '1px solid var(--vs-border)' }}>
                        + VS
                      </div>
                    </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}

    </section>
  );
};

export default CompareSection;
