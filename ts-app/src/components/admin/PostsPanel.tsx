import React, { useState } from 'react';

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
  seoScoreColor?: string;
  readabilityScoreColor?: string;
}

export interface WPCategory {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

export interface WPTag {
  id: string;
  name: string;
  slug: string;
  description: string;
  count: number;
}

const initialPosts: WPPost[] = [
  {
    id: 'post-1',
    title: 'The Rise of Smart Snacking: Why Dry Fruits Are the Future of Healthy Eating — Elementor',
    author: 'admin',
    categories: ['Dry Fruit'],
    tags: [],
    commentsCount: 0,
    date: '2026/03/24 at 6:33 am',
    status: 'Published',
    content: 'Smart snacking with dry fruits provides natural energy and clean nutrition...',
    seoScoreColor: '#d63638',
    readabilityScoreColor: '#dba617'
  },
  {
    id: 'post-2',
    title: 'Behind the Quality: What Goes Into Delivering Premium Dry Fruits at Scale — Elementor',
    author: 'admin',
    categories: ['Dry Fruit'],
    tags: ['Dry Fruit', 'Marketing'],
    commentsCount: 0,
    date: '2026/03/23 at 11:52 am',
    status: 'Published',
    content: 'Quality sourcing and cold storage preservation ensures premium texture and taste...',
    seoScoreColor: '#d63638',
    readabilityScoreColor: '#dba617'
  },
  {
    id: 'post-3',
    title: 'Smart Parenting, Smarter Nutrition: The Role of Dry Fruit Powders in Kids\' Diets — Elementor',
    author: 'admin',
    categories: ['Dry Fruit'],
    tags: ['Dry Fruit', 'Dry Fruit Powders', 'Nutrition'],
    commentsCount: 0,
    date: '2026/03/23 at 11:41 am',
    status: 'Published',
    content: 'Dry fruit powders make it easy to boost children daily milk and meals with vitamins...',
    seoScoreColor: '#d63638',
    readabilityScoreColor: '#dba617'
  }
];

const initialCategories: WPCategory[] = [
  { id: 'cat-1', name: 'Dry Fruit', slug: 'dry-fruit', description: 'Premium quality sourced dry fruits.', count: 3 },
  { id: 'cat-2', name: 'Health & Wellness', slug: 'health-wellness', description: 'Articles on natural nutrition and wellness habits.', count: 0 },
  { id: 'cat-3', name: 'Organic Living', slug: 'organic-living', description: 'Sustainable organic lifestyle guides.', count: 0 }
];

const initialTags: WPTag[] = [
  { id: 'tag-1', name: 'Business', slug: 'business', description: '', count: 0 },
  { id: 'tag-2', name: 'Communication', slug: 'communication', description: '', count: 0 },
  { id: 'tag-3', name: 'Dry Fruit', slug: 'dry-fruit', description: '', count: 2 },
  { id: 'tag-4', name: 'Dry Fruit Powders', slug: 'dry-fruit-powders', description: '', count: 1 },
  { id: 'tag-5', name: 'Fashion', slug: 'fashion', description: '', count: 0 },
  { id: 'tag-6', name: 'Marketing', slug: 'marketing', description: '', count: 1 },
  { id: 'tag-7', name: 'Nutrition', slug: 'nutrition', description: '', count: 1 },
  { id: 'tag-8', name: 'Teamwork', slug: 'teamwork', description: '', count: 0 }
];

interface PostsPanelProps {
  subView?: 'all' | 'add' | 'categories' | 'tags';
}

export const PostsPanel: React.FC<PostsPanelProps> = ({ subView = 'all' }) => {
  const [posts, setPosts] = useState<WPPost[]>(initialPosts);
  const [categories, setCategories] = useState<WPCategory[]>(initialCategories);
  const [tags, setTags] = useState<WPTag[]>(initialTags);

  // Form states for Add New Post
  const [newTitle, setNewTitle] = useState('');
  const [newContent, setNewContent] = useState('');
  const [newStatus, setNewStatus] = useState<'Published' | 'Draft'>('Published');
  const [selectedCats, setSelectedCats] = useState<string[]>(['Dry Fruit']);

  // Form states for Category
  const [catName, setCatName] = useState('');
  const [catSlug, setCatSlug] = useState('');
  const [catDesc, setCatDesc] = useState('');

  // Form states for Tag
  const [tagName, setTagName] = useState('');
  const [tagSlug, setTagSlug] = useState('');
  const [tagDesc, setTagDesc] = useState('');

  const [activeTab, setActiveTab] = useState<'all' | 'add' | 'categories' | 'tags'>(subView);

  const [editingPost, setEditingPost] = useState<WPPost | null>(null);

  const handleEditPost = (post: WPPost) => {
    setEditingPost(post);
    setNewTitle(post.title);
    setNewContent(post.content || '');
    setNewStatus(post.status === 'Draft' ? 'Draft' : 'Published');
    if (post.categories && post.categories.length > 0) {
      setSelectedCats(post.categories);
    }
    setActiveTab('add');
  };

  const [selectedPostIds, setSelectedPostIds] = useState<string[]>([]);
  const [bulkAction, setBulkAction] = useState<string>('Bulk actions');
  const [showBulkEditPanel, setShowBulkEditPanel] = useState<boolean>(false);
  const [bulkEditCategory, setBulkEditCategory] = useState<string>('');
  const [bulkEditStatus, setBulkEditStatus] = useState<string>('');

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      setSelectedPostIds(posts.map((p) => p.id));
    } else {
      setSelectedPostIds([]);
    }
  };

  const handleSelectPost = (id: string, checked: boolean) => {
    if (checked) {
      setSelectedPostIds([...selectedPostIds, id]);
    } else {
      setSelectedPostIds(selectedPostIds.filter((pId) => pId !== id));
    }
  };

  const handleApplyBulkAction = (actionChoice?: string) => {
    const actionToApply = actionChoice || bulkAction;
    if (selectedPostIds.length === 0) {
      alert('Please select at least one post using the checkbox.');
      return;
    }

    if (actionToApply === 'edit' || actionToApply === 'Bulk edit') {
      setShowBulkEditPanel(true);
    } else if (actionToApply === 'trash' || actionToApply === 'Move to Trash') {
      if (window.confirm(`Are you sure you want to move ${selectedPostIds.length} post(s) to Trash?`)) {
        setPosts(posts.filter((p) => !selectedPostIds.includes(p.id)));
        setSelectedPostIds([]);
        alert('Selected post(s) moved to Trash.');
      }
    }
  };

  const handleSaveBulkEdit = () => {
    setPosts(
      posts.map((p) => {
        if (selectedPostIds.includes(p.id)) {
          const updatedCategories = bulkEditCategory && !p.categories.includes(bulkEditCategory)
            ? [...p.categories, bulkEditCategory]
            : p.categories;
          const updatedStatus = (bulkEditStatus as 'Published' | 'Draft') || p.status;
          return { ...p, categories: updatedCategories, status: updatedStatus };
        }
        return p;
      })
    );
    setShowBulkEditPanel(false);
    setSelectedPostIds([]);
    alert(`Successfully updated ${selectedPostIds.length} post(s).`);
  };

  const handleAddPost = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newTitle.trim()) return;

    if (editingPost) {
      setPosts(
        posts.map((p) =>
          p.id === editingPost.id
            ? {
                ...p,
                title: newTitle,
                content: newContent,
                status: newStatus,
                categories: selectedCats
              }
            : p
        )
      );
      alert(`Post “${newTitle}” successfully updated!`);
      setEditingPost(null);
    } else {
      const post: WPPost = {
        id: `post-${Date.now()}`,
        title: newTitle,
        author: 'admin',
        categories: selectedCats,
        tags: ['Dry Fruit'],
        commentsCount: 0,
        date: `${new Date().toISOString().split('T')[0]} at 12:00 pm`,
        status: newStatus,
        content: newContent,
        seoScoreColor: '#d63638',
        readabilityScoreColor: '#dba617'
      };
      setPosts([post, ...posts]);
      alert(`New post “${newTitle}” published successfully!`);
    }

    setNewTitle('');
    setNewContent('');
    setActiveTab('all');
  };

  const handleDeletePost = (id: string) => {
    if (window.confirm('Are you sure you want to move this post to Trash?')) {
      setPosts(posts.filter((p) => p.id !== id));
    }
  };

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!catName.trim()) return;

    const newCat: WPCategory = {
      id: `cat-${Date.now()}`,
      name: catName,
      slug: catSlug || catName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: catDesc,
      count: 0
    };

    setCategories([...categories, newCat]);
    setCatName('');
    setCatSlug('');
    setCatDesc('');
  };

  const handleAddTag = (e: React.FormEvent) => {
    e.preventDefault();
    if (!tagName.trim()) return;

    const newTag: WPTag = {
      id: `tag-${Date.now()}`,
      name: tagName,
      slug: tagSlug || tagName.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      description: tagDesc,
      count: 0
    };

    setTags([...tags, newTag]);
    setTagName('');
    setTagSlug('');
    setTagDesc('');
  };

  return (
    <div style={{ maxWidth: '1280px' }}>
      
      {/* 1. All Posts View (edit.php) matching screenshot 100% */}
      {activeTab === 'all' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '15px' }}>
            <h1 className="wp-page-title" style={{ margin: 0 }}>
              Posts
              <button className="wp-button-secondary" style={{ marginLeft: '10px' }} onClick={() => setActiveTab('add')}>
                Add Post
              </button>
            </h1>
            <div style={{ display: 'flex', gap: '8px' }}>
              <button type="button" className="wp-button-secondary">Screen Options ▼</button>
              <button type="button" className="wp-button-secondary">Help ▼</button>
            </div>
          </div>

          <div style={{ display: 'flex', gap: '10px', alignItems: 'center', marginBottom: '12px', fontSize: '13px' }}>
            <span style={{ fontWeight: 600, color: '#1d2327' }}>All ({posts.length})</span> | 
            <span style={{ color: '#2271b1', cursor: 'pointer' }}>Published ({posts.filter(p => p.status === 'Published').length})</span> |
            <span style={{ color: '#2271b1', cursor: 'pointer' }}>Cornerstone content (0)</span>
          </div>

          {/* Top Actions & Filters bar matching screenshot */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)} style={{ fontSize: '13px', padding: '4px 8px' }}>
                <option value="Bulk actions">Bulk actions</option>
                <option value="Bulk edit">Bulk edit</option>
                <option value="Move to Trash">Move to Trash</option>
              </select>
              <button type="button" className="wp-button-secondary" onClick={() => handleApplyBulkAction()}>Apply</button>

              <select style={{ fontSize: '13px', padding: '4px 8px', marginLeft: '6px' }}>
                <option>All dates</option>
              </select>
              <select style={{ fontSize: '13px', padding: '4px 8px' }}>
                <option>All Categories</option>
                {categories.map(c => <option key={c.id}>{c.name}</option>)}
              </select>
              <select style={{ fontSize: '13px', padding: '4px 8px' }}>
                <option>All SEO Scores</option>
              </select>
              <select style={{ fontSize: '13px', padding: '4px 8px' }}>
                <option>All Readability Scores</option>
              </select>
              <button type="button" className="wp-button-secondary">Filter</button>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input type="text" style={{ padding: '4px 8px', fontSize: '13px' }} />
              <button type="button" className="wp-button-secondary">Search Posts</button>
              <span style={{ fontSize: '13px', color: '#50575e', marginLeft: '10px' }}>{posts.length} items</span>
            </div>
          </div>

          <table className="wp-list-table">
            <thead>
              <tr>
                <th style={{ width: '30px' }}>
                  <input
                    type="checkbox"
                    checked={selectedPostIds.length === posts.length && posts.length > 0}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                  />
                </th>
                <th>Title <span>▲</span></th>
                <th>Author</th>
                <th>Categories</th>
                <th>Tags</th>
                <th style={{ textAlign: 'center' }}>💬 <span>▲</span></th>
                <th>Date <span>▲</span></th>
                <th style={{ textAlign: 'center', width: '120px' }}>SEO icons</th>
              </tr>
            </thead>
            <tbody>
              {/* WordPress Authentic Inline BULK EDIT Row matching screenshot 2 */}
              {showBulkEditPanel && (
                <tr className="wp-inline-edit-row">
                  <td colSpan={8} style={{ padding: 0, border: '2px solid #2271b1', background: '#ffffff' }}>
                    <div style={{ padding: '12px 16px', background: '#ffffff' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#1d2327', letterSpacing: '0.5px', marginBottom: '10px' }}>
                        BULK EDIT
                      </div>
                      
                      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1.5fr', gap: '16px', fontSize: '13px' }}>
                        
                        {/* Col 1: Selected Post List */}
                        <div>
                          <div style={{ border: '1px solid #8c8f94', borderRadius: '2px', background: '#ffffff', padding: '8px', minHeight: '130px', maxHeight: '150px', overflowY: 'auto' }}>
                            {selectedPostIds.map((id) => {
                              const p = posts.find(item => item.id === id);
                              return p ? (
                                <div key={p.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#2c3338', marginBottom: '4px' }}>
                                  <span style={{ color: '#d63638', cursor: 'pointer', fontWeight: 700 }} onClick={() => handleSelectPost(p.id, false)}>✕</span>
                                  <span>{p.title}</span>
                                </div>
                              ) : null;
                            })}
                          </div>
                        </div>

                        {/* Col 2: Categories Checklist */}
                        <div>
                          <div style={{ fontSize: '12px', fontWeight: 600, color: '#1d2327', marginBottom: '4px' }}>Categories</div>
                          <div style={{ border: '1px solid #8c8f94', borderRadius: '2px', background: '#ffffff', padding: '8px', minHeight: '130px', maxHeight: '150px', overflowY: 'auto' }}>
                            {categories.map((c) => (
                              <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', color: '#2c3338', marginBottom: '4px' }}>
                                <input
                                  type="checkbox"
                                  checked={bulkEditCategory === c.name}
                                  onChange={(e) => setBulkEditCategory(e.target.checked ? c.name : '')}
                                />
                                {c.name}
                              </label>
                            ))}
                          </div>
                        </div>

                        {/* Col 3: Tags & Post Status Dropdowns */}
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: '#1d2327', marginBottom: '4px' }}>Tags</div>
                            <input
                              type="text"
                              placeholder="Separate tags with commas"
                              style={{ width: '100%', fontSize: '13px' }}
                            />
                            <span style={{ fontSize: '11px', color: '#646970' }}>Separate tags with commas</span>
                          </div>

                          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                            <div>
                              <label style={{ display: 'block', fontSize: '12px', color: '#50575e', marginBottom: '2px' }}>Author</label>
                              <select style={{ width: '100%', fontSize: '12px' }}>
                                <option>— No Change —</option>
                                <option>admin</option>
                              </select>
                            </div>
                            <div>
                              <label style={{ display: 'block', fontSize: '12px', color: '#50575e', marginBottom: '2px' }}>Status</label>
                              <select value={bulkEditStatus} onChange={(e) => setBulkEditStatus(e.target.value)} style={{ width: '100%', fontSize: '12px' }}>
                                <option value="">— No Change —</option>
                                <option value="Published">Published</option>
                                <option value="Draft">Draft</option>
                              </select>
                            </div>
                          </div>
                        </div>

                      </div>

                      {/* Bottom Update / Cancel Buttons */}
                      <div style={{ display: 'flex', gap: '8px', marginTop: '14px', paddingTop: '10px', borderTop: '1px solid #f0f0f1' }}>
                        <button type="button" className="wp-button-primary" style={{ padding: '6px 14px' }} onClick={handleSaveBulkEdit}>
                          Update
                        </button>
                        <button type="button" className="wp-button-secondary" style={{ padding: '6px 14px' }} onClick={() => setShowBulkEditPanel(false)}>
                          Cancel
                        </button>
                      </div>
                    </div>
                  </td>
                </tr>
              )}
              {posts.map((p) => (
                <tr key={p.id}>
                  <td>
                    <input
                      type="checkbox"
                      checked={selectedPostIds.includes(p.id)}
                      onChange={(e) => handleSelectPost(p.id, e.target.checked)}
                    />
                  </td>
                  <td style={{ maxWidth: '380px' }}>
                    <span className="wp-post-title-link" onClick={() => handleEditPost(p)}>
                      {p.title}
                    </span>
                    <div className="row-actions">
                      <span style={{ color: '#2271b1', cursor: 'pointer' }} onClick={() => handleEditPost(p)}>Edit</span> |
                      <span style={{ color: '#2271b1', cursor: 'pointer' }}>Quick Edit</span> |
                      <span style={{ color: '#d63638', cursor: 'pointer' }} onClick={() => handleDeletePost(p.id)}>Trash</span> |
                      <span style={{ color: '#2271b1', cursor: 'pointer' }}>View</span> |
                      <span style={{ color: '#2271b1', cursor: 'pointer' }} onClick={() => handleEditPost(p)}>Edit with Elementor</span>
                    </div>
                  </td>
                  <td><span style={{ color: '#2271b1' }}>{p.author}</span></td>
                  <td><span style={{ color: '#2271b1' }}>{p.categories.join(', ')}</span></td>
                  <td>{p.tags.length > 0 ? <span style={{ color: '#2271b1' }}>{p.tags.join(', ')}</span> : '—'}</td>
                  <td style={{ textAlign: 'center' }}>—</td>
                  <td>
                    {p.status}<br />
                    <span style={{ fontSize: '11px', color: '#646970' }}>{p.date}</span>
                  </td>
                  <td style={{ textAlign: 'center' }}>
                    <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: p.seoScoreColor || '#d63638', marginRight: '8px' }} title="SEO Score" />
                    <span style={{ display: 'inline-block', width: '10px', height: '10px', borderRadius: '50%', background: p.readabilityScoreColor || '#dba617', marginRight: '8px' }} title="Readability Score" />
                    <span style={{ fontSize: '12px' }}>0</span>
                    <span style={{ fontSize: '12px', marginLeft: '8px' }}>8</span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {/* Bottom Table Bar matching screenshot */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '10px' }}>
            <div style={{ display: 'flex', gap: '6px' }}>
              <select value={bulkAction} onChange={(e) => setBulkAction(e.target.value)} style={{ fontSize: '13px', padding: '4px 8px' }}>
                <option value="Bulk actions">Bulk actions</option>
                <option value="Bulk edit">Bulk edit</option>
                <option value="Move to Trash">Move to Trash</option>
              </select>
              <button type="button" className="wp-button-secondary" onClick={() => handleApplyBulkAction()}>Apply</button>
            </div>
            <div style={{ fontSize: '13px', color: '#50575e' }}>{posts.length} items</div>
          </div>

        </div>
      )}

      {/* 2. Add New / Edit Post View (post-new.php / post.php?post=id&action=edit) */}
      {activeTab === 'add' && (
        <div className="wp-card" style={{ maxWidth: '1000px' }}>
          <h1 className="wp-page-title">{editingPost ? 'Edit Post' : 'Add New Post'}</h1>
          <form onSubmit={handleAddPost} style={{ display: 'grid', gridTemplateColumns: '3fr 1fr', gap: '20px', marginTop: '16px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div>
                <label className="wp-label">Title</label>
                <input
                  type="text"
                  className="wp-input"
                  placeholder="Add title"
                  value={newTitle}
                  onChange={(e) => setNewTitle(e.target.value)}
                  style={{ fontSize: '18px', fontWeight: 600, padding: '8px 12px' }}
                  required
                />
              </div>

              <div>
                <label className="wp-label">Content</label>
                <textarea
                  className="wp-input"
                  rows={14}
                  placeholder="Type / to choose a block"
                  value={newContent}
                  onChange={(e) => setNewContent(e.target.value)}
                  style={{ fontFamily: 'monospace', fontSize: '14px', lineHeight: '1.5' }}
                  required
                />
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              <div className="wp-card" style={{ padding: '12px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', borderBottom: '1px solid #c3c4c7', paddingBottom: '6px' }}>Publish</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '13px', color: '#50575e' }}>
                  <div>Status: <strong>{newStatus}</strong></div>
                  <div>Visibility: <strong>Public</strong></div>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '16px', paddingTop: '12px', borderTop: '1px solid #f0f0f1' }}>
                  <button
                    type="button"
                    style={{ color: '#d63638', background: 'none', border: 'none', cursor: 'pointer', fontSize: '13px', textDecoration: 'underline' }}
                    onClick={() => { setEditingPost(null); setActiveTab('all'); }}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="wp-button-primary">
                    {editingPost ? 'Update' : 'Publish'}
                  </button>
                </div>
              </div>

              <div className="wp-card" style={{ padding: '12px' }}>
                <h3 style={{ fontSize: '14px', fontWeight: 600, marginBottom: '12px', borderBottom: '1px solid #c3c4c7', paddingBottom: '6px' }}>Categories</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', maxHeight: '150px', overflowY: 'auto' }}>
                  {categories.map((c) => (
                    <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px' }}>
                      <input
                        type="checkbox"
                        checked={selectedCats.includes(c.name)}
                        onChange={(e) => {
                          if (e.target.checked) setSelectedCats([...selectedCats, c.name]);
                          else setSelectedCats(selectedCats.filter((cat) => cat !== c.name));
                        }}
                      />
                      {c.name}
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </form>
        </div>
      )}

      {/* 3. Categories View (edit-tags.php?taxonomy=category) */}
      {activeTab === 'categories' && (
        <div>
          <h1 className="wp-page-title">Categories</h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2fr', gap: '20px' }}>
            
            {/* Left Add Form */}
            <div className="wp-card">
              <div className="wp-card-header">Add New Category</div>
              <form onSubmit={handleAddCategory} style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Name</label>
                  <input type="text" value={catName} onChange={(e) => setCatName(e.target.value)} style={{ width: '100%' }} required />
                  <span style={{ display: 'block', fontSize: '12px', color: '#646970', marginTop: '4px' }}>
                    The name is how it appears on your site.
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Slug</label>
                  <input type="text" value={catSlug} onChange={(e) => setCatSlug(e.target.value)} style={{ width: '100%' }} />
                  <span style={{ display: 'block', fontSize: '12px', color: '#646970', marginTop: '4px' }}>
                    The "slug" is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Description</label>
                  <textarea rows={4} value={catDesc} onChange={(e) => setCatDesc(e.target.value)} style={{ width: '100%' }} />
                  <span style={{ display: 'block', fontSize: '12px', color: '#646970', marginTop: '4px' }}>
                    The description is not prominent by default; however, some themes may show it.
                  </span>
                </div>

                <button type="submit" className="wp-button-primary" style={{ alignSelf: 'flex-start' }}>Add New Category</button>
              </form>
            </div>

            {/* Right Categories Table */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <select style={{ fontSize: '13px', padding: '4px 8px' }}>
                    <option>Bulk actions</option>
                    <option>Delete</option>
                  </select>
                  <button type="button" className="wp-button-secondary">Apply</button>
                </div>
                <div style={{ fontSize: '13px', color: '#50575e' }}>{categories.length} items</div>
              </div>

              <table className="wp-list-table">
                <thead>
                  <tr>
                    <th style={{ width: '30px' }}><input type="checkbox" /></th>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Slug</th>
                    <th>Count</th>
                  </tr>
                </thead>
                <tbody>
                  {categories.map((c) => (
                    <tr key={c.id}>
                      <td><input type="checkbox" /></td>
                      <td>
                        <strong style={{ color: '#2271b1' }}>{c.name}</strong>
                        <div className="row-actions">
                          <span style={{ color: '#2271b1', cursor: 'pointer' }}>Edit</span> |
                          <span style={{ color: '#d63638', cursor: 'pointer' }}>Delete</span> |
                          <span style={{ color: '#2271b1', cursor: 'pointer' }}>View</span>
                        </div>
                      </td>
                      <td>{c.description || '—'}</td>
                      <td>{c.slug}</td>
                      <td>{c.count}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

          </div>
        </div>
      )}

      {/* 4. Tags View (edit-tags.php?taxonomy=post_tag) */}
      {activeTab === 'tags' && (
        <div>
          <h1 className="wp-page-title">Tags</h1>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 2.2fr', gap: '20px' }}>
            
            {/* Left Add Tag Form */}
            <div className="wp-card">
              <div className="wp-card-header" style={{ border: 'none', paddingBottom: 0, marginBottom: '12px', fontSize: '15px' }}>
                Add Tag
              </div>
              <form onSubmit={handleAddTag} style={{ display: 'flex', flexDirection: 'column', gap: '14px', fontSize: '13px' }}>
                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Name</label>
                  <input type="text" value={tagName} onChange={(e) => setTagName(e.target.value)} style={{ width: '100%' }} required />
                  <span style={{ display: 'block', fontSize: '12px', color: '#646970', marginTop: '4px' }}>
                    The name is how it appears on your site.
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Slug</label>
                  <input type="text" value={tagSlug} onChange={(e) => setTagSlug(e.target.value)} style={{ width: '100%' }} />
                  <span style={{ display: 'block', fontSize: '12px', color: '#646970', marginTop: '4px' }}>
                    The "slug" is the URL-friendly version of the name. It is usually all lowercase and contains only letters, numbers, and hyphens.
                  </span>
                </div>

                <div>
                  <label style={{ display: 'block', fontWeight: 600, marginBottom: '4px' }}>Description</label>
                  <textarea rows={4} value={tagDesc} onChange={(e) => setTagDesc(e.target.value)} style={{ width: '100%' }} />
                  <span style={{ display: 'block', fontSize: '12px', color: '#646970', marginTop: '4px' }}>
                    The description is not prominent by default; however, some themes may show it.
                  </span>
                </div>

                <button type="submit" className="wp-button-primary" style={{ alignSelf: 'flex-start', padding: '6px 14px' }}>Add Tag</button>
              </form>
            </div>

            {/* Right Tags Table */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' }}>
                <div style={{ display: 'flex', gap: '6px' }}>
                  <select style={{ fontSize: '13px', padding: '4px 8px' }}>
                    <option>Bulk actions</option>
                    <option>Delete</option>
                  </select>
                  <button type="button" className="wp-button-secondary">Apply</button>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="text" placeholder="" style={{ padding: '4px 8px', fontSize: '13px' }} />
                  <button type="button" className="wp-button-secondary">Search Tags</button>
                  <span style={{ fontSize: '13px', color: '#50575e', marginLeft: '10px' }}>{tags.length} items</span>
                </div>
              </div>

              <table className="wp-list-table">
                <thead>
                  <tr>
                    <th style={{ width: '30px' }}><input type="checkbox" /></th>
                    <th>Name <span>▲</span></th>
                    <th>Description <span>♦</span></th>
                    <th>Slug <span>♦</span></th>
                    <th style={{ textAlign: 'right' }}>Count <span>♦</span></th>
                  </tr>
                </thead>
                <tbody>
                  {tags.map((t) => (
                    <tr key={t.id}>
                      <td><input type="checkbox" /></td>
                      <td>
                        <strong style={{ color: '#2271b1' }}>{t.name}</strong>
                        <div className="row-actions">
                          <span style={{ color: '#2271b1', cursor: 'pointer' }}>Edit</span> |
                          <span style={{ color: '#d63638', cursor: 'pointer' }}>Delete</span> |
                          <span style={{ color: '#2271b1', cursor: 'pointer' }}>View</span>
                        </div>
                      </td>
                      <td>{t.description || '—'}</td>
                      <td>{t.slug}</td>
                      <td style={{ textAlign: 'right' }}>{t.count}</td>
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
