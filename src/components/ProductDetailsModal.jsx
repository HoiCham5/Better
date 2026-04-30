import React, { useMemo } from 'react';
import { X, TrendingDown, Store, ExternalLink, PlayCircle, Sparkles, AlertCircle } from 'lucide-react';
import { ResponsiveContainer, LineChart, Line, CartesianGrid, XAxis, YAxis, Tooltip as RechartsTooltip } from 'recharts';
import CommentSection from './CommentSection';

const ProductDetailsModal = ({ product, onClose }) => {
  if (!product) return null;

  // Xử lý giá hiện tại sang dạng Number để vạch đồ thị (VD: "34,990,000 ₫" -> 34990000)
  const basePrice = parseInt(product.price.replace(/[^\d]/g, '')) || 20000000;

  // Sinh data lịch sử giá "giả lập" 6 tháng qua
  const priceHistory = useMemo(() => {
    const months = ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6'];
    let current = Math.floor(basePrice * 1.15); // Bắt đầu cao hơn 15%
    return months.map(m => {
      const drop = Math.floor(Math.random() * (basePrice * 0.05)); // Rớt max 5% mỗi tháng
      current = current - drop;
      return { month: m, 'Giá Bán (VNĐ)': current };
    });
  }, [basePrice]);
  
  // Sửa điểm cuối cùng cho khớp giá hiện tại
  priceHistory[5]['Giá Bán (VNĐ)'] = basePrice;

  // Sinh giá Đa Shop
  const shops = [
    { name: 'Shopee Mall', price: basePrice - 500000, tag: 'Flash Sale', color: '#ee4d2d', link: product.links?.shopee || '#' },
    { name: 'TikTok Shop', price: basePrice - 200000, tag: 'Freeship Max', color: '#25F4EE', link: product.links?.tiktok || '#' }
  ];

  // Video Demo tuỳ theo Phân loại
  const videoUrls = {
    phone: 'https://www.youtube.com/embed/S26A-0yS2bA', // Ví dụ video iPhone/Samsung
    laptop: 'https://www.youtube.com/embed/5mZ5I2Knt4o'
  };

  const formatCurrency = (val) => new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(val);

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.85)', backdropFilter: 'blur(10px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999,
      padding: '20px'
    }}>
      <div className="glass-panel animate-fade-in" style={{ 
        width: '100%', maxWidth: '1000px', maxHeight: '90vh', overflowY: 'auto',
        position: 'relative', borderRadius: '20px', padding: '0', display: 'flex', flexDirection: 'column'
      }}>
        {/* Sticky Header */}
        <div style={{ position: 'sticky', top: 0, background: 'var(--bg-primary)', padding: '20px 30px', borderBottom: '1px solid var(--glass-border)', display: 'flex', justifyContent: 'space-between', alignItems: 'center', zIndex: 10 }}>
          <h2 style={{ fontSize: '1.8rem', display: 'flex', alignItems: 'center', gap: '15px' }}>
            {product.brand} {product.name}
            {product.isFeatured && <span className="badge" style={{ background: 'var(--gradient-accent)', color: 'white', border: 'none', fontSize: '1rem', padding: '5px 10px' }}>Nổi Bật ✨</span>}
          </h2>
          <button className="close-btn hover-focus-btn" onClick={onClose} style={{ background: 'var(--vs-border)', border: 'none', color: 'var(--vs-text-primary)', cursor: 'pointer', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <X size={20} />
          </button>
        </div>

        <div style={{ padding: '30px', display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: '40px' }}>
          
          {/* CỘT TRÁI: Video & Shop */}
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <Store className="text-accent-primary" /> Mua Ở Đâu Tốt Nhất?
            </h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', marginBottom: '40px' }}>
              {shops.map(shop => (
                <div key={shop.name} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '15px', background: 'var(--bg-secondary)', borderRadius: '12px', borderLeft: `4px solid ${shop.color}` }}>
                  <div>
                    <h4 style={{ fontSize: '1.1rem', marginBottom: '5px' }}>{shop.name}</h4>
                    <span style={{ fontSize: '0.8rem', padding: '3px 8px', background: 'rgba(255,255,255,0.1)', borderRadius: '15px' }}>{shop.tag}</span>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--text-primary)' }}>{formatCurrency(shop.price)}</div>
                    <a href={shop.link} target="_blank" rel="noopener noreferrer" style={{ marginTop: '5px', display: 'inline-block', background: 'transparent', color: shop.color, border: 'none', cursor: 'pointer', fontSize: '0.9rem', fontWeight: 'bold', textDecoration: 'none' }}>Tới cửa hàng ↗</a>
                  </div>
                </div>
              ))}
            </div>

            <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <PlayCircle className="text-[#ff0000]" /> Review Thực Tế (YouTube)
            </h3>
            <div style={{ position: 'relative', paddingBottom: '56.25%', height: 0, overflow: 'hidden', borderRadius: '15px', border: '1px solid var(--glass-border)' }}>
              <iframe 
                style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%' }}
                src={videoUrls[product.category]} 
                title="YouTube video player" 
                frameBorder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" 
                allowFullScreen
              ></iframe>
            </div>
            
            <div style={{ marginTop: '20px', padding: '20px', background: 'rgba(59, 130, 246, 0.05)', border: '1px solid rgba(59, 130, 246, 0.2)', borderRadius: '15px' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--accent-primary)', marginBottom: '10px' }}>
                <Sparkles size={18} /> AI Tóm Tắt Nhanh Video Tuần Này
              </h4>
              <ul style={{ paddingLeft: '20px', lineHeight: '1.8', color: 'var(--text-secondary)' }}>
                 <li><strong>Điểm cộng lớn nhất:</strong> Thiết bị có chất lượng hoàn thiện tuyệt hảo, {product.specs.screen} hiển thị nội dung media vô cùng chân thực và sắc nét.</li>
                 <li><strong>Đáng chú ý:</strong> Khả năng đa nhiệm vượt trội nhờ chip {product.specs.chip}. Hiệu suất không sụt giảm dù chơi game liên tục.</li>
                 <li><strong>Điểm trừ nhẹ:</strong> Thiết kế chưa có nhiều đột phá so với thế hệ tiền nhiệm, mức giá ở thời điểm ra mắt còn khá cao.</li>
              </ul>
            </div>
          </div>

          {/* CỘT PHẢI: Lịch Sử Giá & Nhắc nhở */}
          <div>
            <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '10px' }}>
              <TrendingDown className="text-accent-secondary" /> Lịch Sử Giảm Giá (6 Tháng Qua)
            </h3>
            <div style={{ height: '350px', background: 'var(--bg-secondary)', padding: '20px', borderRadius: '15px', marginBottom: '30px' }}>
               <ResponsiveContainer width="100%" height="100%">
                 <LineChart data={priceHistory}>
                   <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.1)" />
                   <XAxis dataKey="month" stroke="var(--text-secondary)" />
                   <YAxis tickFormatter={(val) => `${(val / 1000000).toFixed(1).replace(/\\.0$/, '')}Tr`} stroke="var(--text-secondary)" domain={[(dataMin) => Math.floor(dataMin - 1000000), (dataMax) => Math.ceil(dataMax + 1000000)]} />
                   <RechartsTooltip 
                      formatter={(val) => formatCurrency(val)}
                      contentStyle={{ background: 'var(--bg-primary)', border: '1px solid var(--glass-border)', borderRadius: '8px' }}
                   />
                   <Line type="monotone" dataKey="Giá Bán (VNĐ)" stroke="var(--gradient-accent)" strokeWidth={4} dot={{ r: 6, fill: 'var(--bg-primary)', strokeWidth: 2 }} activeDot={{ r: 8 }} />
                 </LineChart>
               </ResponsiveContainer>
            </div>

            <div style={{ padding: '20px', background: 'rgba(245, 158, 11, 0.1)', borderLeft: '4px solid #f59e0b', borderRadius: '12px' }}>
              <h4 style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#f59e0b', marginBottom: '10px' }}>
                <AlertCircle size={20} /> Dự báo Của Chuyên Gia Mua Sắm
              </h4>
              <p style={{ color: 'var(--text-secondary)', lineHeight: '1.6' }}>
                Biểu đồ cho thấy giá của <strong>{product.name}</strong> đang nằm ở vùng <strong>Tốt Nhất</strong> trong chu kì nửa năm. Nếu bạn cần ngay bây giờ, Shopee Mall đang đưa ra cơ hội rẻ nhất. Nếu vẫn chưa gấp, khả năng sẽ có thêm đợt Flash Sale giảm sâu vào đợt siêu sale sắp tới!
              </p>
            </div>
          </div>
          
        </div>

        {/* Comment Section (Full Width Bottom) */}
        <div style={{ padding: '0 30px 40px 30px' }}>
          <CommentSection productId={product.id} />
        </div>
      </div>
      
      <style>{`
        @media (max-width: 900px) {
          .glass-panel { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </div>
  );
};

export default ProductDetailsModal;
