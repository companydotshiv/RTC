import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { Product } from '../../types/product';
import { Plus, Search, Edit2, Save, Trash2, Layers, X, Check, ArrowLeft, ExternalLink, HelpCircle, Image, Package, Sliders, FileText, CheckCircle2, AlertCircle } from 'lucide-react';

export const ProductsPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  // View state: 'list' | 'edit' | 'add'
  const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);

  // Active tab inside WooCommerce Product Data metabox: 'general' | 'inventory' | 'variations' | 'attributes' | 'bullets' | 'custom_table'
  const [productDataTab, setProductDataTab] = useState<'general' | 'inventory' | 'variations' | 'attributes' | 'bullets' | 'custom_table'>('general');

  const [bulkStockData, setBulkStockData] = useState<{ [id: number]: number }>({});
  const [selectedWeights, setSelectedWeights] = useState<{ [id: number]: string }>({});

  // Toast Save Notification State
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const products = adminStore.products;
  const categories = adminStore.categories;

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAdd = () => {
    setEditingProduct({
      name: '',
      slug: '',
      category: 'dry-fruits',
      categoryName: 'Dry Fruits & Nuts',
      price: 499,
      originalPrice: 599,
      badge: '',
      image: '/hero_dry_fruits_1785924400069.png',
      gallery: ['/hero_dry_fruits_1785924400069.png'],
      description: 'Handpicked, 100% natural premium grade produce harvested from pristine orchards.',
      shortDesc: 'Handpicked, 100% natural premium grade produce.',
      weights: ['250g', '500g', '1kg'],
      weightPrices: { '250g': 499, '500g': 949, '1kg': 1799 },
      weightOriginalPrices: { '250g': 599, '500g': 1149, '1kg': 2199 },
      stockCount: 25,
      stock: true,
      sku: 'RTC-PRD-' + Math.floor(1000 + Math.random() * 9000),
      bullets: [
        { title: 'Origin', text: 'Finest 100% natural harvest' },
        { title: 'Grade', text: 'Grade-A triple sorted whole kernels' },
        { title: 'Nutritional Value', text: 'Rich in dietary fiber, protein & healthy fats' }
      ]
    });
    setProductDataTab('general');
    setCurrentView('editor');
  };

  const handleOpenEdit = (p: Product) => {
    const galleryArr = p.gallery && p.gallery.length > 0 ? p.gallery : [p.image];
    setEditingProduct({
      ...p,
      gallery: galleryArr,
      sku: p.sku || `RTC-${p.category.toUpperCase().substring(0, 3)}-${p.id}`
    });
    setProductDataTab('general');
    setCurrentView('editor');
  };

  const handleSaveProduct = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingProduct || !editingProduct.name) {
      alert('Please enter a product name before publishing.');
      return;
    }

    const galleryArr = (editingProduct.gallery && editingProduct.gallery.length > 0)
      ? editingProduct.gallery.filter(g => g && g.trim() !== '')
      : [editingProduct.image || ''];

    const primaryImg = galleryArr[0] || editingProduct.image || '';

    const productToSave: Partial<Product> = {
      ...editingProduct,
      slug: editingProduct.slug || editingProduct.name.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, ''),
      image: primaryImg,
      gallery: galleryArr.length > 0 ? galleryArr : [primaryImg],
      stock: (editingProduct.stockCount ?? 0) > 0
    };

    const isSuccess = adminStore.addOrUpdateProduct(productToSave);
    if (isSuccess) {
      setSaveStatus({ type: 'success', message: 'Product updated successfully.' });
    } else {
      setSaveStatus({ type: 'error', message: 'An error occurred while saving the product.' });
    }
    setTimeout(() => {
      setSaveStatus(null);
    }, 3500);

    setCurrentView('list');
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to move "${name}" to trash?`)) {
      adminStore.deleteProduct(id);
      if (editingProduct?.id === id) {
        setCurrentView('list');
        setEditingProduct(null);
      }
    }
  };

  const handleOpenBulkStock = () => {
    const initialBulk: { [id: number]: number } = {};
    products.forEach((p) => {
      initialBulk[p.id] = p.stockCount ?? (p.stock ? 20 : 0);
    });
    setBulkStockData(initialBulk);
    setIsBulkModalOpen(true);
  };

  const handleSaveBulkStock = () => {
    Object.entries(bulkStockData).forEach(([idStr, qty]) => {
      adminStore.updateProductStockCount(Number(idStr), Number(qty));
    });
    setIsBulkModalOpen(false);
    setSaveStatus({ type: 'success', message: 'Bulk stock levels updated.' });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="products-panel">
      {/* Toast Save Notification Popup */}
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
            gap: '8px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
          }}
        >
          {saveStatus.type === 'success' ? <Check size={16} color="#fff" /> : <AlertCircle size={16} color="#fff" />}
          <span>{saveStatus.message}</span>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 1. ALL PRODUCTS LIST VIEW (Classic WooCommerce Table) */}
      {/* ========================================================================= */}
      {currentView === 'list' && (
        <div>
          {/* Page Heading with Add New button */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <h1 className="wp-page-title" style={{ margin: 0 }}>Products</h1>
            <button className="wp-button-secondary" onClick={handleOpenAdd} style={{ fontWeight: 600 }}>
              Add New
            </button>
            <button className="wp-button-secondary" onClick={handleOpenBulkStock} style={{ fontWeight: 600 }}>
              <Layers size={13} style={{ display: 'inline', marginRight: '4px' }} /> Quick Edit Stock
            </button>
          </div>

          {/* Filter Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                style={{ padding: '5px 10px', fontSize: '13px', borderRadius: '3px' }}
              >
                <option value="all">Select a category</option>
                {categories.map((c) => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
              <button
                className="wp-button-secondary"
                onClick={() => {}}
                style={{ padding: '5px 10px', fontSize: '13px' }}
              >
                Filter
              </button>
            </div>

            <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
              <input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ padding: '5px 10px', fontSize: '13px', width: '220px' }}
              />
              <button className="wp-button-secondary" style={{ padding: '5px 10px', fontSize: '13px' }}>
                Search Products
              </button>
            </div>
          </div>

          {/* WooCommerce Product List Table */}
          <div className="wp-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #c3c4c7' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="wp-list-table">
                <thead>
                  <tr>
                    <th style={{ width: '45px' }}><Image size={15} color="#888" /></th>
                    <th>Name</th>
                    <th>SKU</th>
                    <th>Stock</th>
                    <th>Price</th>
                    <th>Categories</th>
                    <th>Tags / Badges</th>
                    <th style={{ width: '90px' }}>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredProducts.map((p) => {
                    const currentStock = p.stockCount ?? (p.stock ? 20 : 0);
                    return (
                      <tr key={p.id}>
                        {/* Thumbnail */}
                        <td style={{ padding: '6px 10px' }}>
                          <img
                            src={p.image}
                            alt={p.name}
                            style={{ width: '38px', height: '38px', objectFit: 'contain', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '3px' }}
                          />
                        </td>

                        {/* Name & Row Actions */}
                        <td>
                          <span
                            className="wp-post-title-link"
                            onClick={() => handleOpenEdit(p)}
                          >
                            {p.name}
                          </span>
                          <div className="row-actions">
                            <span style={{ color: '#2271b1', cursor: 'pointer' }} onClick={() => handleOpenEdit(p)}>Edit</span>
                            <span style={{ color: '#ddd' }}>|</span>
                            <span style={{ color: '#a00', cursor: 'pointer' }} onClick={() => handleDeleteProduct(p.id, p.name)}>Trash</span>
                            <span style={{ color: '#ddd' }}>|</span>
                            <a href={`/product/${p.slug}`} target="_blank" rel="noreferrer" style={{ color: '#2271b1', textDecoration: 'none' }}>View</a>
                          </div>
                        </td>

                        {/* SKU */}
                        <td style={{ fontFamily: 'monospace', color: '#64748b' }}>
                          {p.sku || `RTC-PRD-${p.id}`}
                        </td>

                        {/* Stock */}
                        <td>
                          {currentStock > 0 ? (
                            <span style={{ color: '#008a20', fontWeight: 600 }}>
                              In stock ({currentStock})
                            </span>
                          ) : (
                            <span style={{ color: '#d63638', fontWeight: 600 }}>
                              Out of stock
                            </span>
                          )}
                        </td>

                        {/* Price */}
                        <td>
                          <span style={{ fontWeight: 600, color: '#1d2327' }}>₹{p.price}</span>
                          {p.originalPrice && p.originalPrice > p.price && (
                            <span style={{ textDecoration: 'line-through', color: '#8c8f94', marginLeft: '6px', fontSize: '12px' }}>
                              ₹{p.originalPrice}
                            </span>
                          )}
                        </td>

                        {/* Category */}
                        <td>{p.categoryName || p.category}</td>

                        {/* Badge */}
                        <td>
                          {p.badge ? (
                            <span style={{ background: '#f0fdf4', color: '#15803D', border: '1px solid #bbf7d0', padding: '2px 6px', borderRadius: '3px', fontSize: '11px', fontWeight: 600 }}>
                              {p.badge}
                            </span>
                          ) : (
                            <span style={{ color: '#8c8f94' }}>—</span>
                          )}
                        </td>

                        {/* Date */}
                        <td style={{ fontSize: '12px', color: '#64748b' }}>
                          Published<br />
                          {new Date().toISOString().split('T')[0]}
                        </td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. AUTHENTIC WOOCOMMERCE PRODUCT EDITOR (Edit Product / Add New) */}
      {/* ========================================================================= */}
      {currentView === 'editor' && editingProduct && (
        <form onSubmit={handleSaveProduct} style={{ textAlign: 'left' }}>
          
          {/* Header & Back Link */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                className="wp-button-secondary"
                onClick={() => setCurrentView('list')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <ArrowLeft size={14} /> Back to Products
              </button>
              <h1 className="wp-page-title" style={{ margin: 0 }}>
                {editingProduct.id ? `Edit product` : 'Add new product'}
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {editingProduct.id && (
                <button
                  type="button"
                  style={{ background: '#fcf0f1', border: '1px solid #d63638', color: '#d63638', padding: '5px 12px', borderRadius: '3px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
                  onClick={() => handleDeleteProduct(editingProduct.id as number, editingProduct.name || '')}
                >
                  Move to Trash
                </button>
              )}
              <button type="submit" className="wp-button-primary" style={{ padding: '6px 16px', fontWeight: 700 }}>
                {editingProduct.id ? 'Update Product' : 'Publish Product'}
              </button>
            </div>
          </div>

          {/* 2-Column WordPress Post Layout */}
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }} className="wp-post-body">
            
            {/* LEFT MAIN COLUMN */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Product Title Input */}
              <div style={{ background: '#fff', border: '1px solid #c3c4c7', padding: '12px 14px', borderRadius: '3px' }}>
                <input
                  type="text"
                  required
                  placeholder="Enter product name here"
                  value={editingProduct.name || ''}
                  onChange={(e) => {
                    const nameVal = e.target.value;
                    const autoSlug = nameVal.toLowerCase().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '');
                    setEditingProduct({
                      ...editingProduct,
                      name: nameVal,
                      slug: editingProduct.id ? (editingProduct.slug || autoSlug) : autoSlug
                    });
                  }}
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

                {/* Permalink Slug Bar */}
                <div style={{ marginTop: '8px', fontSize: '12px', color: '#64748b', display: 'flex', alignItems: 'center', gap: '6px', flexWrap: 'wrap' }}>
                  <strong>Permalink:</strong>
                  <span>http://rtcfoods.in/product/</span>
                  <input
                    type="text"
                    value={editingProduct.slug || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, slug: e.target.value })}
                    style={{ padding: '2px 6px', fontSize: '12px', width: '200px' }}
                  />
                  {editingProduct.slug && (
                    <a
                      href={`/product/${editingProduct.slug}`}
                      target="_blank"
                      rel="noreferrer"
                      style={{ color: '#2271b1', textDecoration: 'none', marginLeft: '6px' }}
                    >
                      [View Product]
                    </a>
                  )}
                </div>
              </div>

              {/* Long Description Box (WYSIWYG Simulation) */}
              <div className="wp-card" style={{ padding: 0 }}>
                <div className="wp-card-header" style={{ padding: '10px 14px', margin: 0, background: '#f6f7f7', fontWeight: 600, fontSize: '13px' }}>
                  Product description
                </div>
                <div style={{ padding: '12px' }}>
                  <div style={{ display: 'flex', gap: '6px', marginBottom: '8px', background: '#f0f0f1', padding: '4px 8px', borderRadius: '3px' }}>
                    <button
                      type="button"
                      style={{ background: '#fff', border: '1px solid #c3c4c7', borderRadius: '2px', padding: '2px 8px', fontWeight: 700, fontSize: '12px', cursor: 'pointer' }}
                      onClick={() => {
                        const current = editingProduct.description || '';
                        setEditingProduct({ ...editingProduct, description: current + ' **Bold Text**' });
                      }}
                    >
                      B
                    </button>
                    <button
                      type="button"
                      style={{ background: '#fff', border: '1px solid #c3c4c7', borderRadius: '2px', padding: '2px 8px', fontStyle: 'italic', fontSize: '12px', cursor: 'pointer' }}
                      onClick={() => {
                        const current = editingProduct.description || '';
                        setEditingProduct({ ...editingProduct, description: current + ' *Italic Text*' });
                      }}
                    >
                      I
                    </button>
                    <button
                      type="button"
                      style={{ background: '#fff', border: '1px solid #c3c4c7', borderRadius: '2px', padding: '2px 8px', fontSize: '12px', cursor: 'pointer' }}
                      onClick={() => {
                        const current = editingProduct.description || '';
                        setEditingProduct({ ...editingProduct, description: current + '\n- Bullet Item' });
                      }}
                    >
                      • List
                    </button>
                  </div>
                  <textarea
                    rows={6}
                    value={editingProduct.description || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, description: e.target.value })}
                    placeholder="Enter detailed comprehensive product description..."
                    style={{ width: '100%', minWidth: '100%', boxSizing: 'border-box', padding: '10px', fontSize: '13px', lineHeight: 1.6 }}
                  />
                </div>
              </div>

              {/* PRODUCT DETAILS & SPECIFICATIONS METABOX */}
              <div style={{ background: '#fff', border: '1px solid #c3c4c7', borderRadius: '3px', overflow: 'hidden' }}>
                {/* Metabox Top Bar */}
                <div style={{ background: '#f6f7f7', borderBottom: '1px solid #c3c4c7', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '8px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ fontWeight: 700, fontSize: '13px', color: '#1d2327' }}>Product Specifications & Pricing</span>
                  </div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>
                    Configure pricing, stock, weights & ingredients
                  </div>
                </div>

                {/* Metabox Tab Layout (Left vertical tabs + Right content) */}
                <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', minHeight: '320px' }}>
                  
                  {/* Left Tabs Bar */}
                  <div style={{ background: '#f0f0f1', borderRight: '1px solid #c3c4c7', display: 'flex', flexDirection: 'column' }}>
                    {[
                      { id: 'general', label: '⚙️ General' },
                      { id: 'inventory', label: '📦 Inventory' },
                      { id: 'variations', label: '⚖️ Variations (Packs)' },
                      { id: 'attributes', label: '📋 Attributes / Specs' },
                      { id: 'bullets', label: '✨ Bullet Highlights' },
                      { id: 'custom_table', label: '📑 Custom Matrix' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setProductDataTab(tab.id as any)}
                        style={{
                          padding: '10px 12px',
                          border: 'none',
                          borderBottom: '1px solid #e0e0e1',
                          background: productDataTab === tab.id ? '#ffffff' : 'transparent',
                          color: productDataTab === tab.id ? '#2271b1' : '#50575e',
                          fontWeight: productDataTab === tab.id ? 700 : 500,
                          fontSize: '12px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          borderLeft: productDataTab === tab.id ? '3px solid #2271b1' : '3px solid transparent'
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Right Tab Content Panel */}
                  <div style={{ padding: '20px' }}>
                    
                    {/* 1. GENERAL TAB */}
                    {productDataTab === 'general' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '12px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>Regular price (₹):</label>
                          <input
                            type="number"
                            value={editingProduct.originalPrice || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, originalPrice: parseFloat(e.target.value) || 0 })}
                            style={{ width: '180px' }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '12px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>Sale price (₹):</label>
                          <input
                            type="number"
                            required
                            value={editingProduct.price || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, price: parseFloat(e.target.value) || 0 })}
                            style={{ width: '180px' }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '12px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>Badge / Tag:</label>
                          <input
                            type="text"
                            placeholder="e.g. 20% OFF, Bestseller, Fresh Harvest"
                            value={editingProduct.badge || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                            style={{ width: '240px' }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '12px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>Default Weight:</label>
                          <input
                            type="text"
                            placeholder="e.g. 250g, 500g, 1kg"
                            value={(editingProduct.weights || [])[0] || '250g'}
                            onChange={(e) => {
                              const otherWeights = (editingProduct.weights || []).slice(1);
                              setEditingProduct({ ...editingProduct, weights: [e.target.value, ...otherWeights] });
                            }}
                            style={{ width: '180px' }}
                          />
                        </div>
                      </div>
                    )}

                    {/* 2. INVENTORY TAB */}
                    {productDataTab === 'inventory' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '12px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>SKU:</label>
                          <input
                            type="text"
                            placeholder="e.g. RTC-ALM-001"
                            value={editingProduct.sku || ''}
                            onChange={(e) => setEditingProduct({ ...editingProduct, sku: e.target.value })}
                            style={{ width: '220px' }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '12px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>Stock quantity:</label>
                          <input
                            type="number"
                            value={editingProduct.stockCount ?? 10}
                            onChange={(e) => {
                              const count = parseInt(e.target.value) || 0;
                              setEditingProduct({ ...editingProduct, stockCount: count, stock: count > 0 });
                            }}
                            style={{ width: '140px' }}
                          />
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '140px 1fr', alignItems: 'center', gap: '12px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>Stock status:</label>
                          <select
                            value={(editingProduct.stockCount ?? 0) > 0 ? 'instock' : 'outofstock'}
                            onChange={(e) => {
                              const isInstock = e.target.value === 'instock';
                              setEditingProduct({
                                ...editingProduct,
                                stock: isInstock,
                                stockCount: isInstock ? (editingProduct.stockCount || 10) : 0
                              });
                            }}
                            style={{ width: '180px' }}
                          >
                            <option value="instock">In stock</option>
                            <option value="outofstock">Out of stock</option>
                          </select>
                        </div>
                      </div>
                    )}

                    {/* 3. VARIATIONS & PACK SIZES TAB */}
                    {productDataTab === 'variations' && (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600 }}>Configure Pack Weights & Prices:</span>
                          <button
                            type="button"
                            className="wp-button-secondary"
                            style={{ fontSize: '12px' }}
                            onClick={() => {
                              const currentW = editingProduct.weights || ['250g'];
                              setEditingProduct({ ...editingProduct, weights: [...currentW, '1kg'] });
                            }}
                          >
                            + Add Weight Pack
                          </button>
                        </div>

                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {(editingProduct.weights || ['250g']).map((w, wIdx) => {
                            const wpMap = editingProduct.weightPrices || {};
                            const wopMap = editingProduct.weightOriginalPrices || {};
                            return (
                              <div key={wIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center', background: '#f8fafc', padding: '8px 12px', border: '1px solid #e2e8f0', borderRadius: '4px' }}>
                                <input
                                  type="text"
                                  placeholder="Weight (e.g. 500g)"
                                  value={w}
                                  onChange={(e) => {
                                    const newW = [...(editingProduct.weights || [])];
                                    newW[wIdx] = e.target.value;
                                    setEditingProduct({ ...editingProduct, weights: newW });
                                  }}
                                  style={{ width: '100px' }}
                                />
                                <input
                                  type="number"
                                  placeholder="Sale Price (₹)"
                                  value={wpMap[w] || ''}
                                  onChange={(e) => {
                                    const updated = { ...wpMap, [w]: parseFloat(e.target.value) || 0 };
                                    setEditingProduct({ ...editingProduct, weightPrices: updated });
                                  }}
                                  style={{ width: '120px' }}
                                />
                                <input
                                  type="number"
                                  placeholder="MRP Price (₹)"
                                  value={wopMap[w] || ''}
                                  onChange={(e) => {
                                    const updated = { ...wopMap, [w]: parseFloat(e.target.value) || 0 };
                                    setEditingProduct({ ...editingProduct, weightOriginalPrices: updated });
                                  }}
                                  style={{ width: '120px' }}
                                />
                                {(editingProduct.weights || []).length > 1 && (
                                  <button
                                    type="button"
                                    style={{ background: 'none', border: 'none', color: '#d63638', cursor: 'pointer', padding: '4px' }}
                                    onClick={() => {
                                      const newW = (editingProduct.weights || []).filter((_, i) => i !== wIdx);
                                      setEditingProduct({ ...editingProduct, weights: newW });
                                    }}
                                  >
                                    <Trash2 size={14} />
                                  </button>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 4. ATTRIBUTES / SPECS TAB */}
                    {productDataTab === 'attributes' && (
                      <div>
                        <span style={{ fontSize: '13px', fontWeight: 600, display: 'block', marginBottom: '10px' }}>Product Specifications Table:</span>
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.2fr', gap: '8px' }}>
                          {[
                            'Country of origin',
                            'Brand',
                            'Common name',
                            'Additive info',
                            'Product Dimensions',
                            'Manufacturer name',
                            'Ingredients',
                            'Customer care'
                          ].map((lbl, lIdx) => {
                            const table = editingProduct.additionalInfoTable || [];
                            const entry = table.find(t => t.label.toLowerCase() === lbl.toLowerCase()) || { label: lbl, value: '' };
                            return (
                              <React.Fragment key={lIdx}>
                                <div style={{ background: '#f0f0f1', padding: '6px 10px', fontSize: '12px', fontWeight: 600, border: '1px solid #c3c4c7', borderRadius: '3px', display: 'flex', alignItems: 'center' }}>
                                  {lbl}
                                </div>
                                <input
                                  type="text"
                                  placeholder={`Enter ${lbl}...`}
                                  value={entry.value || ''}
                                  onChange={(e) => {
                                    const updated = [...table];
                                    const matchIdx = updated.findIndex(t => t.label.toLowerCase() === lbl.toLowerCase());
                                    if (matchIdx >= 0) {
                                      updated[matchIdx] = { label: lbl, value: e.target.value };
                                    } else {
                                      updated.push({ label: lbl, value: e.target.value });
                                    }
                                    setEditingProduct({ ...editingProduct, additionalInfoTable: updated });
                                  }}
                                  style={{ width: '100%' }}
                                />
                              </React.Fragment>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    {/* 5. BULLET HIGHLIGHTS TAB */}
                    {productDataTab === 'bullets' && (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600 }}>Key PDP Highlights:</span>
                          <button
                            type="button"
                            className="wp-button-secondary"
                            style={{ fontSize: '12px' }}
                            onClick={() => {
                              const cur = editingProduct.bullets || [];
                              setEditingProduct({ ...editingProduct, bullets: [...cur, { title: 'Feature', text: 'Detail text' }] });
                            }}
                          >
                            + Add Highlight
                          </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {(editingProduct.bullets || []).map((b, bIdx) => (
                            <div key={bIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <input
                                type="text"
                                placeholder="Title"
                                value={b.title}
                                onChange={(e) => {
                                  const updated = [...(editingProduct.bullets || [])];
                                  updated[bIdx] = { ...updated[bIdx], title: e.target.value };
                                  setEditingProduct({ ...editingProduct, bullets: updated });
                                }}
                                style={{ width: '140px' }}
                              />
                              <input
                                type="text"
                                placeholder="Highlight detail"
                                value={b.text}
                                onChange={(e) => {
                                  const updated = [...(editingProduct.bullets || [])];
                                  updated[bIdx] = { ...updated[bIdx], text: e.target.value };
                                  setEditingProduct({ ...editingProduct, bullets: updated });
                                }}
                                style={{ flex: 1 }}
                              />
                              <button
                                type="button"
                                style={{ background: 'none', border: 'none', color: '#d63638', cursor: 'pointer' }}
                                onClick={() => {
                                  const updated = (editingProduct.bullets || []).filter((_, i) => i !== bIdx);
                                  setEditingProduct({ ...editingProduct, bullets: updated });
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                    {/* 6. CUSTOM TABLE DATA TAB */}
                    {productDataTab === 'custom_table' && (
                      <div>
                        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '12px' }}>
                          <span style={{ fontSize: '13px', fontWeight: 600 }}>Size vs Grade Matrix:</span>
                          <button
                            type="button"
                            className="wp-button-secondary"
                            style={{ fontSize: '12px' }}
                            onClick={() => {
                              const cur = editingProduct.customDescriptionRows || [];
                              setEditingProduct({ ...editingProduct, customDescriptionRows: [...cur, { size: '500g', productType: 'Gold Grade' }] });
                            }}
                          >
                            + Add Row
                          </button>
                        </div>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                          {(editingProduct.customDescriptionRows || [{ size: '250g', productType: 'Standard' }]).map((r, rIdx) => (
                            <div key={rIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                              <input
                                type="text"
                                placeholder="Size (e.g. 500g)"
                                value={r.size}
                                onChange={(e) => {
                                  const updated = [...(editingProduct.customDescriptionRows || [])];
                                  updated[rIdx] = { ...updated[rIdx], size: e.target.value };
                                  setEditingProduct({ ...editingProduct, customDescriptionRows: updated });
                                }}
                                style={{ width: '140px' }}
                              />
                              <input
                                type="text"
                                placeholder="Product Type / Quality"
                                value={r.productType}
                                onChange={(e) => {
                                  const updated = [...(editingProduct.customDescriptionRows || [])];
                                  updated[rIdx] = { ...updated[rIdx], productType: e.target.value };
                                  setEditingProduct({ ...editingProduct, customDescriptionRows: updated });
                                }}
                                style={{ flex: 1 }}
                              />
                              <button
                                type="button"
                                style={{ background: 'none', border: 'none', color: '#d63638', cursor: 'pointer' }}
                                onClick={() => {
                                  const updated = (editingProduct.customDescriptionRows || []).filter((_, i) => i !== rIdx);
                                  setEditingProduct({ ...editingProduct, customDescriptionRows: updated });
                                }}
                              >
                                <Trash2 size={14} />
                              </button>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}

                  </div>
                </div>
              </div>

              {/* Product Short Description Metabox */}
              <div className="wp-card" style={{ padding: 0 }}>
                <div className="wp-card-header" style={{ padding: '10px 14px', margin: 0, background: '#f6f7f7', fontWeight: 600, fontSize: '13px' }}>
                  Product short description
                </div>
                <div style={{ padding: '12px' }}>
                  <textarea
                    rows={3}
                    value={editingProduct.shortDesc || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, shortDesc: e.target.value })}
                    placeholder="Short snippet displayed next to the main product image..."
                    style={{ width: '100%', minWidth: '100%', boxSizing: 'border-box', padding: '10px', fontSize: '13px' }}
                  />
                </div>
              </div>

            </div>

            {/* RIGHT SIDEBAR COLUMN (Publish, Category, Product Image, Gallery) */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* 1. PUBLISH METABOX */}
              <div className="wp-card" style={{ padding: 0 }}>
                <div className="wp-card-header" style={{ padding: '10px 14px', margin: 0, background: '#f6f7f7', fontWeight: 600, fontSize: '13px' }}>
                  Publish
                </div>
                <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#50575e' }}>
                  <div>Status: <strong style={{ color: '#1d2327' }}>Published</strong></div>
                  <div>Visibility: <strong style={{ color: '#1d2327' }}>Public</strong></div>
                  <div>Catalog visibility: <strong style={{ color: '#1d2327' }}>Shop and search</strong></div>
                </div>
                <div style={{ padding: '10px 14px', background: '#f6f7f7', borderTop: '1px solid #c3c4c7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {editingProduct.id ? (
                    <span
                      style={{ color: '#a00', textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }}
                      onClick={() => handleDeleteProduct(editingProduct.id as number, editingProduct.name || '')}
                    >
                      Move to Trash
                    </span>
                  ) : <div />}
                  <button type="submit" className="wp-button-primary" style={{ fontWeight: 700 }}>
                    {editingProduct.id ? 'Update' : 'Publish'}
                  </button>
                </div>
              </div>

              {/* 2. PRODUCT CATEGORIES METABOX */}
              <div className="wp-card" style={{ padding: 0 }}>
                <div className="wp-card-header" style={{ padding: '10px 14px', margin: 0, background: '#f6f7f7', fontWeight: 600, fontSize: '13px' }}>
                  Product categories
                </div>
                <div style={{ padding: '12px 14px', maxHeight: '180px', overflowY: 'auto', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  {categories.map((c) => (
                    <label key={c.id} style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                      <input
                        type="radio"
                        name="product_category"
                        checked={editingProduct.category === c.id}
                        onChange={() => setEditingProduct({ ...editingProduct, category: c.id, categoryName: c.name })}
                      />
                      <span>{c.name}</span>
                    </label>
                  ))}
                </div>
              </div>

              {/* 3. PRODUCT IMAGE METABOX */}
              <div className="wp-card" style={{ padding: 0 }}>
                <div className="wp-card-header" style={{ padding: '10px 14px', margin: 0, background: '#f6f7f7', fontWeight: 600, fontSize: '13px' }}>
                  Product image
                </div>
                <div style={{ padding: '14px', textAlign: 'center' }}>
                  {editingProduct.image ? (
                    <div>
                      <img
                        src={editingProduct.image}
                        alt="Product preview"
                        style={{ width: '100%', maxHeight: '160px', objectFit: 'contain', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '4px', marginBottom: '8px' }}
                      />
                      <input
                        type="text"
                        placeholder="Image URL..."
                        value={editingProduct.image}
                        onChange={(e) => setEditingProduct({ ...editingProduct, image: e.target.value })}
                        style={{ width: '100%', boxSizing: 'border-box', fontSize: '12px' }}
                      />
                    </div>
                  ) : (
                    <span style={{ fontSize: '12px', color: '#8c8f94' }}>No featured image set</span>
                  )}
                </div>
              </div>

              {/* 4. PRODUCT GALLERY METABOX */}
              <div className="wp-card" style={{ padding: 0 }}>
                <div className="wp-card-header" style={{ padding: '10px 14px', margin: 0, background: '#f6f7f7', fontWeight: 600, fontSize: '13px' }}>
                  Product gallery
                </div>
                <div style={{ padding: '12px 14px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '6px', marginBottom: '10px' }}>
                    {(editingProduct.gallery || []).map((imgUrl, gIdx) => (
                      <div key={gIdx} style={{ position: 'relative' }}>
                        <img
                          src={imgUrl}
                          alt={`Gallery ${gIdx}`}
                          style={{ width: '100%', height: '54px', objectFit: 'contain', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: '3px' }}
                        />
                        <button
                          type="button"
                          onClick={() => {
                            const updated = (editingProduct.gallery || []).filter((_, i) => i !== gIdx);
                            setEditingProduct({ ...editingProduct, gallery: updated });
                          }}
                          style={{ position: 'absolute', top: '-4px', right: '-4px', background: '#d63638', color: '#fff', border: 'none', borderRadius: '50%', width: '16px', height: '16px', fontSize: '10px', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}
                        >
                          ×
                        </button>
                      </div>
                    ))}
                  </div>

                  <button
                    type="button"
                    className="wp-button-secondary"
                    style={{ fontSize: '12px', width: '100%', textAlign: 'center' }}
                    onClick={() => {
                      const newImg = prompt('Enter additional product image URL:', '/hero_dry_fruits_1785924400069.png');
                      if (newImg && newImg.trim() !== '') {
                        const cur = editingProduct.gallery || [];
                        setEditingProduct({ ...editingProduct, gallery: [...cur, newImg.trim()] });
                      }
                    }}
                  >
                    + Add gallery image
                  </button>
                </div>
              </div>

            </div>

          </div>

        </form>
      )}

      {/* ========================================================================= */}
      {/* 3. BULK STOCK QUICK-EDIT MODAL */}
      {/* ========================================================================= */}
      {isBulkModalOpen && (
        <div
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.6)',
            zIndex: 99999,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '20px'
          }}
          onClick={() => setIsBulkModalOpen(false)}
        >
          <div
            style={{
              background: '#fff',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '85vh',
              borderRadius: '4px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              display: 'flex',
              flexDirection: 'column',
              textAlign: 'left'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #c3c4c7', background: '#f6f7f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>Quick Edit Inventory / Stock Levels</h3>
              <button onClick={() => setIsBulkModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              <table className="wp-list-table">
                <thead>
                  <tr>
                    <th>Product</th>
                    <th>Category</th>
                    <th style={{ width: '120px' }}>Stock Qty</th>
                  </tr>
                </thead>
                <tbody>
                  {products.map((p) => (
                    <tr key={p.id}>
                      <td style={{ fontWeight: 600 }}>{p.name}</td>
                      <td>{p.categoryName}</td>
                      <td>
                        <input
                          type="number"
                          min={0}
                          value={bulkStockData[p.id] ?? 0}
                          onChange={(e) => setBulkStockData({ ...bulkStockData, [p.id]: parseInt(e.target.value) || 0 })}
                          style={{ width: '90px' }}
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            <div style={{ padding: '12px 18px', borderTop: '1px solid #c3c4c7', background: '#f6f7f7', display: 'flex', justifyContent: 'flex-end', gap: '8px' }}>
              <button className="wp-button-secondary" onClick={() => setIsBulkModalOpen(false)}>Cancel</button>
              <button className="wp-button-primary" onClick={handleSaveBulkStock}>Save All Stock</button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
