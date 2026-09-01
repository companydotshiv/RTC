import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AdminReview } from '../../data/adminStore';
import { Star, Search, Trash2, Check, AlertCircle } from 'lucide-react';

export const CustomersReviewsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customers' | 'reviews'>('customers');
  const [searchTerm, setSearchTerm] = useState('');
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const customers = adminStore.customers;
  const reviews = adminStore.reviews;

  const filteredCustomers = customers.filter(
    (c) => c.name.toLowerCase().includes(searchTerm.toLowerCase()) || c.email.toLowerCase().includes(searchTerm.toLowerCase()) || c.city.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredReviews = reviews.filter(
    (r) => r.productName.toLowerCase().includes(searchTerm.toLowerCase()) || r.customerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleUpdateReviewStatus = (id: string, status: AdminReview['status']) => {
    adminStore.updateReviewStatus(id, status);
    setSaveStatus({ type: 'success', message: `Review status changed to ${status}.` });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="customers-reviews-panel" style={{ textAlign: 'left' }}>
      
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

      {/* Page Title & Tabs */}
      <h1 className="wp-page-title" style={{ marginBottom: '14px' }}>
        {activeTab === 'customers' ? 'Customers' : 'Reviews & Comments'}
      </h1>

      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px', flexWrap: 'wrap', gap: '10px' }}>
        <div style={{ display: 'flex', gap: '4px', borderBottom: '1px solid #c3c4c7' }}>
          <button
            type="button"
            onClick={() => setActiveTab('customers')}
            style={{
              padding: '8px 16px',
              border: '1px solid',
              borderColor: activeTab === 'customers' ? '#c3c4c7 #c3c4c7 #fff #c3c4c7' : 'transparent',
              background: activeTab === 'customers' ? '#fff' : 'transparent',
              color: activeTab === 'customers' ? '#1d2327' : '#2271b1',
              fontWeight: activeTab === 'customers' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              marginBottom: '-1px',
              borderTopLeftRadius: '3px',
              borderTopRightRadius: '3px'
            }}
          >
            Customers Directory ({customers.length})
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('reviews')}
            style={{
              padding: '8px 16px',
              border: '1px solid',
              borderColor: activeTab === 'reviews' ? '#c3c4c7 #c3c4c7 #fff #c3c4c7' : 'transparent',
              background: activeTab === 'reviews' ? '#fff' : 'transparent',
              color: activeTab === 'reviews' ? '#1d2327' : '#2271b1',
              fontWeight: activeTab === 'reviews' ? 700 : 500,
              fontSize: '13px',
              cursor: 'pointer',
              marginBottom: '-1px',
              borderTopLeftRadius: '3px',
              borderTopRightRadius: '3px'
            }}
          >
            Reviews Moderation ({reviews.length})
          </button>
        </div>

        <div style={{ display: 'flex', gap: '6px' }}>
          <input
            type="search"
            placeholder={activeTab === 'customers' ? 'Search customers...' : 'Search reviews...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ padding: '5px 10px', fontSize: '13px', width: '220px' }}
          />
        </div>
      </div>

      {/* ========================================================================= */}
      {/* 1. CUSTOMERS DIRECTORY TABLE */}
      {/* ========================================================================= */}
      {activeTab === 'customers' && (
        <div className="wp-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #c3c4c7' }}>
          <table className="wp-list-table">
            <thead>
              <tr>
                <th>Customer Name</th>
                <th>Email & Phone</th>
                <th>City / Region</th>
                <th>Orders Count</th>
                <th>Total Spend</th>
                <th>Registered Date</th>
              </tr>
            </thead>
            <tbody>
              {filteredCustomers.map((c) => (
                <tr key={c.id}>
                  <td style={{ fontWeight: 600, color: '#1d2327' }}>{c.name}</td>
                  <td>
                    <div>{c.email}</div>
                    <div style={{ fontSize: '11px', color: '#64748b' }}>{c.phone}</div>
                  </td>
                  <td>{c.city}</td>
                  <td>
                    <span style={{ background: '#f0f0f1', padding: '2px 8px', borderRadius: '3px', fontWeight: 600, fontSize: '12px' }}>
                      {c.totalOrders} Orders
                    </span>
                  </td>
                  <td style={{ fontWeight: 700, color: '#15803D' }}>₹{c.totalSpent.toLocaleString('en-IN')}</td>
                  <td style={{ fontSize: '12px', color: '#64748b' }}>{c.joinedDate}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 2. REVIEWS & COMMENTS MODERATION TABLE */}
      {/* ========================================================================= */}
      {activeTab === 'reviews' && (
        <div className="wp-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #c3c4c7' }}>
          <table className="wp-list-table">
            <thead>
              <tr>
                <th style={{ width: '160px' }}>Author</th>
                <th>Comment</th>
                <th style={{ width: '180px' }}>In Response To</th>
                <th style={{ width: '90px' }}>Rating</th>
                <th style={{ width: '110px' }}>Submitted On</th>
              </tr>
            </thead>
            <tbody>
              {filteredReviews.map((r) => (
                <tr key={r.id}>
                  {/* Author */}
                  <td>
                    <strong style={{ color: '#1d2327' }}>{r.customerName}</strong>
                    <div className="row-actions">
                      {r.status !== 'Approved' ? (
                        <span style={{ color: '#008a20', cursor: 'pointer' }} onClick={() => handleUpdateReviewStatus(r.id, 'Approved')}>Approve</span>
                      ) : (
                        <span style={{ color: '#d63638', cursor: 'pointer' }} onClick={() => handleUpdateReviewStatus(r.id, 'Hidden')}>Unapprove</span>
                      )}
                      <span style={{ color: '#ddd' }}>|</span>
                      <span style={{ color: '#a00', cursor: 'pointer' }} onClick={() => handleUpdateReviewStatus(r.id, 'Hidden')}>Trash</span>
                    </div>
                  </td>

                  {/* Comment */}
                  <td style={{ color: '#374151', fontSize: '13px', lineHeight: 1.5 }}>
                    {r.comment}
                  </td>

                  {/* Product */}
                  <td>
                    <span style={{ color: '#2271b1', fontWeight: 500 }}>{r.productName}</span>
                  </td>

                  {/* Rating */}
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '2px', color: '#f59e0b' }}>
                      {[...Array(r.rating || 5)].map((_, i) => (
                        <Star key={i} size={13} fill="#f59e0b" />
                      ))}
                    </div>
                  </td>

                  {/* Date */}
                  <td style={{ fontSize: '12px', color: '#64748b' }}>
                    {r.createdAt}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}

    </div>
  );
};
