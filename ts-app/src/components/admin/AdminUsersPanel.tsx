import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AdminUserAccount } from '../../data/adminStore';
import { Plus, Trash2, Check, AlertCircle, X, User } from 'lucide-react';

export const AdminUsersPanel: React.FC = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [usernameInput, setUsernameInput] = useState('');
  const [passwordInput, setPasswordInput] = useState('');
  const [fullNameInput, setFullNameInput] = useState('');
  const [emailInput, setEmailInput] = useState('');
  const [roleInput, setRoleInput] = useState<AdminUserAccount['role']>('Order Manager');
  const [errorMessage, setErrorMessage] = useState('');
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const accounts = adminStore.adminAccounts;

  const handleCreateAccount = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');

    try {
      adminStore.createAdminUser({
        username: usernameInput.trim(),
        password: passwordInput,
        fullName: fullNameInput.trim() || usernameInput.trim(),
        role: roleInput
      });

      setUsernameInput('');
      setPasswordInput('');
      setFullNameInput('');
      setEmailInput('');
      setIsModalOpen(false);
      setSaveStatus({ type: 'success', message: 'New user added successfully.' });
      setTimeout(() => setSaveStatus(null), 3000);
    } catch (err: any) {
      setErrorMessage(err.message || 'Failed to create account');
    }
  };

  const handleToggleAccess = (id: string) => {
    adminStore.toggleAdminUserAccess(id);
  };

  const handleDeleteAccount = (id: string, username: string) => {
    if (window.confirm(`Are you sure you want to delete user "${username}"?`)) {
      try {
        adminStore.deleteAdminUser(id);
        setSaveStatus({ type: 'success', message: 'User deleted.' });
        setTimeout(() => setSaveStatus(null), 3000);
      } catch (err: any) {
        alert(err.message);
      }
    }
  };

  return (
    <div className="admin-users-panel" style={{ textAlign: 'left' }}>
      
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

      {/* Header */}
      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
        <h1 className="wp-page-title" style={{ margin: 0 }}>Users</h1>
        <button className="wp-button-secondary" onClick={() => setIsModalOpen(true)} style={{ fontWeight: 600 }}>
          Add New User
        </button>
      </div>

      {/* Users Table */}
      <div className="wp-card" style={{ padding: 0, overflow: 'hidden', border: '1px solid #c3c4c7' }}>
        <table className="wp-list-table">
          <thead>
            <tr>
              <th>Username</th>
              <th>Name</th>
              <th>Email</th>
              <th>Role</th>
              <th>Status</th>
              <th>Created Date</th>
              <th style={{ textAlign: 'right', width: '80px' }}>Actions</th>
            </tr>
          </thead>
          <tbody>
            {accounts.map((acc) => (
              <tr key={acc.id}>
                {/* Username */}
                <td>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ width: '28px', height: '28px', borderRadius: '50%', background: '#2271b1', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '12px', fontWeight: 700 }}>
                      {acc.username.charAt(0).toUpperCase()}
                    </div>
                    <div>
                      <strong style={{ color: '#2271b1', cursor: 'pointer' }}>{acc.username}</strong>
                      <div className="row-actions">
                        <span style={{ color: '#555', cursor: 'pointer' }} onClick={() => handleToggleAccess(acc.id)}>
                          {acc.isActive ? 'Deactivate' : 'Activate'}
                        </span>
                        {accounts.length > 1 && (
                          <>
                            <span style={{ color: '#ddd' }}>|</span>
                            <span style={{ color: '#a00', cursor: 'pointer' }} onClick={() => handleDeleteAccount(acc.id, acc.username)}>Delete</span>
                          </>
                        )}
                      </div>
                    </div>
                  </div>
                </td>

                {/* Name */}
                <td>{acc.fullName}</td>

                {/* Email */}
                <td style={{ color: '#50575e' }}>{acc.username.toLowerCase()}@rtcfoods.in</td>

                {/* Role */}
                <td>
                  <span style={{ background: '#f0f0f1', padding: '3px 8px', borderRadius: '3px', fontSize: '12px', fontWeight: 600, color: '#1d2327' }}>
                    {acc.role}
                  </span>
                </td>

                {/* Status */}
                <td>
                  {acc.isActive ? (
                    <span style={{ color: '#008a20', fontWeight: 600, fontSize: '12px' }}>Active</span>
                  ) : (
                    <span style={{ color: '#d63638', fontWeight: 600, fontSize: '12px' }}>Suspended</span>
                  )}
                </td>

                {/* Date */}
                <td style={{ fontSize: '12px', color: '#64748b' }}>{acc.createdAt}</td>

                {/* Actions */}
                <td style={{ textAlign: 'right' }}>
                  {accounts.length > 1 && (
                    <button
                      type="button"
                      onClick={() => handleDeleteAccount(acc.id, acc.username)}
                      style={{ background: 'none', border: 'none', color: '#a00', cursor: 'pointer', padding: '4px' }}
                      title="Delete User"
                    >
                      <Trash2 size={15} />
                    </button>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Add User Modal */}
      {isModalOpen && (
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
              maxWidth: '480px',
              borderRadius: '3px',
              boxShadow: '0 4px 24px rgba(0,0,0,0.2)',
              overflow: 'hidden'
            }}
            onClick={(e) => e.stopPropagation()}
          >
            <div style={{ padding: '14px 18px', borderBottom: '1px solid #c3c4c7', background: '#f6f7f7', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <h3 style={{ margin: 0, fontSize: '14px', fontWeight: 600 }}>Add New User</h3>
              <button onClick={() => setIsModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer' }}>
                <X size={16} />
              </button>
            </div>

            <form onSubmit={handleCreateAccount} style={{ padding: '20px', display: 'flex', flexDirection: 'column', gap: '14px' }}>
              {errorMessage && (
                <div style={{ background: '#fcf0f1', borderLeft: '4px solid #d63638', padding: '8px 12px', fontSize: '13px', color: '#d63638' }}>
                  {errorMessage}
                </div>
              )}

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Username (required) *</label>
                <input
                  type="text"
                  required
                  placeholder="e.g. manager1"
                  value={usernameInput}
                  onChange={(e) => setUsernameInput(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Full Name</label>
                <input
                  type="text"
                  placeholder="e.g. Rajesh Sharma"
                  value={fullNameInput}
                  onChange={(e) => setFullNameInput(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Password *</label>
                <input
                  type="text"
                  required
                  placeholder="Enter strong password..."
                  value={passwordInput}
                  onChange={(e) => setPasswordInput(e.target.value)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '12px', fontWeight: 600, marginBottom: '4px' }}>Role</label>
                <select
                  value={roleInput}
                  onChange={(e) => setRoleInput(e.target.value as any)}
                  style={{ width: '100%', boxSizing: 'border-box' }}
                >
                  <option value="Super Admin">Administrator (Super Admin)</option>
                  <option value="Order Manager">Shop Manager (Orders & Inventory)</option>
                  <option value="Catalog Manager">Author (Catalog & Blog)</option>
                </select>
              </div>

              <div style={{ padding: '12px 0 0 0', borderTop: '1px solid #f0f0f1', display: 'flex', justifyContent: 'flex-end', gap: '8px', marginTop: '8px' }}>
                <button type="button" className="wp-button-secondary" onClick={() => setIsModalOpen(false)}>Cancel</button>
                <button type="submit" className="wp-button-primary">Add New User</button>
              </div>
            </form>
          </div>
        </div>
      )}

    </div>
  );
};
