import React, { useState, useEffect } from 'react';
import { ShieldCheck, Lock, Package, FileText, Plus, LogOut, Edit3, Trash2, Smartphone, Laptop } from 'lucide-react';
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
        alert("Thành công! Hãy tải lại trang để thấy kết quả.");
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
      <div className="admin-login animate-fade-in" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', minHeight: '50vh' }}>
        <div className="glass-panel" style={{ padding: '50px 40px', maxWidth: '450px', width: '100%', textAlign: 'center', borderRadius: '24px' }}>
          <div style={{ background: 'rgba(56, 88, 246, 0.1)', width: '80px', height: '80px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
            <ShieldCheck size={40} className="text-accent-primary" />
          </div>
          <h2 style={{ fontSize: '1.8rem', marginBottom: '10px' }}>Hệ Thống Quản Trị</h2>
          <p className="text-secondary" style={{ marginBottom: '30px' }}>Vui lòng xác thực quyền truy cập</p>
          <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ position: 'relative' }}>
              <Lock size={20} style={{ position: 'absolute', left: '15px', top: '50%', transform: 'translateY(-50%)', color: 'var(--vs-text-secondary)' }} />
              <input 
                type="password" 
                className="select-input"
                placeholder="Nhập mã truy cập..." 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                style={{ width: '100%', padding: '15px 15px 15px 45px', fontSize: '1rem' }}
                autoFocus
              />
            </div>
            <button type="submit" className="btn btn-primary" style={{ padding: '15px', fontSize: '1.1rem', borderRadius: '12px' }}>
              Đăng Nhập Quản Trị
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="admin-dashboard animate-fade-in" style={{ padding: '20px 0' }}>
      
      {/* HEADER */}
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px', paddingBottom: '20px', borderBottom: '1px solid var(--vs-border)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <div style={{ background: 'var(--gradient-accent)', padding: '10px', borderRadius: '12px', display: 'flex' }}>
            <ShieldCheck size={28} color="white" />
          </div>
          <div>
            <h2 style={{ fontSize: '1.8rem', margin: 0 }}>Trung Tâm Quản Trị</h2>
            <p className="text-secondary" style={{ margin: 0, fontSize: '0.9rem' }}>Quản lý dữ liệu hệ thống</p>
          </div>
        </div>
        <button onClick={handleLogout} className="btn hover-focus-btn" style={{ background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px' }}>
          <LogOut size={18} /> Đăng Xuất
        </button>
      </div>

      {/* TABS */}
      <div style={{ display: 'flex', gap: '15px', marginBottom: '30px', overflowX: 'auto', paddingBottom: '10px' }}>
        <button 
          onClick={() => setAdminTab('products')} 
          className="btn hover-focus-btn"
          style={{ 
            padding: '12px 25px', 
            borderRadius: '12px', 
            display: 'flex', alignItems: 'center', gap: '10px',
            color: adminTab === 'products' ? 'white' : 'var(--vs-text-primary)', 
            background: adminTab === 'products' ? 'var(--gradient-accent)' : 'var(--vs-surface)', 
            border: '1px solid',
            borderColor: adminTab === 'products' ? 'transparent' : 'var(--vs-border)',
            fontWeight: 'bold'
          }}
        >
          <Package size={20} /> Sản Phẩm & Thiết Bị
        </button>
        <button 
          onClick={() => setAdminTab('news')} 
          className="btn hover-focus-btn"
          style={{ 
            padding: '12px 25px', 
            borderRadius: '12px', 
            display: 'flex', alignItems: 'center', gap: '10px',
            color: adminTab === 'news' ? 'white' : 'var(--vs-text-primary)', 
            background: adminTab === 'news' ? 'var(--gradient-accent)' : 'var(--vs-surface)', 
            border: '1px solid',
            borderColor: adminTab === 'news' ? 'transparent' : 'var(--vs-border)',
            fontWeight: 'bold'
          }}
        >
          <FileText size={20} /> Tin Tức & Bài Viết
        </button>
      </div>

      {/* CONTENT */}
      {adminTab === 'products' && (
        <>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Quản Lý Thiết Bị
            </h3>
            <button onClick={() => { setIsAddingProduct(true); setEditingProduct(null); }} className="btn btn-primary hover-focus-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', border: 'none' }}>
              <Plus size={18} /> Thêm Thiết Bị
            </button>
          </div>

          {(isAddingProduct || editingProduct) ? (
            <ProductForm 
              product={editingProduct} 
              onSave={handleSaveProduct} 
              onCancel={() => { setIsAddingProduct(false); setEditingProduct(null); }} 
            />
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '30px' }}>
              {/* Phone Table */}
              <div className="glass-panel" style={{ overflowX: 'auto', padding: '20px', borderRadius: '16px' }}>
                <h4 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
                  <Smartphone className="text-accent-primary" /> Điện Thoại
                </h4>
                <table className="compare-table" style={{ width: '100%', textAlign: 'left' }}>
                  <thead>
                    <tr>
                      <th>Thiết Bị</th>
                      <th>Hãng</th>
                      <th>Giá Bán</th>
                      <th style={{ textAlign: 'right' }}>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.filter(p => p.category === 'phone').map(p => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'contain', background: 'white', padding: '5px', borderRadius: '8px', border: '1px solid var(--vs-border)' }} />
                            <strong style={{ fontSize: '1rem' }}>{p.name}</strong>
                          </div>
                        </td>
                        <td>{p.brand}</td>
                        <td style={{ color: 'var(--vs-accent)', fontWeight: 'bold' }}>{p.price}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button onClick={() => setEditingProduct(p)} className="btn hover-focus-btn" title="Chỉnh sửa" style={{ padding: '8px', marginRight: '10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: 'none', borderRadius: '8px' }}>
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => handleDeleteProduct(p.id)} className="btn hover-focus-btn" title="Xoá" style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '8px' }}>
                            <Trash2 size={18} />
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Laptop Table */}
              <div className="glass-panel" style={{ overflowX: 'auto', padding: '20px', borderRadius: '16px' }}>
                <h4 style={{ marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px', fontSize: '1.2rem' }}>
                  <Laptop className="text-accent-secondary" /> Laptop
                </h4>
                <table className="compare-table" style={{ width: '100%', textAlign: 'left' }}>
                  <thead>
                    <tr>
                      <th>Thiết Bị</th>
                      <th>Hãng</th>
                      <th>Giá Bán</th>
                      <th style={{ textAlign: 'right' }}>Thao Tác</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.filter(p => p.category === 'laptop').map(p => (
                      <tr key={p.id}>
                        <td>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                            <img src={p.image} alt={p.name} style={{ width: '50px', height: '50px', objectFit: 'contain', background: 'white', padding: '5px', borderRadius: '8px', border: '1px solid var(--vs-border)' }} />
                            <strong style={{ fontSize: '1rem' }}>{p.name}</strong>
                          </div>
                        </td>
                        <td>{p.brand}</td>
                        <td style={{ color: 'var(--vs-accent)', fontWeight: 'bold' }}>{p.price}</td>
                        <td style={{ textAlign: 'right' }}>
                          <button onClick={() => setEditingProduct(p)} className="btn hover-focus-btn" title="Chỉnh sửa" style={{ padding: '8px', marginRight: '10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: 'none', borderRadius: '8px' }}>
                            <Edit3 size={18} />
                          </button>
                          <button onClick={() => handleDeleteProduct(p.id)} className="btn hover-focus-btn" title="Xoá" style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '8px' }}>
                            <Trash2 size={18} />
                          </button>
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
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
            <h3 style={{ fontSize: '1.5rem', display: 'flex', alignItems: 'center', gap: '10px' }}>
              Quản Lý Bài Viết
            </h3>
            <button onClick={() => { setIsAddingPost(true); setEditingPost(null); }} className="btn btn-primary hover-focus-btn" style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '10px 20px', borderRadius: '8px', border: 'none' }}>
              <Plus size={18} /> Thêm Bài Viết
            </button>
          </div>

          {(isAddingPost || editingPost) ? (
            <NewsForm 
              post={editingPost} 
              onSave={handleSavePost} 
              onCancel={() => { setIsAddingPost(false); setEditingPost(null); }} 
            />
          ) : (
            <div className="glass-panel" style={{ overflowX: 'auto', padding: '20px', borderRadius: '16px' }}>
              <table className="compare-table" style={{ width: '100%', textAlign: 'left' }}>
                <thead>
                  <tr>
                    <th>Bài Viết</th>
                    <th>Ngày Cập Nhật</th>
                    <th style={{ textAlign: 'right' }}>Thao Tác</th>
                  </tr>
                </thead>
                <tbody>
                  {posts.map(p => (
                    <tr key={p.id}>
                      <td>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                          <img src={p.image} alt={p.title} style={{ width: '80px', height: '50px', objectFit: 'cover', borderRadius: '6px' }} />
                          <strong style={{ fontSize: '1rem', maxWidth: '400px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{p.title}</strong>
                        </div>
                      </td>
                      <td className="text-secondary">{p.date}</td>
                      <td style={{ textAlign: 'right' }}>
                        <button onClick={() => setEditingPost(p)} className="btn hover-focus-btn" title="Chỉnh sửa" style={{ padding: '8px', marginRight: '10px', background: 'rgba(59, 130, 246, 0.1)', color: '#3b82f6', border: 'none', borderRadius: '8px' }}>
                          <Edit3 size={18} />
                        </button>
                        <button onClick={() => handleDeletePost(p.id)} className="btn hover-focus-btn" title="Xoá" style={{ padding: '8px', background: 'rgba(239, 68, 68, 0.1)', color: '#ef4444', border: 'none', borderRadius: '8px' }}>
                          <Trash2 size={18} />
                        </button>
                      </td>
                    </tr>
                  ))}
                  {posts.length === 0 && (
                     <tr><td colSpan="3" style={{ textAlign: 'center', padding: '40px' }} className="text-secondary">Chưa có bài viết nào trong hệ thống.</td></tr>
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
