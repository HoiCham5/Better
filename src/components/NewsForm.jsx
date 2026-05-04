import React, { useState } from 'react';
import { Save, X, Type, Image as ImageIcon, AlignLeft, Calendar } from 'lucide-react';
import { proxyImage } from '../utils/imageProxy';

const NewsForm = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    post || {
      title: '',
      summary: '',
      content: '',
      image: '',
      date: new Date().toLocaleDateString('vi-VN')
    }
  );

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: formData.id || `news-${Date.now()}` });
  };

  return (
    <div className="product-form animate-fade-in" style={{ padding: '0', marginTop: '10px' }}>
      <div style={{ background: 'var(--vs-surface)', padding: '40px', borderRadius: '24px', border: '1px solid var(--vs-border)', boxShadow: '0 10px 40px rgba(0,0,0,0.15)' }}>
        
        <h3 style={{ fontSize: '2rem', marginBottom: '30px', display: 'flex', alignItems: 'center', gap: '15px', color: 'var(--vs-text-primary)', fontWeight: 800 }}>
          <div style={{ background: 'var(--gradient-accent)', padding: '10px', borderRadius: '12px', display: 'flex' }}>
            <AlignLeft color="white" size={28} />
          </div>
          {post ? 'Chỉnh Sửa Bài Viết' : 'Soạn Bài Viết Mới'}
        </h3>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '30px' }}>
            {/* Cột trái: Thông tin cơ bản */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--vs-text-secondary)', marginBottom: '10px' }}>
                  <Type size={18} /> Tiêu đề bài viết
                </label>
                <input 
                  required 
                  name="title" 
                  value={formData.title} 
                  onChange={handleChange} 
                  placeholder="Nhập tiêu đề hấp dẫn..."
                  style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '2px solid var(--vs-border)', background: 'var(--bg-secondary)', color: 'var(--vs-text-primary)', fontSize: '1.05rem', transition: 'border-color 0.2s', fontWeight: 600 }} 
                />
              </div>

              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--vs-text-secondary)', marginBottom: '10px' }}>
                  <Calendar size={18} /> Ngày cập nhật
                </label>
                <input 
                  required 
                  name="date" 
                  value={formData.date} 
                  onChange={handleChange} 
                  placeholder="DD/MM/YYYY"
                  style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '2px solid var(--vs-border)', background: 'var(--bg-secondary)', color: 'var(--vs-text-primary)', fontSize: '1rem' }} 
                />
              </div>

              <div style={{ flex: 1, display: 'flex', flexDirection: 'column' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--vs-text-secondary)', marginBottom: '10px' }}>
                  <AlignLeft size={18} /> Tóm tắt ngắn gọn
                </label>
                <textarea 
                  required 
                  name="summary" 
                  value={formData.summary} 
                  onChange={handleChange} 
                  placeholder="Một đoạn ngắn 2-3 câu tóm tắt nội dung chính để hiển thị bên ngoài danh sách..."
                  style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '2px solid var(--vs-border)', background: 'var(--bg-secondary)', color: 'var(--vs-text-primary)', fontSize: '1rem', flex: 1, minHeight: '120px', fontFamily: 'inherit', resize: 'vertical', lineHeight: '1.5' }} 
                />
              </div>
            </div>

            {/* Cột phải: Ảnh Cover */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              <div>
                <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.95rem', fontWeight: 'bold', color: 'var(--vs-text-secondary)', marginBottom: '10px' }}>
                  <ImageIcon size={18} /> Link Ảnh Bìa (Cover URL)
                </label>
                <input 
                  required 
                  name="image" 
                  value={formData.image} 
                  onChange={handleChange} 
                  placeholder="https://..."
                  style={{ width: '100%', padding: '15px 20px', borderRadius: '12px', border: '2px solid var(--vs-border)', background: 'var(--bg-secondary)', color: 'var(--vs-text-primary)', fontSize: '1rem' }} 
                />
              </div>

              <div style={{ 
                flex: 1, border: '2px dashed var(--vs-border)', borderRadius: '16px', overflow: 'hidden', 
                background: 'var(--bg-secondary)', display: 'flex', alignItems: 'center', justifyContent: 'center',
                position: 'relative', minHeight: '250px'
              }}>
                {formData.image ? (
                  <img 
                    src={proxyImage(formData.image)} 
                    alt="Preview" 
                    style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0 }} 
                    onError={(e) => { e.target.style.display = 'none'; e.target.nextSibling.style.display = 'flex'; }}
                  />
                ) : null}
                <div style={{ display: formData.image ? 'none' : 'flex', flexDirection: 'column', alignItems: 'center', gap: '15px', color: 'var(--vs-text-secondary)', padding: '20px', textAlign: 'center' }}>
                  <ImageIcon size={50} style={{ opacity: 0.3 }} />
                  <span>Dán link URL vào ô phía trên để xem trước ảnh bìa tại đây</span>
                </div>
              </div>
            </div>
          </div>

          <hr style={{ border: 'none', borderTop: '1px solid var(--glass-border)', margin: '10px 0' }} />

          {/* Nội dung chi tiết */}
          <div>
            <label style={{ display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem', fontWeight: 'bold', color: 'var(--vs-text-primary)', marginBottom: '10px' }}>
              <AlignLeft className="text-accent-secondary" size={24} /> Nội dung bài viết chi tiết
            </label>
            <p style={{ fontSize: '0.95rem', color: 'var(--vs-text-secondary)', marginBottom: '15px', display: 'inline-block', background: 'var(--bg-secondary)', padding: '8px 15px', borderRadius: '8px', border: '1px solid var(--vs-border)' }}>
              💡 <strong>Mẹo:</strong> Nhấn Enter 2 lần (cách ra 1 dòng trống) để phân chia thành các đoạn văn.
            </p>
            <textarea 
              required 
              name="content" 
              value={formData.content} 
              onChange={handleChange} 
              placeholder="Nhập nội dung đầy đủ của bài viết vào đây..."
              style={{ width: '100%', padding: '25px', borderRadius: '16px', border: '2px solid var(--vs-border)', background: 'var(--bg-secondary)', color: 'var(--vs-text-primary)', fontSize: '1.1rem', lineHeight: '1.8', minHeight: '400px', fontFamily: 'inherit', resize: 'vertical' }} 
            />
          </div>

          <div style={{ display: 'flex', gap: '20px', marginTop: '10px', justifyContent: 'flex-end', borderTop: '1px solid var(--glass-border)', paddingTop: '25px' }}>
            <button type="button" onClick={onCancel} className="btn hover-focus-btn" style={{ padding: '14px 30px', background: 'var(--bg-secondary)', border: '2px solid var(--vs-border)', borderRadius: '12px', color: 'var(--vs-text-primary)', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '1.05rem' }}>
              <X size={20} /> Huỷ Bỏ
            </button>
            <button type="submit" className="btn hover-lift" style={{ padding: '14px 45px', background: 'var(--gradient-accent)', border: 'none', borderRadius: '12px', color: 'white', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '10px', fontWeight: 'bold', fontSize: '1.05rem', boxShadow: '0 10px 25px rgba(130, 36, 227, 0.4)' }}>
              <Save size={20} /> Lưu Bài Viết
            </button>
          </div>

        </form>
      </div>
    </div>
  );
};

export default NewsForm;
