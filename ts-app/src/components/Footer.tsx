import React from 'react';

interface FooterProps {
  setCurrentView: (view: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ setCurrentView }) => {
  return (
    <footer id="footer-contact" style={{ background: '#0F1710', color: '#FFFFFF', padding: '60px 0 0 0', position: 'relative', textAlign: 'left' }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr 1fr 1fr 1.8fr', gap: '30px', paddingBottom: '40px', textAlign: 'left' }}>
          
          {/* Column 1: Logo & Social Icons */}
          <div style={{ textAlign: 'left' }}>
            <div style={{ marginBottom: '24px', textAlign: 'left' }}>
              <img src="/footer_rtc_logo.png" alt="RTC Foods" style={{ height: '54px', width: 'auto', objectFit: 'contain' }} />
            </div>
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center', justifyContent: 'flex-start' }}>
              <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: '#FFFFFF', opacity: 0.9 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M22.675 0h-21.35c-.732 0-1.325.593-1.325 1.325v21.351c0 .731.593 1.324 1.325 1.324h11.495v-9.294h-3.128v-3.622h3.128v-2.671c0-3.1 1.893-4.788 4.659-4.788 1.325 0 2.463.099 2.795.143v3.24l-1.918.001c-1.504 0-1.795.715-1.795 1.763v2.313h3.587l-.467 3.622h-3.12v9.293h6.116c.73 0 1.323-.593 1.323-1.325v-21.35c0-.732-.593-1.325-1.325-1.325z"/>
                </svg>
              </a>
              <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: '#FFFFFF', opacity: 0.9 }}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor">
                  <path d="M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z"/>
                </svg>
              </a>
            </div>
          </div>

          {/* Column 2: SUPPORT */}
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '18px', textTransform: 'uppercase', textAlign: 'left' }}>
              SUPPORT
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', textAlign: 'left' }}>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link">Shipping Policy</a></li>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link">Privacy Policy</a></li>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link">Returns & Cancellation</a></li>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link">Terms & Conditions</a></li>
            </ul>
          </div>

          {/* Column 3: SHOP */}
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '18px', textTransform: 'uppercase', textAlign: 'left' }}>
              SHOP
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', textAlign: 'left' }}>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>Dry fruits</a></li>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>Dehydrated Fruits</a></li>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>Fusions</a></li>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>Spices</a></li>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>Seeds</a></li>
            </ul>
          </div>

          {/* Column 4: COMPANY */}
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '18px', textTransform: 'uppercase', textAlign: 'left' }}>
              COMPANY
            </h4>
            <ul style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem', textAlign: 'left' }}>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}>About Us</a></li>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link">Certificate</a></li>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link">FAQs</a></li>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link">Blog</a></li>
              <li style={{ textAlign: 'left' }}><a href="#" className="footer-hover-link" onClick={(e) => { e.preventDefault(); setCurrentView('home'); }}>Contact Us</a></li>
            </ul>
          </div>

          {/* Column 5: CONTACT */}
          <div style={{ textAlign: 'left' }}>
            <h4 style={{ color: '#FFFFFF', fontSize: '0.95rem', fontWeight: 700, letterSpacing: '0.5px', marginBottom: '18px', textTransform: 'uppercase', textAlign: 'left' }}>
              CONTACT
            </h4>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', fontSize: '0.86rem', color: 'rgba(255,255,255,0.9)', lineHeight: 1.5, textAlign: 'left' }}>
              <div>+91-89291 91914</div>
              <div>Email: info@rtcfoods.in</div>
              <div>Head Office:</div>
              <div>1040,1st Floor,Gandhi Gali,</div>
              <div>Khari Baoli, Delhi-6</div>
              <div>Facility: Phase-V, HSIIDC, 163,</div>
              <div>Sector-53, Industrial Area, Kundli,</div>
              <div>Sonipat,Haryana 131028, India</div>
            </div>
          </div>

        </div>

        {/* Bottom Bar: Copyright */}
        <div style={{ borderTop: '1px solid rgba(255,255,255,0.2)', padding: '20px 0', fontSize: '0.85rem', color: 'rgba(255,255,255,0.85)', textAlign: 'left' }}>
          © 2026 All rights reserved.
        </div>
      </div>

      {/* WhatsApp Floating Action Button bottom left */}
      <a
        href="https://wa.me/918929191914"
        target="_blank"
        rel="noreferrer"
        style={{
          position: 'fixed',
          bottom: '20px',
          left: '20px',
          width: '54px',
          height: '54px',
          backgroundColor: '#25D366',
          borderRadius: '50%',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          boxShadow: '0 4px 12px rgba(0,0,0,0.3)',
          zIndex: 9999,
          transition: 'transform 0.2s ease'
        }}
        onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.1)'}
        onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1.0)'}
        title="Chat on WhatsApp"
      >
        <svg width="32" height="32" viewBox="0 0 24 24" fill="#FFFFFF">
          <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-0.999 3.648 3.742-0.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.149-.173.198-.297.297-.495.099-.198.05-.372-.025-.521-.074-.149-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
        </svg>
      </a>
    </footer>
  );
};
