import React, { useState } from 'react';
import { Sparkles, Save, X, Image as ImageIcon, Link, Settings } from 'lucide-react';

const ProductForm = ({ product, onSave, onCancel }) => {
  const [isThinking, setIsThinking] = useState(false);
  const [formData, setFormData] = useState(
    product || {
      category: 'phone',
      name: '',
      brand: '',
      price: '',
      image: '',
      isFeatured: false,
      links: { shopee: '', tiktok: '' },
      specs: {
        screen: '',
        brightness: '',
        chip: '',
        gpu: '',
        ram: '',
        storage: '',
        camera: '',
        cameraSelfie: '',
        battery: '',
        os: '',
        network: '',
        weight: '',
        materials: '',
        releaseDate: '',
        aiFeatures: ''
      }
    }
  );

  const handleChange = (e, section, field) => {
    if (section === 'specs') {
      setFormData(prev => ({
        ...prev,
        specs: { ...prev.specs, [field]: e.target.value }
      }));
    } else if (section === 'links') {
      setFormData(prev => ({
        ...prev,
        links: { ...prev.links, [field]: e.target.value }
      }));
    } else if (e.target.type === 'checkbox') {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.checked }));
    } else {
      setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
    }
  };

  const handleAiFill = async () => {
    if (!formData.name) {
      alert("Vui lòng nhập Tên sản phẩm trước khi sinh dữ liệu!");
      return;
    }
    setIsThinking(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/scrape?query=${encodeURIComponent(formData.name)}`);
      if (!res.ok) throw new Error("Không thể kết nối với AI Server");
      const data = await res.json();
      
      setFormData(prev => ({
        ...prev,
        name: data.name || prev.name,
        brand: data.brand || prev.brand,
        price: data.price || prev.price,
        image: data.image || prev.image,
        specs: {
          screen: data.specs?.screen || prev.specs.screen,
          brightness: data.specs?.brightness || prev.specs.brightness,
          chip: data.specs?.chip || prev.specs.chip,
          gpu: data.specs?.gpu || prev.specs.gpu,
          ram: data.specs?.ram || prev.specs.ram,
          storage: data.specs?.storage || prev.specs.storage,
          camera: data.specs?.camera || prev.specs.camera,
          cameraSelfie: data.specs?.cameraSelfie || prev.specs.cameraSelfie,
          battery: data.specs?.battery || prev.specs.battery,
          os: data.specs?.os || prev.specs.os,
          network: data.specs?.network || prev.specs.network,
          weight: data.specs?.weight || prev.specs.weight,
          materials: data.specs?.materials || prev.specs.materials,
          releaseDate: data.specs?.releaseDate || prev.specs.releaseDate,
          aiFeatures: data.specs?.aiFeatures || prev.specs.aiFeatures
        }
      }));
    } catch (err) {
      alert("Lỗi AI: " + err.message);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: formData.id || `custom-${Date.now()}` });
  };

  return (
    <div className="product-form glass-panel animate-fade-in" style={{ padding: '30px', borderRadius: '16px', background: 'var(--vs-surface)', border: '1px solid var(--vs-border)', boxShadow: 'var(--vs-card-shadow)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '25px', paddingBottom: '15px', borderBottom: '1px solid var(--vs-border)' }}>
        <h3 style={{ margin: 0, fontSize: '1.4rem' }}>{product ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h3>
        <button type="button" className="btn hover-focus-btn" onClick={onCancel} style={{ background: 'rgba(255,255,255,0.05)', color: 'var(--vs-text-secondary)', border: 'none', padding: '8px', borderRadius: '50%' }}>
          <X size={20} />
        </button>
      </div>

      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
        
        {/* THÔNG TIN CƠ BẢN */}
        <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--vs-border)' }}>
          <h4 style={{ marginBottom: '15px', color: 'var(--vs-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <ImageIcon size={18} className="text-accent-primary" /> Thông Tin Cơ Bản
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px', alignItems: 'end' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--vs-text-secondary)' }}>Danh mục:</label>
              <select name="category" value={formData.category} onChange={(e) => handleChange(e)} className="select-input" style={{ width: '100%', padding: '12px', borderRadius: '8px', border: '1px solid var(--vs-border)' }}>
                <option value="phone">Điện thoại</option>
                <option value="laptop">Laptop</option>
              </select>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--vs-text-secondary)' }}>Tên sản phẩm:</label>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input required name="name" className="select-input" value={formData.name} onChange={(e) => handleChange(e)} style={{ flex: 1, padding: '12px', borderRadius: '8px', border: '1px solid var(--vs-border)' }} placeholder="VD: iPhone 15 Pro Max" />
                <button type="button" onClick={handleAiFill} disabled={isThinking} className="btn hover-lift" style={{ padding: '0 20px', background: 'var(--gradient-accent)', color: 'white', border: 'none', borderRadius: '8px', display: 'flex', gap: '8px', alignItems: 'center', fontWeight: 'bold', whiteSpace: 'nowrap' }}>
                  {isThinking ? <Sparkles size={18} className="animate-spin" /> : <Sparkles size={18} />} 
                  {isThinking ? 'Đang Tự Động Điền...' : 'Sinh Dữ Liệu (AI)'}
                </button>
              </div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginTop: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--vs-text-secondary)' }}>Thương hiệu:</label>
              <input required name="brand" className="select-input" value={formData.brand} onChange={(e) => handleChange(e)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--vs-border)' }} placeholder="VD: Apple" />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--vs-text-secondary)' }}>Giá bán (VNĐ):</label>
              <input required name="price" className="select-input" value={formData.price} onChange={(e) => handleChange(e)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--vs-border)' }} placeholder="VD: 29,990,000 ₫" />
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '5px', marginTop: '15px' }}>
            <label style={{ fontSize: '0.9rem', color: 'var(--vs-text-secondary)' }}>Link Ảnh Sản Phẩm (URL):</label>
            <input name="image" className="select-input" value={formData.image} onChange={(e) => handleChange(e)} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--vs-border)' }} placeholder="https://..." />
          </div>

          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '20px', padding: '15px', background: 'rgba(245, 158, 11, 0.1)', borderRadius: '8px', border: '1px solid rgba(245, 158, 11, 0.3)', cursor: 'pointer' }}>
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={(e) => handleChange(e)} style={{ width: '18px', height: '18px', accentColor: '#f59e0b' }} />
            <span style={{ fontWeight: 'bold', color: '#f59e0b' }}>⭐ Đánh Dấu Là Sản Phẩm Nổi Bật (Sẽ hiển thị trang chủ)</span>
          </label>
        </div>

        {/* LIÊN KẾT MUA HÀNG */}
        <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--vs-border)' }}>
          <h4 style={{ marginBottom: '15px', color: 'var(--vs-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Link size={18} className="text-accent-secondary" /> Liên Kết Mua Hàng
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--vs-text-secondary)' }}>Shopee Affiliate Link:</label>
              <input className="select-input" value={formData.links?.shopee || ''} onChange={(e) => handleChange(e, 'links', 'shopee')} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--vs-border)' }} placeholder="https://shopee.vn/..." />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.9rem', color: 'var(--vs-text-secondary)' }}>TikTok Shop Link:</label>
              <input className="select-input" value={formData.links?.tiktok || ''} onChange={(e) => handleChange(e, 'links', 'tiktok')} style={{ padding: '12px', borderRadius: '8px', border: '1px solid var(--vs-border)' }} placeholder="https://tiktok.com/..." />
            </div>
          </div>
        </div>

        {/* CẤU HÌNH KỸ THUẬT */}
        <div style={{ background: 'var(--bg-primary)', padding: '20px', borderRadius: '12px', border: '1px solid var(--vs-border)' }}>
          <h4 style={{ marginBottom: '15px', color: 'var(--vs-text-primary)', display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Settings size={18} style={{ color: '#ec4899' }} /> Cấu Hình Kỹ Thuật (Specs)
          </h4>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))', gap: '15px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)' }}>Màn hình:</label>
              <input className="select-input" value={formData.specs.screen} onChange={(e) => handleChange(e, 'specs', 'screen')} style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--vs-border)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)' }}>Độ sáng tối đa:</label>
              <input className="select-input" value={formData.specs.brightness} onChange={(e) => handleChange(e, 'specs', 'brightness')} style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--vs-border)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)' }}>Chip xử lý:</label>
              <input className="select-input" value={formData.specs.chip} onChange={(e) => handleChange(e, 'specs', 'chip')} style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--vs-border)' }} />
            </div>
            {formData.category === 'laptop' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)' }}>Card đồ hoạ (GPU):</label>
                <input className="select-input" value={formData.specs.gpu} onChange={(e) => handleChange(e, 'specs', 'gpu')} style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--vs-border)' }} />
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)' }}>Dung lượng RAM:</label>
              <input className="select-input" value={formData.specs.ram} onChange={(e) => handleChange(e, 'specs', 'ram')} style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--vs-border)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)' }}>Bộ nhớ trong:</label>
              <input className="select-input" value={formData.specs.storage} onChange={(e) => handleChange(e, 'specs', 'storage')} style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--vs-border)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)' }}>Camera chính:</label>
              <input className="select-input" value={formData.specs.camera} onChange={(e) => handleChange(e, 'specs', 'camera')} style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--vs-border)' }} />
            </div>
            {formData.category === 'phone' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
                <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)' }}>Camera Selfie:</label>
                <input className="select-input" value={formData.specs.cameraSelfie} onChange={(e) => handleChange(e, 'specs', 'cameraSelfie')} style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--vs-border)' }} />
              </div>
            )}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)' }}>Pin & Sạc:</label>
              <input className="select-input" value={formData.specs.battery} onChange={(e) => handleChange(e, 'specs', 'battery')} style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--vs-border)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)' }}>Trọng lượng:</label>
              <input className="select-input" value={formData.specs.weight} onChange={(e) => handleChange(e, 'specs', 'weight')} style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--vs-border)' }} />
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '5px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)' }}>Hệ điều hành:</label>
              <input className="select-input" value={formData.specs.os} onChange={(e) => handleChange(e, 'specs', 'os')} style={{ padding: '10px', borderRadius: '6px', border: '1px solid var(--vs-border)' }} />
            </div>
          </div>
        </div>

        {/* NÚT LƯU */}
        <div style={{ display: 'flex', gap: '15px', marginTop: '10px', justifyContent: 'flex-end', paddingTop: '20px', borderTop: '1px solid var(--vs-border)' }}>
          <button type="button" className="btn hover-focus-btn" onClick={onCancel} style={{ padding: '12px 25px', background: 'var(--vs-surface)', border: '1px solid var(--vs-border)', borderRadius: '8px', color: 'var(--vs-text-primary)', fontWeight: 'bold' }}>
            Huỷ Bỏ
          </button>
          <button type="submit" className="btn btn-primary hover-lift" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '12px 30px', border: 'none', borderRadius: '8px', color: 'white', fontWeight: 'bold' }}>
            <Save size={18} /> Lưu Sản Phẩm
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
