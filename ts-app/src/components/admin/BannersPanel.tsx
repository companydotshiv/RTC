import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AdminBanner } from '../../data/adminStore';
import { Plus, Trash2, Edit2, ExternalLink, X } from 'lucide-react';

export const BannersPanel: React.FC = () => {
  const [selectedPageFilter, setSelectedPageFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<AdminBanner> | null>(null);

  const banners = adminStore.banners;

  const filteredBanners = banners.filter((b) => selectedPageFilter === 'all' || b.page === selectedPageFilter);

  const handleOpenAddModal = () => {
    setEditingBanner({
      page: 'home_slider',
      title: '',
      subtitle: '',
      imageUrl: 'https://images.unsplash.com/photo-1613478223719-2ab802602423?auto=format&fit=crop&q=80&w=1200',
      linkUrl: '/products',
      buttonText: 'Shop Now',
      isActive: true,
      order: banners.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (b: AdminBanner) => {
    setEditingBanner(b);
    setIsModalOpen(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner || !editingBanner.title) return;
    adminStore.addOrUpdateBanner(editingBanner);
    setIsModalOpen(false);
    setEditingBanner(null);
  };

  const handleDeleteBanner = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete banner "${title}"?`)) {
      adminStore.deleteBanner(id);
    }
  };

  const pageLabels: Record<string, string> = {
    home_slider: 'Home Page Main Slider',
    products_page: 'Products Page Banner',
    checkout_page: 'Checkout Header Banner',
    category_header: 'Category Header Banner'
  };

  return (
    <div className="banners-panel">
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Storefront Banners & Carousels</h2>
          <p style={{ margin: '4px 0 0 0', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
            Control hero graphics, marketing banners, and promo links across all pages
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <select
            className="admin-form-control"
            style={{ width: '220px' }}
            value={selectedPageFilter}
            onChange={(e) => setSelectedPageFilter(e.target.value)}
          >
            <option value="all">All Pages Banners</option>
            <option value="home_slider">Home Page Slider</option>
            <option value="products_page">Products Page</option>
            <option value="checkout_page">Checkout Page</option>
            <option value="category_header">Category Banners</option>
          </select>

          <button className="admin-btn admin-btn-primary" onClick={handleOpenAddModal}>
            <Plus size={16} /> Add Banner
          </button>
        </div>
      </div>

      {/* Banner Cards Grid */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))', gap: '1.5rem' }}>
        {filteredBanners.map((b) => (
          <div key={b.id} className="admin-card" style={{ marginBottom: 0, overflow: 'hidden', padding: 0 }}>
            <div style={{ position: 'relative', height: '160px', background: '#0f172a' }}>
              <img src={b.imageUrl} alt={b.title} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              <div style={{ position: 'absolute', top: '10px', left: '10px' }}>
                <span className="status-pill info" style={{ background: 'rgba(15, 23, 42, 0.85)', backdropFilter: 'blur(4px)' }}>
                  {pageLabels[b.page] || b.page}
                </span>
              </div>
            </div>

            <div style={{ padding: '1.25rem' }}>
              <h3 style={{ margin: '0 0 0.4rem 0', fontSize: '1.05rem' }}>{b.title}</h3>
              {b.subtitle && <p style={{ margin: '0 0 0.75rem 0', fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>{b.subtitle}</p>}

              <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.8rem', color: '#38bdf8', marginBottom: '1rem' }}>
                <ExternalLink size={14} /> Link: {b.linkUrl} | Button: "{b.buttonText}"
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid var(--admin-border-color)', paddingTop: '0.85rem' }}>
                <span className={`status-pill ${b.isActive ? 'success' : 'danger'}`}>
                  {b.isActive ? 'Active' : 'Inactive'}
                </span>

                <div style={{ display: 'flex', gap: '0.5rem' }}>
                  <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleOpenEditModal(b)}>
                    <Edit2 size={14} /> Edit
                  </button>
                  <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDeleteBanner(b.id, b.title)}>
                    <Trash2 size={14} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Add / Edit Banner Modal */}
      {isModalOpen && editingBanner && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '580px' }}>
            <div className="admin-modal-header">
              <h3>{editingBanner.id ? 'Edit Page Banner' : 'Add New Page Banner'}</h3>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveBanner} className="admin-modal-body">
              <div className="admin-form-group">
                <label>Target Page Location</label>
                <select
                  className="admin-form-control"
                  value={editingBanner.page || 'home_slider'}
                  onChange={(e) => setEditingBanner({ ...editingBanner, page: e.target.value as AdminBanner['page'] })}
                >
                  <option value="home_slider">Home Page Main Slider</option>
                  <option value="products_page">Products Page Banner</option>
                  <option value="checkout_page">Checkout Header Banner</option>
                  <option value="category_header">Category Header Banner</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Banner Headline Title</label>
                <input
                  type="text"
                  required
                  className="admin-form-control"
                  value={editingBanner.title || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Subtitle / Subtext</label>
                <input
                  type="text"
                  className="admin-form-control"
                  value={editingBanner.subtitle || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                />
              </div>

              <div className="admin-form-group">
                <label>Image URL</label>
                <input
                  type="url"
                  required
                  className="admin-form-control"
                  value={editingBanner.imageUrl || ''}
                  onChange={(e) => setEditingBanner({ ...editingBanner, imageUrl: e.target.value })}
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Redirect Link URL</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="/products or /category/fruits"
                    value={editingBanner.linkUrl || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, linkUrl: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Button Label Text</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Shop Now"
                    value={editingBanner.buttonText || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, buttonText: e.target.value })}
                  />
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save Banner
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
