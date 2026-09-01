import React, { useState, useEffect } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AdminOrder } from '../../data/adminStore';
import { Truck, Printer, Search, Eye, X, Check, AlertCircle, Package, ArrowLeft } from 'lucide-react';

export const OrdersPanel: React.FC = () => {
  const [orders, setOrders] = useState<AdminOrder[]>(adminStore.orders);
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [viewingOrder, setViewingOrder] = useState<AdminOrder | null>(null);
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<AdminOrder | null>(null);
  const [trackingModalOrder, setTrackingModalOrder] = useState<AdminOrder | null>(null);

  const [courierNameInput, setCourierNameInput] = useState('BlueDart Express');
  const [trackingIdInput, setTrackingIdInput] = useState('');
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  // Subscribe to live adminStore updates
  useEffect(() => {
    const unsubscribe = adminStore.subscribe(() => {
      setOrders([...adminStore.orders]);
    });
    return () => unsubscribe();
  }, []);

  const filteredOrders = orders.filter((o) => {
    const matchesTab = selectedStatusTab === 'all' || o.status.toLowerCase() === selectedStatusTab.toLowerCase();
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleUpdateStatus = (orderId: string, status: AdminOrder['status']) => {
    adminStore.updateOrderStatus(orderId, status);
    setSaveStatus({ type: 'success', message: `Order ${orderId} updated to ${status}.` });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const handleSaveTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingModalOrder || !trackingIdInput) return;
    adminStore.addTrackingInfo(trackingModalOrder.id, courierNameInput, trackingIdInput);
    setTrackingModalOrder(null);
    setTrackingIdInput('');
    setSaveStatus({ type: 'success', message: 'Tracking information saved.' });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  const getStatusBadgeStyle = (status: AdminOrder['status']) => {
    switch (status) {
      case 'Processing':
        return { background: '#c6e1c6', color: '#5b841b', border: '1px solid #a3c48d' };
      case 'Pending':
        return { background: '#f8dda7', color: '#94660c', border: '1px solid #e2c07a' };
      case 'Shipped':
        return { background: '#d4edda', color: '#155724', border: '1px solid #c3e6cb' };
      case 'Delivered':
        return { background: '#e2e3e5', color: '#383d41', border: '1px solid #d6d8db' };
      case 'Cancelled':
        return { background: '#eba3a3', color: '#761919', border: '1px solid #d68787' };
      default:
        return { background: '#f0f0f1', color: '#50575e', border: '1px solid #c3c4c7' };
    }
  };

  return (
    <div className="orders-panel" style={{ textAlign: 'left' }}>
      
      {/* Toast Notification */}
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

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '14px' }}>
        <h1 className="wp-page-title" style={{ margin: 0 }}>Orders</h1>
      </div>

      {/* WordPress WooCommerce Status Filter Tabs */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '14px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '6px', fontSize: '13px', color: '#50575e', flexWrap: 'wrap' }}>
          {[
            { id: 'all', label: 'All', count: orders.length },
            { id: 'pending', label: 'Pending payment', count: orders.filter((o) => o.status === 'Pending').length },
            { id: 'processing', label: 'Processing', count: orders.filter((o) => o.status === 'Processing').length },
            { id: 'shipped', label: 'Shipped', count: orders.filter((o) => o.status === 'Shipped').length },
            { id: 'delivered', label: 'Completed', count: orders.filter((o) => o.status === 'Delivered').length },
            { id: 'cancelled', label: 'Cancelled', count: orders.filter((o) => o.status === 'Cancelled').length }
          ].map((tab, idx, arr) => (
            <React.Fragment key={tab.id}>
              <span
                style={{
                  color: selectedStatusTab === tab.id ? '#000' : '#2271b1',
                  fontWeight: selectedStatusTab === tab.id ? 700 : 400,
                  cursor: 'pointer'
                }}
                onClick={() => setSelectedStatusTab(tab.id)}
              >
                {tab.label} <span style={{ color: '#8c8f94' }}>({tab.count})</span>
              </span>
              {idx < arr.length - 1 && <span style={{ color: '#c3c4c7' }}>|</span>}
            </React.Fragment>
          ))}
        </div>

        {/* Search */}
        <div style={{ display: 'flex', gap: '6px' }}>
          <input
            type="search"
            placeholder="Search orders, buyer, city..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '5px 10px', fontSize: '13px', width: '240px' }}
          />
        </div>
      </div>

      {/* Orders Table */}
      <div className="wp-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #c3c4c7' }}>
        <div style={{ overflowX: 'auto' }}>
          <table className="wp-list-table">
            <thead>
              <tr>
                <th style={{ width: '150px' }}>Order</th>
                <th>Date</th>
                <th>Status</th>
                <th>Billing & Ship to</th>
                <th>Items Ordered</th>
                <th>Total</th>
                <th style={{ textAlign: 'right', width: '130px' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.length === 0 ? (
                <tr>
                  <td colSpan={7} style={{ textAlign: 'center', padding: '30px', color: '#8c8f94' }}>
                    No orders found matching the filter.
                  </td>
                </tr>
              ) : (
                filteredOrders.map((o) => {
                  const badgeStyle = getStatusBadgeStyle(o.status);
                  return (
                    <tr key={o.id}>
                      {/* Order ID & Name */}
                      <td>
                        <strong
                          className="wp-post-title-link"
                          onClick={() => setViewingOrder(o)}
                          style={{ color: '#2271b1', cursor: 'pointer' }}
                        >
                          #{o.id}
                        </strong>
                        <div style={{ fontSize: '12px', fontWeight: 600, color: '#1d2327', marginTop: '2px' }}>
                          {o.customerName}
                        </div>
                        <div className="row-actions">
                          <span style={{ color: '#2271b1', cursor: 'pointer' }} onClick={() => setViewingOrder(o)}>View details</span>
                          <span style={{ color: '#ddd' }}>|</span>
                          <span style={{ color: '#2271b1', cursor: 'pointer' }} onClick={() => setInvoiceModalOrder(o)}>Print invoice</span>
                        </div>
                      </td>

                      {/* Date */}
                      <td style={{ fontSize: '12px', color: '#50575e' }}>
                        {o.createdAt}
                      </td>

                      {/* Status */}
                      <td>
                        <span
                          style={{
                            padding: '3px 8px',
                            borderRadius: '3px',
                            fontSize: '11px',
                            fontWeight: 700,
                            display: 'inline-block',
                            ...badgeStyle
                          }}
                        >
                          {o.status}
                        </span>
                        {o.trackingId && (
                          <div style={{ fontSize: '11px', color: '#2271b1', marginTop: '4px', display: 'flex', alignItems: 'center', gap: '3px' }}>
                            <Truck size={11} /> {o.trackingId}
                          </div>
                        )}
                      </td>

                      {/* Shipping Address */}
                      <td style={{ fontSize: '12px', color: '#374151', maxWidth: '200px' }}>
                        <div>{o.shippingAddress}</div>
                        <div style={{ color: '#64748b' }}>{o.city}, {o.state} - {o.pincode}</div>
                        <div style={{ color: '#64748b' }}>📞 {o.phone}</div>
                      </td>

                      {/* Items */}
                      <td style={{ fontSize: '12px' }}>
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '2px' }}>
                          {o.items.map((it, idx) => (
                            <div key={idx} style={{ color: '#1d2327' }}>
                              <strong>{it.quantity}×</strong> {it.name} <span style={{ color: '#64748b' }}>({it.weight || '250g'})</span>
                            </div>
                          ))}
                        </div>
                      </td>

                      {/* Total */}
                      <td>
                        <div style={{ fontWeight: 700, color: '#1d2327' }}>₹{o.totalAmount}</div>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>
                          via {o.paymentMethod} {o.paymentStatus === 'Paid' ? '✅ Paid' : '⏳ Pending'}
                        </div>
                      </td>

                      {/* Actions */}
                      <td style={{ textAlign: 'right' }}>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '6px', alignItems: 'center' }}>
                          <select
                            value={o.status}
                            onChange={(e) => handleUpdateStatus(o.id, e.target.value as any)}
                            style={{ padding: '3px 6px', fontSize: '11px', fontWeight: 600, borderRadius: '3px' }}
                          >
                            <option value="Pending">Pending</option>
                            <option value="Processing">Processing</option>
                            <option value="Shipped">Shipped</option>
                            <option value="Delivered">Completed</option>
                            <option value="Cancelled">Cancelled</option>
                          </select>

                          <button
                            type="button"
                            onClick={() => setTrackingModalOrder(o)}
                            style={{ background: '#f0f0f1', border: '1px solid #c3c4c7', borderRadius: '3px', padding: '4px 6px', cursor: 'pointer' }}
                            title="Add/Edit Courier Tracking"
                          >
                            <Truck size={13} color="#2271b1" />
                          </button>

                          <button
                            type="button"
                            onClick={() => setInvoiceModalOrder(o)}
                            style={{ background: '#f0f0f1', border: '1px solid #c3c4c7', borderRadius: '3px', padding: '4px 6px', cursor: 'pointer' }}
                            title="Print Tax Invoice"
                          >
                            <Printer size={13} color="#2271b1" />
                          </button>
                        </div>
                      </td>
                    </tr>
                  );
                })
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. ORDER DETAILS MODAL */}
      {/* ========================================================================= */}
      {viewingOrder && (
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
          onClick={() => setViewingOrder(null)}
        >
          <div
            style={{
              background: '#fff',
              width: '100%',
              maxWidth: '680px',
              maxHeight: '90vh',
              borderRadius: '4px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #c3c4c7', background: '#f6f7f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '15px', fontWeight: 600 }}>
                Order #{viewingOrder.id} details
              </h3>
              <button onClick={() => setViewingOrder(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={18} />
              </button>
            </div>

            <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '18px' }}>
              {/* General details */}
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px', background: '#f8fafc', padding: '14px', borderRadius: '4px', border: '1px solid #e2e8f0' }}>
                <div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>General Details:</div>
                  <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '2px' }}>Date created: {viewingOrder.createdAt}</div>
                  <div style={{ fontSize: '13px', marginTop: '4px' }}>
                    Status: <strong>{viewingOrder.status}</strong>
                  </div>
                  <div style={{ fontSize: '13px', marginTop: '4px' }}>
                    Payment: <strong>{viewingOrder.paymentMethod}</strong> ({viewingOrder.paymentStatus})
                  </div>
                </div>

                <div>
                  <div style={{ fontSize: '12px', color: '#64748b' }}>Customer & Delivery:</div>
                  <div style={{ fontWeight: 600, fontSize: '13px', marginTop: '2px' }}>{viewingOrder.customerName}</div>
                  <div style={{ fontSize: '12px', color: '#50575e' }}>{viewingOrder.shippingAddress}</div>
                  <div style={{ fontSize: '12px', color: '#50575e' }}>{viewingOrder.city}, {viewingOrder.state} - {viewingOrder.pincode}</div>
                  <div style={{ fontSize: '12px', color: '#50575e', marginTop: '4px' }}>✉️ {viewingOrder.email} | 📞 {viewingOrder.phone}</div>
                </div>
              </div>

              {/* Items Table */}
              <table className="wp-list-table">
                <thead>
                  <tr>
                    <th>Item</th>
                    <th>Cost</th>
                    <th>Qty</th>
                    <th style={{ textAlign: 'right' }}>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {viewingOrder.items.map((it, idx) => (
                    <tr key={idx}>
                      <td>
                        <strong>{it.name}</strong>
                        <div style={{ fontSize: '11px', color: '#64748b' }}>Weight / Size: {it.weight || '250g'}</div>
                      </td>
                      <td>₹{it.price}</td>
                      <td>{it.quantity}</td>
                      <td style={{ textAlign: 'right', fontWeight: 600 }}>₹{it.price * it.quantity}</td>
                    </tr>
                  ))}
                </tbody>
              </table>

              {/* Price Breakdown */}
              <div style={{ alignSelf: 'flex-end', width: '240px', display: 'flex', flexDirection: 'column', gap: '6px', fontSize: '13px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Items Subtotal:</span>
                  <span>₹{viewingOrder.subtotal}</span>
                </div>
                {viewingOrder.discount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#15803D' }}>
                    <span>Coupon Discount:</span>
                    <span>-₹{viewingOrder.discount}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>GST Tax (5%):</span>
                  <span>₹{viewingOrder.taxGst}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#64748b' }}>
                  <span>Shipping Fee:</span>
                  <span>{viewingOrder.shippingFee === 0 ? 'FREE' : `₹${viewingOrder.shippingFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 700, fontSize: '15px', borderTop: '1px solid #c3c4c7', paddingTop: '6px', marginTop: '4px' }}>
                  <span>Order Total:</span>
                  <span style={{ color: '#15803D' }}>₹{viewingOrder.totalAmount}</span>
                </div>
              </div>
            </div>

            <div style={{ padding: '12px 18px', borderTop: '1px solid #c3c4c7', background: '#f6f7f7', display: 'flex', justifyContent: 'space-between' }}>
              <button
                className="wp-button-secondary"
                onClick={() => {
                  setInvoiceModalOrder(viewingOrder);
                  setViewingOrder(null);
                }}
              >
                <Printer size={14} /> Print Invoice
              </button>
              <button className="wp-button-primary" onClick={() => setViewingOrder(null)}>
                Close Details
              </button>
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. TRACKING MODAL */}
      {/* ========================================================================= */}
      {trackingModalOrder && (
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
          onClick={() => setTrackingModalOrder(null)}
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
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>
                Courier Tracking — Order #{trackingModalOrder.id}
              </h3>
              <button onClick={() => setTrackingModalOrder(null)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleSaveTracking} style={{ padding: '18px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Courier Partner</label>
                <select
                  value={courierNameInput}
                  onChange={(e) => setCourierNameInput(e.target.value)}
                  style={{ width: '100%' }}
                >
                  <option value="BlueDart Express">BlueDart Express</option>
                  <option value="Delhivery Surface">Delhivery Surface</option>
                  <option value="DTDC Express">DTDC Express</option>
                  <option value="India Post Speed Post">India Post Speed Post</option>
                </select>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>AWB / Tracking Number *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. BD-884920194"
                  value={trackingIdInput}
                  onChange={(e) => setTrackingIdInput(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box', fontFamily: 'monospace' }}
                />
              </div>

              <div style={{ padding: '12px 0 0 0', borderTop: '1px solid #f0f0f1', display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button type="button" className="wp-button-secondary" onClick={() => setTrackingModalOrder(null)}>Cancel</button>
                <button type="submit" className="wp-button-primary">Save Tracking</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 3. PRINTABLE GST TAX INVOICE MODAL */}
      {/* ========================================================================= */}
      {invoiceModalOrder && (
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
          onClick={() => setInvoiceModalOrder(null)}
        >
          <div
            style={{
              background: '#fff',
              width: '100%',
              maxWidth: '650px',
              maxHeight: '90vh',
              borderRadius: '4px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              overflowY: 'auto',
              padding: '30px'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Printable Invoice Header */}
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #15803D', paddingBottom: '16px', marginBottom: '20px' }}>
              <div>
                <h2 style={{ margin: 0, color: '#15803D', fontSize: '20px', fontWeight: 800 }}>RTC FOODS (INDIA)</h2>
                <div style={{ fontSize: '12px', color: '#50575e', marginTop: '4px' }}>
                  FSSAI Lic: 10821005000452 | GSTIN: 07AAACR1234F1Z5<br />
                  Plot No. 42, HSIIDC Industrial Area, Phase-IV, Kundli, Sonipat, Haryana - 131028
                </div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <span style={{ background: '#15803D', color: '#fff', fontSize: '11px', fontWeight: 700, padding: '3px 8px', borderRadius: '3px' }}>TAX INVOICE</span>
                <div style={{ fontSize: '14px', fontWeight: 700, marginTop: '6px' }}>Invoice #{invoiceModalOrder.id}</div>
                <div style={{ fontSize: '12px', color: '#64748b' }}>Date: {invoiceModalOrder.createdAt}</div>
              </div>
            </div>

            {/* Bill To */}
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px', marginBottom: '20px', fontSize: '12px' }}>
              <div>
                <strong>Billed To:</strong>
                <div style={{ marginTop: '4px', fontWeight: 600 }}>{invoiceModalOrder.customerName}</div>
                <div>{invoiceModalOrder.shippingAddress}</div>
                <div>{invoiceModalOrder.city}, {invoiceModalOrder.state} - {invoiceModalOrder.pincode}</div>
                <div>Phone: {invoiceModalOrder.phone}</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <strong>Payment Details:</strong>
                <div style={{ marginTop: '4px' }}>Mode: {invoiceModalOrder.paymentMethod}</div>
                <div>Status: {invoiceModalOrder.paymentStatus}</div>
              </div>
            </div>

            {/* Invoice Table */}
            <table style={{ width: '100%', borderCollapse: 'collapse', marginBottom: '20px', fontSize: '12px' }}>
              <thead>
                <tr style={{ background: '#f6f7f7', borderBottom: '1px solid #c3c4c7' }}>
                  <th style={{ padding: '8px', textAlign: 'left' }}>Item Description</th>
                  <th style={{ padding: '8px', textAlign: 'center' }}>Qty</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>Unit Rate</th>
                  <th style={{ padding: '8px', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {invoiceModalOrder.items.map((it, idx) => (
                  <tr key={idx} style={{ borderBottom: '1px solid #f0f0f1' }}>
                    <td style={{ padding: '8px' }}>
                      <strong>{it.name}</strong> ({it.weight || '250g'})
                    </td>
                    <td style={{ padding: '8px', textAlign: 'center' }}>{it.quantity}</td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>₹{it.price}</td>
                    <td style={{ padding: '8px', textAlign: 'right' }}>₹{it.price * it.quantity}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan={3} style={{ padding: '8px', textAlign: 'right', fontWeight: 600 }}>Subtotal:</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>₹{invoiceModalOrder.subtotal}</td>
                </tr>
                {invoiceModalOrder.discount > 0 && (
                  <tr>
                    <td colSpan={3} style={{ padding: '8px', textAlign: 'right', color: '#15803D' }}>Coupon Discount:</td>
                    <td style={{ padding: '8px', textAlign: 'right', color: '#15803D' }}>-₹{invoiceModalOrder.discount}</td>
                  </tr>
                )}
                <tr>
                  <td colSpan={3} style={{ padding: '8px', textAlign: 'right' }}>GST Tax (5%):</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>₹{invoiceModalOrder.taxGst}</td>
                </tr>
                <tr>
                  <td colSpan={3} style={{ padding: '8px', textAlign: 'right' }}>Shipping:</td>
                  <td style={{ padding: '8px', textAlign: 'right' }}>{invoiceModalOrder.shippingFee === 0 ? 'FREE' : `₹${invoiceModalOrder.shippingFee}`}</td>
                </tr>
                <tr style={{ borderTop: '2px solid #1d2327', fontWeight: 700 }}>
                  <td colSpan={3} style={{ padding: '8px', textAlign: 'right', fontSize: '14px' }}>Grand Total (INR):</td>
                  <td style={{ padding: '8px', textAlign: 'right', fontSize: '14px', color: '#15803D' }}>₹{invoiceModalOrder.totalAmount}</td>
                </tr>
              </tbody>
            </table>

            {/* Footer Buttons */}
            <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '20px' }}>
              <button className="wp-button-secondary" onClick={() => setInvoiceModalOrder(null)}>Close</button>
              <button className="wp-button-primary" onClick={() => window.print()}>
                <Printer size={14} /> Print Invoice
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
