import React from 'react';
import type { Product } from '../types/product';
import { Heart, ShoppingBag, Star } from 'lucide-react';

interface ProductDetailPageProps {
  product: Product;
  setCurrentView: (view: string) => void;
  onAddToCart: (qty: number) => void;
  cartQty?: number;
  onUpdateCartQty?: (qty: number) => void;
}

export const ProductDetailPage: React.FC<ProductDetailPageProps> = ({
  product,
  setCurrentView,
  onAddToCart,
  cartQty = 0,
  onUpdateCartQty
}) => {
  const [selectedImg, setSelectedImg] = React.useState(product.image);
  const [selectedWeight, setSelectedWeight] = React.useState(product.weights[0]);
  const [isClicking, setIsClicking] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState<'additional' | 'description' | 'feedback'>('additional');

  // Interactive Rating & Submission State for Feedback Form
  const [rating, setRating] = React.useState<number>(0);
  const [hoverRating, setHoverRating] = React.useState<number>(0);
  const [isSubmitted, setIsSubmitted] = React.useState<boolean>(false);

  // Hover Zoom State
  const [showZoom, setShowZoom] = React.useState(false);
  const [originPos, setOriginPos] = React.useState({ x: 50, y: 50 });
  const containerRef = React.useRef<HTMLDivElement>(null);

  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    setOriginPos({ x, y });
  };

  return (
    <div>
      {/* Breadcrumbs matching exact WooCommerce style */}
      <div style={{ background: '#FFF', padding: '24px 0 10px 0' }}>
        <div className="container" style={{ fontSize: '0.88rem', color: '#888888', fontFamily: "'Jost', sans-serif" }}>
          <span onClick={() => setCurrentView('home')} style={{ cursor: 'pointer' }}>Home</span> &nbsp;&gt;&nbsp;
          <span onClick={() => setCurrentView('products')} style={{ cursor: 'pointer' }}>Shop</span> &nbsp;&gt;&nbsp;
          <span style={{ color: '#555555' }}>{product.name}</span>
        </div>
      </div>

      {/* Main Product Layout */}
      <section style={{ background: '#FFF', padding: '20px 0 60px 0' }}>
        <div className="container">
          <div className="product-detail-layout">
            
            {/* Left 50% Column: Gallery & Inner Container Zoom */}
            <div className="gallery-container">
              <div
                ref={containerRef}
                className="main-img-zoom-wrapper"
                onMouseEnter={() => setShowZoom(true)}
                onMouseLeave={() => setShowZoom(false)}
                onMouseMove={handleMouseMove}
              >
                <img
                  src={selectedImg}
                  alt={product.name}
                  className="main-gallery-img"
                  style={{
                    transformOrigin: `${originPos.x}% ${originPos.y}%`,
                    transform: showZoom ? 'scale(2.4)' : 'scale(1)',
                  }}
                />
              </div>

              {/* Thumbnails */}
              <div style={{ display: 'flex', gap: '12px', justifyContent: 'flex-start', marginTop: '10px' }}>
                {product.gallery.map((gImg, idx) => (
                  <img
                    key={idx}
                    src={gImg}
                    onClick={() => setSelectedImg(gImg)}
                    style={{
                      width: '76px',
                      height: '76px',
                      borderRadius: '4px',
                      cursor: 'pointer',
                      objectFit: 'contain',
                      padding: '4px',
                      background: '#FFF',
                      border: `1.5px solid ${selectedImg === gImg ? '#007A3D' : '#E2E8F0'}`
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right 50% Column: Product Info matching screenshot 1:1 */}
            <div className="product-info-col" style={{ fontFamily: "'Jost', sans-serif" }}>
              <span style={{ color: '#888888', fontSize: '0.95rem', fontWeight: 500, display: 'block', marginBottom: '4px' }}>
                {product.categoryName || 'Almonds'}
              </span>

              <h1 style={{ fontSize: '2rem', fontWeight: 700, color: '#222222', marginBottom: '12px', lineHeight: 1.2 }}>
                {product.name}
              </h1>

              {/* Price Range */}
              <div style={{ fontSize: '1.45rem', fontWeight: 700, color: '#222222', marginBottom: (product.id === 3 || product.id === 4) ? '8px' : '20px' }}>
                {product.priceDisplay || `₹${product.price}.00`}
              </div>

              {/* Stock text for Cashew & Dry Figs Diamond */}
              {(product.id === 3 || product.id === 4) && (
                <div style={{ fontSize: '0.92rem', color: '#007A3D', fontWeight: 600, marginBottom: '20px' }}>
                  9 in stock
                </div>
              )}

              {/* Bullet Points Dynamic Rendering */}
              {product.bullets && product.bullets.length > 0 && (
                <ul className="product-bullet-list" style={{ paddingLeft: '18px', margin: '0 0 28px 0', color: '#555555', fontSize: '0.92rem', lineHeight: 1.75 }}>
                  {product.bullets.map((b, idx) => (
                    <li key={idx}>
                      {b.title && b.title !== b.text ? (
                        <><strong>{b.title}:</strong> {b.text}</>
                      ) : (
                        b.text
                      )}
                    </li>
                  ))}
                </ul>
              )}

              {/* Size & Product Type Select Dropdowns */}
              <div style={{ marginBottom: '24px', display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
                <div style={{ flex: '1', minWidth: '180px', maxWidth: '280px' }}>
                  <label style={{ fontSize: '0.9rem', color: '#555555', display: 'block', marginBottom: '8px' }}>Size</label>
                  <select
                    value={selectedWeight}
                    onChange={(e) => setSelectedWeight(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '10px 32px 10px 14px',
                      border: '1px solid #CCCCCC',
                      borderRadius: '4px',
                      fontSize: '0.92rem',
                      color: '#444444',
                      background: '#FFF',
                      outline: 'none',
                      cursor: 'pointer',
                      appearance: 'auto'
                    }}
                  >
                    <option value="">Choose An Option</option>
                    {product.weights.map((w) => (
                      <option key={w} value={w}>{w}</option>
                    ))}
                  </select>
                </div>

                {product.productTypes && product.productTypes.length > 0 && (
                  <div style={{ flex: '1', minWidth: '180px', maxWidth: '280px' }}>
                    <label style={{ fontSize: '0.9rem', color: '#555555', display: 'block', marginBottom: '8px' }}>Product Type</label>
                    <select
                      defaultValue={product.productTypes[0]}
                      style={{
                        width: '100%',
                        padding: '10px 32px 10px 14px',
                        border: '1px solid #CCCCCC',
                        borderRadius: '4px',
                        fontSize: '0.92rem',
                        color: '#444444',
                        background: '#FFF',
                        outline: 'none',
                        cursor: 'pointer',
                        appearance: 'auto'
                      }}
                    >
                      <option value="">Choose An Option</option>
                      {product.productTypes.map((pt) => (
                        <option key={pt} value={pt}>{pt}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>

              {/* Quantity & Add to Cart Action Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '20px', flexWrap: 'wrap' }}>
                {cartQty > 0 ? (
                  /* Once item is in cart: show the green quantity box controller */
                  <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', border: '2px solid #007A3D', borderRadius: '6px', overflow: 'hidden', height: '46px', background: '#FFFFFF' }}>
                      <button
                        onClick={() => onUpdateCartQty && onUpdateCartQty(cartQty - 1)}
                        title="Reduce Quantity"
                        style={{ width: '44px', height: '100%', border: 'none', background: '#EAF7F0', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700, color: '#007A3D' }}
                      >
                        –
                      </button>
                      <span style={{ minWidth: '44px', textAlign: 'center', fontWeight: 700, fontSize: '1.1rem', color: '#007A3D' }}>
                        {cartQty}
                      </span>
                      <button
                        onClick={() => onUpdateCartQty && onUpdateCartQty(cartQty + 1)}
                        title="Increase Quantity"
                        style={{ width: '44px', height: '100%', border: 'none', background: '#EAF7F0', cursor: 'pointer', fontSize: '1.2rem', fontWeight: 700, color: '#007A3D' }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ) : (
                  /* Initial State: Only show the solid green Add To Cart button */
                  <button
                    onClick={() => {
                      setIsClicking(true);
                      onAddToCart(1);
                      setTimeout(() => setIsClicking(false), 200);
                    }}
                    style={{
                      height: '46px',
                      padding: '0 32px',
                      background: '#007A3D',
                      color: '#FFF',
                      border: 'none',
                      borderRadius: '4px',
                      fontSize: '0.95rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '8px',
                      transform: isClicking ? 'scale(0.95)' : 'scale(1)',
                      transition: 'transform 0.15s ease, background 0.2s ease',
                      boxShadow: '0 4px 12px rgba(0,122,61,0.2)'
                    }}
                  >
                    Add To Cart <ShoppingBag size={18} color="#FFFFFF" />
                  </button>
                )}
              </div>

              {/* Buy Now & Wishlist Row */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '28px' }}>
                <button
                  onClick={() => alert('Proceeding to instant checkout...')}
                  style={{
                    height: '44px',
                    padding: '0 28px',
                    background: '#D5ECE0',
                    color: '#007A3D',
                    border: 'none',
                    borderRadius: '4px',
                    fontSize: '0.92rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  Buy Now
                </button>

                <button
                  title="Add to Wishlist"
                  style={{
                    width: '44px',
                    height: '44px',
                    borderRadius: '4px',
                    border: '1px solid #CCCCCC',
                    background: '#FFF',
                    color: '#555555',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    cursor: 'pointer'
                  }}
                >
                  <Heart size={18} />
                </button>
              </div>

              {/* Share Social Icons matching exact WooCommerce layout */}
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', color: '#888888', fontSize: '0.9rem' }}>
                <span>Share:</span>
                <a href="#" style={{ color: '#666666', textDecoration: 'none', display: 'inline-flex' }} title="Facebook">
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/></svg>
                </a>
                <a href="#" style={{ color: '#666666', textDecoration: 'none', display: 'inline-flex' }} title="Twitter / X">
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z"/></svg>
                </a>
                <a href="#" style={{ color: '#666666', textDecoration: 'none', display: 'inline-flex' }} title="Pinterest">
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0C5.373 0 0 5.372 0 12c0 5.084 3.163 9.426 7.627 11.174-.105-.949-.2-2.405.042-3.441.218-.937 1.407-5.965 1.407-5.965s-.359-.719-.359-1.782c0-1.668.967-2.914 2.171-2.914 1.023 0 1.518.769 1.518 1.69 0 1.029-.655 2.568-.994 3.995-.283 1.194.599 2.169 1.777 2.169 2.133 0 3.772-2.249 3.772-5.495 0-2.873-2.064-4.882-5.012-4.882-3.414 0-5.418 2.561-5.418 5.207 0 1.031.397 2.138.893 2.738.098.119.112.224.083.345l-.333 1.36c-.053.22-.174.267-.402.161-1.499-.698-2.436-2.889-2.436-4.649 0-3.785 2.75-7.262 7.929-7.262 4.163 0 7.398 2.967 7.398 6.931 0 4.136-2.607 7.464-6.227 7.464-1.216 0-2.359-.631-2.75-1.378l-.748 2.853c-.271 1.043-1.002 2.35-1.492 3.146C9.57 23.812 10.763 24 12 24c6.627 0 12-5.373 12-12 0-6.628-5.373-12-12-12z"/></svg>
                </a>
                <a href="#" style={{ color: '#666666', textDecoration: 'none', display: 'inline-flex' }} title="WhatsApp">
                  <svg width="15" height="15" fill="currentColor" viewBox="0 0 24 24"><path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981z"/></svg>
                </a>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 3 Tabs Section matching exact WordPress layout */}
      <section style={{ background: '#FFF', padding: '40px 0 80px 0', borderTop: '1px solid #EEEEEE' }}>
        <div className="container">
          
          {/* Tab Headers */}
          <div style={{ display: 'flex', justifyContent: 'center', gap: '40px', borderBottom: '1px solid #EEEEEE', paddingBottom: '16px', marginBottom: '40px', fontFamily: "'Jost', sans-serif" }}>
            <button
              onClick={() => setActiveTab('additional')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: activeTab === 'additional' ? '#F5A623' : '#666666',
                cursor: 'pointer',
                paddingBottom: '8px',
                borderBottom: activeTab === 'additional' ? '2px solid #F5A623' : '2px solid transparent'
              }}
            >
              Additional information
            </button>

            <button
              onClick={() => setActiveTab('description')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: activeTab === 'description' ? '#F5A623' : '#666666',
                cursor: 'pointer',
                paddingBottom: '8px',
                borderBottom: activeTab === 'description' ? '2px solid #F5A623' : '2px solid transparent'
              }}
            >
              Description
            </button>

            <button
              onClick={() => setActiveTab('feedback')}
              style={{
                background: 'none',
                border: 'none',
                fontSize: '1.05rem',
                fontWeight: 600,
                color: activeTab === 'feedback' ? '#F5A623' : '#666666',
                cursor: 'pointer',
                paddingBottom: '8px',
                borderBottom: activeTab === 'feedback' ? '2px solid #F5A623' : '2px solid transparent'
              }}
            >
              Customer Feedback
            </button>
          </div>

          {/* Tab Content Panels */}
          <div style={{ maxWidth: '840px', margin: '0 auto', color: '#555555', fontSize: '0.95rem', lineHeight: 1.8, fontFamily: "'Jost', sans-serif", textAlign: 'left' }}>
            {/* 1. Additional Information Tab matching exact WooCommerce table layout */}
            {activeTab === 'additional' && (
              <div style={{ textAlign: 'left' }}>
                {product.additionalInfoTable && product.additionalInfoTable.length > 0 ? (
                  <table style={{ width: '100%', borderCollapse: 'collapse', border: '1px solid #E5E5E5', marginBottom: '32px', background: '#FFF' }}>
                    <tbody>
                      {product.additionalInfoTable.map((item, idx) => (
                        <tr key={idx} style={{ borderBottom: '1px solid #E5E5E5' }}>
                          <td style={{ padding: '12px 18px', width: '38%', fontWeight: 500, color: '#444444', borderRight: '1px solid #E5E5E5', background: '#FFF' }}>
                            {item.label}
                          </td>
                          <td style={{ padding: '12px 18px', color: '#555555', background: '#FFF' }}>
                            {item.value}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <ul style={{ paddingLeft: '20px', marginBottom: '32px', textAlign: 'left' }}>
                    <li style={{ textAlign: 'left', marginBottom: '6px' }}><strong>Country of Origin:</strong> {product.origin}</li>
                    <li style={{ textAlign: 'left', marginBottom: '6px' }}><strong>Brand:</strong> RTC FOODS</li>
                    <li style={{ textAlign: 'left', marginBottom: '6px' }}><strong>Product Name:</strong> {product.name}</li>
                    <li style={{ textAlign: 'left', marginBottom: '6px' }}><strong>Additive Information:</strong> Refer to the product packaging.</li>
                    <li style={{ textAlign: 'left', marginBottom: '6px' }}><strong>Manufacturer/Packer:</strong> RTC Foods</li>
                    <li style={{ textAlign: 'left', marginBottom: '6px' }}><strong>Consumer Care:</strong> RTC Foods — info@rtcfoods.in</li>
                  </ul>
                )}

                {product.paragraphs && product.paragraphs.length > 0 ? (
                  product.paragraphs.map((pText, pIdx) => (
                    <p key={pIdx} style={{ marginBottom: '20px', color: '#555555', lineHeight: 1.8 }}>
                      {pText}
                    </p>
                  ))
                ) : (
                  <p style={{ marginBottom: '20px', color: '#555555' }}>
                    {product.description}
                  </p>
                )}
              </div>
            )}

            {/* 2. Description Tab matching exact WooCommerce table layout */}
            {activeTab === 'description' && (
              <div>
                <table style={{ width: '100%', maxWidth: '540px', borderCollapse: 'collapse', border: '1px solid #EEEEEE', background: '#FFF' }}>
                  <tbody>
                    <tr style={{ borderBottom: product.productTypes ? '1px solid #EEEEEE' : 'none' }}>
                      <td style={{ padding: '14px 20px', fontWeight: 700, color: '#333333', background: '#F9F9F9', borderRight: '1px solid #EEEEEE', width: '140px', textAlign: 'left' }}>
                        Size
                      </td>
                      <td style={{ padding: '14px 20px', color: '#555555', textAlign: 'left', fontWeight: 500 }}>
                        {product.weights.join(', ')}
                      </td>
                    </tr>
                    {product.productTypes && product.productTypes.length > 0 && (
                      <tr>
                        <td style={{ padding: '14px 20px', fontWeight: 700, color: '#333333', background: '#F9F9F9', borderRight: '1px solid #EEEEEE', width: '140px', textAlign: 'left' }}>
                          Product Type
                        </td>
                        <td style={{ padding: '14px 20px', color: '#555555', textAlign: 'left', fontWeight: 500 }}>
                          {product.productTypes.join(', ')}
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* 3. Customer Feedback Tab matching exact WooCommerce screenshot 1:1 */}
            {activeTab === 'feedback' && (
              <div style={{ textAlign: 'center', fontFamily: "'Jost', sans-serif" }}>
                {isSubmitted ? (
                  <div
                    style={{
                      background: '#E6F4EA',
                      border: '1px solid #6DBE92',
                      color: '#007A3D',
                      padding: '20px 24px',
                      borderRadius: '6px',
                      maxWidth: '680px',
                      margin: '20px auto 40px auto',
                      textAlign: 'center',
                      fontSize: '1rem',
                      fontWeight: 600,
                      boxShadow: '0 4px 12px rgba(0, 122, 61, 0.08)'
                    }}
                  >
                    Thank you! Your review has been submitted. We appreciate your feedback.
                  </div>
                ) : (
                  <>
                    <p style={{ color: '#666666', fontSize: '0.95rem', marginBottom: '32px' }}>
                      There are no reviews yet.
                    </p>

                    <h2 style={{ fontSize: '1.75rem', fontWeight: 700, color: '#222222', marginBottom: '10px' }}>
                      Be the first to review "{product.name}"
                    </h2>

                    <p style={{ fontSize: '0.9rem', color: '#666666', marginBottom: '36px' }}>
                      Your email address will not be published. Required fields are marked <span style={{ color: '#D9534F' }}>*</span>
                    </p>

                    {/* Form Wrapper */}
                    <form
                      onSubmit={(e) => {
                        e.preventDefault();
                        setIsSubmitted(true);
                      }}
                      style={{ textAlign: 'left', maxWidth: '720px', margin: '0 auto' }}
                    >
                      {/* Your rating */}
                      <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#555555', marginBottom: '8px' }}>
                          Your rating <span style={{ color: '#D9534F' }}>*</span>
                        </label>
                        <div style={{ display: 'flex', gap: '6px', alignItems: 'center' }}>
                          {[1, 2, 3, 4, 5].map((starVal) => {
                            const isFilled = starVal <= (hoverRating || rating);
                            return (
                              <Star
                                key={starVal}
                                size={22}
                                fill={isFilled ? '#F5A623' : 'transparent'}
                                color={isFilled ? '#F5A623' : '#CCCCCC'}
                                onClick={() => setRating(starVal)}
                                onMouseEnter={() => setHoverRating(starVal)}
                                onMouseLeave={() => setHoverRating(0)}
                                style={{ cursor: 'pointer', transition: 'transform 0.15s ease, color 0.15s ease' }}
                              />
                            );
                          })}
                          {rating > 0 && (
                            <span style={{ fontSize: '0.85rem', color: '#007A3D', fontWeight: 600, marginLeft: '8px' }}>
                              ({rating} / 5 stars selected)
                            </span>
                          )}
                        </div>
                        {/* Hidden required input for form validation */}
                        <input
                          type="number"
                          required
                          value={rating || ''}
                          onChange={() => {}}
                          style={{ opacity: 0, width: 0, height: 0, position: 'absolute', pointerEvents: 'none' }}
                        />
                      </div>

                      {/* Your review */}
                      <div style={{ marginBottom: '24px' }}>
                        <label style={{ display: 'block', fontSize: '0.9rem', color: '#555555', marginBottom: '8px' }}>
                          Your review <span style={{ color: '#D9534F' }}>*</span>
                        </label>
                        <textarea
                          rows={5}
                          required
                          style={{
                            width: '100%',
                            padding: '12px 14px',
                            border: '1px solid #CCCCCC',
                            borderRadius: '2px',
                            fontSize: '0.95rem',
                            color: '#333333',
                            outline: 'none',
                            resize: 'vertical',
                            background: '#FFF'
                          }}
                        />
                      </div>

                      {/* Name and Email 2-Column Row */}
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
                        <div>
                          <label style={{ display: 'block', fontSize: '0.9rem', color: '#555555', marginBottom: '8px' }}>
                            Name <span style={{ color: '#D9534F' }}>*</span>
                          </label>
                          <input
                            type="text"
                            required
                            style={{
                              width: '100%',
                              padding: '10px 14px',
                              border: '1px solid #CCCCCC',
                              borderRadius: '2px',
                              fontSize: '0.95rem',
                              color: '#333333',
                              outline: 'none',
                              background: '#FFF'
                            }}
                          />
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.9rem', color: '#555555', marginBottom: '8px' }}>
                            Email <span style={{ color: '#D9534F' }}>*</span>
                          </label>
                          <input
                            type="email"
                            required
                            style={{
                              width: '100%',
                              padding: '10px 14px',
                              border: '1px solid #CCCCCC',
                              borderRadius: '2px',
                              fontSize: '0.95rem',
                              color: '#333333',
                              outline: 'none',
                              background: '#FFF'
                            }}
                          />
                        </div>
                      </div>

                      {/* Save checkbox */}
                      <div style={{ display: 'flex', alignItems: 'flex-start', gap: '10px', marginBottom: '28px' }}>
                        <input type="checkbox" id="save-info" style={{ marginTop: '4px', cursor: 'pointer' }} />
                        <label htmlFor="save-info" style={{ fontSize: '0.88rem', color: '#666666', cursor: 'pointer', lineHeight: 1.4 }}>
                          Save my name, email, and website in this browser for the next time I comment.
                        </label>
                      </div>

                      {/* Green Submit Button matching screenshot */}
                      <button
                        type="submit"
                        style={{
                          background: '#007A3D',
                          color: '#FFFFFF',
                          padding: '12px 40px',
                          border: 'none',
                          borderRadius: '2px',
                          fontSize: '0.95rem',
                          fontWeight: 700,
                          cursor: 'pointer',
                          transition: 'background 0.2s ease'
                        }}
                        onMouseOver={(e) => (e.currentTarget.style.background = '#0F5127')}
                        onMouseOut={(e) => (e.currentTarget.style.background = '#007A3D')}
                      >
                        Submit
                      </button>
                    </form>
                  </>
                )}
              </div>
            )}
          </div>

        </div>
      </section>
    </div>
  );
};

