import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { PincodeRule, ShippingRule } from '../../data/adminStore';
import { MapPin, Truck, Plus, Power, Trash2, Save, X } from 'lucide-react';

export const ShippingRulesPanel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPincode, setEditingPincode] = useState<Partial<PincodeRule> | null>(null);

  const pincodes = adminStore.pincodes;
  const shippingRule = adminStore.shippingRule;

  const [shippingRuleForm, setShippingRuleForm] = useState<ShippingRule>({ ...shippingRule });

  const handleOpenAddPincode = () => {
    setEditingPincode({
      pincode: '',
      city: 'Mumbai',
      state: 'Maharashtra',
      isDeliverable: true,
      isCodAvailable: true,
      estimatedDays: 2
    });
    setIsModalOpen(true);
  };

  const handleSavePincode = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingPincode || !editingPincode.pincode) return;
    adminStore.addOrUpdatePincode(editingPincode);
    setIsModalOpen(false);
    setEditingPincode(null);
  };

  const handleDeletePincode = (id: string, code: string) => {
    if (window.confirm(`Are you sure you want to remove pincode "${code}"?`)) {
      adminStore.deletePincode(id);
    }
  };

  const handleSaveShippingRules = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateShippingRule(shippingRuleForm);
    alert('Shipping Rules & Free Shipping Threshold updated!');
  };

  return (
    <div className="shipping-rules-panel">
      {/* Free Shipping & Fee Threshold Editor */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <Truck size={20} color="#34d399" /> Global Shipping & COD Fee Configuration
          </h3>
        </div>

        <form onSubmit={handleSaveShippingRules} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '1.25rem', alignItems: 'end' }}>
          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <label>Free Shipping Threshold (₹)</label>
            <input
              type="number"
              className="admin-form-control"
              value={shippingRuleForm.minOrderForFreeShipping}
              onChange={(e) => setShippingRuleForm({ ...shippingRuleForm, minOrderForFreeShipping: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <label>Standard Delivery Fee (₹)</label>
            <input
              type="number"
              className="admin-form-control"
              value={shippingRuleForm.standardFee}
              onChange={(e) => setShippingRuleForm({ ...shippingRuleForm, standardFee: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <div className="admin-form-group" style={{ marginBottom: 0 }}>
            <label>Cash-on-Delivery Fee (₹)</label>
            <input
              type="number"
              className="admin-form-control"
              value={shippingRuleForm.codCharge}
              onChange={(e) => setShippingRuleForm({ ...shippingRuleForm, codCharge: parseFloat(e.target.value) || 0 })}
            />
          </div>

          <button type="submit" className="admin-btn admin-btn-primary" style={{ height: '42px' }}>
            <Save size={16} /> Save Shipping Rules
          </button>
        </form>
      </div>

      {/* Pincode Serviceability Table */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <MapPin size={20} color="#38bdf8" /> Pincode Serviceability & COD Manager
          </h3>
          <button className="admin-btn admin-btn-primary" onClick={handleOpenAddPincode}>
            <Plus size={16} /> Add Pincode
          </button>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Pincode</th>
                <th>City & State</th>
                <th>Delivery Status</th>
                <th>COD Availability</th>
                <th>Est. Delivery Time</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {pincodes.map((p) => (
                <tr key={p.id}>
                  <td style={{ fontWeight: 700, color: '#38bdf8' }}>{p.pincode}</td>
                  <td>{p.city}, {p.state}</td>
                  <td>
                    <button
                      className={`status-pill ${p.isDeliverable ? 'success' : 'danger'}`}
                      style={{ border: 'none', cursor: 'pointer' }}
                      onClick={() => adminStore.addOrUpdatePincode({ ...p, isDeliverable: !p.isDeliverable })}
                    >
                      <Power size={12} /> {p.isDeliverable ? 'Deliverable' : 'Blocked'}
                    </button>
                  </td>
                  <td>
                    <button
                      className={`status-pill ${p.isCodAvailable ? 'paid' : 'warning'}`}
                      style={{ border: 'none', cursor: 'pointer' }}
                      onClick={() => adminStore.addOrUpdatePincode({ ...p, isCodAvailable: !p.isCodAvailable })}
                    >
                      {p.isCodAvailable ? 'COD Active' : 'Prepaid Only'}
                    </button>
                  </td>
                  <td>{p.estimatedDays} Days</td>
                  <td style={{ textAlign: 'right' }}>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDeletePincode(p.id, p.pincode)}>
                      <Trash2 size={14} /> Remove
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Pincode Modal */}
      {isModalOpen && editingPincode && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '480px' }}>
            <div className="admin-modal-header">
              <h3>Add Deliverable Pincode</h3>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSavePincode} className="admin-modal-body">
              <div className="admin-form-group">
                <label>Pincode (6 digits)</label>
                <input
                  type="text"
                  required
                  maxLength={6}
                  className="admin-form-control"
                  placeholder="e.g. 560038"
                  value={editingPincode.pincode || ''}
                  onChange={(e) => setEditingPincode({ ...editingPincode, pincode: e.target.value })}
                />
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>City</label>
                  <input
                    type="text"
                    required
                    className="admin-form-control"
                    placeholder="e.g. Bengaluru"
                    value={editingPincode.city || ''}
                    onChange={(e) => setEditingPincode({ ...editingPincode, city: e.target.value })}
                  />
                </div>
                <div className="admin-form-group">
                  <label>State</label>
                  <input
                    type="text"
                    required
                    className="admin-form-control"
                    placeholder="e.g. Karnataka"
                    value={editingPincode.state || ''}
                    onChange={(e) => setEditingPincode({ ...editingPincode, state: e.target.value })}
                  />
                </div>
              </div>

              <div className="admin-form-row">
                <div className="admin-form-group">
                  <label>Serviceable</label>
                  <select
                    className="admin-form-control"
                    value={editingPincode.isDeliverable ? 'true' : 'false'}
                    onChange={(e) => setEditingPincode({ ...editingPincode, isDeliverable: e.target.value === 'true' })}
                  >
                    <option value="true">Yes (Deliverable)</option>
                    <option value="false">No (Block Region)</option>
                  </select>
                </div>
                <div className="admin-form-group">
                  <label>COD Option</label>
                  <select
                    className="admin-form-control"
                    value={editingPincode.isCodAvailable ? 'true' : 'false'}
                    onChange={(e) => setEditingPincode({ ...editingPincode, isCodAvailable: e.target.value === 'true' })}
                  >
                    <option value="true">COD Enabled</option>
                    <option value="false">Prepaid Only</option>
                  </select>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save Pincode
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
