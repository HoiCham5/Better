import React, { useState } from 'react';

const NewsFeed = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  if (!posts || posts.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '50px' }} className="text-secondary">Chưa có bài viết nào!</div>;
  }

  if (selectedPost) {
    return (
      <div className="news-article container animate-fade-in" style={{ maxWidth: '800px', margin: '0 auto' }}>
        <button 
          onClick={() => setSelectedPost(null)}
          style={{ background: 'transparent', border: 'none', color: 'var(--accent-primary)', cursor: 'pointer', marginBottom: '20px', fontSize: '1.1rem' }}
        >
          ← Quay lại danh sách
        </button>
        <div className="glass-panel" style={{ padding: '40px', borderRadius: '15px' }}>
          <img src={selectedPost.image} alt="cover" style={{ width: '100%', borderRadius: '15px', marginBottom: '30px', maxHeight: '400px', objectFit: 'cover' }} />
          <h1 style={{ fontSize: '2.5rem', marginBottom: '10px' }}>{selectedPost.title}</h1>
          <p className="text-secondary" style={{ marginBottom: '30px', fontStyle: 'italic' }}>Cập nhật: {selectedPost.date}</p>
          <div style={{ lineHeight: '1.8', fontSize: '1.1rem' }} dangerouslySetInnerHTML={{ 
            __html: selectedPost.content.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>')
          }}></div>
        </div>
      </div>
    );
  }

  return (
    <div className="news-feed container animate-fade-in">
      <h2 style={{ fontSize: '2rem', marginBottom: '30px', textAlign: 'center' }}>Tin Tức & Đánh Giá</h2>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '30px' }}>
        {posts.map(post => (
          <div key={post.id} className="news-card glass-panel" style={{ cursor: 'pointer', overflow: 'hidden', transition: 'all 0.3s' }} onClick={() => setSelectedPost(post)}>
            <img src={post.image} alt={post.title} style={{ width: '100%', height: '200px', objectFit: 'cover' }} />
            <div style={{ padding: '20px' }}>
              <p className="text-secondary" style={{ fontSize: '0.9rem', marginBottom: '10px' }}>{post.date}</p>
              <h3 style={{ fontSize: '1.3rem', marginBottom: '15px', color: 'var(--text-primary)' }}>{post.title}</h3>
              <p className="text-secondary" style={{ display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.summary}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NewsFeed;
