import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Truck, CreditCard, X, ChevronDown, Lock } from 'lucide-react';
import { products } from '../data/productsData';
import type { Product } from '../types/product';

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartQuantities: { [id: number]: number };
  setCurrentView: (view: string) => void;
  onClearCart?: () => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartQuantities,
  setCurrentView,
  onClearCart
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [discountAmount, setDiscountAmount] = useState(164.7);
  const [appliedCoupon, setAppliedCoupon] = useState('AQAUTO15');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  if (!isOpen) return null;

  // Calculate cart items
  const cartItems = Object.entries(cartQuantities)
    .map(([idStr, qty]) => {
      const prod = products.find((p) => p.id === Number(idStr));
      return prod ? { product: prod, qty } : null;
    })
    .filter((item): item is { product: Product; qty: number } => item !== null);

  const totalItemsCount = cartItems.reduce((sum, i) => sum + i.qty, 0);
  const originalSubtotal = cartItems.reduce((sum, item) => sum + item.product.originalPrice * item.qty, 0);
  const subtotal = cartItems.reduce((sum, item) => sum + item.product.price * item.qty, 0);
  const totalSavings = originalSubtotal - subtotal + discountAmount;
  const grandTotal = Math.max(0, subtotal - discountAmount);

  const handleApplyCoupon = (codeToApply: string) => {
    if (codeToApply.toUpperCase() === 'FRESH') {
      setDiscountAmount(399);
      setAppliedCoupon('FRESH');
    } else if (codeToApply.toUpperCase() === 'AQAUTO15' || codeToApply.toUpperCase() === 'RTC20') {
      const disc = Math.round(subtotal * 0.15);
      setDiscountAmount(disc);
      setAppliedCoupon(codeToApply.toUpperCase());
    }
  };

  const handlePlaceOrder = (e: React.FormEvent) => {
    e.preventDefault();
    const generatedId = 'RTC-' + Math.floor(100000 + Math.random() * 900000);
    setOrderId(generatedId);
    setIsOrderPlaced(true);
    if (onClearCart) onClearCart();
  };

  return (
    <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.6)', backdropFilter: 'blur(4px)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 9999, padding: '20px' }}>
      
      {/* Modal Container */}
      <div style={{ background: '#FFFFFF', width: '100%', maxWidth: '540px', maxHeight: '90vh', borderRadius: '18px', overflow: 'hidden', display: 'flex', flexDirection: 'column', boxShadow: '0 24px 60px rgba(0,0,0,0.3)', fontFamily: "'Jost', sans-serif", position: 'relative' }}>
        
        {/* Header Bar */}
        <div style={{ padding: '16px 20px', borderBottom: '1px solid #EFEFEF', display: 'flex', alignItems: 'center', justifyContent: 'space-between', background: '#FFFFFF' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
            <span style={{ fontSize: '1.25rem', fontWeight: 800, color: '#007A3D', letterSpacing: '-0.5px' }}>RTC FOODS</span>
            <span style={{ fontSize: '0.72rem', color: '#666', background: '#F0F0F0', padding: '2px 8px', borderRadius: '10px' }}>Pure & Natural</span>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <span style={{ fontSize: '0.82rem', color: '#555555', display: 'flex', alignItems: 'center', gap: '4px', fontWeight: 500 }}>
              100% Secured Payment <Lock size={13} color="#007A3D" />
            </span>
            <button onClick={onClose} style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0, color: '#444' }}>
              <X size={20} />
            </button>
          </div>
        </div>

        {/* Top Announcement Bar */}
        <div style={{ background: '#000000', color: '#FFFFFF', textAlign: 'center', padding: '8px', fontSize: '0.82rem', fontWeight: 500 }}>
          Pay online for faster delivery!
        </div>

        {/* Modal Scrollable Body */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '20px', background: '#F8F9FA' }}>
          
          {/* Section 1: Order Summary Box */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '16px', marginBottom: '16px' }}>
            
            <div
              onClick={() => setIsAccordionOpen(!isAccordionOpen)}
              style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer' }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '0.92rem', fontWeight: 600, color: '#222' }}>Order Summary</span>
                <span style={{ fontSize: '0.8rem', color: '#666666', background: '#F0F0F0', padding: '2px 8px', borderRadius: '12px' }}>{totalItemsCount} items</span>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                <div style={{ textAlign: 'right' }}>
                  <span style={{ fontSize: '0.8rem', color: '#999', textDecoration: 'line-through', marginRight: '6px' }}>₹{originalSubtotal.toFixed(2)}</span>
                  <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#1D231F' }}>₹{grandTotal.toFixed(2)}</span>
                </div>
                <ChevronDown size={18} style={{ transform: isAccordionOpen ? 'rotate(180deg)' : 'rotate(0deg)', transition: 'transform 0.2s' }} />
              </div>
            </div>

            {/* Savings Banner inside summary */}
            <div style={{ background: '#EAF7F0', color: '#007A3D', fontSize: '0.8rem', fontWeight: 600, padding: '6px 12px', borderRadius: '6px', marginTop: '10px', display: 'inline-block' }}>
              ₹{totalSavings.toFixed(2)} saved so far
            </div>

            {/* Accordion Item List */}
            {isAccordionOpen && (
              <div style={{ marginTop: '16px', borderTop: '1px solid #F0F0F0', paddingTop: '14px', display: 'flex', flexDirection: 'column', gap: '12px' }}>
                {cartItems.map(({ product, qty }) => (
                  <div key={product.id} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <img src={product.image} alt={product.name} style={{ width: '38px', height: '38px', objectFit: 'contain' }} />
                      <div>
                        <div style={{ fontSize: '0.86rem', fontWeight: 600, color: '#222' }}>{product.name}</div>
                        <div style={{ fontSize: '0.78rem', color: '#777' }}>Qty: {qty}</div>
                      </div>
                    </div>
                    <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#222' }}>
                      ₹{(product.price * qty).toFixed(2)}
                    </div>
                  </div>
                ))}
              </div>
            )}

          </div>

          {/* Section 2: Delivery Address Card */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '16px', marginBottom: '16px' }}>
            <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#222', marginBottom: '4px' }}>Deliver To Adity Hazra</div>
                <div style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.4 }}>Swarna Rekha Nagar, Ketari Bagan, Lower Ch...</div>
                <div style={{ fontSize: '0.82rem', color: '#555' }}>Jharkhand, 834010</div>
                <div style={{ fontSize: '0.82rem', color: '#777', marginTop: '2px' }}>+91 8649802844 | adiandkookie97@gmail.com</div>
              </div>

              <button style={{ border: '1px solid #CCCCCC', background: '#FFFFFF', padding: '6px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}>
                Change
              </button>
            </div>

            <div style={{ marginTop: '12px', borderTop: '1px solid #F5F5F5', paddingTop: '10px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <span style={{ background: '#007A3D', color: '#FFFFFF', fontSize: '0.72rem', fontWeight: 700, padding: '2px 6px', borderRadius: '4px' }}>Free</span>
              <span style={{ fontSize: '0.82rem', color: '#333', fontWeight: 500 }}>Free Shipping</span>
            </div>
          </div>

          {/* Section 3: Offers & Rewards */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '16px', marginBottom: '16px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '12px' }}>
              OFFERS & REWARDS
            </div>

            {/* Savings Highlight */}
            <div style={{ fontSize: '0.85rem', fontWeight: 600, color: '#007A3D', marginBottom: '14px' }}>
              You saved ₹{discountAmount.toFixed(2)}
            </div>

            {/* Available Coupon Card 1 */}
            <div style={{ border: '1px solid #E5E5E5', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '10px' }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 600, color: '#222' }}>Save ₹399 with "FRESH"</div>
              </div>
              <button onClick={() => handleApplyCoupon('FRESH')} style={{ border: '1px solid #CCCCCC', background: '#FFFFFF', padding: '6px 16px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer' }}>
                Apply
              </button>
            </div>

            {/* Applied Coupon Card 2 */}
            <div style={{ border: '1px solid #007A3D', background: '#F4FBF7', borderRadius: '8px', padding: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
              <div>
                <div style={{ fontSize: '0.88rem', fontWeight: 700, color: '#007A3D' }}>"{appliedCoupon}" applied</div>
                <div style={{ fontSize: '0.78rem', color: '#666', cursor: 'pointer' }}>View all coupons &gt;</div>
              </div>
              <CheckCircle2 size={20} color="#007A3D" />
            </div>
          </div>

          {/* Section 4: Payment Options */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '16px' }}>
            <div style={{ fontSize: '0.85rem', fontWeight: 700, color: '#888', textTransform: 'uppercase', letterSpacing: '0.5px', marginBottom: '14px' }}>
              PAYMENT OPTIONS
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              {/* UPI */}
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '8px', border: paymentMethod === 'upi' ? '2px solid #007A3D' : '1px solid #E5E5E5', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="radio" name="pay" checked={paymentMethod === 'upi'} onChange={() => setPaymentMethod('upi')} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#222' }}>UPI / QR Code</span>
                </div>
                <CreditCard size={18} color="#007A3D" />
              </label>

              {/* Card */}
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '8px', border: paymentMethod === 'card' ? '2px solid #007A3D' : '1px solid #E5E5E5', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="radio" name="pay" checked={paymentMethod === 'card'} onChange={() => setPaymentMethod('card')} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#222' }}>Credit / Debit Card</span>
                </div>
                <ShieldCheck size={18} color="#007A3D" />
              </label>

              {/* COD */}
              <label style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 14px', borderRadius: '8px', border: paymentMethod === 'cod' ? '2px solid #007A3D' : '1px solid #E5E5E5', cursor: 'pointer' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                  <input type="radio" name="pay" checked={paymentMethod === 'cod'} onChange={() => setPaymentMethod('cod')} />
                  <span style={{ fontSize: '0.9rem', fontWeight: 600, color: '#222' }}>Cash on Delivery</span>
                </div>
                <Truck size={18} color="#007A3D" />
              </label>
            </div>

            <button
              onClick={handlePlaceOrder}
              style={{
                width: '100%',
                background: '#007A3D',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '8px',
                padding: '16px',
                fontSize: '1rem',
                fontWeight: 700,
                cursor: 'pointer',
                marginTop: '16px',
                boxShadow: '0 4px 14px rgba(0,122,61,0.25)'
              }}
            >
              Pay Now • ₹{grandTotal.toFixed(2)}
            </button>
          </div>

        </div>

      </div>

      {/* Order Success Popup */}
      {isOrderPlaced && (
        <div style={{ position: 'fixed', top: 0, left: 0, width: '100vw', height: '100vh', background: 'rgba(0,0,0,0.7)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 10000 }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '36px', maxWidth: '440px', width: '90%', textAlign: 'center' }}>
            <CheckCircle2 size={54} color="#007A3D" style={{ margin: '0 auto 16px auto' }} />
            <h2 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1D231F', marginBottom: '8px' }}>Order Placed Successfully!</h2>
            <p style={{ fontSize: '0.9rem', color: '#666', marginBottom: '24px' }}>
              Your order ID is <strong style={{ color: '#007A3D' }}>{orderId}</strong>.
            </p>
            <button
              onClick={() => {
                setIsOrderPlaced(false);
                onClose();
                setCurrentView('home');
              }}
              style={{ background: '#007A3D', color: '#FFFFFF', border: 'none', borderRadius: '8px', padding: '12px 28px', fontSize: '0.95rem', fontWeight: 600, cursor: 'pointer' }}
            >
              Back to Home
            </button>
          </div>
        </div>
      )}

    </div>
  );
};
