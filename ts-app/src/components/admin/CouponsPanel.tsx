import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AdminCoupon } from '../../data/adminStore';
import { Ticket, Plus, Power, Edit2, Trash2, X } from 'lucide-react';

export const CouponsPanel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingCoupon, setEditingCoupon] = useState<Partial<AdminCoupon> | null>(null);

  const coupons = adminStore.coupons;

  const handleOpenAddModal = () => {
    setEditingCoupon({
      code: '',
      type: 'flat_pct',
      value: 20,
      minOrderValue: 499,
      description: 'Flat discount coupon',
      expiryDate: '2026-12-31'
    });
    setIsModalOpen(true);
  };

  const handleOpenEditModal = (c: AdminCoupon) => {
    setEditingCoupon(c);
    setIsModalOpen(true);
  };

  const handleSaveCoupon = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingCoupon || !editingCoupon.code) return;
    adminStore.addOrUpdateCoupon(editingCoupon);
    setIsModalOpen(false);
    setEditingCoupon(null);
  };

  const handleToggleCoupon = (id: string) => {
    adminStore.toggleCouponStatus(id);
  };

  const handleDeleteCoupon = (id: string, code: string) => {
    if (window.confirm(`Are you sure you want to delete coupon "${code}"?`)) {
      adminStore.deleteCoupon(id);
    }
  };

  const renderTypeLabel = (c: AdminCoupon) => {
    switch (c.type) {
      case 'flat_pct':
        return `Flat ${c.value}% OFF`;
      case 'pct_capped':
        return `${c.value}% OFF (Up to ₹${c.capAmount || 100})`;
      case 'flat_amount':
        return `Flat ₹${c.value} OFF`;
      case 'bogo':
      case 'b1g1':
        return `Buy 1 Get 1 Free (BOGO)`;
      case 'b2g1':
        return `Buy 2 Get 1 Free (B2G1)`;
      case 'b2g2':
        return `Buy 2 Get 2 Free (B2G2)`;
      default:
        return 'Discount Offer';
    }
  };

  return (
    <div className="coupons-panel">
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem' }}>Discount & Promo Coupons</h2>
          <p style={{ margin: '4px 0 0 0', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
            Manage promo codes, percentages, cap amounts, and BOGO bundle deals
          </p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={handleOpenAddModal}>
          <Plus size={16} /> Create Coupon
        </button>
      </div>

      {/* Coupon List Table */}
      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Coupon Code</th>
                <th>Offer Type / Value</th>
                <th>Min. Order Value</th>
                <th>Used Count</th>
                <th>Expiry Date</th>
                <th>Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {coupons.map((c) => (
                <tr key={c.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <Ticket size={18} color="#38bdf8" />
                      <div>
                        <div style={{ fontWeight: 700, letterSpacing: '0.05em', color: '#38bdf8' }}>{c.code}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{c.description}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span className="status-pill info">{renderTypeLabel(c)}</span>
                  </td>
                  <td style={{ fontWeight: 600 }}>₹{c.minOrderValue}</td>
                  <td>{c.usedCount} times</td>
                  <td>{c.expiryDate}</td>
                  <td>
                    <button
                      className={`status-pill ${c.isActive ? 'success' : 'danger'}`}
                      style={{ border: 'none', cursor: 'pointer' }}
                      onClick={() => handleToggleCoupon(c.id)}
                    >
                      <Power size={12} /> {c.isActive ? 'Active' : 'Inactive'}
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => handleOpenEditModal(c)}>
                        <Edit2 size={14} /> Edit
                      </button>
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDeleteCoupon(c.id, c.code)}>
                        <Trash2 size={14} />
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add / Edit Coupon Modal */}
      {isModalOpen && editingCoupon && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '560px' }}>
            <div className="admin-modal-header">
              <h3>{editingCoupon.id ? 'Edit Coupon Code' : 'Create New Coupon'}</h3>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveCoupon} className="admin-modal-body">
              <div className="admin-form-group">
                <label>Coupon Code (e.g. FREESHIP, BOGO50)</label>
                <input
                  type="text"
                  required
                  className="admin-form-control"
                  style={{ textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 700 }}
                  value={editingCoupon.code || ''}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, code: e.target.value.toUpperCase() })}
                />
              </div>

              <div className="admin-form-group">
                <label>Offer Type / Mechanics</label>
                <select
                  className="admin-form-control"
                  value={editingCoupon.type || 'flat_pct'}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, type: e.target.value as AdminCoupon['type'] })}
                >
                  <option value="flat_pct">Flat % Off (e.g., 20% Off)</option>
                  <option value="pct_capped">% Off Up To ₹X (e.g., 50% Off up to ₹200)</option>
                  <option value="flat_amount">Flat ₹ Amount Off (e.g., ₹100 Off)</option>
                  <option value="bogo">Buy 1 Get 1 Free (BOGO / B1G1)</option>
                  <option value="b2g1">Buy 2 Get 1 Free (B2G1)</option>
                  <option value="b2g2">Buy 2 Get 2 Free (B2G2)</option>
                </select>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Value (% or ₹ Amount)</label>
                  <input
                    type="number"
                    required
                    className="admin-form-control"
                    value={editingCoupon.value || 0}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, value: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                {editingCoupon.type === 'pct_capped' && (
                  <div className="admin-form-group">
                    <label>Max Cap Amount (₹)</label>
                    <input
                      type="number"
                      className="admin-form-control"
                      placeholder="e.g. 200"
                      value={editingCoupon.capAmount || ''}
                      onChange={(e) => setEditingCoupon({ ...editingCoupon, capAmount: parseFloat(e.target.value) || 0 })}
                    />
                  </div>
                )}
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Min. Order Value (₹)</label>
                  <input
                    type="number"
                    className="admin-form-control"
                    value={editingCoupon.minOrderValue || 0}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, minOrderValue: parseFloat(e.target.value) || 0 })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>Expiry Date</label>
                  <input
                    type="date"
                    className="admin-form-control"
                    value={editingCoupon.expiryDate || '2026-12-31'}
                    onChange={(e) => setEditingCoupon({ ...editingCoupon, expiryDate: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-group">
                <label>Description / Terms</label>
                <input
                  type="text"
                  className="admin-form-control"
                  placeholder="e.g. Flat 20% off on all organic fruits"
                  value={editingCoupon.description || ''}
                  onChange={(e) => setEditingCoupon({ ...editingCoupon, description: e.target.value })}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save Coupon
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
