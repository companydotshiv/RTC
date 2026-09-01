import React, { useState } from 'react';
import { Calendar, Clock, User, ArrowRight, Sparkles, BookOpen } from 'lucide-react';
import { blogPosts, type BlogPost } from '../data/blogData';

interface BlogPageProps {
  setCurrentView: (view: string) => void;
  onSelectPost?: (slug: string) => void;
}

export const BlogPage: React.FC<BlogPageProps> = ({ setCurrentView, onSelectPost }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  const categories = [
    'all',
    'Nutrition & Health',
    'Superfoods & Nuts',
    'Storage & Freshness',
    'Gifting & Lifestyle'
  ];

  const filteredPosts = selectedCategory === 'all'
    ? blogPosts
    : blogPosts.filter((p) => p.category === selectedCategory);

  const handleOpenArticle = (p: BlogPost) => {
    window.history.pushState({}, '', `/blog/${p.slug}`);
    window.scrollTo(0, 0);
    if (onSelectPost) {
      onSelectPost(p.slug);
    } else {
      setCurrentView(`blog-${p.slug}`);
    }
  };

  return (
    <div style={{ background: '#FAF8F5', minHeight: '90vh', padding: '40px 0 80px 0', fontFamily: "'Jost', sans-serif", textAlign: 'left' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Header Hero Section */}
        <div style={{ textAlign: 'center', maxWidth: '780px', margin: '0 auto 48px auto' }}>
          <h1 style={{ fontSize: '2.6rem', color: '#043927', fontWeight: 800, margin: '0 0 16px 0', letterSpacing: '-0.5px' }}>
            Nourish Your Body With Ancient Wisdom & Modern Nutrition
          </h1>
          <p style={{ fontSize: '1.1rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
            Evidence-based nutritional science, ancient Ayurvedic dry fruit rituals, storage preservation guides, and gourmet healthy snacking ideas.
          </p>
        </div>

        {/* Category Filter Pills */}
        <div style={{ display: 'flex', justifyContent: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '40px' }}>
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              style={{
                padding: '8px 20px',
                borderRadius: '30px',
                border: selectedCategory === cat ? '2px solid #15803D' : '1px solid #d1d5db',
                background: selectedCategory === cat ? '#15803D' : '#ffffff',
                color: selectedCategory === cat ? '#ffffff' : '#374151',
                fontSize: '0.9rem',
                fontWeight: 600,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCategory === cat ? '0 4px 12px rgba(21,128,61,0.2)' : 'none'
              }}
            >
              {cat === 'all' ? 'All Articles' : cat}
            </button>
          ))}
        </div>

        {/* Blog Posts Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '30px' }} className="blog-posts-grid">
          {filteredPosts.map((post) => (
            <article
              key={post.id}
              onClick={() => handleOpenArticle(post)}
              style={{
                background: '#ffffff',
                borderRadius: '16px',
                overflow: 'hidden',
                border: '1px solid #e5e7eb',
                boxShadow: '0 4px 20px rgba(0,0,0,0.04)',
                display: 'flex',
                flexDirection: 'column',
                cursor: 'pointer',
                transition: 'transform 0.25s ease, box-shadow 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-4px)';
                e.currentTarget.style.boxShadow = '0 12px 28px rgba(0,0,0,0.08)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 20px rgba(0,0,0,0.04)';
              }}
            >
              {/* Card Image */}
              <div style={{ height: '220px', background: '#f8fafc', position: 'relative', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <img
                  src={post.image}
                  alt={post.title}
                  style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '16px' }}
                />
                <span style={{ position: 'absolute', top: '14px', left: '14px', background: 'rgba(255,255,255,0.95)', color: '#15803D', padding: '4px 12px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700, boxShadow: '0 2px 8px rgba(0,0,0,0.08)' }}>
                  {post.category}
                </span>
              </div>

              {/* Card Body */}
              <div style={{ padding: '24px', display: 'flex', flexDirection: 'column', flex: 1 }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '14px', color: '#6b7280', fontSize: '0.82rem', marginBottom: '10px' }}>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Calendar size={14} /> {post.date}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <Clock size={14} /> {post.readTime}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827', lineHeight: 1.4, margin: '0 0 12px 0' }}>
                  {post.title}
                </h3>

                <p style={{ fontSize: '0.92rem', color: '#4b5563', lineHeight: 1.6, margin: '0 0 20px 0', display: '-webkit-box', WebkitLineClamp: 3, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                  {post.summary}
                </p>

                <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderTop: '1px solid #f3f4f6', paddingTop: '16px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.82rem', color: '#6b7280' }}>
                    <User size={14} />
                    <span style={{ maxWidth: '180px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.author}</span>
                  </div>
                  <span
                    style={{
                      color: '#15803D',
                      fontWeight: 700,
                      fontSize: '0.88rem',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '4px'
                    }}
                  >
                    Read Article <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            </article>
          ))}
        </div>

      </div>
    </div>
  );
};
