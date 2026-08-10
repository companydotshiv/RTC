import React, { useState } from 'react';
import { products } from '../data/productsData';
import type { Product } from '../types/product';
import { Star, Minus, Plus, ShoppingBag, X, Heart } from 'lucide-react';

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

  const activeSearchQuery = propSearchQuery !== undefined ? propSearchQuery : localSearchQuery;
  const updateSearchQuery = (val: string) => {
    if (propSetSearchQuery) {
      propSetSearchQuery(val);
    } else {
      setLocalSearchQuery(val);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) || p.shortDesc.toLowerCase().includes(activeSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
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

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
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
              <span style={{ color: '#555555', fontSize: '0.9rem', fontWeight: 400 }}>
                Showing <span style={{ fontWeight: 400 }}>{filteredProducts.length}</span> items
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="products-grid">
            {filteredProducts.map((p) => {
              const qty = cartQuantities[p.id] || 0;
              return (
                <div key={p.id} className="product-card" style={{ display: 'flex', flexDirection: 'column', height: '100%' }}>
                  <div className="card-img-wrapper" style={{ position: 'relative', overflow: 'hidden' }}>
                    <span className="product-badge">{p.badge}</span>
                    <img src={p.image} alt={p.name} className="card-img" />

                    {/* Hover Overlay with View Details Option */}
                    <div
                      className="card-hover-overlay"
                      style={{
                        position: 'absolute',
                        inset: 0,
                        background: 'rgba(0, 0, 0, 0.45)',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        opacity: 0,
                        transition: 'opacity 0.25s ease',
                        zIndex: 10
                      }}
                      onMouseEnter={(e) => (e.currentTarget.style.opacity = '1')}
                      onMouseLeave={(e) => (e.currentTarget.style.opacity = '0')}
                    >
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
                          padding: '10px 22px',
                          borderRadius: '6px',
                          fontSize: '0.88rem',
                          boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
                        }}
                      >
                        View Details
                      </button>
                    </div>
                  </div>

                  <div className="card-body" style={{ display: 'flex', flexDirection: 'column', flexGrow: 1, justifyContent: 'space-between' }}>
                    <div>
                      <span className="card-category">{p.categoryName}</span>
                      <h3 className="card-title" onClick={() => onSelectProduct(p)} style={{ cursor: 'pointer', marginBottom: '8px' }}>
                        {p.name}
                      </h3>
                    </div>

                    <div style={{ marginTop: 'auto', paddingTop: '12px' }}>
                      {/* Price Row with Heart Wishlist Button above Add to Cart */}
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <div className="price-box">
                          <span className="current-price">₹{p.price}</span>
                          <span className="old-price">₹{p.originalPrice}</span>
                        </div>

                        {/* Heart Wishlist Button above Add to Cart */}
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            if (onToggleWishlist) onToggleWishlist(p.id);
                          }}
                          title={wishlistIds.includes(p.id) ? "Remove from Wishlist" : "Add to Wishlist"}
                          style={{
                            width: '38px',
                            height: '38px',
                            borderRadius: '50%',
                            border: '1px solid #E2E8F0',
                            background: '#FFFFFF',
                            color: wishlistIds.includes(p.id) ? '#E53935' : '#555555',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            cursor: 'pointer',
                            transition: 'all 0.2s ease',
                            boxShadow: '0 2px 6px rgba(0,0,0,0.05)'
                          }}
                        >
                          <Heart size={18} fill={wishlistIds.includes(p.id) ? '#E53935' : 'none'} color={wishlistIds.includes(p.id) ? '#E53935' : 'currentColor'} />
                        </button>
                      </div>

                      {/* Add to Cart / Quantity Toggle Button on a line below */}
                      <div>
                        {qty > 0 ? (
                          <div
                            style={{
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              background: '#007A3D',
                              color: '#FFF',
                              borderRadius: '6px',
                              padding: '8px 14px',
                              width: '100%'
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
                                color: '#FFF',
                                cursor: 'pointer',
                                display: 'flex',
                                alignItems: 'center',
                                padding: '2px'
                              }}
                              title="Decrease quantity"
                            >
                              <Minus size={16} />
                            </button>
                            <span style={{ fontSize: '0.9rem', fontWeight: 600 }}>
                              {qty} in Cart
                            </span>
                            <button
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onAddToCart) onAddToCart(p.id, 1);
                              }}
                              style={{
                                background: 'none',
                                border: 'none',
                                color: '#FFF',
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
                        ) : (
                          <button
                            className="btn btn-primary"
                            style={{
                              width: '100%',
                              padding: '10px 16px',
                              fontSize: '0.88rem',
                              background: '#007A3D',
                              borderColor: '#007A3D',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              gap: '6px'
                            }}
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onAddToCart) onAddToCart(p.id, 1);
                            }}
                          >
                            <ShoppingBag size={16} /> Add to cart
                          </button>
                        )}
                      </div>
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

