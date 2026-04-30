import React, { useState } from 'react';
import { Bot, Sparkles } from 'lucide-react';
import { ResponsiveContainer, Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Legend, Tooltip as RechartsTooltip } from 'recharts';
import Tooltip from './Tooltip';

const CompareSection = ({ products }) => {
  const [selectedDeviceIds, setSelectedDeviceIds] = useState([
    products[0]?.id || '',
    products[1]?.id || products[0]?.id || ''
  ]);
  const [isThinking, setIsThinking] = useState(false);
  const [aiResponse, setAiResponse] = useState('');

  const hasPhones = products.some(p => p.category === 'phone');
  const hasLaptops = products.some(p => p.category === 'laptop');

  const MAX_DEVICES = 4;
  const currentDevices = selectedDeviceIds.map(id => products.find(p => p.id === id)).filter(Boolean);

  const handleDeviceChange = (index, newId) => {
    const newArr = [...selectedDeviceIds];
    newArr[index] = newId;
    setSelectedDeviceIds(newArr);
  };

  const addDevice = () => {
    if (selectedDeviceIds.length < MAX_DEVICES) {
      setSelectedDeviceIds([...selectedDeviceIds, products[0]?.id || '']);
    }
  };

  const removeDevice = (index) => {
    if (selectedDeviceIds.length > 2) {
      const newArr = [...selectedDeviceIds];
      newArr.splice(index, 1);
      setSelectedDeviceIds(newArr);
    }
  };

  const handleAiConsult = () => {
    setIsThinking(true);
    setAiResponse('');
    
    setTimeout(() => {
      setIsThinking(false);
      const names = currentDevices.map(d => d.name).join(', ');
      setAiResponse(`
### Ý kiến từ AI Better:
Dựa trên thông số kỹ thuật, các thiết bị: **${names}** đều có những ưu điểm riêng:

- Rất khó để chọn ra thiết bị tốt nhất vì chúng chia đều ưu nhược điểm. Bạn đang thiết lập so sánh đa thiết bị.
- Vui lòng xem kỹ bảng thông số để đưa ra quyết định!
      `);
    }, 2000);
  };

  const getScore = (device, factor) => device ? Math.floor(Math.abs(Math.sin((device?.name?.length || 10) * factor)) * 30 + 70) : 0;
  
  // Build chartData dynamically
  const subjects = [
    { name: 'Hiệu Năng', factor: 1 },
    { name: 'Pin & Sạc', factor: 2 },
    { name: 'Màn Hình', factor: 3 },
    { name: 'Camera', factor: 4 },
    { name: 'Thiết Kế', factor: 5 }
  ];

  const chartData = subjects.map(sub => {
    const dataPoint = { subject: sub.name, fullMark: 100 };
    currentDevices.forEach((dev, idx) => {
      dataPoint[`Device_${idx}`] = getScore(dev, sub.factor);
    });
    return dataPoint;
  });

  const colors = ['var(--accent-primary)', '#f43f5e', '#10b981', '#f59e0b'];

  const specRows = [
    { label: 'Loại Thiết Bị', key: 'category', isRaw: true, format: (v) => v === 'phone' ? 'Điện thoại' : 'Laptop' },
    { label: 'Ngày Ra Mắt', key: 'releaseDate' },
    { label: 'Cân Nặng', key: 'weight' },
    { label: 'Chất Liệu', key: 'materials' },
    { label: 'Màn hình', key: 'screen' },
    { label: 'Độ Nhạy / Sáng', key: 'brightness' },
    { label: 'Chip / Vi xử lý', key: 'chip' },
    { label: 'Đồ Hoạ / GPU', key: 'gpu' },
    { label: 'RAM', key: 'ram' },
    { label: 'Lưu Trữ', key: 'storage' },
    { label: 'Camera / Webcam', key: 'camera' },
    { label: 'Máy ảnh Trước', key: 'cameraSelfie' },
    { label: 'Pin & Sạc', key: 'battery' },
    { label: 'Cổng Mở Rộng', key: 'ports' },
    { label: 'Kết Nối Mạng', key: 'network' },
    { label: 'Tính năng AI', key: 'aiFeatures' },
    { label: 'Hệ điều hành', key: 'os' },
  ];

  return (
    <section className="compare-view glass-panel animate-fade-in" style={{ marginTop: '20px' }}>
      <h2 className="compare-title">Bảng So Sánh Kỹ Thuật Số</h2>
      
      <div className="compare-selectors" style={{ display: 'flex', gap: '20px', marginBottom: '40px', flexWrap: 'nowrap', alignItems: 'center', justifyContent: 'center', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '15px' }}>
        {selectedDeviceIds.map((id, index) => (
          <React.Fragment key={`selector-${index}`}>
            <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <select 
                className="select-input" 
                value={id} 
                onChange={(e) => handleDeviceChange(index, e.target.value)}
                style={{ borderLeft: `5px solid ${colors[index]}`, fontSize: '1.2rem', padding: '15px', fontWeight: 'bold' }}
              >
                {hasPhones && (
                  <optgroup label="📱 Điện thoại">
                    {products.filter(p => p.category === 'phone').map(p => (
                      <option key={`p-${p.id}`} value={p.id}>{p.brand} {p.name}</option>
                    ))}
                  </optgroup>
                )}
                {hasLaptops && (
                  <optgroup label="💻 Laptop">
                    {products.filter(p => p.category === 'laptop').map(p => (
                      <option key={`l-${p.id}`} value={p.id}>{p.brand} {p.name}</option>
                    ))}
                  </optgroup>
                )}
              </select>
              {selectedDeviceIds.length > 2 && (
                 <button 
                   onClick={() => removeDevice(index)}
                   style={{ background: 'transparent', border: 'none', color: 'var(--shopee-color)', cursor: 'pointer', alignSelf: 'center', fontWeight: 'bold' }}
                 >
                   ✕ Gỡ bỏ
                 </button>
              )}
            </div>
            
            {/* Thêm chữ VS ở giữa */}
            {index < selectedDeviceIds.length - 1 && (
               <div className="vs-badge" style={{
                 width: '50px',
                 height: '50px',
                 borderRadius: '50%',
                 background: 'var(--bg-primary)',
                 color: 'var(--text-primary)',
                 display: 'flex',
                 alignItems: 'center',
                 justifyContent: 'center',
                 fontWeight: '900',
                 fontSize: '1.5rem',
                 flexShrink: 0,
                 border: '2px solid var(--glass-border)'
               }}>VS</div>
            )}
          </React.Fragment>
        ))}
        
        {selectedDeviceIds.length < MAX_DEVICES && (
          <button 
            onClick={addDevice}
            style={{ 
              background: 'transparent', border: '2px dashed var(--accent-primary)', 
              color: 'var(--accent-primary)', padding: '15px 25px', borderRadius: '15px',
              cursor: 'pointer', flex: '0 0 auto', fontWeight: 'bold', fontSize: '1.1rem'
            }}
          >
            + Thêm Máy
          </button>
        )}
      </div>

      {currentDevices.length > 0 && (
        <div style={{ height: '350px', marginBottom: '30px', background: 'var(--bg-secondary)', borderRadius: '15px', padding: '20px' }}>
          <h3 style={{ textAlign: 'center', marginBottom: '10px' }}>Biểu Đồ So Sánh Trực Quan</h3>
          <ResponsiveContainer width="100%" height="100%">
            <RadarChart cx="50%" cy="50%" outerRadius="70%" data={chartData}>
              <PolarGrid stroke="var(--glass-border)" />
              <PolarAngleAxis dataKey="subject" tick={{ fill: 'var(--text-secondary)' }} />
              <PolarRadiusAxis angle={90} domain={[0, 100]} tick={{ fill: 'var(--text-secondary)', fontSize: 10 }} tickCount={5} axisLine={false} tickFormatter={(value) => value === 100 ? '' : value} />
              
              {currentDevices.map((dev, idx) => (
                 <Radar key={`radar-${idx}`} name={dev.name} dataKey={`Device_${idx}`} stroke={colors[idx]} fill={colors[idx]} fillOpacity={0.4} />
              ))}
              
              <Legend 
                wrapperStyle={{ color: 'var(--text-primary)' }} 
                payload={currentDevices.map((dev, idx) => ({
                  id: `Device_${idx}`,
                  type: 'square',
                  value: dev.name,
                  color: colors[idx]
                }))}
              />
              <RechartsTooltip contentStyle={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '8px' }} />
            </RadarChart>
          </ResponsiveContainer>
        </div>
      )}

      <div style={{ overflowX: 'auto' }}>
        <table className="compare-table">
          <thead>
            <tr>
              <th>Thông số Chi tiết</th>
              {currentDevices.map((dev, idx) => (
                <th key={`th-${idx}`} style={{ color: colors[idx] }}>
                  {dev.name}
                  <br />
                  <span style={{fontSize: '0.9rem'}}>{dev.price}</span>
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {specRows.map(row => {
               // Bỏ qua dòng nếu tất cả các máy đều không có cấu hình này
               const hasAnyVal = currentDevices.some(dev => row.isRaw ? dev?.[row.key] : dev?.specs?.[row.key]);
               if (!hasAnyVal) return null;

               const renderCell = (val) => {
                 if (!val) return '-';
                 if (row.format) return row.format(val);
                 if (typeof val === 'string' && val.length > 5 && !row.isRaw) {
                   return <Tooltip term={val} />;
                 }
                 return val;
               };

               return (
                 <tr key={row.key}>
                   <td>{row.label}</td>
                   {currentDevices.map((dev, idx) => {
                      const val = row.isRaw ? dev?.[row.key] : dev?.specs?.[row.key];
                      return <td key={`td-${idx}`}>{renderCell(val)}</td>;
                   })}
                 </tr>
               );
            })}
            
            <tr>
              <td>Hành động</td>
              {currentDevices.map((dev, idx) => (
                <td key={`action-${idx}`}>
                  {dev?.links?.shopee && (
                    <a href={dev.links.shopee} target="_blank" rel="noopener noreferrer" style={{color: 'var(--shopee-color)', fontWeight: 'bold'}}>MUA NGAY →</a>
                  )}
                </td>
              ))}
            </tr>
          </tbody>
        </table>
      </div>

      <div style={{ marginTop: '30px', textAlign: 'center' }}>
        <button 
          className="btn" 
          onClick={handleAiConsult}
          disabled={isThinking || currentDevices.length < 2}
          style={{ background: 'var(--gradient-accent)', color: 'white', padding: '10px 25px', borderRadius: '30px', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
        >
          {isThinking ? (
            <><Sparkles size={18} className="animate-spin" /> Đang Phân Tích...</>
          ) : (
            <><Bot size={18} /> Hỏi Nhận Xét Từ AI</>
          )}
        </button>
      </div>

      {aiResponse && (
        <div className="glass-panel animate-fade-in" style={{ padding: '20px', marginTop: '20px', borderLeft: '4px solid var(--accent-primary)', background: 'rgba(59, 130, 246, 0.05)', lineHeight: '1.6', textAlign: 'left' }}>
          <div dangerouslySetInnerHTML={{ 
            __html: aiResponse
              .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
              .replace(/\n\n/g, '<br/><br/>')
              .replace(/\n-/g, '<br/>•')
          }} />
        </div>
      )}

      {/* Fake Facebook Comments Section inside Compare */}
      <div style={{ marginTop: '50px', background: '#fff', padding: '20px', borderRadius: '15px', color: '#1c1e21' }}>
        <h4 style={{ color: '#1877f2', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 'bold' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="FB" width="24" height="24" /> 
          Bình luận diễn đàn
        </h4>
        <div style={{ fontFamily: 'Helvetica, Arial, sans-serif', fontSize: '14px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid #dddfe2', paddingBottom: '10px', marginBottom: '15px' }}>
            <span style={{ fontWeight: 'bold' }}>28 bình luận</span>
            <span style={{ color: '#4b4f56', cursor: 'pointer' }}>Sắp xếp theo: <strong>Cũ nhất</strong> ▼</span>
          </div>

          <div style={{ display: 'flex', gap: '10px', marginBottom: '20px' }}>
             <img src="https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=50&h=50&fit=crop" style={{ width: '36px', height: '36px', borderRadius: '50%' }} alt="Your Avatar" />
             <div style={{ flex: 1 }}>
               <div style={{ border: '1px solid #ccd0d5', backgroundColor: '#f5f6f7', borderRadius: '18px', padding: '8px 12px', color: '#8d949e' }}>
                 Thêm bình luận...
               </div>
             </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
            {/* Fake Comment 1 */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <img src="https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?w=50&h=50&fit=crop" style={{ width: '36px', height: '36px', borderRadius: '50%' }} alt="User" />
              <div>
                <div style={{ backgroundColor: '#f0f2f5', borderRadius: '18px', padding: '8px 12px', display: 'inline-block' }}>
                  <span style={{ fontWeight: '600', color: '#385898', display: 'block', fontSize: '13px', cursor: 'pointer' }}>Trần Anh Tuấn</span>
                  <span style={{ fontSize: '14px' }}>Bảng so sánh này nhìn cuốn đấy, dễ dàng thấy máy nào thua khoản nào rõ rệt. Đỉnh!</span>
                </div>
                <div style={{ fontSize: '12px', color: '#65676b', display: 'flex', gap: '15px', marginTop: '3px', marginLeft: '12px' }}>
                  <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>Thích</span>
                  <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>Phản hồi</span>
                  <span>14 giờ trước</span>
                </div>
              </div>
            </div>

            {/* Fake Comment 2 */}
            <div style={{ display: 'flex', gap: '10px' }}>
              <img src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=50&h=50&fit=crop" style={{ width: '36px', height: '36px', borderRadius: '50%' }} alt="User" />
              <div>
                <div style={{ backgroundColor: '#f0f2f5', borderRadius: '18px', padding: '8px 12px', display: 'inline-block' }}>
                  <span style={{ fontWeight: '600', color: '#385898', display: 'block', fontSize: '13px', cursor: 'pointer' }}>Lê Ngọc Thảo</span>
                  <span style={{ fontSize: '14px' }}>So sánh cùng lúc 3 máy đúng là chân ái, đỡ phải bật nhiều tab như hồi coi mấy web khác.</span>
                </div>
                <div style={{ fontSize: '12px', color: '#65676b', display: 'flex', gap: '15px', marginTop: '3px', marginLeft: '12px' }}>
                  <span style={{ cursor: 'pointer', fontWeight: 'bold', color: '#3578e5' }}>Thích (5)</span>
                  <span style={{ cursor: 'pointer', fontWeight: 'bold' }}>Phản hồi</span>
                  <span>2 ngày trước</span>
                </div>
              </div>
            </div>
            
            <div style={{ marginTop: '10px', textAlign: 'center' }}>
              <button style={{ backgroundColor: 'transparent', border: 'none', color: '#385898', fontWeight: '600', cursor: 'pointer' }}>Tải thêm 26 bình luận</button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CompareSection;
