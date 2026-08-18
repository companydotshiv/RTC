import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AdminBanner } from '../../data/adminStore';
import {
  Plus,
  Trash2,
  Edit3,
  Check,
  Smartphone,
  Monitor,
  Maximize2,
  Minimize2,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Sparkles,
  Layers,
  ArrowRight
} from 'lucide-react';

export const BannersPanel: React.FC = () => {
  const [selectedPageFilter, setSelectedPageFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<AdminBanner> | null>(null);

  // Layout View Modes: Split-Screen or Fullscreen Preview Mode
  const [viewMode, setViewMode] = useState<'split' | 'fullscreen'>('split');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Save Toast Notification State
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const banners = adminStore.banners;
  const filteredBanners = banners.filter((b) => selectedPageFilter === 'all' || b.page === selectedPageFilter || (b.page as string) === `${selectedPageFilter}_slider` || (b.page as string) === `${selectedPageFilter}_page`);

  const handleOpenAddModal = () => {
    setEditingBanner({
      page: 'home',
      position: 'hero',
      title: '100% Pure Premium Dry Fruits & Spices',
      subtitle: 'Triple-sorted jumbo almonds, cashews, Kashmir saffron & gourmet seeds',
      imageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=1200',
      mobileImageUrl: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&q=80&w=600',
      linkUrl: '/products',
      buttonText: 'Shop All Products',
      buttonStyle: 'solid_green',
      textAlign: 'left',
      bgColor: '#043927',
      overlayOpacity: 0.35,
      isActive: true,
      order: banners.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (b: AdminBanner) => {
    setEditingBanner({ ...b });
    setIsModalOpen(true);
  };

  const handleSaveBanner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingBanner || !editingBanner.title) return;

    adminStore.addOrUpdateBanner(editingBanner);
    
    setSaveStatus({ type: 'success', message: 'Saved' });
    setTimeout(() => setSaveStatus(null), 3000);

    setIsModalOpen(false);
    setEditingBanner(null);
  };

  const handleDeleteBanner = (id: string, title: string) => {
    if (window.confirm(`Are you sure you want to delete banner "${title}"?`)) {
      adminStore.deleteBanner(id);
    }
  };

  const pageLabels: Record<string, string> = {
    home: 'Home Page',
    home_slider: 'Home Page Main Hero',
    products: 'Products / Shop Page',
    products_page: 'Products / Shop Page',
    checkout: 'Checkout Page',
    checkout_page: 'Checkout Header',
    category: 'Category Header',
    category_header: 'Category Header'
  };

  const positionLabels: Record<string, string> = {
    hero: 'Top Main Hero Carousel',
    top: 'Top Page Header Banner',
    middle: 'Middle Section Banner',
    bottom: 'Bottom Footer Banner'
  };

  return (
    <div className="banners-panel" style={{ fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif' }}>
      {/* Toast Save Banner Notification */}
      {saveStatus && (
        <div
          style={{
            position: 'fixed',
            top: '50px',
            right: '25px',
            background: saveStatus.type === 'success' ? '#008a20' : '#d63638',
            color: '#ffffff',
            padding: '12px 24px',
            borderRadius: '6px',
            boxShadow: '0 6px 20px rgba(0,0,0,0.18)',
            zIndex: 99999,
            fontWeight: 700,
            fontSize: '0.95rem',
            display: 'inline-flex',
            alignItems: 'center',
            gap: '10px'
          }}
        >
          <div style={{ width: '22px', height: '22px', borderRadius: '50%', background: 'rgba(255,255,255,0.2)', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Check size={16} color="#ffffff" strokeWidth={3.5} />
          </div>
          <span>{saveStatus.message}</span>
        </div>
      )}

      {/* Header Bar with Action Controls */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem', background: '#ffffff', padding: '16px 20px', borderRadius: '8px', border: '1px solid #c3c4c7', boxShadow: '0 1px 3px rgba(0,0,0,0.04)' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem', color: '#1d2327', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '8px' }}>
            <Sparkles size={20} color="#2271b1" /> Page Banner & Visual Customizer
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#646970', fontSize: '0.85rem' }}>
            Canva/MS Word-style visual canvas for hero sliders, section banners & mobile responsive graphics
          </p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center', flexWrap: 'wrap' }}>
          <select
            className="admin-form-control"
            style={{ width: '200px', height: '36px', fontSize: '13px', border: '1px solid #8c8f94', borderRadius: '4px' }}
            value={selectedPageFilter}
            onChange={(e) => setSelectedPageFilter(e.target.value)}
          >
            <option value="all">All Storefront Banners</option>
            <option value="home">Home Page Banners</option>
            <option value="products">Products / Shop Page</option>
            <option value="checkout">Checkout Page</option>
            <option value="category">Category Banners</option>
          </select>

          <button
            className="admin-btn"
            style={{ background: '#2271b1', color: '#fff', border: 'none', padding: '8px 16px', borderRadius: '4px', fontWeight: 600, display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}
            onClick={handleOpenAddModal}
          >
            <Plus size={16} /> Create New Banner
          </button>
        </div>
      </div>

      {/* Banner Cards Grid List */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.5rem', marginBottom: '2rem' }}>
        {filteredBanners.map((b) => (
          <div key={b.id} style={{ background: '#ffffff', borderRadius: '8px', border: '1px solid #c3c4c7', overflow: 'hidden', boxShadow: '0 2px 6px rgba(0,0,0,0.05)', display: 'flex', flexDirection: 'column' }}>
            
            {/* Visual Canvas Banner Card */}
            <div
              style={{
                position: 'relative',
                height: '180px',
                background: b.bgColor || '#0f172a',
                display: 'flex',
                alignItems: 'center',
                justifyContent: b.textAlign === 'center' ? 'center' : b.textAlign === 'right' ? 'flex-end' : 'flex-start',
                padding: '20px',
                overflow: 'hidden'
              }}
            >
              {/* Background Image & Overlay */}
              <img src={b.imageUrl} alt={b.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover', opacity: 1 - (b.overlayOpacity ?? 0.3) }} />
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: b.bgColor || '#000000', opacity: b.overlayOpacity ?? 0.35, zIndex: 1 }} />

              {/* Text Layer */}
              <div style={{ position: 'relative', zIndex: 2, color: '#ffffff', maxWidth: '85%', textAlign: b.textAlign || 'left' }}>
                <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', background: 'rgba(0,0,0,0.6)', padding: '2px 8px', borderRadius: '4px', fontWeight: 700, display: 'inline-block', marginBottom: '6px' }}>
                  {positionLabels[b.position || 'hero'] || b.position}
                </span>
                <h4 style={{ margin: '0 0 4px 0', fontSize: '1.1rem', fontWeight: 700, lineHeight: 1.2, textShadow: '0 2px 4px rgba(0,0,0,0.4)' }}>
                  {b.title}
                </h4>
                {b.subtitle && (
                  <p style={{ margin: 0, fontSize: '0.8rem', opacity: 0.9, display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                    {b.subtitle}
                  </p>
                )}
              </div>

              {/* Status Badge Top Right */}
              <div style={{ position: 'absolute', top: '10px', right: '10px', zIndex: 3 }}>
                <span style={{ background: b.isActive ? '#008a20' : '#d63638', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '4px' }}>
                  {b.isActive ? 'Active' : 'Draft'}
                </span>
              </div>
            </div>

            {/* Banner Details & Action Footer */}
            <div style={{ padding: '14px 16px', background: '#ffffff', flexGrow: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '12px', color: '#646970', marginBottom: '8px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <span>Target Page: <strong style={{ color: '#1d2327' }}>{pageLabels[b.page] || b.page}</strong></span>
                  {b.mobileImageUrl && <span style={{ color: '#0969da', fontSize: '11px', fontWeight: 600 }}>📱 Mobile Opt</span>}
                </div>
                <div style={{ fontSize: '12px', color: '#2271b1', wordBreak: 'break-all', fontWeight: 500, marginBottom: '12px', display: 'flex', alignItems: 'center', gap: '4px' }}>
                  <ArrowRight size={13} /> Link: {b.linkUrl} | Btn: "{b.buttonText}"
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid #f0f0f1', paddingTop: '10px', marginTop: '4px' }}>
                <span style={{ fontSize: '12px', color: '#646970' }}>Order #{b.order}</span>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <button
                    style={{ background: '#f6f7f7', border: '1px solid #2271b1', color: '#2271b1', padding: '5px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => handleOpenEditModal(b)}
                  >
                    <Edit3 size={13} /> Edit Canva Visual
                  </button>
                  <button
                    style={{ background: '#fff0f0', border: '1px solid #d63638', color: '#d63638', padding: '5px 10px', borderRadius: '4px', fontSize: '12px', cursor: 'pointer' }}
                    onClick={() => handleDeleteBanner(b.id, b.title)}
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </div>
            </div>

          </div>
        ))}
      </div>

      {/* Visual Canva/MS Word-Style Editor Modal */}
      {isModalOpen && editingBanner && (
        <div className="admin-modal-overlay" style={{ zIndex: 999999 }}>
          <div
            className="admin-modal"
            style={{
              maxWidth: viewMode === 'fullscreen' ? '96vw' : '1100px',
              width: '95vw',
              height: viewMode === 'fullscreen' ? '92vh' : 'auto',
              maxHeight: '90vh',
              display: 'flex',
              flexDirection: 'column',
              padding: 0,
              overflow: 'hidden',
              borderRadius: '8px'
            }}
          >
            {/* Modal Header */}
            <div style={{ background: '#1d2327', color: '#ffffff', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Layers size={18} color="#2271b1" />
                <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>
                  {editingBanner.id ? `Visual Customizer: "${editingBanner.title}"` : 'Create New Visual Page Banner'}
                </h3>
              </div>

              {/* View Switchers: Split Screen vs Fullscreen & Device Toggle */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ background: '#2c3338', padding: '3px', borderRadius: '4px', display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    style={{ background: previewDevice === 'desktop' ? '#2271b1' : 'transparent', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '3px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => setPreviewDevice('desktop')}
                  >
                    <Monitor size={14} /> Desktop
                  </button>
                  <button
                    type="button"
                    style={{ background: previewDevice === 'mobile' ? '#2271b1' : 'transparent', color: '#fff', border: 'none', padding: '4px 10px', borderRadius: '3px', fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => setPreviewDevice('mobile')}
                  >
                    <Smartphone size={14} /> Mobile
                  </button>
                </div>

                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#c3c4c7', cursor: 'pointer' }}
                  onClick={() => setViewMode(viewMode === 'split' ? 'fullscreen' : 'split')}
                >
                  {viewMode === 'split' ? <Maximize2 size={18} /> : <Minimize2 size={18} />}
                </button>

                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#fff', fontSize: '20px', cursor: 'pointer' }}
                  onClick={() => setIsModalOpen(false)}
                >
                  ✕
                </button>
              </div>
            </div>

            {/* Split Screen Container (Left Controls, Right Live Canva Preview) */}
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
              
              {/* LEFT 50% COLUMN: Canva / MS Word Controls */}
              <form onSubmit={handleSaveBanner} style={{ width: '50%', minWidth: '450px', padding: '20px', overflowY: 'auto', background: '#f6f7f7', borderRight: '1px solid #c3c4c7' }}>
                
                {/* 1. Page Location & Position */}
                <div style={{ background: '#fff', padding: '16px', borderRadius: '6px', border: '1px solid #dcdcde', marginBottom: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', textTransform: 'uppercase', color: '#1d2327', fontWeight: 700 }}>1. Page Location & Placement</h4>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Target Storefront Page</label>
                      <select
                        className="admin-form-control"
                        style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px' }}
                        value={editingBanner.page || 'home'}
                        onChange={(e) => setEditingBanner({ ...editingBanner, page: e.target.value as AdminBanner['page'] })}
                      >
                        <option value="home">Home Page</option>
                        <option value="products">Products / Shop Page</option>
                        <option value="checkout">Checkout Page</option>
                        <option value="category">Category Header</option>
                      </select>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Placement Position</label>
                      <select
                        className="admin-form-control"
                        style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px' }}
                        value={editingBanner.position || 'hero'}
                        onChange={(e) => setEditingBanner({ ...editingBanner, position: e.target.value as AdminBanner['position'] })}
                      >
                        <option value="hero">Top Main Hero Carousel</option>
                        <option value="top">Top Header Banner</option>
                        <option value="middle">Middle Content Section</option>
                        <option value="bottom">Bottom Footer Banner</option>
                      </select>
                    </div>
                  </div>
                </div>

                {/* 2. MS Word Headline & Subtitle Styling */}
                <div style={{ background: '#fff', padding: '16px', borderRadius: '6px', border: '1px solid #dcdcde', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', color: '#1d2327', fontWeight: 700 }}>2. Headline & Text Formatting</h4>
                    
                    {/* MS Word Alignment Controls */}
                    <div style={{ display: 'flex', gap: '4px', background: '#f0f0f1', padding: '2px', borderRadius: '4px' }}>
                      <button
                        type="button"
                        style={{ padding: '4px 8px', background: editingBanner.textAlign === 'left' ? '#ffffff' : 'transparent', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        onClick={() => setEditingBanner({ ...editingBanner, textAlign: 'left' })}
                      >
                        <AlignLeft size={14} />
                      </button>
                      <button
                        type="button"
                        style={{ padding: '4px 8px', background: editingBanner.textAlign === 'center' ? '#ffffff' : 'transparent', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        onClick={() => setEditingBanner({ ...editingBanner, textAlign: 'center' })}
                      >
                        <AlignCenter size={14} />
                      </button>
                      <button
                        type="button"
                        style={{ padding: '4px 8px', background: editingBanner.textAlign === 'right' ? '#ffffff' : 'transparent', border: 'none', borderRadius: '3px', cursor: 'pointer' }}
                        onClick={() => setEditingBanner({ ...editingBanner, textAlign: 'right' })}
                      >
                        <AlignRight size={14} />
                      </button>
                    </div>
                  </div>

                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Headline Title</label>
                    <input
                      type="text"
                      required
                      style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #8c8f94', borderRadius: '4px' }}
                      value={editingBanner.title || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, title: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Subtitle / Subtext</label>
                    <textarea
                      rows={2}
                      style={{ width: '100%', padding: '8px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px', resize: 'vertical' }}
                      value={editingBanner.subtitle || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                    />
                  </div>
                </div>

                {/* 3. Desktop & Mobile Image Assets */}
                <div style={{ background: '#fff', padding: '16px', borderRadius: '6px', border: '1px solid #dcdcde', marginBottom: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', textTransform: 'uppercase', color: '#1d2327', fontWeight: 700 }}>3. Graphics & Responsive Images</h4>
                  
                  <div style={{ marginBottom: '12px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>🖥️ Desktop Banner Image URL (1200x500px)</label>
                    <input
                      type="text"
                      required
                      style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px' }}
                      value={editingBanner.imageUrl || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, imageUrl: e.target.value })}
                    />
                  </div>

                  <div>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>📱 Mobile Banner Image URL (600x600px - Phone Optimized)</label>
                    <input
                      type="text"
                      placeholder="Optional mobile optimized image..."
                      style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px' }}
                      value={editingBanner.mobileImageUrl || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, mobileImageUrl: e.target.value })}
                    />
                  </div>
                </div>

                {/* 4. Button & Color Styling */}
                <div style={{ background: '#fff', padding: '16px', borderRadius: '6px', border: '1px solid #dcdcde', marginBottom: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', textTransform: 'uppercase', color: '#1d2327', fontWeight: 700 }}>4. Button CTA & Color Palette</h4>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Button Text</label>
                      <input
                        type="text"
                        style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px' }}
                        value={editingBanner.buttonText || ''}
                        onChange={(e) => setEditingBanner({ ...editingBanner, buttonText: e.target.value })}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Target Link</label>
                      <input
                        type="text"
                        style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px' }}
                        value={editingBanner.linkUrl || ''}
                        onChange={(e) => setEditingBanner({ ...editingBanner, linkUrl: e.target.value })}
                      />
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Background Color</label>
                      <input
                        type="color"
                        style={{ width: '100%', height: '32px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                        value={editingBanner.bgColor || '#043927'}
                        onChange={(e) => setEditingBanner({ ...editingBanner, bgColor: e.target.value })}
                      />
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Overlay Darkness ({Math.round((editingBanner.overlayOpacity ?? 0.35) * 100)}%)</label>
                      <input
                        type="range"
                        min="0"
                        max="0.8"
                        step="0.05"
                        style={{ width: '100%', marginTop: '6px' }}
                        value={editingBanner.overlayOpacity ?? 0.35}
                        onChange={(e) => setEditingBanner({ ...editingBanner, overlayOpacity: parseFloat(e.target.value) })}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '10px', marginTop: '16px' }}>
                  <button type="button" style={{ background: '#f6f7f7', border: '1px solid #2271b1', color: '#2271b1', padding: '8px 16px', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                    Cancel
                  </button>
                  <button type="submit" style={{ background: '#2271b1', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontWeight: 700, cursor: 'pointer' }}>
                    Save Banner
                  </button>
                </div>

              </form>

              {/* RIGHT 50% COLUMN: Live Interactive Canva Preview */}
              <div style={{ width: '50%', padding: '20px', background: '#e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflowY: 'auto' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                  LIVE REAL-TIME PREVIEW ({previewDevice === 'mobile' ? 'Mobile View' : 'Desktop View'})
                </div>

                {/* Outer Phone/Desktop Frame */}
                <div
                  style={{
                    width: previewDevice === 'mobile' ? '360px' : '100%',
                    maxWidth: '680px',
                    height: previewDevice === 'mobile' ? '540px' : '320px',
                    background: '#ffffff',
                    borderRadius: '12px',
                    boxShadow: '0 10px 30px rgba(0,0,0,0.2)',
                    overflow: 'hidden',
                    position: 'relative',
                    border: '4px solid #1e293b',
                    transition: 'all 0.3s ease'
                  }}
                >
                  {/* Banner Canvas */}
                  <div
                    style={{
                      width: '100%',
                      height: '100%',
                      background: editingBanner.bgColor || '#043927',
                      position: 'relative',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: editingBanner.textAlign === 'center' ? 'center' : editingBanner.textAlign === 'right' ? 'flex-end' : 'flex-start',
                      padding: previewDevice === 'mobile' ? '24px' : '40px'
                    }}
                  >
                    {/* Background Image */}
                    <img
                      src={(previewDevice === 'mobile' && editingBanner.mobileImageUrl) ? editingBanner.mobileImageUrl : editingBanner.imageUrl}
                      alt={editingBanner.title}
                      style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
                    />

                    {/* Dark Overlay */}
                    <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: editingBanner.bgColor || '#000000', opacity: editingBanner.overlayOpacity ?? 0.35, zIndex: 1 }} />

                    {/* Content Box */}
                    <div style={{ position: 'relative', zIndex: 2, color: '#ffffff', maxWidth: '80%', textAlign: editingBanner.textAlign || 'left' }}>
                      <span style={{ fontSize: '10px', textTransform: 'uppercase', letterSpacing: '1px', background: '#007A3D', color: '#fff', padding: '3px 10px', borderRadius: '4px', fontWeight: 700, display: 'inline-block', marginBottom: '10px' }}>
                        RTC FOODS EXCLUSIVE
                      </span>

                      <h2 style={{ margin: '0 0 10px 0', fontSize: previewDevice === 'mobile' ? '1.3rem' : '1.8rem', fontWeight: 700, lineHeight: 1.2, color: '#ffffff' }}>
                        {editingBanner.title || 'Your Banner Title'}
                      </h2>

                      {editingBanner.subtitle && (
                        <p style={{ margin: '0 0 16px 0', fontSize: previewDevice === 'mobile' ? '0.85rem' : '0.98rem', opacity: 0.9 }}>
                          {editingBanner.subtitle}
                        </p>
                      )}

                      {editingBanner.buttonText && (
                        <button
                          type="button"
                          style={{
                            background: editingBanner.buttonStyle === 'glass' ? 'rgba(255,255,255,0.25)' : '#007A3D',
                            color: '#ffffff',
                            border: editingBanner.buttonStyle === 'outline' ? '2px solid #ffffff' : 'none',
                            padding: '10px 22px',
                            borderRadius: editingBanner.buttonStyle === 'dark_pill' ? '24px' : '4px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                            backdropFilter: editingBanner.buttonStyle === 'glass' ? 'blur(8px)' : 'none'
                          }}
                        >
                          {editingBanner.buttonText}
                        </button>
                      )}
                    </div>
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}
    </div>
  );
};
