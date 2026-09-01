import React, { useState } from 'react';
import { ArrowLeft, Phone, Mail, MapPin, Clock, MessageSquare, Send, CheckCircle2, Building2, Factory } from 'lucide-react';

interface ContactUsPageProps {
  setCurrentView: (view: string) => void;
}

export const ContactUsPage: React.FC<ContactUsPageProps> = ({ setCurrentView }) => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    inquiryType: 'retail',
    message: ''
  });
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    setTimeout(() => {
      setFormData({ name: '', email: '', phone: '', inquiryType: 'retail', message: '' });
    }, 500);
  };

  return (
    <div style={{ background: '#FAF8F5', minHeight: '90vh', padding: '30px 0 80px 0', fontFamily: "'Jost', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Breadcrumb */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => setCurrentView('home')}
            style={{ background: 'none', border: 'none', color: '#007A3D', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          <div style={{ fontSize: '0.85rem', color: '#777' }}>
            <span onClick={() => setCurrentView('home')} style={{ cursor: 'pointer', color: '#007A3D' }}>Home</span>
            {' / '}
            <span style={{ color: '#222', fontWeight: 600 }}>Contact Us</span>
          </div>
        </div>

        {/* Hero Section */}
        <div style={{
          background: 'linear-gradient(135deg, #072e18 0%, #031c0e 100%)',
          borderRadius: '20px',
          padding: '50px 40px',
          color: '#FFF',
          marginBottom: '40px',
          boxShadow: '0 16px 40px rgba(0, 50, 20, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}>
          <div style={{ position: 'absolute', right: '-60px', top: '-60px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(212, 175, 55, 0.15)',
            color: '#F5D061',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            padding: '6px 18px',
            borderRadius: '30px',
            fontSize: '0.82rem',
            fontWeight: 700,
            letterSpacing: '1.5px',
            textTransform: 'uppercase',
            marginBottom: '16px'
          }}>
            <Phone size={14} /> GET IN TOUCH
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, margin: '0 0 16px 0', color: '#FFFFFF', lineHeight: 1.2 }}>
            We'd Love to Hear <span style={{ background: 'linear-gradient(135deg, #F5D061 0%, #D4AF37 50%, #FFE082 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>From You</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.12rem', maxWidth: '700px', margin: '0 auto', lineHeight: 1.6 }}>
            Whether you have a retail order inquiry, wish to explore wholesale bulk distribution, or need custom corporate gift hampers, our team is ready to assist you.
          </p>
        </div>

        {/* 4 Quick Contact Cards */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(260px, 1fr))',
          gap: '20px',
          marginBottom: '48px'
        }}>
          <div style={{ background: '#FFF', padding: '28px 24px', borderRadius: '16px', border: '1px solid #EAEAEA', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', textAlign: 'left' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007A3D', marginBottom: '16px' }}>
              <Phone size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111', margin: '0 0 6px 0' }}>Call / WhatsApp</h3>
            <p style={{ fontSize: '0.86rem', color: '#666', margin: '0 0 12px 0' }}>Mon – Sat, 10:00 AM – 7:00 PM IST</p>
            <a href="tel:+918929191914" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#007A3D', textDecoration: 'none', display: 'block' }}>
              +91-89291 91914
            </a>
          </div>

          <div style={{ background: '#FFF', padding: '28px 24px', borderRadius: '16px', border: '1px solid #EAEAEA', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', textAlign: 'left' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', marginBottom: '16px' }}>
              <Mail size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111', margin: '0 0 6px 0' }}>Email Us</h3>
            <p style={{ fontSize: '0.86rem', color: '#666', margin: '0 0 12px 0' }}>We respond within 24 business hours</p>
            <a href="mailto:info@rtcfoods.in" style={{ fontSize: '1.05rem', fontWeight: 700, color: '#007A3D', textDecoration: 'none', display: 'block' }}>
              info@rtcfoods.in
            </a>
          </div>

          <div style={{ background: '#FFF', padding: '28px 24px', borderRadius: '16px', border: '1px solid #EAEAEA', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', textAlign: 'left' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', marginBottom: '16px' }}>
              <Building2 size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111', margin: '0 0 6px 0' }}>Head Office</h3>
            <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.5, margin: 0 }}>
              1040, 1st Floor, Gandhi Gali, Khari Baoli, Delhi-110006, India
            </p>
          </div>

          <div style={{ background: '#FFF', padding: '28px 24px', borderRadius: '16px', border: '1px solid #EAEAEA', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', textAlign: 'left' }}>
            <div style={{ width: '46px', height: '46px', borderRadius: '12px', background: '#F5F3FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#7C3AED', marginBottom: '16px' }}>
              <Factory size={22} />
            </div>
            <h3 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#111', margin: '0 0 6px 0' }}>Processing Plant</h3>
            <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.5, margin: 0 }}>
              Phase-V, HSIIDC, 163, Sector-53, Industrial Area, Kundli, Sonipat, Haryana 131028
            </p>
          </div>
        </div>

        {/* Form & Map Section (2 Columns) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '36px', alignItems: 'start', marginBottom: '50px' }} className="contact-main-grid">
          
          {/* Left: Interactive Inquiry Form */}
          <div style={{ background: '#FFF', borderRadius: '20px', padding: '36px', border: '1px solid #EAEAEA', boxShadow: '0 4px 20px rgba(0,0,0,0.03)', textAlign: 'left' }}>
            <h2 style={{ fontSize: '1.6rem', fontWeight: 800, color: '#111', margin: '0 0 8px 0' }}>Send Us a Message</h2>
            <p style={{ color: '#666', fontSize: '0.92rem', marginBottom: '24px' }}>Fill out the form below and our representative will reach out to you promptly.</p>

            {isSubmitted ? (
              <div style={{ background: '#ECFDF5', border: '1px solid #6EE7B7', borderRadius: '12px', padding: '28px', textAlign: 'center' }}>
                <CheckCircle2 size={42} color="#059669" style={{ marginBottom: '12px' }} />
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#065F46', margin: '0 0 8px 0' }}>Message Sent Successfully!</h3>
                <p style={{ color: '#047857', fontSize: '0.94rem', margin: '0 0 16px 0' }}>
                  Thank you for reaching out to RTC Foods. Our support executive will contact you shortly.
                </p>
                <button
                  onClick={() => setIsSubmitted(false)}
                  style={{ background: '#007A3D', color: '#FFF', border: 'none', padding: '10px 20px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                >
                  Send Another Message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '18px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Your Full Name *</label>
                  <input
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    placeholder="e.g. Ramesh Gupta"
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.94rem', outline: 'none', background: '#FAFAFA' }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }} className="contact-form-two-col">
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="you@example.com"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.94rem', outline: 'none', background: '#FAFAFA' }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Phone Number *</label>
                    <input
                      type="tel"
                      required
                      value={formData.phone}
                      onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                      placeholder="+91 98765 43210"
                      style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.94rem', outline: 'none', background: '#FAFAFA' }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Inquiry Type</label>
                  <select
                    value={formData.inquiryType}
                    onChange={(e) => setFormData({ ...formData, inquiryType: e.target.value })}
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.94rem', outline: 'none', background: '#FAFAFA', cursor: 'pointer' }}
                  >
                    <option value="retail">Retail Order / Customer Support</option>
                    <option value="bulk">Wholesale & Bulk Supply (10kg+)</option>
                    <option value="private-label">Private Labeling & OEM Packaging</option>
                    <option value="gifting">Corporate & Wedding Gift Hampers</option>
                    <option value="export">Commercial Export Inquiry</option>
                  </select>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#374151', marginBottom: '6px' }}>Your Message *</label>
                  <textarea
                    rows={4}
                    required
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Describe your requirements, quantity estimates, or order details..."
                    style={{ width: '100%', padding: '12px 16px', borderRadius: '8px', border: '1px solid #D1D5DB', fontSize: '0.94rem', outline: 'none', background: '#FAFAFA', resize: 'vertical', fontFamily: 'inherit' }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    background: 'linear-gradient(135deg, #007A3D 0%, #004D26 100%)',
                    color: '#FFF',
                    border: 'none',
                    padding: '14px 28px',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    fontWeight: 700,
                    cursor: 'pointer',
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '8px',
                    boxShadow: '0 4px 14px rgba(0, 122, 61, 0.3)'
                  }}
                >
                  <Send size={18} /> Submit Inquiry
                </button>
              </form>
            )}
          </div>

          {/* Right: Visiting Info & Google Map Link Card */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            <div style={{ background: '#FFF', borderRadius: '20px', padding: '32px', border: '1px solid #EAEAEA', textAlign: 'left', boxShadow: '0 4px 20px rgba(0,0,0,0.03)' }}>
              <span style={{ fontSize: '0.8rem', fontWeight: 700, color: '#007A3D', textTransform: 'uppercase', letterSpacing: '1px' }}>
                VISIT OUR FACILITY
              </span>
              <h3 style={{ fontSize: '1.35rem', fontWeight: 800, color: '#111', margin: '8px 0 14px 0' }}>
                RTC Foods Manufacturing Unit
              </h3>
              <p style={{ color: '#555', fontSize: '0.92rem', lineHeight: 1.6, marginBottom: '20px' }}>
                Located strategically in HSIIDC Industrial Area, Kundli along the Delhi-NCR logistics corridor for seamless dispatch and verified warehouse inspections.
              </p>

              <div style={{ background: '#F8FAFC', borderRadius: '12px', padding: '16px', border: '1px solid #E2E8F0', marginBottom: '20px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: '#111827', fontWeight: 700, fontSize: '0.92rem', marginBottom: '6px' }}>
                  <Clock size={16} color="#007A3D" /> Operating Schedule
                </div>
                <div style={{ fontSize: '0.86rem', color: '#555', lineHeight: 1.5 }}>
                  Monday to Saturday: 10:00 AM – 7:00 PM IST<br />
                  Sunday: Closed (Online orders dispatched Monday)
                </div>
              </div>

              <a
                href="https://www.google.com/search?hl=en-IN&gl=in&q=Phase-V,+RTC+Foods,+HSIIDC,+163,+Sector-53,+Industrial+Area,+Kundli,+Sonipat,+Haryana+131028"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#1A73E8',
                  color: '#FFF',
                  padding: '12px 20px',
                  borderRadius: '8px',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px',
                  fontWeight: 600,
                  fontSize: '0.92rem',
                  boxShadow: '0 4px 12px rgba(26, 115, 232, 0.3)'
                }}
              >
                <MapPin size={16} /> View on Google Maps
              </a>
            </div>

            {/* Direct WhatsApp Box */}
            <div style={{
              background: 'linear-gradient(135deg, #128C7E 0%, #075E54 100%)',
              borderRadius: '20px',
              padding: '28px',
              color: '#FFF',
              textAlign: 'left',
              boxShadow: '0 8px 24px rgba(7, 94, 84, 0.25)'
            }}>
              <h4 style={{ fontSize: '1.25rem', fontWeight: 700, margin: '0 0 6px 0', color: '#FFF' }}>
                Instant WhatsApp Assistance
              </h4>
              <p style={{ fontSize: '0.9rem', color: 'rgba(255,255,255,0.85)', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                Chat directly with our sales desk for instant stock availability, bulk pricing sheets, or tracking questions.
              </p>
              <a
                href="https://wa.me/918929191914"
                target="_blank"
                rel="noreferrer"
                style={{
                  background: '#25D366',
                  color: '#FFF',
                  padding: '10px 20px',
                  borderRadius: '8px',
                  fontWeight: 700,
                  fontSize: '0.9rem',
                  textDecoration: 'none',
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <MessageSquare size={16} /> Open WhatsApp Chat
              </a>
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
