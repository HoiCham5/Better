import React, { useState } from 'react';

const NewsForm = ({ post, onSave, onCancel }) => {
  const [formData, setFormData] = useState(
    post || {
      title: '',
      summary: '',
      content: '',
      image: '',
      date: new Date().toLocaleDateString()
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
    <div className="product-form glass-panel animate-fade-in" style={{ padding: '20px', marginTop: '20px' }}>
      <h3>{post ? 'Chỉnh Sửa Bài Viết' : 'Thêm Bài Viết Mới'}</h3>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <label>Tiêu đề bài viết: <input required name="title" value={formData.title} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} /></label>
          <label>Link Ảnh Cover URL: <input required name="image" value={formData.image} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px' }} /></label>
          <label>Tóm tắt ngắn gọn: <textarea required name="summary" value={formData.summary} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '80px', fontFamily: 'inherit' }} /></label>
          <label>Nội dung chi tiết (Mỗi đoạn cách nhau một dòng): 
            <textarea required name="content" value={formData.content} onChange={handleChange} style={{ width: '100%', padding: '8px', marginTop: '5px', minHeight: '200px', fontFamily: 'inherit' }} />
          </label>
        </div>

        <div style={{ display: 'flex', gap: '10px', marginTop: '20px' }}>
          <button type="submit" className="btn bg-accent-primary" style={{ padding: '10px 20px', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>Lưu Bài Viết</button>
          <button type="button" onClick={onCancel} style={{ padding: '10px 20px', background: 'gray', border: 'none', borderRadius: '5px', color: 'white', cursor: 'pointer' }}>Huỷ</button>
        </div>
      </form>
    </div>
  );
};

export default NewsForm;
