import React, { useState } from 'react';
import { ChevronRight, Calendar, ArrowLeft } from 'lucide-react';
import { proxyImage } from '../utils/imageProxy';

const NewsFeed = ({ posts }) => {
  const [selectedPost, setSelectedPost] = useState(null);

  if (!posts || posts.length === 0) {
    return <div style={{ textAlign: 'center', marginTop: '100px' }} className="text-secondary">Chưa có bài viết nào!</div>;
  }

  if (selectedPost) {
    return (
      <div className="news-article container animate-fade-in" style={{ maxWidth: '800px', margin: '40px auto', padding: '0 20px' }}>
        <button 
          className="hover-lift"
          onClick={() => setSelectedPost(null)}
          style={{ background: 'var(--vs-surface)', border: '1px solid var(--vs-border)', color: 'var(--vs-text-primary)', cursor: 'pointer', marginBottom: '30px', padding: '10px 20px', borderRadius: '30px', fontSize: '0.95rem', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '8px' }}
        >
          <ArrowLeft size={18} /> Về Trang Tin Tức
        </button>
        <div style={{ marginBottom: '40px' }}>
          <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(56, 88, 246, 0.1)', color: '#3858f6', borderRadius: '4px', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '15px' }}>
            TECHNOLOGY
          </div>
          <h1 style={{ fontSize: '2.5rem', fontWeight: 900, marginBottom: '20px', color: 'var(--vs-text-primary)', lineHeight: 1.2 }}>{selectedPost.title}</h1>
          <p className="text-secondary" style={{ display: 'flex', alignItems: 'center', gap: '8px', fontWeight: 600, marginBottom: '30px' }}>
            <Calendar size={16} /> {selectedPost.date}
          </p>
          <img src={proxyImage(selectedPost.image)} alt="cover" style={{ width: '100%', borderRadius: '16px', marginBottom: '40px', maxHeight: '500px', objectFit: 'cover', boxShadow: '0 10px 30px rgba(0,0,0,0.1)' }} />
          <div className="article-content" style={{ lineHeight: '1.8', fontSize: '1.15rem', color: 'var(--vs-text-primary)' }} dangerouslySetInnerHTML={{ 
            __html: selectedPost.content.replace(/\n\n/g, '<br/><br/>').replace(/\n/g, '<br/>')
          }}></div>
        </div>
      </div>
    );
  }

  const featuredPost = posts[0];
  const regularPosts = posts.slice(1);

  return (
    <div className="news-feed container animate-fade-in" style={{ padding: '40px 20px' }}>
      
      {/* HEADER SECTION */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '40px', borderBottom: '2px solid var(--vs-border)', paddingBottom: '20px' }}>
        <h2 style={{ fontSize: '2.5rem', fontWeight: 900, color: 'var(--vs-text-primary)', margin: 0, textTransform: 'uppercase', letterSpacing: '-1px' }}>News</h2>
      </div>

      {/* FEATURED POST (HERO) */}
      {featuredPost && (
        <div 
          className="featured-post hover-lift" 
          onClick={() => setSelectedPost(featuredPost)}
          style={{ 
            display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '20px', 
            background: 'var(--vs-surface)', borderRadius: '20px', overflow: 'hidden', cursor: 'pointer',
            border: '1px solid var(--vs-border)', marginBottom: '50px', alignItems: 'center'
          }}
        >
          <div style={{ position: 'relative', overflow: 'hidden', height: '100%', minHeight: '350px' }}>
            <img 
              src={proxyImage(featuredPost.image)} 
              alt={featuredPost.title} 
              style={{ width: '100%', height: '100%', objectFit: 'cover', position: 'absolute', top: 0, left: 0, transition: 'transform 0.5s ease' }} 
              onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
              onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
            />
          </div>
          <div style={{ padding: '30px' }}>
            <div style={{ display: 'inline-block', padding: '6px 12px', background: 'rgba(56, 88, 246, 0.1)', color: '#3858f6', borderRadius: '4px', fontWeight: 800, fontSize: '0.75rem', letterSpacing: '1px', marginBottom: '15px' }}>
              LATEST UPDATE
            </div>
            <h3 style={{ fontSize: '2.2rem', fontWeight: 900, marginBottom: '15px', color: 'var(--vs-text-primary)', lineHeight: 1.2 }}>{featuredPost.title}</h3>
            <p style={{ fontSize: '1.1rem', color: 'var(--vs-text-secondary)', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{featuredPost.summary}</p>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: 'auto' }}>
              <span style={{ fontWeight: 600, color: 'var(--vs-text-secondary)', fontSize: '0.9rem' }}>{featuredPost.date}</span>
              <span style={{ color: '#3858f6', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: '5px' }}>Đọc tiếp <ChevronRight size={18} /></span>
            </div>
          </div>
        </div>
      )}

      {/* REGULAR POSTS GRID */}
      {regularPosts.length > 0 && (
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '30px' }}>
          {regularPosts.map((post, idx) => (
            <div 
              key={post.id} 
              className="news-card hover-lift" 
              onClick={() => setSelectedPost(post)}
              style={{ 
                cursor: 'pointer', background: 'var(--vs-surface)', borderRadius: '16px', overflow: 'hidden', 
                border: '1px solid var(--vs-border)', display: 'flex', flexDirection: 'column'
              }}
            >
              <div style={{ position: 'relative', overflow: 'hidden', height: '200px' }}>
                <img 
                  src={proxyImage(post.image)} 
                  alt={post.title} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover', transition: 'transform 0.5s ease' }} 
                  onMouseOver={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                  onMouseOut={(e) => e.currentTarget.style.transform = 'scale(1)'}
                />
              </div>
              <div style={{ padding: '25px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ color: '#8224e3', fontWeight: 800, fontSize: '0.7rem', letterSpacing: '1px', marginBottom: '10px', textTransform: 'uppercase' }}>
                  {idx % 2 === 0 ? 'REVIEWS' : 'SMARTPHONES'}
                </div>
                <h4 style={{ fontSize: '1.3rem', fontWeight: 800, marginBottom: '15px', color: 'var(--vs-text-primary)', lineHeight: 1.3 }}>{post.title}</h4>
                <p style={{ color: 'var(--vs-text-secondary)', fontSize: '0.95rem', marginBottom: '20px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>{post.summary}</p>
                
                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid var(--vs-border)', paddingTop: '15px' }}>
                  <span style={{ fontSize: '0.85rem', color: 'var(--vs-text-secondary)', fontWeight: 600 }}>{post.date}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
};

export default NewsFeed;
