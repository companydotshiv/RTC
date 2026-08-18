import React, { useState, useEffect } from 'react';
import { adminStore } from '../../data/adminStore';
import type { Category } from '../../types/product';
import { FolderPlus, Trash2, Plus, X, Award, Edit2, Check } from 'lucide-react';

export const CategoriesTagsPanel: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>(adminStore.categories);
  const [productTypes, setProductTypes] = useState<string[]>(adminStore.productTypes);

  // Modal & Form States
  const [isCategoryModalOpen, setIsCategoryModalOpen] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState('');

  // Inline Category Edit State (id -> { name, desc })
  const [editingCategoryId, setEditingCategoryId] = useState<string | null>(null);
  const [editCategoryName, setEditCategoryName] = useState('');
  const [editCategoryDesc, setEditCategoryDesc] = useState('');

  // Inline Subcategory Edit State (`${catId}_${subName}` -> newText)
  const [editingSubcatKey, setEditingSubcatKey] = useState<string | null>(null);
  const [editSubcatText, setEditSubcatText] = useState('');

  // New Subcategory Inline Input State per Category ID
  const [activeSubcatInputs, setActiveSubcatInputs] = useState<Record<string, string>>({});

  // New Product Type State
  const [newProductTypeName, setNewProductTypeName] = useState('');

  // Dynamic Subcategory Containers State in Create Modal
  const [modalSubcatList, setModalSubcatList] = useState<string[]>(['']);

  useEffect(() => {
    const unsubscribe = adminStore.subscribe(() => {
      setCategories([...adminStore.categories]);
      setProductTypes([...adminStore.productTypes]);
    });
    return () => unsubscribe();
  }, []);

  const handleAddCategory = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCategoryName.trim()) return;

    const subArr = modalSubcatList
      .map((s) => s.trim())
      .filter(Boolean);

    adminStore.addCategory({
      name: newCategoryName.trim(),
      desc: '',
      icon: '',
      subcategories: subArr
    });

    setNewCategoryName('');
    setModalSubcatList(['']);
    setIsCategoryModalOpen(false);
  };

  const handleStartEditCategory = (c: Category) => {
    setEditingCategoryId(c.id);
    setEditCategoryName(c.name);
    setEditCategoryDesc(c.desc);
  };

  const handleSaveEditCategory = (id: string) => {
    if (editCategoryName.trim()) {
      adminStore.updateCategory(id, { name: editCategoryName.trim(), desc: editCategoryDesc.trim() });
    }
    setEditingCategoryId(null);
  };

  const handleDeleteCategory = (id: string) => {
    adminStore.deleteCategory(id);
  };

  const handleStartEditSubcategory = (catId: string, subName: string) => {
    setEditingSubcatKey(`${catId}_${subName}`);
    setEditSubcatText(subName);
  };

  const handleSaveEditSubcategory = (catId: string, oldSubName: string) => {
    if (editSubcatText.trim() && editSubcatText.trim() !== oldSubName) {
      adminStore.updateSubcategory(catId, oldSubName, editSubcatText.trim());
    }
    setEditingSubcatKey(null);
  };

  const handleAddSubcategory = (categoryId: string) => {
    const val = activeSubcatInputs[categoryId] || '';
    if (!val.trim()) return;
    adminStore.addSubcategory(categoryId, val.trim());
    setActiveSubcatInputs({ ...activeSubcatInputs, [categoryId]: '' });
  };

  const handleDeleteSubcategory = (categoryId: string, subName: string) => {
    adminStore.deleteSubcategory(categoryId, subName);
  };

  const handleAddProductType = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newProductTypeName.trim()) return;
    adminStore.addProductType(newProductTypeName.trim());
    setNewProductTypeName('');
  };

  const handleDeleteProductType = (typeName: string) => {
    adminStore.deleteProductType(typeName);
  };

  return (
    <div className="categories-tags-panel" style={{ textAlign: 'left' }}>
      
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '20px', fontWeight: 700, color: '#1e293b' }}>Categories & Product Types Management</h2>
          <p style={{ margin: '4px 0 0 0', fontSize: '13px', color: '#64748b' }}>
            Manage category structures, subcategories, and product tier grades dynamically synced across the Admin panel & Storefront.
          </p>
        </div>
        <button
          className="admin-btn admin-btn-primary"
          style={{ background: '#2271b1', color: '#ffffff', fontWeight: 600, padding: '9px 18px', borderRadius: '6px', border: 'none', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          onClick={() => setIsCategoryModalOpen(true)}
        >
          <Plus size={16} /> Add Category
        </button>
      </div>

      {/* TWO COLUMN GRID LAYOUT */}
      <div style={{ display: 'grid', gridTemplateColumns: '7fr 5fr', gap: '24px', alignItems: 'start' }}>
        
        {/* LEFT COLUMN: Categories & Subcategories List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <FolderPlus size={18} color="#2271b1" /> Categories & Subcategories
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {categories.map((c) => {
                const subList = c.subcategories || [];
                const isEditingThisCat = editingCategoryId === c.id;

                return (
                  <div
                    key={c.id}
                    style={{
                      background: '#f8fafc',
                      border: '1px solid #cbd5e1',
                      borderRadius: '8px',
                      padding: '16px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '12px'
                    }}
                  >
                    {/* Category Header */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                      {isEditingThisCat ? (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '6px', flex: 1, marginRight: '12px' }}>
                          <input
                            type="text"
                            className="admin-form-control"
                            value={editCategoryName}
                            onChange={(e) => setEditCategoryName(e.target.value)}
                            style={{ fontSize: '14px', padding: '4px 8px', fontWeight: 600 }}
                          />
                          <input
                            type="text"
                            className="admin-form-control"
                            value={editCategoryDesc}
                            onChange={(e) => setEditCategoryDesc(e.target.value)}
                            style={{ fontSize: '12px', padding: '4px 8px' }}
                          />
                        </div>
                      ) : (
                        <div>
                          <h4 style={{ margin: 0, fontSize: '15px', fontWeight: 700, color: '#1e293b' }}>{c.name}</h4>
                          <span style={{ fontSize: '12px', color: '#64748b', display: 'block', marginTop: '2px' }}>{c.desc}</span>
                        </div>
                      )}

                      <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                        {isEditingThisCat ? (
                          <button
                            style={{ background: '#008a20', border: 'none', color: '#ffffff', borderRadius: '4px', padding: '5px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            onClick={() => handleSaveEditCategory(c.id)}
                            title="Save Category Changes"
                          >
                            <Check size={14} />
                          </button>
                        ) : (
                          <button
                            style={{ background: '#f1f5f9', border: '1px solid #cbd5e1', color: '#334155', borderRadius: '4px', padding: '5px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                            onClick={() => handleStartEditCategory(c)}
                            title="Edit Category"
                          >
                            <Edit2 size={14} />
                          </button>
                        )}
                        <button
                          style={{ background: '#fcf0f1', border: '1px solid #d63638', color: '#d63638', borderRadius: '4px', padding: '5px 8px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                          onClick={() => handleDeleteCategory(c.id)}
                          title="Delete Category"
                        >
                          <Trash2 size={14} />
                        </button>
                      </div>
                    </div>

                    {/* Subcategories Container */}
                    <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '6px', padding: '12px' }}>
                      <div style={{ fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        Subcategories ({subList.length})
                      </div>

                      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '8px', marginBottom: '10px' }}>
                        {subList.length > 0 ? (
                          subList.map((sub) => {
                            const subKey = `${c.id}_${sub}`;
                            const isEditingThisSub = editingSubcatKey === subKey;

                            if (isEditingThisSub) {
                              return (
                                <div key={sub} style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                                  <input
                                    type="text"
                                    className="admin-form-control"
                                    value={editSubcatText}
                                    onChange={(e) => setEditSubcatText(e.target.value)}
                                    style={{ fontSize: '12px', padding: '4px 8px', width: '120px' }}
                                    onKeyDown={(e) => {
                                      if (e.key === 'Enter') handleSaveEditSubcategory(c.id, sub);
                                    }}
                                  />
                                  <button
                                    style={{ background: '#008a20', color: '#fff', border: 'none', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}
                                    onClick={() => handleSaveEditSubcategory(c.id, sub)}
                                  >
                                    <Check size={14} />
                                  </button>
                                </div>
                              );
                            }

                            return (
                              <span
                                key={sub}
                                style={{
                                  background: '#eff6ff',
                                  color: '#1e40af',
                                  border: '1px solid #bfdbfe',
                                  fontSize: '12px',
                                  fontWeight: 600,
                                  padding: '4px 10px',
                                  borderRadius: '16px',
                                  display: 'inline-flex',
                                  alignItems: 'center',
                                  gap: '8px'
                                }}
                              >
                                <span>{sub}</span>
                                <div style={{ display: 'inline-flex', gap: '6px', alignItems: 'center' }}>
                                  <button
                                    style={{ background: 'none', border: 'none', color: '#3b82f6', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                                    onClick={() => handleStartEditSubcategory(c.id, sub)}
                                    title="Edit subcategory name"
                                  >
                                    <Edit2 size={12} />
                                  </button>
                                  <button
                                    style={{ background: 'none', border: 'none', color: '#1e40af', cursor: 'pointer', padding: 0, display: 'flex', alignItems: 'center' }}
                                    onClick={() => handleDeleteSubcategory(c.id, sub)}
                                    title="Remove subcategory"
                                  >
                                    <X size={13} color="#1e40af" />
                                  </button>
                                </div>
                              </span>
                            );
                          })
                        ) : (
                          <span style={{ fontSize: '12px', color: '#94a3b8' }}>No subcategories added yet</span>
                        )}
                      </div>

                      {/* Inline Add Subcategory Input */}
                      <div style={{ display: 'flex', gap: '8px' }}>
                        <input
                          type="text"
                          className="admin-form-control"
                          placeholder="Add new subcategory..."
                          style={{ fontSize: '12px', padding: '6px 10px', background: '#ffffff', color: '#1d2327', border: '1px solid #cbd5e1', borderRadius: '4px', flex: 1 }}
                          value={activeSubcatInputs[c.id] || ''}
                          onChange={(e) => setActiveSubcatInputs({ ...activeSubcatInputs, [c.id]: e.target.value })}
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              e.preventDefault();
                              handleAddSubcategory(c.id);
                            }
                          }}
                        />
                        <button
                          type="button"
                          style={{ background: '#2271b1', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '6px 12px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '4px' }}
                          onClick={() => handleAddSubcategory(c.id)}
                        >
                          <Plus size={14} /> Add
                        </button>
                      </div>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN: Product Types Manager */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
          <div style={{ background: '#ffffff', border: '1px solid #e2e8f0', borderRadius: '10px', padding: '18px', boxShadow: '0 2px 8px rgba(0,0,0,0.04)' }}>
            <h3 style={{ margin: '0 0 14px 0', fontSize: '16px', fontWeight: 700, color: '#0f172a', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Award size={18} color="#059669" /> Product Types (Grades & Tiers)
            </h3>
            <p style={{ margin: '0 0 14px 0', fontSize: '12px', color: '#64748b' }}>
              Product types allow classifying products by quality tier (e.g., Gold, Platinum, Diamond) visible in filters & descriptions.
            </p>

            {/* Add Product Type Form */}
            <form onSubmit={handleAddProductType} style={{ display: 'flex', gap: '8px', marginBottom: '16px' }}>
              <input
                type="text"
                className="admin-form-control"
                placeholder="Enter Product Type (e.g., Silver, Premium)..."
                style={{ fontSize: '12px', padding: '8px 12px', background: '#ffffff', color: '#1d2327', border: '1px solid #cbd5e1', borderRadius: '6px', flex: 1 }}
                value={newProductTypeName}
                onChange={(e) => setNewProductTypeName(e.target.value)}
              />
              <button
                type="submit"
                style={{ background: '#059669', color: '#ffffff', border: 'none', borderRadius: '6px', padding: '8px 16px', fontSize: '12px', fontWeight: 700, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
              >
                <Plus size={14} /> Add Type
              </button>
            </form>

            {/* List of Active Product Types */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
              {productTypes.map((pt) => (
                <div
                  key={pt}
                  style={{
                    background: '#f8fafc',
                    border: '1px solid #e2e8f0',
                    borderRadius: '6px',
                    padding: '10px 14px',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <span style={{ background: '#d1fae5', color: '#047857', padding: '4px 8px', borderRadius: '4px', fontSize: '11px', fontWeight: 700 }}>
                      GRADE
                    </span>
                    <span style={{ fontSize: '14px', fontWeight: 600, color: '#1e293b' }}>{pt}</span>
                  </div>

                  <button
                    style={{ background: '#fcf0f1', border: '1px solid #d63638', color: '#d63638', borderRadius: '4px', padding: '4px 8px', cursor: 'pointer' }}
                    onClick={() => handleDeleteProductType(pt)}
                    title="Delete Product Type"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </div>

      </div>

      {/* CREATE CATEGORY MODAL */}
      {isCategoryModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '480px', background: '#ffffff', borderRadius: '10px', overflow: 'hidden' }}>
            <div className="admin-modal-header" style={{ background: '#2271b1', color: '#ffffff', padding: '14px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '16px', fontWeight: 700 }}>Create New Product Category</h3>
              <button style={{ background: 'none', border: 'none', color: '#ffffff', cursor: 'pointer' }} onClick={() => setIsCategoryModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleAddCategory} className="admin-modal-body" style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '16px', background: '#ffffff', color: '#1d2327' }}>
              <div className="admin-form-group">
                <label style={{ fontWeight: 600, display: 'block', marginBottom: '6px' }}>Category Name *</label>
                <input
                  type="text"
                  required
                  className="admin-form-control"
                  placeholder="e.g. Organic Seeds"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  style={{ background: '#ffffff', color: '#1d2327', border: '1px solid #cbd5e1', padding: '8px 12px' }}
                />
              </div>

              {/* DYNAMIC SUBCATEGORY CONTAINERS IN MODAL */}
              <div className="admin-form-group">
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                  <label style={{ fontWeight: 600, margin: 0 }}>Subcategories</label>
                  <button
                    type="button"
                    style={{ background: '#eff6ff', color: '#2271b1', border: '1px solid #bfdbfe', borderRadius: '4px', padding: '4px 10px', fontSize: '12px', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                    onClick={() => setModalSubcatList([...modalSubcatList, ''])}
                  >
                    <Plus size={14} /> Add Subcategory Container
                  </button>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {modalSubcatList.map((subVal, idx) => (
                    <div key={idx} style={{ display: 'flex', gap: '8px', alignItems: 'center' }}>
                      <input
                        type="text"
                        className="admin-form-control"
                        placeholder="Enter subcategory name..."
                        value={subVal}
                        onChange={(e) => {
                          const updated = [...modalSubcatList];
                          updated[idx] = e.target.value;
                          setModalSubcatList(updated);
                        }}
                        style={{ background: '#ffffff', color: '#1d2327', border: '1px solid #cbd5e1', padding: '6px 10px', flex: 1, fontSize: '13px' }}
                      />
                      <button
                        type="button"
                        style={{ background: '#2271b1', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '6px 10px', cursor: 'pointer', display: 'flex', alignItems: 'center' }}
                        onClick={() => {
                          const updated = [...modalSubcatList];
                          updated.splice(idx + 1, 0, '');
                          setModalSubcatList(updated);
                        }}
                        title="Add another subcategory container below"
                      >
                        <Plus size={14} />
                      </button>
                      {modalSubcatList.length > 1 && (
                        <button
                          type="button"
                          style={{ background: '#fcf0f1', border: '1px solid #d63638', color: '#d63638', borderRadius: '4px', padding: '6px 8px', cursor: 'pointer' }}
                          onClick={() => {
                            setModalSubcatList(modalSubcatList.filter((_, i) => i !== idx));
                          }}
                        >
                          <X size={14} />
                        </button>
                      )}
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '10px' }}>
                <button type="button" className="wp-button-secondary" onClick={() => setIsCategoryModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" style={{ background: '#2271b1', color: '#ffffff', border: 'none', borderRadius: '4px', padding: '8px 20px', fontWeight: 600, cursor: 'pointer' }}>
                  Save Category
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
