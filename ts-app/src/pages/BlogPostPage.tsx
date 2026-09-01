import React, { useState } from 'react';
import { ArrowLeft, Calendar, Clock, User, Share2, Check, ArrowRight, Tag, BookOpen, ShieldCheck, Heart, MessageCircle } from 'lucide-react';
import { blogPosts, type BlogPost } from '../data/blogData';
import { products } from '../data/productsData';

interface BlogPostPageProps {
  slug: string;
  setCurrentView: (view: string) => void;
  onAddToCart?: (productId: number) => void;
}

export const BlogPostPage: React.FC<BlogPostPageProps> = ({
  slug,
  setCurrentView,
  onAddToCart
}) => {
  const [copiedLink, setCopiedLink] = useState(false);

  const post = blogPosts.find((p) => p.slug === slug || p.id === slug) || blogPosts[0];
  const relatedPosts = blogPosts.filter((p) => p.id !== post.id).slice(0, 3);
  const featuredProducts = products.slice(0, 3);

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.href);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2500);
  };

  const handleShareWhatsApp = () => {
    const text = encodeURIComponent(`Read this article on RTC Foods: ${post.title} - ${window.location.href}`);
    window.open(`https://api.whatsapp.com/send?text=${text}`, '_blank');
  };

  return (
    <div style={{ background: '#FAF8F5', minHeight: '100vh', padding: '30px 0 80px 0', fontFamily: "'Jost', sans-serif", textAlign: 'left' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Top Breadcrumbs & Back Button */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => setCurrentView('blog')}
            style={{ background: 'transparent', border: 'none', color: '#15803D', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px', padding: 0 }}
          >
            <ArrowLeft size={16} /> Back to Wellness Journal
          </button>

          <div style={{ fontSize: '0.85rem', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px' }}>
            <span style={{ cursor: 'pointer' }} onClick={() => setCurrentView('home')}>Home</span>
            <span>/</span>
            <span style={{ cursor: 'pointer' }} onClick={() => setCurrentView('blog')}>Blog</span>
            <span>/</span>
            <span style={{ color: '#1d2327', fontWeight: 500, maxWidth: '280px', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{post.title}</span>
          </div>
        </div>

        {/* 2-Column Article Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: '36px', alignItems: 'start' }} className="blog-article-layout">
          
          {/* LEFT MAIN ARTICLE COLUMN */}
          <article style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #eaeaea', padding: '36px', boxShadow: '0 2px 16px rgba(0,0,0,0.03)' }}>
            
            {/* Category & Read Time Bar */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '16px', flexWrap: 'wrap' }}>
              <span style={{ background: '#f0fdf4', color: '#15803D', border: '1px solid #bbf7d0', padding: '4px 12px', borderRadius: '20px', fontSize: '0.8rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                {post.category}
              </span>
              <span style={{ color: '#64748b', fontSize: '0.85rem', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Clock size={14} /> {post.readTime}
              </span>
            </div>

            {/* Main Headline */}
            <h1 style={{ fontSize: '2.2rem', lineHeight: 1.25, color: '#1d2327', fontWeight: 800, margin: '0 0 20px 0' }}>
              {post.title}
            </h1>

            {/* Author & Share Toolbar */}
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid #f0f0f1', paddingBottom: '20px', marginBottom: '28px', flexWrap: 'wrap', gap: '14px' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <div style={{ width: '44px', height: '44px', borderRadius: '50%', background: 'linear-gradient(135deg, #15803D, #043927)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 700, fontSize: '1.1rem' }}>
                  {post.author.charAt(0)}
                </div>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.95rem', color: '#1d2327' }}>{post.author}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>{post.authorRole} • {post.date}</div>
                </div>
              </div>

              {/* Social Share Buttons */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <button
                  onClick={handleShareWhatsApp}
                  style={{ background: '#25D366', color: '#fff', border: 'none', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  <MessageCircle size={14} /> Share
                </button>
                <button
                  onClick={handleCopyLink}
                  style={{ background: '#f0f0f1', color: '#334155', border: '1px solid #cbd5e1', padding: '6px 14px', borderRadius: '20px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '6px' }}
                >
                  {copiedLink ? <Check size={14} color="#15803D" /> : <Share2 size={14} />}
                  {copiedLink ? 'Link Copied!' : 'Copy Link'}
                </button>
              </div>
            </div>

            {/* Featured Image */}
            <div style={{ background: '#f8fafc', borderRadius: '12px', border: '1px solid #e2e8f0', padding: '24px', textAlign: 'center', marginBottom: '32px' }}>
              <img
                src={post.image}
                alt={post.title}
                style={{ maxHeight: '340px', maxWidth: '100%', objectFit: 'contain', margin: '0 auto' }}
              />
            </div>

            {/* Summary Lead Block */}
            <p style={{ fontSize: '1.15rem', lineHeight: 1.65, color: '#334155', fontStyle: 'italic', fontWeight: 500, borderLeft: '4px solid #15803D', paddingLeft: '16px', marginBottom: '28px' }}>
              {post.summary}
            </p>

            {/* Key Insights Box */}
            <div style={{ background: '#f0fdf4', border: '1px solid #bbf7d0', borderRadius: '12px', padding: '24px', marginBottom: '32px' }}>
              <div style={{ fontSize: '1.05rem', fontWeight: 700, color: '#15803D', display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '14px' }}>
                <BookOpen size={18} /> Key Nutrition Takeaways:
              </div>
              <ul style={{ margin: 0, paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.95rem', color: '#1f2937', lineHeight: 1.5 }}>
                {post.takeaways.map((takeaway, idx) => (
                  <li key={idx}>
                    <strong>{takeaway}</strong>
                  </li>
                ))}
              </ul>
            </div>

            {/* Article Content Paragraphs */}
            <div style={{ fontSize: '1.05rem', lineHeight: 1.8, color: '#1f2937', display: 'flex', flexDirection: 'column', gap: '20px', marginBottom: '36px' }}>
              {post.content.map((paragraph, idx) => (
                <p key={idx} style={{ margin: 0 }}>
                  {paragraph}
                </p>
              ))}
            </div>

            {/* Nutritional Facts Matrix */}
            {post.nutritionalHighlights && (
              <div style={{ background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '12px', padding: '20px', marginBottom: '36px' }}>
                <h3 style={{ fontSize: '1rem', fontWeight: 700, color: '#0f172a', margin: '0 0 14px 0' }}>
                  📊 Nutritional Breakdown & Highlights
                </h3>
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(130px, 1fr))', gap: '12px' }}>
                  {post.nutritionalHighlights.map((n, nIdx) => (
                    <div key={nIdx} style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '8px', padding: '12px', textAlign: 'center' }}>
                      <div style={{ fontSize: '0.78rem', color: '#64748b', marginBottom: '4px' }}>{n.label}</div>
                      <div style={{ fontSize: '0.95rem', fontWeight: 700, color: '#15803D' }}>{n.value}</div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Tags */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px', flexWrap: 'wrap', borderTop: '1px solid #f0f0f1', paddingTop: '20px', marginBottom: '32px' }}>
              <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#64748b', display: 'flex', alignItems: 'center', gap: '4px' }}>
                <Tag size={14} /> Topic Tags:
              </span>
              {post.tags.map((tag, tIdx) => (
                <span key={tIdx} style={{ background: '#f1f5f9', color: '#475569', padding: '3px 10px', borderRadius: '14px', fontSize: '0.8rem', fontWeight: 500 }}>
                  #{tag}
                </span>
              ))}
            </div>

            {/* Author Profile Card */}
            <div style={{ background: '#f8fafc', borderRadius: '12px', padding: '20px', display: 'flex', gap: '16px', alignItems: 'center' }}>
              <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: 'linear-gradient(135deg, #15803D, #043927)', color: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: '1.4rem', flexShrink: 0 }}>
                {post.author.charAt(0)}
              </div>
              <div>
                <div style={{ fontWeight: 700, fontSize: '1rem', color: '#0f172a' }}>Written by {post.author}</div>
                <div style={{ fontSize: '0.85rem', color: '#64748b', marginTop: '2px' }}>
                  {post.authorRole} with over 12+ years specializing in clinical nutrition, organic Ayurveda and seed science.
                </div>
              </div>
            </div>

          </article>

          {/* RIGHT SIDEBAR COLUMN */}
          <aside style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
            
            {/* Featured Sourced Products */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #eaeaea', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1d2327', margin: '0 0 16px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                🌿 Pure Sourced Essentials
              </h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {featuredProducts.map((prod) => (
                  <div key={prod.id} style={{ display: 'flex', gap: '12px', alignItems: 'center', background: '#f8fafc', padding: '10px', borderRadius: '10px', border: '1px solid #f1f5f9' }}>
                    <img
                      src={prod.image}
                      alt={prod.name}
                      style={{ width: '54px', height: '54px', objectFit: 'contain', background: '#fff', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                    />
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <div
                        onClick={() => {
                          window.history.pushState({}, '', `/product/${prod.slug}`);
                          setCurrentView('product-detail');
                        }}
                        style={{ fontSize: '0.88rem', fontWeight: 600, color: '#1d2327', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis', cursor: 'pointer' }}
                      >
                        {prod.name}
                      </div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '3px' }}>
                        <span style={{ fontWeight: 700, color: '#15803D', fontSize: '0.9rem' }}>₹{prod.price}</span>
                        {prod.originalPrice > prod.price && (
                          <span style={{ fontSize: '0.78rem', textDecoration: 'line-through', color: '#94a3b8' }}>₹{prod.originalPrice}</span>
                        )}
                      </div>
                      <button
                        onClick={() => {
                          if (onAddToCart) onAddToCart(prod.id);
                        }}
                        style={{ marginTop: '6px', background: '#15803D', color: '#fff', border: 'none', borderRadius: '4px', padding: '3px 10px', fontSize: '0.75rem', fontWeight: 600, cursor: 'pointer' }}
                      >
                        + Add to Cart
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Read Next Articles */}
            <div style={{ background: '#ffffff', borderRadius: '16px', border: '1px solid #eaeaea', padding: '24px', boxShadow: '0 2px 12px rgba(0,0,0,0.03)' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1d2327', margin: '0 0 16px 0' }}>
                📖 Read Next Articles
              </h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                {relatedPosts.map((rPost) => (
                  <div
                    key={rPost.id}
                    onClick={() => {
                      window.history.pushState({}, '', `/blog/${rPost.slug}`);
                      window.scrollTo(0, 0);
                      setCurrentView(`blog-${rPost.slug}`);
                    }}
                    style={{ display: 'flex', gap: '10px', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid #f1f5f9', paddingBottom: '10px' }}
                  >
                    <img
                      src={rPost.image}
                      alt={rPost.title}
                      style={{ width: '50px', height: '50px', objectFit: 'contain', background: '#f8fafc', borderRadius: '6px', border: '1px solid #e2e8f0' }}
                    />
                    <div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 600, color: '#1e293b', lineHeight: 1.35, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {rPost.title}
                      </div>
                      <div style={{ fontSize: '0.75rem', color: '#64748b', marginTop: '2px' }}>
                        {rPost.readTime} • {rPost.date}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quality Guarantee Box */}
            <div style={{ background: 'linear-gradient(135deg, #043927, #062C19)', color: '#fff', borderRadius: '16px', padding: '24px', textAlign: 'center' }}>
              <ShieldCheck size={36} color="#34d399" style={{ margin: '0 auto 10px auto' }} />
              <div style={{ fontWeight: 700, fontSize: '1rem', marginBottom: '6px' }}>100% Pure Organic Sourcing</div>
              <p style={{ fontSize: '0.82rem', color: '#cbd5e1', lineHeight: 1.5, margin: 0 }}>
                Every single nut and seed is triple-sorted and certified under ISO 22000 & FSSAI grade-A standards.
              </p>
            </div>

          </aside>

        </div>

      </div>
    </div>
  );
};
