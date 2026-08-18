import React, { useState } from 'react';
import { adminStore } from '../../data/adminStore';
import { Lock, User, ShieldCheck, ArrowRight, AlertCircle, Eye, EyeOff } from 'lucide-react';

interface AdminLoginProps {
  onSuccess: () => void;
  onGoToStore: () => void;
}

export const AdminLogin: React.FC<AdminLoginProps> = ({ onSuccess, onGoToStore }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage('');
    setIsSubmitting(true);

    setTimeout(() => {
      const res = adminStore.login(username, password);
      setIsSubmitting(false);
      if (res.success) {
        onSuccess();
      } else {
        setErrorMessage(res.message);
      }
    }, 400);
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        width: '100vw',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#f0f0f1',
        fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen-Sans, Ubuntu, Cantarell, 'Helvetica Neue', sans-serif",
        padding: '1.5rem',
        boxSizing: 'border-box'
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '380px',
          background: '#ffffff',
          border: '1px solid #c3c4c7',
          borderRadius: '4px',
          padding: '26px 24px',
          boxShadow: '0 1px 3px rgba(0, 0, 0, 0.04)',
          color: '#1d2327',
          textAlign: 'left'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '22px' }}>
          <div
            style={{
              width: '50px',
              height: '50px',
              margin: '0 auto 10px auto',
              background: '#2271b1',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              color: '#ffffff'
            }}
          >
            <ShieldCheck size={28} />
          </div>
          <h2 style={{ margin: '0 0 4px 0', fontSize: '18px', fontWeight: 700, color: '#1d2327' }}>
            RTC Admin Panel
          </h2>
          <p style={{ margin: 0, color: '#646970', fontSize: '13px' }}>
            Log in to manage catalog, inventory & orders
          </p>
        </div>

        {errorMessage && (
          <div
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              background: '#fcf0f1',
              borderLeft: '4px solid #d63638',
              padding: '10px 12px',
              color: '#d63638',
              fontSize: '13px',
              marginBottom: '16px'
            }}
          >
            <AlertCircle size={16} style={{ flexShrink: 0 }} />
            <span>{errorMessage}</span>
          </div>
        )}

        <form onSubmit={handleSubmit} style={{ textAlign: 'left' }}>
          <div style={{ marginBottom: '16px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 400, color: '#1d2327', marginBottom: '6px', textAlign: 'left' }}>
              Username or Email Address
            </label>
            <div style={{ position: 'relative' }}>
              <User size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#646970' }} />
              <input
                type="text"
                required
                style={{ width: '100%', paddingLeft: '32px', paddingRight: '10px', height: '40px', background: '#ffffff', color: '#1d2327', border: '1px solid #8c8f94', borderRadius: '4px', fontSize: '14px', fontWeight: 400, boxSizing: 'border-box', outline: 'none' }}
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="Username"
              />
            </div>
          </div>

          <div style={{ marginBottom: '20px', textAlign: 'left' }}>
            <label style={{ display: 'block', fontSize: '13px', fontWeight: 400, color: '#1d2327', marginBottom: '6px', textAlign: 'left' }}>
              Password
            </label>
            <div style={{ position: 'relative' }}>
              <Lock size={16} style={{ position: 'absolute', left: '10px', top: '50%', transform: 'translateY(-50%)', color: '#646970' }} />
              <input
                type={showPassword ? 'text' : 'password'}
                required
                style={{ width: '100%', paddingLeft: '32px', paddingRight: '36px', height: '40px', background: '#ffffff', color: '#1d2327', border: '1px solid #8c8f94', borderRadius: '4px', fontSize: '14px', fontWeight: 400, boxSizing: 'border-box', outline: 'none' }}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="Password"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: 'absolute',
                  right: '10px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'none',
                  border: 'none',
                  padding: 0,
                  cursor: 'pointer',
                  color: '#646970',
                  display: 'flex',
                  alignItems: 'center'
                }}
                title={showPassword ? 'Hide Password' : 'Show Password'}
              >
                {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
              </button>
            </div>
          </div>

          <button
            type="submit"
            disabled={isSubmitting}
            style={{
              width: '100%',
              height: '40px',
              background: '#2271b1',
              border: 'none',
              borderRadius: '4px',
              color: '#ffffff',
              fontSize: '14px',
              fontWeight: 600,
              cursor: isSubmitting ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '6px'
            }}
          >
            {isSubmitting ? 'Logging in...' : 'Sign In to Admin Panel'} <ArrowRight size={16} />
          </button>
        </form>

        <div style={{ textAlign: 'center', marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #f0f0f1' }}>
          <button
            type="button"
            onClick={onGoToStore}
            style={{ background: 'none', border: 'none', color: '#2271b1', fontSize: '13px', cursor: 'pointer', textDecoration: 'underline', padding: 0 }}
          >
            ← Return to Customer Storefront
          </button>
        </div>
      </div>
    </div>
  );
};
