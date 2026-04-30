import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { MessageSquare, Send, Award, Star } from 'lucide-react';

const CommentSection = ({ productId }) => {
  const { currentUser, userProfile, addXP } = useAuth() || {};
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  // Hàm lấy danh sách bình luận (có thể poll hoặc gọi 1 lần khi load)
  const fetchComments = async () => {
    try {
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reviews/${productId}`);
      const data = await res.json();
      setComments(data);
    } catch (e) {
      console.warn("Lỗi tải bình luận:", e.message);
    }
  };

  useEffect(() => {
    fetchComments();

    // Khởi tạo và Parse lại Facebook Comments
    if (window.FB) {
      window.FB.XFBML.parse();
    } else {
      window.fbAsyncInit = function() {
        window.FB.init({
          xfbml      : true,
          version    : 'v19.0'
        });
      };
      (function(d, s, id) {
        var js, fjs = d.getElementsByTagName(s)[0];
        if (d.getElementById(id)) return;
        js = d.createElement(s); js.id = id;
        js.src = 'https://connect.facebook.net/vi_VN/sdk.js';
        fjs.parentNode.insertBefore(js, fjs);
      }(document, 'script', 'facebook-jssdk'));
    }
  }, [productId]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    if (!currentUser) {
      alert("Bạn cần đăng nhập để bình luận!");
      return;
    }

    setLoading(true);
    try {
      const token = localStorage.getItem('token');
      const res = await fetch(`${import.meta.env.VITE_API_URL || 'http://localhost:5000'}/api/reviews`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          productId,
          userName: userProfile?.displayName || currentUser.email,
          userPhoto: currentUser.photoURL,
          text: newComment,
          pointsToAdd: 10
        })
      });

      if (res.ok) {
         setNewComment('');
         // Fetch comments again to show new one
         await fetchComments();
         // Gamification: Update local state
         if (addXP) {
           await addXP(10);
         }
      }
    } catch (err) {
      console.error(err);
      alert("Không thể gửi bình luận!");
    }
    setLoading(false);
  };

  return (
    <div style={{ marginTop: '40px', paddingTop: '30px', borderTop: '1px solid var(--glass-border)' }}>
      <h3 style={{ fontSize: '1.5rem', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
        <MessageSquare className="text-accent-primary" /> Bình Luận & Đánh Giá
      </h3>

      <div style={{ background: 'var(--bg-secondary)', padding: '20px', borderRadius: '15px', marginBottom: '30px' }}>
        <form onSubmit={handleSubmit} style={{ display: 'flex', gap: '15px' }}>
          <img 
             src={currentUser?.photoURL || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=50&h=50&fit=crop'} 
             style={{ width: '40px', height: '40px', borderRadius: '50%' }} 
             alt="Avatar" 
          />
          <div style={{ flex: 1, position: 'relative' }}>
            <input 
              type="text" 
              className="select-input" 
              placeholder={currentUser ? "Chia sẻ cảm nhận của bạn để nhận thêm 10 XP..." : "Đăng nhập để bình luận"}
              value={newComment}
              onChange={e => setNewComment(e.target.value)}
              disabled={!currentUser || loading}
              style={{ width: '100%', padding: '12px 15px', paddingRight: '50px' }}
            />
            <button 
              type="submit" 
              disabled={!currentUser || loading || !newComment.trim()}
              style={{ 
                position: 'absolute', right: '10px', top: '50%', transform: 'translateY(-50%)',
                background: 'transparent', border: 'none', color: newComment.trim() ? 'var(--accent-primary)' : 'var(--text-secondary)',
                cursor: newComment.trim() ? 'pointer' : 'default'
              }}
            >
              <Send size={20} />
            </button>
          </div>
        </form>
        {!currentUser && (
           <p style={{ marginTop: '10px', fontSize: '0.85rem', color: 'var(--text-secondary)' }}>
             * Bạn cần đăng nhập để tham gia cộng đồng phân tích Better.
           </p>
        )}
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
         {comments.length > 0 ? comments.map(c => (
           <div key={c.id} style={{ display: 'flex', gap: '15px', padding: '15px', background: 'rgba(255,255,255,0.02)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
              <img src={c.userPhoto || 'https://images.unsplash.com/photo-1511367461989-f85a21fda167?w=50&h=50&fit=crop'} style={{ width: '40px', height: '40px', borderRadius: '50%' }} alt="Avatar" />
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '5px' }}>
                  <span style={{ fontWeight: 'bold' }}>{c.userName}</span>
                  {/* Mock tag for user */}
                  <span style={{ fontSize: '0.7rem', padding: '2px 8px', background: 'rgba(59, 130, 246, 0.2)', color: '#3b82f6', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                    <ShieldIcon /> Thành viên
                  </span>
                </div>
                <p style={{ color: 'var(--text-secondary)', lineHeight: '1.5' }}>{c.text}</p>
              </div>
           </div>
         )) : (
           <div style={{ textAlign: 'center', padding: '30px', color: 'var(--text-secondary)' }}>
             Chưa có bình luận nào. Hãy là người đầu tiên bóc tem sản phẩm này!
           </div>
         )}
      </div>
      
      {/* Facebook Comments Section */}
      <div style={{ marginTop: '40px', background: '#fff', padding: '20px', borderRadius: '15px', minHeight: '300px' }}>
        <h4 style={{ color: '#1877f2', marginBottom: '15px', display: 'flex', alignItems: 'center', gap: '8px', fontSize: '1.2rem', fontWeight: 'bold' }}>
          <img src="https://upload.wikimedia.org/wikipedia/commons/b/b8/2021_Facebook_icon.svg" alt="FB" width="24" height="24" /> 
          Bình luận với Facebook
        </h4>
        <div 
          className="fb-comments" 
          data-href={`https://better-six-lemon.vercel.app/product/${productId}`} 
          data-width="100%" 
          data-numposts="5">
        </div>
      </div>
    </div>
  );
};

const ShieldIcon = () => (
  <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path></svg>
);

export default CommentSection;
