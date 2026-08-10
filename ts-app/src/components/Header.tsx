import React, { useState } from 'react';
import { ShoppingBag, Search, Heart, User, Truck, X, ChevronDown } from 'lucide-react';
import { products } from '../data/productsData';
import type { Product } from '../types/product';

interface HeaderProps {
  currentView: string;
  setCurrentView: (view: string) => void;
  cartCount?: number;
  wishlistCount?: number;
  cartQuantities?: { [id: number]: number };
  onUpdateCartQty?: (productId: number, newQty: number) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  onSelectProduct?: (product: Product) => void;
  isCartOpen?: boolean;
  setIsCartOpen?: (open: boolean) => void;
  onOpenCheckoutModal?: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentView,
  setCurrentView,
  wishlistCount = 0,
  cartQuantities: externalCartQuantities,
  onUpdateCartQty,
  searchQuery = '',
  setSearchQuery,
  onSelectProduct,
  isCartOpen: externalIsCartOpen,
  setIsCartOpen: externalSetIsCartOpen,
  onOpenCheckoutModal
}) => {
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

  const handleClose = () => {
    setIsSearchOpen(false);
    setIsCartOpen(false);
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
      {/* Top Announcement Bar */}
      <div className="top-bar">
        <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div className="top-bar-info" style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
            <span><Truck size={14} style={{ display: 'inline', marginRight: '6px' }} /> Free shipping over ₹500</span>
          </div>
          <div className="top-bar-info" style={{ fontSize: '1.1rem', fontWeight: 'bold' }}>
            <span>20 % off on all products | Buy Now</span>
          </div>
          <div className="top-bar-info" style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <a href="https://facebook.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>Facebook</a>
            <a href="https://twitter.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>Twitter</a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>Instagram</a>
            <a href="https://pinterest.com" target="_blank" rel="noreferrer" style={{ color: 'inherit' }}>Pinterest</a>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="main-header">
        <div style={{ width: '100%', padding: '0 24px' }}>
          <div className="navbar" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', height: '84px', width: '100%' }}>
            <div className="brand-logo" onClick={() => setCurrentView('home')} style={{ cursor: 'pointer', flexShrink: 0 }}>
              <img src="/rtc-logo.png" alt="RTC Foods" style={{ height: '58px', width: 'auto', objectFit: 'contain' }} />
            </div>

            {/* Desktop Navigation Menu matching exact Wordpress Razzi colors & dropdown */}
            <ul className="nav-menu" style={{ margin: '0 auto' }}>
              <li>
                <button className={`nav-link ${currentView === 'home' ? 'active' : ''}`} onClick={() => setCurrentView('home')}>Home</button>
              </li>
              <li className="dropdown-parent" style={{ position: 'relative' }}>
                <button className={`nav-link ${currentView === 'products' ? 'active' : ''}`} onClick={() => setCurrentView('products')}>
                  Products
                </button>
                <div className="dropdown-menu">
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>All Product Range</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>Dry fruits</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>Seeds</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>Fusions</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>Dehydrated Fruits</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>Snacking</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>Spices</a>
                  <a href="#" onClick={(e) => { e.preventDefault(); setCurrentView('products'); }}>Chemical & Herbs</a>
                </div>
              </li>
              <li>
                <button className="nav-link" onClick={() => setCurrentView('products')}>Gifting</button>
              </li>
              <li>
                <button className="nav-link" onClick={() => { setCurrentView('home'); setTimeout(() => document.getElementById('wholesale')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Bulk Order</button>
              </li>
              <li>
                <button className="nav-link" onClick={() => { setCurrentView('home'); setTimeout(() => document.getElementById('wholesale')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Private Labelling</button>
              </li>
              <li>
                <button className="nav-link" onClick={() => { setCurrentView('home'); setTimeout(() => document.getElementById('footer-contact')?.scrollIntoView({ behavior: 'smooth' }), 100); }}>Contact Us</button>
              </li>
            </ul>

            <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '18px', flexShrink: 0 }}>
              <button className="icon-btn" onClick={handleSearchClick} title="Search Catalog" style={{ border: isSearchOpen ? '2px solid var(--primary-gold)' : 'none', padding: '6px', borderRadius: '50%' }}>
                <Search size={20} />
              </button>
              <button className="icon-btn" title="My Account">
                <User size={20} />
              </button>
              <button className="icon-btn" onClick={() => setCurrentView('wishlist')} title="Wishlist">
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <Heart size={20} color={wishlistCount > 0 ? '#E23744' : 'currentColor'} fill={wishlistCount > 0 ? '#E23744' : 'none'} />
                  {wishlistCount > 0 && <span className="badge-dot badge-red-dot" title={`${wishlistCount} in Wishlist`} />}
                </span>
              </button>
              <button className="icon-btn" onClick={handleCartClick} title="Shopping Cart" style={{ border: isCartOpen ? '2px solid var(--primary-gold)' : 'none', padding: '6px', borderRadius: '50%' }}>
                <span style={{ position: 'relative', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                  <ShoppingBag size={20} />
                  {totalCartCount > 0 && <span className="badge-dot badge-yellow-dot" title={`${totalCartCount} in Cart`} />}
                </span>
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Backdrop Overlay when Search or Cart Drawer is open */}
      {(isSearchOpen || isCartOpen) && (
        <div
          onClick={handleClose}
          style={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            background: 'rgba(0,0,0,0.4)',
            zIndex: 2000,
            backdropFilter: 'blur(2px)',
            transition: 'opacity 0.3s ease'
          }}
        />
      )}

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

