import React from 'react';
import { adminStore } from '../../data/adminStore';
import { ShieldCheck, History, UserCheck } from 'lucide-react';

export const SecurityAuditPanel: React.FC = () => {
  const currentRole = adminStore.currentRole;
  const auditLogs = adminStore.auditLogs;

  const handleSwitchRole = (role: typeof currentRole) => {
    adminStore.currentRole = role;
    adminStore.logAction('Role Switch', `Switched active role to ${role}`);
  };

  return (
    <div className="security-audit-panel">
      {/* Role Management Card */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <ShieldCheck size={20} color="#38bdf8" /> Admin Roles & Access Control
          </h3>
        </div>

        <p style={{ color: 'var(--admin-text-muted)', fontSize: '0.85rem', marginBottom: '1.25rem' }}>
          Select an active admin role to test granular access control and permission enforcement.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          {[
            {
              role: 'Super Admin' as const,
              desc: 'Full access to Products, Orders, Refunds, Coupons, Shipping & System Settings.',
              color: '#38bdf8'
            },
            {
              role: 'Order Manager' as const,
              desc: 'Access to Orders, Shipping, Courier tracking, and Customer Refunds.',
              color: '#34d399'
            },
            {
              role: 'Catalog Manager' as const,
              desc: 'Access to Product catalog, Stock updates, Categories, and Banners.',
              color: '#fbbf24'
            }
          ].map((r) => (
            <div
              key={r.role}
              onClick={() => handleSwitchRole(r.role)}
              style={{
                background: currentRole === r.role ? 'rgba(2, 132, 199, 0.15)' : 'rgba(15, 23, 42, 0.5)',
                border: `1px solid ${currentRole === r.role ? r.color : 'var(--admin-border-color)'}`,
                borderRadius: '10px',
                padding: '1.25rem',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '0.5rem' }}>
                <h4 style={{ margin: 0, color: r.color, fontSize: '1rem' }}>{r.role}</h4>
                {currentRole === r.role && <UserCheck size={18} color={r.color} />}
              </div>
              <p style={{ margin: 0, fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>{r.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Activity Audit Log */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <History size={20} color="#fbbf24" /> System Audit & Activity Log
          </h3>
          <span className="status-pill info">{auditLogs.length} Total Logs Recorded</span>
        </div>

        <div className="admin-table-container">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Timestamp</th>
                <th>Admin Role</th>
                <th>Action Performed</th>
                <th>Details</th>
              </tr>
            </thead>
            <tbody>
              {auditLogs.map((log) => (
                <tr key={log.id}>
                  <td style={{ fontSize: '0.8rem', color: 'var(--admin-text-muted)' }}>{log.timestamp}</td>
                  <td>
                    <span className="status-pill info">{log.role}</span>
                  </td>
                  <td style={{ fontWeight: 600, color: '#38bdf8' }}>{log.action}</td>
                  <td style={{ fontSize: '0.85rem' }}>{log.details}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
