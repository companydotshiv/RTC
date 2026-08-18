import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AdminUserAccount } from '../../data/adminStore';
import { UserPlus, Power, Trash2, ShieldCheck, X } from 'lucide-react';

export const AdminUsersPanel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [roleInput, setRoleInput] = useState<AdminUserAccount['role']>('Order Manager');
  const [errorMessage, setErrorMessage] = useState('');

  const accounts = adminStore.adminAccounts;

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      adminStore.createAdminUser({
        username: usernameInput,
        password: passwordInput,
        fullName: fullNameInput || usernameInput,
        role: roleInput
      });

      setUsernameInput('');
      setPasswordInput('');
      setFullNameInput('');
      setIsModalOpen(false);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create account');
    }
  };

  const handleToggleAccess = (id: string) => {
    adminStore.toggleAdminUserAccess(id);
  };

  const handleDeleteAccount = (id: string, username: string) => {
    if (window.confirm(`Are you sure you want to delete personnel account "${username}"?`)) {
      try {
        adminStore.deleteAdminUser(id);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="admin-users-panel">
      {/* Header */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem' }}>
        <div>
          <h2 style={{ margin: 0, fontSize: '1.25rem', fontWeight: 600 }}>Personnel Access Control & Accounts</h2>
          <p style={{ margin: '4px 0 0 0', color: 'var(--admin-text-muted)', fontSize: '0.85rem' }}>
            Create admin login credentials, assign operational roles, and activate/deactivate personnel access
          </p>
        </div>
        <button className="admin-btn admin-btn-primary" onClick={() => setIsModalOpen(true)}>
          <UserPlus size={16} /> Create Personnel Account
        </button>
      </div>

      {/* Accounts List Table */}
      <div className="admin-card">
        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Username</th>
                <th>Full Name</th>
                <th>Assigned Role</th>
                <th>Date Created</th>
                <th>Access Status</th>
                <th style={{ textAlign: 'right' }}>Actions</th>
              </tr>
            </thead>
            <tbody>
              {accounts.map((acc) => (
                <tr key={acc.id}>
                  <td>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
                      <ShieldCheck size={18} color="#38bdf8" />
                      <div>
                        <div style={{ fontWeight: 600, color: '#38bdf8' }}>{acc.username}</div>
                        {acc.username === 'Login1' && (
                          <span style={{ fontSize: '0.7rem', color: '#fbbf24', background: 'rgba(245, 158, 11, 0.15)', padding: '1px 6px', borderRadius: '4px' }}>
                            Master Personnel
                          </span>
                        )}
                      </div>
                    </div>
                  </td>
                  <td style={{ fontWeight: 500 }}>{acc.fullName}</td>
                  <td>
                    <span className="status-pill info">{acc.role}</span>
                  </td>
                  <td style={{ fontSize: '0.85rem', color: 'var(--admin-text-muted)' }}>{acc.createdAt}</td>
                  <td>
                    <button
                      className={`status-pill ${acc.isActive ? 'success' : 'danger'}`}
                      style={{ border: 'none', cursor: 'pointer' }}
                      onClick={() => handleToggleAccess(acc.id)}
                      title="Click to Activate / Deactivate access"
                    >
                      <Power size={12} /> {acc.isActive ? 'Active Access' : 'Deactivated'}
                    </button>
                  </td>
                  <td style={{ textAlign: 'right' }}>
                    {acc.username !== 'Login1' && (
                      <button className="admin-btn admin-btn-danger admin-btn-sm" onClick={() => handleDeleteAccount(acc.id, acc.username)}>
                        <Trash2 size={14} /> Remove
                      </button>
                    )}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Create Account Modal */}
      {isModalOpen && (
        <div className="admin-modal-overlay">
          <div className="admin-modal" style={{ maxWidth: '500px' }}>
            <div className="admin-modal-header">
              <h3>Create Personnel Account</h3>
              <button style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }} onClick={() => setIsModalOpen(false)}>
                <X size={20} />
              </button>
            </div>
            <form onSubmit={handleCreateAccount} className="admin-modal-body">
              {errorMessage && (
                <div style={{ color: '#f87171', background: 'rgba(239, 68, 68, 0.15)', padding: '0.6rem 0.8rem', borderRadius: '6px', fontSize: '0.85rem', marginBottom: '1rem' }}>
                  {errorMessage}
                </div>
              )}

              <div className="admin-form-group">
                <label>Login Username</label>
                <input
                  type="text"
                  required
                  className="admin-form-control"
                  placeholder="e.g. Manager1"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label>Login Password</label>
                <input
                  type="password"
                  required
                  className="admin-form-control"
                  placeholder="e.g. Pass@12345"
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label>Full Name</label>
                <input
                  type="text"
                  required
                  className="admin-form-control"
                  placeholder="e.g. Rajesh Kumar"
                  value={fullNameInput}
                  onChange={(e) => setFullNameInput(e.target.value)}
                />
              </div>

              <div className="admin-form-group">
                <label>Personnel Role & Permissions</label>
                <select
                  className="admin-form-control"
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value as AdminUserAccount['role'])}
                >
                  <option value="Super Admin">Super Admin (Full Access)</option>
                  <option value="Order Manager">Order Manager (Orders & Logistics)</option>
                  <option value="Catalog Manager">Catalog Manager (Products & Stock)</option>
                </select>
              </div>

              <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1.5rem' }}>
                <button type="button" className="admin-btn admin-btn-secondary" onClick={() => setIsModalOpen(false)}>
                  Cancel
                </button>
                <button type="submit" className="admin-btn admin-btn-primary">
                  Save Personnel Account
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};
