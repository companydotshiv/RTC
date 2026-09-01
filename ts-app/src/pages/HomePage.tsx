import React, { useState, useEffect } from 'react';
import type { Product } from '../types/product';
import { adminStore } from '../data/adminStore';
import { Star, ChevronLeft, ChevronRight, Sparkles, ArrowRight, Handshake, ArrowUpRight, CheckCircle2, Building2, PhoneCall, Send, ShieldCheck, Truck, MessageCircle } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

interface HomePageProps {
  onSelectProduct: (product: Product) => void;
  setCurrentView: (view: string) => void;
  onToggleWishlist?: (productId: number) => void;
  wishlistIds?: number[];
  cartQuantities?: { [id: number]: number };
  onAddToCart?: (productId: number, qty?: number) => void;
  onUpdateCartQty?: (productId: number, qty: number) => void;
}

export const HomePage: React.FC<HomePageProps> = ({
  onSelectProduct,
  setCurrentView,
  onToggleWishlist,
  wishlistIds = [],
  cartQuantities = {},
  onAddToCart,
  onUpdateCartQty
}) => {
  const [, setRenderTick] = useState(0);

  useEffect(() => {
    const unsubscribe = adminStore.subscribe(() => {
      setRenderTick((prev) => prev + 1);
    });
    return () => unsubscribe();
  }, []);

  const products = adminStore.products;
  const [inquirySubmitted, setInquirySubmitted] = useState(false);
  const [inquiryName, setInquiryName] = useState('');
  const [inquiryPhone, setInquiryPhone] = useState('');
  const [inquiryDetails, setInquiryDetails] = useState('');

  const heroBanners = [
    { id: 1, image: '/slide-2.jpg', title: 'RTC Foods Premium Dry Fruits' },
    { id: 2, image: '/slide-3.png', title: 'Festive & Luxury Gift Boxes' },
    { id: 3, image: '/slide-4.png', title: 'Pure Natural Quality' },
    { id: 4, image: '/slide-5.jpg', title: 'Wholesale & Private Labelling' },
  ];
  const [currentHeroSlide, setCurrentHeroSlide] = useState<number>(0);
  const [isHoveredHero, setIsHoveredHero] = useState<boolean>(false);

  useEffect(() => {
    if (isHoveredHero) return;
    const slideTimer = setInterval(() => {
      setCurrentHeroSlide((prev) => (prev + 1) % heroBanners.length);
    }, 4500);
    return () => clearInterval(slideTimer);
  }, [isHoveredHero, heroBanners.length]);

  const handlePrevHeroSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentHeroSlide((prev) => (prev - 1 + heroBanners.length) % heroBanners.length);
  };

  const handleNextHeroSlide = (e?: React.MouseEvent) => {
    if (e) e.stopPropagation();
    setCurrentHeroSlide((prev) => (prev + 1) % heroBanners.length);
  };

  return (
    <div>
      {/* 1. Hero Banner Slider - Edge to Edge */}
      <section className="hero-slider-section">
        <div
          className="hero-slider-wrapper"
          onMouseEnter={() => setIsHoveredHero(true)}
          onMouseLeave={() => setIsHoveredHero(false)}
        >
          {heroBanners.map((banner, index) => (
            <div
              key={banner.id}
              className={`hero-slide ${index === currentHeroSlide ? 'active' : ''}`}
              onClick={() => setCurrentView('products')}
            >
              <img
                src={banner.image}
                alt={banner.title}
                loading={index === 0 ? 'eager' : 'lazy'}
              />
            </div>
          ))}

          {/* Previous & Next Chevrons */}
          <button
            className="hero-slider-nav-btn hero-slider-prev"
            onClick={handlePrevHeroSlide}
            aria-label="Previous Slide"
          >
            <ChevronLeft size={22} />
          </button>
          <button
            className="hero-slider-nav-btn hero-slider-next"
            onClick={handleNextHeroSlide}
            aria-label="Next Slide"
          >
            <ChevronRight size={22} />
          </button>

          {/* Dots Indicator */}
          <div className="hero-slider-dots">
            {heroBanners.map((_, index) => (
              <button
                key={index}
                className={`hero-slider-dot ${index === currentHeroSlide ? 'active' : ''}`}
                onClick={(e) => {
                  e.stopPropagation();
                  setCurrentHeroSlide(index);
                }}
                aria-label={`Go to slide ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </section>

      {/* 2. Best Sellers Section */}
      <section className="bestsellers-section">
        <div className="bestsellers-wrapper">
          <div className="section-header-modern">
            <h2 className="section-main-title">
              Best Sellers
            </h2>
            <p className="section-sub-title">
              Our most-loved, premium quality dry fruits, nuts & superfood seeds delivered fresh to your doorstep
            </p>
          </div>

          {/* Bestsellers Grid - 2 Rows (8 Products) */}
          <div className="bestsellers-grid">
            {(() => {
              const list = [1, 4, 3, 6, 2, 7, 5, 9].map((id) => products.find((prod) => prod.id === id)).filter(Boolean) as Product[];
              const displayList = list.length > 0 ? list : products.slice(0, 8);
              return displayList.map((p) => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onSelectProduct={onSelectProduct}
                  onAddToCart={onAddToCart}
                  onUpdateCartQty={onUpdateCartQty}
                  cartQty={cartQuantities[p.id] || 0}
                  isWishlisted={wishlistIds.includes(p.id)}
                  onToggleWishlist={onToggleWishlist}
                />
              ));
            })()}
          </div>

          {/* Bottom Explore All Button */}
          <div style={{ textAlign: 'center', marginTop: '36px' }}>
            <button
              className="btn btn-gold"
              onClick={() => setCurrentView('products')}
              style={{
                background: '#15803D',
                borderColor: '#15803D',
                color: '#ffffff',
                padding: '12px 32px',
                borderRadius: '30px',
                fontWeight: 600,
                fontSize: '0.95rem',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(21, 128, 61, 0.2)',
                cursor: 'pointer',
                transition: 'all 0.2s ease'
              }}
            >
              <span>View All Products</span>
              <ArrowRight size={16} />
            </button>
          </div>
        </div>
      </section>

      {/* 3. Shop by Category Showcase */}
      <section className="category-showcase-section">
        <div className="container">
          <div className="section-header-modern">
            <h2 className="section-main-title">
              Shop by Category
            </h2>
            <p className="section-sub-title">
              Explore our handpicked range of farm-fresh dry fruits, organic superfood seeds, exotic berries & gourmet mixes
            </p>
          </div>

          <div className="category-modern-grid">
            {[
              { name: 'Almonds', sub: 'California & Mamra', img: '/cat_almond.png', tint: '#ECFDF5', glow: 'rgba(21, 128, 61, 0.15)', count: '8 Items' },
              { name: 'Cashews', sub: 'Jumbo W240 & W320', img: '/cat_cashew.png', tint: '#FFFBEB', glow: 'rgba(217, 119, 6, 0.15)', count: '6 Items' },
              { name: 'Walnuts', sub: 'Chilean & Kashmiri', img: '/cat_walnut.png', tint: '#FEF3C7', glow: 'rgba(180, 83, 9, 0.15)', count: '5 Items' },
              { name: 'Dry Figs', sub: 'Diamond & Natural Gold', img: '/cat_dry_figs.png', tint: '#FFF7ED', glow: 'rgba(234, 88, 12, 0.15)', count: '4 Items' },
              { name: 'Raisins', sub: 'Kishmish & Long Black', img: '/cat_raisins.png', tint: '#F5F3FF', glow: 'rgba(124, 58, 237, 0.15)', count: '5 Items' },
              { name: 'Dried Apricot', sub: 'Sun-Dried Turkish', img: '/cat_apricot.png', tint: '#FFF7ED', glow: 'rgba(249, 115, 22, 0.15)', count: '3 Items' },
              { name: 'Seeds & Berries', sub: 'Chia, Flax & Pumpkin', img: '/cat_seeds.png', tint: '#ECFDF5', glow: 'rgba(5, 150, 105, 0.15)', count: '10 Items' },
              { name: 'Dehydrated Fruits', sub: 'Cranberries & Kiwis', img: '/cat_dehydrated.png', tint: '#FFF1F2', glow: 'rgba(225, 29, 72, 0.15)', count: '7 Items' },
              { name: 'Whole Spices', sub: 'Cardamom & Cloves', img: '/cat_spices.png', tint: '#FFFBEB', glow: 'rgba(217, 119, 6, 0.15)', count: '9 Items' },
              { name: 'Herbs & Seasoning', sub: 'Pure Kasuri Methi', img: '/cat_herbs.png', tint: '#F0FDF4', glow: 'rgba(22, 163, 74, 0.15)', count: '4 Items' },
              { name: 'Fusion Mixes', sub: 'Energy & Snack Blends', img: '/cat_fusion.png', tint: '#FEF2F2', glow: 'rgba(239, 68, 68, 0.15)', count: '6 Items' },
              { name: 'Festive Gifting', sub: 'Luxury Gift Hampers', img: '/cat_snacking.png', tint: '#FAF5FF', glow: 'rgba(147, 51, 234, 0.15)', count: '12 Items' }
            ].map((catItem, cIdx) => (
              <div
                key={cIdx}
                className="category-modern-card"
                onClick={() => setCurrentView('products')}
                style={{ '--cat-tint': catItem.tint, '--cat-glow': catItem.glow } as React.CSSProperties}
              >
                <div className="cat-img-halo">
                  <img src={catItem.img} alt={catItem.name} className="cat-product-img" />
                </div>
                <div className="cat-content-wrap">
                  <h3 className="cat-card-title">{catItem.name}</h3>
                  <span className="cat-card-sub">{catItem.sub}</span>
                  <div className="cat-explore-pill">
                    <span>{catItem.count}</span>
                    <ArrowRight size={12} className="cat-arrow" />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>


      {/* 4. Trending Products Section */}
      <section className="section" style={{ background: '#FBF9F4', padding: '60px 0' }}>
        <div className="container">
          <div className="section-header-modern">
            <h2 className="section-main-title">
              Trending Products
            </h2>
            <p className="section-sub-title">
              Explore freshly packed exotic fruits, nutritious seeds and whole nuts curated for wellness
            </p>
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button className="carousel-nav-btn left-nav" title="Previous Products" onClick={() => setCurrentView('products')}>
              <ChevronLeft size={22} />
            </button>

            <div className="bestsellers-grid">
              {(() => {
                const list = [5, 2, 6, 7].map((id) => products.find((prod) => prod.id === id)).filter(Boolean) as Product[];
                const displayList = list.length > 0 ? list : products.slice(0, 4);
                return displayList.map((p) => (
                  <ProductCard
                    key={p.id}
                    product={p}
                    onSelectProduct={onSelectProduct}
                    onAddToCart={onAddToCart}
                    onUpdateCartQty={onUpdateCartQty}
                    cartQty={cartQuantities[p.id] || 0}
                    isWishlisted={wishlistIds.includes(p.id)}
                    onToggleWishlist={onToggleWishlist}
                  />
                ));
              })()}
            </div>

            <button className="carousel-nav-btn right-nav" title="Next Products" onClick={() => setCurrentView('products')}>
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      </section>

      {/* Screenshot 6: Google Customer Reviews 1:1 Widget Layout */}
      <section className="section" style={{ background: '#F9F9F9', padding: '60px 0' }}>
        <div className="container">
          <div className="section-header" style={{ marginBottom: '40px' }}>
            <span className="section-subtitle" style={{ letterSpacing: '2px', fontSize: '0.85rem', color: '#888' }}>WHAT OUR CUSTOMERS SAY</span>
            <h2 className="section-title" style={{ fontSize: '2.5rem', fontWeight: 700, color: '#222' }}>Latest Buyers Reviews</h2>
          </div>

          <div className="reviews-main-grid">
            {/* Left Google Badge Box */}
            <div className="reviews-badge-box">
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#FFF', border: '1px solid #E0E0E0', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/rtc-google-pfp.png" alt="RTC Foods" style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
                </div>
                <div>
                  <h3 style={{ fontSize: '1.2rem', fontWeight: 700, margin: 0, color: '#222' }}>RTC Foods</h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginTop: '4px' }}>
                    <span style={{ fontSize: '1.1rem', fontWeight: 'bold', color: '#F5A623' }}>4.8</span>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(5)].map((_, i) => (
                        <Star key={i} size={16} fill="#F5A623" color="#F5A623" />
                      ))}
                    </div>
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666', marginTop: '4px' }}>
                    Based on 30 reviews
                  </div>
                  <div style={{ fontSize: '0.85rem', color: '#666' }}>
                    powered by <span style={{ fontWeight: 'bold', color: '#4285F4' }}>G</span><span style={{ fontWeight: 'bold', color: '#EA4335' }}>o</span><span style={{ fontWeight: 'bold', color: '#FBBC05' }}>o</span><span style={{ fontWeight: 'bold', color: '#4285F4' }}>g</span><span style={{ fontWeight: 'bold', color: '#34A853' }}>l</span><span style={{ fontWeight: 'bold', color: '#EA4335' }}>e</span>
                  </div>
                </div>
              </div>
              <a 
                href="https://www.google.com/search?hl=en-IN&gl=in&q=Phase-V,+RTC+Foods,+HSIIDC,+163,+Sector-53,+Industrial+Area,+Kundli,+Sonipat,+Haryana+131028&ludocid=14242186497955233972&lsig=AB86z5Vi2Ia5juhZ9to4g86wgfdR#lrd=0x390dab57b88d5e1f:0xc5a669295b7c80b4,3" 
                target="_blank" 
                rel="noopener noreferrer"
                style={{ textDecoration: 'none', display: 'inline-block' }}
              >
                <button style={{ marginTop: '10px', background: '#1A73E8', color: '#FFF', border: 'none', borderRadius: '20px', padding: '8px 20px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}>
                  review us on <span style={{ fontWeight: 'bold' }}>G</span>
                </button>
              </a>
            </div>

            {/* Right Reviews Carousel */}
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center', width: '100%' }}>
              <div className="reviews-cards-grid">
                {/* Review 1 */}
                <div style={{ background: '#ECECEC', padding: '20px', borderRadius: '12px', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '16px', right: '16px', fontWeight: 'bold', color: '#4285F4' }}>G</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#795548', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>R</div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#1A0DAB' }}>Ram Bhawan Tiwari</h4>
                      <span style={{ fontSize: '0.8rem', color: '#777' }}>1 month ago</span>
                    </div>
                  </div>
                  <div style={{ color: '#F5A623', marginBottom: '10px' }}>★★★★★</div>
                </div>

                {/* Review 2 */}
                <div style={{ background: '#ECECEC', padding: '20px', borderRadius: '12px', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '16px', right: '16px', fontWeight: 'bold', color: '#4285F4' }}>G</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <div style={{ width: '42px', height: '42px', borderRadius: '50%', background: '#3F51B5', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold' }}>R</div>
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#1A0DAB' }}>Raju Singh</h4>
                      <span style={{ fontSize: '0.8rem', color: '#777' }}>2 months ago</span>
                    </div>
                  </div>
                  <div style={{ color: '#F5A623', marginBottom: '10px' }}>★★★★☆</div>
                  <p style={{ fontSize: '0.88rem', color: '#333', lineHeight: 1.4 }}>
                    Best quality dry fruits, fresh stock, excellent packaging, and timely delivery. Highly recommended!" ☀️☀️☀️☀️☀️
                  </p>
                </div>

                {/* Review 3 */}
                <div style={{ background: '#ECECEC', padding: '20px', borderRadius: '12px', position: 'relative' }}>
                  <span style={{ position: 'absolute', top: '16px', right: '16px', fontWeight: 'bold', color: '#4285F4' }}>G</span>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '10px' }}>
                    <img src="/punita_moriya_pfp.png" alt="Punita moriya" style={{ width: '42px', height: '42px', borderRadius: '50%', objectFit: 'cover' }} />
                    <div>
                      <h4 style={{ fontSize: '0.95rem', fontWeight: 700, margin: 0, color: '#1A0DAB' }}>Punita moriya</h4>
                      <span style={{ fontSize: '0.8rem', color: '#777' }}>6 months ago</span>
                    </div>
                  </div>
                  <div style={{ color: '#F5A623', marginBottom: '10px' }}>★★★★★</div>
                  <p style={{ fontSize: '0.88rem', color: '#333', lineHeight: 1.4 }}>
                    Fresh, tasty food with good quality and hygienic delivery/packaging. Customers reported good taste and perfect packing
                  </p>
                </div>
              </div>

              <button className="carousel-nav-btn right-nav" style={{ position: 'absolute', right: '-20px', zIndex: 4 }} title="Next">
                <ChevronRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot 7: @Rtcfoodsdelhi Instagram Section */}
      <section className="section" style={{ background: '#F4F4F4', padding: '60px 0', textAlign: 'center' }}>
        <div className="container">
          <h2 style={{ fontSize: '2.2rem', fontWeight: 700, marginBottom: '30px', color: '#222' }}>@Rtcfoodsdelhi</h2>

          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '30px' }}>
            <div style={{ width: '48px', height: '48px', borderRadius: '50%', background: '#007A3D', color: '#FFF', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '1.2rem' }}>
              RTC
            </div>
            <div style={{ textAlign: 'left' }}>
              <h4 style={{ fontSize: '1rem', fontWeight: 700, margin: 0 }}>rtcfoodsdelhi</h4>
              <p style={{ fontSize: '0.82rem', color: '#666', margin: 0 }}>At RTC FOODS, we believe in the extraordinary power of nature to bring health and joy to your daily life.</p>
            </div>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', gap: '12px' }}>
            <button style={{ background: '#333', color: '#FFF', border: 'none', borderRadius: '6px', padding: '10px 20px', fontWeight: 600, fontSize: '0.9rem', cursor: 'pointer' }}>
              Load More
            </button>
            <a href="https://instagram.com/rtcfoodsdelhi" target="_blank" rel="noreferrer" style={{ background: '#3897F0', color: '#FFF', textDecoration: 'none', borderRadius: '6px', padding: '10px 20px', fontWeight: 600, fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '6px' }}>
              📷 Follow on Instagram
            </a>
          </div>
        </div>
      </section>

      {/* Enhanced Partners & Enterprise Trust Section */}
      <section className="section" style={{ background: 'linear-gradient(180deg, #072e18 0%, #031c0e 100%)', padding: '70px 0 60px 0', position: 'relative', overflow: 'hidden' }}>
        {/* Ambient Glows */}
        <div style={{ position: 'absolute', top: '-10%', left: '20%', width: '400px', height: '400px', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(50px)' }} />
        <div style={{ position: 'absolute', bottom: '-10%', right: '15%', width: '450px', height: '450px', background: 'radial-gradient(circle, rgba(0, 200, 100, 0.1) 0%, transparent 70%)', pointerEvents: 'none', filter: 'blur(60px)' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          {/* Section Header */}
          <div style={{ textAlign: 'center', maxWidth: '820px', margin: '0 auto 44px auto' }}>
            <h2 style={{ fontSize: '2.6rem', fontWeight: 800, color: '#FFFFFF', margin: '0 0 14px 0', lineHeight: 1.25 }}>
              Powering India's Foremost <span style={{ background: 'linear-gradient(135deg, #F5D061 0%, #D4AF37 50%, #FFE082 100%)', WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent' }}>Retail & Quick-Commerce</span> Brands
            </h2>
            <p style={{ color: 'rgba(255, 255, 255, 0.78)', fontSize: '1.05rem', lineHeight: 1.6, margin: 0 }}>
              From 10-minute grocery delivery giants to nationwide supermarket chains, leading food brands trust RTC for unmatched quality, batch consistency & seamless bulk fulfillment.
            </p>
          </div>



          {/* Dual Marquee Rows */}
          <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', marginBottom: '36px' }}>
            {/* Row 1: Forward Track */}
            <div className="marquee-container">
              <div className="marquee-track">
                {[
                  { name: 'Zepto', img: '/partner_zepto.png', cat: 'Quick Commerce', desc: '10-Min Dark Store Fulfillment' },
                  { name: 'Blinkit', img: '/partner_blinkit.png', cat: 'Instant Grocery', desc: 'Nationwide Express Network' },
                  { name: 'Swiggy Instamart', img: '/partner_swiggy.png', cat: 'On-Demand Delivery', desc: 'Tier 1 & 2 Metro Supply' },
                  { name: 'Zomato Hyperpure', img: '/partner_zomato.png', cat: 'HORECA & HoReCa', desc: 'Restaurant Sourcing Partner' },
                  // Seamless loop duplicate
                  { name: 'Zepto', img: '/partner_zepto.png', cat: 'Quick Commerce', desc: '10-Min Dark Store Fulfillment' },
                  { name: 'Blinkit', img: '/partner_blinkit.png', cat: 'Instant Grocery', desc: 'Nationwide Express Network' },
                  { name: 'Swiggy Instamart', img: '/partner_swiggy.png', cat: 'On-Demand Delivery', desc: 'Tier 1 & 2 Metro Supply' },
                  { name: 'Zomato Hyperpure', img: '/partner_zomato.png', cat: 'HORECA & HoReCa', desc: 'Restaurant Sourcing Partner' },
                ].map((partner, idx) => (
                  <div key={`row1-${idx}`} className="partner-modern-card">
                    <div className="partner-logo-box">
                      <img src={partner.img} alt={partner.name} />
                    </div>
                    <div className="partner-card-meta">
                      <span className="partner-card-category">{partner.cat}</span>
                      <span className="partner-card-status">{partner.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Row 2: Reverse Track */}
            <div className="marquee-container">
              <div className="marquee-track-reverse">
                {[
                  { name: 'bigbasket', img: '/partner_bigbasket.png', cat: 'E-Supermarket', desc: 'Pan-India Distribution Hub' },
                  { name: 'METRO Cash & Carry', img: '/partner_metro.png', cat: 'Wholesale B2B', desc: 'Institutional Bulk Partner' },
                  { name: 'Country Delight', img: '/partner_countrydelight.png', cat: 'Pure Sourcing', desc: 'Daily Direct Supply' },
                  { name: 'Pansari Group', img: '/partner_pansari.png', cat: 'Modern FMCG', desc: 'Retail Distribution Chain' },
                  // Seamless loop duplicate
                  { name: 'bigbasket', img: '/partner_bigbasket.png', cat: 'E-Supermarket', desc: 'Pan-India Distribution Hub' },
                  { name: 'METRO Cash & Carry', img: '/partner_metro.png', cat: 'Wholesale B2B', desc: 'Institutional Bulk Partner' },
                  { name: 'Country Delight', img: '/partner_countrydelight.png', cat: 'Pure Sourcing', desc: 'Daily Direct Supply' },
                  { name: 'Pansari Group', img: '/partner_pansari.png', cat: 'Modern FMCG', desc: 'Retail Distribution Chain' },
                ].map((partner, idx) => (
                  <div key={`row2-${idx}`} className="partner-modern-card">
                    <div className="partner-logo-box">
                      <img src={partner.img} alt={partner.name} />
                    </div>
                    <div className="partner-card-meta">
                      <span className="partner-card-category" style={{ color: '#92400E', background: '#FEF3C7' }}>{partner.cat}</span>
                      <span className="partner-card-status">{partner.desc}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Bottom Partnership Callout Strip */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(212, 175, 55, 0.3)',
            borderRadius: '16px',
            padding: '20px 28px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '16px'
          }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
              <div style={{
                width: '42px',
                height: '42px',
                borderRadius: '50%',
                background: 'rgba(212, 175, 55, 0.2)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: '#F5D061',
                flexShrink: 0
              }}>
                <Handshake size={22} />
              </div>
              <div>
                <h4 style={{ color: '#FFFFFF', fontSize: '1.05rem', margin: 0, fontWeight: 700 }}>
                  Looking to onboard RTC for Bulk Supply, FMCG Retail or Private Labeling?
                </h4>
                <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem', margin: '2px 0 0 0' }}>
                  Get custom tiered pricing, sample batches, and dedicated institutional account management.
                </p>
              </div>
            </div>

            <a
              href="#wholesale"
              style={{
                background: 'linear-gradient(135deg, #D4AF37 0%, #AA820A 100%)',
                color: '#031C0E',
                fontWeight: 800,
                fontSize: '0.92rem',
                padding: '12px 24px',
                borderRadius: '8px',
                textDecoration: 'none',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '8px',
                boxShadow: '0 4px 14px rgba(212, 175, 55, 0.4)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.transform = 'translateY(-2px)';
                e.currentTarget.style.boxShadow = '0 6px 20px rgba(212, 175, 55, 0.6)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = 'translateY(0)';
                e.currentTarget.style.boxShadow = '0 4px 14px rgba(212, 175, 55, 0.4)';
              }}
            >
              Partner With RTC <ArrowUpRight size={16} />
            </a>
          </div>
        </div>
      </section>

      {/* 6. Bulk Orders & Private Labeling Modern Section */}
      <section
        id="wholesale"
        style={{
          background: 'linear-gradient(135deg, #031D12 0%, #063320 50%, #0B4A2E 100%)',
          color: '#FFF',
          padding: '64px 0 70px 0',
          position: 'relative',
          overflow: 'hidden',
          borderTop: '1px solid rgba(255, 255, 255, 0.08)',
          boxShadow: 'inset 0 1px 0 rgba(255, 255, 255, 0.05)'
        }}
      >
        {/* Subtle Ambient Decorative Glows */}
        <div style={{ position: 'absolute', top: '-80px', left: '10%', width: '380px', height: '380px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(21, 128, 61, 0.18) 0%, transparent 70%)', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', bottom: '-80px', right: '5%', width: '420px', height: '420px', borderRadius: '50%', background: 'radial-gradient(circle, rgba(212, 175, 55, 0.12) 0%, transparent 70%)', pointerEvents: 'none' }} />

        <div className="container" style={{ position: 'relative', zIndex: 2 }}>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))', gap: '48px', alignItems: 'center' }}>
            
            {/* Left Column: B2B Value Proposition */}
            <div>
              <div style={{ display: 'inline-flex', alignItems: 'center', gap: '8px', background: 'rgba(212, 175, 55, 0.12)', border: '1px solid rgba(212, 175, 55, 0.3)', padding: '6px 14px', borderRadius: '24px', marginBottom: '16px' }}>
                <Building2 size={15} color="#FCD34D" />
                <span style={{ color: '#FCD34D', fontWeight: 600, fontSize: '0.80rem', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
                  Enterprise & Private Labeling
                </span>
              </div>

              <h2 style={{ fontSize: 'clamp(1.9rem, 3.2vw, 2.6rem)', color: '#FFFFFF', lineHeight: 1.22, fontWeight: 700, margin: '0 0 16px 0', letterSpacing: '-0.02em' }}>
                Looking for Wholesale Supply or Customized Packaging?
              </h2>

              <p style={{ color: 'rgba(255, 255, 255, 0.82)', fontSize: '1.02rem', lineHeight: 1.6, marginBottom: '26px', maxWidth: '540px' }}>
                We partner with leading supermarket chains, luxury hotel groups, corporate gifting programs, and confectionery brands across India with verified batch certificates and tiered contract pricing.
              </p>

              {/* 4 Core B2B Pillars */}
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(230px, 1fr))', gap: '14px', marginBottom: '30px' }}>
                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <CheckCircle2 size={18} color="#4ADE80" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.90rem', color: '#FFFFFF' }}>Custom Private Labeling</strong>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>Pouch, jar, and tin branding</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <ShieldCheck size={18} color="#4ADE80" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.90rem', color: '#FFFFFF' }}>FSSAI & Lab Tested</strong>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>Triple-sorted premium grades</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <Truck size={18} color="#4ADE80" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.90rem', color: '#FFFFFF' }}>Pan-India Cold Chain</strong>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>Bulk dispatch within 24-48h</span>
                  </div>
                </div>

                <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', background: 'rgba(255, 255, 255, 0.05)', padding: '12px 14px', borderRadius: '10px', border: '1px solid rgba(255, 255, 255, 0.08)' }}>
                  <Building2 size={18} color="#4ADE80" style={{ flexShrink: 0, marginTop: '2px' }} />
                  <div>
                    <strong style={{ display: 'block', fontSize: '0.90rem', color: '#FFFFFF' }}>GST Invoiced & Tiered</strong>
                    <span style={{ fontSize: '0.78rem', color: 'rgba(255, 255, 255, 0.7)' }}>Dedicated account manager</span>
                  </div>
                </div>
              </div>

              {/* Direct WhatsApp Callout */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
                <a
                  href="https://wa.me/918929191914?text=Hi%20RTC%20Foods,%20I%20would%20like%20to%20inquire%20about%20Bulk%20Order%20/%20Private%20Labeling."
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    background: '#25D366',
                    color: '#FFFFFF',
                    padding: '10px 18px',
                    borderRadius: '8px',
                    fontWeight: 600,
                    fontSize: '0.90rem',
                    textDecoration: 'none',
                    boxShadow: '0 4px 14px rgba(37, 211, 102, 0.35)',
                    transition: 'transform 0.2s ease'
                  }}
                  onMouseEnter={(e) => { e.currentTarget.style.transform = 'translateY(-2px)'; }}
                  onMouseLeave={(e) => { e.currentTarget.style.transform = 'translateY(0)'; }}
                >
                  <MessageCircle size={17} /> Direct WhatsApp Desk
                </a>
                <span style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '0.88rem' }}>
                  or Call <strong>+91-89291 91914</strong>
                </span>
              </div>
            </div>

            {/* Right Column: Clean, Crisp High-Contrast Form Card */}
            <div>
              <div
                style={{
                  background: '#FFFFFF',
                  padding: '36px 32px',
                  borderRadius: '16px',
                  boxShadow: '0 20px 50px rgba(0, 0, 0, 0.28)',
                  border: '1px solid rgba(255, 255, 255, 0.9)',
                  color: '#1E293B'
                }}
              >
                {inquirySubmitted ? (
                  <div style={{ textAlign: 'center', padding: '24px 10px' }}>
                    <div style={{ width: '56px', height: '56px', borderRadius: '50%', background: '#ECFDF5', color: '#15803D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px auto' }}>
                      <CheckCircle2 size={32} />
                    </div>
                    <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#0F172A', marginBottom: '8px' }}>
                      Inquiry Received!
                    </h3>
                    <p style={{ fontSize: '0.94rem', color: '#64748B', lineHeight: 1.5, marginBottom: '20px' }}>
                      Thank you, <strong>{inquiryName || 'Valued Partner'}</strong>. Our B2B enterprise desk will review your requirement and share quotation & wholesale pricing within 2 business hours.
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setInquirySubmitted(false);
                        setInquiryName('');
                        setInquiryPhone('');
                        setInquiryDetails('');
                      }}
                      style={{
                        background: '#F1F5F9',
                        border: '1px solid #CBD5E1',
                        padding: '8px 18px',
                        borderRadius: '6px',
                        fontWeight: 600,
                        fontSize: '0.86rem',
                        color: '#334155',
                        cursor: 'pointer'
                      }}
                    >
                      Submit Another Inquiry
                    </button>
                  </div>
                ) : (
                  <>
                    <div style={{ marginBottom: '22px' }}>
                      <h3 style={{ color: '#0F172A', fontSize: '1.35rem', fontWeight: 700, margin: '0 0 4px 0' }}>
                        Quick Business Inquiry
                      </h3>
                      <p style={{ color: '#64748B', fontSize: '0.86rem', margin: 0 }}>
                        Get custom wholesale quotation & specimen catalogs
                      </p>
                    </div>

                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setInquirySubmitted(true);
                      }}
                      style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                    >
                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                          Your Name / Company Name *
                        </label>
                        <input
                          type="text"
                          required
                          value={inquiryName}
                          onChange={(e) => setInquiryName(e.target.value)}
                          placeholder="e.g. Rahul Verma / Verma Retail"
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '8px',
                            border: '1.5px solid #E2E8F0',
                            background: '#F8FAFC',
                            color: '#0F172A',
                            fontSize: '0.92rem',
                            outline: 'none',
                            transition: 'border-color 0.2s ease',
                            fontFamily: "'Jost', sans-serif"
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = '#15803D'; e.currentTarget.style.background = '#FFFFFF'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                          Mobile Number / WhatsApp *
                        </label>
                        <input
                          type="tel"
                          required
                          value={inquiryPhone}
                          onChange={(e) => setInquiryPhone(e.target.value)}
                          placeholder="+91 98XXX XXXXX"
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '8px',
                            border: '1.5px solid #E2E8F0',
                            background: '#F8FAFC',
                            color: '#0F172A',
                            fontSize: '0.92rem',
                            outline: 'none',
                            transition: 'border-color 0.2s ease',
                            fontFamily: "'Jost', sans-serif"
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = '#15803D'; e.currentTarget.style.background = '#FFFFFF'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; }}
                        />
                      </div>

                      <div>
                        <label style={{ display: 'block', fontSize: '0.82rem', fontWeight: 600, color: '#334155', marginBottom: '5px' }}>
                          Requirement Details & Estimated Quantity *
                        </label>
                        <textarea
                          required
                          rows={3}
                          value={inquiryDetails}
                          onChange={(e) => setInquiryDetails(e.target.value)}
                          placeholder="e.g. 500kg Cashew W240, 200kg California Almonds, Private Label Pouches"
                          style={{
                            width: '100%',
                            padding: '11px 14px',
                            borderRadius: '8px',
                            border: '1.5px solid #E2E8F0',
                            background: '#F8FAFC',
                            color: '#0F172A',
                            fontSize: '0.92rem',
                            outline: 'none',
                            resize: 'vertical',
                            transition: 'border-color 0.2s ease',
                            fontFamily: "'Jost', sans-serif"
                          }}
                          onFocus={(e) => { e.currentTarget.style.borderColor = '#15803D'; e.currentTarget.style.background = '#FFFFFF'; }}
                          onBlur={(e) => { e.currentTarget.style.borderColor = '#E2E8F0'; e.currentTarget.style.background = '#F8FAFC'; }}
                        ></textarea>
                      </div>

                      <button
                        type="submit"
                        style={{
                          width: '100%',
                          padding: '13px 20px',
                          background: 'linear-gradient(135deg, #15803D 0%, #0F6831 100%)',
                          color: '#FFFFFF',
                          border: 'none',
                          borderRadius: '8px',
                          fontWeight: 600,
                          fontSize: '0.96rem',
                          cursor: 'pointer',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          gap: '8px',
                          boxShadow: '0 4px 14px rgba(21, 128, 61, 0.35)',
                          transition: 'all 0.2s ease',
                          marginTop: '4px'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.transform = 'translateY(-2px)';
                          e.currentTarget.style.boxShadow = '0 6px 20px rgba(21, 128, 61, 0.45)';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.transform = 'translateY(0)';
                          e.currentTarget.style.boxShadow = '0 4px 14px rgba(21, 128, 61, 0.35)';
                        }}
                      >
                        <Send size={16} /> Send Bulk Inquiry
                      </button>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>
    </div>
  );
};
