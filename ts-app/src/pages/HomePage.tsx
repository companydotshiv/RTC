import React from 'react';
import type { Product } from '../types/product';
import { products } from '../data/productsData';
import { ShoppingBag, Star, CheckCircle2, ChevronLeft, ChevronRight, Eye, Heart, Minus, Plus } from 'lucide-react';

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
  const renderCartButton = (productId: number) => {
    const qty = cartQuantities[productId] || 0;
    if (qty > 0) {
      return (
        <div className="hover-action-item">
          <span className="tooltip-label">Quantity in cart</span>
          <div
            style={{
              height: '48px',
              borderRadius: '24px',
              background: '#ffffff',
              border: '1px solid #e2e8f0',
              color: '#222222',
              display: 'flex',
              alignItems: 'center',
              gap: '10px',
              padding: '0 14px',
              boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
            }}
          >
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onUpdateCartQty) onUpdateCartQty(productId, qty - 1);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#222222',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              title="Decrease quantity"
            >
              <Minus size={16} />
            </button>
            <span style={{ fontSize: '0.9rem', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>
              {qty}
            </span>
            <button
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) onAddToCart(productId, 1);
              }}
              style={{
                background: 'none',
                border: 'none',
                color: '#222222',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                padding: '2px'
              }}
              title="Increase quantity"
            >
              <Plus size={16} />
            </button>
          </div>
        </div>
      );
    }
    return (
      <div className="hover-action-item">
        <span className="tooltip-label">Add to cart</span>
        <button
          className="action-circle-btn"
          onClick={(e) => {
            e.stopPropagation();
            if (onAddToCart) onAddToCart(productId, 1);
          }}
        >
          <ShoppingBag size={20} />
        </button>
      </div>
    );
  };

  return (
    <div>
      {/* 1. Hero Banner Carousel Replica */}
      <section className="hero-section">
        <div className="hero-bg-overlay" style={{ backgroundImage: "url('/hero_dry_fruits_1785924400069.png')" }}></div>
        <div className="container">
          <div className="hero-content-grid">
            <div className="hero-text-side">
              <div className="hero-tag">
                <CheckCircle2 size={16} /> 30+ YEARS OF PURE QUALITY LEGACY
              </div>
              <h1 className="hero-title">
                Taste the Authentic Goodness of <span>Pure Dry Fruits & Spices</span>
              </h1>
              <p className="hero-desc">
                Hygienically sorted, triple-graded whole cashews, almonds, pure Kashmiri saffron, and premium nuts delivered fresh from nature to your doorstep.
              </p>
              <div className="hero-actions">
                <button className="btn btn-gold" onClick={() => setCurrentView('products')}>
                  <ShoppingBag size={18} /> Explore Collection
                </button>
                <button className="btn btn-outline" style={{ borderColor: 'rgba(255,255,255,0.4)', color: '#fff' }} onClick={() => { document.getElementById('wholesale')?.scrollIntoView({ behavior: 'smooth' }); }}>
                  Bulk Inquiry
                </button>
              </div>
              <div className="hero-stats">
                <div className="stat-item">
                  <h3>100%</h3>
                  <p>Natural & Lab Tested</p>
                </div>
                <div className="stat-item">
                  <h3>500+</h3>
                  <p>Wholesale Retailers</p>
                </div>
                <div className="stat-item">
                  <h3>30+ Yrs</h3>
                  <p>Industry Trust</p>
                </div>
              </div>
            </div>
            <div className="hero-image-wrapper">
              <img src="/hero_dry_fruits_1785924400069.png" alt="RTC Foods Premium Selection" className="hero-main-img" />
            </div>
          </div>
        </div>
      </section>

      {/* 2. Best Sellers Carousel Replica matching exact 1:1 WordPress layout */}
      <section className="section" style={{ background: '#FFF', padding: '60px 0 60px 0' }}>
        <div className="bestsellers-wrapper">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: '700', marginBottom: '40px', color: '#222222', fontFamily: "'Jost', sans-serif" }}>
            Best Sellers
          </h2>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            {/* Left Carousel Nav Button */}
            <button className="carousel-nav-btn left-nav" title="Previous Products">
              <ChevronLeft size={28} />
            </button>

            {/* 4 Bestseller Cards Matching Exact WordPress Screenshot Layout */}
            <div className="bestsellers-grid">
              {/* Card 1: California Almonds (ID: 1) */}
              <div className="bestseller-card" onClick={() => onSelectProduct(products.find(p => p.id === 1) || products[0])}>
                <div className="bestseller-img-container">
                  <img src="/california_almonds_pouch.png" alt="California Almonds" className="main-img" />
                  <img src="/california_almonds_back.png" alt="California Almonds Back" className="hover-img" />

                  {/* Hover Quick-Actions Overlay matching screenshot */}
                  <div className="card-hover-actions">
                    {renderCartButton(1)}

                    <div className="hover-action-item">
                      <span className="tooltip-label">Quick View</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); onSelectProduct(products.find(p => p.id === 1) || products[0]); }}>
                        <Eye size={20} />
                      </button>
                    </div>

                    <div className="hover-action-item">
                      <span className="tooltip-label">Wishlist</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); if (onToggleWishlist) onToggleWishlist(1); }}>
                        <Heart size={20} fill={wishlistIds.includes(1) ? "#E53935" : "none"} color={wishlistIds.includes(1) ? "#E53935" : "#222222"} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bestseller-green-footer">
                  <span className="bestseller-cat">Almonds</span>
                  <h3 className="bestseller-title">California Almonds</h3>
                  <div className="bestseller-price">₹274.00 – ₹1,082.00</div>
                </div>
              </div>

              {/* Card 2: Chia Seeds (ID: 2) */}
              <div className="bestseller-card" onClick={() => onSelectProduct(products.find(p => p.id === 2) || products[1])}>
                <div className="bestseller-img-container">
                  <img src="/chia_seeds_front.jpg" alt="Chia Seeds" className="main-img" />
                  <img src="/chia_seeds_back.jpg" alt="Chia Seeds Back" className="hover-img" />

                  {/* Hover Quick-Actions Overlay */}
                  <div className="card-hover-actions">
                    {renderCartButton(2)}
                    <div className="hover-action-item">
                      <span className="tooltip-label">Quick View</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); onSelectProduct(products.find(p => p.id === 2) || products[1]); }}>
                        <Eye size={20} />
                      </button>
                    </div>
                    <div className="hover-action-item">
                      <span className="tooltip-label">Wishlist</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); if (onToggleWishlist) onToggleWishlist(2); }}>
                        <Heart size={20} fill={wishlistIds.includes(2) ? "#E53935" : "none"} color={wishlistIds.includes(2) ? "#E53935" : "#222222"} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bestseller-green-footer">
                  <span className="bestseller-cat">Seeds</span>
                  <h3 className="bestseller-title">Chia Seeds</h3>
                  <div className="bestseller-price">₹27.00 – ₹108.00</div>
                </div>
              </div>

              {/* Card 3: Cashew (ID: 3) */}
              <div className="bestseller-card" onClick={() => onSelectProduct(products.find(p => p.id === 3) || products[2])}>
                <div className="bestseller-img-container">
                  <img src="/cashew_front.png" alt="Cashew" className="main-img" />
                  <img src="/cashew_back.png" alt="Cashew Back" className="hover-img" />

                  {/* Hover Quick-Actions Overlay */}
                  <div className="card-hover-actions">
                    {renderCartButton(3)}
                    <div className="hover-action-item">
                      <span className="tooltip-label">Quick View</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); onSelectProduct(products.find(p => p.id === 3) || products[2]); }}>
                        <Eye size={20} />
                      </button>
                    </div>
                    <div className="hover-action-item">
                      <span className="tooltip-label">Wishlist</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); if (onToggleWishlist) onToggleWishlist(3); }}>
                        <Heart size={20} fill={wishlistIds.includes(3) ? "#E53935" : "none"} color={wishlistIds.includes(3) ? "#E53935" : "#222222"} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bestseller-green-footer">
                  <span className="bestseller-cat">Cashew</span>
                  <h3 className="bestseller-title">Cashew</h3>
                  <div className="bestseller-price">₹301.00</div>
                </div>
              </div>

              {/* Card 4: Dry Figs Diamond (ID: 4) */}
              <div className="bestseller-card" onClick={() => onSelectProduct(products.find(p => p.id === 4) || products[3])}>
                <div className="bestseller-img-container">
                  <img src="/dry_figs_front.png" alt="Dry Figs Diamond" className="main-img" />
                  <img src="/dry_figs_back.jpg" alt="Dry Figs Diamond Back" className="hover-img" />

                  {/* Hover Quick-Actions Overlay */}
                  <div className="card-hover-actions">
                    {renderCartButton(4)}
                    <div className="hover-action-item">
                      <span className="tooltip-label">Quick View</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); onSelectProduct(products.find(p => p.id === 4) || products[3]); }}>
                        <Eye size={20} />
                      </button>
                    </div>
                    <div className="hover-action-item">
                      <span className="tooltip-label">Wishlist</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); if (onToggleWishlist) onToggleWishlist(4); }}>
                        <Heart size={20} fill={wishlistIds.includes(4) ? "#E53935" : "none"} color={wishlistIds.includes(4) ? "#E53935" : "#222222"} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bestseller-green-footer">
                  <span className="bestseller-cat">Dry Figs</span>
                  <h3 className="bestseller-title">Dry Figs Diamond</h3>
                  <div className="bestseller-price">₹265.00</div>
                </div>
              </div>
            </div>

            {/* Right Carousel Nav Button */}
            <button className="carousel-nav-btn right-nav" title="Next Products">
              <ChevronRight size={28} />
            </button>
          </div>
        </div>
      </section>

      {/* Screenshot 1: Thoughtful Gift Boxes & Premium Dry Fruits Banners */}
      <section className="section" style={{ background: '#FFF', padding: '0 0 60px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1.7fr', gap: '24px' }}>
            <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', background: '#FFF', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img src="/thoughtful_gift_boxes_v3.jpg" alt="Thoughtful Gift Boxes" style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px', display: 'block' }} />
                <h3 style={{ fontSize: '1.7rem', fontWeight: 700, margin: '8px 0 14px 0', color: '#222' }}>Thoughtful Gift Boxes</h3>
              </div>
              <button className="btn btn-gold" style={{ background: '#007A3D', borderColor: '#007A3D', color: '#FFF', padding: '10px 24px', borderRadius: '6px', alignSelf: 'flex-start' }} onClick={() => setCurrentView('gifting')}>
                Shop Now
              </button>
            </div>

            <div style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', background: '#FFF', textAlign: 'left', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <img src="/premium_dry_fruits_v3.jpg" alt="Premium Dry Fruits" style={{ width: '100%', height: '420px', objectFit: 'cover', borderRadius: '8px', marginBottom: '16px', display: 'block' }} />
                <h3 style={{ fontSize: '1.7rem', fontWeight: 700, margin: '8px 0 14px 0', color: '#222' }}>Premium Dry Fruits</h3>
              </div>
              <button className="btn btn-gold" style={{ background: '#007A3D', borderColor: '#007A3D', color: '#FFF', padding: '10px 24px', borderRadius: '6px', alignSelf: 'flex-start' }} onClick={() => setCurrentView('products')}>
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* Screenshot 2: Shop by Category Grid */}
      <section className="section" style={{ background: '#FFF', padding: '40px 0 60px 0' }}>
        <div className="container">
          <h2 style={{ textAlign: 'center', fontSize: '2.5rem', fontWeight: 700, marginBottom: '40px', color: '#222222', fontFamily: "'Jost', sans-serif" }}>
            Shop by Category
          </h2>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: '24px 16px', textAlign: 'center' }}>
            {[
              { name: 'Dry Figs', img: '/cat_dry_figs.png' },
              { name: 'Dried Apricot', img: '/cat_apricot.png' },
              { name: 'Raisins', img: '/cat_raisins.png' },
              { name: 'Walnut', img: '/cat_walnut.png' },
              { name: 'Almond', img: '/cat_almond.png' },
              { name: 'Cashew', img: '/cat_cashew.png' },
              { name: 'Chemical and Herbs', img: '/cat_herbs.png' },
              { name: 'Seeds', img: '/cat_seeds.png' },
              { name: 'Fusion', img: '/cat_fusion.png' },
              { name: 'Dehydrated Fruits', img: '/cat_dehydrated.png' },
              { name: 'Snacking', img: '/cat_snacking.png' },
              { name: 'Dry Fruits', img: '/cat_dry_fruits_all.png' },
              { name: 'Spices', img: '/cat_spices.png' }
            ].map((catItem, cIdx) => (
              <div key={cIdx} onClick={() => setCurrentView('products')} style={{ cursor: 'pointer', padding: '10px' }}>
                <div style={{ width: '140px', height: '140px', margin: '0 auto 12px auto', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src={catItem.img} alt={catItem.name} style={{ maxHeight: '130px', maxWidth: '130px', objectFit: 'contain', width: '100%', height: '100%' }} />
                </div>
                <h4 style={{ fontSize: '1rem', fontWeight: 400, color: '#222222', fontFamily: "'Jost', sans-serif" }}>{catItem.name}</h4>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Screenshot 3: Bulk Order & Whole Spices Cards */}
      <section className="section" style={{ background: '#FFF', padding: '0 0 60px 0' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '1.77fr 1fr', gap: '24px', alignItems: 'stretch' }}>
            <div className="popup-hover-card" style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', background: '#FFF', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '100%', height: '420px', background: '#FAF8F5', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/bulk_order_wall.jpg" alt="Bulk Order" style={{ width: '100%', height: '100%', objectFit: 'contain', display: 'block' }} />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '20px 0 8px 0', color: '#222' }}>Bulk Order</h3>
              </div>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>Deliciously delivered in bulk perfect for events celebrations and more</p>
            </div>

            <div className="popup-hover-card" style={{ border: '1px solid #E2E8F0', borderRadius: '12px', padding: '16px', background: '#FFF', cursor: 'pointer', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <div>
                <div style={{ width: '100%', height: '420px', background: '#FAF8F5', borderRadius: '8px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                  <img src="/whole_spices_cardamom.jpg" alt="Whole Spices" style={{ width: '100%', height: '100%', objectFit: 'cover', display: 'block' }} />
                </div>
                <h3 style={{ fontSize: '1.8rem', fontWeight: 700, margin: '20px 0 8px 0', color: '#222' }}>Whole Spices</h3>
              </div>
              <p style={{ color: '#666', fontSize: '0.95rem' }}>Discover the finest variety of Spices with RTC</p>
            </div>
          </div>
        </div>
      </section>

      {/* 4. Secondary Bestsellers Section (Matching Bottom Carousel) */}
      <section className="section" style={{ background: '#FBF9F4', padding: '60px 0' }}>
        <div className="container">
          <div className="section-title">
            <h2>Trending Products</h2>
            <div className="title-underline"></div>
          </div>

          <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
            <button className="carousel-nav-btn left-nav" title="Previous Products">
              <ChevronLeft size={28} />
            </button>

            <div className="bestsellers-grid">
              {/* Card 1: Exotic Dried Kiwi (ID: 5) */}
              <div className="bestseller-card" onClick={() => onSelectProduct(products.find(p => p.id === 5) || products[4])}>
                <div className="bestseller-img-container">
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#FFF', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '4px', zIndex: 3 }}>NEW</span>
                  <img src="/exotic_kiwi_front.png" alt="Exotic Dried Kiwi" className="main-img" />
                  <img src="/exotic_kiwi_back.jpg" alt="Exotic Dried Kiwi Back" className="hover-img" />

                  {/* Hover Quick-Actions Overlay */}
                  <div className="card-hover-actions">
                    {renderCartButton(5)}
                    <div className="hover-action-item">
                      <span className="tooltip-label">Quick View</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); onSelectProduct(products.find(p => p.id === 5) || products[4]); }}>
                        <Eye size={20} />
                      </button>
                    </div>
                    <div className="hover-action-item">
                      <span className="tooltip-label">Wishlist</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); if (onToggleWishlist) onToggleWishlist(5); }}>
                        <Heart size={20} fill={wishlistIds.includes(5) ? "#E53935" : "none"} color={wishlistIds.includes(5) ? "#E53935" : "#222222"} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bestseller-green-footer">
                  <span className="bestseller-cat">Dehydrated Fruits</span>
                  <h3 className="bestseller-title">Exotic Dried Kiwi</h3>
                  <div className="bestseller-price">₹171.00</div>
                </div>
              </div>

              {/* Card 2: Chia Seeds (ID: 2) */}
              <div className="bestseller-card" onClick={() => onSelectProduct(products.find(p => p.id === 2) || products[1])}>
                <div className="bestseller-img-container">
                  <img src="/chia_seeds_front.jpg" alt="Chia Seeds" className="main-img" />
                  <img src="/chia_seeds_back.jpg" alt="Chia Seeds Back" className="hover-img" />
                  
                  {/* Hover Quick-Actions Overlay */}
                  <div className="card-hover-actions">
                    {renderCartButton(2)}
                    <div className="hover-action-item">
                      <span className="tooltip-label">Quick View</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); onSelectProduct(products.find(p => p.id === 2) || products[1]); }}>
                        <Eye size={20} />
                      </button>
                    </div>
                    <div className="hover-action-item">
                      <span className="tooltip-label">Wishlist</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); if (onToggleWishlist) onToggleWishlist(2); }}>
                        <Heart size={20} fill={wishlistIds.includes(2) ? "#E53935" : "none"} color={wishlistIds.includes(2) ? "#E53935" : "#222222"} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bestseller-green-footer">
                  <span className="bestseller-cat">Seeds</span>
                  <h3 className="bestseller-title">Chia Seeds</h3>
                  <div className="bestseller-price">₹27.00 – ₹108.00</div>
                </div>
              </div>

              {/* Card 3: Walnut Kernels Platinum (ID: 6) */}
              <div className="bestseller-card" onClick={() => onSelectProduct(products.find(p => p.id === 6) || products[5])}>
                <div className="bestseller-img-container">
                  <img src="/walnut_platinum_front.jpg" alt="Walnut Kernels Platinum" className="main-img" />
                  <img src="/walnut_platinum_back.png" alt="Walnut Kernels Platinum Back" className="hover-img" />
                  
                  {/* Hover Quick-Actions Overlay */}
                  <div className="card-hover-actions">
                    {renderCartButton(6)}
                    <div className="hover-action-item">
                      <span className="tooltip-label">Quick View</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); onSelectProduct(products.find(p => p.id === 6) || products[5]); }}>
                        <Eye size={20} />
                      </button>
                    </div>
                    <div className="hover-action-item">
                      <span className="tooltip-label">Wishlist</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); if (onToggleWishlist) onToggleWishlist(6); }}>
                        <Heart size={20} fill={wishlistIds.includes(6) ? "#E53935" : "none"} color={wishlistIds.includes(6) ? "#E53935" : "#222222"} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bestseller-green-footer">
                  <span className="bestseller-cat">Dry fruits</span>
                  <h3 className="bestseller-title">Walnut Kernels Platinum</h3>
                  <div className="bestseller-price">₹420.00</div>
                </div>
              </div>

              {/* Card 4: Whole Cranberries Dried Gold (ID: 7) */}
              <div className="bestseller-card" onClick={() => onSelectProduct(products.find(p => p.id === 7) || products[6])}>
                <div className="bestseller-img-container">
                  <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#FFF', padding: '2px 8px', fontSize: '0.75rem', fontWeight: 'bold', borderRadius: '4px', zIndex: 3 }}>NEW</span>
                  <img src="/cranberries_gold_front.jpg" alt="Whole Cranberries Dried (Gold)" className="main-img" />
                  <img src="/cranberries_gold_back.png" alt="Whole Cranberries Dried (Gold) Back" className="hover-img" />
                  
                  {/* Hover Quick-Actions Overlay */}
                  <div className="card-hover-actions">
                    {renderCartButton(7)}
                    <div className="hover-action-item">
                      <span className="tooltip-label">Quick View</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); onSelectProduct(products.find(p => p.id === 7) || products[6]); }}>
                        <Eye size={20} />
                      </button>
                    </div>
                    <div className="hover-action-item">
                      <span className="tooltip-label">Wishlist</span>
                      <button className="action-circle-btn" onClick={(e) => { e.stopPropagation(); if (onToggleWishlist) onToggleWishlist(7); }}>
                        <Heart size={20} fill={wishlistIds.includes(7) ? "#E53935" : "none"} color={wishlistIds.includes(7) ? "#E53935" : "#222222"} />
                      </button>
                    </div>
                  </div>
                </div>
                <div className="bestseller-green-footer">
                  <span className="bestseller-cat">Dehydrated Fruits</span>
                  <h3 className="bestseller-title">Whole Cranberries Dried (Gold)</h3>
                  <div className="bestseller-price">₹310.00</div>
                </div>
              </div>
            </div>

            <button className="carousel-nav-btn right-nav" title="Next Products">
              <ChevronRight size={28} />
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

          <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '30px', alignItems: 'center' }}>
            {/* Left Google Badge Box */}
            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start', gap: '10px' }}>
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
            <div style={{ position: 'relative', display: 'flex', alignItems: 'center' }}>
              <button className="carousel-nav-btn left-nav" style={{ position: 'absolute', left: '-20px', zIndex: 4 }} title="Previous">
                <ChevronLeft size={20} />
              </button>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '20px', width: '100%' }}>
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

      {/* Screenshot 8: Our Partners Section with Infinite Scroll & Hover Pause */}
      <section className="section" style={{ background: '#007A3D', padding: '40px 0 30px 0' }}>
        <div className="container">
          <h2 style={{ fontSize: '2rem', fontWeight: 700, color: '#FFF', marginBottom: '24px' }}>Our Partners</h2>
          
          <div className="marquee-container">
            <div className="marquee-track">
              {[
                { name: 'bigbasket', img: '/partner_bigbasket.png' },
                { name: 'METRO', img: '/partner_metro.png' },
                { name: 'Country Delight', img: '/partner_countrydelight.png' },
                { name: 'Pansari', img: '/partner_pansari.png' },
                { name: 'Zepto', img: '/partner_zepto.png' },
                { name: 'Zomato', img: '/partner_zomato.png' },
                { name: 'Blinkit', img: '/partner_blinkit.png' },
                { name: 'Swiggy', img: '/partner_swiggy.png' },
                // Duplicate set for seamless continuous infinite loop
                { name: 'bigbasket', img: '/partner_bigbasket.png' },
                { name: 'METRO', img: '/partner_metro.png' },
                { name: 'Country Delight', img: '/partner_countrydelight.png' },
                { name: 'Pansari', img: '/partner_pansari.png' },
                { name: 'Zepto', img: '/partner_zepto.png' },
                { name: 'Zomato', img: '/partner_zomato.png' },
                { name: 'Blinkit', img: '/partner_blinkit.png' },
                { name: 'Swiggy', img: '/partner_swiggy.png' },
              ].map((partner, idx) => (
                <div 
                  key={idx} 
                  style={{ 
                    background: '#FFF', 
                    padding: '8px 12px', 
                    borderRadius: '8px', 
                    display: 'flex', 
                    alignItems: 'center', 
                    justifyContent: 'center', 
                    height: '80px',
                    width: '210px',
                    flexShrink: 0,
                    boxShadow: '0 4px 12px rgba(0,0,0,0.08)',
                    transition: 'transform 0.2s ease, boxShadow 0.2s ease',
                    cursor: 'pointer'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = 'translateY(-3px)';
                    e.currentTarget.style.boxShadow = '0 6px 16px rgba(0,0,0,0.15)';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = 'translateY(0)';
                    e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.08)';
                  }}
                >
                  <img 
                    src={partner.img} 
                    alt={partner.name} 
                    style={{ maxHeight: '66px', maxWidth: '92%', height: '92%', objectFit: 'contain' }} 
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 6. Bulk Orders Section */}
      <section id="wholesale" className="section" style={{ background: '#007A3D', color: '#FFF', borderTop: '1px solid rgba(255,255,255,0.2)', padding: '60px 0' }}>
        <div className="container">
          <div className="hero-content-grid">
            <div>
              <span style={{ color: 'var(--primary-gold)', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '2px' }}>Bulk Orders & Private Labeling</span>
              <h2 style={{ fontSize: '2.5rem', color: '#FFF', margin: '12px 0 20px 0' }}>Looking for Wholesale Supply or Customized Packaging?</h2>
              <p style={{ color: 'rgba(255,255,255,0.85)', fontSize: '1.05rem', marginBottom: '30px' }}>
                We cater to supermarket chains, hotel groups, corporate gifting partners, and sweet manufacturers across India.
              </p>
            </div>
            <div>
              <div style={{ background: 'rgba(255,255,255,0.06)', padding: '36px', borderRadius: 'var(--radius-md)', border: '1px solid rgba(212,175,55,0.3)' }}>
                <h3 style={{ color: 'var(--primary-gold)', marginBottom: '20px', fontSize: '1.4rem' }}>Quick Business Inquiry</h3>
                <form onSubmit={(e) => { e.preventDefault(); alert('Inquiry sent successfully!'); }}>
                  <div style={{ marginBottom: '14px' }}>
                    <input
                      type="text"
                      className="bulk-input-field"
                      placeholder="Your Name / Business Name"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        background: 'rgba(0,0,0,0.25)',
                        color: '#FFFFFF',
                        fontWeight: 400,
                        fontSize: '0.95rem',
                        fontFamily: "'Jost', sans-serif"
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '14px' }}>
                    <input
                      type="tel"
                      className="bulk-input-field"
                      placeholder="Mobile Number"
                      required
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        background: 'rgba(0,0,0,0.25)',
                        color: '#FFFFFF',
                        fontWeight: 400,
                        fontSize: '0.95rem',
                        fontFamily: "'Jost', sans-serif"
                      }}
                    />
                  </div>
                  <div style={{ marginBottom: '18px' }}>
                    <textarea
                      className="bulk-input-field"
                      placeholder="Requirement Details (e.g. 500kg Cashews)"
                      rows={3}
                      style={{
                        width: '100%',
                        padding: '12px 16px',
                        borderRadius: '6px',
                        border: '1px solid rgba(255,255,255,0.3)',
                        background: 'rgba(0,0,0,0.25)',
                        color: '#FFFFFF',
                        fontWeight: 400,
                        fontSize: '0.95rem',
                        fontFamily: "'Jost', sans-serif"
                      }}
                    ></textarea>
                  </div>
                  <button type="submit" className="btn btn-gold" style={{ width: '100%', fontWeight: 400 }}>Send Bulk Inquiry</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};
