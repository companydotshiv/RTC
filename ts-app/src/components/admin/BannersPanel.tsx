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
  Sparkles,
  ArrowRight,
  Type,
  Image as ImageIcon,
  ArrowUp,
  ArrowDown,
  ZoomIn,
  Move,
  Crop,
  X,
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  GripVertical,
  Sliders,
  Square,
  Award
} from 'lucide-react';

export const BannersPanel: React.FC = () => {
  const [selectedPageFilter, setSelectedPageFilter] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingBanner, setEditingBanner] = useState<Partial<AdminBanner> | null>(null);

  // Crop & Zoom Double-Click Tool State
  const [isCropMode, setIsCropMode] = useState<boolean>(false);
  const [isDraggingPan, setIsDraggingPan] = useState<boolean>(false);
  const dragStartRef = useRef<{ x: number; y: number }>({ x: 0, y: 0 });

  // Selected layer for moving/editing in the canvas
  const [selectedLayerId, setSelectedLayerId] = useState<string | null>(null);
  const [activeTab, setActiveTab] = useState<'blocks' | 'layers' | 'styles'>('blocks');

  // Inline Hyperlink Popover state
  const [showHyperlinkModal, setShowHyperlinkModal] = useState<boolean>(false);
  const [hyperlinkUrlInput, setHyperlinkUrlInput] = useState<string>('/products');

  // Layout View Modes: Split-Screen or Fullscreen Preview Mode
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
      aspectRatio: '16:9',
      imageZoom: 1,
      imagePanX: 0,
      imagePanY: 0,
      badgeText: '30+ YEARS OF PURE QUALITY LEGACY',
      badgeBgColor: 'rgba(217, 119, 6, 0.25)',
      badgeTextColor: '#f59e0b',
      title: 'Taste the Authentic Goodness of Pure Dry Fruits & Spices',
      useTitleGradient: true,
      titleGradientStart: '#fbbf24',
      titleGradientEnd: '#d97706',
      subtitle: 'Hygienically sorted, triple-graded whole cashews, almonds, pure Kashmiri saffron, and premium nuts delivered fresh from nature to your doorstep.',
      imageUrl: '/hero_dry_fruits_1785924400069.png',
      mobileImageUrl: '/hero_dry_fruits_1785924400069.png',
      linkUrl: '/products',
      buttonText: 'Explore Collection',
      buttonStyle: 'solid_green',
      buttonBgColor: '#007A3D',
      buttonTextColor: '#ffffff',
      secondaryButtonText: 'Bulk Inquiry',
      secondaryButtonLink: '/bulk-order',
      textAlign: 'left',
      bgColor: '#043927',
      overlayOpacity: 0.35,
      vignetteColor: '#000000',
      vignetteIntensity: 0.5,
      statsItems: [
        { value: '100%', label: 'Natural & Lab Tested' },
        { value: '500+', label: 'Wholesale Retailers' },
        { value: '30+ Yrs', label: 'Industry Trust' }
      ],
      layers: [
        {
          id: 'layer-badge-1',
          type: 'badge',
          content: '30+ YEARS OF PURE QUALITY LEGACY',
          x: 5,
          y: 8,
          fontSize: 11,
          fontWeight: '700',
          color: '#fbbf24',
          bgColor: 'rgba(217, 119, 6, 0.25)',
          borderColor: '#d97706',
          borderWidth: 1,
          borderRadius: 20,
          zIndex: 2
        }
      ],
      isActive: true,
      order: banners.length + 1
    });
    setIsCropMode(false);
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (b: AdminBanner) => {
    setEditingBanner({
      ...b,
      aspectRatio: b.aspectRatio || '16:9',
      imageZoom: b.imageZoom ?? 1,
      imagePanX: b.imagePanX ?? 0,
      imagePanY: b.imagePanY ?? 0,
      vignetteColor: b.vignetteColor || '#000000',
      vignetteIntensity: b.vignetteIntensity ?? 0.5,
      buttonBgColor: b.buttonBgColor || '#007A3D',
      buttonTextColor: b.buttonTextColor || '#ffffff',
      layers: b.layers || []
    });
    setIsCropMode(false);
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

  // Add Custom Layer Block
  const handleAddCustomBlock = (type: 'text' | 'image' | 'shape' | 'badge' | 'button' | 'stats') => {
    if (!editingBanner) return;
    const newLayers = [...(editingBanner.layers || [])];
    let newLayer: BannerLayer;

    if (type === 'badge') {
      newLayer = {
        id: `layer-badge-${Date.now()}`,
        type: 'badge',
        content: '✨ LIMITED SEASONAL OFFER',
        x: 10,
        y: 10,
        fontSize: 11,
        fontWeight: '700',
        color: '#fbbf24',
        bgColor: 'rgba(217, 119, 6, 0.25)',
        borderColor: '#d97706',
        borderWidth: 1,
        borderRadius: 20,
        zIndex: newLayers.length + 2
      };
    } else if (type === 'button') {
      newLayer = {
        id: `layer-btn-${Date.now()}`,
        type: 'button',
        content: 'Custom Action Link',
        x: 10,
        y: 70,
        fontSize: 13,
        fontWeight: '700',
        color: '#ffffff',
        bgColor: '#007A3D',
        borderRadius: 6,
        hyperlink: '/products',
        zIndex: newLayers.length + 2
      };
    } else if (type === 'shape') {
      newLayer = {
        id: `layer-shape-${Date.now()}`,
        type: 'shape',
        content: 'Custom Shape Container Box',
        x: 10,
        y: 40,
        fontSize: 12,
        fontWeight: '500',
        color: '#ffffff',
        bgColor: 'rgba(15, 23, 42, 0.65)',
        borderColor: '#0284c7',
        borderWidth: 2,
        borderRadius: 8,
        opacity: 0.9,
        zIndex: newLayers.length + 2
      };
    } else if (type === 'stats') {
      newLayer = {
        id: `layer-stats-${Date.now()}`,
        type: 'stats',
        content: '100% | Pure & Natural',
        x: 10,
        y: 85,
        fontSize: 14,
        fontWeight: '800',
        color: '#ffffff',
        zIndex: newLayers.length + 2
      };
    } else {
      newLayer = {
        id: `layer-txt-${Date.now()}`,
        type: 'text',
        content: 'Custom Headline Text Box',
        x: 10,
        y: 50,
        fontSize: 14,
        fontWeight: '600',
        color: '#ffffff',
        zIndex: newLayers.length + 2
      };
    }

    setEditingBanner({ ...editingBanner, layers: [...newLayers, newLayer] });
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

  // Aspect Ratios with visual shape depictions
  const aspectRatios = [
    { key: '16:9', label: '16:9 Widescreen Desktop', icon: '🖥️ [ ▭ ]' },
    { key: '4:3', label: '4:3 Standard Display', icon: '💻 [ ▢ ]' },
    { key: '1:1', label: '1:1 Square Card', icon: '🔳 [ ⬛ ]' },
    { key: '9:16', label: '9:16 Vertical Mobile', icon: '📱 [ ▯ ]' },
    { key: '21:9', label: '21:9 Ultrawide Hero', icon: '🎞️ [ ▬ ]' }
  ];

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
            zIndex: 9999999,
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
            <Sparkles size={20} color="#2271b1" /> Hero Sliders & Page Banners
          </h2>
          <p style={{ margin: '4px 0 0 0', color: '#646970', fontSize: '0.85rem' }}>
            Visual banner designer, carousel slides, background overlays, action buttons & mobile responsive scaling
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
              <img
                src={b.imageUrl}
                alt={b.title}
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  transform: `scale(${b.imageZoom || 1}) translate(${b.imagePanX || 0}px, ${b.imagePanY || 0}px)`
                }}
              />
              
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
                    <Edit3 size={13} /> Edit Banner Design
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

      {/* VISUAL BANNER BUILDER MODAL */}
      {isModalOpen && editingBanner && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(15, 23, 42, 0.85)',
            backdropFilter: 'blur(6px)',
            zIndex: 999999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center'
          }}
        >
          <div
            style={{
              width: '99vw',
              height: '97vh',
              background: '#ffffff',
              borderRadius: '8px',
              boxShadow: '0 25px 60px rgba(0,0,0,0.3)',
              display: 'flex',
              flexDirection: 'column',
              overflow: 'hidden'
            }}
          >
            {/* Top WordPress Admin Header Bar */}
            <div style={{ background: '#1d2327', color: '#ffffff', padding: '10px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #2c3338' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <span style={{ background: '#2271b1', color: '#fff', fontSize: '11px', fontWeight: 800, padding: '3px 8px', borderRadius: '4px' }}>
                  RTC BUILDER
                </span>
                <h3 style={{ margin: 0, fontSize: '1.05rem', fontWeight: 700, color: '#ffffff' }}>
                  {editingBanner.id ? `Banner Customizer: "${editingBanner.title}"` : 'Create New Hero Banner'}
                </h3>
              </div>

              {/* Top Controls: Device Preview & Save */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ background: '#2c3338', padding: '3px', borderRadius: '6px', display: 'flex', gap: '4px' }}>
                  <button
                    type="button"
                    style={{ background: previewDevice === 'desktop' ? '#2271b1' : 'transparent', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => setPreviewDevice('desktop')}
                  >
                    <Monitor size={14} /> Desktop
                  </button>
                  <button
                    type="button"
                    style={{ background: previewDevice === 'mobile' ? '#2271b1' : 'transparent', color: '#fff', border: 'none', padding: '5px 12px', borderRadius: '4px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => setPreviewDevice('mobile')}
                  >
                    <Smartphone size={14} /> Mobile
                  </button>
                </div>

                <button
                  type="button"
                  style={{ background: '#008a20', color: '#ffffff', border: 'none', padding: '7px 20px', borderRadius: '4px', fontWeight: 700, fontSize: '13px', cursor: 'pointer' }}
                  onClick={handleSaveBanner}
                >
                  Publish / Update Page
                </button>

                <button
                  type="button"
                  style={{ background: 'none', border: 'none', color: '#ffffff', fontSize: '24px', cursor: 'pointer' }}
                  onClick={() => setIsModalOpen(false)}
                >
                  <X size={22} />
                </button>
              </div>
            </div>

            {/* 3-COLUMN VISUAL BANNER BUILDER WORKSPACE */}
            <div style={{ display: 'flex', flexGrow: 1, overflow: 'hidden' }}>
              
              {/* COLUMN 1 (LEFT 22%): Gutenberg Block Palette & 9-Dot Drag Layer Manager */}
              <div style={{ width: '22%', minWidth: '280px', background: '#f8fafc', borderRight: '1px solid #e2e8f0', display: 'flex', flexDirection: 'column', overflowY: 'auto' }}>
                
                {/* Tab Switcher */}
                <div style={{ display: 'flex', borderBottom: '1px solid #cbd5e1', background: '#ffffff' }}>
                  <button
                    type="button"
                    style={{ flex: 1, padding: '10px 4px', fontSize: '12px', fontWeight: 700, border: 'none', background: activeTab === 'blocks' ? '#f8fafc' : '#ffffff', borderBottom: activeTab === 'blocks' ? '2px solid #0284c7' : 'none', color: activeTab === 'blocks' ? '#0284c7' : '#64748b', cursor: 'pointer' }}
                    onClick={() => setActiveTab('blocks')}
                  >
                    + Add Blocks
                  </button>
                  <button
                    type="button"
                    style={{ flex: 1, padding: '10px 4px', fontSize: '12px', fontWeight: 700, border: 'none', background: activeTab === 'layers' ? '#f8fafc' : '#ffffff', borderBottom: activeTab === 'layers' ? '2px solid #0284c7' : 'none', color: activeTab === 'layers' ? '#0284c7' : '#64748b', cursor: 'pointer' }}
                    onClick={() => setActiveTab('layers')}
                  >
                    ⋮⋮ 9-Dot Layers ({editingBanner.layers?.length || 0})
                  </button>
                </div>

                {activeTab === 'blocks' ? (
                  <div style={{ padding: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Gutenberg Element Palette
                    </div>

                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                      <button
                        type="button"
                        style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '12px 8px', borderRadius: '6px', cursor: 'pointer', textAlign: 'center' }}
                        onClick={() => handleAddCustomBlock('text')}
                      >
                        <Type size={18} color="#0284c7" style={{ display: 'block', margin: '0 auto 4px auto' }} />
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>Heading Text</span>
                      </button>

                      <button
                        type="button"
                        style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '12px 8px', borderRadius: '6px', cursor: 'pointer', textAlign: 'center' }}
                        onClick={() => handleAddCustomBlock('badge')}
                      >
                        <Award size={18} color="#d97706" style={{ display: 'block', margin: '0 auto 4px auto' }} />
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>Pill Badge</span>
                      </button>

                      <button
                        type="button"
                        style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '12px 8px', borderRadius: '6px', cursor: 'pointer', textAlign: 'center' }}
                        onClick={() => handleAddCustomBlock('button')}
                      >
                        <ArrowRight size={18} color="#008a20" style={{ display: 'block', margin: '0 auto 4px auto' }} />
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>CTA Button</span>
                      </button>

                      <button
                        type="button"
                        style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '12px 8px', borderRadius: '6px', cursor: 'pointer', textAlign: 'center' }}
                        onClick={() => handleAddCustomBlock('shape')}
                      >
                        <Square size={18} color="#0969da" style={{ display: 'block', margin: '0 auto 4px auto' }} />
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>Shape Box</span>
                      </button>

                      <button
                        type="button"
                        style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '12px 8px', borderRadius: '6px', cursor: 'pointer', textAlign: 'center' }}
                        onClick={() => layerFileInputRef.current?.click()}
                      >
                        <ImageIcon size={18} color="#7c3aed" style={{ display: 'block', margin: '0 auto 4px auto' }} />
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>Image Sticker</span>
                      </button>

                      <button
                        type="button"
                        style={{ background: '#fff', border: '1px solid #cbd5e1', padding: '12px 8px', borderRadius: '6px', cursor: 'pointer', textAlign: 'center' }}
                        onClick={() => handleAddCustomBlock('stats')}
                      >
                        <Sliders size={18} color="#059669" style={{ display: 'block', margin: '0 auto 4px auto' }} />
                        <span style={{ fontSize: '11px', fontWeight: 600, color: '#1e293b' }}>Stats Counter</span>
                      </button>
                    </div>
                  </div>
                ) : (
                  /* 9-DOT DRAG LAYER MANAGER LIST */
                  <div style={{ padding: '16px' }}>
                    <div style={{ fontSize: '11px', fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: '10px' }}>
                      Drag 9-Dots (⋮⋮) to Reorder Layers
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      {(editingBanner.layers || []).map((layer, idx) => (
                        <div
                          key={layer.id}
                          style={{
                            background: selectedLayerId === layer.id ? '#e0f2fe' : '#ffffff',
                            border: `1px solid ${selectedLayerId === layer.id ? '#0284c7' : '#cbd5e1'}`,
                            borderRadius: '6px',
                            padding: '8px 10px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            cursor: 'pointer'
                          }}
                          onClick={() => setSelectedLayerId(layer.id)}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                            <GripVertical size={16} color="#64748b" style={{ cursor: 'grab' }} />
                            <div>
                              <div style={{ fontSize: '11px', fontWeight: 700, color: '#0f172a' }}>
                                #{idx + 1} {layer.type.toUpperCase()}
                              </div>
                              <div style={{ fontSize: '10px', color: '#64748b', maxWidth: '120px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                                {layer.content}
                              </div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', gap: '3px' }}>
                            <button
                              type="button"
                              style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '3px', padding: '2px 4px', cursor: 'pointer' }}
                              onClick={(evt) => { evt.stopPropagation(); handleMoveLayerOrder(layer.id, 'up'); }}
                            >
                              <ArrowUp size={11} />
                            </button>
                            <button
                              type="button"
                              style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '3px', padding: '2px 4px', cursor: 'pointer' }}
                              onClick={(evt) => { evt.stopPropagation(); handleMoveLayerOrder(layer.id, 'down'); }}
                            >
                              <ArrowDown size={11} />
                            </button>
                            <button
                              type="button"
                              style={{ background: '#fff0f0', border: '1px solid #d63638', color: '#d63638', borderRadius: '3px', padding: '2px 4px', cursor: 'pointer' }}
                              onClick={(evt) => { evt.stopPropagation(); handleDeleteLayer(layer.id); }}
                            >
                              <Trash2 size={11} />
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

              </div>

              {/* COLUMN 2 (CENTER 53%): Live Interactive RTC Foods Hero Canvas */}
              <div
                style={{
                  width: '53%',
                  padding: '24px',
                  background: '#cbd5e1',
                  display: 'flex',
                  flexDirection: 'column',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflowY: 'auto'
                }}
                onMouseMove={(e) => {
                  if (isDraggingPan && editingBanner) {
                    const deltaX = e.clientX - dragStartRef.current.x;
                    const deltaY = e.clientY - dragStartRef.current.y;
                    setEditingBanner({
                      ...editingBanner,
                      imagePanX: (editingBanner.imagePanX || 0) + deltaX,
                      imagePanY: (editingBanner.imagePanY || 0) + deltaY
                    });
                    dragStartRef.current = { x: e.clientX, y: e.clientY };
                  }
                }}
                onMouseUp={() => setIsDraggingPan(false)}
              >
                {/* Floating Double-Click Zoom/Crop Bar */}
                {isCropMode && (
                  <div
                    style={{
                      marginBottom: '10px',
                      background: '#0f172a',
                      color: '#ffffff',
                      padding: '8px 18px',
                      borderRadius: '30px',
                      display: 'flex',
                      alignItems: 'center',
                      gap: '14px',
                      boxShadow: '0 10px 25px rgba(0,0,0,0.3)',
                      zIndex: 99
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '12px', fontWeight: 600 }}>
                      <ZoomIn size={15} color="#38bdf8" /> Zoom:
                      <input
                        type="range"
                        min="1"
                        max="3"
                        step="0.05"
                        style={{ width: '100px' }}
                        value={editingBanner.imageZoom || 1}
                        onChange={(e) => setEditingBanner({ ...editingBanner, imageZoom: parseFloat(e.target.value) })}
                      />
                      <span>{Math.round((editingBanner.imageZoom || 1) * 100)}%</span>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: '4px', fontSize: '12px', color: '#94a3b8' }}>
                      <Move size={14} /> Drag image to Pan
                    </div>

                    <button
                      type="button"
                      style={{ background: '#0284c7', color: '#fff', border: 'none', padding: '4px 12px', borderRadius: '14px', fontSize: '11px', fontWeight: 700, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                      onClick={() => setIsCropMode(false)}
                    >
                      <Crop size={13} /> Lock Crop
                    </button>
                  </div>
                )}

                {/* Outer Frame with Selected Aspect Ratio */}
                <div
                  style={{
                    width: previewDevice === 'mobile' ? '360px' : '100%',
                    maxWidth: editingBanner.aspectRatio === '21:9' ? '760px' : editingBanner.aspectRatio === '1:1' ? '420px' : '680px',
                    height: editingBanner.aspectRatio === '1:1' ? '420px' : editingBanner.aspectRatio === '9:16' ? '540px' : '360px',
                    background: '#043927',
                    borderRadius: '12px',
                    boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
                    overflow: 'hidden',
                    position: 'relative',
                    border: '4px solid #0f172a'
                  }}
                  onDoubleClick={() => setIsCropMode(true)}
                  onMouseDown={(e) => {
                    if (isCropMode) {
                      setIsDraggingPan(true);
                      dragStartRef.current = { x: e.clientX, y: e.clientY };
                    }
                  }}
                >
                  {/* Background Image with Scale/Pan */}
                  <img
                    src={(previewDevice === 'mobile' && editingBanner.mobileImageUrl) ? editingBanner.mobileImageUrl : (editingBanner.imageUrl || '/hero_dry_fruits_1785924400069.png')}
                    alt={editingBanner.title}
                    style={{
                      position: 'absolute',
                      top: 0,
                      left: 0,
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      transform: `scale(${editingBanner.imageZoom || 1}) translate(${editingBanner.imagePanX || 0}px, ${editingBanner.imagePanY || 0}px)`
                    }}
                  />

                  {/* Dark Color Overlay */}
                  <div style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', background: editingBanner.bgColor || '#000000', opacity: editingBanner.overlayOpacity ?? 0.35, zIndex: 1 }} />

                  {/* Vignette Shadow Effect */}
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

                  {/* Rendered 9-Dot Dynamic Extra Layers */}
                  {(editingBanner.layers || []).map((layer) => (
                    <div
                      key={layer.id}
                      style={{
                        position: 'absolute',
                        left: `${layer.x}%`,
                        top: `${layer.y}%`,
                        zIndex: layer.zIndex || 2,
                        cursor: 'move',
                        border: selectedLayerId === layer.id ? '2px dashed #0284c7' : 'none',
                        padding: '4px',
                        borderRadius: layer.borderRadius || 4
                      }}
                      onClick={() => setSelectedLayerId(layer.id)}
                    >
                      {layer.type === 'image' ? (
                        <img src={layer.content} alt="Sticker" style={{ width: layer.width || 100, height: layer.height || 100, objectFit: 'contain' }} />
                      ) : (
                        <div
                          style={{
                            fontSize: layer.fontSize || 13,
                            fontWeight: layer.fontWeight || '600',
                            fontStyle: layer.fontStyle || 'normal',
                            textDecoration: layer.textDecoration || 'none',
                            color: layer.color || '#fff',
                            background: layer.bgColor || 'transparent',
                            padding: layer.bgColor ? '4px 12px' : 0,
                            borderRadius: layer.borderRadius || 0,
                            border: layer.borderColor ? `${layer.borderWidth || 1}px solid ${layer.borderColor}` : 'none'
                          }}
                        >
                          {layer.hyperlink ? (
                            <a href={layer.hyperlink} style={{ color: '#38bdf8', textDecoration: 'underline' }}>
                              {layer.content}
                            </a>
                          ) : (
                            layer.content
                          )}
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Main RTC Foods Hero Layout Overlay */}
                  <div style={{ position: 'relative', zIndex: 2, padding: previewDevice === 'mobile' ? '20px' : '36px', color: '#ffffff', maxWidth: '82%', textAlign: editingBanner.textAlign || 'left' }}>
                    
                    {/* Top Pill Badge */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        fontSize: '11px',
                        fontWeight: 700,
                        letterSpacing: '1px',
                        color: editingBanner.badgeTextColor || '#fbbf24',
                        background: editingBanner.badgeBgColor || 'rgba(217, 119, 6, 0.25)',
                        border: '1px solid #d97706',
                        padding: '4px 14px',
                        borderRadius: '20px',
                        marginBottom: '14px'
                      }}
                    >
                      <span>🛡️</span> {editingBanner.badgeText || '30+ YEARS OF PURE QUALITY LEGACY'}
                    </div>

                    {/* Gradient Headline */}
                    <h1 style={{ margin: '0 0 12px 0', fontSize: previewDevice === 'mobile' ? '1.4rem' : '2.1rem', fontWeight: 700, lineHeight: 1.25, color: '#ffffff', fontFamily: "'Jost', sans-serif" }}>
                      {editingBanner.useTitleGradient ? (
                        <>
                          Taste the Authentic Goodness of{' '}
                          <span
                            style={{
                              background: `linear-gradient(135deg, ${editingBanner.titleGradientStart || '#fbbf24'} 0%, ${editingBanner.titleGradientEnd || '#d97706'} 100%)`,
                              WebkitBackgroundClip: 'text',
                              WebkitTextFillColor: 'transparent',
                              fontWeight: 800
                            }}
                          >
                            Pure Dry Fruits & Spices
                          </span>
                        </>
                      ) : (
                        editingBanner.title || 'Taste the Authentic Goodness of Pure Dry Fruits & Spices'
                      )}
                    </h1>

                    {/* Subtitle Description */}
                    {editingBanner.subtitle && (
                      <p style={{ margin: '0 0 20px 0', fontSize: previewDevice === 'mobile' ? '0.85rem' : '0.98rem', opacity: 0.9, lineHeight: 1.5, whiteSpace: 'pre-wrap' }}>
                        {editingBanner.subtitle}
                      </p>
                    )}

                    {/* CTA Buttons */}
                    <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap', marginBottom: '24px' }}>
                      <button
                        type="button"
                        style={{
                          background: editingBanner.buttonBgColor || '#007A3D',
                          color: editingBanner.buttonTextColor || '#ffffff',
                          border: 'none',
                          padding: '10px 22px',
                          borderRadius: '6px',
                          fontWeight: 700,
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                        }}
                      >
                        {editingBanner.buttonText || 'Explore Collection'}
                      </button>

                      {editingBanner.secondaryButtonText && (
                        <button
                          type="button"
                          style={{
                            background: 'rgba(255,255,255,0.1)',
                            color: '#ffffff',
                            border: '1px solid rgba(255,255,255,0.4)',
                            padding: '10px 22px',
                            borderRadius: '6px',
                            fontWeight: 700,
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                          }}
                        >
                          {editingBanner.secondaryButtonText}
                        </button>
                      )}
                    </div>

                    {/* Bottom Stats Counter Row */}
                    <div style={{ display: 'flex', gap: '24px', borderTop: '1px solid rgba(255,255,255,0.15)', paddingTop: '14px' }}>
                      {(editingBanner.statsItems || [
                        { value: '100%', label: 'Natural & Lab Tested' },
                        { value: '500+', label: 'Wholesale Retailers' },
                        { value: '30+ Yrs', label: 'Industry Trust' }
                      ]).map((stat, i) => (
                        <div key={i}>
                          <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#fbbf24' }}>{stat.value}</div>
                          <div style={{ fontSize: '0.75rem', opacity: 0.85 }}>{stat.label}</div>
                        </div>
                      ))}
                    </div>

                  </div>
                </div>

              </div>

              {/* COLUMN 3 (RIGHT 25%): Block Inspector & Rich Formatting Toolbar */}
              <div style={{ width: '25%', minWidth: '300px', background: '#ffffff', borderLeft: '1px solid #e2e8f0', padding: '20px', overflowY: 'auto' }}>
                <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '6px' }}>
                  <Sliders size={16} color="#0284c7" /> Block Inspector & Formatting
                </div>

                {/* Device Aspect Ratio Selector */}
                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>📐 Canvas Aspect Ratio</div>
                  <select
                    style={{ width: '100%', padding: '7px', fontSize: '12px', border: '1px solid #0284c7', borderRadius: '4px', fontWeight: 600, color: '#0369a1', background: '#f0f9ff' }}
                    value={editingBanner.aspectRatio || '16:9'}
                    onChange={(e) => setEditingBanner({ ...editingBanner, aspectRatio: e.target.value as AdminBanner['aspectRatio'] })}
                  >
                    {aspectRatios.map((ar) => (
                      <option key={ar.key} value={ar.key}>
                        {ar.icon} {ar.label}
                      </option>
                    ))}
                  </select>
                </div>

                {/* MS Word Format Shortcuts Bar */}
                <div style={{ background: '#f1f5f9', padding: '8px', borderRadius: '6px', display: 'flex', gap: '6px', marginBottom: '16px' }}>
                  <button
                    type="button"
                    title="Bold (Ctrl+B)"
                    style={{ padding: '6px 10px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => {
                      if (selectedLayerId && editingBanner?.layers) {
                        const layers = editingBanner.layers.map(l => l.id === selectedLayerId ? { ...l, fontWeight: l.fontWeight === '700' ? '400' : '700' } : l);
                        setEditingBanner({ ...editingBanner, layers });
                      }
                    }}
                  >
                    <Bold size={15} />
                  </button>

                  <button
                    type="button"
                    title="Italic (Ctrl+I)"
                    style={{ padding: '6px 10px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => {
                      if (selectedLayerId && editingBanner?.layers) {
                        const layers = editingBanner.layers.map(l => l.id === selectedLayerId ? { ...l, fontStyle: l.fontStyle === 'italic' ? 'normal' : 'italic' } : l);
                        setEditingBanner({ ...editingBanner, layers });
                      }
                    }}
                  >
                    <Italic size={15} />
                  </button>

                  <button
                    type="button"
                    title="Underline (Ctrl+U)"
                    style={{ padding: '6px 10px', background: '#fff', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => {
                      if (selectedLayerId && editingBanner?.layers) {
                        const layers = editingBanner.layers.map(l => l.id === selectedLayerId ? { ...l, textDecoration: l.textDecoration === 'underline' ? 'none' : 'underline' } : l);
                        setEditingBanner({ ...editingBanner, layers });
                      }
                    }}
                  >
                    <UnderlineIcon size={15} />
                  </button>

                  <button
                    type="button"
                    title="Hyperlink (Ctrl+H)"
                    style={{ padding: '6px 10px', background: '#f0f6fc', border: '1px solid #0969da', color: '#0969da', borderRadius: '4px', cursor: 'pointer' }}
                    onClick={() => setShowHyperlinkModal(true)}
                  >
                    <LinkIcon size={15} />
                  </button>
                </div>

                {/* Gradient Headline Customizer */}
                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>🎨 Dual-Color Gradient Headline</div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '12px', cursor: 'pointer', marginBottom: '10px' }}>
                    <input
                      type="checkbox"
                      checked={editingBanner.useTitleGradient ?? true}
                      onChange={(e) => setEditingBanner({ ...editingBanner, useTitleGradient: e.target.checked })}
                    />
                    Enable Gold Gradient Text
                  </label>

                  {editingBanner.useTitleGradient && (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '8px' }}>
                      <div>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>Start Color</span>
                        <input
                          type="color"
                          style={{ width: '100%', height: '30px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                          value={editingBanner.titleGradientStart || '#fbbf24'}
                          onChange={(e) => setEditingBanner({ ...editingBanner, titleGradientStart: e.target.value })}
                        />
                      </div>
                      <div>
                        <span style={{ fontSize: '11px', color: '#64748b' }}>End Color</span>
                        <input
                          type="color"
                          style={{ width: '100%', height: '30px', border: 'none', cursor: 'pointer', borderRadius: '4px' }}
                          value={editingBanner.titleGradientEnd || '#d97706'}
                          onChange={(e) => setEditingBanner({ ...editingBanner, titleGradientEnd: e.target.value })}
                        />
                      </div>
                    </div>
                  )}
                </div>

                {/* Subtitle Multiline Text Box with Enter/Shift+Enter */}
                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '6px', border: '1px solid #e2e8f0', marginBottom: '16px' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '6px' }}>📝 Subtitle (Enter for Newline)</div>
                  <textarea
                    rows={4}
                    style={{ width: '100%', padding: '8px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                    value={editingBanner.subtitle || ''}
                    onChange={(e) => setEditingBanner({ ...editingBanner, subtitle: e.target.value })}
                  />
                </div>

                {/* CTA Button Links */}
                <div style={{ background: '#f8fafc', padding: '14px', borderRadius: '6px', border: '1px solid #e2e8f0' }}>
                  <div style={{ fontSize: '12px', fontWeight: 700, color: '#0f172a', marginBottom: '8px' }}>🔗 CTA Buttons & Target Links</div>
                  <div style={{ marginBottom: '10px' }}>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Button 1 Label & Target</span>
                    <input
                      type="text"
                      placeholder="Button Label"
                      style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '4px' }}
                      value={editingBanner.buttonText || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, buttonText: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Target Link (e.g. /products)"
                      style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                      value={editingBanner.linkUrl || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, linkUrl: e.target.value })}
                    />
                  </div>

                  <div>
                    <span style={{ fontSize: '11px', color: '#64748b' }}>Button 2 Label & Target</span>
                    <input
                      type="text"
                      placeholder="Secondary Button Label"
                      style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px', marginBottom: '4px' }}
                      value={editingBanner.secondaryButtonText || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, secondaryButtonText: e.target.value })}
                    />
                    <input
                      type="text"
                      placeholder="Target Link (e.g. /bulk-order)"
                      style={{ width: '100%', padding: '6px', fontSize: '12px', border: '1px solid #cbd5e1', borderRadius: '4px' }}
                      value={editingBanner.secondaryButtonLink || ''}
                      onChange={(e) => setEditingBanner({ ...editingBanner, secondaryButtonLink: e.target.value })}
                    />
                  </div>
                </div>

              </div>

            </div>
          </div>
        </div>
      )}

      {/* Hyperlink Popover Dialog (Ctrl+H) */}
      {showHyperlinkModal && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', zIndex: 99999999, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
          <div style={{ background: '#ffffff', padding: '24px', borderRadius: '8px', width: '400px', boxShadow: '0 20px 40px rgba(0,0,0,0.3)' }}>
            <h4 style={{ margin: '0 0 12px 0', fontSize: '15px', color: '#0f172a' }}>🔗 Hyperlink Selected Text (Ctrl+H)</h4>
            <input
              type="text"
              placeholder="Enter target link (e.g. /products or /bulk-order)"
              style={{ width: '100%', padding: '8px', fontSize: '13px', border: '1px solid #0284c7', borderRadius: '4px', marginBottom: '16px' }}
              value={hyperlinkUrlInput}
              onChange={(e) => setHyperlinkUrlInput(e.target.value)}
            />
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button type="button" style={{ padding: '6px 12px', background: '#f1f5f9', border: '1px solid #cbd5e1', borderRadius: '4px', cursor: 'pointer' }} onClick={() => setShowHyperlinkModal(false)}>
                Cancel
              </button>
              <button
                type="button"
                style={{ padding: '6px 16px', background: '#0284c7', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 600, cursor: 'pointer' }}
                onClick={() => {
                  if (selectedLayerId && editingBanner?.layers) {
                    const layers = editingBanner.layers.map(l => l.id === selectedLayerId ? { ...l, hyperlink: hyperlinkUrlInput } : l);
                    setEditingBanner({ ...editingBanner, layers });
                  }
                  setShowHyperlinkModal(false);
                }}
              >
                Apply Hyperlink
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
