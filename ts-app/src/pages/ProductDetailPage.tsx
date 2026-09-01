import React, { useRef } from 'react';
import type { Product } from '../types/product';
import { adminStore } from '../data/adminStore';
import { ShoppingBag, Star, ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

interface ProductDetailPageProps {
  product: Product;
  setCurrentView: (view: string) => void;
  onAddToCart: (qty: number) => void;
  cartQty?: number;
  onUpdateCartQty?: (productId: number, qty: number) => void;
  onToggleWishlist?: (productId: number) => void;
  isWishlisted?: boolean;
  cartQuantities?: { [id: number]: number };
  wishlistIds?: number[];
  onSelectProduct?: (product: Product) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product: propProduct,
  setCurrentView,
  onAddToCart,
  cartQty = 0,
  onUpdateCartQty,
  onToggleWishlist,
  isWishlisted = false,
  cartQuantities = {},
  wishlistIds = [],
  onSelectProduct
}) => {
  const [, setRenderTick] = React.useState(0);
  const carouselTrackRef = useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    const unsubscribe = adminStore.subscribe(() => {
      setRenderTick((prev) => prev + 1);
    });
    return () => unsubscribe();
  }, []);

  // Fetch freshest product from central store
  const product = adminStore.products.find((p) => p.id === propProduct.id) || propProduct;

  const [selectedWeight, setSelectedWeight] = React.useState(product.weights[0] || '');

  // Static Live Viewers count per page visit
  const [liveViewers] = React.useState<number>(() => Math.floor(Math.random() * 16) + 18);
  const [showLiveToast, setShowLiveToast] = React.useState<boolean>(true);

  // Interactive Rating & Submission State for Feedback Form
  const [rating, setRating] = React.useState<number>(0);
  const [hoverRating, setHoverRating] = React.useState<number>(0);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  const [showStickyBar, setShowStickyBar] = React.useState(false);
  const tabSectionRef = React.useRef<HTMLDivElement>(null);

  // Toast notification for Out of Stock alert
  const [toastMessage] = React.useState<string | null>(null);

  // Evaluate if current product/selected variant size is in stock
  const currentWeightStockData = selectedWeight && product.weightStock ? product.weightStock[selectedWeight] : undefined;
  const isSelectedVariantInStock = currentWeightStockData ? currentWeightStockData.stock : product.stock;

  React.useEffect(() => {
    const handleScroll = () => {
      if (tabSectionRef.current) {
        const rect = tabSectionRef.current.getBoundingClientRect();
        if (rect.top < 0) {
          setShowStickyBar(true);
        } else {
          setShowStickyBar(false);
        }
      } else {
        if (window.scrollY > 600) {
          setShowStickyBar(true);
        } else {
          setShowStickyBar(false);
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div>
      {/* Toast Notification Popup */}
      {toastMessage && (
        <div
          style={{
            position: 'fixed',
            top: '20px',
            right: '20px',
            background: '#d63638',
            color: '#FFFFFF',
            padding: '12px 20px',
            borderRadius: '4px',
            boxShadow: '0 4px 14px rgba(0,0,0,0.2)',
            zIndex: 99999,
            fontWeight: 600,
            fontSize: '0.92rem',
            display: 'flex',
            alignItems: 'center',
            gap: '8px',
            animation: 'fadeIn 0.3s ease'
          }}
        >
          <span>⚠️</span> {toastMessage}
        </div>
      )}

      {/* Main Luxury Product Layout */}
      <section style={{ background: '#FFFFFF', padding: '40px 0 70px 0' }}>
        <div className="container">
          {/* Breadcrumbs Navigation */}
          <div style={{ fontSize: '0.88rem', color: '#6B7280', fontFamily: "'Jost', sans-serif", marginBottom: '20px' }}>
            <span onClick={() => setCurrentView('home')} style={{ cursor: 'pointer', color: '#15803D', fontWeight: 500 }}>Home</span> &nbsp;&gt;&nbsp;
            <span onClick={() => setCurrentView('products')} style={{ cursor: 'pointer', color: '#15803D', fontWeight: 500 }}>Shop</span> &nbsp;&gt;&nbsp;
            <span style={{ color: '#111827', fontWeight: 600 }}>{product.name}</span>
          </div>

          <div className="rtc-pdp-layout">
            
            {/* Left 58% Column: 2-Column Product Photo Grid */}
            <div className="pdp-2col-gallery-grid">
              {(() => {
                const images = product.gallery && product.gallery.length > 0 ? product.gallery : [product.image];
                return images.map((imgSrc, idx) => (
                  <div
                    key={idx}
                    className={`pdp-grid-photo-card ${images.length === 1 || (images.length % 2 !== 0 && idx === 0) ? 'span-full' : ''}`}
                  >
                    <img
                      src={imgSrc}
                      alt={`${product.name} View ${idx + 1}`}
                      className="pdp-grid-photo-img"
                    />

                    {/* Floating Wishlist Heart on first card */}
                    {idx === 0 && (
                      <button
                        type="button"
                        onClick={(e) => {
                          e.stopPropagation();
                          if (onToggleWishlist) onToggleWishlist(product.id);
                        }}
                        className="pdp-grid-wishlist-btn"
                        title={isWishlisted ? "Remove from Wishlist" : "Add to Wishlist"}
                      >
                        <svg width="20" height="20" fill={isWishlisted ? '#DC2626' : 'none'} stroke={isWishlisted ? '#DC2626' : '#374151'} strokeWidth="2" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                        </svg>
                      </button>
                    )}
                  </div>
                ));
              })()}
            </div>

            {/* Right 42% Column: Luxury Product Info (Sticky) */}
            <div className="rtc-pdp-info">
              {/* Badges */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '8px' }}>
                <span className="rtc-brand-tag">
                  🌿 100% Organic Certified
                </span>
                <span className="rtc-bestseller-badge">
                  ★ Bestseller
                </span>
              </div>

              {/* 1. Title */}
              <h1 className="rtc-pdp-title">{product.name}</h1>

              {/* 2. Short Description */}
              <p className="rtc-pdp-short-desc">
                {product.shortDesc || product.description}
              </p>

              {/* 3. Rating */}
              <div className="rtc-rating-bar">
                <div className="rtc-star-rating">
                  <Star size={18} fill="#F5A623" color="#F5A623" />
                  <Star size={18} fill="#F5A623" color="#F5A623" />
                  <Star size={18} fill="#F5A623" color="#F5A623" />
                  <Star size={18} fill="#F5A623" color="#F5A623" />
                  <Star size={18} fill="#F5A623" color="#F5A623" />
                  <span style={{ color: '#111827', fontWeight: 700, marginLeft: '4px' }}>{product.rating || 4.9}</span>
                </div>
                <span className="rtc-review-count">({product.reviewsCount || 142} Verified Reviews)</span>
              </div>

              {/* 4 Quality Pillars Grid - Just Below Review Section */}
              <div className="rtc-trust-grid" style={{ margin: '16px 0 22px 0' }}>
                <div className="rtc-trust-card">
                  <div className="rtc-trust-icon-box">🌿</div>
                  <div style={{ textAlign: 'left' }}>
                    <div className="rtc-trust-title">100% Pure</div>
                    <div className="rtc-trust-sub">Direct From Source</div>
                  </div>
                </div>
                <div className="rtc-trust-card">
                  <div className="rtc-trust-icon-box">🔬</div>
                  <div style={{ textAlign: 'left' }}>
                    <div className="rtc-trust-title">Triple Graded</div>
                    <div className="rtc-trust-sub">Lab Quality Tested</div>
                  </div>
                </div>
                <div className="rtc-trust-card">
                  <div className="rtc-trust-icon-box">⚡</div>
                  <div style={{ textAlign: 'left' }}>
                    <div className="rtc-trust-title">Fast Shipping</div>
                    <div className="rtc-trust-sub">Dispatched in 24h</div>
                  </div>
                </div>
                <div className="rtc-trust-card">
                  <div className="rtc-trust-icon-box">🛡️</div>
                  <div style={{ textAlign: 'left' }}>
                    <div className="rtc-trust-title">Fresh Pack</div>
                    <div className="rtc-trust-sub">Nitrogen Flushed</div>
                  </div>
                </div>
              </div>

              {/* Dynamic Price Banner */}
              <div className="rtc-price-card">
                <div>
                  <div style={{ fontSize: '0.8rem', color: '#6B7280', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px', textAlign: 'left' }}>Special Direct Price</div>
                  <div className="rtc-price-main">
                    <span className="rtc-current-price">₹{product.price}</span>
                    <span className="rtc-old-price">₹{product.originalPrice || Math.round(product.price * 1.28)}</span>
                    <span className="rtc-save-badge">Save {Math.round((((product.originalPrice || Math.round(product.price * 1.28)) - product.price)/(product.originalPrice || Math.round(product.price * 1.28)))*100)}%</span>
                  </div>
                </div>

                <div style={{ textAlign: 'left', marginTop: '4px' }}>
                  <div style={{ fontSize: '0.88rem', color: isSelectedVariantInStock ? '#15803D' : '#DC2626', fontWeight: 700, textAlign: 'left' }}>
                    {isSelectedVariantInStock ? '✔ In Stock & Ready to Ship' : '✖ Currently Out of Stock'}
                  </div>
                  <div style={{ fontSize: '0.78rem', color: '#6B7280', marginTop: '2px', textAlign: 'left' }}>Includes all government taxes</div>
                </div>
              </div>

              {/* Pack Size / Variant Selector */}
              <div style={{ marginBottom: '24px', textAlign: 'left' }}>
                <label style={{ fontSize: '0.92rem', fontWeight: 700, color: '#111827', display: 'block', marginBottom: '8px', textAlign: 'left' }}>
                  Select Pack Size:
                </label>
                <div className="rtc-weight-selector">
                  {product.weights.map((w) => (
                    <button
                      key={w}
                      onClick={() => setSelectedWeight(w)}
                      className={`rtc-weight-btn ${selectedWeight === w ? 'active' : ''}`}
                    >
                      <span>{w}</span>
                    </button>
                  ))}
                </div>
              </div>

              {/* Action Buttons Suite */}
              <div style={{ display: 'flex', gap: '16px', marginBottom: '28px', flexWrap: 'wrap', justifyContent: 'flex-start' }}>

                {cartQty > 0 ? (
                  <>
                    {/* Auto-updating Quantity Stepper (shown when item is in cart) */}
                    <div style={{ display: 'flex', alignItems: 'center', border: '1.5px solid #15803D', borderRadius: '12px', height: '52px', background: '#F0FDF4' }}>
                      <button
                        onClick={() => {
                          if (cartQty > 1 && onUpdateCartQty) onUpdateCartQty(product.id, cartQty - 1);
                          else if (cartQty === 1 && onUpdateCartQty) onUpdateCartQty(product.id, 0);
                        }}
                        style={{ width: '48px', height: '100%', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700, color: '#15803D' }}
                      >
                        –
                      </button>
                      <span style={{ minWidth: '48px', textAlign: 'center', fontWeight: 700, fontSize: '1.05rem', color: '#15803D' }}>
                        {cartQty}
                      </span>
                      <button
                        onClick={() => {
                          if (onUpdateCartQty) onUpdateCartQty(product.id, cartQty + 1);
                        }}
                        style={{ width: '48px', height: '100%', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700, color: '#15803D' }}
                      >
                        +
                      </button>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', color: '#15803D', fontWeight: 600, fontSize: '0.9rem', gap: '6px' }}>
                      <ShoppingBag size={18} />
                      Added to Cart
                    </div>
                  </>
                ) : (
                  /* Primary Add to Cart (shown when item is NOT in cart) */
                  <button
                    className="rtc-btn-primary"
                    style={{ flex: '1', minWidth: '180px' }}
                    onClick={() => onAddToCart(1)}
                  >
                    <ShoppingBag size={20} />
                    Add to Cart
                  </button>
                )}

                {/* Secondary Buy Now */}
                <button
                  className="rtc-btn-gold"
                  style={{ flex: '1', minWidth: '180px', cursor: 'pointer' }}
                  onClick={() => {
                    if (cartQty === 0) {
                      onAddToCart(1);
                    }
                    setCurrentView('checkout');
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                >
                  ⚡ Buy Now
                </button>
              </div>

              {/* Stacked Product Details Sections */}
              <div className="pdp-stacked-sections" ref={tabSectionRef}>

                {/* Section 1: Description */}
                <div className="pdp-stacked-section">
                  <h3 className="pdp-section-heading">Description</h3>
                  <div className="pdp-section-body">
                    {product.paragraphs && product.paragraphs.length > 0 ? (
                      product.paragraphs.map((pText, pIdx) => (
                        <p key={pIdx} className="pdp-paragraph">
                          {pText}
                        </p>
                      ))
                    ) : (
                      <p className="pdp-paragraph">{product.description}</p>
                    )}

                    {product.bullets && product.bullets.length > 0 && (
                      <div className="pdp-bullet-list">
                        <h4 className="pdp-subheading">Key Highlights & Benefits</h4>
                        <ul>
                          {product.bullets.map((b, bIdx) => (
                            <li key={bIdx}>
                              <strong>{b.title}:</strong> {b.text}
                            </li>
                          ))}
                        </ul>
                      </div>
                    )}

                    {product.nutrition && (
                      <div className="pdp-nutrition-box">
                        <h4 className="pdp-subheading">Nutritional Values (per 100g)</h4>
                        <div className="nutrition-grid">
                          {Object.entries(product.nutrition).map(([k, v]) => (
                            <div key={k} className="nutrition-item">
                              <span className="nut-label">{k}</span>
                              <span className="nut-value">{v}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    )}
                  </div>
                </div>

                {/* Section 2: Additional Info */}
                <div className="pdp-stacked-section">
                  <h3 className="pdp-section-heading">Additional Information</h3>
                  <div className="pdp-section-body">
                    <table className="pdp-spec-table">
                      <tbody>
                        {product.additionalInfoTable && product.additionalInfoTable.length > 0 ? (
                          product.additionalInfoTable.map((item, idx) => (
                            <tr key={idx}>
                              <td className="spec-label">{item.label}</td>
                              <td className="spec-value">{item.value}</td>
                            </tr>
                          ))
                        ) : (
                          <>
                            <tr>
                              <td className="spec-label">Country of Origin</td>
                              <td className="spec-value">{product.origin || 'India / Imported'}</td>
                            </tr>
                            <tr>
                              <td className="spec-label">Brand</td>
                              <td className="spec-value">RTC FOODS</td>
                            </tr>
                            <tr>
                              <td className="spec-label">Shelf Life</td>
                              <td className="spec-value">{product.shelfLife || '12 Months'}</td>
                            </tr>
                            <tr>
                              <td className="spec-label">Available Weights</td>
                              <td className="spec-value">{product.weights.join(', ')}</td>
                            </tr>
                            {product.sku && (
                              <tr>
                                <td className="spec-label">SKU Code</td>
                                <td className="spec-value">{product.sku}</td>
                              </tr>
                            )}
                            <tr>
                              <td className="spec-label">Consumer Care</td>
                              <td className="spec-value">RTC Foods — info@rtcfoods.in</td>
                            </tr>
                          </>
                        )}
                      </tbody>
                    </table>
                  </div>
                </div>

                {/* Section 3: Customer Reviews */}
                <div className="pdp-stacked-section">
                  <h3 className="pdp-section-heading">Reviews ({product.reviewsCount || 142})</h3>
                  <div className="pdp-section-body">

                    {/* Existing Reviews */}
                    {product.reviews && product.reviews.length > 0 && (
                      <div className="pdp-reviews-list">
                        {product.reviews.map((rev, rIdx) => (
                          <div key={rIdx} className="pdp-review-card">
                            <div className="pdp-review-header">
                              <div className="pdp-review-avatar">
                                {rev.name.charAt(0)}
                              </div>
                              <div className="pdp-review-meta">
                                <div className="pdp-review-name">
                                  {rev.name}
                                  {rev.verified && <span className="pdp-verified-badge">✔ Verified</span>}
                                </div>
                                <div className="pdp-review-stars">
                                  {[1, 2, 3, 4, 5].map((s) => (
                                    <Star key={s} size={14} fill={s <= rev.rating ? '#F5A623' : 'transparent'} color={s <= rev.rating ? '#F5A623' : '#CBD5E1'} />
                                  ))}
                                  <span className="pdp-review-date">{new Date(rev.date).toLocaleDateString('en-IN', { year: 'numeric', month: 'short', day: 'numeric' })}</span>
                                </div>
                              </div>
                            </div>
                            <div className="pdp-review-title">{rev.title}</div>
                            <p className="pdp-review-text">{rev.text}</p>
                          </div>
                        ))}
                      </div>
                    )}
                    {isSubmitted ? (
                      <div className="pdp-review-success">
                        ✔ Thank you! Your review has been submitted for verification.
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setIsSubmitted(true);
                        }}
                        className="pdp-review-form"
                      >
                        <h4 className="pdp-subheading" style={{ marginBottom: '14px' }}>
                          Leave a Review for {product.name}
                        </h4>

                        {/* Star Rating Picker */}
                        <div style={{ marginBottom: '16px' }}>
                          <label style={{ display: 'block', fontSize: '0.86rem', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>
                            Your Rating <span style={{ color: '#DC2626' }}>*</span>
                          </label>
                          <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                            {[1, 2, 3, 4, 5].map((starVal) => {
                              const isFilled = starVal <= (hoverRating || rating);
                              return (
                                <Star
                                  key={starVal}
                                  size={20}
                                  fill={isFilled ? '#F5A623' : 'transparent'}
                                  color={isFilled ? '#F5A623' : '#CBD5E1'}
                                  onClick={() => setRating(starVal)}
                                  onMouseEnter={() => setHoverRating(starVal)}
                                  onMouseLeave={() => setHoverRating(0)}
                                  style={{ cursor: 'pointer', transition: 'all 0.15s ease' }}
                                />
                              );
                            })}
                            {rating > 0 && (
                              <span style={{ fontSize: '0.82rem', color: '#15803D', fontWeight: 600, marginLeft: '6px' }}>
                                ({rating}/5 Stars)
                              </span>
                            )}
                          </div>
                          <input
                            type="number"
                            required
                            value={rating || ''}
                            onChange={() => {}}
                            style={{ opacity: 0, width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }}
                          />
                        </div>

                        {/* Review Comment */}
                        <div style={{ marginBottom: '16px' }}>
                          <label style={{ display: 'block', fontSize: '0.86rem', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>
                            Your Review <span style={{ color: '#DC2626' }}>*</span>
                          </label>
                          <textarea
                            rows={4}
                            required
                            placeholder="Tell us about the crunch, taste, and freshness..."
                            className="pdp-form-input"
                          />
                        </div>

                        {/* Name & Email */}
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px', marginBottom: '16px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.86rem', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>
                              Name <span style={{ color: '#DC2626' }}>*</span>
                            </label>
                            <input
                              type="text"
                              required
                              placeholder="Your Name"
                              className="pdp-form-input"
                            />
                          </div>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.86rem', color: '#475569', fontWeight: 600, marginBottom: '6px' }}>
                              Email <span style={{ color: '#DC2626' }}>*</span>
                            </label>
                            <input
                              type="email"
                              required
                              placeholder="Your Email"
                              className="pdp-form-input"
                            />
                          </div>
                        </div>

                        <button
                          type="submit"
                          className="btn btn-gold"
                          style={{
                            background: '#15803D',
                            borderColor: '#15803D',
                            color: '#FFFFFF',
                            padding: '10px 28px',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            cursor: 'pointer'
                          }}
                        >
                          Submit Review
                        </button>
                      </form>
                    )}
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* YOU MAY ALSO LIKE CAROUSEL SECTION */}
      {/* ========================================================================= */}
      {(() => {
        const allProds = adminStore.products;
        const sameCatProds = allProds.filter((p) => p.category === product.category && p.id !== product.id);
        const otherProds = allProds.filter((p) => p.category !== product.category && p.id !== product.id);
        const relatedList = [...sameCatProds, ...otherProds].slice(0, 8);

        return (
          <section className="section" style={{ background: '#FAF8F5', borderTop: '1px solid #EAEAEA', padding: '60px 0 70px 0', textAlign: 'left' }}>
            <div className="container">
              {/* Header with Navigation Controls */}
              <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', marginBottom: '24px', flexWrap: 'wrap', gap: '16px' }}>
                <div>
                  <h2 style={{ fontSize: '2rem', fontWeight: 800, color: '#0F1710', margin: 0, letterSpacing: '-0.5px' }}>
                    You May Also Like
                  </h2>
                </div>

                {/* Arrow Controls */}
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                  <button
                    type="button"
                    className="pdp-carousel-arrow-btn"
                    onClick={() => {
                      if (carouselTrackRef.current) {
                        carouselTrackRef.current.scrollBy({ left: -300, behavior: 'smooth' });
                      }
                    }}
                    aria-label="Previous products"
                  >
                    <ChevronLeft size={20} />
                  </button>
                  <button
                    type="button"
                    className="pdp-carousel-arrow-btn"
                    onClick={() => {
                      if (carouselTrackRef.current) {
                        carouselTrackRef.current.scrollBy({ left: 300, behavior: 'smooth' });
                      }
                    }}
                    aria-label="Next products"
                  >
                    <ChevronRight size={20} />
                  </button>
                </div>
              </div>

              {/* Horizontal Scroll Track */}
              <div
                ref={carouselTrackRef}
                className="pdp-carousel-track"
              >
                {relatedList.map((relProd) => (
                  <div key={relProd.id} className="pdp-carousel-card-item">
                    <ProductCard
                      product={relProd}
                      onSelectProduct={(p) => {
                        if (onSelectProduct) {
                          onSelectProduct(p);
                        } else {
                          window.history.pushState({}, '', `/product/${p.slug}`);
                          window.scrollTo(0, 0);
                          setCurrentView('detail');
                        }
                      }}
                      onAddToCart={(pId, qty) => onAddToCart(qty || 1)}
                      onUpdateCartQty={onUpdateCartQty}
                      cartQty={cartQuantities[relProd.id] || 0}
                      isWishlisted={wishlistIds.includes(relProd.id)}
                      onToggleWishlist={() => onToggleWishlist && onToggleWishlist(relProd.id)}
                    />
                  </div>
                ))}
              </div>
            </div>
          </section>
        );
      })()}

      {/* Sticky Bottom Action Bar matching user screenshot */}
      {/* Sticky Bottom Bar on Scroll */}
      <div
        className={`pdp-sticky-bottom-bar ${showStickyBar ? 'active' : ''}`}
      >
        <div className="container pdp-sticky-inner">
          {/* Left: Thumbnail & Title & Price */}
          <div className="pdp-sticky-left">
            <img
              src={product.image}
              alt={product.name}
              className="pdp-sticky-thumb"
            />
            <div className="pdp-sticky-info">
              <span className="pdp-sticky-title">{product.name}</span>
              <span className="pdp-sticky-price">
                ₹{selectedWeight && product.weightPrices ? product.weightPrices[selectedWeight] || product.price : product.price}
                <span className="pdp-sticky-variant-pill">{selectedWeight || '250g'}</span>
              </span>
            </div>
          </div>

          {/* Desktop Controls: Variant Selector & Quantity */}
          <div className="pdp-sticky-desktop-controls">
            <div className="pdp-sticky-control-group">
              <label>Weight</label>
              <select
                value={selectedWeight}
                onChange={(e) => setSelectedWeight(e.target.value)}
                className="pdp-sticky-select"
              >
                {product.weights.map((w) => (
                  <option key={w} value={w}>{w}</option>
                ))}
              </select>
            </div>

            {/* Quantity Controller Box */}
            <div className="pdp-sticky-qty-box">
              <button
                type="button"
                onClick={() => {
                  if (cartQty > 1 && onUpdateCartQty) {
                    onUpdateCartQty(product.id, cartQty - 1);
                  } else if (cartQty === 1 && onUpdateCartQty) {
                    onUpdateCartQty(product.id, 0);
                  }
                }}
              >
                –
              </button>
              <span>{cartQty > 0 ? cartQty : 1}</span>
              <button
                type="button"
                onClick={() => {
                  if (cartQty > 0 && onUpdateCartQty) {
                    onUpdateCartQty(product.id, cartQty + 1);
                  } else {
                    onAddToCart(1);
                  }
                }}
              >
                +
              </button>
            </div>
          </div>

          {/* Right: Action CTA Buttons */}
          <div className="pdp-sticky-actions">
            <button
              type="button"
              className="pdp-sticky-btn pdp-sticky-cart-btn"
              onClick={() => {
                if (cartQty === 0) onAddToCart(1);
              }}
            >
              <ShoppingBag size={15} /> Add to cart
            </button>

            <button
              type="button"
              className="pdp-sticky-btn pdp-sticky-buy-btn"
              onClick={() => {
                onAddToCart(1);
                setCurrentView('checkout');
              }}
            >
              Buy Now
            </button>
          </div>
        </div>
      </div>

      {/* Floating Single-Line Social Proof Toast */}
      {showLiveToast && (
        <div className={`pdp-bottom-viewer-toast ${showStickyBar ? 'with-sticky-bar' : ''}`}>
          <span className="live-toast-dot"></span>
          <span className="live-toast-text">
            <strong>{liveViewers} people</strong> looking at this right now
          </span>
          <button
            type="button"
            className="live-toast-close"
            onClick={() => setShowLiveToast(false)}
            aria-label="Dismiss"
          >
            ✕
          </button>
        </div>
      )}
    </div>
  );
};

