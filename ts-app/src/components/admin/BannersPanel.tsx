import React, { useState, useRef } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AdminBanner, BannerLayer } from '../../data/adminStore';
import {
  Plus,
  Trash2,
  Edit3,
  Check,
  Smartphone,
  Monitor,
  Maximize2,
  Minimize2,
  Sparkles,
  Layers,
  ArrowRight,
  Upload,
  Type,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown
} from 'lucide-react';

export const BannersPanel: React.FC = () => {
  const [selectedPageFilter, setSelectedPageFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<AdminBanner> | null>(null);

  // Selected layer for moving/editing in the canvas
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);

  // Layout View Modes: Split-Screen or Fullscreen Preview Mode
  const [viewMode, setViewMode] = useState<'split' | 'fullscreen'>('split');
  const [previewDevice, setPreviewDevice] = useState<'desktop' | 'mobile'>('desktop');

  // Save Toast Notification State
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Hidden File Input Ref for Local Disk Uploads
  const bgFileInputRef = useRef<HTMLInputElement>(null);
  const layerFileInputRef = useRef<HTMLInputElement>(null);

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
      buttonBgColor: '#007A3D',
      buttonTextColor: '#ffffff',
      textAlign: 'left',
      bgColor: '#043927',
      overlayOpacity: 0.35,
      vignetteColor: '#000000',
      vignetteIntensity: 0.5,
      layers: [
        {
          id: 'layer-text-1',
          type: 'text',
          content: '✨ RTC FOODS EXCLUSIVE SELECTION',
          x: 10,
          y: 15,
          fontSize: 12,
          fontWeight: '700',
          color: '#FFD700',
          zIndex: 2
        }
      ],
      isActive: true,
      order: banners.length + 1
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (b: AdminBanner) => {
    setEditingBanner({
      ...b,
      vignetteColor: b.vignetteColor || '#000000',
      vignetteIntensity: b.vignetteIntensity ?? 0.5,
      buttonBgColor: b.buttonBgColor || '#007A3D',
      buttonTextColor: b.buttonTextColor || '#ffffff',
      layers: b.layers || []
    });
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

  // Helper for adding new extra sticker/image layers
  const handleAddImageSticker = (urlOrBase64: string) => {
    if (!editingBanner) return;
    const newLayers = [...(editingBanner.layers || [])];
    const newLayer: BannerLayer = {
      id: `layer-img-${Date.now()}`,
      type: 'image',
      content: urlOrBase64,
      x: 70,
      y: 30,
      width: 120,
      height: 120,
      zIndex: newLayers.length + 2
    };
    setEditingBanner({ ...editingBanner, layers: [...newLayers, newLayer] });
  };

  // Helper for adding extra custom text layers
  const handleAddTextLayer = () => {
    if (!editingBanner) return;
    const newLayers = [...(editingBanner.layers || [])];
    const newLayer: BannerLayer = {
      id: `layer-txt-${Date.now()}`,
      type: 'text',
      content: 'New Custom Badge Text',
      x: 10,
      y: 80,
      fontSize: 13,
      fontWeight: '600',
      color: '#ffffff',
      bgColor: 'rgba(0,0,0,0.5)',
      borderRadius: 4,
      zIndex: newLayers.length + 2
    };
    setEditingBanner({ ...editingBanner, layers: [...newLayers, newLayer] });
  };

  // Layer order management (move up / down)
  const handleMoveLayerOrder = (layerId: string, direction: 'up' | 'down') => {
    if (!editingBanner || !editingBanner.layers) return;
    const layers = [...editingBanner.layers];
    const idx = layers.findIndex(l => l.id === layerId);
    if (idx === -1) return;

    if (direction === 'up' && idx > 0) {
      const temp = layers[idx];
      layers[idx] = layers[idx - 1];
      layers[idx - 1] = temp;
    } else if (direction === 'down' && idx < layers.length - 1) {
      const temp = layers[idx];
      layers[idx] = layers[idx + 1];
      layers[idx + 1] = temp;
    }
    // Reassign zIndex values cleanly
    const reindexed = layers.map((l, i) => ({ ...l, zIndex: i + 2 }));
    setEditingBanner({ ...editingBanner, layers: reindexed });
  };

  const handleDeleteLayer = (layerId: string) => {
    if (!editingBanner || !editingBanner.layers) return;
    const filtered = editingBanner.layers.filter(l => l.id !== layerId);
    setEditingBanner({ ...editingBanner, layers: filtered });
    if (selectedLayerId === layerId) setSelectedLayerId(null);
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
            Canva/Photoshop-style visual canvas with layers, vignette effects, sticker graphics & mobile responsive assets
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
              {/* Background Image */}
              <img src={b.imageUrl} alt={b.title} style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }} />
              
              {/* Color Overlay */}
              <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: b.bgColor || '#000000', opacity: b.overlayOpacity ?? 0.35, zIndex: 1 }} />

              {/* Built-in Vignette Gradient Effect */}
              {b.vignetteIntensity ? (
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%',
                    height: '100%',
                    background: `radial-gradient(circle, transparent 40%, ${b.vignetteColor || '#000000'} 100%)`,
                    opacity: b.vignetteIntensity,
                    zIndex: 1,
                    pointerEvents: 'none'
                  }}
                />
              ) : null}

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

      {/* Hidden File Input Elements for Local File Import */}
      <input
        type="file"
        ref={bgFileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0] && editingBanner) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (evt) => {
              const base64 = evt.target?.result as string;
              setEditingBanner({ ...editingBanner, imageUrl: base64 });
            };
            reader.readAsDataURL(file);
          }
        }}
      />
      <input
        type="file"
        ref={layerFileInputRef}
        accept="image/*"
        style={{ display: 'none' }}
        onChange={(e) => {
          if (e.target.files && e.target.files[0] && editingBanner) {
            const file = e.target.files[0];
            const reader = new FileReader();
            reader.onload = (evt) => {
              const base64 = evt.target?.result as string;
              handleAddImageSticker(base64);
            };
            reader.readAsDataURL(file);
          }
        }}
      />

      {/* Visual Canva/Photoshop-Style Editor Modal */}
      {isModalOpen && editingBanner && (
        <div className="admin-modal-overlay" style={{ zIndex: 999999 }}>
          <div
            className="admin-modal"
            style={{
              maxWidth: viewMode === 'fullscreen' ? '98vw' : '1180px',
              width: '95vw',
              height: viewMode === 'fullscreen' ? '94vh' : 'auto',
              maxHeight: '92vh',
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
                  {editingBanner.id ? `Canva/Photoshop Visual Editor: "${editingBanner.title}"` : 'Create New Visual Page Banner'}
                </h3>
              </div>

              {/* View Switchers & Controls */}
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

            {/* Split Screen Container (Left Controls & Layer Manager, Right Live Canvas) */}
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
              
              {/* LEFT 50% COLUMN: Controls & Layer Manager */}
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

                {/* 2. Unified Background Image Container + Import Button */}
                <div style={{ background: '#fff', padding: '16px', borderRadius: '6px', border: '1px solid #dcdcde', marginBottom: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', textTransform: 'uppercase', color: '#1d2327', fontWeight: 700 }}>2. Background Image Asset</h4>
                  
                  <div style={{ marginBottom: '10px' }}>
                    <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>
                      Unified Image Container (Paste URL, Drag File, or Ctrl+V)
                    </label>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <input
                        type="text"
                        placeholder="Paste image URL (https://...) or press Ctrl+V directly!"
                        style={{ flexGrow: 1, padding: '7px 10px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px' }}
                        value={editingBanner.imageUrl || ''}
                        onChange={(e) => setEditingBanner({ ...editingBanner, imageUrl: e.target.value })}
                        onPaste={(e) => {
                          const items = e.clipboardData.items;
                          for (let i = 0; i < items.length; i++) {
                            if (items[i].type.indexOf('image') !== -1) {
                              const blob = items[i].getAsFile();
                              if (blob) {
                                const reader = new FileReader();
                                reader.onload = (evt) => {
                                  setEditingBanner({ ...editingBanner, imageUrl: evt.target?.result as string });
                                };
                                reader.readAsDataURL(blob);
                              }
                            }
                          }
                        }}
                      />
                      <button
                        type="button"
                        style={{ background: '#2271b1', color: '#fff', border: 'none', padding: '0 14px', borderRadius: '4px', fontWeight: 600, fontSize: '12px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px', whiteSpace: 'nowrap' }}
                        onClick={() => bgFileInputRef.current?.click()}
                      >
                        <Upload size={14} /> + Import File
                      </button>
                    </div>
                  </div>
                </div>

                {/* 3. Vignette Effect & Dual-Mode Color Pickers */}
                <div style={{ background: '#fff', padding: '16px', borderRadius: '6px', border: '1px solid #dcdcde', marginBottom: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', textTransform: 'uppercase', color: '#1d2327', fontWeight: 700 }}>3. Vignette Effect & Color Palette</h4>

                  {/* Dual Mode Background Color */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px', marginBottom: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Canvas Background Color</label>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <input
                          type="color"
                          style={{ width: '36px', height: '32px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                          value={editingBanner.bgColor || '#043927'}
                          onChange={(e) => setEditingBanner({ ...editingBanner, bgColor: e.target.value })}
                        />
                        <input
                          type="text"
                          style={{ flexGrow: 1, padding: '5px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px', fontFamily: 'monospace' }}
                          value={editingBanner.bgColor || '#043927'}
                          onChange={(e) => setEditingBanner({ ...editingBanner, bgColor: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Vignette Shadow Color</label>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <input
                          type="color"
                          style={{ width: '36px', height: '32px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                          value={editingBanner.vignetteColor || '#000000'}
                          onChange={(e) => setEditingBanner({ ...editingBanner, vignetteColor: e.target.value })}
                        />
                        <input
                          type="text"
                          style={{ flexGrow: 1, padding: '5px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px', fontFamily: 'monospace' }}
                          value={editingBanner.vignetteColor || '#000000'}
                          onChange={(e) => setEditingBanner({ ...editingBanner, vignetteColor: e.target.value })}
                        />
                      </div>
                    </div>
                  </div>

                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Vignette Intensity ({Math.round((editingBanner.vignetteIntensity ?? 0.5) * 100)}%)</label>
                      <input
                        type="range"
                        min="0"
                        max="1"
                        step="0.05"
                        style={{ width: '100%', marginTop: '6px' }}
                        value={editingBanner.vignetteIntensity ?? 0.5}
                        onChange={(e) => setEditingBanner({ ...editingBanner, vignetteIntensity: parseFloat(e.target.value) })}
                      />
                    </div>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Dark Overlay Opacity ({Math.round((editingBanner.overlayOpacity ?? 0.35) * 100)}%)</label>
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

                {/* 4. Photoshop/Canva Full Layer Manager Sidebar */}
                <div style={{ background: '#fff', padding: '16px', borderRadius: '6px', border: '1px solid #dcdcde', marginBottom: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                    <h4 style={{ margin: 0, fontSize: '13px', textTransform: 'uppercase', color: '#1d2327', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <Layers size={16} color="#2271b1" /> 4. Layer Manager & Extra Components
                    </h4>
                    
                    <div style={{ display: 'flex', gap: '6px' }}>
                      <button
                        type="button"
                        style={{ background: '#f0f6fc', border: '1px solid #0969da', color: '#0969da', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        onClick={() => layerFileInputRef.current?.click()}
                      >
                        <ImageIcon size={12} /> + Sticker Image
                      </button>
                      <button
                        type="button"
                        style={{ background: '#f0f6fc', border: '1px solid #0969da', color: '#0969da', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                        onClick={handleAddTextLayer}
                      >
                        <Type size={12} /> + Text Box
                      </button>
                    </div>
                  </div>

                  {/* Layers List (Drag-to-Reorder / Up-Down) */}
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                    {(editingBanner.layers || []).map((layer, idx) => (
                      <div
                        key={layer.id}
                        style={{
                          background: selectedLayerId === layer.id ? '#f0f6fc' : '#f8fafc',
                          border: `1px solid ${selectedLayerId === layer.id ? '#0969da' : '#cbd5e1'}`,
                          borderRadius: '6px',
                          padding: '10px 12px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                        onClick={() => setSelectedLayerId(layer.id)}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <span style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', background: '#e2e8f0', padding: '2px 6px', borderRadius: '3px' }}>
                            #{idx + 1}
                          </span>
                          <div>
                            <div style={{ fontSize: '12px', fontWeight: 600, color: '#1e293b' }}>
                              {layer.type === 'image' ? '🖼️ Image Sticker' : '🔤 Text Box Layer'}
                            </div>
                            <div style={{ fontSize: '11px', color: '#64748b', maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                              {layer.content}
                            </div>
                          </div>
                        </div>

                        <div style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                          <button
                            type="button"
                            style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '3px', padding: '2px 6px', cursor: 'pointer' }}
                            onClick={(evt) => { evt.stopPropagation(); handleMoveLayerOrder(layer.id, 'up'); }}
                          >
                            <ArrowUp size={12} />
                          </button>
                          <button
                            type="button"
                            style={{ background: '#ffffff', border: '1px solid #cbd5e1', borderRadius: '3px', padding: '2px 6px', cursor: 'pointer' }}
                            onClick={(evt) => { evt.stopPropagation(); handleMoveLayerOrder(layer.id, 'down'); }}
                          >
                            <ArrowDown size={12} />
                          </button>
                          <button
                            type="button"
                            style={{ background: '#fff0f0', border: '1px solid #d63638', color: '#d63638', borderRadius: '3px', padding: '2px 6px', cursor: 'pointer', marginLeft: '4px' }}
                            onClick={(evt) => { evt.stopPropagation(); handleDeleteLayer(layer.id); }}
                          >
                            <Trash2 size={12} />
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* 5. Button CTA & Color Palette with Dual Hex Code Pickers */}
                <div style={{ background: '#fff', padding: '16px', borderRadius: '6px', border: '1px solid #dcdcde', marginBottom: '16px' }}>
                  <h4 style={{ margin: '0 0 12px 0', fontSize: '13px', textTransform: 'uppercase', color: '#1d2327', fontWeight: 700 }}>5. CTA Button Customizer</h4>

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

                  {/* Dual Mode Button Color Pickers */}
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Button Background Color</label>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <input
                          type="color"
                          style={{ width: '36px', height: '32px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                          value={editingBanner.buttonBgColor || '#007A3D'}
                          onChange={(e) => setEditingBanner({ ...editingBanner, buttonBgColor: e.target.value })}
                        />
                        <input
                          type="text"
                          style={{ flexGrow: 1, padding: '5px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px', fontFamily: 'monospace' }}
                          value={editingBanner.buttonBgColor || '#007A3D'}
                          onChange={(e) => setEditingBanner({ ...editingBanner, buttonBgColor: e.target.value })}
                        />
                      </div>
                    </div>

                    <div>
                      <label style={{ fontSize: '12px', fontWeight: 600, color: '#2c3338', display: 'block', marginBottom: '4px' }}>Button Text Color</label>
                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        <input
                          type="color"
                          style={{ width: '36px', height: '32px', padding: 0, border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                          value={editingBanner.buttonTextColor || '#ffffff'}
                          onChange={(e) => setEditingBanner({ ...editingBanner, buttonTextColor: e.target.value })}
                        />
                        <input
                          type="text"
                          style={{ flexGrow: 1, padding: '5px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px', fontFamily: 'monospace' }}
                          value={editingBanner.buttonTextColor || '#ffffff'}
                          onChange={(e) => setEditingBanner({ ...editingBanner, buttonTextColor: e.target.value })}
                        />
                      </div>
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

              {/* RIGHT 50% COLUMN: Live Interactive Canva Preview with Layer Ordering & Vignette */}
              <div style={{ width: '50%', padding: '20px', background: '#e2e8f0', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', overflowY: 'auto' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '10px' }}>
                  LIVE INTERACTIVE CANVA PREVIEW ({previewDevice === 'mobile' ? 'Mobile View' : 'Desktop View'})
                </div>

                {/* Canvas Box */}
                <div
                  style={{
                    width: previewDevice === 'mobile' ? '360px' : '100%',
                    maxWidth: '680px',
                    height: previewDevice === 'mobile' ? '540px' : '340px',
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

                    {/* Built-in Vignette Gradient Shadow */}
                    {editingBanner.vignetteIntensity ? (
                      <div
                        style={{
                          position: 'absolute',
                          top: 0,
                          left: 0,
                          width: '100%',
                          height: '100%',
                          background: `radial-gradient(circle, transparent 40%, ${editingBanner.vignetteColor || '#000000'} 100%)`,
                          opacity: editingBanner.vignetteIntensity,
                          zIndex: 1,
                          pointerEvents: 'none'
                        }}
                      />
                    ) : null}

                    {/* Dynamic Rendered Layers (Stickers, Text boxes) */}
                    {(editingBanner.layers || []).map((layer) => (
                      <div
                        key={layer.id}
                        style={{
                          position: 'absolute',
                          left: `${layer.x}%`,
                          top: `${layer.y}%`,
                          zIndex: layer.zIndex || 2,
                          cursor: 'move',
                          border: selectedLayerId === layer.id ? '2px dashed #0969da' : 'none',
                          padding: '4px',
                          borderRadius: '4px'
                        }}
                        onClick={() => setSelectedLayerId(layer.id)}
                      >
                        {layer.type === 'image' ? (
                          <img src={layer.content} alt="Sticker Layer" style={{ width: layer.width || 100, height: layer.height || 100, objectFit: 'contain' }} />
                        ) : (
                          <div style={{ fontSize: layer.fontSize || 13, fontWeight: layer.fontWeight || '600', color: layer.color || '#fff', background: layer.bgColor || 'transparent', padding: layer.bgColor ? '4px 10px' : 0, borderRadius: layer.borderRadius || 0 }}>
                            {layer.content}
                          </div>
                        )}
                      </div>
                    ))}

                    {/* Main Headline & CTA Text Layer */}
                    <div style={{ position: 'relative', zIndex: 2, color: '#ffffff', maxWidth: '80%', textAlign: editingBanner.textAlign || 'left' }}>
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
                            background: editingBanner.buttonBgColor || '#007A3D',
                            color: editingBanner.buttonTextColor || '#ffffff',
                            border: editingBanner.buttonStyle === 'outline' ? '2px solid #ffffff' : 'none',
                            padding: '10px 22px',
                            borderRadius: editingBanner.buttonStyle === 'dark_pill' ? '24px' : '4px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            boxShadow: '0 4px 12px rgba(0,0,0,0.15)'
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
