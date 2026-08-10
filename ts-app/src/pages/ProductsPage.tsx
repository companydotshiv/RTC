import React, { useState } from 'react';
import { products } from '../data/productsData';
import type { Product } from '../types/product';
import { Star, ShoppingBag, X, Heart, ChevronDown, Eye, Minus, Plus } from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  cartQuantities?: { [id: number]: number };
  onAddToCart?: (productId: number, qty?: number) => void;
  onUpdateCartQty?: (productId: number, qty: number) => void;
  onToggleWishlist?: (productId: number) => void;
  wishlistIds?: number[];
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectProduct,
  searchQuery: propSearchQuery,
  setSearchQuery: propSetSearchQuery,
  cartQuantities = {},
  onAddToCart,
  onUpdateCartQty,
  onToggleWishlist,
  wishlistIds = []
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [localSearchQuery, setLocalSearchQuery] = useState<string>('');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [sortOption, setSortOption] = useState<string>('default');
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  const activeSearchQuery = propSearchQuery !== undefined ? propSearchQuery : localSearchQuery;
  const updateSearchQuery = (val: string) => {
    if (propSetSearchQuery) {
      propSetSearchQuery(val);
    } else {
      setLocalSearchQuery(val);
    }
  };

  const sortOptionsMap: { [key: string]: string } = {
    default: 'Default sorting',
    popularity: 'Sort by popularity',
    rating: 'Sort by average rating',
    latest: 'Sort by latest',
    price_low: 'Sort by price: low to high',
    price_high: 'Sort by price: high to low',
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) || p.shortDesc.toLowerCase().includes(activeSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  }).sort((a, b) => {
    if (sortOption === 'price_low') return a.price - b.price;
    if (sortOption === 'price_high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    if (sortOption === 'popularity') return b.reviewsCount - a.reviewsCount;
    return a.id - b.id;
  });

  return (
    <div>
      <section style={{ background: 'var(--bg-dark)', color: '#FFF', padding: '60px 0', borderBottom: '2px solid var(--primary-gold)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.8rem', color: '#FFF', marginBottom: '12px' }}>Our Complete Product Range</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '600px', margin: '0 auto' }}>
            Explore our 100% natural, triple-sorted dry fruits, gourmet nuts, authentic Kashmiri saffron, and culinary seeds.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: '40px 0 20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setSelectedCategory('all')} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>All Categories</button>
              <button className={`btn ${selectedCategory === 'dry-fruits' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setSelectedCategory('dry-fruits')} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Dry Fruits & Nuts</button>
              <button className={`btn ${selectedCategory === 'seeds-berries' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setSelectedCategory('seeds-berries')} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Seeds & Berries</button>
            </div>

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search catalog..."
                value={activeSearchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
                style={{
                  padding: '9px 16px',
                  borderRadius: '6px',
                  border: '1px solid #D8D8D8',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  color: '#222222',
                  background: '#FFFFFF',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                  outline: 'none'
                }}
              />
              
              {/* Custom Sort Dropdown matching Razzi Shop screenshot */}
              <div style={{ position: 'relative', width: '220px' }}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: '#FFFFFF',
                    border: '1px solid #707070',
                    borderRadius: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    color: '#444444',
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 400
                  }}
                >
                  <span>{sortOptionsMap[sortOption]}</span>
                  <ChevronDown size={18} color="#666666" style={{ transition: 'transform 0.2s ease', transform: isSortOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>

                {isSortOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      background: '#FFFFFF',
                      border: '1px solid #707070',
                      borderTop: 'none',
                      zIndex: 100,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {Object.keys(sortOptionsMap).map((key) => (
                      <div
                        key={key}
                        onClick={() => {
                          setSortOption(key);
                          setIsSortOpen(false);
                        }}
                        style={{
                          padding: '10px 16px',
                          fontSize: '0.9rem',
                          fontFamily: "'Jost', sans-serif",
                          fontWeight: 400,
                          cursor: 'pointer',
                          background: sortOption === key ? '#707070' : '#FFFFFF',
                          color: sortOption === key ? '#FFFFFF' : '#666666',
                          transition: 'background 0.15s ease, color 0.15s ease',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          if (sortOption !== key) {
                            e.currentTarget.style.background = '#F5F5F5';
                            e.currentTarget.style.color = '#222222';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (sortOption !== key) {
                            e.currentTarget.style.background = '#FFFFFF';
                            e.currentTarget.style.color = '#666666';
                          }
                        }}
                      >
                        {sortOptionsMap[key]}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <span style={{ color: '#555555', fontSize: '0.9rem', fontWeight: 400 }}>
                Showing <span style={{ fontWeight: 400 }}>{filteredProducts.length}</span> items
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="bestsellers-grid">
            {filteredProducts.map((p) => {
              const qty = cartQuantities[p.id] || 0;
              const isWishlisted = wishlistIds.includes(p.id);
              const hoverImgSrc = (p.gallery && p.gallery.length > 1) ? p.gallery[1] : p.image;

              return (
                <div key={p.id} className="bestseller-card" onClick={() => onSelectProduct(p)}>
                  <div className="bestseller-img-container">
                    {p.badge && (
                      <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#007A3D', color: '#FFF', padding: '3px 10px', fontSize: '0.75rem', fontWeight: 600, borderRadius: '4px', zIndex: 3, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {p.badge}
                      </span>
                    )}
                    <img src={p.image} alt={p.name} className="main-img" />
                    <img src={hoverImgSrc} alt={`${p.name} Back`} className="hover-img" />

                    {/* Hover Quick-Actions Overlay */}
                    <div
                      className="card-hover-actions"
                      style={{
                        flexDirection: 'column',
                        gap: '12px',
                        bottom: '16px'
                      }}
                    >
                      {/* View Details Option above the 3 circle icons */}
                      <button
                        className="btn btn-gold"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalProduct(p);
                        }}
                        style={{
                          background: '#007A3D',
                          borderColor: '#007A3D',
                          color: '#FFFFFF',
                          padding: '8px 18px',
                          borderRadius: '20px',
                          fontSize: '0.82rem',
                          fontWeight: 500,
                          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                          cursor: 'pointer',
                          letterSpacing: '0.3px',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#F8B84E';
                          e.currentTarget.style.borderColor = '#F8B84E';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#007A3D';
                          e.currentTarget.style.borderColor = '#007A3D';
                        }}
                      >
                        View Details
                      </button>

                      {/* 3 Circle Quick Action Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* 1. Add to Cart / Quantity Pill Controller */}
                        {qty > 0 ? (
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
                                  if (onUpdateCartQty) onUpdateCartQty(p.id, qty - 1);
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
                                  if (onAddToCart) onAddToCart(p.id, 1);
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
                        ) : (
                          <div className="hover-action-item">
                            <span className="tooltip-label">Add to cart</span>
                            <button
                              className="action-circle-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onAddToCart) onAddToCart(p.id, 1);
                              }}
                            >
                              <ShoppingBag size={20} />
                            </button>
                          </div>
                        )}

                        {/* 2. Quick View Icon */}
                        <div className="hover-action-item">
                          <span className="tooltip-label">Quick View</span>
                          <button
                            className="action-circle-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalProduct(p);
                            }}
                          >
                            <Eye size={20} />
                          </button>
                        </div>

                        {/* 3. Wishlist Heart Icon */}
                        <div className="hover-action-item">
                          <span className="tooltip-label">Wishlist</span>
                          <button
                            className="action-circle-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onToggleWishlist) onToggleWishlist(p.id);
                            }}
                          >
                            <Heart size={20} fill={isWishlisted ? "#E53935" : "none"} color={isWishlisted ? "#E53935" : "#222222"} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Green Bestseller Footer Card matching image 2 */}
                  <div className="bestseller-green-footer">
                    <span className="bestseller-cat">{p.categoryName}</span>
                    <h3 className="bestseller-title">{p.name}</h3>
                    <div className="bestseller-price">
                      ₹{p.price.toFixed(2)}
                      {p.originalPrice > p.price && (
                        <span style={{ fontSize: '0.85rem', textDecoration: 'line-through', opacity: 0.75, marginLeft: '8px', fontWeight: 400 }}>
                          ₹{p.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mini Pop-Up Modal Card */}
      {modalProduct && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
          onClick={() => setModalProduct(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '440px',
              width: '100%',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              cursor: 'pointer',
              animation: 'toastSlideDown 0.3s ease forwards'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(modalProduct);
              setModalProduct(null);
            }}
            title="Click to view full product page"
          >
            {/* Top Right Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalProduct(null);
              }}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: '#F0F0F0',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#555'
              }}
              title="Close preview"
            >
              <X size={18} />
            </button>

            {/* Product Image */}
            <div style={{ width: '100%', height: '240px', background: '#FAF8F5', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={modalProduct.image} alt={modalProduct.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            {/* Category */}
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#888888', fontWeight: 600, letterSpacing: '0.5px' }}>
              {modalProduct.categoryName}
            </span>

            {/* Name */}
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#222222', margin: '4px 0 8px 0' }}>
              {modalProduct.name}
            </h3>

            {/* Ratings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#F5A623" color="#F5A623" />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: 500 }}>
                ({modalProduct.reviewsCount})
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.88rem', color: '#555555', lineHeight: '1.5', margin: 0 }}>
              {modalProduct.shortDesc || modalProduct.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

