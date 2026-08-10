import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Truck, CreditCard, ArrowLeft } from 'lucide-react';
import { products } from '../data/productsData';
import type { Product } from '../types/product';

interface CheckoutPageProps {
  cartQuantities: { [id: number]: number };
  setCurrentView: (view: string) => void;
  onClearCart?: () => void;
}

export const CheckoutPage: React.FC<CheckoutPageProps> = ({
  cartQuantities,
  setCurrentView,
  onClearCart
}) => {
  // Form State
  const [formData, setFormData] = useState({
    email: '',
    phone: '',
    firstName: '',
    lastName: '',
    address: '',
    apartment: '',
    city: '',
    state: 'Delhi',
    pincode: '',
  });

  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [couponCode, setCouponCode] = useState('');
  const [appliedCoupon, setAppliedCoupon] = useState('');
  const [discountAmount, setDiscountAmount] = useState(0);
  const [couponError, setCouponError] = useState('');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // Cart item calculation
  const cartItems = Object.entries(cartQuantities)
    .map(([idStr, qty]) => {
      const prod = products.find((p) => p.id === Number(idStr));
      return prod ? { product: prod, qty } : null;
    })
    .filter((item): item is { product: Product; qty: number } => item !== null);

  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const shippingFee = subtotal >= 599 || subtotal === 0 ? 0 : 50;
  const codFee = paymentMethod === 'cod' ? 10 : 0;
  const grandTotal = Math.max(0, subtotal + shippingFee + codFee - discountAmount);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleApplyCoupon = (codeToApply: string) => {
    setCouponError('');
    const clean = codeToApply.trim().toUpperCase();
    if (!clean) return;

    if (clean === 'RTC20') {
      const disc = Math.round(subtotal * 0.2);
      setDiscountAmount(disc);
      setAppliedCoupon('RTC20');
      setCouponCode('RTC20');
    } else {
      setCouponError('Invalid Code');
    }
  };

  const handleRemoveCoupon = () => {
    setAppliedCoupon('');
    setDiscountAmount(0);
    setCouponError('');
    setCouponCode('');
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cartItems.length === 0) {
      alert('Your cart is empty!');
      return;
    }
    const generatedId = 'RTC-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsOrderPlaced(true);
    if (onClearCart) {
      onClearCart();
    }
  };

  return (
    <div style={{ background: '#FBF9F4', minHeight: '90vh', padding: '40px 0 80px 0', fontFamily: "'Jost', sans-serif" }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 24px' }}>
        
        {/* Top Back Link */}
        <div style={{ marginBottom: '24px', textAlign: 'left' }}>
          <button
            onClick={() => setCurrentView('products')}
            style={{ background: 'transparent', border: 'none', color: '#007A3D', fontSize: '0.92rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '6px' }}
          >
            <ArrowLeft size={16} /> Continue Shopping
          </button>
        </div>

        <h1 style={{ fontSize: '2.2rem', color: '#1D231F', marginBottom: '32px', textAlign: 'left', fontWeight: 700 }}>
          Checkout
        </h1>

        <div style={{ display: 'grid', gridTemplateColumns: '1.4fr 1fr', gap: '36px', alignItems: 'start' }}>
          
          {/* Left Column: Form & Information */}
          <form onSubmit={handlePlaceOrder} style={{ display: 'flex', flexDirection: 'column', gap: '28px', textAlign: 'left' }}>
            
            {/* 1. Contact Information */}
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #EFEFEF' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 600, color: '#222222', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                1. Contact Details
              </h2>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>Email Address *</label>
                  <input
                    type="email"
                    name="email"
                    required
                    value={formData.email}
                    onChange={handleInputChange}
                    placeholder="you@example.com"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #D8D8D8',
                      fontSize: '0.92rem',
                      fontWeight: 400,
                      color: '#222222',
                      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                      outline: 'none'
                    }}
                  />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>Mobile Number *</label>
                  <input
                    type="tel"
                    name="phone"
                    required
                    value={formData.phone}
                    onChange={handleInputChange}
                    placeholder="+91 98765 43210"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #D8D8D8',
                      fontSize: '0.92rem',
                      fontWeight: 400,
                      color: '#222222',
                      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                      outline: 'none'
                    }}
                  />
                </div>
              </div>
            </div>

            {/* 2. Shipping Address */}
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #EFEFEF' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1D231F', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                2. Shipping Address
              </h2>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>First Name *</label>
                    <input
                      type="text"
                      name="firstName"
                      required
                      value={formData.firstName}
                      onChange={handleInputChange}
                      placeholder="John"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid #D8D8D8',
                        fontSize: '0.92rem',
                        fontWeight: 400,
                        color: '#222222',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>Last Name *</label>
                    <input
                      type="text"
                      name="lastName"
                      required
                      value={formData.lastName}
                      onChange={handleInputChange}
                      placeholder="Doe"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid #D8D8D8',
                        fontSize: '0.92rem',
                        fontWeight: 400,
                        color: '#222222',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <div>
                  <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>Street Address *</label>
                  <input
                    type="text"
                    name="address"
                    required
                    value={formData.address}
                    onChange={handleInputChange}
                    placeholder="House No, Street, Landmark"
                    style={{
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: '1px solid #D8D8D8',
                      fontSize: '0.92rem',
                      fontWeight: 400,
                      color: '#222222',
                      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                      boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '16px' }}>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>City *</label>
                    <input
                      type="text"
                      name="city"
                      required
                      value={formData.city}
                      onChange={handleInputChange}
                      placeholder="New Delhi"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid #D8D8D8',
                        fontSize: '0.92rem',
                        fontWeight: 400,
                        color: '#222222',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>State *</label>
                    <select
                      name="state"
                      value={formData.state}
                      onChange={handleInputChange}
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid #D8D8D8',
                        fontSize: '0.92rem',
                        fontWeight: 400,
                        color: '#222222',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                        outline: 'none'
                      }}
                    >
                      <option value="Delhi">Delhi</option>
                      <option value="Haryana">Haryana</option>
                      <option value="Punjab">Punjab</option>
                      <option value="Maharashtra">Maharashtra</option>
                      <option value="Karnataka">Karnataka</option>
                      <option value="Uttar Pradesh">Uttar Pradesh</option>
                    </select>
                  </div>
                  <div>
                    <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>Pincode *</label>
                    <input
                      type="text"
                      name="pincode"
                      required
                      value={formData.pincode}
                      onChange={handleInputChange}
                      placeholder="110001"
                      style={{
                        width: '100%',
                        padding: '12px 14px',
                        borderRadius: '8px',
                        border: '1px solid #D8D8D8',
                        fontSize: '0.92rem',
                        fontWeight: 400,
                        color: '#222222',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                        boxShadow: 'inset 0 1px 3px rgba(0,0,0,0.03)',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* 3. Payment Method */}
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #EFEFEF' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1D231F', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '10px' }}>
                3. Select Payment Option
              </h2>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                
                {/* UPI Option */}
                <label
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: paymentMethod === 'upi' ? '2px solid #007A3D' : '1px solid #DDDDDD',
                    background: paymentMethod === 'upi' ? '#F4FBF7' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="radio" name="payment" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                    <div>
                      <div style={{ fontWeight: 700, color: '#1D231F', fontSize: '0.95rem' }}>UPI / QR Code</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 400, color: '#666666' }}>Google Pay, PhonePe, Paytm, BHIM</div>
                    </div>
                  </div>
                  <CreditCard size={22} color="#007A3D" />
                </label>

                {/* Card Option */}
                <label
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: paymentMethod === 'card' ? '2px solid #007A3D' : '1px solid #DDDDDD',
                    background: paymentMethod === 'card' ? '#F4FBF7' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="radio" name="payment" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                    <div>
                      <div style={{ fontWeight: 700, color: '#1D231F', fontSize: '0.95rem' }}>Credit / Debit Card</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 400, color: '#666666' }}>Visa, Mastercard, RuPay, Amex</div>
                    </div>
                  </div>
                  <ShieldCheck size={22} color="#007A3D" />
                </label>

                {/* COD Option */}
                <label
                  style={{
                    padding: '16px',
                    borderRadius: '8px',
                    border: paymentMethod === 'cod' ? '2px solid #007A3D' : '1px solid #DDDDDD',
                    background: paymentMethod === 'cod' ? '#F4FBF7' : '#FFFFFF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                    <input type="radio" name="payment" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                    <div>
                      <div style={{ fontWeight: 700, color: '#1D231F', fontSize: '0.95rem' }}>Cash on Delivery (COD)</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 400, color: '#666666' }}>Pay cash upon doorstep delivery</div>
                    </div>
                  </div>
                  <Truck size={22} color="#007A3D" />
                </label>

              </div>
            </div>

            <button
              type="submit"
              style={{
                background: '#007A3D',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '10px',
                padding: '18px',
                fontSize: '1.1rem',
                fontWeight: 700,
                cursor: 'pointer',
                boxShadow: '0 6px 20px rgba(0,122,61,0.25)',
                transition: 'transform 0.2s ease'
              }}
              onMouseEnter={(e) => e.currentTarget.style.transform = 'translateY(-2px)'}
              onMouseLeave={(e) => e.currentTarget.style.transform = 'translateY(0)'}
            >
              Place Order • ₹{grandTotal.toFixed(2)}
            </button>
          </form>

          {/* Right Column: Order Summary */}
          <div style={{ position: 'sticky', top: '100px', display: 'flex', flexDirection: 'column', gap: '20px', textAlign: 'left' }}>
            <div style={{ background: '#FFFFFF', padding: '28px', borderRadius: '14px', boxShadow: '0 4px 16px rgba(0,0,0,0.04)', border: '1px solid #EFEFEF' }}>
              <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#1D231F', marginBottom: '20px' }}>
                Order Summary ({cartItems.length} items)
              </h2>

              {/* Items List */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', maxHeight: '280px', overflowY: 'auto', marginBottom: '20px', paddingRight: '6px' }}>
                {cartItems.map(({ product, qty }) => (
                  <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '12px' }}>
                    <img src={product.image} alt={product.name} style={{ width: '48px', height: '48px', objectFit: 'contain', borderRadius: '6px', background: '#FAFAFA', padding: '4px', border: '1px solid #EEEEEE' }} />
                    <div style={{ flex: 1 }}>
                      <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#1D231F' }}>{product.name}</div>
                      <div style={{ fontSize: '0.82rem', fontWeight: 400, color: '#666666' }}>Qty: {qty}</div>
                    </div>
                    <div style={{ fontSize: '0.95rem', fontWeight: 400, color: '#007A3D' }}>
                      ₹{(product.price * qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>

              {/* Coupon Box */}
              <div style={{ marginBottom: '20px', borderTop: '1px solid #F0F0F0', paddingTop: '18px' }}>
                <div style={{ display: 'flex', gap: '8px', marginBottom: '8px' }}>
                  <input
                    type="text"
                    placeholder="Coupon (e.g. RTC20)"
                    value={couponCode}
                    onChange={(e) => {
                      setCouponCode(e.target.value);
                      setCouponError('');
                    }}
                    style={{
                      flex: 1,
                      padding: '10px 14px',
                      borderRadius: '8px',
                      border: '1px solid #D8D8D8',
                      fontSize: '0.88rem',
                      fontWeight: 400,
                      color: '#222222',
                      background: '#FFFFFF',
                      outline: 'none'
                    }}
                  />
                  <button
                    onClick={() => handleApplyCoupon(couponCode)}
                    style={{ background: '#007A3D', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '0 18px', fontSize: '0.88rem', fontWeight: 600, cursor: 'pointer' }}
                  >
                    Apply
                  </button>
                </div>

                {/* Dropdown Select Coupon option */}
                <div style={{ marginBottom: '10px' }}>
                  <select
                    value={appliedCoupon}
                    onChange={(e) => {
                      if (e.target.value) {
                        handleApplyCoupon(e.target.value);
                      } else {
                        handleRemoveCoupon();
                      }
                    }}
                    style={{
                      width: '100%',
                      padding: '8px 12px',
                      borderRadius: '6px',
                      border: '1px solid #D8D8D8',
                      fontSize: '0.85rem',
                      color: '#222',
                      background: '#FFF',
                      cursor: 'pointer'
                    }}
                  >
                    <option value="">Select Available Coupon</option>
                    <option value="RTC20">RTC20 — Get 20% OFF on all orders</option>
                  </select>
                </div>

                {/* Red mini notification box with transparent bg & white outline */}
                {couponError && (
                  <div
                    style={{
                      background: 'transparent',
                      border: '1px solid #FFFFFF',
                      color: '#E53935',
                      padding: '6px 12px',
                      borderRadius: '6px',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      boxShadow: '0 2px 8px rgba(229,57,53,0.15)',
                      marginBottom: '10px',
                      display: 'inline-block'
                    }}
                  >
                    {couponError}
                  </div>
                )}

                {/* Applied / Available Coupon Status */}
                {appliedCoupon ? (
                  <div style={{ border: '1px solid #007A3D', background: '#F4FBF7', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div>
                      <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#007A3D' }}>"{appliedCoupon}" applied</div>
                      <div style={{ fontSize: '0.78rem', color: '#666' }}>20% OFF flat discount</div>
                    </div>
                    <button
                      onClick={handleRemoveCoupon}
                      style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
                      title="Click green tick to unselect coupon"
                    >
                      <CheckCircle2 size={22} color="#007A3D" fill="#007A3D" stroke="#FFFFFF" />
                    </button>
                  </div>
                ) : (
                  <div style={{ border: '1px solid #E5E5E5', borderRadius: '8px', padding: '10px 14px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ fontSize: '0.85rem', color: '#444' }}>Use code "RTC20" for 20% OFF</div>
                    <button onClick={() => handleApplyCoupon('RTC20')} style={{ border: '1px solid #CCCCCC', background: '#FFFFFF', padding: '4px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                      Apply
                    </button>
                  </div>
                )}
              </div>

              {/* Pricing Breakdown */}
              <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', fontSize: '0.92rem', color: '#555555', borderTop: '1px solid #F0F0F0', paddingTop: '18px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 400 }}>
                  <span>Subtotal</span>
                  <span>₹{subtotal.toFixed(2)}</span>
                </div>
                {discountAmount > 0 && (
                  <div style={{ display: 'flex', justifyContent: 'space-between', color: '#007A3D', fontWeight: 400 }}>
                    <span>Coupon Discount</span>
                    <span>-₹{discountAmount.toFixed(2)}</span>
                  </div>
                )}
                <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 400 }}>
                  <span>Shipping</span>
                  <span>{shippingFee === 0 ? <strong style={{ color: '#007A3D', fontWeight: 700 }}>FREE</strong> : `₹${shippingFee}`}</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '1.25rem', color: '#1D231F', borderTop: '1.5px solid #EEEEEE', paddingTop: '12px', marginTop: '6px' }}>
                  <span style={{ fontWeight: 700 }}>Grand Total</span>
                  <span style={{ color: '#007A3D', fontWeight: 700 }}>₹{grandTotal.toFixed(2)}</span>
                </div>
              </div>

            </div>
          </div>

        </div>

      </div>

      {/* Order Confirmation Modal */}
      {isOrderPlaced && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.5)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, backdropFilter: 'blur(3px)' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '40px', maxWidth: '500px', width: '90%', textAlign: 'center', boxShadow: '0 20px 50px rgba(0,0,0,0.2)' }}>
            <div style={{ width: '70px', height: '70px', borderRadius: '50%', background: '#EAF7F0', color: '#007A3D', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
              <CheckCircle2 size={44} />
            </div>
            <h2 style={{ fontSize: '1.8rem', color: '#1D231F', fontWeight: 700, marginBottom: '8px' }}>Order Confirmed!</h2>
            <p style={{ color: '#666666', fontSize: '0.95rem', marginBottom: '20px' }}>
              Thank you for shopping with RTC Foods. Your order ID is <strong style={{ color: '#007A3D' }}>{orderId}</strong>.
            </p>
            <button
              onClick={() => {
                setIsOrderPlaced(false);
                setCurrentView('home');
              }}
              style={{ background: '#007A3D', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '14px 32px', fontSize: '1rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Return to Homepage
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
