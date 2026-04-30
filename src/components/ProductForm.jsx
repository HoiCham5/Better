import React, { useState } from 'react';
import { Sparkles } from 'lucide-react';

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
      alert("Vui lòng nhập Tên sản phẩm trước khi cào dữ liệu!");
      return;
    }
    setIsThinking(true);
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/scrape?query=${encodeURIComponent(formData.name)}`);
      if (!res.ok) throw new Error("Không thể tìm thấy thông tin sản phẩm");
      const data = await res.json();
      
      setFormData(prev => ({
        ...prev,
        name: data.name || prev.name,
        brand: prev.brand || (prev.name.toLowerCase().includes('iphone') || prev.name.toLowerCase().includes('macbook') ? 'Apple' : 'Samsung'),
        price: data.price || prev.price,
        image: data.image || prev.image,
        specs: {
          screen: prev.specs.screen || '6.7 inch / 14 inch, 120Hz',
          brightness: prev.specs.brightness || '2000 nits đỉnh',
          chip: prev.specs.chip || 'Vi xử lý thế hệ mới mạnh mẽ',
          gpu: prev.specs.gpu || (prev.category === 'laptop' ? 'Đồ hoạ tích hợp cao cấp' : ''),
          ram: prev.specs.ram || '8 GB / 12 GB',
          storage: prev.specs.storage || '256 GB / 512 GB',
          camera: prev.specs.camera || 'Cụm camera đa ống kính sắc nét',
          cameraSelfie: prev.specs.cameraSelfie || (prev.category === 'phone' ? '12MP Selfie' : ''),
          battery: prev.specs.battery || 'Thời lượng tối thiểu 15 giờ liên tục',
          os: prev.specs.os || 'Hệ điều hành mới nhất',
          network: prev.specs.network || '5G / Wi-Fi 6E',
          weight: prev.specs.weight || 'Trọng lượng siêu nhẹ',
          materials: prev.specs.materials || 'Khung kim loại, mặt kính cao cấp',
          releaseDate: prev.specs.releaseDate || 'Năm 2024 / 2025',
          aiFeatures: prev.specs.aiFeatures || 'Hỗ trợ tính năng AI thông minh'
        }
      }));
    } catch (err) {
      alert("Lỗi Cào dữ liệu: " + err.message);
    } finally {
      setIsThinking(false);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    onSave({ ...formData, id: formData.id || `custom-${Date.now()}` });
  };

  return (
    <div className="product-form glass-panel animate-fade-in" style={{ padding: '20px', marginTop: '20px' }}>
      <h3>{product ? 'Chỉnh Sửa Sản Phẩm' : 'Thêm Sản Phẩm Mới'}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '15px' }}>
          <label>Danh mục: 
            <select name="category" value={formData.category} onChange={(e) => handleChange(e)} className="select-input" style={{ width: '100%', padding: '8px' }}>
              <option value="phone">Điện thoại</option>
              <option value="laptop">Laptop</option>
            </select>
          </label>
          <div style={{ display: 'flex', alignItems: 'flex-end', gap: '10px' }}>
            <label style={{ flex: 1 }}>Tên sản phẩm: 
              <input required name="name" value={formData.name} onChange={(e) => handleChange(e)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} />
            </label>
            <button type="button" onClick={handleAiFill} disabled={isThinking} className="btn" style={{ padding: '8px 15px', background: 'var(--gradient-accent)', color: 'white', border: 'none', borderRadius: '5px', display: 'flex', gap: '5px', alignItems: 'center', height: '35px' }}>
              {isThinking ? <Sparkles size={16} className="animate-spin" /> : <Sparkles size={16} />} 
              {isThinking ? 'Đang cào dữ liệu...' : 'Cào Dữ Liệu (Bot)'}
            </button>
          </div>
          <label>Thương hiệu: <input required name="brand" value={formData.brand} onChange={(e) => handleChange(e)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} /></label>
          <label>Giá (VNĐ): <input required name="price" value={formData.price} onChange={(e) => handleChange(e)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} /></label>
          <label>Link Ảnh URL: <input name="image" value={formData.image} onChange={(e) => handleChange(e)} style={{ width: '100%', padding: '8px', marginTop: '5px' }} /></label>
          <label>Shopee Link: <input value={formData.links.shopee} onChange={(e) => handleChange(e, 'links', 'shopee')} style={{ width: '100%', padding: '8px', marginTop: '5px' }} /></label>
          <label style={{ display: 'flex', alignItems: 'center', gap: '10px', marginTop: '10px', fontWeight: 'bold', color: 'var(--accent-primary)' }}>
            <input type="checkbox" name="isFeatured" checked={formData.isFeatured} onChange={(e) => handleChange(e)} style={{ width: '20px', height: '20px' }} />
            Đánh Dấu Sản Phẩm Nổi Bật
          </label>
        </div>

        <hr style={{ borderColor: 'var(--glass-border)', margin: '15px 0' }} />
        <h4>Cấu Hình (Specs)</h4>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '15px' }}>
          <label>Màn hình: <input value={formData.specs.screen} onChange={(e) => handleChange(e, 'specs', 'screen')} style={{ width: '100%' }} /></label>
          <label>Độ nhạy / Sáng: <input value={formData.specs.brightness} onChange={(e) => handleChange(e, 'specs', 'brightness')} style={{ width: '100%' }} /></label>
          <label>Chip / Vi xử lý: <input value={formData.specs.chip} onChange={(e) => handleChange(e, 'specs', 'chip')} style={{ width: '100%' }} /></label>
          {formData.category === 'laptop' && <label>GPU: <input value={formData.specs.gpu} onChange={(e) => handleChange(e, 'specs', 'gpu')} style={{ width: '100%' }} /></label>}
          <label>RAM: <input value={formData.specs.ram} onChange={(e) => handleChange(e, 'specs', 'ram')} style={{ width: '100%' }} /></label>
          <label>Bộ nhớ (Storage): <input value={formData.specs.storage} onChange={(e) => handleChange(e, 'specs', 'storage')} style={{ width: '100%' }} /></label>
          <label>Camera (Chính): <input value={formData.specs.camera} onChange={(e) => handleChange(e, 'specs', 'camera')} style={{ width: '100%' }} /></label>
          {formData.category === 'phone' && <label>Camera Selfie: <input value={formData.specs.cameraSelfie} onChange={(e) => handleChange(e, 'specs', 'cameraSelfie')} style={{ width: '100%' }} /></label>}
          <label>Pin & Sạc: <input value={formData.specs.battery} onChange={(e) => handleChange(e, 'specs', 'battery')} style={{ width: '100%' }} /></label>
          <label>Trọng lượng: <input value={formData.specs.weight} onChange={(e) => handleChange(e, 'specs', 'weight')} style={{ width: '100%' }} /></label>
          <label>Hệ điều hành: <input value={formData.specs.os} onChange={(e) => handleChange(e, 'specs', 'os')} style={{ width: '100%' }} /></label>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" className="btn bg-accent-primary" style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>Lưu Sản Phẩm</button>
          <button type="button" onClick={onCancel} style={{ padding: '10px 20px', background: 'gray', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>Huỷ</button>
        </div>
      </form>
    </div>
  );
};

export default ProductForm;
