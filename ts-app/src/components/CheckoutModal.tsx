import React, { useState } from 'react';
import { ShieldCheck, CheckCircle2, Truck, CreditCard, X, ChevronDown, Lock } from 'lucide-react';
import { products } from '../data/productsData';
import type { Product } from '../types/product';

const INDIAN_STATES = [
  'Andaman and Nicobar Islands',
  'Andhra Pradesh',
  'Arunachal Pradesh',
  'Assam',
  'Bihar',
  'Chandigarh',
  'Chhattisgarh',
  'Dadra and Nagar Haveli and Daman and Diu',
  'Delhi',
  'Goa',
  'Gujarat',
  'Haryana',
  'Himachal Pradesh',
  'Jammu and Kashmir',
  'Jharkhand',
  'Karnataka',
  'Kerala',
  'Ladakh',
  'Lakshadweep',
  'Madhya Pradesh',
  'Maharashtra',
  'Manipur',
  'Meghalaya',
  'Mizoram',
  'Nagaland',
  'Odisha',
  'Puducherry',
  'Punjab',
  'Rajasthan',
  'Sikkim',
  'Tamil Nadu',
  'Telangana',
  'Tripura',
  'Uttar Pradesh',
  'Uttarakhand',
  'West Bengal'
];

interface CheckoutModalProps {
  isOpen: boolean;
  onClose: () => void;
  cartQuantities: { [id: number]: number };
  setCurrentView: (view: string) => void;
  onClearCart?: () => void;
  onSelectProduct?: (product: Product) => void;
}

export const CheckoutModal: React.FC<CheckoutModalProps> = ({
  isOpen,
  onClose,
  cartQuantities,
  setCurrentView,
  onClearCart,
  onSelectProduct
}) => {
  const [isAccordionOpen, setIsAccordionOpen] = useState(false);
  const [paymentMethod, setPaymentMethod] = useState<'upi' | 'card' | 'cod'>('upi');
  const [discountAmount, setDiscountAmount] = useState(164.7);
  const [appliedCoupon, setAppliedCoupon] = useState('AQAUTO15');
  const [isOrderPlaced, setIsOrderPlaced] = useState(false);
  const [orderId, setOrderId] = useState('');

  // User Details & Delivery Address State
  const [isEditingAddress, setIsEditingAddress] = useState(false);
  const [userSaved, setUserSaved] = useState(false);
  const [userData, setUserData] = useState({
    fullName: '',
    email: '',
    phone: '',
    dob: '',
    addressLine: '',
    city: '',
    state: '',
    pincode: ''
  });
  const [isPincodeLoading, setIsPincodeLoading] = useState(false);

  // Auto-fill City & State from Indian PIN code
  const handlePincodeChange = async (val: string) => {
    const cleanPin = val.replace(/\D/g, '').slice(0, 6);
    setUserData((prev) => ({ ...prev, pincode: cleanPin }));

    if (cleanPin.length === 6) {
      setIsPincodeLoading(true);
      try {
        const res = await fetch(`https://api.postalpincode.in/pincode/${cleanPin}`);
        const data = await res.json();
        if (data && data[0] && data[0].Status === 'Success' && data[0].PostOffice && data[0].PostOffice.length > 0) {
          const po = data[0].PostOffice[0];
          const foundState = INDIAN_STATES.find(s => s.toLowerCase() === po.State.toLowerCase()) || po.State;
          const foundCity = po.District || po.Block || po.Name;
          setUserData((prev) => ({
            ...prev,
            city: foundCity,
            state: foundState
          }));
        }
      } catch (err) {
        console.error('Error fetching pincode:', err);
      } finally {
        setIsPincodeLoading(false);
      }
    }
  };

  const handleSaveUser = (e: React.FormEvent) => {
    e.preventDefault();
    setUserSaved(true);
    setIsEditingAddress(false);
  };

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
    if (!userSaved && (!userData.fullName || !userData.phone || !userData.addressLine)) {
      setIsEditingAddress(true);
      return;
    }
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
                  <div
                    key={product.id}
                    onClick={() => {
                      if (onSelectProduct) {
                        onSelectProduct(product);
                        onClose();
                      }
                    }}
                    style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', padding: '4px', borderRadius: '6px', transition: 'background 0.2s ease' }}
                    onMouseEnter={(e) => e.currentTarget.style.background = '#F5F5F5'}
                    onMouseLeave={(e) => e.currentTarget.style.background = 'transparent'}
                  >
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

          {/* Section 2: Delivery Address & Personal Details Card */}
          <div style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #EAEAEA', padding: '18px', marginBottom: '16px' }}>
            {!userSaved || isEditingAddress ? (
              /* User Info Input Form for New Users */
              <form onSubmit={handleSaveUser} style={{ display: 'flex', flexDirection: 'column', gap: '14px', textAlign: 'left' }}>
                <div style={{ fontSize: '1.02rem', fontWeight: 700, color: '#1D231F', marginBottom: '4px', letterSpacing: '0.3px', textAlign: 'left' }}>
                  Enter Your Delivery & Personal Details
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                  <div style={{ textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>Full Name *</label>
                    <input
                      type="text"
                      required
                      value={userData.fullName}
                      onChange={(e) => setUserData({ ...userData, fullName: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #D8D8D8',
                        fontSize: '0.88rem',
                        fontWeight: 400,
                        color: '#222222',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>Phone Number *</label>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{
                        padding: '10px 10px',
                        background: '#EEEEEE',
                        border: '1px solid #D8D8D8',
                        borderRadius: '6px',
                        fontSize: '0.88rem',
                        fontWeight: 500,
                        color: '#444444',
                        userSelect: 'none'
                      }}>
                        +91
                      </span>
                      <input
                        type="tel"
                        required
                        value={userData.phone}
                        onChange={(e) => setUserData({ ...userData, phone: e.target.value })}
                        style={{
                          flex: 1,
                          padding: '10px 12px',
                          borderRadius: '6px',
                          border: '1px solid #D8D8D8',
                          fontSize: '0.88rem',
                          fontWeight: 400,
                          color: '#222222',
                          background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                          boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                          outline: 'none'
                        }}
                      />
                    </div>
                  </div>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '12px' }}>
                  <div style={{ textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>Email Address *</label>
                    <input
                      type="email"
                      required
                      value={userData.email}
                      onChange={(e) => setUserData({ ...userData, email: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #D8D8D8',
                        fontSize: '0.88rem',
                        fontWeight: 400,
                        color: '#222222',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>Date of Birth / DOB</label>
                    <input
                      type="date"
                      value={userData.dob}
                      onChange={(e) => setUserData({ ...userData, dob: e.target.value })}
                      className="dob-date-input"
                      style={{
                        width: '100%',
                        padding: '9px 10px',
                        borderRadius: '6px',
                        border: '1px solid #D8D8D8',
                        fontSize: '0.85rem',
                        fontWeight: 400,
                        color: '#222222',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    />
                  </div>
                </div>

                <div style={{ textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>Street Address & Flat / House No. *</label>
                  <input
                    type="text"
                    required
                    value={userData.addressLine}
                    onChange={(e) => setUserData({ ...userData, addressLine: e.target.value })}
                    style={{
                      width: '100%',
                      padding: '10px 12px',
                      borderRadius: '6px',
                      border: '1px solid #D8D8D8',
                      fontSize: '0.88rem',
                      fontWeight: 400,
                      color: '#222222',
                      background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                      boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                      outline: 'none'
                    }}
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '10px' }}>
                  <div style={{ textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>City *</label>
                    <input
                      type="text"
                      required
                      value={userData.city}
                      onChange={(e) => setUserData({ ...userData, city: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #D8D8D8',
                        fontSize: '0.88rem',
                        fontWeight: 400,
                        color: '#222222',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                        outline: 'none'
                      }}
                    />
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>State *</label>
                    <select
                      required
                      value={userData.state}
                      onChange={(e) => setUserData({ ...userData, state: e.target.value })}
                      style={{
                        width: '100%',
                        padding: '10px 10px',
                        borderRadius: '6px',
                        border: '1px solid #D8D8D8',
                        fontSize: '0.85rem',
                        fontWeight: 400,
                        color: userData.state ? '#222222' : '#888888',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="" disabled style={{ color: '#999' }}>Select State</option>
                      {INDIAN_STATES.map((st) => (
                        <option key={st} value={st} style={{ color: '#222' }}>{st}</option>
                      ))}
                    </select>
                  </div>
                  <div style={{ textAlign: 'left' }}>
                    <label style={{ display: 'block', fontSize: '0.8rem', fontWeight: 400, color: '#555555', marginBottom: '6px' }}>
                      Pincode * {isPincodeLoading && <span style={{ fontSize: '0.72rem', color: '#007A3D' }}>(Finding location...)</span>}
                    </label>
                    <input
                      type="text"
                      required
                      maxLength={6}
                      value={userData.pincode}
                      onChange={(e) => handlePincodeChange(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '10px 12px',
                        borderRadius: '6px',
                        border: '1px solid #D8D8D8',
                        fontSize: '0.88rem',
                        fontWeight: 400,
                        color: '#222222',
                        background: 'linear-gradient(180deg, #FFFFFF 0%, #FAFAFA 100%)',
                        boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                        outline: 'none'
                      }}
                    />
                  </div>
                </div>

                <button
                  type="submit"
                  style={{
                    background: '#007A3D',
                    color: '#FFFFFF',
                    border: 'none',
                    borderRadius: '6px',
                    padding: '12px 18px',
                    fontSize: '0.92rem',
                    fontWeight: 700,
                    letterSpacing: '0.4px',
                    cursor: 'pointer',
                    marginTop: '8px'
                  }}
                >
                  Save Address & Continue
                </button>
              </form>
            ) : (
              /* Display Saved User Card once info is collected */
              <div style={{ display: 'flex', alignItems: 'flex-start', justifyContent: 'space-between' }}>
                <div>
                  <div style={{ fontSize: '0.9rem', fontWeight: 700, color: '#222', marginBottom: '4px' }}>
                    Deliver To {userData.fullName}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#555', lineHeight: 1.4 }}>
                    {userData.addressLine}, {userData.city}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#555' }}>
                    {userData.state}, {userData.pincode}
                  </div>
                  <div style={{ fontSize: '0.82rem', color: '#777', marginTop: '2px' }}>
                    {userData.phone} | {userData.email} {userData.dob ? `(DOB: ${userData.dob})` : ''}
                  </div>
                </div>

                <button
                  onClick={() => setIsEditingAddress(true)}
                  style={{ border: '1px solid #CCCCCC', background: '#FFFFFF', padding: '6px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer' }}
                >
                  Change
                </button>
              </div>
            )}

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
