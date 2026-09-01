import React from 'react';
import { ArrowLeft, Award, ShieldCheck, Heart, Leaf, Sparkles, CheckCircle2, Factory, Users, Globe2, ArrowRight } from 'lucide-react';

interface AboutUsPageProps {
  setCurrentView: (view: string) => void;
}

export const AboutUsPage: React.FC<AboutUsPageProps> = ({ setCurrentView }) => {
  return (
    <div style={{ background: '#FAF8F5', minHeight: '90vh', padding: '30px 0 80px 0', fontFamily: "'Jost', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Breadcrumb Navigation */}
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
            <span style={{ color: '#222', fontWeight: 600 }}>About Us</span>
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
          <div style={{ position: 'absolute', left: '-60px', bottom: '-60px', width: '300px', height: '300px', background: 'radial-gradient(circle, rgba(22, 163, 74, 0.15) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <div style={{ textAlign: 'center', maxWidth: '900px', margin: '0 auto 48px auto' }}>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, margin: '0 0 16px 0', color: '#FFFFFF', lineHeight: 1.2 }}>
            Heritage of Purity, Passion for <span style={{ background: 'linear-gradient(135deg, #F5D061 0%, #D4AF37 50%, #FFE082 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Uncompromised Wellness</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.12rem', maxWidth: '780px', margin: '0 auto', lineHeight: 1.6 }}>
            From the bustling heart of Asia's historic spice hub in Khari Baoli to our modern ISO-certified processing plant in Kundli, RTC Foods brings India the purest dry fruits, nuts, seeds, and spices directly from farm sources.
          </p>
          </div>
        </div>

        {/* 3 Pillars Highlight Bar */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          marginBottom: '48px'
        }}>
          <div style={{ background: '#FFF', padding: '30px 24px', borderRadius: '16px', border: '1px solid #EAEAEA', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#ECFDF5', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#007A3D', marginBottom: '16px' }}>
              <Leaf size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', marginBottom: '8px' }}>100% Pure & Natural</h3>
            <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
              Zero chemical treatments, no artificial polish, and no synthetic preservatives. Only naturally harvested, grade-A kernels with maximum nutrient retention.
            </p>
          </div>

          <div style={{ background: '#FFF', padding: '30px 24px', borderRadius: '16px', border: '1px solid #EAEAEA', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#FEF3C7', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#D97706', marginBottom: '16px' }}>
              <Globe2 size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', marginBottom: '8px' }}>Direct Farm Origin</h3>
            <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
              Procured directly from premier orchards: California almonds, Kashmiri walnuts, Chilean inshells, Afghani figs, and Idukki green cardamom.
            </p>
          </div>

          <div style={{ background: '#FFF', padding: '30px 24px', borderRadius: '16px', border: '1px solid #EAEAEA', boxShadow: '0 4px 16px rgba(0,0,0,0.03)', textAlign: 'left' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '12px', background: '#EFF6FF', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#2563EB', marginBottom: '16px' }}>
              <ShieldCheck size={24} />
            </div>
            <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111', marginBottom: '8px' }}>Nitrogen-Lock Packaging</h3>
            <p style={{ fontSize: '0.92rem', color: '#555', lineHeight: 1.6, margin: 0 }}>
              Packaged in airtight, moisture-proof zip pouches and tins with oxygen barriers, guaranteeing shelf freshness and crunchiness from first open to last bite.
            </p>
          </div>
        </div>

        {/* Detailed Story & Mission (2-Column Grid) */}
        <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 1fr', gap: '40px', alignItems: 'center', marginBottom: '56px' }} className="about-story-grid">
          <div style={{ textAlign: 'left' }}>
            <span style={{ color: '#007A3D', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.85rem' }}>OUR HERITAGE</span>
            <h2 style={{ fontSize: '2.2rem', fontWeight: 800, color: '#111', margin: '8px 0 16px 0', lineHeight: 1.25 }}>
              Rooted in Tradition, Powered by Modern Food Science
            </h2>
            <p style={{ color: '#4B5563', fontSize: '1rem', lineHeight: 1.75, marginBottom: '16px' }}>
              RTC Foods began with a straightforward conviction: Indian families and culinary masters deserve dry fruits and spices that are genuinely wholesome, consistently sized, and freshly packaged without middlemen adulteration.
            </p>
            <p style={{ color: '#4B5563', fontSize: '1rem', lineHeight: 1.75, marginBottom: '24px' }}>
              Today, our infrastructure spans our primary trading bureau in Khari Baoli, Delhi and an advanced processing and sorting hub in HSIIDC Industrial Area, Kundli, Haryana. We serve retail households across 100+ cities as well as quick-commerce leaders, luxury hotels, and confectionery chains.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                'Optical sorting and multi-stage manual inspection for uniform kernel sizing',
                'Hygienic climate-controlled storage maintaining optimal moisture levels',
                'FSSAI, ISO 22000, and HACCP certified food safety protocols',
                'Complete traceability from orchard harvesting to consumer doorstep'
              ].map((item, idx) => (
                <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <CheckCircle2 size={18} color="#15803D" style={{ flexShrink: 0 }} />
                  <span style={{ fontSize: '0.95rem', color: '#1F2937', fontWeight: 500 }}>{item}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ position: 'relative' }}>
            <div style={{
              background: '#FFF',
              border: '1px solid #E5E7EB',
              borderRadius: '20px',
              padding: '24px',
              boxShadow: '0 20px 40px rgba(0,0,0,0.06)'
            }}>
              <img
                src="/hero_dry_fruits_1785924400069.png"
                alt="RTC Foods Premium Collection"
                style={{ width: '100%', height: '360px', objectFit: 'contain', borderRadius: '12px' }}
              />
              <div style={{ marginTop: '16px', background: '#F8FAFC', padding: '16px', borderRadius: '12px', display: 'flex', justifyContent: 'space-around', textAlign: 'center' }}>
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#007A3D' }}>25,000+</div>
                  <div style={{ fontSize: '0.78rem', color: '#666' }}>Sq. Ft. Facility</div>
                </div>
                <div style={{ width: '1px', background: '#E2E8F0' }} />
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#007A3D' }}>50+</div>
                  <div style={{ fontSize: '0.78rem', color: '#666' }}>Catalog Items</div>
                </div>
                <div style={{ width: '1px', background: '#E2E8F0' }} />
                <div>
                  <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#007A3D' }}>500+</div>
                  <div style={{ fontSize: '0.78rem', color: '#666' }}>B2B Partners</div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mission, Vision & Values */}
        <div style={{
          background: '#FFF',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid #EAEAEA',
          marginBottom: '48px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '640px', margin: '0 auto 36px auto' }}>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111', margin: '0 0 10px 0' }}>Our Core Commitments</h2>
            <p style={{ color: '#666', fontSize: '0.96rem', margin: 0 }}>Every grain, kernel, and box packaged at RTC Foods adheres to four unyielding principles.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))', gap: '24px', textAlign: 'left' }}>
            <div style={{ padding: '20px', background: '#FAF8F5', borderRadius: '14px', border: '1px solid #F0ECE1' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🌱</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111', margin: '0 0 6px 0' }}>Nutritional Honesty</h4>
              <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.5, margin: 0 }}>We never compromise on grade specifications or mix lower-tier broken pieces into whole kernel packs.</p>
            </div>

            <div style={{ padding: '20px', background: '#FAF8F5', borderRadius: '14px', border: '1px solid #F0ECE1' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>⚡</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111', margin: '0 0 6px 0' }}>Swift Fulfillment</h4>
              <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.5, margin: 0 }}>State-of-the-art automated pouching lines that dispatch retail and wholesale orders within 24–48 hours.</p>
            </div>

            <div style={{ padding: '20px', background: '#FAF8F5', borderRadius: '14px', border: '1px solid #F0ECE1' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🎁</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111', margin: '0 0 6px 0' }}>Luxury Gifting</h4>
              <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.5, margin: 0 }}>Curating celebratory wooden and golden festive hampers designed for Indian weddings and corporate events.</p>
            </div>

            <div style={{ padding: '20px', background: '#FAF8F5', borderRadius: '14px', border: '1px solid #F0ECE1' }}>
              <div style={{ fontSize: '1.8rem', marginBottom: '10px' }}>🤝</div>
              <h4 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111', margin: '0 0 6px 0' }}>B2B Partnership</h4>
              <p style={{ fontSize: '0.88rem', color: '#555', lineHeight: 1.5, margin: 0 }}>Customized white-labeling, bulk sack supplies, and private packing for leading retail chains.</p>
            </div>
          </div>
        </div>

        {/* CTA Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #007A3D 0%, #004D26 100%)',
          borderRadius: '16px',
          padding: '36px 32px',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px',
          textAlign: 'left'
        }}>
          <div>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#FFF', margin: '0 0 6px 0' }}>Experience the RTC Freshness Difference</h3>
            <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '0.95rem', margin: 0 }}>Explore our pure dry fruit catalog or request customized bulk supply for your business.</p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <button
              onClick={() => setCurrentView('products')}
              style={{ background: '#F5A623', color: '#000', border: 'none', padding: '12px 24px', borderRadius: '8px', fontWeight: 700, fontSize: '0.92rem', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '8px' }}
            >
              Shop Collection <ArrowRight size={16} />
            </button>
            <button
              onClick={() => { setCurrentView('home'); setTimeout(() => document.getElementById('wholesale')?.scrollIntoView({ behavior: 'smooth' }), 100); }}
              style={{ background: 'rgba(255,255,255,0.15)', color: '#FFF', border: '1px solid rgba(255,255,255,0.4)', padding: '12px 24px', borderRadius: '8px', fontWeight: 600, fontSize: '0.92rem', cursor: 'pointer' }}
            >
              Bulk Inquiry
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
