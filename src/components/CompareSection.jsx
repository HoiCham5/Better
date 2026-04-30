import React, { useState, useEffect, useMemo } from 'react';
import { Bot, Sparkles, Check, ChevronDown, ChevronUp, Monitor, Cpu, Camera, Battery, Weight, Wifi } from 'lucide-react';

// ─── Helper: generate score (deterministic from name) ────────────────────────
const getScore = (device) => {
  if (!device) return 0;
  let h = 0;
  for (let i = 0; i < (device.name?.length || 0); i++) h = (Math.imul(31, h) + device.name.charCodeAt(i)) | 0;
  return Math.abs(h % 21) + 75; // 75–95
};

// ─── Generate bar widths (deterministic) ─────────────────────────────────────
const getBarWidth = (text, seed) => {
  if (!text || text === '-') return 40;
  let h = seed;
  for (let i = 0; i < text.length; i++) h = (Math.imul(17, h) + text.charCodeAt(i)) | 0;
  return Math.abs(h % 45) + 50; // 50–95
};

// ─── Spec categories mirroring Versus.com ─────────────────────────────────────
const SPEC_CATEGORIES = [
  {
    id: 'design', label: 'Thiết Kế', icon: Weight,
    keys: [
      { k: 'weight',    l: 'Trọng lượng' },
      { k: 'materials', l: 'Chất liệu vỏ máy' },
      { k: 'thickness', l: 'Độ mỏng' },
    ]
  },
  {
    id: 'display', label: 'Màn Hình', icon: Monitor,
    keys: [
      { k: 'screen',     l: 'Kích thước màn hình' },
      { k: 'resolution', l: 'Độ phân giải' },
      { k: 'brightness', l: 'Độ sáng tối đa' },
      { k: 'refreshRate',l: 'Tốc độ làm mới' },
    ]
  },
  {
    id: 'performance', label: 'Hiệu Năng', icon: Cpu,
    keys: [
      { k: 'chip',    l: 'Vi xử lý (CPU)' },
      { k: 'gpu',     l: 'Chip đồ hoạ (GPU)' },
      { k: 'ram',     l: 'Bộ nhớ RAM' },
      { k: 'storage', l: 'Bộ nhớ trong' },
      { k: 'os',      l: 'Hệ điều hành' },
    ]
  },
  {
    id: 'camera', label: 'Camera', icon: Camera,
    keys: [
      { k: 'camera',       l: 'Camera chính' },
      { k: 'cameraSelfie', l: 'Camera selfie' },
      { k: 'videoRecord',  l: 'Quay video' },
    ]
  },
  {
    id: 'battery', label: 'Pin & Sạc', icon: Battery,
    keys: [
      { k: 'battery',      l: 'Dung lượng pin' },
      { k: 'chargingSpeed',l: 'Sạc nhanh' },
      { k: 'wirelessCharge',l:'Sạc không dây' },
    ]
  },
  {
    id: 'connectivity', label: 'Kết Nối', icon: Wifi,
    keys: [
      { k: 'network',  l: 'Mạng di động' },
      { k: 'wifi',     l: 'Wi-Fi' },
      { k: 'bluetooth',l: 'Bluetooth' },
      { k: 'ports',    l: 'Cổng giao tiếp' },
      { k: 'nfc',      l: 'NFC' },
    ]
  },
];

// ─── Reasons to buy (static, contextual) ────────────────────────────────────
const REASONS_A = [
  { title: 'Hiệu năng tổng thể vượt trội', sub: 'Chip xử lý mạnh hơn, tốc độ cao hơn' },
  { title: 'Pin bền hơn', sub: 'Dung lượng pin lớn hơn, sạc nhanh hơn' },
  { title: 'Camera chụp ảnh rõ nét', sub: 'Độ phân giải cao, xử lý ảnh tốt hơn' },
];
const REASONS_B = [
  { title: 'Thiết kế mỏng nhẹ hơn', sub: 'Cầm nắm thoải mái, dễ di chuyển' },
  { title: 'Màn hình sắc nét hơn', sub: 'Độ phân giải cao, màu sắc chuẩn xác' },
  { title: 'Giá thành hợp lý hơn', sub: 'Tỷ lệ giá trị / hiệu năng tốt hơn' },
];

// ─── Component ────────────────────────────────────────────────────────────────
const CompareSection = ({ products, initialDeviceIds }) => {
  const [selectedIds, setSelectedIds] = useState(
    initialDeviceIds?.length === 2 ? initialDeviceIds : [products[0]?.id || '', products[1]?.id || '']
  );
  const [activeCategory, setActiveCategory] = useState('all');
  const [expandedCats, setExpandedCats] = useState({});
  const [isThinking, setIsThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  useEffect(() => {
    if (initialDeviceIds?.length === 2) setSelectedIds(initialDeviceIds);
  }, [initialDeviceIds]);

  const devA = products.find(p => p.id === selectedIds[0]);
  const devB = products.find(p => p.id === selectedIds[1]);
  const scoreA = useMemo(() => getScore(devA), [devA]);
  const scoreB = useMemo(() => getScore(devB), [devB]);

  const colorA = '#8224e3'; // Versus purple
  const colorB = '#ff2e51'; // Versus red

  const handleChange = (idx, id) => {
    const next = [...selectedIds];
    next[idx] = id;
    setSelectedIds(next);
    setAiResponse('');
  };

  const toggleCat = (id) => setExpandedCats(p => ({ ...p, [id]: !p[id] }));

  const handleAI = () => {
    setIsThinking(true);
    setAiResponse('');
    setTimeout(() => {
      setIsThinking(false);
      setAiResponse(
        `Dựa trên điểm số tổng hợp, **${devA?.name}** đạt **${scoreA}/100** và **${devB?.name}** đạt **${scoreB}/100**.\n\n` +
        (scoreA >= scoreB
          ? `➤ **${devA?.name}** nổi trội hơn về hiệu năng và camera. Nếu bạn cần máy mạnh, đây là lựa chọn tốt hơn.\n\n➤ **${devB?.name}** phù hợp hơn nếu bạn ưu tiên thiết kế mỏng nhẹ và giá thành hợp lý.`
          : `➤ **${devB?.name}** nổi trội hơn về hiệu năng và camera. Nếu bạn cần máy mạnh, đây là lựa chọn tốt hơn.\n\n➤ **${devA?.name}** phù hợp hơn nếu bạn ưu tiên thiết kế mỏng nhẹ và giá thành hợp lý.`)
      );
    }, 1800);
  };

  if (!devA || !devB) return (
    <div style={{ textAlign: 'center', padding: '60px 20px', color: '#6b7280' }}>
      <p style={{ fontSize: '1.2rem', marginBottom: '8px' }}>Chọn 2 sản phẩm để bắt đầu so sánh</p>
    </div>
  );

  // Score circle component
  const ScoreCircle = ({ score, color, size = 110 }) => {
    const r = (size / 2) - 8;
    const circ = 2 * Math.PI * r;
    const dash = (score / 100) * circ;
    return (
      <div style={{ position: 'relative', width: size, height: size }}>
        <svg width={size} height={size} style={{ transform: 'rotate(-90deg)' }}>
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke="#f0f0f0" strokeWidth="8" />
          <circle cx={size/2} cy={size/2} r={r} fill="none" stroke={color} strokeWidth="8"
            strokeDasharray={`${dash} ${circ}`} strokeLinecap="round"
            style={{ transition: 'stroke-dasharray 1s ease' }}
          />
        </svg>
        <div style={{
          position: 'absolute', inset: 0, display: 'flex', flexDirection: 'column',
          alignItems: 'center', justifyContent: 'center'
        }}>
          <span style={{ fontSize: '1.6rem', fontWeight: 900, color, lineHeight: 1 }}>{score}</span>
          <span style={{ fontSize: '0.6rem', color: '#6b7280', textTransform: 'uppercase', fontWeight: 600 }}>điểm</span>
        </div>
      </div>
    );
  };

  const getVal = (dev, key) => dev?.specs?.[key] || dev?.[key] || null;

  const shownCats = activeCategory === 'all'
    ? SPEC_CATEGORIES
    : SPEC_CATEGORIES.filter(c => c.id === activeCategory);

  return (
    <section className="compare-view animate-fade-in" style={{ paddingBottom: '40px' }}>

      {/* ── 1. DEVICE SELECTOR HEADER ─────────────────────────────────── */}
      <div style={{
        display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: '16px',
        alignItems: 'center', marginBottom: '32px',
        background: 'white', borderRadius: '16px', padding: '24px',
        boxShadow: '0 2px 8px rgba(0,0,0,0.08)', border: '1px solid #e5e7eb'
      }}>
        {/* Device A */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <select className="select-input" value={devA.id} onChange={e => handleChange(0, e.target.value)}
            style={{ borderLeft: `4px solid ${colorA}`, fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
            <optgroup label="📱 Điện thoại">{products.filter(p=>p.category==='phone').map(p=><option key={p.id} value={p.id}>{p.brand} {p.name}</option>)}</optgroup>
            <optgroup label="💻 Laptop">{products.filter(p=>p.category==='laptop').map(p=><option key={p.id} value={p.id}>{p.brand} {p.name}</option>)}</optgroup>
          </select>
          <img src={devA.image} alt={devA.name} style={{ width: '90px', height: '90px', objectFit: 'contain' }} />
          <ScoreCircle score={scoreA} color={colorA} />
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: colorA }}>{devA.name}</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{devA.price}</div>
        </div>

        {/* VS */}
        <div className="vs-badge" style={{ width: '56px', height: '56px', fontSize: '1.1rem' }}>VS</div>

        {/* Device B */}
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '12px' }}>
          <select className="select-input" value={devB.id} onChange={e => handleChange(1, e.target.value)}
            style={{ borderLeft: `4px solid ${colorB}`, fontWeight: 700, fontSize: '0.9rem', textAlign: 'center' }}>
            <optgroup label="📱 Điện thoại">{products.filter(p=>p.category==='phone').map(p=><option key={p.id} value={p.id}>{p.brand} {p.name}</option>)}</optgroup>
            <optgroup label="💻 Laptop">{products.filter(p=>p.category==='laptop').map(p=><option key={p.id} value={p.id}>{p.brand} {p.name}</option>)}</optgroup>
          </select>
          <img src={devB.image} alt={devB.name} style={{ width: '90px', height: '90px', objectFit: 'contain' }} />
          <ScoreCircle score={scoreB} color={colorB} />
          <div style={{ fontWeight: 700, fontSize: '0.85rem', color: colorB }}>{devB.name}</div>
          <div style={{ fontSize: '0.85rem', color: '#6b7280' }}>{devB.price}</div>
        </div>
      </div>

      {/* ── 2. REASONS TO BUY ─────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginBottom: '32px' }}>
        <div className="reasons-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '16px', color: '#1a1a1a' }}>
            Tại sao chọn <span style={{ color: colorA }}>{devA.name}</span>?
          </h3>
          {REASONS_A.map((r, i) => (
            <div key={i} className="reason-item">
              <div className="reason-check" style={{ background: colorA }}>✓</div>
              <div>
                <div className="reason-title">{r.title}</div>
                <div className="reason-sub">{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
        <div className="reasons-card">
          <h3 style={{ fontSize: '1rem', fontWeight: 800, marginBottom: '16px', color: '#1a1a1a' }}>
            Tại sao chọn <span style={{ color: colorB }}>{devB.name}</span>?
          </h3>
          {REASONS_B.map((r, i) => (
            <div key={i} className="reason-item">
              <div className="reason-check" style={{ background: colorB }}>✓</div>
              <div>
                <div className="reason-title">{r.title}</div>
                <div className="reason-sub">{r.sub}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* ── 3. CATEGORY FILTER TABS ───────────────────────────────────── */}
      <div className="compare-tab-nav" style={{ overflowX: 'auto' }}>
        <button className={`compare-tab ${activeCategory === 'all' ? 'active' : ''}`} onClick={() => setActiveCategory('all')}>
          📊 Tất cả
        </button>
        {SPEC_CATEGORIES.map(c => (
          <button key={c.id} className={`compare-tab ${activeCategory === c.id ? 'active' : ''}`} onClick={() => setActiveCategory(c.id)}>
            {c.label}
          </button>
        ))}
      </div>

      {/* ── 4. SPEC SECTIONS ──────────────────────────────────────────── */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
        {shownCats.map(cat => {
          const Icon = cat.icon;
          const rows = cat.keys.filter(s => getVal(devA, s.k) || getVal(devB, s.k));
          if (!rows.length) return null;
          const expanded = expandedCats[cat.id] !== false; // default open

          return (
            <div key={cat.id} className="glass-panel" style={{ padding: '0', overflow: 'hidden' }}>
              {/* Category Header */}
              <div
                onClick={() => toggleCat(cat.id)}
                style={{
                  display: 'flex', alignItems: 'center', justifyContent: 'space-between',
                  padding: '16px 20px', cursor: 'pointer', borderBottom: expanded ? '1px solid #e5e7eb' : 'none',
                  background: '#fafafa', userSelect: 'none'
                }}
              >
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <div style={{ width: 30, height: 30, borderRadius: '8px', background: 'linear-gradient(135deg, #3858f6, #8224e3)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                    <Icon size={16} color="white" />
                  </div>
                  <span style={{ fontSize: '1rem', fontWeight: 800, color: '#1a1a1a' }}>{cat.label}</span>
                  <span style={{ fontSize: '0.75rem', color: '#6b7280', background: '#f3f4f6', padding: '2px 8px', borderRadius: '10px' }}>{rows.length} thông số</span>
                </div>
                {expanded ? <ChevronUp size={18} color="#6b7280" /> : <ChevronDown size={18} color="#6b7280" />}
              </div>

              {/* Spec Rows */}
              {expanded && (
                <div style={{ padding: '8px 20px' }}>
                  {/* Mini header */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 120px 1fr', gap: '12px', padding: '8px 0', marginBottom: '4px' }}>
                    <div style={{ textAlign: 'right', fontWeight: 700, fontSize: '0.8rem', color: colorA }}>{devA.name}</div>
                    <div></div>
                    <div style={{ textAlign: 'left', fontWeight: 700, fontSize: '0.8rem', color: colorB }}>{devB.name}</div>
                  </div>

                  {rows.map(spec => {
                    const valA = getVal(devA, spec.k) || '-';
                    const valB = getVal(devB, spec.k) || '-';
                    const bwA = getBarWidth(String(valA), spec.k.charCodeAt(0) * 13);
                    const bwB = getBarWidth(String(valB), spec.k.charCodeAt(0) * 17);

                    return (
                      <div key={spec.k} className="spec-bar-row">
                        {/* Left (Device A) */}
                        <div className="spec-bar-value right" style={{ flex: 1 }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1a1a1a' }}>{valA}</span>
                          <div className="spec-bar-track">
                            <div className="spec-bar-fill" style={{ width: `${bwA}%`, background: colorA, marginLeft: 'auto' }}></div>
                          </div>
                        </div>

                        {/* Center label */}
                        <div className="spec-bar-label">
                          <span style={{ fontSize: '0.75rem', color: '#6b7280', fontWeight: 600 }}>{spec.l}</span>
                        </div>

                        {/* Right (Device B) */}
                        <div className="spec-bar-value left" style={{ flex: 1 }}>
                          <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1a1a1a' }}>{valB}</span>
                          <div className="spec-bar-track">
                            <div className="spec-bar-fill" style={{ width: `${bwB}%`, background: colorB }}></div>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ── 5. BUY BUTTONS ROW ────────────────────────────────────────── */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', marginTop: '24px' }}>
        {[devA, devB].map((dev, i) => (
          <div key={i} style={{ background: 'white', borderRadius: '12px', padding: '16px', border: `2px solid ${i === 0 ? colorA : colorB}`, textAlign: 'center' }}>
            <div style={{ fontWeight: 700, marginBottom: '12px', color: i === 0 ? colorA : colorB }}>{dev.name}</div>
            {dev?.links?.shopee && (
              <a href={dev.links.shopee} target="_blank" rel="noopener noreferrer"
                className="btn btn-shopee" style={{ width: '100%', borderRadius: '8px', justifyContent: 'center', fontSize: '0.85rem' }}>
                🛒 Mua trên Shopee
              </a>
            )}
          </div>
        ))}
      </div>

      {/* ── 6. AI VERDICT ─────────────────────────────────────────────── */}
      <div style={{ marginTop: '32px', textAlign: 'center' }}>
        <button className="btn btn-primary hover-lift" onClick={handleAI} disabled={isThinking}
          style={{ padding: '14px 32px', fontSize: '1rem', borderRadius: '50px' }}>
          {isThinking ? <><Sparkles size={18} style={{ animation: 'spin 1s linear infinite' }} /> Đang phân tích...</> : <><Bot size={18} /> Xin nhận xét từ AI</>}
        </button>
      </div>

      {aiResponse && (
        <div className="animate-fade-in" style={{
          marginTop: '20px', padding: '24px', background: 'white', borderRadius: '12px',
          borderLeft: `5px solid #3858f6`, boxShadow: '0 4px 16px rgba(56,88,246,0.1)',
          lineHeight: 1.8, fontSize: '0.95rem', color: '#1a1a1a', textAlign: 'left'
        }}>
          <div dangerouslySetInnerHTML={{
            __html: aiResponse
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n\n/g, '<br/><br/>')
              .replace(/➤/g, '<span style="color:#3858f6;font-size:1.1em">➤</span>')
          }} />
        </div>
      )}

    </section>
  );
};

export default CompareSection;
