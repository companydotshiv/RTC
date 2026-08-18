import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AdminOrder } from '../../data/adminStore';
import { Truck, Printer, CheckCircle, XCircle, Search, Eye, X } from 'lucide-react';

export const OrdersPanel: React.FC = () => {
  const [selectedStatusTab, setSelectedStatusTab] = useState<string>('all');
  const [searchTerm, setSearchTerm] = useState('');
  
  const [viewingOrder, setViewingOrder] = useState<AdminOrder | null>(null);
  const [invoiceModalOrder, setInvoiceModalOrder] = useState<AdminOrder | null>(null);
  const [trackingModalOrder, setTrackingModalOrder] = useState<AdminOrder | null>(null);

  const [courierNameInput, setCourierNameInput] = useState('BlueDart Express');
  const [trackingIdInput, setTrackingIdInput] = useState('');

  const orders = adminStore.orders;

  const filteredOrders = orders.filter((o) => {
    const matchesTab = selectedStatusTab === 'all' || o.status.toLowerCase() === selectedStatusTab;
    const matchesSearch =
      o.id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.customerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
      o.city.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesTab && matchesSearch;
  });

  const handleUpdateStatus = (orderId: string, status: AdminOrder['status']) => {
    adminStore.updateOrderStatus(orderId, status);
  };

  const handleSaveTracking = (e: React.FormEvent) => {
    e.preventDefault();
    if (!trackingModalOrder || !trackingIdInput) return;
    adminStore.addTrackingInfo(trackingModalOrder.id, courierNameInput, trackingIdInput);
    setTrackingModalOrder(null);
    setTrackingIdInput('');
  };

  const handleRefundAction = (orderId: string, action: 'Approved' | 'Rejected') => {
    adminStore.handleRefundRequest(orderId, action);
  };

  return (
    <div className="orders-panel">
      {/* Header Actions */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div className="admin-header-search" style={{ width: '280px' }}>
          <Search size={18} />
          <input
            type="text"
            placeholder="Search by Order ID, Buyer, City..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>

        {/* Status Filter Tabs */}
        <div style={{ display: 'flex', gap: '0.4rem', background: 'var(--admin-bg-secondary)', padding: '0.35rem', borderRadius: '10px', border: '1px solid var(--admin-border-color)' }}>
          {['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled'].map((tab) => (
            <button
              key={tab}
              onClick={() => setSelectedStatusTab(tab)}
              className={`admin-btn admin-btn-sm ${selectedStatusTab === tab ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
              style={{ textTransform: 'capitalize', border: 'none' }}
            >
              {tab}
            </button>
          ))}
        </div>
      </div>

      {/* Orders Table */}
      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer & Address</th>
                <th>Payment</th>
                <th>Total (GST Incl.)</th>
                <th>Order Status</th>
                <th>Tracking info</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredOrders.map((o) => (
                <tr key={o.id}>
                  <td>
                    <div style={{ fontWeight: 700, color: '#38bdf8' }}>{o.id}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{o.createdAt}</div>
                  </td>
                  <td>
                    <div style={{ fontWeight: 600 }}>{o.customerName}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{o.city}, {o.state} ({o.pincode})</div>
                  </td>
                  <td>
                    <span className={`status-pill ${o.paymentStatus === 'Paid' ? 'paid' : o.paymentStatus === 'Refunded' ? 'danger' : 'warning'}`}>
                      {o.paymentMethod} • {o.paymentStatus}
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#34d399' }}>₹{o.totalAmount}</td>
                  <td>
                    <select
                      className={`status-pill ${o.status.toLowerCase()}`}
                      style={{ outline: 'none', cursor: 'pointer', border: 'none' }}
                      value={o.status}
                      onChange={(e) => handleUpdateStatus(o.id, e.target.value as AdminOrder['status'])}
                    >
                      <option value="Pending">Pending</option>
                      <option value="Processing">Processing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>

                    {o.returnRequested && (
                      <div style={{ marginTop: '4px' }}>
                        <span className="status-pill warning" style={{ fontSize: '0.7rem' }}>Refund: {o.refundStatus}</span>
                      </div>
                    )}
                  </td>
                  <td>
                    {o.trackingId ? (
                      <div style={{ fontSize: '0.8rem' }}>
                        <div style={{ fontWeight: 600 }}>{o.courierName}</div>
                        <div style={{ fontSize: '0.75rem', color: '#38bdf8' }}>{o.trackingId}</div>
                      </div>
                    ) : (
                      <button
                        className="admin-btn admin-btn-secondary admin-btn-sm"
                        onClick={() => {
                          setTrackingModalOrder(o);
                          setTrackingIdInput('');
                        }}
                      >
                        <Truck size={14} /> Add Tracking
                      </button>
                    )}
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                      <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setViewingOrder(o)} title="View Order Details">
                        <Eye size={14} /> Details
                      </button>
                      <button className="admin-btn admin-btn-secondary admin-btn-sm" onClick={() => setInvoiceModalOrder(o)} title="Print GST Invoice">
                        <Printer size={14} /> GST Invoice
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Order Details Modal */}
      {viewingOrder && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '650px' }}>
            <div className="admin-modal-header">
              <h3>Order Breakdown #{viewingOrder.id}</h3>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setViewingOrder(null)}>
                <X size={20} />
              </button>
            </div>
            <div className="admin-modal-body">
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem', marginBottom: '1.5rem', background: 'rgba(15, 23, 42, 0.5)', padding: '1rem', borderRadius: '8px' }}>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Buyer Information</h4>
                  <div style={{ fontWeight: 600 }}>{viewingOrder.customerName}</div>
                  <div style={{ fontSize: '0.85rem' }}>{viewingOrder.email}</div>
                  <div style={{ fontSize: '0.85rem' }}>{viewingOrder.phone}</div>
                </div>
                <div>
                  <h4 style={{ margin: '0 0 0.25rem 0', fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>Shipping Address</h4>
                  <div style={{ fontSize: '0.85rem' }}>{viewingOrder.shippingAddress}</div>
                  <div style={{ fontSize: '0.85rem' }}>{viewingOrder.city}, {viewingOrder.state} - {viewingOrder.pincode}</div>
                </div>
              </div>

              <h4 style={{ margin: '0 0 0.75rem 0' }}>Ordered Items ({viewingOrder.items.length})</h4>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem', marginBottom: '1.5rem' }}>
                {viewingOrder.items.map((item, idx) => (
                  <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '0.5rem', background: 'rgba(255, 255, 255, 0.03)', borderRadius: '6px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                      <img src={item.image} alt={item.name} style={{ width: '40px', height: '40px', borderRadius: '6px', objectFit: 'cover' }} />
                      <div>
                        <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>{item.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>Qty: {item.quantity} x ₹{item.price}</div>
                      </div>
                    </div>
                    <div style={{ fontWeight: 700 }}>₹{item.price * item.quantity}</div>
                  </div>
                ))}
              </div>

              <div style={{ borderTop: '1px solid var(--admin-border-color)', paddingTop: '1rem', display: 'flex', flexDirection: 'column', gap: '0.4rem', fontSize: '0.9rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                  <span>Subtotal</span>
                  <span>₹{viewingOrder.subtotal}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: '#f87171' }}>
                  <span>Discount</span>
                  <span>-₹{viewingOrder.discount}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--admin-text-muted)' }}>
                  <span>GST Tax (5%)</span>
                  <span>₹{viewingOrder.taxGst}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', color: 'var(--admin-text-muted)' }}>
                  <span>Shipping Fee</span>
                  <span>₹{viewingOrder.shippingFee}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 800, fontSize: '1.1rem', color: '#34d399', borderTop: '1px solid var(--admin-border-color)', paddingTop: '0.5rem' }}>
                  <span>Total Paid</span>
                  <span>₹{viewingOrder.totalAmount}</span>
                </div>
              </div>

              {viewingOrder.returnRequested && viewingOrder.refundStatus === 'Requested' && (
                <div style={{ marginTop: '1.5rem', background: 'rgba(245, 158, 11, 0.15)', border: '1px solid rgba(245, 158, 11, 0.3)', padding: '1rem', borderRadius: '8px' }}>
                  <h4 style={{ margin: '0 0 0.5rem 0', color: '#fbbf24' }}>⚠️ Customer Refund Request Pending</h4>
                  <p style={{ margin: '0 0 1rem 0', fontSize: '0.85rem' }}>Buyer requested a return/refund for this order.</p>
                  <div style={{ display: 'flex', gap: '0.75rem' }}>
                    <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleRefundAction(viewingOrder.id, 'Approved')}>
                      <CheckCircle size={14} /> Approve Refund (₹{viewingOrder.totalAmount})
                    </button>
                    <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleRefundAction(viewingOrder.id, 'Rejected')}>
                      <XCircle size={14} /> Reject Request
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Courier Logistics Tracking Modal */}
      {trackingModalOrder && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '480px' }}>
            <div className="admin-modal-header">
              <h3>Dispatch Order #{trackingModalOrder.id}</h3>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setTrackingModalOrder(null)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleSaveTracking} className="admin-modal-body">
              <div className="admin-form-group">
                <label>Courier Partner</label>
                <select
                  className="admin-form-control"
                  value={courierNameInput}
                  onChange={(e) => setCourierNameInput(e.target.value)}
                >
                  <option value="BlueDart Express">BlueDart Express</option>
                  <option value="Delhivery Logistics">Delhivery Logistics</option>
                  <option value="FedEx India">FedEx India</option>
                  <option value="DTDC Courier">DTDC Courier</option>
                  <option value="Shadowfax">Shadowfax Local</option>
                </select>
              </div>

              <div className="admin-form-group">
                <label>Courier AWB / Tracking ID</label>
                <input
                  type="text"
                  required
                  className="admin-form-control"
                  placeholder="e.g. BD-982103982"
                  value={trackingIdInput}
                  onChange={(e) => setTrackingIdInput(e.target.value)}
                />
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setTrackingModalOrder(null)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Update & Mark Shipped
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Printable GST Invoice Modal */}
      {invoiceModalOrder && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '750px', background: '#fff' }}>
            <div className="admin-modal-header" style={{ background: '#f8fafc', borderColor: '#e2e8f0', color: '#0f172a' }}>
              <h3 style={{ color: '#0f172a' }}>Tax Invoice Preview</h3>
              <div style={{ display: 'flex', gap: '0.5rem' }}>
                <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => window.print()}>
                  <Printer size={14} /> Print Invoice
                </button>
                <button style={{ background: 'none', border: 'none', color: '#0f172a', cursor: 'pointer' }} onClick={() => setInvoiceModalOrder(null)}>
                  <X size={20} />
                </button>
              </div>
            </div>
            <div className="invoice-container">
              <div className="invoice-header">
                <div>
                  <h2 style={{ margin: 0, color: '#2271b1' }}>RTC Foods</h2>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>GSTIN: 29AABCU9603R1ZM</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Pure Dry Fruits & Nuts Store</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <h3 style={{ margin: 0, color: '#0f172a' }}>TAX INVOICE</h3>
                  <div style={{ fontSize: '0.85rem', fontWeight: 600 }}>Invoice #: INV-{invoiceModalOrder.id}</div>
                  <div style={{ fontSize: '0.8rem', color: '#64748b' }}>Date: {invoiceModalOrder.createdAt}</div>
                </div>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '1.5rem', fontSize: '0.85rem' }}>
                <div>
                  <strong>Billed To:</strong>
                  <div>{invoiceModalOrder.customerName}</div>
                  <div>{invoiceModalOrder.shippingAddress}</div>
                  <div>{invoiceModalOrder.city}, {invoiceModalOrder.state} - {invoiceModalOrder.pincode}</div>
                  <div>Phone: {invoiceModalOrder.phone}</div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <strong>Payment Details:</strong>
                  <div>Method: {invoiceModalOrder.paymentMethod}</div>
                  <div>Status: {invoiceModalOrder.paymentStatus}</div>
                </div>
              </div>

              <table className="invoice-table">
                <thead>
                  <tr style={{ background: '#f1f5f9' }}>
                    <th>Item Description</th>
                    <th>Qty</th>
                    <th>Rate</th>
                    <th>Taxable Value</th>
                    <th>GST (5%)</th>
                    <th>Total</th>
                  </tr>
                </thead>
                <tbody>
                  {invoiceModalOrder.items.map((item, i) => {
                    const taxable = item.price * item.quantity;
                    const gst = Math.round(taxable * 0.05);
                    return (
                      <tr key={i}>
                        <td>{item.name}</td>
                        <td>{item.quantity}</td>
                        <td>₹{item.price}</td>
                        <td>₹{taxable}</td>
                        <td>₹{gst}</td>
                        <td>₹{taxable + gst}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>

              <div style={{ textAlign: 'right', fontSize: '0.9rem', marginTop: '1rem' }}>
                <div>Subtotal: ₹{invoiceModalOrder.subtotal}</div>
                <div>Discount: -₹{invoiceModalOrder.discount}</div>
                <div>GST Tax: ₹{invoiceModalOrder.taxGst}</div>
                <div>Shipping: ₹{invoiceModalOrder.shippingFee}</div>
                <h3 style={{ color: '#0284c7', margin: '0.5rem 0 0 0' }}>Grand Total: ₹{invoiceModalOrder.totalAmount}</h3>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
