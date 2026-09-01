import React from 'react';
import { Truck, ShieldCheck, RotateCcw, FileText, ArrowLeft, Phone, Mail, MapPin, CheckCircle2 } from 'lucide-react';

export type PolicyType = 'shipping-policy' | 'privacy-policy' | 'returns-policy' | 'terms-conditions';

interface LegalPolicyPageProps {
  initialPolicy?: PolicyType;
  setCurrentView: (view: string) => void;
}

export const LegalPolicyPage: React.FC<LegalPolicyPageProps> = ({
  initialPolicy = 'shipping-policy',
  setCurrentView
}) => {
  const [activeTab, setActiveTab] = React.useState<PolicyType>(initialPolicy);

  // Synchronize activeTab if initialPolicy changes externally
  React.useEffect(() => {
    if (initialPolicy) {
      setActiveTab(initialPolicy);
    }
  }, [initialPolicy]);

  const policies = [
    {
      id: 'shipping-policy' as PolicyType,
      title: 'Shipping Policy',
      icon: Truck,
      subtitle: 'Dispatch timelines, shipping rates & pan-India delivery details'
    },
    {
      id: 'privacy-policy' as PolicyType,
      title: 'Privacy Policy',
      icon: ShieldCheck,
      subtitle: 'How we collect, protect & respect your personal information'
    },
    {
      id: 'returns-policy' as PolicyType,
      title: 'Returns & Cancellation',
      icon: RotateCcw,
      subtitle: 'Guidelines on food safety, order cancellation & refunds'
    },
    {
      id: 'terms-conditions' as PolicyType,
      title: 'Terms & Conditions',
      icon: FileText,
      subtitle: 'Website terms of service, wholesale policies & legal terms'
    }
  ];

  return (
    <div style={{ background: '#FAF8F5', minHeight: '90vh', padding: '30px 0 80px 0', fontFamily: "'Jost', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* Breadcrumbs & Back Navigation */}
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '12px' }}>
          <button
            onClick={() => setCurrentView('home')}
            style={{
              background: 'none',
              border: 'none',
              color: '#007A3D',
              fontSize: '0.92rem',
              fontWeight: 600,
              cursor: 'pointer',
              display: 'inline-flex',
              alignItems: 'center',
              gap: '8px'
            }}
          >
            <ArrowLeft size={16} /> Back to Home
          </button>
          <div style={{ fontSize: '0.85rem', color: '#777' }}>
            <span onClick={() => setCurrentView('home')} style={{ cursor: 'pointer', color: '#007A3D' }}>Home</span>
            {' / '}
            <span style={{ color: '#222', fontWeight: 600 }}>Legal & Policies</span>
          </div>
        </div>

        {/* Hero Header Card */}
        <div style={{
          background: 'linear-gradient(135deg, #072e18 0%, #031c0e 100%)',
          borderRadius: '16px',
          padding: '36px 32px',
          color: '#FFF',
          marginBottom: '32px',
          boxShadow: '0 12px 30px rgba(0, 50, 20, 0.15)',
          position: 'relative',
          overflow: 'hidden'
        }}>
          <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />
          
          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(212, 175, 55, 0.15)',
            color: '#F5D061',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            padding: '4px 14px',
            borderRadius: '20px',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '12px'
          }}>
            RTC FOODS LEGAL & COMPLIANCE
          </span>
          <h1 style={{ fontSize: '2.4rem', fontWeight: 800, margin: '0 0 8px 0', color: '#FFFFFF' }}>
            Customer Trust & Policies
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '1.02rem', maxWidth: '680px', margin: 0, lineHeight: 1.5 }}>
            Transparent guidelines, safety compliance, and clear service terms for our valued retail and wholesale dry fruits customers.
          </p>
        </div>

        {/* Main 2-Column Responsive Layout (Sidebar Tabs + Content Area) */}
        <div style={{ display: 'grid', gridTemplateColumns: '300px 1fr', gap: '30px', alignItems: 'start' }} className="policy-main-grid">
          
          {/* Left Policy Navigation Tabs */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }} className="policy-sidebar">
            <div style={{ background: '#FFF', borderRadius: '14px', padding: '16px', border: '1px solid #EAEAEA', boxShadow: '0 4px 14px rgba(0,0,0,0.03)' }}>
              <div style={{ fontSize: '0.8rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '12px', paddingLeft: '8px' }}>
                POLICIES & GUIDELINES
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '6px' }}>
                {policies.map((p) => {
                  const Icon = p.icon;
                  const isActive = activeTab === p.id;
                  return (
                    <button
                      key={p.id}
                      onClick={() => setActiveTab(p.id)}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 14px',
                        borderRadius: '10px',
                        border: 'none',
                        background: isActive ? '#E8F5E9' : 'transparent',
                        color: isActive ? '#007A3D' : '#333333',
                        fontWeight: isActive ? 700 : 500,
                        fontSize: '0.94rem',
                        cursor: 'pointer',
                        textAlign: 'left',
                        transition: 'all 0.2s ease',
                        borderLeft: isActive ? '4px solid #007A3D' : '4px solid transparent'
                      }}
                      onMouseEnter={(e) => {
                        if (!isActive) e.currentTarget.style.background = '#F9FAFB';
                      }}
                      onMouseLeave={(e) => {
                        if (!isActive) e.currentTarget.style.background = 'transparent';
                      }}
                    >
                      <Icon size={18} color={isActive ? '#007A3D' : '#666'} />
                      <span>{p.title}</span>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Quick Contact & Helpline Widget */}
            <div style={{ background: '#FFF', borderRadius: '14px', padding: '20px', border: '1px solid #EAEAEA', textAlign: 'left' }}>
              <h3 style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111', margin: '0 0 10px 0' }}>Need Assistance?</h3>
              <p style={{ fontSize: '0.86rem', color: '#666', lineHeight: 1.5, margin: '0 0 16px 0' }}>
                Our customer support team is available Mon – Sat (10:00 AM – 7:00 PM IST).
              </p>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.88rem' }}>
                <a href="tel:+918929191914" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#007A3D', fontWeight: 600 }}>
                  <Phone size={16} /> +91-89291 91914
                </a>
                <a href="mailto:info@rtcfoods.in" style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#007A3D', fontWeight: 600 }}>
                  <Mail size={16} /> info@rtcfoods.in
                </a>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', color: '#666', fontSize: '0.82rem', marginTop: '4px' }}>
                  <MapPin size={16} style={{ flexShrink: 0, marginTop: '2px' }} /> Khari Baoli, Delhi & Kundli, Haryana
                </div>
              </div>
            </div>
          </div>

          {/* Right Policy Document Content Card */}
          <div style={{ background: '#FFF', borderRadius: '16px', padding: '36px 40px', border: '1px solid #EAEAEA', boxShadow: '0 4px 18px rgba(0,0,0,0.04)', textAlign: 'left' }} className="policy-content-card">
            
            {/* ========================================================================= */}
            {/* 1. SHIPPING POLICY */}
            {/* ========================================================================= */}
            {activeTab === 'shipping-policy' && (
              <div>
                <div style={{ borderBottom: '2px solid #F0F0F0', paddingBottom: '16px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Last Updated: March 2026</span>
                  <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#111', margin: '6px 0 0 0' }}>Shipping & Delivery Policy</h2>
                </div>

                <div style={{ color: '#374151', fontSize: '0.96rem', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <p>
                    Welcome to <strong>RTC Foods</strong>. We are committed to delivering the freshest, highest-grade California almonds, jumbo cashews, vacuum-sealed walnuts, dried fruits, and aromatic whole spices directly from our food-grade manufacturing facility to your doorstep across India.
                  </p>

                  <div style={{ background: '#F0FDF4', borderLeft: '4px solid #16A34A', padding: '16px 20px', borderRadius: '0 8px 8px 0' }}>
                    <h4 style={{ color: '#15803D', fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>✨ Free Shipping Threshold</h4>
                    <p style={{ margin: 0, fontSize: '0.92rem', color: '#166534' }}>
                      Enjoy <strong>FREE Pan-India Shipping</strong> on all retail prepaid and COD orders over <strong>₹999</strong>. A flat nominal delivery fee of ₹60 applies on orders below this threshold.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>1. Order Processing & Dispatch Timelines</h3>
                    <p>
                      All orders placed on <strong>rtcfoods.in</strong> are processed and hygienically dispatched from our ISO & FSSAI certified facility located in HSIIDC Industrial Area, Kundli, Sonipat within <strong>24 to 48 business hours</strong> (excluding Sundays and national holidays).
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>2. Estimated Delivery Durations</h3>
                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li><strong>Delhi NCR & North India:</strong> 1 – 3 business days</li>
                      <li><strong>Metro Cities (Mumbai, Bengaluru, Kolkata, Chennai, Hyderabad):</strong> 2 – 4 business days</li>
                      <li><strong>Rest of India (Tier 2 & Tier 3 Cities):</strong> 4 – 7 business days</li>
                      <li><strong>North-East & Remote Locations:</strong> 6 – 9 business days</li>
                    </ul>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>3. Packaging & Moisture-Lock Guarantee</h3>
                    <p>
                      Every RTC dry fruit packet is packed in heavy multi-layer resealable nitrogen-flushed zip-lock pouches or food-grade tins with oxygen absorbers. This preserves natural crunchiness, nutritional vitality, and ensures zero transit degradation.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>4. Courier Partners & Tracking</h3>
                    <p>
                      We partner with India's premier logistics providers including <strong>Blue Dart, Delhivery, DTDC, and XpressBees</strong>. Once your consignment is dispatched, an automated tracking link and AWB number are instantly shared with you via SMS, WhatsApp, and Email.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>5. Bulk & Wholesale Freight Shipping</h3>
                    <p>
                      For commercial B2B, wholesale sacks (10kg / 25kg / 50kg), and institutional gifting orders, dedicated surface cargo or temperature-controlled road logistics are coordinated with tailored freight manifests.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 2. PRIVACY POLICY */}
            {/* ========================================================================= */}
            {activeTab === 'privacy-policy' && (
              <div>
                <div style={{ borderBottom: '2px solid #F0F0F0', paddingBottom: '16px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Last Updated: March 2026</span>
                  <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#111', margin: '6px 0 0 0' }}>Privacy & Data Protection Policy</h2>
                </div>

                <div style={{ color: '#374151', fontSize: '0.96rem', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <p>
                    RTC Foods ("we", "us", or "our") respects and values the privacy of every visitor and customer. This Privacy Policy outlines how your personal information is collected, used, protected, and disclosed when you visit or make a purchase from <strong>rtcfoods.in</strong>.
                  </p>

                  <div style={{ background: '#FEF3C7', borderLeft: '4px solid #D97706', padding: '16px 20px', borderRadius: '0 8px 8px 0' }}>
                    <h4 style={{ color: '#92400E', fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>🔒 100% Secure & Zero Card Storage</h4>
                    <p style={{ margin: 0, fontSize: '0.92rem', color: '#78350F' }}>
                      All online payments (UPI, Credit/Debit Cards, Net Banking) are securely encrypted via RBI-licensed and PCI-DSS Level 1 certified payment gateways. RTC Foods never stores your card number, CVV, or banking passwords.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>1. Information We Collect</h3>
                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li><strong>Contact Information:</strong> Name, delivery address, billing address, phone number, and email address.</li>
                      <li><strong>Order Details:</strong> Purchased items, cart choices, transaction identifiers, and shipping preferences.</li>
                      <li><strong>Business Information (for B2B clients):</strong> GSTIN, company legal name, and commercial billing credentials.</li>
                      <li><strong>Device & Usage Data:</strong> IP address, browser type, and interaction cookies to optimize website speed and cart persistence.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>2. How We Use Your Information</h3>
                    <p>We process your data strictly for legitimate operational purposes:</p>
                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                      <li>To fulfill orders, package shipments, and generate tax invoices.</li>
                      <li>To send automated SMS/WhatsApp order confirmations and delivery updates.</li>
                      <li>To process returns, exchanges, or customer service inquiries.</li>
                      <li>To prevent fraud, verify COD orders, and enhance website security.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>3. Data Sharing & Third-Party Protections</h3>
                    <p>
                      We <strong>never sell, trade, or rent</strong> your personal data to advertising brokerages or third parties. Information is only shared with trusted service providers necessary for order fulfillment (e.g., courier partners like Delhivery/Blue Dart and certified SMS gateways).
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>4. Your Rights & Data Deletion</h3>
                    <p>
                      You may at any time request access to your stored personal information, update contact details, or request full account deletion by writing to us at <strong>info@rtcfoods.in</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 3. RETURNS & CANCELLATION */}
            {/* ========================================================================= */}
            {activeTab === 'returns-policy' && (
              <div>
                <div style={{ borderBottom: '2px solid #F0F0F0', paddingBottom: '16px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Last Updated: March 2026</span>
                  <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#111', margin: '6px 0 0 0' }}>Returns, Replacement & Cancellation</h2>
                </div>

                <div style={{ color: '#374151', fontSize: '0.96rem', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <p>
                    At <strong>RTC Foods</strong>, our top priority is the pure satisfaction and wellness of our customers. Because dry fruits, nuts, and spices are consumable food products governed by strict FSSAI safety norms, we maintain a clear and customer-friendly return & replacement policy.
                  </p>

                  <div style={{ background: '#EFF6FF', borderLeft: '4px solid #2563EB', padding: '16px 20px', borderRadius: '0 8px 8px 0' }}>
                    <h4 style={{ color: '#1D4ED8', fontSize: '1rem', fontWeight: 700, margin: '0 0 4px 0' }}>🛡️ 48-Hour Quality & Damage Guarantee</h4>
                    <p style={{ margin: 0, fontSize: '0.92rem', color: '#1E40AF' }}>
                      If your package arrives damaged, tampered, defective, or with an incorrect item, please notify our support team within <strong>48 hours of delivery</strong> with unboxing photos for an immediate replacement or full refund.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>1. Order Cancellation Policy</h3>
                    <p>
                      <strong>Before Dispatch:</strong> You can cancel your order at any time before it has been dispatched from our Kundli facility by contacting us at <strong>+91-89291 91914</strong> or <strong>info@rtcfoods.in</strong>. A 100% instant refund will be initiated.
                    </p>
                    <p style={{ marginTop: '8px' }}>
                      <strong>After Dispatch:</strong> Once an order is handed over to our courier partner and in transit, it cannot be cancelled directly. If you refuse delivery at your doorstep, return shipping deduction may apply for non-defective items.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>2. Eligible Return Scenarios</h3>
                    <p>Returns or replacements are gladly accepted under the following conditions:</p>
                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                      <li><CheckCircle2 size={15} color="#15803D" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Outer packaging arrived severely damaged or unsealed during transit.</li>
                      <li><CheckCircle2 size={15} color="#15803D" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Incorrect weight, variant, or product delivered against your order.</li>
                      <li><CheckCircle2 size={15} color="#15803D" style={{ display: 'inline', marginRight: '6px', verticalAlign: 'middle' }} /> Genuine freshness or spoilage defect detected upon opening.</li>
                    </ul>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>3. How to Initiate a Return / Replacement</h3>
                    <ol style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '8px' }}>
                      <li>Take 2–3 clear photographs or a short video showing the damaged packet or label.</li>
                      <li>Send an email to <strong>info@rtcfoods.in</strong> or WhatsApp message to <strong>+91-89291 91914</strong> along with your Order ID.</li>
                      <li>Our team will verify the claim within 24 business hours and dispatch a free replacement or schedule reverse pickup.</li>
                    </ol>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>4. Refund Processing Timelines</h3>
                    <p>
                      Once approved, refunds are credited back to the original payment source:
                    </p>
                    <ul style={{ paddingLeft: '20px', display: 'flex', flexDirection: 'column', gap: '6px', marginTop: '6px' }}>
                      <li><strong>UPI / Instant Wallets:</strong> 24 to 48 hours</li>
                      <li><strong>Net Banking / Debit & Credit Cards:</strong> 3 to 5 working banking days</li>
                      <li><strong>Cash on Delivery (COD) Orders:</strong> Refunded directly via secure Bank Transfer / UPI upon receiving your details.</li>
                    </ul>
                  </div>
                </div>
              </div>
            )}

            {/* ========================================================================= */}
            {/* 4. TERMS & CONDITIONS */}
            {/* ========================================================================= */}
            {activeTab === 'terms-conditions' && (
              <div>
                <div style={{ borderBottom: '2px solid #F0F0F0', paddingBottom: '16px', marginBottom: '24px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#888', textTransform: 'uppercase', letterSpacing: '1px', fontWeight: 600 }}>Last Updated: March 2026</span>
                  <h2 style={{ fontSize: '1.9rem', fontWeight: 800, color: '#111', margin: '6px 0 0 0' }}>Terms & Conditions of Service</h2>
                </div>

                <div style={{ color: '#374151', fontSize: '0.96rem', lineHeight: 1.75, display: 'flex', flexDirection: 'column', gap: '22px' }}>
                  <p>
                    Welcome to the <strong>RTC Foods</strong> website (<strong>rtcfoods.in</strong>). By accessing, browsing, or placing an order on this website, you agree to comply with and be bound by the following Terms & Conditions.
                  </p>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>1. Corporate Identity & Legal Jurisdiction</h3>
                    <p>
                      This website is owned and operated by <strong>RTC Foods</strong>, having its Registered Head Office at <strong>1040, 1st Floor, Gandhi Gali, Khari Baoli, Delhi-110006</strong> and Primary Processing Facility at <strong>Phase-V, HSIIDC, 163, Sector-53, Industrial Area, Kundli, Sonipat, Haryana 131028, India</strong>.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>2. Product Descriptions & Natural Variations</h3>
                    <p>
                      We strive to display our dry fruits, nuts, seeds, and spices with maximum color and photographic accuracy. Because our products are 100% naturally harvested agricultural produce, minor natural variations in kernel size, shape, or harvest shade may occur across distinct agricultural batches.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>3. Pricing & Tax Invoicing</h3>
                    <p>
                      All retail prices displayed on the website are in Indian Rupees (INR) and inclusive of all applicable Goods & Services Tax (GST). RTC Foods reserves the right to revise catalog prices based on agricultural market commodity fluctuations without prior notice.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>4. Wholesale & Private Labeling Contracts</h3>
                    <p>
                      Commercial agreements for wholesale distribution, supermarket supply, hotel chains, and private labeling are governed by formal purchase orders, defined quality specifications, and agreed credit terms.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>5. Intellectual Property</h3>
                    <p>
                      All trademarks, brand logos, product photography, text content, packaging designs, and digital assets on this website are the exclusive intellectual property of RTC Foods and protected under Indian Copyright and Trademark Laws.
                    </p>
                  </div>

                  <div>
                    <h3 style={{ fontSize: '1.25rem', fontWeight: 700, color: '#111827', margin: '0 0 10px 0' }}>6. Governing Law & Dispute Resolution</h3>
                    <p>
                      These Terms of Service and any transactional agreements shall be governed by and construed in accordance with the laws of the Republic of India. Any legal dispute or claim shall be subject to the exclusive jurisdiction of the competent courts in <strong>Delhi / Sonipat, Haryana</strong>.
                    </p>
                  </div>
                </div>
              </div>
            )}

          </div>

        </div>

      </div>
    </div>
  );
};
