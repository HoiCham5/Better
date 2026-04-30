import React, { useState, useEffect } from 'react';
import ProductForm from './ProductForm';
import NewsForm from './NewsForm';

const AdminPanel = ({ products, setProducts, posts, setPosts }) => {
  const [isAdmin, setIsAdmin] = useState(false);
  const [password, setPassword] = useState('');
  const [adminTab, setAdminTab] = useState('products');
  
  // Product state
  const [editingProduct, setEditingProduct] = useState(null);
  const [isAddingProduct, setIsAddingProduct] = useState(false);

  // News state
  const [editingPost, setEditingPost] = useState(null);
  const [isAddingPost, setIsAddingPost] = useState(false);

  useEffect(() => {
    const savedAdminStatus = localStorage.getItem('isAdmin');
    if (savedAdminStatus === 'true') {
      setIsAdmin(true);
    }
  }, []);

  const handleLogin = (e) => {
    e.preventDefault();
    if (password === 'admin123') {
      setIsAdmin(true);
      localStorage.setItem('isAdmin', 'true');
    } else {
      alert('Mật khẩu không đúng!');
    }
  };

  const handleLogout = () => {
    setIsAdmin(false);
    localStorage.removeItem('isAdmin');
  };

  // CRUD cho Sản phẩm
  const handleSaveProduct = async (productData) => {
    try {
      const pid = productData.id || Date.now().toString();
      const updatedData = { ...productData, id: pid };
      
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        setIsAddingProduct(false);
        setEditingProduct(null);
        // Thay vì chờ onSnapshot, ta có thể chủ động báo user refresh hoặc tự cập nhật state:
        alert("Thành công! Hãy tải lại trang để thấy kết quả (Vì chúng ta đã tháo Firebase OnSnapshot).");
      }
    } catch (error) {
      alert("Lỗi khi lưu Sản phẩm: " + error.message);
    }
  };

  const handleDeleteProduct = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá sản phẩm này?')) {
      try {
        await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/products/${id}`, { method: 'DELETE' });
        alert("Xóa thành công! Khách hàng sẽ thấy khi tải lại trang.");
      } catch (error) {
        alert("Lỗi: " + error.message);
      }
    }
  };

  // CRUD cho Bài viết
  const handleSavePost = async (postData) => {
    try {
      const pid = postData.id || Date.now().toString();
      const updatedData = { ...postData, id: pid };
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/posts`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(updatedData)
      });
      if (res.ok) {
        setIsAddingPost(false);
        setEditingPost(null);
        alert("Lưu Bài viết Thành công!");
      }
    } catch (error) {
       alert("Lỗi khi lưu Bài viết: " + error.message);
    }
  };

  const handleDeletePost = async (id) => {
    if (window.confirm('Bạn có chắc chắn muốn xoá bài viết này?')) {
       try {
         await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/posts/${id}`, { method: 'DELETE' });
         alert("Đã Xoá Bài Viết");
       } catch (error) {
         alert("Lỗi: " + error.message);
       }
    }
  };

  if (!isAdmin) {
    return (
      <div className="admin-login glass-panel container animate-fade-in" style={{ padding: '40px', maxWidth: '400px', margin: '40px auto', textAlign: 'center' }}>
        <h2>Đăng Nhập Quản Trị</h2>
        <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '15px', marginTop: '20px' }}>
          <input 
            type="password" 
            placeholder="Nhập mật khẩu (admin123)" 
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            style={{ padding: '10px', borderRadius: '5px', border: '1px solid var(--glass-border)' }}
          />
          <button type="submit" className="btn bg-accent-primary" style={{ padding: '10px', borderRadius: '25px', color: 'white', fontWeight: 'bold' }}>
            Đăng Nhập
          </button>
        </form>
      </div>
    );
  }

  return (
    <div className="admin-dashboard container animate-fade-in" style={{ marginTop: '20px' }}>
      <div style={{ display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '20px' }}>
        <button onClick={() => setAdminTab('products')} className={`btn ${adminTab === 'products' ? 'bg-accent-primary' : ''}`} style={{ padding: '8px 20px', borderRadius: '25px', color: adminTab === 'products' ? 'white' : 'var(--text-secondary)', background: adminTab === 'products' ? 'var(--gradient-accent)' : 'transparent', border: '1px solid var(--glass-border)' }}>Thống Kê Sản Phẩm</button>
        <button onClick={() => setAdminTab('news')} className={`btn ${adminTab === 'news' ? 'bg-accent-primary' : ''}`} style={{ padding: '8px 20px', borderRadius: '25px', color: adminTab === 'news' ? 'white' : 'var(--text-secondary)', background: adminTab === 'news' ? 'var(--gradient-accent)' : 'transparent', border: '1px solid var(--glass-border)' }}>Quản Lý Bài Viết</button>
      </div>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <h2>{adminTab === 'products' ? 'Danh Sách Thiết Bị' : 'Danh Sách Thu Tức'}</h2>
        <div>
          {adminTab === 'products' ? (
            <button onClick={() => { setIsAddingProduct(true); setEditingProduct(null); }} className="btn bg-accent-primary" style={{ marginRight: '10px', padding: '8px 15px', borderRadius: '5px' }}>+ Thêm Sản Phẩm Mới</button>
          ) : (
            <button onClick={() => { setIsAddingPost(true); setEditingPost(null); }} className="btn bg-accent-primary" style={{ marginRight: '10px', padding: '8px 15px', borderRadius: '5px' }}>+ Thêm Bài Viết Mới</button>
          )}
          <button onClick={handleLogout} className="btn" style={{ padding: '8px 15px', background: 'var(--bg-secondary)', borderRadius: '5px', color: 'var(--text-primary)' }}>Đăng Xuất</button>
        </div>
      </div>

      {adminTab === 'products' && (
        <>
          {(isAddingProduct || editingProduct) && (
            <ProductForm 
              product={editingProduct} 
              onSave={handleSaveProduct} 
              onCancel={() => { setIsAddingProduct(false); setEditingProduct(null); }} 
            />
          )}

          {!isAddingProduct && !editingProduct && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: '30px', marginTop: '20px' }}>
          <div className="glass-panel" style={{ overflowX: 'auto' }}>
            <h3 style={{ padding: '15px' }}>📱 Điện Thoại</h3>
            <table className="compare-table" style={{ width: '100%', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Giá Bán</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {products.filter(p => p.category === 'phone').map(p => (
                  <tr key={p.id}>
                    <td><img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                    <td>{p.brand} {p.name}</td>
                    <td>{p.price}</td>
                    <td>
                      <button onClick={() => setEditingProduct(p)} style={{ padding: '5px 10px', marginRight: '5px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--text-primary)', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Sửa</button>
                      <button onClick={() => handleDeleteProduct(p.id)} style={{ padding: '5px 10px', background: 'rgba(239, 68, 68, 0.2)', color: 'var(--text-primary)', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Xoá</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="glass-panel" style={{ overflowX: 'auto' }}>
            <h3 style={{ padding: '15px' }}>💻 Laptop</h3>
            <table className="compare-table" style={{ width: '100%', textAlign: 'left' }}>
              <thead>
                <tr>
                  <th>Ảnh</th>
                  <th>Tên Sản Phẩm</th>
                  <th>Giá Bán</th>
                  <th>Hành Động</th>
                </tr>
              </thead>
              <tbody>
                {products.filter(p => p.category === 'laptop').map(p => (
                  <tr key={p.id}>
                    <td><img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'cover', borderRadius: '5px' }} /></td>
                    <td>{p.brand} {p.name}</td>
                    <td>{p.price}</td>
                    <td>
                      <button onClick={() => setEditingProduct(p)} style={{ padding: '5px 10px', marginRight: '5px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--text-primary)', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Sửa</button>
                      <button onClick={() => handleDeleteProduct(p.id)} style={{ padding: '5px 10px', background: 'rgba(239, 68, 68, 0.2)', color: 'var(--text-primary)', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Xoá</button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
          )}
        </>
      )}

      {adminTab === 'news' && (
        <>
          {(isAddingPost || editingPost) && (
            <NewsForm 
              post={editingPost} 
              onSave={handleSavePost} 
              onCancel={() => { setIsAddingPost(false); setEditingPost(null); }} 
            />
          )}

          {!isAddingPost && !editingPost && (
            <div className="glass-panel" style={{ overflowX: 'auto', marginTop: '20px' }}>
              <table className="compare-table" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th>Ảnh</th>
                    <th>Tiêu đề bài viết</th>
                    <th>Ngày cập nhật</th>
                    <th>Hành Động</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(p => (
                    <tr key={p.id}>
                      <td><img src={p.image} alt={p.title} style={{ width: '60px', height: '40px', objectFit: 'cover', borderRadius: '3px' }} /></td>
                      <td style={{ maxWidth: '300px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</td>
                      <td>{p.date}</td>
                      <td>
                        <button onClick={() => setEditingPost(p)} style={{ padding: '5px 10px', marginRight: '5px', background: 'rgba(59, 130, 246, 0.2)', color: 'var(--text-primary)', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Sửa</button>
                        <button onClick={() => handleDeletePost(p.id)} style={{ padding: '5px 10px', background: 'rgba(239, 68, 68, 0.2)', color: 'var(--text-primary)', border: 'none', borderRadius: '3px', cursor: 'pointer' }}>Xoá</button>
                      </td>
                    </tr>
                  ))}
                  {posts.length === 0 && (
                     <tr><td colSpan="4" style={{ textAlign: 'center' }}>Chưa có bài viết nào</td></tr>
                  )}
                </tbody>
              </table>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default AdminPanel;
