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
              {isThinking ? 'Đang suy nghĩ...' : '✨ Sinh Dữ Liệu (AI)'}
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
