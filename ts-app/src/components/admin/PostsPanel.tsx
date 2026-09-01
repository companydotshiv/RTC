import React, { useState } from 'react';
import { Plus, Search, Edit2, Trash2, Check, AlertCircle, ArrowLeft, Image as ImageIcon } from 'lucide-react';

export interface WPPost {
  id: string;
  title: string;
  author: string;
  categories: string[];
  tags: string[];
  commentsCount: number;
  date: string;
  status: 'Published' | 'Draft' | 'Pending';
  content?: string;
  image?: string;
}

export interface WPCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

const initialPosts: WPPost[] = [
  {
    id: 'post-1',
    title: 'The Rise of Smart Snacking: Why Dry Fruits Are the Future of Healthy Eating',
    author: 'admin',
    categories: ['Nutrition & Health'],
    tags: ['Dry Fruits', 'Healthy Eating'],
    commentsCount: 0,
    date: '2026/03/24 at 6:33 am',
    status: 'Published',
    content: 'Smart snacking with dry fruits provides natural sustained energy, healthy monounsaturated fats, and clean protein without artificial spikes.',
    image: '/cat_almond.png'
  },
  {
    id: 'post-2',
    title: 'Behind the Quality: What Goes Into Delivering Premium Grade Dry Fruits at Scale',
    author: 'admin',
    categories: ['Superfoods & Nuts'],
    tags: ['Dry Fruits', 'Quality Control'],
    commentsCount: 0,
    date: '2026/03/23 at 11:52 am',
    status: 'Published',
    content: 'Quality sourcing, optical sizing, and multi-layer nitrogen packaging preservation ensure pristine texture, crunch, and vitality.',
    image: '/cat_walnut.png'
  },
  {
    id: 'post-3',
    title: 'Smart Parenting, Smarter Nutrition: The Role of Dry Fruit Powders in Kids\' Diets',
    author: 'admin',
    categories: ['Nutrition & Health'],
    tags: ['Kids Nutrition', 'Dry Fruit Powders'],
    commentsCount: 0,
    date: '2026/03/23 at 11:41 am',
    status: 'Published',
    content: 'Dry fruit powders make it easy to boost growing children’s daily milk and meals with natural vitamins, calcium, and plant protein.',
    image: '/cat_cashew.png'
  }
];

const initialCategories: WPCategory[] = [
  { id: 'cat-1', name: 'Nutrition & Health', slug: 'nutrition-health', description: 'Articles on natural nutrition and wellness habits.', count: 2 },
  { id: 'cat-2', name: 'Superfoods & Nuts', slug: 'superfoods-nuts', description: 'Deep dives on almonds, walnuts, cashews and seeds.', count: 1 },
  { id: 'cat-3', name: 'Storage & Freshness', slug: 'storage-freshness', description: 'Tips on storing dry fruits in summer and monsoon.', count: 0 },
  { id: 'cat-4', name: 'Recipes & Gifting', slug: 'recipes-gifting', description: 'Festive hamper guides and healthy culinary recipes.', count: 0 }
];

interface PostsPanelProps {
  subView?: 'all' | 'add' | 'categories' | 'tags';
}

export const PostsPanel: React.FC<PostsPanelProps> = ({ subView = 'all' }) => {
  const [posts, setPosts] = useState<WPPost[]>(initialPosts);
  const [categories, setCategories] = useState<WPCategory[]>(initialCategories);
  const [currentView, setCurrentView] = useState<'list' | 'editor' | 'categories'>(
    subView === 'add' ? 'editor' : subView === 'categories' ? 'categories' : 'list'
  );
  const [editingPost, setEditingPost] = useState<Partial<WPPost> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // New category form
  const [newCatName, setNewCatName] = useState('');
  const [newCatSlug, setNewCatSlug] = useState('');
  const [newCatDesc, setNewCatDesc] = useState('');

  const filteredPosts = posts.filter((p) => {
    return p.title.toLowerCase().includes(searchTerm.toLowerCase());
  });

  const handleOpenAdd = () => {
    setEditingPost({
      title: '',
      author: 'admin',
      categories: ['Nutrition & Health'],
      tags: [],
      date: new Date().toISOString().split('T')[0],
      status: 'Published',
      content: '',
      image: '/cat_almond.png'
    });
    setCurrentView('editor');
  };

  const handleOpenEdit = (p: WPPost) => {
    setEditingPost(p);
    setCurrentView('editor');
  };

  const handleSavePost = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingPost || !editingPost.title) {
      alert('Please enter a post title.');
      return;
    }

    if (editingPost.id) {
      setPosts(posts.map((p) => (p.id === editingPost.id ? ({ ...p, ...editingPost } as WPPost) : p)));
    } else {
      const newP: WPPost = {
        id: `post-${Date.now()}`,
        title: editingPost.title,
        author: 'admin',
        categories: editingPost.categories || ['Nutrition & Health'],
        tags: editingPost.tags || [],
        commentsCount: 0,
        date: new Date().toISOString().split('T')[0],
        status: 'Published',
        content: editingPost.content || '',
        image: editingPost.image || '/cat_almond.png'
      };
      setPosts([newP, ...posts]);
    }

    setSaveStatus({ type: 'success', message: 'Post published successfully.' });
    setTimeout(() => setSaveStatus(null), 3000);
    setCurrentView('list');
    setEditingPost(null);
  };

  const handleDeletePost = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to move post "${title}" to trash?`)) {
      setPosts(posts.filter((p) => p.id !== id));
      if (editingPost?.id === id) {
        setCurrentView('list');
        setEditingPost(null);
      }
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCatName.trim()) return;
    const cat: WPCategory = {
      id: `cat-${Date.now()}`,
      name: newCatName.trim(),
      slug: newCatSlug.trim() || newCatName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: newCatDesc.trim(),
      count: 0
    };
    setCategories([...categories, cat]);
    setNewCatName('');
    setNewCatSlug('');
    setNewCatDesc('');
    setSaveStatus({ type: 'success', message: 'Category added.' });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="posts-panel" style={{ textAlign: 'left' }}>
      
      {/* Toast Save Notification */}
      {saveStatus && (
        <div
          style={{
            position: 'fixed',
            top: '40px',
            right: '24px',
            background: saveStatus.type === 'success' ? '#008a20' : '#d63638',
            color: '#ffffff',
            padding: '12px 20px',
            borderRadius: '4px',
            boxShadow: '0 4px 16px rgba(0,0,0,0.18)',
            zIndex: 99999,
            fontWeight: 600,
            fontSize: '13px',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px'
          }}
        >
          {saveStatus.type === 'success' ? <Check size={16} color="#fff" /> : <AlertCircle size={16} color="#fff" />}
          <span>{saveStatus.message}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. ALL POSTS LIST VIEW */}
      {/* ========================================================================= */}
      {currentView === 'list' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <h1 className="wp-page-title" style={{ margin: 0 }}>Posts</h1>
            <button className="wp-button-secondary" onClick={handleOpenAdd} style={{ fontWeight: 600 }}>
              Add New
            </button>
            <button className="wp-button-secondary" onClick={() => setCurrentView('categories')} style={{ fontWeight: 600 }}>
              Categories
            </button>
          </div>

          {/* Search Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '12px', gap: '6px' }}>
            <input
              type="search"
              placeholder="Search posts..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '5px 10px', fontSize: '13px', width: '220px' }}
            />
            <button className="wp-button-secondary" style={{ padding: '5px 10px', fontSize: '13px' }}>
              Search Posts
            </button>
          </div>

          {/* WP Post Table */}
          <div className="wp-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #c3c4c7' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="wp-list-table">
                <thead>
                  <tr>
                    <th>Title</th>
                    <th>Author</th>
                    <th>Categories</th>
                    <th>Tags</th>
                    <th style={{ width: '110px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredPosts.map((p) => (
                    <tr key={p.id}>
                      {/* Title & Row Actions */}
                      <td>
                        <span
                          className="wp-post-title-link"
                          onClick={() => handleOpenEdit(p)}
                        >
                          {p.title}
                        </span>
                        <div className="row-actions">
                          <span style={{ color: '#2271b1', cursor: 'pointer' }} onClick={() => handleOpenEdit(p)}>Edit</span>
                          <span style={{ color: '#ddd' }}>|</span>
                          <span style={{ color: '#a00', cursor: 'pointer' }} onClick={() => handleDeletePost(p.id, p.title)}>Trash</span>
                          <span style={{ color: '#ddd' }}>|</span>
                          <a href="/blog" target="_blank" rel="noreferrer" style={{ color: '#2271b1', textDecoration: 'none' }}>View</a>
                        </div>
                      </td>

                      {/* Author */}
                      <td style={{ color: '#2271b1', fontWeight: 500 }}>{p.author}</td>

                      {/* Categories */}
                      <td>
                        {(p.categories || []).join(', ') || '—'}
                      </td>

                      {/* Tags */}
                      <td style={{ fontSize: '12px', color: '#50575e' }}>
                        {(p.tags || []).join(', ') || '—'}
                      </td>

                      {/* Date */}
                      <td style={{ fontSize: '12px', color: '#64748b' }}>
                        Published<br />
                        {p.date}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. POST EDITOR (Add New Post / Edit Post) */}
      {/* ========================================================================= */}
      {currentView === 'editor' && editingPost && (
        <form onSubmit={handleSavePost}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                className="wp-button-secondary"
                onClick={() => setCurrentView('list')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <ArrowLeft size={14} /> Back to Posts
              </button>
              <h1 className="wp-page-title" style={{ margin: 0 }}>
                {editingPost.id ? `Edit Post` : 'Add New Post'}
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {editingPost.id && (
                <button
                  type="button"
                  style={{ background: '#fcf0f1', border: '1px solid #d63638', color: '#d63638', padding: '5px 12px', borderRadius: '3px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
                  onClick={() => handleDeletePost(editingPost.id as string, editingPost.title || '')}
                >
                  Move to Trash
                </button>
              )}
              <button type="submit" className="wp-button-primary" style={{ padding: '6px 16px', fontWeight: 700 }}>
                {editingPost.id ? 'Update Post' : 'Publish Post'}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }}>
            
            {/* Left Main Content */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Title Input */}
              <div style={{ background: '#fff', border: '1px solid #c3c4c7', padding: '12px 14px', borderRadius: '3px' }}>
                <input
                  type="text"
                  required
                  placeholder="Enter title here"
                  value={editingPost.title || ''}
                  onChange={(e) => setEditingPost({ ...editingPost, title: e.target.value })}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    fontSize: '18px',
                    fontWeight: 600,
                    border: '1px solid #8c8f94',
                    borderRadius: '2px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Content Box */}
              <div className="wp-card" style={{ padding: 0 }}>
                <div className="wp-card-header" style={{ padding: '10px 14px', margin: 0, background: '#f6f7f7', fontWeight: 600, fontSize: '13px' }}>
                  Post Content
                </div>
                <div style={{ padding: '12px' }}>
                  <textarea
                    rows={12}
                    value={editingPost.content || ''}
                    onChange={(e) => setEditingPost({ ...editingPost, content: e.target.value })}
                    placeholder="Write article content, health insights, and takeaways..."
                    style={{ width: '100%', minWidth: '100%', boxSizing: 'border-box', padding: '12px', fontSize: '14px', lineHeight: 1.7 }}
                  />
                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Publish Box */}
              <div className="wp-card" style={{ padding: 0 }}>
                <div className="wp-card-header" style={{ padding: '10px 14px', margin: 0, background: '#f6f7f7', fontWeight: 600, fontSize: '13px' }}>
                  Publish
                </div>
                <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#50575e' }}>
                  <div>Status: <strong style={{ color: '#1d2327' }}>Published</strong></div>
                  <div>Visibility: <strong style={{ color: '#1d2327' }}>Public</strong></div>
                  <div>Author: <strong style={{ color: '#1d2327' }}>admin</strong></div>
                </div>
                <div style={{ padding: '10px 14px', background: '#f6f7f7', borderTop: '1px solid #c3c4c7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {editingPost.id ? (
                    <span
                      style={{ color: '#a00', textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }}
                      onClick={() => handleDeletePost(editingPost.id as string, editingPost.title || '')}
                    >
                      Move to Trash
                    </span>
                  ) : <div />}
                  <button type="submit" className="wp-button-primary" style={{ fontWeight: 700 }}>
                    {editingPost.id ? 'Update' : 'Publish'}
                  </button>
                </div>
              </div>

              {/* Categories Box */}
              <div className="wp-card" style={{ padding: 0 }}>
                <div className="wp-card-header" style={{ padding: '10px 14px', margin: 0, background: '#f6f7f7', fontWeight: 600, fontSize: '13px' }}>
                  Categories
                </div>
                <div style={{ padding: '12px 14px', maxHeight: '160px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {categories.map((c) => {
                    const isChecked = (editingPost.categories || []).includes(c.name);
                    return (
                      <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                        <input
                          type="checkbox"
                          checked={isChecked}
                          onChange={(e) => {
                            const cur = editingPost.categories || [];
                            const updated = e.target.checked
                              ? [...cur, c.name]
                              : cur.filter((item) => item !== c.name);
                            setEditingPost({ ...editingPost, categories: updated });
                          }}
                        />
                        <span>{c.name}</span>
                      </label>
                    );
                  })}
                </div>
              </div>

              {/* Featured Image Box */}
              <div className="wp-card" style={{ padding: 0 }}>
                <div className="wp-card-header" style={{ padding: '10px 14px', margin: 0, background: '#f6f7f7', fontWeight: 600, fontSize: '13px' }}>
                  Featured image
                </div>
                <div style={{ padding: '14px', textAlign: 'center' }}>
                  {editingPost.image ? (
                    <div>
                      <img
                        src={editingPost.image}
                        alt="Featured"
                        style={{ width: '100%', maxHeight: '140px', objectFit: 'contain', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', marginBottom: '8px' }}
                      />
                      <input
                        type="text"
                        placeholder="Image URL..."
                        value={editingPost.image}
                        onChange={(e) => setEditingPost({ ...editingPost, image: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', fontSize: '12px' }}
                      />
                    </div>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#8c8f94' }}>No featured image set</span>
                  )}
                </div>
              </div>

            </div>

          </div>

        </form>
      )}

      {/* ========================================================================= */}
      {/* 3. CATEGORIES MANAGEMENT VIEW */}
      {/* ========================================================================= */}
      {currentView === 'categories' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <button
              type="button"
              className="wp-button-secondary"
              onClick={() => setCurrentView('list')}
              style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
            >
              <ArrowLeft size={14} /> Back to Posts
            </button>
            <h1 className="wp-page-title" style={{ margin: 0 }}>Categories</h1>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '320px 1fr', gap: '24px', alignItems: 'start' }}>
            
            {/* Add New Category Form */}
            <form onSubmit={handleAddCategory} className="wp-card" style={{ padding: '20px' }}>
              <h3 style={{ fontSize: '14px', fontWeight: 600, margin: '0 0 14px 0' }}>Add New Category</h3>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Name *</label>
                  <input
                    type="text"
                    required
                    value={newCatName}
                    onChange={(e) => setNewCatName(e.target.value)}
                    placeholder="e.g. Superfood Seeds"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Slug</label>
                  <input
                    type="text"
                    value={newCatSlug}
                    onChange={(e) => setNewCatSlug(e.target.value)}
                    placeholder="superfood-seeds"
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Description</label>
                  <textarea
                    rows={3}
                    value={newCatDesc}
                    onChange={(e) => setNewCatDesc(e.target.value)}
                    placeholder="Category summary..."
                    style={{ width: '100%', minWidth: '100%', boxSizing: 'border-box', fontSize: '12px' }}
                  />
                </div>

                <button type="submit" className="wp-button-primary" style={{ width: '140px', marginTop: '6px' }}>
                  Add New Category
                </button>
              </div>
            </form>

            {/* Categories Table */}
            <div className="wp-card" style={{ padding: 0, overflow: 'hidden' }}>
              <table className="wp-list-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Slug</th>
                    <th style={{ width: '60px' }}>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id}>
                      <td style={{ fontWeight: 600, color: '#1d2327' }}>{c.name}</td>
                      <td style={{ fontSize: '12px', color: '#50575e' }}>{c.description || '—'}</td>
                      <td style={{ fontFamily: 'monospace', fontSize: '12px' }}>{c.slug}</td>
                      <td>{c.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
