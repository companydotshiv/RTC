import React, { useState } from 'react';
import { ArrowLeft, Award, ShieldCheck, CheckCircle2, FileCheck, ExternalLink, Sparkles, AlertCircle } from 'lucide-react';

interface CertificatesPageProps {
  setCurrentView: (view: string) => void;
}

export const CertificatesPage: React.FC<CertificatesPageProps> = ({ setCurrentView }) => {
  const [selectedCert, setSelectedCert] = useState<string>('fssai');

  const certificates = [
    {
      id: 'fssai',
      badge: 'GOVERNMENT OF INDIA',
      title: 'FSSAI Central License',
      org: 'Food Safety and Standards Authority of India',
      regNo: '10021064000188',
      scope: 'Processing, Grading, Packaging & Distribution of Dry Fruits, Nuts, Superfood Seeds & Spices',
      facility: 'Phase-V, HSIIDC, Sector-53, Kundli, Sonipat, Haryana 131028',
      status: 'Active & Verified',
      color: '#15803D',
      bgLight: '#ECFDF5',
      desc: 'Compliant with all Government of India statutory requirements regarding hygienic handling, nutritional declaration, and contaminant limits.'
    },
    {
      id: 'iso',
      badge: 'INTERNATIONAL STANDARD',
      title: 'ISO 22000:2018 Certification',
      org: 'International Organization for Standardization',
      regNo: 'ISO/FSMS/IND/99241',
      scope: 'Food Safety Management Systems (FSMS) for Dry Fruits Processing & Vacuum Packaging',
      facility: 'RTC Foods Processing Unit, Kundli',
      status: 'Certified Standard',
      color: '#2563EB',
      bgLight: '#EFF6FF',
      desc: 'Ensures systematic hazard control across every step of our supply chain from farm procurement to retail pouch sealing.'
    },
    {
      id: 'haccp',
      badge: 'GLOBAL HYGIENE BENCHMARK',
      title: 'HACCP Compliance',
      org: 'Hazard Analysis and Critical Control Points',
      regNo: 'HACCP/RTC/2026/04',
      scope: 'Preventative Food Safety & Microbiological Testing Protocol',
      facility: 'RTC Quality Control Testing Lab',
      status: 'Fully Compliant',
      color: '#D97706',
      bgLight: '#FEF3C7',
      desc: 'Rigorous control points eliminating physical, chemical, and microbiological hazards at raw material intake and optical sorting.'
    },
    {
      id: 'gmp',
      badge: 'MANUFACTURING EXCELLENCE',
      title: 'GMP (Good Manufacturing Practices)',
      org: 'Global Food Safety Initiative Partner',
      regNo: 'GMP-IN-2024-884',
      scope: 'Sanitary Plant Operations, Cleanroom Packaging & Pest Management',
      facility: 'RTC Manufacturing Facility, Sector-53 Kundli',
      status: 'Certified Facility',
      color: '#7C3AED',
      bgLight: '#F5F3FF',
      desc: 'Ensures all personnel, processing conveyor lines, and automatic nitrogen packaging machinery meet highest clinical cleanliness standards.'
    },
    {
      id: 'apeda',
      badge: 'EXPORT COUNCIL OF INDIA',
      title: 'APEDA Registered Exporter',
      org: 'Ministry of Commerce and Industry, Govt. of India',
      regNo: 'APEDA/REG/198242',
      scope: 'Commercial Exportation of Grade-A Agricultural Produce & Processed Dry Fruits',
      facility: 'Head Office: Khari Baoli, Delhi-110006',
      status: 'Registered Commercial Member',
      color: '#059669',
      bgLight: '#ECFDF5',
      desc: 'Authorized to trade and supply premium grade Indian cashews, Kashmiri saffron, walnuts, and spices across international global markets.'
    },
    {
      id: 'vegetarian',
      badge: '100% PURE & VEGAN',
      title: '100% Vegetarian & Natural Seal',
      org: 'Green Leaf Purity Verification',
      regNo: 'VEG-RTC-9902',
      scope: 'Plant-Based, Unadulterated & Chemical Polish Free Certification',
      facility: 'All Packaged RTC Stock',
      status: '100% Green Dot Certified',
      color: '#16A34A',
      bgLight: '#F0FDF4',
      desc: 'Zero animal by-products, zero dairy processing cross-contamination, zero mineral oil polish, and completely vegan compliant.'
    }
  ];

  return (
    <div style={{ background: '#FAF8F5', minHeight: '90vh', padding: '30px 0 80px 0', fontFamily: "'Jost', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Breadcrumbs */}
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
            <span style={{ color: '#222', fontWeight: 600 }}>Certificates & Compliance</span>
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
            <Award size={14} /> QUALITY & HYGIENE ACCREDITATIONS
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 800, margin: '0 0 16px 0', color: '#FFFFFF', lineHeight: 1.2 }}>
            Certified for Purity, Hygiene & <span style={{ background: 'linear-gradient(135deg, #F5D061 0%, #D4AF37 50%, #FFE082 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Global Food Safety</span>
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.85)', fontSize: '1.12rem', maxWidth: '760px', margin: '0 auto', lineHeight: 1.6 }}>
            Every batch of RTC dry fruits and spices is packaged in our fully certified Kundli facility under stringent multi-tier quality checks, government licenses, and international food hygiene protocols.
          </p>
        </div>

        {/* Certificates Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
          gap: '24px',
          marginBottom: '50px'
        }}>
          {certificates.map((cert) => (
            <div
              key={cert.id}
              style={{
                background: '#FFFFFF',
                borderRadius: '16px',
                border: '1px solid #EAEAEA',
                padding: '28px',
                boxShadow: '0 4px 16px rgba(0,0,0,0.03)',
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'space-between',
                textAlign: 'left',
                position: 'relative',
                overflow: 'hidden'
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '14px' }}>
                  <span style={{
                    fontSize: '0.72rem',
                    fontWeight: 700,
                    textTransform: 'uppercase',
                    letterSpacing: '0.8px',
                    color: cert.color,
                    background: cert.bgLight,
                    padding: '3px 10px',
                    borderRadius: '20px'
                  }}>
                    {cert.badge}
                  </span>
                  <span style={{ fontSize: '0.78rem', color: '#007A3D', fontWeight: 600, display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                    <CheckCircle2 size={14} /> {cert.status}
                  </span>
                </div>

                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#111827', margin: '0 0 6px 0' }}>
                  {cert.title}
                </h3>
                <div style={{ fontSize: '0.85rem', color: '#6B7280', fontWeight: 500, marginBottom: '14px' }}>
                  Issuing Body: <span style={{ color: '#374151' }}>{cert.org}</span>
                </div>

                <p style={{ fontSize: '0.9rem', color: '#4B5563', lineHeight: 1.6, marginBottom: '18px' }}>
                  {cert.desc}
                </p>

                <div style={{ background: '#F8FAFC', borderRadius: '10px', padding: '14px', border: '1px solid #E2E8F0', fontSize: '0.85rem', display: 'flex', flexDirection: 'column', gap: '6px' }}>
                  <div><strong>Reg / License No:</strong> <span style={{ fontFamily: 'monospace', color: '#111827', fontWeight: 700 }}>{cert.regNo}</span></div>
                  <div><strong>Scope:</strong> {cert.scope}</div>
                  <div><strong>Location:</strong> {cert.facility}</div>
                </div>
              </div>

              <div style={{ marginTop: '20px', paddingTop: '16px', borderTop: '1px solid #F0F0F0', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                <span style={{ fontSize: '0.82rem', color: '#888' }}>ISO/FSSAI Audit Passed</span>
                <span style={{ fontSize: '0.85rem', fontWeight: 600, color: '#007A3D', display: 'inline-flex', alignItems: 'center', gap: '4px' }}>
                  Verified Certificate <ShieldCheck size={16} />
                </span>
              </div>
            </div>
          ))}
        </div>

        {/* 7-Step Quality Testing Protocol Section */}
        <div style={{
          background: '#FFF',
          borderRadius: '20px',
          padding: '40px',
          border: '1px solid #EAEAEA',
          marginBottom: '40px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)'
        }}>
          <div style={{ textAlign: 'center', maxWidth: '700px', margin: '0 auto 36px auto' }}>
            <span style={{ color: '#007A3D', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1px', fontSize: '0.82rem' }}>LABORATORY TESTING PROTOCOL</span>
            <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#111', margin: '8px 0 10px 0' }}>Our 7-Step Batch Testing Standard</h2>
            <p style={{ color: '#666', fontSize: '0.96rem', margin: 0 }}>Every intake consignment undergoes rigorous testing before optical sorting and pouching.</p>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', textAlign: 'left' }}>
            {[
              { step: '01', title: 'Moisture Analysis', desc: 'Ensures optimal kernel moisture below 5% to prevent mold and ensure lasting crunchiness.' },
              { step: '02', title: 'Aflatoxin Testing', desc: 'Stringent lab screening guaranteeing zero mycotoxins or fungal contamination.' },
              { step: '03', title: 'Optical Sizing', desc: 'Electronic grading ensuring uniform kernel counts per ounce (e.g. Cashew Jumbo W240/W320).' },
              { step: '04', title: 'Foreign Matter Free', desc: 'High-power magnetic separation and vibrating de-stoners removing all shell and dust particles.' },
              { step: '05', title: 'Organoleptic Taste', desc: 'Sensory checks verifying natural sweetness, oil richness, and aroma without rancidity.' },
              { step: '06', title: 'Nitrogen Flush Seal', desc: 'Multi-layer packaging with 99.8% nitrogen atmosphere removing degrading oxygen.' },
              { step: '07', title: 'Batch Traceability', desc: 'Barcoded packaging with QR code lot numbers linking back to source harvesting origin.' }
            ].map((item, idx) => (
              <div key={idx} style={{ background: '#FAF8F5', borderRadius: '12px', padding: '18px', border: '1px solid #EFEAE0' }}>
                <div style={{ fontSize: '1.2rem', fontWeight: 800, color: '#D4AF37', marginBottom: '6px' }}>{item.step}</div>
                <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111', margin: '0 0 6px 0' }}>{item.title}</h4>
                <p style={{ fontSize: '0.84rem', color: '#555', lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom Commercial Inquiry Callout */}
        <div style={{
          background: 'linear-gradient(135deg, #072e18 0%, #031c0e 100%)',
          borderRadius: '16px',
          padding: '30px 32px',
          color: '#FFF',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '16px',
          textAlign: 'left'
        }}>
          <div>
            <h4 style={{ color: '#FFFFFF', fontSize: '1.2rem', margin: '0 0 4px 0', fontWeight: 700 }}>
              Need Certificate Copies or Lab Test Reports for B2B Audits?
            </h4>
            <p style={{ color: 'rgba(255, 255, 255, 0.75)', fontSize: '0.9rem', margin: 0 }}>
              We furnish signed CoA (Certificate of Analysis) and FSSAI documentation for corporate clients and institutional tenders.
            </p>
          </div>
          <a
            href="mailto:info@rtcfoods.in?subject=Request%20for%20RTC%20Certificates%20and%20CoA"
            style={{
              background: 'linear-gradient(135deg, #D4AF37 0%, #AA820A 100%)',
              color: '#031C0E',
              fontWeight: 800,
              fontSize: '0.9rem',
              padding: '12px 24px',
              borderRadius: '8px',
              textDecoration: 'none',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            Request Official Documents <ExternalLink size={16} />
          </a>
        </div>

      </div>
    </div>
  );
};
