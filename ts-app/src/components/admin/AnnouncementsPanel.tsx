import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AnnouncementConfig } from '../../data/adminStore';
import { Megaphone, Check, AlertCircle } from 'lucide-react';

export const AnnouncementsPanel: React.FC = () => {
  const announcement = adminStore.announcement;
  const [annForm, setAnnForm] = useState<AnnouncementConfig>({ ...announcement });
  const [saveStatus, setSaveStatus] = useState<{ type: 'success' | 'error'; message: string } | null>(null);

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateAnnouncement(annForm);
    setSaveStatus({ type: 'success', message: 'Announcement bar settings updated.' });
    setTimeout(() => setSaveStatus(null), 3000);
  };

  return (
    <div className="announcements-panel" style={{ textAlign: 'left', maxWidth: '850px' }}>
      
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

      <h1 className="wp-page-title">Announcement Bar Settings</h1>
      <p style={{ color: '#50575e', fontSize: '13px', margin: '-8px 0 20px 0' }}>
        Configure top header notification ribbon message, background theme color, and active visibility.
      </p>

      {/* Live Preview Card */}
      <div className="wp-card" style={{ padding: '16px', marginBottom: '20px' }}>
        <div style={{ fontSize: '12px', fontWeight: 600, color: '#64748b', marginBottom: '8px', textTransform: 'uppercase', letterSpacing: '0.5px' }}>
          Live Storefront Preview
        </div>
        <div
          style={{
            padding: '10px 16px',
            borderRadius: '4px',
            backgroundColor: annForm.bgColor || '#15803D',
            color: annForm.textColor || '#ffffff',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '12px',
            fontSize: '13px',
            fontWeight: 600,
            boxShadow: '0 2px 6px rgba(0,0,0,0.06)'
          }}
        >
          <span>{annForm.text || 'Enter announcement message...'}</span>
          {annForm.linkText && (
            <span style={{ textDecoration: 'underline', cursor: 'pointer', fontSize: '12px' }}>{annForm.linkText} →</span>
          )}
        </div>
      </div>

      {/* Form Card */}
      <form onSubmit={handleSaveAnnouncement} className="wp-card" style={{ padding: '24px' }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
          
          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'start', gap: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327', marginTop: '6px' }}>
              Announcement text *
            </label>
            <div style={{ width: '100%' }}>
              <input
                type="text"
                required
                value={annForm.text}
                onChange={(e) => setAnnForm({ ...annForm, text: e.target.value })}
                placeholder="e.g. ✨ FLAT 20% OFF on all Dry Fruits & Spices | Code: WELCOME20"
                style={{ width: '100%', boxSizing: 'border-box' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'start', gap: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327', marginTop: '6px' }}>
              Action link text (optional)
            </label>
            <div>
              <input
                type="text"
                value={annForm.linkText || ''}
                onChange={(e) => setAnnForm({ ...annForm, linkText: e.target.value })}
                placeholder="e.g. Shop Festive Range"
                style={{ width: '240px' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'start', gap: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327', marginTop: '6px' }}>
              Banner background color
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="color"
                value={annForm.bgColor || '#15803D'}
                onChange={(e) => setAnnForm({ ...annForm, bgColor: e.target.value })}
                style={{ width: '40px', height: '34px', padding: 0, cursor: 'pointer', border: '1px solid #c3c4c7', borderRadius: '3px' }}
              />
              <input
                type="text"
                value={annForm.bgColor || '#15803D'}
                onChange={(e) => setAnnForm({ ...annForm, bgColor: e.target.value })}
                style={{ width: '110px', fontFamily: 'monospace' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'start', gap: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327', marginTop: '6px' }}>
              Text font color
            </label>
            <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
              <input
                type="color"
                value={annForm.textColor || '#ffffff'}
                onChange={(e) => setAnnForm({ ...annForm, textColor: e.target.value })}
                style={{ width: '40px', height: '34px', padding: 0, cursor: 'pointer', border: '1px solid #c3c4c7', borderRadius: '3px' }}
              />
              <input
                type="text"
                value={annForm.textColor || '#ffffff'}
                onChange={(e) => setAnnForm({ ...annForm, textColor: e.target.value })}
                style={{ width: '110px', fontFamily: 'monospace' }}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '200px 1fr', alignItems: 'center', gap: '16px' }}>
            <label style={{ fontSize: '13px', fontWeight: 600, color: '#1d2327' }}>
              Display status
            </label>
            <label style={{ display: 'flex', alignItems: 'center', gap: '6px', cursor: 'pointer', fontSize: '13px' }}>
              <input
                type="checkbox"
                checked={annForm.isActive}
                onChange={(e) => setAnnForm({ ...annForm, isActive: e.target.checked })}
              />
              <span>Enable announcement bar on top of website</span>
            </label>
          </div>

        </div>

        <div style={{ marginTop: '24px', paddingTop: '16px', borderTop: '1px solid #f0f0f1' }}>
          <button type="submit" className="wp-button-primary" style={{ padding: '7px 18px', fontWeight: 700 }}>
            Save changes
          </button>
        </div>
      </form>

    </div>
  );
};
