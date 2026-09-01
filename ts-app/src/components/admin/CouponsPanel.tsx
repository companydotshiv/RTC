import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AdminCoupon } from '../../data/adminStore';
import { Plus, Search, Edit2, Trash2, Check, AlertCircle, ArrowLeft } from 'lucide-react';

export const CouponsPanel: React.FC = () => {
  const [currentView, setCurrentView] = useState<'list' | 'editor'>('list');
  const [editingCoupon, setEditingCoupon] = useState<Partial<AdminCoupon> | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [couponTab, setCouponTab] = useState<'general' | 'usage_restriction' | 'usage_limits'>('general');
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const coupons = adminStore.coupons;

  const filteredCoupons = coupons.filter((c) => {
    return (
      c.code.toLowerCase().includes(searchTerm.toLowerCase()) ||
      c.description.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const handleOpenAdd = () => {
    setEditingCoupon({
      code: '',
      type: 'flat_pct',
      value: 20,
      capAmount: 200,
      minOrderValue: 499,
      description: 'Special seasonal discount coupon',
      expiryDate: '2026-12-31',
      isActive: true
    });
    setCouponTab('general');
    setCurrentView('editor');
  };

  const handleOpenEdit = (c: AdminCoupon) => {
    setEditingCoupon(c);
    setCouponTab('general');
    setCurrentView('editor');
  };

  const handleSaveCoupon = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!editingCoupon || !editingCoupon.code) {
      alert('Please enter a coupon code.');
      return;
    }

    const couponToSave: Partial<AdminCoupon> = {
      ...editingCoupon,
      code: editingCoupon.code.toUpperCase().trim()
    };

    adminStore.addOrUpdateCoupon(couponToSave);
    setSaveStatus({ type: 'success', message: 'Coupon saved successfully.' });
    setTimeout(() => setSaveStatus(null), 3000);

    setCurrentView('list');
    setEditingCoupon(null);
  };

  const handleDeleteCoupon = (id: string, code: string) => {
    if (window.confirm(`Are you sure you want to move coupon "${code}" to trash?`)) {
      adminStore.deleteCoupon(id);
      if (editingCoupon?.id === id) {
        setCurrentView('list');
        setEditingCoupon(null);
      }
    }
  };

  const handleToggleCoupon = (id: string) => {
    adminStore.toggleCouponStatus(id);
  };

  const renderTypeLabel = (c: AdminCoupon) => {
    switch (c.type) {
      case 'flat_pct':
        return `Percentage discount (${c.value}%)`;
      case 'pct_capped':
        return `${c.value}% discount (capped at ₹${c.capAmount || 100})`;
      case 'flat_amount':
        return `Fixed cart discount (₹${c.value})`;
      case 'bogo':
      case 'b1g1':
        return `Buy 1 Get 1 (BOGO)`;
      case 'b2g1':
        return `Buy 2 Get 1 (B2G1)`;
      default:
        return 'Discount Offer';
    }
  };

  return (
    <div className="coupons-panel" style={{ textAlign: 'left' }}>
      
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
      {/* 1. COUPONS LIST VIEW (Classic WordPress Table) */}
      {/* ========================================================================= */}
      {currentView === 'list' && (
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
            <h1 className="wp-page-title" style={{ margin: 0 }}>Coupons</h1>
            <button className="wp-button-secondary" onClick={handleOpenAdd} style={{ fontWeight: 600 }}>
              Add Coupon
            </button>
          </div>

          {/* Search Toolbar */}
          <div style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '12px', gap: '6px' }}>
            <input
              type="search"
              placeholder="Search coupons..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ padding: '5px 10px', fontSize: '13px', width: '220px' }}
            />
            <button className="wp-button-secondary" style={{ padding: '5px 10px', fontSize: '13px' }}>
              Search Coupons
            </button>
          </div>

          {/* WP Post Table */}
          <div className="wp-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #c3c4c7' }}>
            <div style={{ overflowX: 'auto' }}>
              <table className="wp-list-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Coupon type</th>
                    <th>Coupon amount</th>
                    <th>Description</th>
                    <th>Usage / Limit</th>
                    <th>Expiry date</th>
                    <th style={{ width: '80px' }}>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredCoupons.map((c) => (
                    <tr key={c.id}>
                      {/* Code with Row Actions */}
                      <td>
                        <span
                          className="wp-post-title-link"
                          onClick={() => handleOpenEdit(c)}
                          style={{ fontFamily: 'monospace', fontSize: '13px', fontWeight: 700 }}
                        >
                          {c.code}
                        </span>
                        <div className="row-actions">
                          <span style={{ color: '#2271b1', cursor: 'pointer' }} onClick={() => handleOpenEdit(c)}>Edit</span>
                          <span style={{ color: '#ddd' }}>|</span>
                          <span style={{ color: '#a00', cursor: 'pointer' }} onClick={() => handleDeleteCoupon(c.id, c.code)}>Trash</span>
                          <span style={{ color: '#ddd' }}>|</span>
                          <span style={{ color: '#555', cursor: 'pointer' }} onClick={() => handleToggleCoupon(c.id)}>
                            {c.isActive ? 'Deactivate' : 'Activate'}
                          </span>
                        </div>
                      </td>

                      {/* Type */}
                      <td style={{ fontSize: '13px', color: '#1d2327' }}>
                        {renderTypeLabel(c)}
                      </td>

                      {/* Amount */}
                      <td style={{ fontWeight: 600, color: '#1d2327' }}>
                        {c.type === 'flat_pct' || c.type === 'pct_capped' ? `${c.value}%` : `₹${c.value}`}
                      </td>

                      {/* Description */}
                      <td style={{ fontSize: '12px', color: '#50575e' }}>
                        {c.description || '—'}
                      </td>

                      {/* Usage */}
                      <td style={{ fontSize: '12px', color: '#50575e' }}>
                        {c.usedCount || 0} / ∞
                      </td>

                      {/* Expiry */}
                      <td style={{ fontSize: '12px', color: '#64748b' }}>
                        {c.expiryDate || 'No expiry'}
                      </td>

                      {/* Status */}
                      <td>
                        {c.isActive ? (
                          <span style={{ color: '#008a20', fontWeight: 600, fontSize: '12px' }}>Active</span>
                        ) : (
                          <span style={{ color: '#d63638', fontWeight: 600, fontSize: '12px' }}>Disabled</span>
                        )}
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
      {/* 2. COUPON EDITOR (Add New Coupon / Edit Coupon) */}
      {/* ========================================================================= */}
      {currentView === 'editor' && editingCoupon && (
        <form onSubmit={handleSaveCoupon}>
          
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <button
                type="button"
                className="wp-button-secondary"
                onClick={() => setCurrentView('list')}
                style={{ display: 'inline-flex', alignItems: 'center', gap: '6px' }}
              >
                <ArrowLeft size={14} /> Back to Coupons
              </button>
              <h1 className="wp-page-title" style={{ margin: 0 }}>
                {editingCoupon.id ? `Edit coupon` : 'Add new coupon'}
              </h1>
            </div>

            <div style={{ display: 'flex', gap: '8px' }}>
              {editingCoupon.id && (
                <button
                  type="button"
                  style={{ background: '#fcf0f1', border: '1px solid #d63638', color: '#d63638', padding: '5px 12px', borderRadius: '3px', cursor: 'pointer', fontSize: '13px', fontWeight: 600 }}
                  onClick={() => handleDeleteCoupon(editingCoupon.id as string, editingCoupon.code || '')}
                >
                  Move to Trash
                </button>
              )}
              <button type="submit" className="wp-button-primary" style={{ padding: '6px 16px', fontWeight: 700 }}>
                {editingCoupon.id ? 'Update Coupon' : 'Publish Coupon'}
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 280px', gap: '20px', alignItems: 'start' }}>
            
            {/* Left Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Coupon Code Input */}
              <div style={{ background: '#fff', border: '1px solid #c3c4c7', padding: '12px 14px', borderRadius: '3px' }}>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, color: '#50575e', marginBottom: '4px' }}>Coupon code</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. FESTIVE20, BOGO50"
                  value={editingCoupon.code || ''}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value.toUpperCase() })}
                  style={{
                    width: '100%',
                    padding: '8px 10px',
                    fontSize: '18px',
                    fontWeight: 700,
                    fontFamily: 'monospace',
                    letterSpacing: '1px',
                    border: '1px solid #8c8f94',
                    borderRadius: '2px',
                    boxSizing: 'border-box'
                  }}
                />
              </div>

              {/* Description Box */}
              <div className="wp-card" style={{ padding: 0 }}>
                <div className="wp-card-header" style={{ padding: '10px 14px', margin: 0, background: '#f6f7f7', fontWeight: 600, fontSize: '13px' }}>
                  Description (optional)
                </div>
                <div style={{ padding: '12px' }}>
                  <textarea
                    rows={2}
                    value={editingCoupon.description || ''}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, description: e.target.value })}
                    placeholder="Description / promotional note for internal reference..."
                    style={{ width: '100%', minWidth: '100%', boxSizing: 'border-box', padding: '8px 10px', fontSize: '13px' }}
                  />
                </div>
              </div>

              {/* Coupon Data Metabox */}
              <div style={{ background: '#fff', border: '1px solid #c3c4c7', borderRadius: '3px', overflow: 'hidden' }}>
                <div style={{ background: '#f6f7f7', borderBottom: '1px solid #c3c4c7', padding: '10px 14px', fontWeight: 700, fontSize: '13px', color: '#1d2327' }}>
                  Coupon data
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '160px 1fr', minHeight: '260px' }}>
                  {/* Tabs Bar */}
                  <div style={{ background: '#f0f0f1', borderRight: '1px solid #c3c4c7', display: 'flex', flexDirection: 'column' }}>
                    {[
                      { id: 'general', label: '⚙️ General' },
                      { id: 'usage_restriction', label: '🔒 Usage restriction' },
                      { id: 'usage_limits', label: '📊 Usage limits' }
                    ].map((tab) => (
                      <button
                        key={tab.id}
                        type="button"
                        onClick={() => setCouponTab(tab.id as any)}
                        style={{
                          padding: '10px 12px',
                          border: 'none',
                          borderBottom: '1px solid #e0e0e1',
                          background: couponTab === tab.id ? '#ffffff' : 'transparent',
                          color: couponTab === tab.id ? '#2271b1' : '#50575e',
                          fontWeight: couponTab === tab.id ? 700 : 500,
                          fontSize: '12px',
                          textAlign: 'left',
                          cursor: 'pointer',
                          borderLeft: couponTab === tab.id ? '3px solid #2271b1' : '3px solid transparent'
                        }}
                      >
                        {tab.label}
                      </button>
                    ))}
                  </div>

                  {/* Tab Panel */}
                  <div style={{ padding: '20px' }}>
                    {couponTab === 'general' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', gap: '12px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>Discount type:</label>
                          <select
                            value={editingCoupon.type || 'flat_pct'}
                            onChange={(e) => setEditingCoupon({ ...editingCoupon, type: e.target.value as any })}
                            style={{ width: '240px' }}
                          >
                            <option value="flat_pct">Percentage discount (%)</option>
                            <option value="pct_capped">Percentage with Max Cap (₹)</option>
                            <option value="flat_amount">Fixed cart discount (₹)</option>
                            <option value="bogo">Buy 1 Get 1 Free (BOGO)</option>
                            <option value="b2g1">Buy 2 Get 1 Free (B2G1)</option>
                          </select>
                        </div>

                        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', gap: '12px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>Coupon amount:</label>
                          <input
                            type="number"
                            required
                            value={editingCoupon.value || ''}
                            onChange={(e) => setEditingCoupon({ ...editingCoupon, value: parseFloat(e.target.value) || 0 })}
                            style={{ width: '160px' }}
                          />
                        </div>

                        {editingCoupon.type === 'pct_capped' && (
                          <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', gap: '12px' }}>
                            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>Max cap amount (₹):</label>
                            <input
                              type="number"
                              value={editingCoupon.capAmount || ''}
                              onChange={(e) => setEditingCoupon({ ...editingCoupon, capAmount: parseFloat(e.target.value) || 0 })}
                              style={{ width: '160px' }}
                            />
                          </div>
                        )}

                        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', gap: '12px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>Coupon expiry date:</label>
                          <input
                            type="date"
                            value={editingCoupon.expiryDate || ''}
                            onChange={(e) => setEditingCoupon({ ...editingCoupon, expiryDate: e.target.value })}
                            style={{ width: '180px' }}
                          />
                        </div>
                      </div>
                    )}

                    {couponTab === 'usage_restriction' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', gap: '12px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>Minimum spend (₹):</label>
                          <input
                            type="number"
                            value={editingCoupon.minOrderValue || ''}
                            onChange={(e) => setEditingCoupon({ ...editingCoupon, minOrderValue: parseFloat(e.target.value) || 0 })}
                            style={{ width: '160px' }}
                          />
                        </div>
                      </div>
                    )}

                    {couponTab === 'usage_limits' && (
                      <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                        <div style={{ display: 'grid', gridTemplateColumns: '150px 1fr', alignItems: 'center', gap: '12px' }}>
                          <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>Times used:</label>
                          <span style={{ fontSize: '13px', fontWeight: 600 }}>{editingCoupon.usedCount || 0} orders</span>
                        </div>
                      </div>
                    )}
                  </div>
                </div>
              </div>

            </div>

            {/* Right Sidebar Column */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
              
              {/* Publish Box */}
              <div className="wp-card" style={{ padding: 0 }}>
                <div className="wp-card-header" style={{ padding: '10px 14px', margin: 0, background: '#f6f7f7', fontWeight: 600, fontSize: '13px' }}>
                  Publish
                </div>
                <div style={{ padding: '14px', display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '13px', color: '#50575e' }}>
                  <div>Status: <strong style={{ color: '#1d2327' }}>{editingCoupon.isActive ? 'Active' : 'Disabled'}</strong></div>
                  <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer' }}>
                    <input
                      type="checkbox"
                      checked={editingCoupon.isActive ?? true}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, isActive: e.target.checked })}
                    />
                    <span>Coupon is active on checkout</span>
                  </label>
                </div>
                <div style={{ padding: '10px 14px', background: '#f6f7f7', borderTop: '1px solid #c3c4c7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  {editingCoupon.id ? (
                    <span
                      style={{ color: '#a00', textDecoration: 'underline', fontSize: '12px', cursor: 'pointer' }}
                      onClick={() => handleDeleteCoupon(editingCoupon.id as string, editingCoupon.code || '')}
                    >
                      Move to Trash
                    </span>
                  ) : <div />}
                  <button type="submit" className="wp-button-primary" style={{ fontWeight: 700 }}>
                    {editingCoupon.id ? 'Update' : 'Publish'}
                  </button>
                </div>
              </div>

            </div>

          </div>

        </form>
      )}

    </div>
  );
};
