import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { Product } from '../../types/product';
import { Plus, Search, Edit2, Save, Trash2, Layers, X, Check } from 'lucide-react';

export const ProductsPanel: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBulkModalOpen, setIsBulkModalOpen] = useState(false);

  const [editingProduct, setEditingProduct] = useState<Partial<Product> | null>(null);
  const [bulkStockData, setBulkStockData] = useState<{ [id: number]: number }>({});
  const [selectedWeights, setSelectedWeights] = useState<{ [id: number]: string }>({});

  // Save Banner Notification State
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const products = adminStore.products;
  const categories = adminStore.categories;

  const filteredProducts = products.filter((p) => {
    const matchesSearch = p.name.toLowerCase().includes(searchTerm.toLowerCase()) || p.categoryName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleOpenAddModal = () => {
    setEditingProduct({
      name: '',
      category: 'dry-fruits',
      categoryName: 'Dry Fruits & Nuts',
      price: 0,
      originalPrice: 0,
      badge: '',
      image: '',
      gallery: [''],
      description: '',
      shortDesc: '',
      weights: ['250g'],
      stockCount: 10,
      stock: true
    });
    setIsModalOpen(true);
  };

  const handleSaveProduct = async (p: Product) => {
    const isSuccess = await adminStore.addOrUpdateProduct(p);
    if (isSuccess) {
      setSaveStatus({ type: 'success', message: 'Saved' });
    } else {
      setSaveStatus({ type: 'error', message: 'an issue occurred, try saving it again' });
    }
    setTimeout(() => {
      setSaveStatus(null);
    }, 3500);
  };

  const handleOpenEditModal = (p: Product) => {
    const galleryArr = p.gallery && p.gallery.length > 0 ? p.gallery : [p.image];
    setEditingProduct({
      ...p,
      gallery: galleryArr
    });
    setIsModalOpen(true);
  };

  const handleSaveModalProduct = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingProduct || !editingProduct.name) return;

    const galleryArr = (editingProduct.gallery && editingProduct.gallery.length > 0)
      ? editingProduct.gallery.filter(g => g && g.trim() !== '')
      : [editingProduct.image || ''];

    const primaryImg = galleryArr[0] || editingProduct.image || '';

    const productToSave: Partial<Product> = {
      ...editingProduct,
      image: primaryImg,
      gallery: galleryArr.length > 0 ? galleryArr : [primaryImg]
    };

    const isSuccess = adminStore.addOrUpdateProduct(productToSave);
    if (isSuccess) {
      setSaveStatus({ type: 'success', message: 'Saved' });
    } else {
      setSaveStatus({ type: 'error', message: 'An error has occurred. The changes were not saved' });
    }
    setTimeout(() => {
      setSaveStatus(null);
    }, 3500);

    setIsModalOpen(false);
    setEditingProduct(null);
  };

  const handleDeleteProduct = (id: number, name: string) => {
    if (window.confirm(`Are you sure you want to delete "${name}"?`)) {
      adminStore.deleteProduct(id);
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
  };

  return (
    <div className="products-panel">
      {/* Toast Save Notification Popup */}
      {saveStatus && (
        <div
          style={{
            position: 'fixed',
            top: '24px',
            right: '24px',
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
            gap: '10px',
            fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif'
          }}
        >
          {saveStatus.type === 'success' ? (
            <div
              style={{
                width: '22px',
                height: '22px',
                borderRadius: '50%',
                background: 'rgba(255,255,255,0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center'
              }}
            >
              <Check size={16} color="#ffffff" strokeWidth={3.5} />
            </div>
          ) : (
            <span style={{ fontSize: '1.1rem' }}>⚠️</span>
          )}
          <span>{saveStatus.message}</span>
        </div>
      )}

      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.75rem', alignItems: 'center' }}>
          <div className="admin-header-search" style={{ width: '260px' }}>
            <Search size={18} />
            <input
              type="text"
              placeholder="Search product name or SKU..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <select
            className="admin-form-control"
            style={{ width: '180px' }}
            value={selectedCategory}
            onChange={(e) => setSelectedCategory(e.target.value)}
          >
            <option value="all">All Categories</option>
            {categories.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name}
              </option>
            ))}
          </select>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem' }}>
          <button className="wp-button-secondary" onClick={handleOpenBulkStock} style={{ padding: '6px 12px', fontSize: '13px', fontWeight: 600 }}>
            <Layers size={15} /> Bulk Stock Update
          </button>
          <button className="wp-button-primary" onClick={handleOpenAddModal} style={{ padding: '6px 14px', fontSize: '13px', fontWeight: 600 }}>
            <Plus size={15} /> Add Product
          </button>
        </div>
      </div>

      {/* Product List Table */}
      <div className="wp-card" style={{ padding: 0, overflow: 'hidden' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="wp-list-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Category</th>
                <th>Sub-Category</th>
                <th>Price / MRP</th>
                <th>Weight / Size</th>
                <th>Stock Quantity</th>
                <th>Stock Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredProducts.map((p) => (
                <tr key={p.id}>
                  <td style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                    <img src={p.image} alt={p.name} style={{ width: '44px', height: '44px', borderRadius: '4px', objectFit: 'cover', border: '1px solid #c3c4c7' }} />
                    <div>
                      <div style={{ fontWeight: 600, color: '#1d2327' }}>{p.name}</div>
                      <div style={{ fontSize: '11px', color: '#646970' }}>Badge: <span style={{ color: '#2271b1', fontWeight: 600 }}>{p.badge}</span></div>
                    </div>
                  </td>
                  <td>{p.categoryName}</td>
                  <td>
                    {p.subCategory ? (
                      <span style={{ background: '#f0f6fc', color: '#0969da', padding: '3px 8px', borderRadius: '4px', fontSize: '12px', fontWeight: 600 }}>
                        {p.subCategory}
                      </span>
                    ) : (
                      <span style={{ color: '#8c8f94', fontSize: '12px', fontStyle: 'italic' }}>—</span>
                    )}
                  </td>
                  <td>
                    <span style={{ fontWeight: 700, color: '#008a20' }}>₹{p.price}</span>
                    <span style={{ fontSize: '11px', color: '#646970', textDecoration: 'line-through', marginLeft: '6px' }}>₹{p.originalPrice}</span>
                  </td>
                  <td>
                    {p.weights && p.weights.length > 0 ? (
                      <select
                        style={{ padding: '4px 6px', fontSize: '12px', border: '1px solid #8c8f94', borderRadius: '4px', background: '#fff' }}
                        value={selectedWeights[p.id] || p.weights[0]}
                        onChange={(e) => setSelectedWeights({ ...selectedWeights, [p.id]: e.target.value })}
                      >
                        {p.weights.map((w) => (
                          <option key={w} value={w}>{w}</option>
                        ))}
                      </select>
                    ) : (
                      'N/A'
                    )}
                  </td>
                  <td>
                    {(() => {
                      const curWeight = selectedWeights[p.id] || (p.weights && p.weights[0]) || '';
                      const weightData = curWeight && p.weightStock ? p.weightStock[curWeight] : undefined;
                      const countVal = weightData ? weightData.stockCount : (p.stockCount ?? 0);

                      return (
                        <input
                          type="number"
                          min="0"
                          style={{ width: '65px', padding: '4px 6px', textAlign: 'center', fontSize: '13px' }}
                          value={countVal}
                          onChange={(e) => {
                            const newCount = parseInt(e.target.value) || 0;
                            adminStore.updateProductStockCount(p.id, newCount, curWeight || undefined);
                          }}
                        />
                      );
                    })()}
                  </td>
                  <td>
                    {(() => {
                      const curWeight = selectedWeights[p.id] || (p.weights && p.weights[0]) || '';
                      const weightData = curWeight && p.weightStock ? p.weightStock[curWeight] : undefined;
                      const isWeightInStock = weightData ? weightData.stock : p.stock;

                      return (
                        <button
                          type="button"
                          style={{
                            padding: '4px 10px',
                            borderRadius: '3px',
                            fontSize: '12px',
                            fontWeight: 600,
                            border: 'none',
                            cursor: 'pointer',
                            background: isWeightInStock ? '#008a20' : '#d63638',
                            color: '#ffffff',
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '4px'
                          }}
                          onClick={() => adminStore.toggleProductStock(p.id, curWeight || undefined)}
                          title="Click to toggle Stock availability for selected size"
                        >
                          {isWeightInStock ? 'In Stock' : 'Out of Stock'}
                        </button>
                      );
                    })()}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '6px', justifyContent: 'flex-end' }}>
                      <button className="wp-button-secondary" style={{ padding: '4px 10px', fontSize: '12px' }} onClick={() => handleOpenEditModal(p)}>
                        <Edit2 size={13} /> Edit
                      </button>
                      <button
                        type="button"
                        style={{
                          background: '#008a20',
                          border: 'none',
                          color: '#ffffff',
                          padding: '4px 10px',
                          borderRadius: '3px',
                          cursor: 'pointer',
                          fontSize: '12px',
                          fontWeight: 600,
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '4px'
                        }}
                        onClick={() => handleSaveProduct(p)}
                        title="Save changes"
                      >
                        <Save size={13} /> Save
                      </button>
                      <button type="button" style={{ background: '#fcf0f1', border: '1px solid #d63638', color: '#d63638', padding: '4px 8px', borderRadius: '3px', cursor: 'pointer', fontSize: '12px' }} onClick={() => handleDeleteProduct(p.id, p.name)}>
                        <Trash2 size={13} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Comprehensive Add / Edit Product Form Modal */}
      {isModalOpen && editingProduct && (
        <div className="admin-modal-overlay" style={{ zIndex: 999999, position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, background: 'rgba(0, 0, 0, 0.65)', display: 'flex', alignItems: 'center', justifyContent: 'center', overflowY: 'auto', padding: '20px 10px' }}>
          <div className="admin-modal" style={{ maxWidth: '900px', width: '100%', maxHeight: '90vh', overflowY: 'auto', background: '#ffffff', color: '#1d2327', borderRadius: '8px', boxShadow: '0 10px 40px rgba(0,0,0,0.3)', border: '1px solid #c3c4c7' }}>
            <div className="admin-modal-header" style={{ position: 'sticky', top: 0, zIndex: 10, background: '#2271b1', color: '#ffffff', padding: '14px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTopLeftRadius: '7px', borderTopRightRadius: '7px' }}>
              <h3 style={{ margin: 0, color: '#ffffff', fontSize: '1.1rem', fontWeight: 600 }}>{editingProduct.id ? `Edit Product: "${editingProduct.name || ''}"` : 'Add New Product'}</h3>
              <button type="button" style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer', display: 'flex', alignItems: 'center' }} onClick={() => setIsModalOpen(false)}>
                <X size={22} />
              </button>
            </div>
            <form onSubmit={handleSaveModalProduct} className="admin-modal-body" style={{ padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px', background: '#f8fafc', color: '#1d2327', textAlign: 'left' }}>
              
              {/* SECTION 1: Basic Info */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 16px 0', color: '#1e293b', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>1. Basic Info</h4>
                <div className="admin-form-group" style={{ marginBottom: '14px', textAlign: 'left' }}>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', textAlign: 'left' }}>Product Name *</label>
                  <input
                    type="text"
                    required
                    className="admin-form-control"
                    placeholder="e.g. California Almonds"
                    value={editingProduct.name || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, name: e.target.value })}
                  />
                </div>

                <div className="admin-form-row" style={{ textAlign: 'left' }}>
                  <div className="admin-form-group" style={{ textAlign: 'left' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', textAlign: 'left' }}>Category *</label>
                    <select
                      className="admin-form-control"
                      value={editingProduct.category || 'dry-fruits'}
                      onChange={(e) => {
                        const foundCat = categories.find((c) => c.id === e.target.value);
                        setEditingProduct({
                          ...editingProduct,
                          category: e.target.value,
                          categoryName: foundCat ? foundCat.name : e.target.value
                        });
                      }}
                    >
                      {categories.map((c) => (
                        <option key={c.id} value={c.id}>{c.name}</option>
                      ))}
                    </select>
                  </div>

                  <div className="admin-form-group" style={{ textAlign: 'left' }}>
                    <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', textAlign: 'left' }}>Subcategory</label>
                    <select
                      className="admin-form-control"
                      value={editingProduct.subCategory || ''}
                      onChange={(e) => setEditingProduct({ ...editingProduct, subCategory: e.target.value })}
                    >
                      <option value="">None / Standard</option>
                      {(() => {
                        const selectedCatObj = categories.find((c) => c.id === (editingProduct.category || 'dry-fruits'));
                        const dynamicSubcats = selectedCatObj?.subcategories || ['Almonds', 'Cashew', 'Dried Apricot', 'Raisins', 'Walnut'];
                        return dynamicSubcats.map((sub) => (
                          <option key={sub} value={sub}>{sub}</option>
                        ));
                      })()}
                    </select>
                  </div>
                </div>

                <div className="admin-form-group" style={{ marginTop: '14px', textAlign: 'left' }}>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', textAlign: 'left' }}>Badge / Tag</label>
                  <input
                    type="text"
                    className="admin-form-control"
                    placeholder="e.g. Best Seller, Organic"
                    value={editingProduct.badge || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, badge: e.target.value })}
                  />
                </div>
              </div>

              {/* SECTION 2: Product Type */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 14px 0', color: '#1e293b', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>2. Product Type</h4>
                <div className="admin-form-group" style={{ textAlign: 'left' }}>
                  <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px', textAlign: 'left' }}>Product Grade / Tier (Optional)</label>
                  <select
                    className="admin-form-control"
                    value={(editingProduct.productTypes && editingProduct.productTypes[0]) || ''}
                    onChange={(e) => setEditingProduct({ ...editingProduct, productTypes: e.target.value ? [e.target.value] : [] })}
                  >
                    <option value="">None (Standard Product)</option>
                    {(adminStore.productTypes || ['Gold', 'Platinum', 'Diamond']).map((pt) => (
                      <option key={pt} value={pt}>{pt}</option>
                    ))}
                  </select>
                </div>
              </div>

              {/* SECTION 3: Multi-Weight / Size Inventory System */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ margin: 0, color: '#1e293b', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>3. Multi-Weight / Size Inventory System</h4>
                  <button
                    type="button"
                    className="wp-button-secondary"
                    style={{ fontSize: '12px', padding: '4px 12px', fontWeight: 600 }}
                    onClick={() => {
                      const currentWeights = editingProduct.weights || ['250g'];
                      const newWeights = [...currentWeights, '500g'];
                      setEditingProduct({ ...editingProduct, weights: newWeights });
                    }}
                  >
                    + Add Size Option
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(editingProduct.weights || ['250g']).map((w, idx) => {
                    const weightStockMap = editingProduct.weightStock || {};
                    const wData = weightStockMap[w] || { stock: true, stockCount: 10, price: editingProduct.price || 0 };
                    return (
                      <div key={idx} style={{ display: 'flex', gap: '10px', alignItems: 'center', background: '#f8fafc', padding: '12px', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'left' }}>
                        <div style={{ flex: 1, textAlign: 'left' }}>
                          <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Size Name</label>
                          <input
                            type="text"
                            className="admin-form-control"
                            value={w}
                            onChange={(e) => {
                              const newWeights = [...(editingProduct.weights || [])];
                              newWeights[idx] = e.target.value;
                              setEditingProduct({ ...editingProduct, weights: newWeights });
                            }}
                          />
                        </div>

                        <div style={{ flex: 1, textAlign: 'left' }}>
                          <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Price (₹)</label>
                          <input
                            type="number"
                            className="admin-form-control"
                            value={wData.price ?? (editingProduct.price || 0)}
                            onChange={(e) => {
                              const val = parseFloat(e.target.value) || 0;
                              const updatedMap = { ...weightStockMap, [w]: { ...wData, price: val } };
                              setEditingProduct({ ...editingProduct, weightStock: updatedMap, price: idx === 0 ? val : (editingProduct.price || val) });
                            }}
                          />
                        </div>

                        <div style={{ flex: 1, textAlign: 'left' }}>
                          <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Stock Qty</label>
                          <input
                            type="number"
                            className="admin-form-control"
                            value={wData.stockCount ?? 10}
                            onChange={(e) => {
                              const val = parseInt(e.target.value) || 0;
                              const updatedMap = { ...weightStockMap, [w]: { ...wData, stockCount: val, stock: val > 0 } };
                              setEditingProduct({ ...editingProduct, weightStock: updatedMap });
                            }}
                          />
                        </div>

                        <div style={{ flex: 1, textAlign: 'left' }}>
                          <label style={{ fontSize: '11px', color: '#475569', fontWeight: 600, display: 'block', marginBottom: '4px' }}>Stock Status</label>
                          <select
                            className="admin-form-control"
                            value={wData.stock ? 'in' : 'out'}
                            onChange={(e) => {
                              const isStk = e.target.value === 'in';
                              const updatedMap = { ...weightStockMap, [w]: { ...wData, stock: isStk } };
                              setEditingProduct({ ...editingProduct, weightStock: updatedMap });
                            }}
                          >
                            <option value="in">In Stock</option>
                            <option value="out">Out of Stock</option>
                          </select>
                        </div>

                        {(editingProduct.weights || []).length > 1 && (
                          <button
                            type="button"
                            style={{ background: '#fcf0f1', border: '1px solid #d63638', color: '#d63638', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer', marginTop: '16px' }}
                            onClick={() => {
                              const newWeights = (editingProduct.weights || []).filter((_, i) => i !== idx);
                              setEditingProduct({ ...editingProduct, weights: newWeights });
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

              {/* SECTION 4: Key Bullet Points */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ margin: 0, color: '#1e293b', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>4. Key Bullet Points</h4>
                  <button
                    type="button"
                    className="wp-button-secondary"
                    style={{ fontSize: '12px', padding: '4px 12px', fontWeight: 600 }}
                    onClick={() => {
                      const currentBullets = editingProduct.bullets || [];
                      setEditingProduct({ ...editingProduct, bullets: [...currentBullets, { title: 'Feature', text: 'Detail text' }] });
                    }}
                  >
                    + Add Bullet
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(editingProduct.bullets || [
                    { title: 'Premium Quality', text: 'Selected with high standard taste' },
                    { title: 'Naturally Nutritious', text: 'Rich source of protein & healthy fats' }
                  ]).map((b, bIdx) => (
                    <div key={bIdx} style={{ display: 'flex', gap: '8px', alignItems: 'center', textAlign: 'left' }}>
                      <input
                        type="text"
                        placeholder="Title (e.g. Origin)"
                        className="admin-form-control"
                        style={{ width: '30%' }}
                        value={b.title}
                        onChange={(e) => {
                          const newB = [...(editingProduct.bullets || [])];
                          newB[bIdx] = { ...newB[bIdx], title: e.target.value };
                          setEditingProduct({ ...editingProduct, bullets: newB });
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Bullet Text"
                        className="admin-form-control"
                        style={{ flex: 1 }}
                        value={b.text}
                        onChange={(e) => {
                          const newB = [...(editingProduct.bullets || [])];
                          newB[bIdx] = { ...newB[bIdx], text: e.target.value };
                          setEditingProduct({ ...editingProduct, bullets: newB });
                        }}
                      />
                      <button
                        type="button"
                        style={{ background: '#fcf0f1', border: '1px solid #d63638', color: '#d63638', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer' }}
                        onClick={() => {
                          const newB = (editingProduct.bullets || []).filter((_, i) => i !== bIdx);
                          setEditingProduct({ ...editingProduct, bullets: newB });
                        }}
                      >
                        <Trash2 size={14} />
                      </button>
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 5: Additional Information Tab Data */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 14px 0', color: '#1e293b', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>5. Additional Information Tab Data</h4>
                {(() => {
                  const defaultLabels = [
                    'Country of origin',
                    'Brand',
                    'Common name',
                    'Additive info',
                    'Product Dimensions',
                    'Manufacturer or packer name',
                    'Manufacturer or packer address',
                    'Ingredients',
                    'contact details consumer care'
                  ];
                  const currentTable = editingProduct.additionalInfoTable || defaultLabels.map(l => ({ label: l, value: '' }));

                  return (
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', background: '#f8fafc', padding: '14px', borderRadius: '8px', border: '1px solid #cbd5e1', textAlign: 'left' }}>
                      {defaultLabels.map((lbl, lIdx) => {
                        const existingEntry = currentTable.find(t => t.label.toLowerCase() === lbl.toLowerCase()) || { label: lbl, value: '' };
                        return (
                          <React.Fragment key={lIdx}>
                            <div style={{ background: '#ffffff', padding: '8px 12px', border: '1px solid #cbd5e1', borderRadius: '4px', fontWeight: 600, fontSize: '12px', color: '#334155', display: 'flex', alignItems: 'center', textAlign: 'left' }}>
                              {lbl}
                            </div>
                            <input
                              type="text"
                              className="admin-form-control"
                              placeholder={`Enter ${lbl}...`}
                              value={existingEntry.value || ''}
                              onChange={(e) => {
                                const newVal = e.target.value;
                                const updated = [...currentTable];
                                const matchIdx = updated.findIndex(t => t.label.toLowerCase() === lbl.toLowerCase());
                                if (matchIdx >= 0) {
                                  updated[matchIdx] = { label: lbl, value: newVal };
                                } else {
                                  updated.push({ label: lbl, value: newVal });
                                }
                                setEditingProduct({ ...editingProduct, additionalInfoTable: updated });
                              }}
                            />
                          </React.Fragment>
                        );
                      })}
                    </div>
                  );
                })()}

                <div className="admin-form-group" style={{ marginTop: '16px', textAlign: 'left', width: '100%' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '6px' }}>
                    <label style={{ fontWeight: 600, margin: 0, textAlign: 'left' }}>Written Description (Below Metadata Table)</label>
                    <span style={{ fontSize: '11px', color: '#64748b', background: '#e2e8f0', padding: '2px 8px', borderRadius: '4px', fontWeight: 600 }}>
                      Tip: Select text and press <strong>Ctrl+B</strong> to toggle bold formatting
                    </span>
                  </div>
                  <textarea
                    className="admin-form-control"
                    rows={6}
                    style={{ width: '100%', minWidth: '100%', boxSizing: 'border-box', background: '#ffffff', color: '#1d2327', border: '1px solid #cbd5e1', borderRadius: '6px', padding: '12px', fontSize: '13px', lineHeight: 1.5 }}
                    placeholder="Enter comprehensive paragraph description..."
                    value={editingProduct.paragraphs ? editingProduct.paragraphs.join('\n\n') : (editingProduct.description || '')}
                    onKeyDown={(e) => {
                      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === 'b') {
                        e.preventDefault();
                        const target = e.currentTarget;
                        const start = target.selectionStart;
                        const end = target.selectionEnd;
                        const text = target.value;
                        const selectedText = text.substring(start, end);

                        if (selectedText.length > 0) {
                          let newText = '';
                          if (selectedText.startsWith('**') && selectedText.endsWith('**') && selectedText.length >= 4) {
                            newText = text.substring(0, start) + selectedText.substring(2, selectedText.length - 2) + text.substring(end);
                          } else {
                            newText = text.substring(0, start) + `**${selectedText}**` + text.substring(end);
                          }
                          const paras = newText.split('\n\n');
                          setEditingProduct({ ...editingProduct, paragraphs: paras, description: newText, shortDesc: newText.substring(0, 80) });
                        }
                      }
                    }}
                    onChange={(e) => {
                      const paras = e.target.value.split('\n\n');
                      setEditingProduct({ ...editingProduct, paragraphs: paras, description: e.target.value, shortDesc: e.target.value.substring(0, 80) });
                    }}
                  />
                </div>
              </div>

              {/* SECTION 6: Description Tab Custom Table */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', textAlign: 'left' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
                  <h4 style={{ margin: 0, color: '#1e293b', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>6. Description Tab Custom Table</h4>
                  <button
                    type="button"
                    className="wp-button-secondary"
                    style={{ fontSize: '12px', padding: '4px 12px', fontWeight: 600 }}
                    onClick={() => {
                      const currentRows = editingProduct.customDescriptionRows || [{ size: (editingProduct.weights || ['250g'])[0], productType: (editingProduct.productTypes || ['Standard'])[0] }];
                      setEditingProduct({ ...editingProduct, customDescriptionRows: [...currentRows, { size: '500g', productType: 'Gold' }] });
                    }}
                  >
                    + Add Row
                  </button>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  {(editingProduct.customDescriptionRows || [
                    { size: (editingProduct.weights || ['250g'])[0] || '250g', productType: (editingProduct.productTypes || ['Standard'])[0] || 'Gold' }
                  ]).map((r, rIdx) => (
                    <div key={rIdx} style={{ display: 'flex', gap: '10px', alignItems: 'center', textAlign: 'left' }}>
                      <input
                        type="text"
                        placeholder="Size (Column 1)"
                        className="admin-form-control"
                        value={r.size || ''}
                        onChange={(e) => {
                          const newRows = [...(editingProduct.customDescriptionRows || [])];
                          newRows[rIdx] = { ...newRows[rIdx], size: e.target.value };
                          setEditingProduct({ ...editingProduct, customDescriptionRows: newRows });
                        }}
                      />
                      <input
                        type="text"
                        placeholder="Product Type (Column 2)"
                        className="admin-form-control"
                        value={r.productType || ''}
                        onChange={(e) => {
                          const newRows = [...(editingProduct.customDescriptionRows || [])];
                          newRows[rIdx] = { ...newRows[rIdx], productType: e.target.value };
                          setEditingProduct({ ...editingProduct, customDescriptionRows: newRows });
                        }}
                      />
                      {(editingProduct.customDescriptionRows || []).length > 1 && (
                        <button
                          type="button"
                          style={{ background: '#fcf0f1', border: '1px solid #d63638', color: '#d63638', padding: '6px 8px', borderRadius: '4px', cursor: 'pointer' }}
                          onClick={() => {
                            const newRows = (editingProduct.customDescriptionRows || []).filter((_, i) => i !== rIdx);
                            setEditingProduct({ ...editingProduct, customDescriptionRows: newRows });
                          }}
                        >
                          <Trash2 size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              {/* SECTION 7: Image Drag-and-Drop & Sequence Manager */}
              <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '20px', boxShadow: '0 2px 8px rgba(0, 0, 0, 0.04)', textAlign: 'left' }}>
                <h4 style={{ margin: '0 0 8px 0', color: '#1e293b', fontSize: '15px', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.5px' }}>7. Image Drag-and-Drop & Sequence Manager</h4>
                <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: '#64748b' }}>
                  Images will be rendered on the customer single product page in this exact sequence. Click on a container and press <strong>Ctrl+V</strong> to paste copied images, or drag & drop files directly!
                </p>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(130px, 1fr))', gap: '12px' }}>
                  {(editingProduct.gallery && editingProduct.gallery.length > 0 ? editingProduct.gallery : ['']).map((imgUrl, imgIdx) => (
                    <div
                      key={imgIdx}
                      tabIndex={0}
                      style={{
                        position: 'relative',
                        height: '130px',
                        border: '2px dashed #2271b1',
                        borderRadius: '8px',
                        overflow: 'hidden',
                        background: '#f8fafc',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        outline: 'none'
                      }}
                      onPaste={(e) => {
                        const items = e.clipboardData.items;
                        for (let i = 0; i < items.length; i++) {
                          if (items[i].type.indexOf('image') !== -1) {
                            const blob = items[i].getAsFile();
                            if (blob) {
                              const reader = new FileReader();
                              reader.onload = (event) => {
                                const base64 = event.target?.result as string;
                                const newGallery = [...(editingProduct.gallery || [editingProduct.image || ''])];
                                newGallery[imgIdx] = base64;
                                setEditingProduct({ ...editingProduct, gallery: newGallery, image: imgIdx === 0 ? base64 : editingProduct.image });
                              };
                              reader.readAsDataURL(blob);
                            }
                          }
                        }
                      }}
                      onDragOver={(e) => e.preventDefault()}
                      onDrop={(e) => {
                        e.preventDefault();
                        if (e.dataTransfer.files && e.dataTransfer.files[0]) {
                          const file = e.dataTransfer.files[0];
                          const reader = new FileReader();
                          reader.onload = (event) => {
                            const base64 = event.target?.result as string;
                            const newGallery = [...(editingProduct.gallery || [editingProduct.image || ''])];
                            newGallery[imgIdx] = base64;
                            setEditingProduct({ ...editingProduct, gallery: newGallery, image: imgIdx === 0 ? base64 : editingProduct.image });
                          };
                          reader.readAsDataURL(file);
                        }
                      }}
                    >
                      {imgUrl ? (
                        <>
                          <img src={imgUrl} alt={`Seq ${imgIdx + 1}`} style={{ width: '100%', height: '100%', objectFit: 'contain', padding: '4px' }} />
                          <span style={{ position: 'absolute', top: 4, left: 4, background: '#2271b1', color: '#fff', fontSize: '10px', fontWeight: 700, padding: '2px 6px', borderRadius: '3px' }}>
                            #{imgIdx + 1}
                          </span>
                          <button
                            type="button"
                            style={{ position: 'absolute', top: 4, right: 4, background: '#d63638', color: '#fff', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', zIndex: 10 }}
                            onClick={() => {
                              const newGallery = (editingProduct.gallery || []).filter((_, i) => i !== imgIdx);
                              setEditingProduct({ ...editingProduct, gallery: newGallery, image: newGallery[0] || '' });
                            }}
                          >
                            <X size={12} />
                          </button>
                        </>
                      ) : (
                        <div style={{ textAlign: 'center', padding: '8px', color: '#64748b', fontSize: '11px', width: '100%' }}>
                          <div>Paste Ctrl+V, Drag File</div>
                          <div style={{ margin: '6px 0', fontSize: '10px', color: '#94a3b8' }}>OR ENTER URL:</div>
                          <input
                            type="text"
                            placeholder="https://..."
                            style={{ width: '90%', padding: '4px', fontSize: '10px', border: '1px solid #cbd5e1', borderRadius: '3px' }}
                            onChange={(e) => {
                              const url = e.target.value;
                              const newGallery = [...(editingProduct.gallery || [editingProduct.image || ''])];
                              newGallery[imgIdx] = url;
                              setEditingProduct({ ...editingProduct, gallery: newGallery, image: imgIdx === 0 ? url : editingProduct.image });
                            }}
                          />
                        </div>
                      )}
                    </div>
                  ))}

                  {/* Add New Container Button */}
                  <div
                    onClick={() => {
                      const currentGallery = editingProduct.gallery || [editingProduct.image || ''];
                      setEditingProduct({ ...editingProduct, gallery: [...currentGallery, ''] });
                    }}
                    style={{
                      height: '130px',
                      border: '2px dashed #cbd5e1',
                      borderRadius: '8px',
                      background: '#ffffff',
                      display: 'flex',
                      flexDirection: 'column',
                      alignItems: 'center',
                      justifyContent: 'center',
                      cursor: 'pointer',
                      color: '#2271b1',
                      fontWeight: 600,
                      fontSize: '12px',
                      gap: '4px'
                    }}
                  >
                    <Plus size={24} />
                    <span>+ Add Container</span>
                  </div>
                </div>
              </div>

              {/* Form Action Buttons */}
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem', paddingTop: '15px', borderTop: '1px solid #cbd5e1' }}>
                <button type="button" className="wp-button-secondary" style={{ padding: '8px 18px', fontSize: '13px' }} onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button
                  type="submit"
                  style={{ background: '#008a20', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '8px 22px', fontWeight: 700, fontSize: '13px', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
                >
                  <Save size={15} /> Save Product
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Bulk Stock Edit Modal */}
      {isBulkModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '550px' }}>
            <div className="admin-modal-header">
              <h3>Bulk Inventory Stock Update</h3>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setIsBulkModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <div className="admin-modal-body">
              <div style={{ maxHeight: '350px', overflowY: 'auto', marginBottom: '1.5rem' }}>
                {products.map((p) => (
                  <div key={p.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.6rem 0', borderBottom: '1px solid var(--admin-border-color)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                      <img src={p.image} alt={p.name} style={{ width: '32px', height: '32px', borderRadius: '6px', objectFit: 'cover' }} />
                      <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>{p.name}</span>
                    </div>
                    <input
                      type="number"
                      className="admin-form-control"
                      style={{ width: '80px', textAlign: 'center' }}
                      value={bulkStockData[p.id] ?? 0}
                      onChange={(e) => setBulkStockData({ ...bulkStockData, [p.id]: parseInt(e.target.value) || 0 })}
                    />
                  </div>
                ))}
              </div>
              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem' }}>
                <button className="admin-btn admin-btn-secondary" onClick={() => setIsBulkModalOpen(false)}>
                  Cancel
                </button>
                <button className="admin-btn admin-btn-primary" onClick={handleSaveBulkStock}>
                  Save All Quantities
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
