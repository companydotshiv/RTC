import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { PincodeRule, ShippingRule } from '../../data/adminStore';
import { MapPin, Truck, Plus, Trash2, Check, AlertCircle, X } from 'lucide-react';

export const ShippingRulesPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'settings' | 'pincodes'>('settings');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editingPincode, setEditingPincode] = useState<Partial<PincodeRule> | null>(null);

  const pincodes = adminStore.pincodes;
  const shippingRule = adminStore.shippingRule;

  const [shippingRuleForm, setShippingRuleForm] = useState<ShippingRule>({ ...shippingRule });
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleOpenAddPincode = () => {
    setEditingPincode({
      pincode: '',
      city: 'Delhi',
      state: 'Delhi',
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
    setSaveStatus({ type: 'success', message: 'Pincode rule updated.' });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleDeletePincode = (id: string, code: string) => {
    if (window.confirm(`Are you sure you want to remove pincode "${code}"?`)) {
      adminStore.deletePincode(id);
    }
  };

  const handleSaveShippingRules = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateShippingRule(shippingRuleForm);
    setSaveStatus({ type: 'success', message: 'Shipping settings saved.' });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="shipping-rules-panel" style={{ textAlign: 'left' }}>
      
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

      {/* Page Title & Navigation Tabs */}
      <h1 className="wp-page-title" style={{ marginBottom: '14px' }}>Shipping Settings</h1>

      <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid #c3c4c7', marginBottom: '24px' }}>
        <button
          type="button"
          onClick={() => setActiveTab('settings')}
          style={{
            padding: '8px 16px',
            border: '1px solid',
            borderColor: activeTab === 'settings' ? '#c3c4c7 #c3c4c7 #fff #c3c4c7' : 'transparent',
            background: activeTab === 'settings' ? '#fff' : 'transparent',
            color: activeTab === 'settings' ? '#1d2327' : '#2271b1',
            fontWeight: activeTab === 'settings' ? 700 : 500,
            fontSize: '13px',
            cursor: 'pointer',
            marginBottom: '-1px',
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px'
          }}
        >
          Shipping Options & Rates
        </button>
        <button
          type="button"
          onClick={() => setActiveTab('pincodes')}
          style={{
            padding: '8px 16px',
            border: '1px solid',
            borderColor: activeTab === 'pincodes' ? '#c3c4c7 #c3c4c7 #fff #c3c4c7' : 'transparent',
            background: activeTab === 'pincodes' ? '#fff' : 'transparent',
            color: activeTab === 'pincodes' ? '#1d2327' : '#2271b1',
            fontWeight: activeTab === 'pincodes' ? 700 : 500,
            fontSize: '13px',
            cursor: 'pointer',
            marginBottom: '-1px',
            borderTopLeftRadius: '3px',
            borderTopRightRadius: '3px'
          }}
        >
          Pincode Serviceability ({pincodes.length})
        </button>
      </div>

      {/* ========================================================================= */}
      {/* 1. SHIPPING OPTIONS TAB */}
      {/* ========================================================================= */}
      {activeTab === 'settings' && (
        <form onSubmit={handleSaveShippingRules} style={{ maxWidth: '800px' }}>
          
          <div className="wp-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '15px', fontWeight: 600, margin: '0 0 16px 0', borderBottom: '1px solid #f0f0f1', paddingBottom: '8px' }}>
              Free Shipping & Delivery Rates
            </h3>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              
              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', alignItems: 'start', gap: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327', marginTop: '6px' }}>
                  Free Shipping Minimum (₹)
                </label>
                <div>
                  <input
                    type="number"
                    value={shippingRuleForm.minOrderForFreeShipping}
                    onChange={(e) => setShippingRuleForm({ ...shippingRuleForm, minOrderForFreeShipping: parseFloat(e.target.value) || 0 })}
                    style={{ width: '180px' }}
                  />
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                    Orders with total amount at or above this value qualify for free pan-India shipping.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', alignItems: 'start', gap: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327', marginTop: '6px' }}>
                  Standard Flat Rate (₹)
                </label>
                <div>
                  <input
                    type="number"
                    value={shippingRuleForm.standardFee}
                    onChange={(e) => setShippingRuleForm({ ...shippingRuleForm, standardFee: parseFloat(e.target.value) || 0 })}
                    style={{ width: '180px' }}
                  />
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                    Default standard delivery fee applied when order is below free shipping threshold.
                  </p>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', alignItems: 'start', gap: '16px' }}>
                <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327', marginTop: '6px' }}>
                  COD Verification Fee (₹)
                </label>
                <div>
                  <input
                    type="number"
                    value={shippingRuleForm.codCharge}
                    onChange={(e) => setShippingRuleForm({ ...shippingRuleForm, codCharge: parseFloat(e.target.value) || 0 })}
                    style={{ width: '180px' }}
                  />
                  <p style={{ margin: '4px 0 0 0', fontSize: '12px', color: '#64748b' }}>
                    Nominal cash-handling and door verification fee charged on Cash on Delivery orders.
                  </p>
                </div>
              </div>

            </div>
          </div>

          <button type="submit" className="wp-button-primary" style={{ padding: '7px 18px', fontWeight: 700 }}>
            Save changes
          </button>
        </form>
      )}

      {/* ========================================================================= */}
      {/* 2. PINCODE SERVICEABILITY TAB */}
      {/* ========================================================================= */}
      {activeTab === 'pincodes' && (
        <div>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px' }}>
            <span style={{ fontSize: '13px', color: '#50575e' }}>Manage serviceable pin codes, express dispatch and COD availability.</span>
            <button className="wp-button-primary" onClick={handleOpenAddPincode}>
              <Plus size={14} /> Add Pincode
            </button>
          </div>

          <div className="wp-card" style={{ padding: 0, overflow: 'hidden' }}>
            <table className="wp-list-table">
              <thead>
                <tr>
                  <th>Pincode</th>
                  <th>City / Region</th>
                  <th>State</th>
                  <th>Delivery Days</th>
                  <th>COD Available</th>
                  <th>Status</th>
                  <th style={{ width: '70px', textAlign: 'right' }}>Actions</th>
                </tr>
              </thead>
              <tbody>
                {pincodes.map((p) => (
                  <tr key={p.id}>
                    <td style={{ fontFamily: 'monospace', fontWeight: 700, color: '#1d2327' }}>
                      {p.pincode}
                    </td>
                    <td>{p.city}</td>
                    <td>{p.state}</td>
                    <td>{p.estimatedDays} days</td>
                    <td>
                      {p.isCodAvailable ? (
                        <span style={{ color: '#008a20', fontWeight: 600 }}>Yes</span>
                      ) : (
                        <span style={{ color: '#8c8f94' }}>Prepaid Only</span>
                      )}
                    </td>
                    <td>
                      {p.isDeliverable ? (
                        <span style={{ color: '#008a20', fontWeight: 600 }}>Serviceable</span>
                      ) : (
                        <span style={{ color: '#d63638', fontWeight: 600 }}>Blocked</span>
                      )}
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <button
                        type="button"
                        onClick={() => handleDeletePincode(p.id, p.pincode)}
                        style={{ background: 'none', border: 'none', color: '#a00', cursor: 'pointer', padding: '4px' }}
                        title="Remove pincode"
                      >
                        <Trash2 size={15} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Add Pincode Modal */}
      {isModalOpen && editingPincode && (
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
          onClick={() => setIsModalOpen(false)}
        >
          <div
            style={{
              background: '#fff',
              width: '100%',
              maxWidth: '440px',
              borderRadius: '3px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #c3c4c7', background: '#f6f7f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Add Serviceable Pincode</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSavePincode} style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>6-Digit Pincode *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. 110006"
                  value={editingPincode.pincode || ''}
                  onChange={(e) => setEditingPincode({ ...editingPincode, pincode: e.target.value })}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>City *</label>
                  <input
                    type="text"
                    required
                    value={editingPincode.city || ''}
                    onChange={(e) => setEditingPincode({ ...editingPincode, city: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>State *</label>
                  <input
                    type="text"
                    required
                    value={editingPincode.state || ''}
                    onChange={(e) => setEditingPincode({ ...editingPincode, state: e.target.value })}
                    style={{ width: '100%', boxSizing: 'border-box' }}
                  />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Estimated Delivery Days</label>
                <input
                  type="number"
                  min={1}
                  value={editingPincode.estimatedDays || 2}
                  onChange={(e) => setEditingPincode({ ...editingPincode, estimatedDays: parseInt(e.target.value) || 2 })}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div style={{ display: 'flex', gap: '18px', marginTop: '4px' }}>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingPincode.isCodAvailable ?? true}
                    onChange={(e) => setEditingPincode({ ...editingPincode, isCodAvailable: e.target.checked })}
                  />
                  <span>COD Available</span>
                </label>
                <label style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '13px', cursor: 'pointer' }}>
                  <input
                    type="checkbox"
                    checked={editingPincode.isDeliverable ?? true}
                    onChange={(e) => setEditingPincode({ ...editingPincode, isDeliverable: e.target.checked })}
                  />
                  <span>Serviceable</span>
                </label>
              </div>

              <div style={{ padding: '12px 0 0 0', borderTop: '1px solid #f0f0f1', display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button type="button" className="wp-button-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="wp-button-primary">Save Pincode</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
