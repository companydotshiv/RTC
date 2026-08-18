import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import type { AnnouncementConfig, PopupConfig } from '../../data/adminStore';
import { Megaphone, LayoutList, Save, Power } from 'lucide-react';

export const AnnouncementsPanel: React.FC = () => {
  const announcement = adminStore.announcement;
  const popup = adminStore.popup;

  const [annForm, setAnnForm] = useState<AnnouncementConfig>({ ...announcement });
  const [popForm, setPopForm] = useState<PopupConfig>({ ...popup });

  const handleSaveAnnouncement = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updateAnnouncement(annForm);
    alert('Top Announcement Header Ticker Updated!');
  };

  const handleSavePopup = (e: React.FormEvent) => {
    e.preventDefault();
    adminStore.updatePopup(popForm);
    alert('Promotional Popup Modal Settings Updated!');
  };

  return (
    <div className="announcements-panel">
      {/* Top Header Announcement Ticker Bar */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <Megaphone size={20} color="#38bdf8" /> Top Announcement Ticker Bar
          </h3>
          <button
            className={`status-pill ${annForm.isActive ? 'success' : 'danger'}`}
            style={{ border: 'none', cursor: 'pointer' }}
            onClick={() => {
              const updated = !annForm.isActive;
              setAnnForm({ ...annForm, isActive: updated });
              adminStore.updateAnnouncement({ isActive: updated });
            }}
          >
            <Power size={12} /> {annForm.isActive ? 'Active on Store' : 'Hidden'}
          </button>
        </div>

        {/* Live Preview Bar */}
        <div
          style={{
            padding: '0.75rem 1rem',
            borderRadius: '8px',
            backgroundColor: annForm.bgColor,
            color: annForm.textColor,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '0.75rem',
            fontSize: '0.85rem',
            fontWeight: 600,
            marginBottom: '1.5rem'
          }}
        >
          <span>{annForm.text}</span>
          {annForm.linkText && (
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>{annForm.linkText} →</span>
          )}
        </div>

        <form onSubmit={handleSaveAnnouncement} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Ticker Message Text</label>
            <input
              type="text"
              required
              className="admin-form-control"
              value={annForm.text}
              onChange={(e) => setAnnForm({ ...annForm, text: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Call-to-Action Link Text</label>
            <input
              type="text"
              className="admin-form-control"
              value={annForm.linkText || ''}
              onChange={(e) => setAnnForm({ ...annForm, linkText: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Background Color</label>
            <input
              type="color"
              className="admin-form-control"
              style={{ height: '42px', padding: '0.2rem' }}
              value={annForm.bgColor}
              onChange={(e) => setAnnForm({ ...annForm, bgColor: e.target.value })}
            />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <Save size={16} /> Update Announcement Ticker
            </button>
          </div>
        </form>
      </div>

      {/* Promotional Popup Builder */}
      <div className="admin-card">
        <div className="admin-card-header">
          <h3 className="admin-card-title">
            <LayoutList size={20} color="#fbbf24" /> Promotional Lead Popup Modal
          </h3>
          <button
            className={`status-pill ${popForm.isActive ? 'success' : 'danger'}`}
            style={{ border: 'none', cursor: 'pointer' }}
            onClick={() => {
              const updated = !popForm.isActive;
              setPopForm({ ...popForm, isActive: updated });
              adminStore.updatePopup({ isActive: updated });
            }}
          >
            <Power size={12} /> {popForm.isActive ? 'Active' : 'Disabled'}
          </button>
        </div>

        <form onSubmit={handleSavePopup} style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))', gap: '1.25rem' }}>
          <div className="admin-form-group">
            <label>Popup Headline Title</label>
            <input
              type="text"
              required
              className="admin-form-control"
              value={popForm.title}
              onChange={(e) => setPopForm({ ...popForm, title: e.target.value })}
            />
          </div>

          <div className="admin-form-group">
            <label>Attached Promo Coupon Code</label>
            <input
              type="text"
              className="admin-form-control"
              style={{ textTransform: 'uppercase' }}
              value={popForm.couponCode || ''}
              onChange={(e) => setPopForm({ ...popForm, couponCode: e.target.value.toUpperCase() })}
            />
          </div>

          <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Image URL</label>
            <input
              type="url"
              className="admin-form-control"
              value={popForm.imageUrl}
              onChange={(e) => setPopForm({ ...popForm, imageUrl: e.target.value })}
            />
          </div>

          <div className="admin-form-group" style={{ gridColumn: '1 / -1' }}>
            <label>Description / Subtext</label>
            <textarea
              className="admin-form-control"
              rows={2}
              value={popForm.description}
              onChange={(e) => setPopForm({ ...popForm, description: e.target.value })}
            />
          </div>

          <div style={{ gridColumn: '1 / -1', display: 'flex', justifyContent: 'flex-end' }}>
            <button type="submit" className="admin-btn admin-btn-primary">
              <Save size={16} /> Save Popup Settings
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};
