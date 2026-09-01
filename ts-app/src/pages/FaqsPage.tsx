import React, { useState } from 'react';
import { ArrowLeft, Search, ChevronDown, HelpCircle, Phone, Mail, MessageSquare, Sparkles, CheckCircle2 } from 'lucide-react';

interface FaqsPageProps {
  setCurrentView: (view: string) => void;
}

export const FaqsPage: React.FC<FaqsPageProps> = ({ setCurrentView }) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [openItems, setOpenItems] = useState<{ [key: number]: boolean }>({ 0: true, 1: true });

  const toggleItem = (idx: number) => {
    setOpenItems((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const faqData = [
    {
      category: 'ordering',
      q: 'How do I place an order on RTC Foods?',
      a: 'You can browse our product catalog by category, choose your desired pouch weight or tin size, and click "Add to Cart". Once you are ready, open the Cart drawer or click "Proceed to Checkout" to enter your delivery address and complete payment via UPI, Credit/Debit Card, Net Banking, or Cash on Delivery (COD).'
    },
    {
      category: 'ordering',
      q: 'What payment methods are accepted?',
      a: 'We accept all major secure payment channels including UPI (Google Pay, PhonePe, Paytm, BHIM), Credit & Debit Cards (Visa, MasterCard, RuPay), Net Banking across 50+ Indian banks, and Cash on Delivery (COD).'
    },
    {
      category: 'ordering',
      q: 'Is Cash on Delivery (COD) available?',
      a: 'Yes, Cash on Delivery is available across most serviceable pin codes in India. A nominal verification & handling fee of ₹40 applies on COD orders.'
    },
    {
      category: 'shipping',
      q: 'How long does shipping and delivery take?',
      a: 'Orders are dispatched from our Kundli, Haryana facility within 24–48 hours. Delivery takes 1–3 business days for Delhi NCR & North India, 2–4 business days for major Metros (Mumbai, Bengaluru, Kolkata, Chennai, Hyderabad), and 4–7 business days for other tier-2/3 regions.'
    },
    {
      category: 'shipping',
      q: 'What are the delivery charges?',
      a: 'We offer FREE Pan-India Shipping on all orders of ₹999 and above. For orders below ₹999, a flat standard delivery fee of ₹60 is applied at checkout.'
    },
    {
      category: 'shipping',
      q: 'How can I track my shipment?',
      a: 'As soon as your order is dispatched, you will receive an SMS, WhatsApp message, and email containing your live courier tracking link (AWB number) for Blue Dart, Delhivery, or DTDC.'
    },
    {
      category: 'quality',
      q: 'Are RTC dry fruits naturally harvested and chemical-free?',
      a: 'Yes, absolutely. All RTC dry fruits, nuts, and seeds are 100% natural, non-GMO, and free from mineral oil polishes, chemical bleaching, or artificial preservatives. We procure directly from origin orchards in California, Chile, Kashmir, and Kerala.'
    },
    {
      category: 'quality',
      q: 'How is the crunchiness and freshness preserved during transit?',
      a: 'Our products are packed in heavy multi-layer resealable nitrogen-flushed zip-lock pouches and food-grade canisters. This creates a moisture barrier and oxygen-free environment that locks in natural crunchiness and nutritional potency.'
    },
    {
      category: 'quality',
      q: 'What is the shelf life and recommended storage method?',
      a: 'RTC dry fruits typically have a shelf life of 6 to 12 months from the packaging date when stored properly. We recommend transferring opened pouches into airtight glass or food-grade containers and storing them in a cool, dry place or inside the refrigerator during hot summer months.'
    },
    {
      category: 'wholesale',
      q: 'Do you offer bulk orders, private labeling, or wholesale pricing?',
      a: 'Yes! RTC Foods is a leading wholesale supplier to supermarket chains, hotel groups (HORECA), quick-commerce giants, and corporate gifting clients across India. We supply in bulk sacks (10kg, 25kg, 50kg) as well as customized white-label packaging. You can submit an inquiry via our Wholesale section or call +91-89291 91914.'
    },
    {
      category: 'wholesale',
      q: 'Can I order customized festive or corporate gift hampers?',
      a: 'Yes, we specialize in luxury festive gifting for Diwali, New Year, weddings, and corporate celebrations. We offer custom branding, customized wooden box selections, and bespoke dry fruit blends.'
    },
    {
      category: 'returns',
      q: 'What is your return and replacement policy?',
      a: 'If your shipment arrives damaged, unsealed, or defective, please contact our support team within 48 hours of delivery with photographs. We will arrange a free reverse pickup and immediate replacement or full refund.'
    },
    {
      category: 'returns',
      q: 'How do I cancel an order?',
      a: 'You can cancel any order before it is dispatched from our facility by calling +91-89291 91914 or emailing info@rtcfoods.in for a 100% instant refund.'
    },
    {
      category: 'returns',
      q: 'How long do refunds take to reflect in my bank account?',
      a: 'UPI refunds are processed within 24–48 hours. Credit card, debit card, and net banking refunds typically reflect in your bank account within 3–5 working banking days.'
    }
  ];

  const categories = [
    { id: 'all', label: 'All Questions' },
    { id: 'ordering', label: 'Ordering & Payment' },
    { id: 'shipping', label: 'Shipping & Delivery' },
    { id: 'quality', label: 'Quality & Freshness' },
    { id: 'wholesale', label: 'Bulk & Gifting' },
    { id: 'returns', label: 'Returns & Refunds' }
  ];

  const filteredFaqs = faqData.filter((item) => {
    const matchesCat = selectedCategory === 'all' || item.category === selectedCategory;
    const matchesSearch = !searchQuery.trim() ||
      item.q.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.a.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCat && matchesSearch;
  });

  return (
    <div style={{ background: '#FAF8F5', minHeight: '90vh', padding: '30px 0 80px 0', fontFamily: "'Jost', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1100px', margin: '0 auto', padding: '0 20px' }}>
        
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
            <span style={{ color: '#222', fontWeight: 600 }}>Help & FAQs</span>
          </div>
        </div>

        {/* Hero Section with Search Input */}
        <div style={{
          background: 'linear-gradient(135deg, #072e18 0%, #031c0e 100%)',
          borderRadius: '20px',
          padding: '48px 36px',
          color: '#FFF',
          marginBottom: '36px',
          boxShadow: '0 16px 40px rgba(0, 50, 20, 0.15)',
          position: 'relative',
          overflow: 'hidden',
          textAlign: 'center'
        }}>
          <div style={{ position: 'absolute', right: '-40px', top: '-40px', width: '220px', height: '220px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.2) 0%, transparent 70%)', pointerEvents: 'none' }} />

          <span style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            background: 'rgba(212, 175, 55, 0.15)',
            color: '#F5D061',
            border: '1px solid rgba(212, 175, 55, 0.35)',
            padding: '4px 16px',
            borderRadius: '20px',
            fontSize: '0.78rem',
            fontWeight: 700,
            letterSpacing: '1px',
            textTransform: 'uppercase',
            marginBottom: '14px'
          }}>
            <HelpCircle size={14} /> RTC SUPPORT & KNOWLEDGE BASE
          </span>
          <h1 style={{ fontSize: 'clamp(2rem, 4vw, 3rem)', fontWeight: 800, margin: '0 0 12px 0', color: '#FFFFFF', lineHeight: 1.2 }}>
            Frequently Asked Questions
          </h1>
          <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.05rem', maxWidth: '640px', margin: '0 auto 28px auto', lineHeight: 1.5 }}>
            Find clear answers to common questions about ordering, packaging freshness, pan-India delivery, and wholesale bulk supplies.
          </p>

          {/* Search Box */}
          <div style={{ maxWidth: '560px', margin: '0 auto', position: 'relative' }}>
            <Search size={20} color="#888" style={{ position: 'absolute', left: '18px', top: '50%', transform: 'translateY(-50%)' }} />
            <input
              type="text"
              placeholder="Search by keyword (e.g., shipping, shelf life, bulk, almonds)..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              style={{
                width: '100%',
                padding: '14px 20px 14px 50px',
                borderRadius: '30px',
                border: 'none',
                fontSize: '0.98rem',
                outline: 'none',
                background: '#FFFFFF',
                color: '#111827',
                boxShadow: '0 8px 24px rgba(0,0,0,0.2)'
              }}
            />
          </div>
        </div>

        {/* Category Pills */}
        <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap', justifyContent: 'center', marginBottom: '36px' }}>
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              style={{
                padding: '10px 20px',
                borderRadius: '24px',
                border: '1px solid',
                borderColor: selectedCategory === cat.id ? '#007A3D' : '#E5E7EB',
                background: selectedCategory === cat.id ? '#007A3D' : '#FFFFFF',
                color: selectedCategory === cat.id ? '#FFFFFF' : '#4B5563',
                fontSize: '0.9rem',
                fontWeight: selectedCategory === cat.id ? 700 : 500,
                cursor: 'pointer',
                transition: 'all 0.2s ease',
                boxShadow: selectedCategory === cat.id ? '0 4px 12px rgba(0,122,61,0.2)' : '0 1px 3px rgba(0,0,0,0.03)'
              }}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* FAQ Accordion List */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '50px' }}>
          {filteredFaqs.length > 0 ? (
            filteredFaqs.map((faq, idx) => {
              const isOpen = !!openItems[idx];
              return (
                <div
                  key={idx}
                  style={{
                    background: '#FFFFFF',
                    borderRadius: '14px',
                    border: '1px solid',
                    borderColor: isOpen ? '#A7F3D0' : '#EAEAEA',
                    boxShadow: isOpen ? '0 6px 20px rgba(0,122,61,0.06)' : '0 2px 8px rgba(0,0,0,0.02)',
                    overflow: 'hidden',
                    transition: 'all 0.25s ease'
                  }}
                >
                  <div
                    onClick={() => toggleItem(idx)}
                    style={{
                      padding: '20px 24px',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      cursor: 'pointer',
                      background: isOpen ? '#F0FDF4' : '#FFFFFF',
                      userSelect: 'none'
                    }}
                  >
                    <h3 style={{ fontSize: '1.08rem', fontWeight: 700, color: isOpen ? '#007A3D' : '#111827', margin: 0, textAlign: 'left' }}>
                      {faq.q}
                    </h3>
                    <div style={{
                      width: '32px',
                      height: '32px',
                      borderRadius: '50%',
                      background: isOpen ? '#DCFCE7' : '#F3F4F6',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      flexShrink: 0,
                      marginLeft: '16px',
                      transition: 'transform 0.25s ease',
                      transform: isOpen ? 'rotate(180deg)' : 'none'
                    }}>
                      <ChevronDown size={18} color={isOpen ? '#007A3D' : '#6B7280'} />
                    </div>
                  </div>

                  {isOpen && (
                    <div style={{ padding: '0 24px 22px 24px', color: '#4B5563', fontSize: '0.96rem', lineHeight: 1.7, textAlign: 'left', background: '#F0FDF4' }}>
                      <div style={{ paddingTop: '8px', borderTop: '1px solid rgba(21, 128, 61, 0.12)' }}>
                        {faq.a}
                      </div>
                    </div>
                  )}
                </div>
              );
            })
          ) : (
            <div style={{ background: '#FFF', padding: '60px 20px', borderRadius: '16px', textAlign: 'center', border: '1px solid #EAEAEA' }}>
              <div style={{ fontSize: '2.5rem', marginBottom: '12px' }}>🔍</div>
              <h3 style={{ fontSize: '1.2rem', color: '#111', margin: '0 0 6px 0' }}>No matching questions found</h3>
              <p style={{ color: '#666', fontSize: '0.92rem', margin: '0 0 16px 0' }}>Try searching with a different term or browse by category.</p>
              <button
                onClick={() => { setSearchQuery(''); setSelectedCategory('all'); }}
                style={{ background: '#007A3D', color: '#FFF', border: 'none', padding: '8px 18px', borderRadius: '6px', cursor: 'pointer', fontWeight: 600 }}
              >
                Reset Search
              </button>
            </div>
          )}
        </div>

        {/* Still Have Questions Box */}
        <div style={{
          background: '#FFF',
          borderRadius: '16px',
          border: '1px solid #EAEAEA',
          padding: '36px',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '24px',
          boxShadow: '0 4px 20px rgba(0,0,0,0.03)',
          textAlign: 'left'
        }}>
          <div>
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#111', margin: '0 0 6px 0' }}>
              Still have questions? We're here to help!
            </h3>
            <p style={{ color: '#666', fontSize: '0.94rem', margin: 0 }}>
              Speak directly with our dry fruits customer support team or send us your inquiry.
            </p>
          </div>
          <div style={{ display: 'flex', gap: '12px', flexWrap: 'wrap' }}>
            <a
              href="https://wa.me/918929191914"
              target="_blank"
              rel="noreferrer"
              style={{
                background: '#25D366',
                color: '#FFF',
                padding: '12px 22px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 12px rgba(37, 211, 102, 0.3)'
              }}
            >
              <MessageSquare size={16} /> WhatsApp Support
            </a>
            <a
              href="tel:+918929191914"
              style={{
                background: '#007A3D',
                color: '#FFF',
                padding: '12px 22px',
                borderRadius: '8px',
                fontWeight: 700,
                fontSize: '0.92rem',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px'
              }}
            >
              <Phone size={16} /> +91-89291 91914
            </a>
          </div>
        </div>

      </div>
    </div>
  );
};
