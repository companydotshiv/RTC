import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AdminReview } from '../../data/adminStore';
import { Users, Star, CheckCircle, EyeOff, Search } from 'lucide-react';

export const CustomersReviewsPanel: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'customers' | 'reviews'>('customers');
  const [searchTerm, setSearchTerm] = useState('');

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
  };

  return (
    <div className="customers-reviews-panel">
      {/* Tab Switcher & Search */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', flexWrap: 'wrap', gap: '1rem' }}>
        <div style={{ display: 'flex', gap: '0.5rem', background: 'var(--admin-bg-secondary)', padding: '0.35rem', borderRadius: '10px', border: '1px solid var(--admin-border-color)' }}>
          <button
            className={`admin-btn ${activeTab === 'customers' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            onClick={() => setActiveTab('customers')}
          >
            <Users size={16} /> Customers Directory ({customers.length})
          </button>
          <button
            className={`admin-btn ${activeTab === 'reviews' ? 'admin-btn-primary' : 'admin-btn-secondary'}`}
            onClick={() => setActiveTab('reviews')}
          >
            <Star size={16} /> Review Moderation ({reviews.length})
          </button>
        </div>

        <div className="admin-header-search" style={{ width: '280px' }}>
          <Search size={18} />
          <input
            type="text"
            placeholder={activeTab === 'customers' ? 'Search customers by name or city...' : 'Search reviews by product...'}
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {activeTab === 'customers' ? (
        <div className="admin-card">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Customer Name</th>
                  <th>Email & Phone</th>
                  <th>City</th>
                  <th>Total Orders</th>
                  <th>Total Spent</th>
                  <th>Member Since</th>
                </tr>
              </thead>
              <tbody>
                {filteredCustomers.map((c) => (
                  <tr key={c.id}>
                    <td>
                      <div style={{ fontWeight: 700 }}>{c.name}</div>
                    </td>
                    <td>
                      <div style={{ fontSize: '0.85rem' }}>{c.email}</div>
                      <div style={{ fontSize: '0.75rem', color: 'var(--admin-text-muted)' }}>{c.phone}</div>
                    </td>
                    <td>{c.city}</td>
                    <td>
                      <span className="status-pill info">{c.totalOrders} Orders</span>
                    </td>
                    <td style={{ fontWeight: 700, color: '#34d399' }}>₹{c.totalSpent.toLocaleString('en-IN')}</td>
                    <td style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>{c.joinedDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ) : (
        <div className="admin-card">
          <div className="admin-table-container">
            <table className="admin-table">
              <thead>
                <tr>
                  <th>Product</th>
                  <th>Customer</th>
                  <th>Rating</th>
                  <th>Review Comment</th>
                  <th>Date</th>
                  <th>Status</th>
                  <th style={{ textAlign: 'right' }}>Moderation Actions</th>
                </tr>
              </thead>
              <tbody>
                {filteredReviews.map((r) => (
                  <tr key={r.id}>
                    <td style={{ fontWeight: 600, color: '#38bdf8' }}>{r.productName}</td>
                    <td>{r.customerName}</td>
                    <td>⭐ {r.rating}/5</td>
                    <td style={{ maxWidth: '300px', fontSize: '0.85rem' }}>"{r.comment}"</td>
                    <td style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>{r.createdAt}</td>
                    <td>
                      <span className={`status-pill ${r.status === 'Approved' ? 'success' : r.status === 'Pending' ? 'warning' : 'danger'}`}>
                        {r.status}
                      </span>
                    </td>
                    <td style={{ textAlign: 'right' }}>
                      <div style={{ display: 'flex', gap: '0.5rem', justifyContent: 'flex-end' }}>
                        {r.status !== 'Approved' && (
                          <button className="admin-btn admin-btn-primary admin-btn-sm" onClick={() => handleUpdateReviewStatus(r.id, 'Approved')}>
                            <CheckCircle size={14} /> Approve
                          </button>
                        )}
                        {r.status !== 'Hidden' && (
                          <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleUpdateReviewStatus(r.id, 'Hidden')}>
                            <EyeOff size={14} /> Hide
                          </button>
                        )}
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};
