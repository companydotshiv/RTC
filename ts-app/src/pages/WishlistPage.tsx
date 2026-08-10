import React from 'react';
import { Heart, ShoppingBag, Trash2, ArrowRight } from 'lucide-react';
import { products } from '../data/productsData';
import type { Product } from '../types/product';

interface WishlistPageProps {
  wishlistIds: number[];
  onToggleWishlist: (productId: number) => void;
  onAddToCart: (productId: number, qty?: number) => void;
  onSelectProduct: (product: Product) => void;
  setCurrentView: (view: string) => void;
}

export const WishlistPage: React.FC<WishlistPageProps> = ({
  wishlistIds,
  onToggleWishlist,
  onAddToCart,
  onSelectProduct,
  setCurrentView,
}) => {
  const wishlistProducts = products.filter((p) => wishlistIds.includes(p.id));

  return (
    <div style={{ background: '#FBF9F4', minHeight: '80vh', padding: '40px 0 80px 0', fontFamily: "'Jost', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Page Title Header */}
        <div style={{ marginBottom: '36px', textAlign: 'left', borderBottom: '1px solid #EAEAEA', paddingBottom: '20px' }}>
          <span style={{ color: '#007A3D', fontSize: '0.85rem', fontWeight: 700, textTransform: 'uppercase', letterSpacing: '1.5px', display: 'block', marginBottom: '6px' }}>
            Saved Favorites
          </span>
          <h1 style={{ fontSize: '2.2rem', color: '#1D231F', margin: 0, fontWeight: 700 }}>
            My Wishlist ({wishlistProducts.length})
          </h1>
        </div>

        {wishlistProducts.length === 0 ? (
          /* Empty State */
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '60px 24px', textAlign: 'center', boxShadow: '0 4px 20px rgba(0,0,0,0.04)', maxWidth: '600px', margin: '40px auto' }}>
            <div style={{ width: '80px', height: '80px', borderRadius: '50%', background: '#F4FBF7', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto', color: '#007A3D' }}>
              <Heart size={40} />
            </div>
            <h2 style={{ fontSize: '1.5rem', fontWeight: 600, color: '#222222', marginBottom: '10px' }}>Your Wishlist is Empty</h2>
            <p style={{ color: '#666666', fontSize: '0.95rem', marginBottom: '28px', lineHeight: 1.5 }}>
              Explore our premium collection of handpicked dry fruits, roasted nuts, healthy seeds, and exotic fusions to save your favorite items!
            </p>
            <button
              onClick={() => setCurrentView('products')}
              style={{
                background: '#007A3D',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '14px 32px',
                fontSize: '1rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '10px',
                boxShadow: '0 4px 14px rgba(0,122,61,0.25)',
                transition: 'all 0.25s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Explore Products <ArrowRight size={18} />
            </button>
          </div>
        ) : (
          /* Grid of Wishlist Items */
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '24px' }}>
            {wishlistProducts.map((product) => (
              <div
                key={product.id}
                style={{
                  background: '#FFFFFF',
                  borderRadius: '14px',
                  overflow: 'hidden',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.06)',
                  border: '1px solid #EFEFEF',
                  display: 'flex',
                  flexDirection: 'column',
                  position: 'relative',
                  transition: 'transform 0.25s ease, boxShadow 0.25s ease'
                }}
              >
                {/* Remove Trash Button Top Right */}
                <button
                  onClick={() => onToggleWishlist(product.id)}
                  title="Remove from Wishlist"
                  style={{
                    position: 'absolute',
                    top: '12px',
                    right: '12px',
                    width: '36px',
                    height: '36px',
                    borderRadius: '50%',
                    background: 'rgba(255,255,255,0.9)',
                    border: '1px solid #EEEEEE',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer',
                    color: '#E23744',
                    zIndex: 2,
                    boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
                    transition: 'all 0.2s ease'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.background = '#E23744';
                    e.currentTarget.style.color = '#FFFFFF';
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.background = 'rgba(255,255,255,0.9)';
                    e.currentTarget.style.color = '#E23744';
                  }}
                >
                  <Trash2 size={18} />
                </button>

                {/* Product Image Box */}
                <div
                  onClick={() => onSelectProduct(product)}
                  style={{ background: '#FAFAFA', padding: '24px', cursor: 'pointer', display: 'flex', justifyContent: 'center', alignItems: 'center', height: '220px' }}
                >
                  <img
                    src={product.image}
                    alt={product.name}
                    style={{ maxHeight: '170px', maxWidth: '100%', objectFit: 'contain' }}
                  />
                </div>

                {/* Product Info Footer */}
                <div style={{ padding: '20px', display: 'flex', flexDirection: 'column', flex: 1, textAlign: 'left' }}>
                  <span style={{ fontSize: '0.8rem', color: '#888888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '4px' }}>
                    {product.categoryName}
                  </span>
                  <h3
                    onClick={() => onSelectProduct(product)}
                    style={{ fontSize: '1.05rem', fontWeight: 600, color: '#222222', margin: '0 0 8px 0', cursor: 'pointer', lineHeight: 1.3 }}
                  >
                    {product.name}
                  </h3>

                  {/* Stock Status Badge */}
                  <div style={{ marginBottom: '14px' }}>
                    <span style={{ fontSize: '0.78rem', fontWeight: 600, color: '#007A3D', background: '#EAF7F0', padding: '3px 8px', borderRadius: '4px' }}>
                      In Stock
                    </span>
                  </div>

                  {/* Price and Add to Bag Button Row */}
                  <div style={{ marginTop: 'auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', paddingTop: '12px', borderTop: '1px solid #F5F5F5' }}>
                    <div>
                      <div style={{ fontSize: '1.2rem', fontWeight: 700, color: '#007A3D' }}>
                        ₹{product.price.toFixed(2)}
                      </div>
                      {product.originalPrice > product.price && (
                        <div style={{ fontSize: '0.85rem', color: '#999999', textDecoration: 'line-through' }}>
                          ₹{product.originalPrice.toFixed(2)}
                        </div>
                      )}
                    </div>

                    <button
                      onClick={() => onAddToCart(product.id, 1)}
                      style={{
                        background: '#007A3D',
                        color: '#FFFFFF',
                        border: 'none',
                        borderRadius: '6px',
                        padding: '10px 18px',
                        fontSize: '0.88rem',
                        fontWeight: 600,
                        cursor: 'pointer',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '6px',
                        boxShadow: '0 2px 8px rgba(0,122,61,0.2)'
                      }}
                    >
                      <ShoppingBag size={16} /> Add to Bag
                    </button>
                  </div>

                </div>
              </div>
            ))}
          </div>
        )}

      </div>
    </div>
  );
};
