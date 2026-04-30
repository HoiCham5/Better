import React, { useState } from 'react';
import { X, LogIn, Mail } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const AuthModal = ({ onClose }) => {
  const { loginGoogle, loginEmail, registerEmail } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);

  const handleGoogle = async () => {
    try {
      await loginGoogle();
      onClose();
    } catch (err) {
      console.error(err);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (isLogin) {
        await loginEmail(email, password);
      } else {
        await registerEmail(email, password);
      }
      onClose();
    } catch (err) {
      alert("Đăng nhập thất bại: " + err.message);
    }
    setLoading(false);
  };

  return (
    <div style={{
      position: 'fixed', top: 0, left: 0, right: 0, bottom: 0,
      background: 'rgba(0,0,0,0.8)', backdropFilter: 'blur(5px)',
      display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999
    }}>
      <div className="glass-panel animate-fade-in" style={{ width: '400px', padding: '30px', position: 'relative' }}>
        <button className="close-btn hover-focus-btn" onClick={onClose} style={{ position: 'absolute', top: '15px', right: '15px', background: 'var(--vs-border)', border: 'none', color: 'var(--vs-text-primary)', cursor: 'pointer', borderRadius: '50%', width: '36px', height: '36px', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10 }}>
          <X size={20} />
        </button>

        <h2 style={{ textAlign: 'center', marginBottom: '20px', fontSize: '1.5rem' }}>
          {isLogin ? 'Đăng Nhập' : 'Tạo Tài Khoản'}
        </h2>

        <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Email</label>
            <input 
               type="email" 
               className="select-input" 
               style={{ width: '100%', padding: '10px' }} 
               required 
               value={email}
               onChange={e => setEmail(e.target.value)}
            />
          </div>
          <div>
            <label style={{ display: 'block', marginBottom: '5px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>Mật khẩu</label>
            <input 
               type="password" 
               className="select-input" 
               style={{ width: '100%', padding: '10px' }} 
               required 
               value={password}
               onChange={e => setPassword(e.target.value)}
            />
          </div>
          <button type="submit" disabled={loading} style={{ background: 'var(--gradient-accent)', border: 'none', padding: '12px', borderRadius: '8px', color: 'white', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>
            {loading ? 'Đang xử lý...' : (isLogin ? 'Đăng Nhập qua Email' : 'Đăng Ký')}
          </button>
        </form>

        <div style={{ textAlign: 'center', margin: '20px 0', color: 'var(--text-secondary)' }}>HOẶC</div>

        <button 
          onClick={handleGoogle} 
          style={{ width: '100%', background: 'white', color: 'black', border: 'none', padding: '10px', borderRadius: '8px', display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '10px', fontWeight: 'bold', cursor: 'pointer' }}
        >
          <img src="https://www.gstatic.com/firebasejs/ui/2.0.0/images/auth/google.svg" alt="Google" style={{width: '20px'}}/>
          Tiếp tục với Google
        </button>

        <p style={{ textAlign: 'center', marginTop: '20px', fontSize: '0.9rem', color: 'var(--text-secondary)' }}>
          {isLogin ? 'Chưa có tài khoản?' : 'Đã có tài khoản?'}
          <span onClick={() => setIsLogin(!isLogin)} style={{ color: 'var(--accent-primary)', cursor: 'pointer', marginLeft: '5px' }}>
            {isLogin ? 'Đăng ký ngay' : 'Đăng nhập'}
          </span>
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
