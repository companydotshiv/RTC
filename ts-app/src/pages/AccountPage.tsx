import React, { useState, useEffect } from 'react';
import {
  User,
  Package,
  MapPin,
  Heart,
  ShoppingBag,
  HelpCircle,
  Settings,
  LogOut,
  Clock,
  CheckCircle2,
  Truck,
  ExternalLink,
  ChevronRight,
  Plus,
  Edit2,
  Trash2,
  Phone,
  Mail,
  MessageSquare,
  ShieldCheck,
  Award,
  AlertCircle,
  FileText,
  X
} from 'lucide-react';
import { adminStore, type AdminOrder } from '../data/adminStore';
import { products } from '../data/productsData';
import type { Product } from '../types/product';

interface AccountPageProps {
  setCurrentView: (view: string) => void;
  cartQuantities?: { [id: number]: number };
  wishlistIds?: number[];
  onAddToCart?: (productId: number, qty?: number) => void;
  onUpdateCartQty?: (productId: number, newQty: number) => void;
  onToggleWishlist?: (productId: number) => void;
  onSelectProduct?: (product: Product) => void;
}

interface SavedAddress {
  id: string;
  type: 'Home' | 'Office' | 'Other';
  isDefault: boolean;
  name: string;
  phone: string;
  street: string;
  apartment: string;
  city: string;
  state: string;
  pincode: string;
}

export const AccountPage: React.FC<AccountPageProps> = ({
  setCurrentView,
  cartQuantities = {},
  wishlistIds = [],
  onAddToCart,
  onUpdateCartQty,
  onToggleWishlist,
  onSelectProduct
}) => {
  const [activeTab, setActiveTab] = useState<'dashboard' | 'orders' | 'addresses' | 'wishlist' | 'cart' | 'support' | 'profile'>('dashboard');
  const [, setRenderTick] = useState(0);

  // User Profile Info
  const [profile, setProfile] = useState({
    fullName: 'Vikram Sharma',
    email: 'vikram.sharma@example.com',
    phone: '+91 98112 34567',
    memberSince: 'March 2024',
    tier: 'Gold Wellness Club',
    rewardPoints: 420
  });

  // Saved Addresses State
  const [addresses, setAddresses] = useState<SavedAddress[]>([
    {
      id: 'addr-1',
      type: 'Home',
      isDefault: true,
      name: 'Vikram Sharma',
      phone: '+91 98112 34567',
      street: '42, Gulmohar Avenue, Sector 56',
      apartment: 'Tower B, Flat 402',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122011'
    },
    {
      id: 'addr-2',
      type: 'Office',
      isDefault: false,
      name: 'Vikram Sharma',
      phone: '+91 98112 34567',
      street: 'Cyber City Hub, DLF Phase 2',
      apartment: 'Building 10A, 6th Floor',
      city: 'Gurugram',
      state: 'Haryana',
      pincode: '122002'
    }
  ]);

  const [isAddressModalOpen, setIsAddressModalOpen] = useState(false);
  const [editingAddress, setEditingAddress] = useState<SavedAddress | null>(null);
  const [selectedOrderForTracking, setSelectedOrderForTracking] = useState<AdminOrder | null>(null);
  const [selectedOrderForInvoice, setSelectedOrderForInvoice] = useState<AdminOrder | null>(null);

  // Support Ticket Form State
  const [supportSubmitted, setSupportSubmitted] = useState(false);
  const [supportCategory, setSupportCategory] = useState('Order Tracking');
  const [supportMessage, setSupportMessage] = useState('');

  // Password update feedback
  const [profileUpdated, setProfileUpdated] = useState(false);

  useEffect(() => {
    const unsubscribe = adminStore.subscribe(() => {
      setRenderTick((prev) => prev + 1);
    });
    return () => unsubscribe();
  }, []);

  const orders = adminStore.orders;
  const wishlistedProducts = products.filter((p) => wishlistIds.includes(p.id));
  const cartItemsList = Object.entries(cartQuantities)
    .map(([idStr, qty]) => {
      const prod = products.find((p) => p.id === Number(idStr));
      return prod ? { product: prod, qty } : null;
    })
    .filter(Boolean) as { product: Product; qty: number }[];

  const cartTotalAmount = cartItemsList.reduce((sum, item) => sum + item.product.price * item.qty, 0);

  const handleSaveAddress = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);

    const newAddr: SavedAddress = {
      id: editingAddress ? editingAddress.id : `addr-${Date.now()}`,
      type: (formData.get('type') as 'Home' | 'Office' | 'Other') || 'Home',
      isDefault: formData.get('isDefault') === 'on',
      name: (formData.get('name') as string) || profile.fullName,
      phone: (formData.get('phone') as string) || profile.phone,
      street: (formData.get('street') as string) || '',
      apartment: (formData.get('apartment') as string) || '',
      city: (formData.get('city') as string) || '',
      state: (formData.get('state') as string) || '',
      pincode: (formData.get('pincode') as string) || ''
    };

    if (newAddr.isDefault) {
      setAddresses((prev) => prev.map((a) => ({ ...a, isDefault: false })));
    }

    if (editingAddress) {
      setAddresses((prev) => prev.map((a) => (a.id === editingAddress.id ? newAddr : a)));
    } else {
      setAddresses((prev) => [...prev, newAddr]);
    }

    setIsAddressModalOpen(false);
    setEditingAddress(null);
  };

  const handleDeleteAddress = (id: string) => {
    if (confirm('Are you sure you want to remove this address?')) {
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    }
  };

  const handleProfileUpdate = (e: React.FormEvent) => {
    e.preventDefault();
    setProfileUpdated(true);
    setTimeout(() => setProfileUpdated(false), 4000);
  };

  return (
    <div style={{ background: '#FAF8F5', minHeight: '90vh', padding: '40px 0 80px 0', fontFamily: "'Jost', sans-serif", textAlign: 'left' }}>
      <div className="container" style={{ maxWidth: '1240px', margin: '0 auto', padding: '0 20px' }}>
        
        {/* User Account Hero Banner */}
        <div style={{
          background: 'linear-gradient(135deg, #072E18 0%, #041F10 100%)',
          borderRadius: '16px',
          padding: '30px 32px',
          color: '#FFFFFF',
          marginBottom: '32px',
          boxShadow: '0 10px 30px rgba(7, 46, 24, 0.15)',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          flexWrap: 'wrap',
          gap: '20px'
        }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <div style={{
              width: '72px',
              height: '72px',
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #F5D061 0%, #D4AF37 100%)',
              color: '#072E18',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '1.8rem',
              fontWeight: 800,
              boxShadow: '0 4px 14px rgba(0,0,0,0.2)'
            }}>
              {profile.fullName.charAt(0)}
            </div>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap', marginBottom: '4px' }}>
                <h1 style={{ fontSize: '1.6rem', fontWeight: 800, margin: 0, color: '#FFFFFF' }}>
                  {profile.fullName}
                </h1>
                <span style={{ background: 'rgba(212, 175, 55, 0.25)', color: '#F5D061', border: '1px solid rgba(212, 175, 55, 0.4)', padding: '2px 10px', borderRadius: '20px', fontSize: '0.75rem', fontWeight: 700 }}>
                  <Award size={12} style={{ display: 'inline', marginRight: '4px' }} /> {profile.tier}
                </span>
              </div>
              <p style={{ margin: 0, color: 'rgba(255,255,255,0.75)', fontSize: '0.88rem' }}>
                {profile.email} • {profile.phone}
              </p>
            </div>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '14px', flexWrap: 'wrap' }}>
            <div style={{ background: 'rgba(255,255,255,0.08)', padding: '10px 18px', borderRadius: '10px', border: '1px solid rgba(255,255,255,0.15)', textAlign: 'right' }}>
              <div style={{ fontSize: '0.75rem', color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', fontWeight: 600 }}>Wallet Balance</div>
              <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#F5D061' }}>₹{profile.rewardPoints} Cashback</div>
            </div>
            <button
              onClick={() => setCurrentView('admin')}
              style={{
                background: 'rgba(255,255,255,0.12)',
                border: '1px solid rgba(255,255,255,0.25)',
                color: '#FFFFFF',
                padding: '10px 16px',
                borderRadius: '8px',
                fontSize: '0.84rem',
                fontWeight: 600,
                cursor: 'pointer',
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px'
              }}
            >
              <ShieldCheck size={16} /> Admin Portal
            </button>
          </div>
        </div>

        {/* 2-Column Account Layout */}
        <div style={{ display: 'grid', gridTemplateColumns: '260px 1fr', gap: '28px' }} className="account-grid-layout">
          
          {/* Left Sidebar Navigation */}
          <aside style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '16px', height: 'fit-content', boxShadow: '0 4px 16px rgba(0,0,0,0.03)' }}>
            <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
              {[
                { id: 'dashboard', label: 'Dashboard', icon: User },
                { id: 'orders', label: 'Order History', icon: Package, badge: orders.length },
                { id: 'addresses', label: 'Saved Addresses', icon: MapPin, badge: addresses.length },
                { id: 'wishlist', label: 'My Wishlist', icon: Heart, badge: wishlistIds.length },
                { id: 'cart', label: 'Cart Items', icon: ShoppingBag, badge: cartItemsList.length },
                { id: 'support', label: 'Help & Support', icon: HelpCircle },
                { id: 'profile', label: 'Account Details', icon: Settings }
              ].map((tab) => {
                const IconComponent = tab.icon;
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id as any)}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      width: '100%',
                      padding: '12px 14px',
                      borderRadius: '8px',
                      border: 'none',
                      background: isActive ? '#E8F5E9' : 'transparent',
                      color: isActive ? '#15803D' : '#374151',
                      fontWeight: isActive ? 700 : 500,
                      fontSize: '0.92rem',
                      cursor: 'pointer',
                      transition: 'all 0.2s ease',
                      textAlign: 'left'
                    }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <IconComponent size={18} color={isActive ? '#15803D' : '#6B7280'} />
                      <span>{tab.label}</span>
                    </div>
                    {tab.badge !== undefined && tab.badge > 0 && (
                      <span style={{
                        background: isActive ? '#15803D' : '#F3F4F6',
                        color: isActive ? '#FFFFFF' : '#4B5563',
                        fontSize: '0.75rem',
                        fontWeight: 700,
                        padding: '2px 8px',
                        borderRadius: '12px'
                      }}>
                        {tab.badge}
                      </span>
                    )}
                  </button>
                );
              })}

              <div style={{ borderTop: '1px solid #F3F4F6', marginTop: '12px', paddingTop: '12px' }}>
                <button
                  onClick={() => {
                    alert('You have been logged out.');
                    setCurrentView('home');
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '12px',
                    width: '100%',
                    padding: '10px 14px',
                    borderRadius: '8px',
                    border: 'none',
                    background: 'transparent',
                    color: '#DC2626',
                    fontSize: '0.9rem',
                    fontWeight: 600,
                    cursor: 'pointer'
                  }}
                >
                  <LogOut size={18} /> Logout
                </button>
              </div>
            </nav>
          </aside>

          {/* Right Main Content Area */}
          <main style={{ minHeight: '500px' }}>
            
            {/* 1. DASHBOARD TAB */}
            {activeTab === 'dashboard' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                {/* Stats Grid */}
                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: '16px' }}>
                  <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Total Orders</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', marginTop: '4px' }}>{orders.length}</div>
                    <div style={{ fontSize: '0.8rem', color: '#15803D', marginTop: '4px' }}>All delivered & active orders</div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Wishlist Items</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', marginTop: '4px' }}>{wishlistIds.length}</div>
                    <div style={{ fontSize: '0.8rem', color: '#15803D', marginTop: '4px' }}>Saved for quick buying</div>
                  </div>

                  <div style={{ background: '#FFFFFF', padding: '20px', borderRadius: '12px', border: '1px solid #E5E7EB', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                    <div style={{ fontSize: '0.8rem', color: '#6B7280', fontWeight: 600, textTransform: 'uppercase' }}>Saved Addresses</div>
                    <div style={{ fontSize: '1.8rem', fontWeight: 800, color: '#111827', marginTop: '4px' }}>{addresses.length}</div>
                    <div style={{ fontSize: '0.8rem', color: '#15803D', marginTop: '4px' }}>Primary: {addresses.find(a => a.isDefault)?.city || 'None'}</div>
                  </div>
                </div>

                {/* Recent Orders Section */}
                <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
                    <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827', margin: 0 }}>Recent Orders</h3>
                    <button
                      onClick={() => setActiveTab('orders')}
                      style={{ background: 'none', border: 'none', color: '#15803D', fontWeight: 700, fontSize: '0.88rem', cursor: 'pointer' }}
                    >
                      View All Orders →
                    </button>
                  </div>

                  {orders.length === 0 ? (
                    <div style={{ textAlign: 'center', padding: '30px 0', color: '#6B7280' }}>
                      <Package size={40} color="#D1D5DB" style={{ marginBottom: '10px' }} />
                      <p style={{ margin: 0 }}>No orders placed yet.</p>
                      <button
                        onClick={() => setCurrentView('products')}
                        style={{ marginTop: '14px', background: '#15803D', color: '#FFFFFF', border: 'none', padding: '8px 20px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
                      >
                        Start Shopping
                      </button>
                    </div>
                  ) : (
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                      {orders.slice(0, 3).map((ord) => (
                        <div
                          key={ord.id}
                          style={{
                            border: '1px solid #F3F4F6',
                            borderRadius: '10px',
                            padding: '16px',
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            flexWrap: 'wrap',
                            gap: '12px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <div style={{ width: '42px', height: '42px', borderRadius: '8px', background: '#F9FAFB', border: '1px solid #E5E7EB', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <Package size={20} color="#15803D" />
                            </div>
                            <div>
                              <div style={{ fontWeight: 700, color: '#111827', fontSize: '0.95rem' }}>Order {ord.id}</div>
                              <div style={{ fontSize: '0.8rem', color: '#6B7280' }}>Placed on {ord.createdAt} • {ord.items.length} item(s)</div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
                            <span style={{
                              padding: '4px 10px',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: ord.status === 'Delivered' ? '#DEF7EC' : ord.status === 'Shipped' ? '#E1EFFE' : '#FEF08A',
                              color: ord.status === 'Delivered' ? '#03543F' : ord.status === 'Shipped' ? '#1E429F' : '#854D0E'
                            }}>
                              {ord.status}
                            </span>
                            <div style={{ fontWeight: 800, color: '#111827', fontSize: '1.05rem' }}>₹{ord.totalAmount.toFixed(2)}</div>
                            <button
                              onClick={() => setSelectedOrderForTracking(ord)}
                              style={{ background: '#F3F4F6', border: 'none', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#374151', cursor: 'pointer' }}
                            >
                              Track
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Fast Quick Links */}
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                  <div
                    onClick={() => setActiveTab('addresses')}
                    style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '20px', cursor: 'pointer', transition: 'box-shadow 0.2s ease' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#15803D', fontWeight: 700, marginBottom: '6px' }}>
                      <MapPin size={18} /> Manage Delivery Addresses
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>
                      Add or edit home, office, and gifting shipping destinations.
                    </p>
                  </div>

                  <div
                    onClick={() => setActiveTab('support')}
                    style={{ background: '#FFFFFF', borderRadius: '12px', border: '1px solid #E5E7EB', padding: '20px', cursor: 'pointer', transition: 'box-shadow 0.2s ease' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px', color: '#15803D', fontWeight: 700, marginBottom: '6px' }}>
                      <HelpCircle size={18} /> 24/7 Customer Helpdesk
                    </div>
                    <p style={{ margin: 0, fontSize: '0.85rem', color: '#6B7280' }}>
                      Need help with order dispatch, returns, or invoice queries?
                    </p>
                  </div>
                </div>
              </div>
            )}

            {/* 2. ORDER HISTORY TAB */}
            {activeTab === 'orders' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>Order History</h2>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#6B7280' }}>Track packages, view GST invoices, and reorder favourite items.</p>
                  </div>
                  <span style={{ fontSize: '0.88rem', color: '#4B5563', fontWeight: 600 }}>{orders.length} Total Orders</span>
                </div>

                {orders.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px 0', color: '#6B7280' }}>
                    <Package size={48} color="#D1D5DB" style={{ marginBottom: '14px' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', margin: '0 0 6px 0' }}>No Orders Found</h3>
                    <p style={{ fontSize: '0.9rem', color: '#6B7280', margin: '0 0 20px 0' }}>Looks like you haven't placed any orders yet.</p>
                    <button
                      onClick={() => setCurrentView('products')}
                      style={{ background: '#15803D', color: '#FFFFFF', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Browse Dry Fruits & Superfoods
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                    {orders.map((ord) => (
                      <div
                        key={ord.id}
                        style={{
                          border: '1px solid #E5E7EB',
                          borderRadius: '12px',
                          overflow: 'hidden'
                        }}
                      >
                        {/* Order Header */}
                        <div style={{
                          background: '#F9FAFB',
                          padding: '14px 20px',
                          borderBottom: '1px solid #E5E7EB',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          flexWrap: 'wrap',
                          gap: '12px'
                        }}>
                          <div style={{ display: 'flex', alignItems: 'center', gap: '20px', flexWrap: 'wrap' }}>
                            <div>
                              <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block', textTransform: 'uppercase' }}>Order Placed</span>
                              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111827' }}>{ord.createdAt}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block', textTransform: 'uppercase' }}>Total Amount</span>
                              <span style={{ fontSize: '0.88rem', fontWeight: 800, color: '#15803D' }}>₹{ord.totalAmount.toFixed(2)}</span>
                            </div>
                            <div>
                              <span style={{ fontSize: '0.75rem', color: '#6B7280', display: 'block', textTransform: 'uppercase' }}>Payment</span>
                              <span style={{ fontSize: '0.88rem', fontWeight: 600, color: '#111827' }}>{ord.paymentMethod} ({ord.paymentStatus})</span>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                            <span style={{
                              padding: '4px 12px',
                              borderRadius: '20px',
                              fontSize: '0.75rem',
                              fontWeight: 700,
                              background: ord.status === 'Delivered' ? '#DEF7EC' : ord.status === 'Shipped' ? '#E1EFFE' : '#FEF08A',
                              color: ord.status === 'Delivered' ? '#03543F' : ord.status === 'Shipped' ? '#1E429F' : '#854D0E'
                            }}>
                              ● {ord.status}
                            </span>
                            <button
                              onClick={() => setSelectedOrderForInvoice(ord)}
                              style={{ background: '#FFFFFF', border: '1px solid #D1D5DB', padding: '6px 12px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, color: '#374151', cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <FileText size={14} /> Invoice
                            </button>
                            <button
                              onClick={() => setSelectedOrderForTracking(ord)}
                              style={{ background: '#15803D', border: 'none', color: '#FFFFFF', padding: '6px 14px', borderRadius: '6px', fontSize: '0.8rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px' }}
                            >
                              <Truck size={14} /> Track
                            </button>
                          </div>
                        </div>

                        {/* Order Items */}
                        <div style={{ padding: '20px' }}>
                          <div style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
                            {ord.items.map((item, idx) => (
                              <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: '16px', flexWrap: 'wrap' }}>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                                  <img
                                    src={item.image}
                                    alt={item.name}
                                    style={{ width: '54px', height: '54px', objectFit: 'contain', borderRadius: '6px', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '4px' }}
                                  />
                                  <div>
                                    <h4 style={{ margin: '0 0 4px 0', fontSize: '0.95rem', fontWeight: 700, color: '#111827' }}>
                                      {item.name}
                                    </h4>
                                    <span style={{ fontSize: '0.82rem', color: '#6B7280' }}>
                                      Qty: {item.quantity} {item.weight ? `• Pack: ${item.weight}` : ''} • ₹{item.price.toFixed(2)} each
                                    </span>
                                  </div>
                                </div>

                                <button
                                  onClick={() => {
                                    if (onAddToCart) onAddToCart(item.productId, 1);
                                    alert(`Added "${item.name}" to cart!`);
                                  }}
                                  style={{ background: '#F3F4F6', border: 'none', padding: '6px 16px', borderRadius: '6px', fontSize: '0.82rem', fontWeight: 600, color: '#15803D', cursor: 'pointer' }}
                                >
                                  Buy Again
                                </button>
                              </div>
                            ))}
                          </div>

                          <div style={{ borderTop: '1px solid #F3F4F6', marginTop: '16px', paddingTop: '12px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', fontSize: '0.85rem', color: '#6B7280' }}>
                            <span>Shipping Address: {ord.shippingAddress}, {ord.city}, {ord.state} - {ord.pincode}</span>
                            {ord.courierName && (
                              <span>Courier: <strong>{ord.courierName}</strong> (AWB: {ord.trackingId})</span>
                            )}
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 3. SAVED ADDRESSES TAB */}
            {activeTab === 'addresses' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>Saved Addresses</h2>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#6B7280' }}>Manage your primary delivery destinations for one-click checkout.</p>
                  </div>
                  <button
                    onClick={() => {
                      setEditingAddress(null);
                      setIsAddressModalOpen(true);
                    }}
                    style={{
                      background: '#15803D',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '10px 18px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.88rem',
                      cursor: 'pointer',
                      display: 'inline-flex',
                      alignItems: 'center',
                      gap: '6px'
                    }}
                  >
                    <Plus size={16} /> Add New Address
                  </button>
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(320px, 1fr))', gap: '20px' }}>
                  {addresses.map((addr) => (
                    <div
                      key={addr.id}
                      style={{
                        border: addr.isDefault ? '2px solid #15803D' : '1px solid #E5E7EB',
                        borderRadius: '12px',
                        padding: '20px',
                        background: addr.isDefault ? '#F0FDF4' : '#FFFFFF',
                        position: 'relative'
                      }}
                    >
                      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '12px' }}>
                        <span style={{
                          background: addr.type === 'Home' ? '#E8F5E9' : '#FEF3C7',
                          color: addr.type === 'Home' ? '#15803D' : '#92400E',
                          padding: '2px 10px',
                          borderRadius: '12px',
                          fontSize: '0.75rem',
                          fontWeight: 700
                        }}>
                          {addr.type}
                        </span>

                        {addr.isDefault && (
                          <span style={{ fontSize: '0.75rem', fontWeight: 700, color: '#15803D', display: 'flex', alignItems: 'center', gap: '4px' }}>
                            <CheckCircle2 size={14} /> Default Delivery
                          </span>
                        )}
                      </div>

                      <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 700, color: '#111827' }}>
                        {addr.name}
                      </h4>
                      <p style={{ margin: '0 0 4px 0', fontSize: '0.88rem', color: '#4B5563', lineHeight: 1.5 }}>
                        {addr.apartment}, {addr.street}<br />
                        {addr.city}, {addr.state} - {addr.pincode}
                      </p>
                      <p style={{ margin: '0 0 16px 0', fontSize: '0.88rem', color: '#4B5563' }}>
                        Phone: <strong>{addr.phone}</strong>
                      </p>

                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px', borderTop: '1px solid rgba(0,0,0,0.06)', paddingTop: '12px' }}>
                        <button
                          onClick={() => {
                            setEditingAddress(addr);
                            setIsAddressModalOpen(true);
                          }}
                          style={{ background: 'none', border: 'none', color: '#15803D', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}
                        >
                          <Edit2 size={14} /> Edit
                        </button>
                        <button
                          onClick={() => handleDeleteAddress(addr.id)}
                          style={{ background: 'none', border: 'none', color: '#DC2626', fontSize: '0.82rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', gap: '4px', padding: 0 }}
                        >
                          <Trash2 size={14} /> Delete
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* 4. WISHLIST TAB */}
            {activeTab === 'wishlist' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>My Saved Wishlist</h2>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#6B7280' }}>Your handpicked dry fruits and seeds saved for future orders.</p>
                  </div>
                  <span style={{ fontSize: '0.88rem', color: '#4B5563', fontWeight: 600 }}>{wishlistIds.length} Items</span>
                </div>

                {wishlistedProducts.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px 0', color: '#6B7280' }}>
                    <Heart size={48} color="#D1D5DB" style={{ marginBottom: '14px' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', margin: '0 0 6px 0' }}>Your wishlist is empty</h3>
                    <p style={{ fontSize: '0.9rem', color: '#6B7280', margin: '0 0 20px 0' }}>Browse our organic harvest and tap the heart icon to save products.</p>
                    <button
                      onClick={() => setCurrentView('products')}
                      style={{ background: '#15803D', color: '#FFFFFF', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Explore Products
                    </button>
                  </div>
                ) : (
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(260px, 1fr))', gap: '20px' }}>
                    {wishlistedProducts.map((p) => (
                      <div
                        key={p.id}
                        style={{
                          border: '1px solid #E5E7EB',
                          borderRadius: '12px',
                          padding: '16px',
                          display: 'flex',
                          flexDirection: 'column',
                          position: 'relative'
                        }}
                      >
                        <button
                          onClick={() => onToggleWishlist && onToggleWishlist(p.id)}
                          style={{ position: 'absolute', top: '12px', right: '12px', background: '#FEE2E2', border: 'none', width: '32px', height: '32px', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer', color: '#DC2626' }}
                          title="Remove from wishlist"
                        >
                          <Trash2 size={16} />
                        </button>

                        <div style={{ height: '140px', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#F8FAFC', borderRadius: '8px', marginBottom: '14px' }}>
                          <img src={p.image} alt={p.name} style={{ maxHeight: '120px', objectFit: 'contain' }} />
                        </div>

                        <h4 style={{ margin: '0 0 6px 0', fontSize: '1rem', fontWeight: 700, color: '#111827' }}>
                          {p.name}
                        </h4>
                        <div style={{ fontSize: '1.1rem', fontWeight: 800, color: '#15803D', marginBottom: '14px' }}>
                          ₹{p.price.toFixed(2)}
                        </div>

                        <div style={{ display: 'flex', gap: '8px', marginTop: 'auto' }}>
                          <button
                            onClick={() => {
                              if (onAddToCart) onAddToCart(p.id, 1);
                            }}
                            style={{ flex: 1, background: '#15803D', color: '#FFFFFF', border: 'none', padding: '8px 12px', borderRadius: '6px', fontSize: '0.85rem', fontWeight: 600, cursor: 'pointer', display: 'inline-flex', alignItems: 'center', justifyContent: 'center', gap: '6px' }}
                          >
                            <ShoppingBag size={14} /> Add to Cart
                          </button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            )}

            {/* 5. CART ITEMS TAB */}
            {activeTab === 'cart' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '24px' }}>
                  <div>
                    <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 4px 0' }}>My Shopping Cart</h2>
                    <p style={{ margin: 0, fontSize: '0.88rem', color: '#6B7280' }}>Review items currently queued for your next wellness delivery.</p>
                  </div>
                  <span style={{ fontSize: '0.88rem', color: '#4B5563', fontWeight: 600 }}>{cartItemsList.length} Items</span>
                </div>

                {cartItemsList.length === 0 ? (
                  <div style={{ textAlign: 'center', padding: '48px 0', color: '#6B7280' }}>
                    <ShoppingBag size={48} color="#D1D5DB" style={{ marginBottom: '14px' }} />
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', margin: '0 0 6px 0' }}>Your cart is empty</h3>
                    <p style={{ fontSize: '0.9rem', color: '#6B7280', margin: '0 0 20px 0' }}>Discover pure organic dry fruits and snacks to fill your basket.</p>
                    <button
                      onClick={() => setCurrentView('products')}
                      style={{ background: '#15803D', color: '#FFFFFF', border: 'none', padding: '10px 24px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
                    >
                      Shop Now
                    </button>
                  </div>
                ) : (
                  <div>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '14px', marginBottom: '24px' }}>
                      {cartItemsList.map(({ product: p, qty }) => (
                        <div
                          key={p.id}
                          style={{
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'space-between',
                            border: '1px solid #E5E7EB',
                            borderRadius: '10px',
                            padding: '14px 18px',
                            flexWrap: 'wrap',
                            gap: '12px'
                          }}
                        >
                          <div style={{ display: 'flex', alignItems: 'center', gap: '14px' }}>
                            <img src={p.image} alt={p.name} style={{ width: '56px', height: '56px', objectFit: 'contain', background: '#F8FAFC', borderRadius: '6px', border: '1px solid #E2E8F0', padding: '4px' }} />
                            <div>
                              <h4 style={{ margin: '0 0 4px 0', fontSize: '1rem', fontWeight: 700, color: '#111827' }}>{p.name}</h4>
                              <div style={{ fontSize: '0.85rem', color: '#6B7280' }}>₹{p.price.toFixed(2)} each</div>
                            </div>
                          </div>

                          <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                            {/* Quantity Controls */}
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #CBD5E1', borderRadius: '6px', background: '#FFFFFF' }}>
                              <button
                                onClick={() => onUpdateCartQty && onUpdateCartQty(p.id, qty - 1)}
                                style={{ width: '32px', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1rem', color: '#334155' }}
                              >
                                –
                              </button>
                              <span style={{ minWidth: '32px', textAlign: 'center', fontSize: '0.88rem', fontWeight: 600 }}>{qty}</span>
                              <button
                                onClick={() => onUpdateCartQty && onUpdateCartQty(p.id, qty + 1)}
                                style={{ width: '32px', height: '32px', border: 'none', background: 'transparent', cursor: 'pointer', fontSize: '1rem', color: '#334155' }}
                              >
                                +
                              </button>
                            </div>

                            <div style={{ fontSize: '1.05rem', fontWeight: 800, color: '#15803D', minWidth: '80px', textAlign: 'right' }}>
                              ₹{(p.price * qty).toFixed(2)}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* Cart Summary Box */}
                    <div style={{ background: '#F9FAFB', border: '1px solid #E5E7EB', borderRadius: '12px', padding: '20px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '16px' }}>
                      <div>
                        <span style={{ fontSize: '0.88rem', color: '#6B7280' }}>Subtotal ({cartItemsList.length} items):</span>
                        <div style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827' }}>₹{cartTotalAmount.toFixed(2)}</div>
                      </div>

                      <button
                        onClick={() => setCurrentView('checkout')}
                        style={{
                          background: '#15803D',
                          color: '#FFFFFF',
                          border: 'none',
                          padding: '12px 32px',
                          borderRadius: '8px',
                          fontWeight: 700,
                          fontSize: '0.95rem',
                          cursor: 'pointer',
                          display: 'inline-flex',
                          alignItems: 'center',
                          gap: '8px'
                        }}
                      >
                        Proceed to Checkout →
                      </button>
                    </div>
                  </div>
                )}
              </div>
            )}

            {/* 6. HELP & SUPPORT TAB */}
            {activeTab === 'support' && (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                  <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>Customer Support & Helpdesk</h2>
                  <p style={{ margin: '0 0 24px 0', fontSize: '0.88rem', color: '#6B7280' }}>We are here to assist with dispatch, shipment tracking, GST billing, and return requests.</p>

                  {/* Direct Contact Cards */}
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))', gap: '16px', marginBottom: '30px' }}>
                    <a
                      href="https://wa.me/918929191914"
                      target="_blank"
                      rel="noreferrer"
                      style={{ textDecoration: 'none', background: '#F0FDF4', border: '1px solid #BBF7D0', padding: '16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '14px', color: '#15803D' }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#25D366', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <MessageSquare size={20} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>WhatsApp Chat</div>
                        <div style={{ fontSize: '0.8rem', color: '#15803D' }}>+91-89291 91914</div>
                      </div>
                    </a>

                    <a
                      href="tel:+918929191914"
                      style={{ textDecoration: 'none', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '14px', color: '#334155' }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0F1710', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Phone size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Direct Helpline</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B' }}>Mon–Sat, 10 AM – 7 PM</div>
                      </div>
                    </a>

                    <a
                      href="mailto:info@rtcfoods.in"
                      style={{ textDecoration: 'none', background: '#F8FAFC', border: '1px solid #E2E8F0', padding: '16px', borderRadius: '10px', display: 'flex', alignItems: 'center', gap: '14px', color: '#334155' }}
                    >
                      <div style={{ width: '40px', height: '40px', borderRadius: '50%', background: '#0F1710', color: '#FFFFFF', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <Mail size={18} />
                      </div>
                      <div>
                        <div style={{ fontWeight: 700, fontSize: '0.95rem' }}>Email Support</div>
                        <div style={{ fontSize: '0.8rem', color: '#64748B' }}>info@rtcfoods.in</div>
                      </div>
                    </a>
                  </div>

                  {/* Submit Support Ticket */}
                  <div style={{ borderTop: '1px solid #E5E7EB', paddingTop: '20px' }}>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', margin: '0 0 14px 0' }}>Raise a Support Ticket</h3>
                    
                    {supportSubmitted ? (
                      <div style={{ background: '#DEF7EC', border: '1px solid #84E1BC', padding: '16px', borderRadius: '8px', color: '#03543F', display: 'flex', alignItems: 'center', gap: '10px' }}>
                        <CheckCircle2 size={20} />
                        <div>
                          <strong>Ticket #TCK-{Math.floor(Math.random() * 90000 + 10000)} Submitted Successfully!</strong>
                          <div style={{ fontSize: '0.85rem' }}>Our dedicated team will review your query and reply within 4 working hours.</div>
                        </div>
                      </div>
                    ) : (
                      <form
                        onSubmit={(e) => {
                          e.preventDefault();
                          setSupportSubmitted(true);
                        }}
                        style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}
                      >
                        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '14px' }}>
                          <div>
                            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>Issue Category</label>
                            <select
                              value={supportCategory}
                              onChange={(e) => setSupportCategory(e.target.value)}
                              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem' }}
                            >
                              <option value="Order Tracking">Order Tracking / Delayed Dispatch</option>
                              <option value="Return / Damaged Product">Damaged Kernel / Return Request</option>
                              <option value="Payment / Refund">Payment Deducted / Refund Status</option>
                              <option value="Institutional & B2B">Bulk Sourcing & Private Label</option>
                              <option value="Other">Other Query</option>
                            </select>
                          </div>

                          <div>
                            <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>Order ID (Optional)</label>
                            <input
                              type="text"
                              placeholder="e.g. #ORD-8491"
                              style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem', boxSizing: 'border-box' }}
                            />
                          </div>
                        </div>

                        <div>
                          <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>Describe your issue</label>
                          <textarea
                            required
                            rows={3}
                            value={supportMessage}
                            onChange={(e) => setSupportMessage(e.target.value)}
                            placeholder="Please provide specific details so we can resolve your request faster..."
                            style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem', boxSizing: 'border-box', fontFamily: 'inherit' }}
                          />
                        </div>

                        <button
                          type="submit"
                          style={{
                            background: '#15803D',
                            color: '#FFFFFF',
                            border: 'none',
                            padding: '10px 24px',
                            borderRadius: '8px',
                            fontWeight: 600,
                            fontSize: '0.9rem',
                            cursor: 'pointer',
                            alignSelf: 'flex-start'
                          }}
                        >
                          Submit Ticket
                        </button>
                      </form>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* 7. PROFILE SETTINGS TAB */}
            {activeTab === 'profile' && (
              <div style={{ background: '#FFFFFF', borderRadius: '16px', border: '1px solid #E5E7EB', padding: '24px', boxShadow: '0 2px 8px rgba(0,0,0,0.02)' }}>
                <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: '#111827', margin: '0 0 6px 0' }}>Account Settings</h2>
                <p style={{ margin: '0 0 24px 0', fontSize: '0.88rem', color: '#6B7280' }}>Update your contact information and security credentials.</p>

                {profileUpdated && (
                  <div style={{ background: '#DEF7EC', border: '1px solid #84E1BC', padding: '12px 16px', borderRadius: '8px', color: '#03543F', marginBottom: '20px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <CheckCircle2 size={18} /> Profile details saved successfully!
                  </div>
                )}

                <form onSubmit={handleProfileUpdate} style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>Full Name</label>
                      <input
                        type="text"
                        value={profile.fullName}
                        onChange={(e) => setProfile({ ...profile, fullName: e.target.value })}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem', boxSizing: 'border-box' }}
                      />
                    </div>

                    <div>
                      <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>Phone Number</label>
                      <input
                        type="tel"
                        value={profile.phone}
                        onChange={(e) => setProfile({ ...profile, phone: e.target.value })}
                        required
                        style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem', boxSizing: 'border-box' }}
                      />
                    </div>
                  </div>

                  <div>
                    <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>Email Address</label>
                    <input
                      type="email"
                      value={profile.email}
                      onChange={(e) => setProfile({ ...profile, email: e.target.value })}
                      required
                      style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem', boxSizing: 'border-box' }}
                    />
                  </div>

                  <div style={{ borderTop: '1px solid #F3F4F6', paddingTop: '16px' }}>
                    <h4 style={{ fontSize: '1rem', fontWeight: 700, color: '#111827', margin: '0 0 12px 0' }}>Change Password</h4>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '16px' }}>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>New Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem', boxSizing: 'border-box' }}
                        />
                      </div>
                      <div>
                        <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '6px' }}>Confirm Password</label>
                        <input
                          type="password"
                          placeholder="••••••••"
                          style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', fontSize: '0.88rem', boxSizing: 'border-box' }}
                        />
                      </div>
                    </div>
                  </div>

                  <button
                    type="submit"
                    style={{
                      background: '#15803D',
                      color: '#FFFFFF',
                      border: 'none',
                      padding: '10px 24px',
                      borderRadius: '8px',
                      fontWeight: 600,
                      fontSize: '0.9rem',
                      cursor: 'pointer',
                      alignSelf: 'flex-start'
                    }}
                  >
                    Save Changes
                  </button>
                </form>
              </div>
            )}

          </main>
        </div>

      </div>

      {/* Address Edit / Add Modal */}
      {isAddressModalOpen && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', maxWidth: '520px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                {editingAddress ? 'Edit Address' : 'Add New Delivery Address'}
              </h3>
              <button onClick={() => setIsAddressModalOpen(false)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                <X size={20} />
              </button>
            </div>

            <form onSubmit={handleSaveAddress} style={{ display: 'flex', flexDirection: 'column', gap: '14px' }}>
              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Address Tag</label>
                <select name="type" defaultValue={editingAddress?.type || 'Home'} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB' }}>
                  <option value="Home">Home</option>
                  <option value="Office">Office</option>
                  <option value="Other">Other</option>
                </select>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Recipient Name *</label>
                  <input type="text" name="name" required defaultValue={editingAddress?.name || profile.fullName} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Contact Phone *</label>
                  <input type="tel" name="phone" required defaultValue={editingAddress?.phone || profile.phone} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>House / Flat / Building *</label>
                <input type="text" name="apartment" required defaultValue={editingAddress?.apartment || ''} placeholder="e.g. Flat 402, Tower B" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }} />
              </div>

              <div>
                <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Street / Locality / Landmark *</label>
                <input type="text" name="street" required defaultValue={editingAddress?.street || ''} placeholder="e.g. Sector 56, Near Huda Market" style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }} />
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: '12px' }}>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>City *</label>
                  <input type="text" name="city" required defaultValue={editingAddress?.city || 'Delhi'} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>State *</label>
                  <input type="text" name="state" required defaultValue={editingAddress?.state || 'Delhi'} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }} />
                </div>
                <div>
                  <label style={{ display: 'block', fontSize: '0.84rem', fontWeight: 600, color: '#4B5563', marginBottom: '4px' }}>Pincode *</label>
                  <input type="text" name="pincode" required defaultValue={editingAddress?.pincode || '110006'} style={{ width: '100%', padding: '10px', borderRadius: '6px', border: '1px solid #D1D5DB', boxSizing: 'border-box' }} />
                </div>
              </div>

              <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginTop: '4px' }}>
                <input type="checkbox" id="isDefault" name="isDefault" defaultChecked={editingAddress?.isDefault || false} />
                <label htmlFor="isDefault" style={{ fontSize: '0.85rem', color: '#4B5563' }}>Set as default delivery address</label>
              </div>

              <div style={{ display: 'flex', gap: '12px', marginTop: '16px' }}>
                <button type="submit" style={{ flex: 1, background: '#15803D', color: '#FFFFFF', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                  Save Address
                </button>
                <button type="button" onClick={() => setIsAddressModalOpen(false)} style={{ background: '#F3F4F6', color: '#374151', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}>
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Live Order Tracking Modal */}
      {selectedOrderForTracking && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', maxWidth: '520px', width: '100%' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px' }}>
              <div>
                <h3 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#111827', margin: 0 }}>
                  Track Order {selectedOrderForTracking.id}
                </h3>
                <span style={{ fontSize: '0.8rem', color: '#6B7280' }}>Courier: {selectedOrderForTracking.courierName || 'Blue Dart Express'} (AWB: {selectedOrderForTracking.trackingId || 'RTC8491024'})</span>
              </div>
              <button onClick={() => setSelectedOrderForTracking(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                <X size={20} />
              </button>
            </div>

            {/* Progress Stepper */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', padding: '10px 0' }}>
              {[
                { title: 'Order Confirmed', desc: `Placed on ${selectedOrderForTracking.createdAt}`, done: true },
                { title: 'Processing & Vacuum Packing', desc: 'Kundli ISO facility batch quality inspection passed', done: true },
                { title: 'Dispatched with Courier', desc: `${selectedOrderForTracking.courierName || 'Blue Dart'} Consignment In Transit`, done: selectedOrderForTracking.status === 'Shipped' || selectedOrderForTracking.status === 'Delivered' },
                { title: 'Out for Delivery / Delivered', desc: selectedOrderForTracking.status === 'Delivered' ? 'Delivered to recipient' : 'Expected delivery within 24–48 hours', done: selectedOrderForTracking.status === 'Delivered' }
              ].map((step, sIdx) => (
                <div key={sIdx} style={{ display: 'flex', gap: '14px', position: 'relative' }}>
                  <div style={{
                    width: '28px',
                    height: '28px',
                    borderRadius: '50%',
                    background: step.done ? '#15803D' : '#E5E7EB',
                    color: step.done ? '#FFFFFF' : '#9CA3AF',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexShrink: 0,
                    zIndex: 2
                  }}>
                    {step.done ? <CheckCircle2 size={16} /> : <span>{sIdx + 1}</span>}
                  </div>
                  <div>
                    <h4 style={{ margin: '0 0 2px 0', fontSize: '0.95rem', fontWeight: 700, color: step.done ? '#111827' : '#9CA3AF' }}>{step.title}</h4>
                    <p style={{ margin: 0, fontSize: '0.82rem', color: '#6B7280' }}>{step.desc}</p>
                  </div>
                </div>
              ))}
            </div>

            <button
              onClick={() => setSelectedOrderForTracking(null)}
              style={{ width: '100%', marginTop: '20px', background: '#15803D', color: '#FFFFFF', border: 'none', padding: '10px', borderRadius: '8px', fontWeight: 600, cursor: 'pointer' }}
            >
              Close
            </button>
          </div>
        </div>
      )}

      {/* Invoice Modal */}
      {selectedOrderForInvoice && (
        <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 9999, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '20px' }}>
          <div style={{ background: '#FFFFFF', borderRadius: '16px', padding: '28px', maxWidth: '580px', width: '100%', maxHeight: '90vh', overflowY: 'auto' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '20px', borderBottom: '1px solid #E5E7EB', paddingBottom: '14px' }}>
              <div>
                <img src="/footer_rtc_logo.png" alt="RTC Foods" style={{ height: '40px', width: 'auto' }} />
                <div style={{ fontSize: '0.8rem', color: '#6B7280', marginTop: '4px' }}>Tax Invoice / Bill of Supply</div>
              </div>
              <button onClick={() => setSelectedOrderForInvoice(null)} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#6B7280' }}>
                <X size={20} />
              </button>
            </div>

            <div style={{ fontSize: '0.88rem', color: '#374151', lineHeight: 1.5, marginBottom: '16px' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '8px' }}>
                <span><strong>Invoice No:</strong> INV-{selectedOrderForInvoice.id.replace('#', '')}</span>
                <span><strong>Date:</strong> {selectedOrderForInvoice.createdAt}</span>
              </div>
              <div><strong>Billed To:</strong> {selectedOrderForInvoice.customerName}</div>
              <div><strong>Address:</strong> {selectedOrderForInvoice.shippingAddress}, {selectedOrderForInvoice.city} - {selectedOrderForInvoice.pincode}</div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', fontSize: '0.85rem', marginBottom: '16px' }}>
              <thead>
                <tr style={{ background: '#F8FAFC', borderBottom: '1px solid #E2E8F0' }}>
                  <th style={{ textAlign: 'left', padding: '8px' }}>Item</th>
                  <th style={{ textAlign: 'center', padding: '8px' }}>Qty</th>
                  <th style={{ textAlign: 'right', padding: '8px' }}>Price</th>
                  <th style={{ textAlign: 'right', padding: '8px' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                {selectedOrderForInvoice.items.map((it, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #F1F5F9' }}>
                    <td style={{ padding: '8px' }}>{it.name}</td>
                    <td style={{ textAlign: 'center', padding: '8px' }}>{it.quantity}</td>
                    <td style={{ textAlign: 'right', padding: '8px' }}>₹{it.price.toFixed(2)}</td>
                    <td style={{ textAlign: 'right', padding: '8px' }}>₹{(it.price * it.quantity).toFixed(2)}</td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div style={{ borderTop: '2px solid #E5E7EB', paddingTop: '10px', textAlign: 'right', fontSize: '0.92rem' }}>
              <div>Subtotal: <strong>₹{selectedOrderForInvoice.subtotal.toFixed(2)}</strong></div>
              <div>Shipping Fee: <strong>{selectedOrderForInvoice.shippingFee === 0 ? 'FREE' : `₹${selectedOrderForInvoice.shippingFee}`}</strong></div>
              <div style={{ fontSize: '1.15rem', color: '#15803D', fontWeight: 800, marginTop: '6px' }}>
                Total Paid: ₹{selectedOrderForInvoice.totalAmount.toFixed(2)}
              </div>
            </div>

            <div style={{ display: 'flex', gap: '12px', marginTop: '20px' }}>
              <button
                onClick={() => window.print()}
                style={{ flex: 1, background: '#15803D', color: '#FFFFFF', border: 'none', padding: '10px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
              >
                Print Invoice
              </button>
              <button
                onClick={() => setSelectedOrderForInvoice(null)}
                style={{ background: '#F3F4F6', color: '#374151', border: 'none', padding: '10px 18px', borderRadius: '6px', fontWeight: 600, cursor: 'pointer' }}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
