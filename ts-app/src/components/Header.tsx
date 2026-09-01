import React, { useState, useEffect } from 'react';
import { ShoppingBag, Search, Heart, User, Truck, X, ChevronDown, Menu } from 'lucide-react';
import { adminStore } from '../data/adminStore';
import type { Product } from '../types/product';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cartCount?: number;
  wishlistCount?: number;
  cartQuantities?: { [id: number]: number };
  onUpdateCartQty?: (productId: number, newQty: number) => void;
  onRemoveCartItem?: (productId: number) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSelectProduct?: (product: Product) => void;
  isCartOpen?: boolean;
  setIsCartOpen?: (open: boolean) => void;
  onOpenCheckoutModal?: () => void;
  onNavigateToCategory?: (category: string, subCategory?: string) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  wishlistCount = 0,
  cartQuantities: externalCartQuantities,
  onUpdateCartQty,
  onRemoveCartItem,
  searchQuery = '',
  setSearchQuery,
  onSelectProduct,
  isCartOpen: externalIsCartOpen,
  setIsCartOpen: externalSetIsCartOpen,
  onOpenCheckoutModal,
  onNavigateToCategory
}) => {
  const [, setRenderTick] = useState(0);

  useEffect(() => {
    const unsubscribe = adminStore.subscribe(() => {
      setRenderTick((prev) => prev + 1);
    });
    return () => unsubscribe();
  }, []);

  const announcement = adminStore.announcement;
  const products = adminStore.products;
  const [isSearchOpen, setIsSearchOpen] = useState<boolean>(false);
  const [internalIsCartOpen, setInternalIsCartOpen] = useState<boolean>(false);

  const isCartOpen = externalIsCartOpen !== undefined ? externalIsCartOpen : internalIsCartOpen;
  const setIsCartOpen = externalSetIsCartOpen || setInternalIsCartOpen;
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [localQuery, setLocalQuery] = useState<string>(searchQuery);
  const [localCartQuantities, setLocalCartQuantities] = useState<{ [id: number]: number }>({});

  const activeQuery = setSearchQuery ? searchQuery : localQuery;
  const activeCartQuantities = externalCartQuantities !== undefined ? externalCartQuantities : localCartQuantities;

  const handleUpdateQuantity = (productId: number, newQty: number) => {
    if (onUpdateCartQty) {
      onUpdateCartQty(productId, newQty);
    } else {
      setLocalCartQuantities((prev) => {
        const updated = { ...prev };
        if (newQty <= 0) {
          delete updated[productId];
        } else {
          updated[productId] = newQty;
        }
        return updated;
      });
    }
  };

  // Compute total items added across all products accurately
  const totalCartCount = Object.values(activeCartQuantities).reduce((a, b) => a + b, 0);

  // Compute total price of items in cart
  const cartSubtotal = Object.entries(activeCartQuantities).reduce((sum, [idStr, qty]) => {
    const prod = products.find(p => p.id === Number(idStr));
    return sum + (prod ? prod.price * qty : 0);
  }, 0);

  const handleQueryChange = (val: string) => {
    setLocalQuery(val);
    if (setSearchQuery) {
      setSearchQuery(val);
    }
  };

  const handleSearchClick = () => {
    setIsCartOpen(false);
    setIsSearchOpen(true);
  };

  const handleCartClick = () => {
    setIsSearchOpen(false);
    setIsCartOpen(true);
  };

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  const [isMobileCatOpen, setIsMobileCatOpen] = useState<boolean>(false);

  const handleClose = () => {
    setIsSearchOpen(false);
    setIsCartOpen(false);
    setIsMobileMenuOpen(false);
  };

  const categoryOptions = [
    { label: 'All Categories', value: 'all', indent: 0 },
    { label: 'Chemical & Herbs', value: 'chemical-herbs', indent: 0 },
    { label: 'Dehydrated Fruits', value: 'dehydrated-fruits', indent: 0 },
    { label: 'Dry Figs', value: 'dry-figs', indent: 0 },
    { label: 'Dry fruits', value: 'dry-fruits', indent: 0 },
    { label: 'Almonds', value: 'almonds', indent: 1 },
    { label: 'Cashew', value: 'cashew', indent: 1 },
    { label: 'Dried Apricot', value: 'dried-apricot', indent: 1 },
    { label: 'Raisins', value: 'raisins', indent: 1 },
    { label: 'Walnut', value: 'walnut', indent: 1 },
    { label: 'Fusions', value: 'fusions', indent: 0 },
    { label: 'Seeds', value: 'seeds-berries', indent: 0 },
    { label: 'Snacking', value: 'snacking', indent: 0 },
    { label: 'Spices', value: 'spices', indent: 0 },
  ];

  // Filter products for the drawer preview
  const drawerResults = products.filter((p) => {
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      if (selectedCategory === 'almonds') {
        matchesCategory = p.name.toLowerCase().includes('almond');
      } else if (selectedCategory === 'cashew') {
        matchesCategory = p.name.toLowerCase().includes('cashew');
      } else if (selectedCategory === 'dried-apricot') {
        matchesCategory = p.name.toLowerCase().includes('apricot');
      } else if (selectedCategory === 'raisins') {
        matchesCategory = p.name.toLowerCase().includes('raisin');
      } else if (selectedCategory === 'walnut') {
        matchesCategory = p.name.toLowerCase().includes('walnut');
      } else if (selectedCategory === 'dry-figs') {
        matchesCategory = p.name.toLowerCase().includes('fig') || p.name.toLowerCase().includes('anjeer');
      } else {
        matchesCategory = p.category === selectedCategory || p.categoryName.toLowerCase().includes(selectedCategory.replace('-', ' '));
      }
    }

    const matchesSearch = !activeQuery.trim() ||
      p.name.toLowerCase().includes(activeQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(activeQuery.toLowerCase());

    return matchesCategory && matchesSearch;
  });

  return (
    <>
      {/* Top Announcement Bar - Sleek & Modern */}
      {announcement.isActive && (
        <div className="top-bar" style={{ backgroundColor: announcement.bgColor || '#15803D', color: announcement.textColor || '#ffffff' }}>
          <div className="container">
            <div className="top-bar-left">
              <Truck size={13} strokeWidth={1.75} style={{ display: 'inline-block', opacity: 0.9 }} />
              <span>Free shipping on orders over ₹{adminStore.shippingRule.minOrderForFreeShipping}</span>
            </div>
            <div className="top-bar-center">
              <span>{announcement.text}</span>
            </div>
            <div className="top-bar-right">
              <a href="https://facebook.com" target="_blank" rel="noreferrer">Facebook</a>
              <span className="top-bar-social-divider" />
              <a href="https://instagram.com" target="_blank" rel="noreferrer">Instagram</a>
            </div>
          </div>
        </div>
      )}

      {/* Main Header */}
      <header className="main-header">
        <div className="container">
          <div className="navbar">
            {/* Mobile Hamburger Button */}
            <button
              className="mobile-hamburger-btn"
              onClick={() => setIsMobileMenuOpen(true)}
              aria-label="Open Navigation Menu"
            >
              <Menu size={24} color="#15803D" />
            </button>

            <div className="brand-logo" onClick={() => setCurrentView('home')} style={{ cursor: 'pointer', flexShrink: 0 }}>
              <img src="/rtc-logo.png" alt="RTC Foods" style={{ height: '52px', width: 'auto', objectFit: 'contain' }} />
            </div>

            {/* Desktop Navigation Menu matching exact Wordpress Razzi colors & dropdown */}
            <ul className="nav-menu">
              <li>
                <button className={`nav-link ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>Home</button>
              </li>
              <li className="dropdown-parent" style={{ position: 'relative' }}>
                <button
                  className={`nav-link ${currentView === 'products' ? 'active' : ''}`}
                  onClick={() => {
                    if (onNavigateToCategory) onNavigateToCategory('all', '');
                    else setCurrentView('products');
                  }}
                >
                  Products
                </button>
                <div className="dropdown-menu">
                  <a
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (onNavigateToCategory) onNavigateToCategory('all', '');
                      else setCurrentView('products');
                    }}
                  >
                    All Product Range
                  </a>

                  <div className="sub-dropdown-parent" style={{ position: 'relative' }}>
                    <a
                      href="#"
                      className="has-sub-menu"
                      onClick={(e) => {
                        e.preventDefault();
                        if (onNavigateToCategory) onNavigateToCategory('dry-fruits', '');
                        else setCurrentView('products');
                      }}
                    >
                      Dry fruits <span className="sub-arrow">›</span>
                    </a>
                    <div className="sub-dropdown-menu">
                      <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigateToCategory) onNavigateToCategory('dry-fruits', 'cashew'); else setCurrentView('products'); }}>Cashew</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigateToCategory) onNavigateToCategory('dry-fruits', 'walnut'); else setCurrentView('products'); }}>Walnut</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigateToCategory) onNavigateToCategory('dry-fruits', 'almond'); else setCurrentView('products'); }}>Almonds</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigateToCategory) onNavigateToCategory('dry-fruits', 'raisin'); else setCurrentView('products'); }}>Raisins</a>
                      <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigateToCategory) onNavigateToCategory('dry-fruits', 'apricot'); else setCurrentView('products'); }}>Dried Apricot</a>
                    </div>
                  </div>

                  <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigateToCategory) onNavigateToCategory('seeds-berries', ''); else setCurrentView('products'); }}>Seeds</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigateToCategory) onNavigateToCategory('fusions', ''); else setCurrentView('products'); }}>Fusions</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigateToCategory) onNavigateToCategory('dehydrated-fruits', ''); else setCurrentView('products'); }}>Dehydrated Fruits</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigateToCategory) onNavigateToCategory('snacking', ''); else setCurrentView('products'); }}>Snacking</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigateToCategory) onNavigateToCategory('spices', ''); else setCurrentView('products'); }}>Spices</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); if (onNavigateToCategory) onNavigateToCategory('chemical-herbs', ''); else setCurrentView('products'); }}>Chemical & Herbs</a>
                </div>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={() => {
                    if (onNavigateToCategory) onNavigateToCategory('gifting', '');
                    else setCurrentView('products');
                  }}
                >
                  Gifting
                </button>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => {
                      const el = document.getElementById('wholesale') || document.querySelector('.partners-enterprise-section') || document.getElementById('footer-contact');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }}
                >
                  Bulk Order
                </button>
              </li>
              <li>
                <button
                  className="nav-link"
                  onClick={() => {
                    setCurrentView('home');
                    setTimeout(() => {
                      const el = document.getElementById('wholesale') || document.querySelector('.partners-enterprise-section') || document.getElementById('footer-contact');
                      el?.scrollIntoView({ behavior: 'smooth' });
                    }, 120);
                  }}
                >
                  Private Labelling
                </button>
              </li>
              <li>
                <button className="nav-link" onClick={() => setCurrentView('contact-us')}>Contact Us</button>
              </li>
            </ul>

            <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '8px', flexShrink: 0 }}>
              {/* 1. Search Icon Button */}
              <button
                className="header-action-pill-btn"
                onClick={handleSearchClick}
                title="Search Catalog"
                style={{ border: isSearchOpen ? '1px solid #15803D' : undefined }}
              >
                <Search size={18} className="header-pill-icon" />
                <span className="header-pill-text">Search</span>
              </button>

              {/* 2. Account / Customer Profile Button */}
              <button
                className="header-action-pill-btn"
                onClick={() => setCurrentView('account')}
                title="My Account"
              >
                <User size={18} className="header-pill-icon" />
                <span className="header-pill-text">Account</span>
              </button>

              {/* 3. Wishlist Button */}
              <button
                className="header-action-pill-btn"
                onClick={() => setCurrentView('wishlist')}
                title="Wishlist"
              >
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart
                    size={18}
                    className="header-pill-icon"
                    color={wishlistCount > 0 ? '#E23744' : 'currentColor'}
                    fill={wishlistCount > 0 ? '#E23744' : 'none'}
                  />
                  {wishlistCount > 0 && <span className="badge-dot badge-red-dot" title={`${wishlistCount} in Wishlist`} />}
                </span>
                <span className="header-pill-text">Wishlist{wishlistCount > 0 ? ` (${wishlistCount})` : ''}</span>
              </button>

              {/* 4. Cart Button */}
              <button
                className="header-action-pill-btn"
                onClick={handleCartClick}
                title="Shopping Cart"
                style={{ border: isCartOpen ? '1px solid #15803D' : undefined }}
              >
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingBag size={18} className="header-pill-icon" />
                  {totalCartCount > 0 && <span className="badge-dot badge-yellow-dot" title={`${totalCartCount} in Cart`} />}
                </span>
                <span className="header-pill-text">Cart{totalCartCount > 0 ? ` (${totalCartCount})` : ''}</span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop Overlay when Search, Cart, or Mobile Menu Drawer is open */}
      {(isSearchOpen || isCartOpen || isMobileMenuOpen) && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.5)',
            zIndex: 2000,
            backdropFilter: 'blur(3px)',
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

      {/* Mobile Slide-in Navigation Drawer */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '320px',
          maxWidth: '85vw',
          height: '100vh',
          background: '#FFFFFF',
          zIndex: 2001,
          boxShadow: '8px 0 30px rgba(0,0,0,0.18)',
          display: 'flex',
          flexDirection: 'column',
          transform: isMobileMenuOpen ? 'translateX(0)' : 'translateX(-100%)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: "'Jost', sans-serif"
        }}
      >
        {/* Mobile Drawer Header */}
        <div style={{ padding: '18px 20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EFEFEF', background: '#FBF9F4' }}>
          <img src="/rtc-logo.png" alt="RTC Foods" style={{ height: '42px', width: 'auto' }} />
          <button
            onClick={() => setIsMobileMenuOpen(false)}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#666', padding: '4px' }}
            aria-label="Close Navigation"
          >
            <X size={22} />
          </button>
        </div>

        {/* Mobile Drawer Body Navigation Links */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '16px 20px' }}>
          <nav style={{ display: 'flex', flexDirection: 'column', gap: '4px' }}>
            <button
              onClick={() => { setCurrentView('home'); setIsMobileMenuOpen(false); }}
              style={{ textAlign: 'left', background: 'none', border: 'none', padding: '12px 10px', fontSize: '1.05rem', fontWeight: currentView === 'home' ? 700 : 500, color: currentView === 'home' ? '#007A3D' : '#222', borderRadius: '8px', cursor: 'pointer' }}
            >
              Home
            </button>

            {/* Products Accordion */}
            <div>
              <div
                onClick={() => setIsMobileCatOpen(!isMobileCatOpen)}
                style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '12px 10px', fontSize: '1.05rem', fontWeight: currentView === 'products' ? 700 : 500, color: currentView === 'products' ? '#007A3D' : '#222', cursor: 'pointer', borderRadius: '8px' }}
              >
                <span onClick={(e) => { e.stopPropagation(); setCurrentView('products'); setIsMobileMenuOpen(false); }}>Products</span>
                <ChevronDown size={18} style={{ transform: isMobileCatOpen ? 'rotate(180deg)' : 'none', transition: 'transform 0.2s ease', color: '#666' }} />
              </div>

              {isMobileCatOpen && (
                <div style={{ paddingLeft: '16px', display: 'flex', flexDirection: 'column', gap: '2px', borderLeft: '2px solid #E5E7EB', marginLeft: '12px', marginTop: '4px' }}>
                  <button onClick={() => { if (onNavigateToCategory) onNavigateToCategory('all', ''); else setCurrentView('products'); setIsMobileMenuOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', padding: '8px 10px', fontSize: '0.92rem', color: '#15803D', fontWeight: 600, cursor: 'pointer' }}>All Product Range</button>
                  <button onClick={() => { if (onNavigateToCategory) onNavigateToCategory('dry-fruits', ''); else setCurrentView('products'); setIsMobileMenuOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', padding: '8px 10px', fontSize: '0.92rem', color: '#444', cursor: 'pointer' }}>Dry Fruits (Cashews, Almonds, Walnuts)</button>
                  <button onClick={() => { if (onNavigateToCategory) onNavigateToCategory('seeds-berries', ''); else setCurrentView('products'); setIsMobileMenuOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', padding: '8px 10px', fontSize: '0.92rem', color: '#444', cursor: 'pointer' }}>Seeds & Berries</button>
                  <button onClick={() => { if (onNavigateToCategory) onNavigateToCategory('fusions', ''); else setCurrentView('products'); setIsMobileMenuOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', padding: '8px 10px', fontSize: '0.92rem', color: '#444', cursor: 'pointer' }}>Fusion Mixes</button>
                  <button onClick={() => { if (onNavigateToCategory) onNavigateToCategory('dehydrated-fruits', ''); else setCurrentView('products'); setIsMobileMenuOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', padding: '8px 10px', fontSize: '0.92rem', color: '#444', cursor: 'pointer' }}>Dehydrated Fruits</button>
                  <button onClick={() => { if (onNavigateToCategory) onNavigateToCategory('spices', ''); else setCurrentView('products'); setIsMobileMenuOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', padding: '8px 10px', fontSize: '0.92rem', color: '#444', cursor: 'pointer' }}>Whole Spices</button>
                  <button onClick={() => { if (onNavigateToCategory) onNavigateToCategory('chemical-herbs', ''); else setCurrentView('products'); setIsMobileMenuOpen(false); }} style={{ textAlign: 'left', background: 'none', border: 'none', padding: '8px 10px', fontSize: '0.92rem', color: '#444', cursor: 'pointer' }}>Chemical & Herbs</button>
                </div>
              )}
            </div>

            <button
              onClick={() => {
                if (onNavigateToCategory) onNavigateToCategory('gifting', '');
                else setCurrentView('products');
                setIsMobileMenuOpen(false);
              }}
              style={{ textAlign: 'left', background: 'none', border: 'none', padding: '12px 10px', fontSize: '1.05rem', fontWeight: 500, color: '#222', borderRadius: '8px', cursor: 'pointer' }}
            >
              Gifting & Hampers
            </button>

            <button
              onClick={() => {
                setCurrentView('home');
                setIsMobileMenuOpen(false);
                setTimeout(() => document.getElementById('wholesale')?.scrollIntoView({ behavior: 'smooth' }), 150);
              }}
              style={{ textAlign: 'left', background: 'none', border: 'none', padding: '12px 10px', fontSize: '1.05rem', fontWeight: 500, color: '#222', borderRadius: '8px', cursor: 'pointer' }}
            >
              Bulk Orders & Wholesale
            </button>

            <button
              onClick={() => {
                setCurrentView('home');
                setIsMobileMenuOpen(false);
                setTimeout(() => document.getElementById('wholesale')?.scrollIntoView({ behavior: 'smooth' }), 150);
              }}
              style={{ textAlign: 'left', background: 'none', border: 'none', padding: '12px 10px', fontSize: '1.05rem', fontWeight: 500, color: '#222', borderRadius: '8px', cursor: 'pointer' }}
            >
              Private Labelling
            </button>

            <button
              onClick={() => {
                setCurrentView('contact-us');
                setIsMobileMenuOpen(false);
              }}
              style={{ textAlign: 'left', background: 'none', border: 'none', padding: '12px 10px', fontSize: '1.05rem', fontWeight: 500, color: '#222', borderRadius: '8px', cursor: 'pointer' }}
            >
              Contact Us
            </button>
          </nav>
        </div>

        {/* Mobile Drawer Footer Actions */}
        <div style={{ padding: '18px 20px', borderTop: '1px solid #EFEFEF', background: '#FAFAFA', display: 'flex', flexDirection: 'column', gap: '10px' }}>
          <button
            onClick={() => { setCurrentView('wishlist'); setIsMobileMenuOpen(false); }}
            style={{ width: '100%', padding: '10px', background: '#FFF', border: '1px solid #DDD', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 600, color: '#333', cursor: 'pointer' }}
          >
            <Heart size={16} color="#E23744" fill={wishlistCount > 0 ? '#E23744' : 'none'} /> Wishlist ({wishlistCount})
          </button>
          <button
            onClick={() => { setCurrentView('admin'); setIsMobileMenuOpen(false); }}
            style={{ width: '100%', padding: '10px', background: '#15803D', border: 'none', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '8px', fontSize: '0.92rem', fontWeight: 600, color: '#FFF', cursor: 'pointer' }}
          >
            <User size={16} /> Admin / My Account
          </button>
        </div>
      </aside>

      {/* Slide-in Right Shopping Bag Drawer 1:1 matching search box style */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '420px',
          maxWidth: '90vw',
          height: '100vh',
          background: '#FFFFFF',
          zIndex: 2001,
          boxShadow: '-8px 0 30px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          transform: isCartOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: "'Jost', sans-serif"
        }}
      >
        {/* Drawer Header */}
        <div style={{ padding: '24px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EFEFEF' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#333333', margin: 0 }}>Shopping Bag ({totalCartCount})</h2>
          <button
            onClick={handleClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#888888', padding: '4px' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Body - Cart Items List */}
        <div style={{ flex: 1, overflowY: 'auto', padding: '24px 30px' }}>
          {Object.keys(activeCartQuantities).length === 0 ? (
            <div style={{ padding: '60px 0', textAlign: 'center', color: '#888888' }}>
              <ShoppingBag size={48} style={{ opacity: 0.3, marginBottom: '16px' }} />
              <p style={{ fontSize: '1.05rem', fontWeight: 400, margin: '0 0 12px 0' }}>Your bag is currently empty.</p>
              <button
                onClick={() => {
                  handleClose();
                  setCurrentView('products');
                }}
                style={{
                  background: '#0B6638',
                  color: '#FFFFFF',
                  border: 'none',
                  borderRadius: '4px',
                  padding: '10px 24px',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  cursor: 'pointer'
                }}
              >
                Browse Collection
              </button>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
              {Object.entries(activeCartQuantities).map(([idStr, qty]) => {
                const prod = products.find(p => p.id === Number(idStr));
                if (!prod) return null;
                return (
                  <div
                    key={prod.id}
                    style={{
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'space-between',
                      gap: '16px',
                      paddingBottom: '16px',
                      borderBottom: '1px solid #F5F5F5'
                    }}
                  >
                    <img
                      src={prod.image}
                      alt={prod.name}
                      onClick={() => {
                        if (onSelectProduct) {
                          onSelectProduct(prod);
                          handleClose();
                        }
                      }}
                      style={{
                        width: '64px',
                        height: '64px',
                        objectFit: 'contain',
                        borderRadius: '4px',
                        background: '#FAFAFA',
                        padding: '4px',
                        border: '1px solid #EEEEEE',
                        cursor: 'pointer'
                      }}
                    />
                    <div
                      style={{ flex: 1, cursor: 'pointer' }}
                      onClick={() => {
                        if (onSelectProduct) {
                          onSelectProduct(prod);
                          handleClose();
                        }
                      }}
                    >
                      <h4 style={{ fontSize: '0.98rem', fontWeight: 400, color: '#222222', margin: '0 0 4px 0', textAlign: 'left' }}>
                        {prod.name}
                      </h4>
                      <span style={{ fontSize: '0.92rem', fontWeight: 400, color: '#666666', display: 'block', textAlign: 'left' }}>
                        ₹{prod.price.toFixed(2)} × {qty}
                      </span>
                      <strong style={{ fontSize: '0.98rem', fontWeight: 500, color: '#000000', display: 'block', textAlign: 'left', marginTop: '2px' }}>
                        ₹{(prod.price * qty).toFixed(2)}
                      </strong>
                    </div>

                    {/* Quantity Box (- QTY +) */}
                    <div
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        background: '#FFFFFF',
                        border: '1.5px solid #000000',
                        borderRadius: '4px',
                        padding: '4px 10px',
                        gap: '12px',
                        minWidth: '90px'
                      }}
                    >
                      <button
                        onClick={() => handleUpdateQuantity(prod.id, qty - 1)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#000000',
                          fontSize: '1rem',
                          fontWeight: 400,
                          cursor: 'pointer',
                          padding: '0 4px',
                          lineHeight: 1
                        }}
                      >
                        -
                      </button>
                      <span style={{ fontSize: '0.9rem', fontWeight: 400, color: '#000000' }}>
                        {qty}
                      </span>
                      <button
                        onClick={() => handleUpdateQuantity(prod.id, qty + 1)}
                        style={{
                          background: 'transparent',
                          border: 'none',
                          color: '#000000',
                          fontSize: '1rem',
                          fontWeight: 400,
                          cursor: 'pointer',
                          padding: '0 4px',
                          lineHeight: 1
                        }}
                      >
                        +
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>

        {/* Drawer Footer with Subtotal & Checkout Button */}
        {Object.keys(activeCartQuantities).length > 0 && (
          <div style={{ padding: '24px 30px', borderTop: '1px solid #EFEFEF', background: '#FAFAFA' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <span style={{ fontSize: '1rem', fontWeight: 400, color: '#444444' }}>Subtotal:</span>
              <span style={{ fontSize: '1.2rem', fontWeight: 600, color: '#0B6638' }}>₹{cartSubtotal.toFixed(2)}</span>
            </div>
            <button
              onClick={() => {
                if (onOpenCheckoutModal) {
                  onOpenCheckoutModal();
                } else {
                  setCurrentView('checkout');
                }
              }}
              style={{
                width: '100%',
                background: '#0B6638',
                color: '#FFFFFF',
                border: 'none',
                borderRadius: '4px',
                padding: '14px 0',
                fontSize: '1rem',
                fontWeight: 500,
                cursor: 'pointer',
                transition: 'background 0.2s ease'
              }}
            >
              Proceed to Checkout
            </button>
          </div>
        )}
      </aside>

      {/* Slide-in Right Search Drawer 1:1 matching user screenshot */}
      <aside
        style={{
          position: 'fixed',
          top: 0,
          right: 0,
          width: '420px',
          maxWidth: '90vw',
          height: '100vh',
          background: '#FFFFFF',
          zIndex: 2001,
          boxShadow: '-8px 0 30px rgba(0,0,0,0.15)',
          display: 'flex',
          flexDirection: 'column',
          transform: isSearchOpen ? 'translateX(0)' : 'translateX(100%)',
          transition: 'transform 0.35s cubic-bezier(0.16, 1, 0.3, 1)',
          fontFamily: "'Jost', sans-serif"
        }}
      >
        {/* Drawer Header */}
        <div style={{ padding: '24px 30px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #EFEFEF' }}>
          <h2 style={{ fontSize: '1.25rem', fontWeight: 600, color: '#333333', margin: 0 }}>Search Products</h2>
          <button
            onClick={handleClose}
            style={{ background: 'transparent', border: 'none', cursor: 'pointer', color: '#888888', padding: '4px' }}
          >
            <X size={22} />
          </button>
        </div>

        {/* Drawer Body Form Controls */}
        <div style={{ padding: '24px 30px 16px 30px' }}>
          {/* Categories Select Box matching exact 2nd screenshot dropdown */}
          <div style={{ position: 'relative', marginBottom: '16px' }}>
            <select
              value={selectedCategory}
              onChange={(e) => setSelectedCategory(e.target.value)}
              style={{
                width: '100%',
                padding: '12px 36px 12px 16px',
                borderRadius: '4px',
                border: '1px solid #DDDDDD',
                fontSize: '0.95rem',
                fontWeight: 400,
                color: '#444444',
                background: '#FFFFFF',
                outline: 'none',
                appearance: 'none',
                cursor: 'pointer',
                fontFamily: 'inherit'
              }}
            >
              {categoryOptions.map((cat, idx) => (
                <option key={idx} value={cat.value} style={{ paddingLeft: `${cat.indent * 12}px`, fontWeight: 400 }}>
                  {cat.indent > 0 ? `\u00A0\u00A0\u00A0\u00A0${cat.label}` : cat.label}
                </option>
              ))}
            </select>
            <ChevronDown size={18} style={{ position: 'absolute', right: '14px', top: '50%', transform: 'translateY(-50%)', pointerEvents: 'none', color: '#666666' }} />
          </div>

          {/* Search Input Box matching 3rd screenshot */}
          <div style={{ position: 'relative' }}>
            <input
              type="text"
              placeholder="Search for items"
              value={activeQuery}
              onChange={(e) => handleQueryChange(e.target.value)}
              autoFocus={isSearchOpen}
              style={{
                width: '100%',
                padding: '12px 40px 12px 16px',
                borderRadius: '2px',
                border: '1px solid #E0E0E0',
                background: '#FFFFFF',
                fontSize: '0.95rem',
                fontWeight: 400,
                color: '#333333',
                outline: 'none',
                fontFamily: 'inherit'
              }}
            />
            {activeQuery ? (
              <button
                onClick={() => handleQueryChange('')}
                style={{
                  position: 'absolute',
                  right: '12px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  color: '#888888'
                }}
              >
                <X size={16} />
              </button>
            ) : (
              <Search
                size={18}
                style={{
                  position: 'absolute',
                  right: '14px',
                  top: '50%',
                  transform: 'translateY(-50%)',
                  pointerEvents: 'none',
                  color: '#777777'
                }}
              />
            )}
          </div>
        </div>

        {/* Results List Section - Render when a query is entered OR a category filter is selected */}
        {(activeQuery.trim() !== '' || selectedCategory !== 'all') && (
          <div style={{ flex: 1, overflowY: 'auto', padding: '0 30px 24px 30px' }}>
            <p style={{ fontSize: '0.9rem', fontWeight: 500, color: '#555555', marginBottom: '16px', marginTop: '8px', textAlign: 'left' }}>
              Search Results:
            </p>

            {drawerResults.length === 0 ? (
              <div style={{ padding: '30px 0', textAlign: 'left', color: '#999999', fontSize: '0.95rem' }}>
                No products found matching "{activeQuery}"
              </div>
            ) : (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
                {drawerResults.map((p) => {
                  const qty = activeCartQuantities[p.id] || 0;
                  return (
                    <div
                      key={p.id}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'space-between',
                        gap: '12px',
                        paddingBottom: '16px',
                        borderBottom: '1px solid #F5F5F5'
                      }}
                    >
                      <div
                        onClick={() => {
                          if (onSelectProduct) {
                            onSelectProduct(p);
                          } else {
                            setCurrentView('detail');
                          }
                          handleClose();
                        }}
                        style={{ display: 'flex', alignItems: 'center', gap: '16px', cursor: 'pointer', flex: 1 }}
                      >
                        <img
                          src={p.image}
                          alt={p.name}
                          style={{
                            width: '64px',
                            height: '64px',
                            objectFit: 'contain',
                            borderRadius: '4px',
                            background: '#FAFAFA',
                            padding: '4px',
                            border: '1px solid #EEEEEE'
                          }}
                        />
                        <div>
                          <h4 style={{ fontSize: '0.98rem', fontWeight: 400, color: '#222222', margin: '0 0 4px 0', textAlign: 'left' }}>
                            {p.name}
                          </h4>
                          <span style={{ fontSize: '0.95rem', fontWeight: 400, color: '#555555', display: 'block', textAlign: 'left' }}>
                            ₹{p.price.toFixed(2)}
                          </span>
                        </div>
                      </div>

                      {/* Add to Bag / Quantity Counter Box */}
                      <div>
                        {qty === 0 ? (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleUpdateQuantity(p.id, 1);
                            }}
                            style={{
                              background: '#0B6638',
                              color: '#FFFFFF',
                              border: 'none',
                              borderRadius: '4px',
                              padding: '8px 16px',
                              fontSize: '0.85rem',
                              fontWeight: 400,
                              cursor: 'pointer',
                              whiteSpace: 'nowrap',
                              transition: 'all 0.2s ease'
                            }}
                          >
                            Add to bag
                          </button>
                        ) : (
                          <div
                            onClick={(e) => e.stopPropagation()}
                            style={{
                              display: 'inline-flex',
                              alignItems: 'center',
                              justifyContent: 'space-between',
                              background: '#FFFFFF',
                              border: '1.5px solid #000000',
                              borderRadius: '4px',
                              padding: '4px 10px',
                              gap: '12px',
                              minWidth: '95px'
                            }}
                          >
                            <button
                              onClick={() => handleUpdateQuantity(p.id, qty - 1)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#000000',
                                fontSize: '1rem',
                                fontWeight: 400,
                                cursor: 'pointer',
                                padding: '0 4px',
                                lineHeight: 1
                              }}
                            >
                              -
                            </button>
                            <span style={{ fontSize: '0.9rem', fontWeight: 400, color: '#000000' }}>
                              {qty}
                            </span>
                            <button
                              onClick={() => handleUpdateQuantity(p.id, qty + 1)}
                              style={{
                                background: 'transparent',
                                border: 'none',
                                color: '#000000',
                                fontSize: '1rem',
                                fontWeight: 400,
                                cursor: 'pointer',
                                padding: '0 4px',
                                lineHeight: 1
                              }}
                            >
                              +
                            </button>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        )}
      </aside>
    </>
  );
};

