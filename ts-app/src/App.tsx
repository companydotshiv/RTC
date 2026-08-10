import { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CheckoutModal } from './components/CheckoutModal';
import { products } from './data/productsData';
import type { Product } from './types/product';
import './App.css';

import { Check, X } from 'lucide-react';

// Helper to derive view state from window.location.pathname
const parseLocation = (): { view: string; product: Product | null } => {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  if (!path || path === '') {
    return { view: 'home', product: null };
  }
  if (path === '/products' || path === '/shop') {
    return { view: 'products', product: null };
  }
  if (path === '/wishlist') {
    return { view: 'wishlist', product: null };
  }
  if (path === '/checkout') {
    return { view: 'checkout', product: null };
  }
  if (path.startsWith('/product/')) {
    const slug = path.replace('/product/', '');
    const found = products.find((p) => p.slug.toLowerCase() === slug || p.id.toString() === slug);
    if (found) {
      return { view: 'detail', product: found };
    }
  }
  return { view: 'home', product: null };
};

export function App() {
  const initial = parseLocation();
  const [currentView, setCurrentViewInternal] = useState<string>(initial.view);
  const [selectedProduct, setSelectedProductInternal] = useState<Product | null>(initial.product);
  const [cartQuantities, setCartQuantities] = useState<{ [id: number]: number }>({});
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);

  // Synchronize view state with browser URL & history
  const setCurrentView = (view: string, pushHistory = true) => {
    setCurrentViewInternal(view);
    if (pushHistory) {
      let path = '/';
      if (view === 'products') path = '/products';
      else if (view === 'wishlist') path = '/wishlist';
      else if (view === 'checkout') path = '/checkout';
      else if (view === 'detail' && selectedProduct) path = `/product/${selectedProduct.slug}`;

      if (window.location.pathname !== path) {
        window.history.pushState({ view, productSlug: selectedProduct?.slug }, '', path);
      }
    }
  };

  const handleSelectProduct = (product: Product, pushHistory = true) => {
    setSelectedProductInternal(product);
    setCurrentViewInternal('detail');
    if (pushHistory) {
      const path = `/product/${product.slug}`;
      if (window.location.pathname !== path) {
        window.history.pushState({ view: 'detail', productSlug: product.slug }, '', path);
      }
    }
  };

  // Handle browser Back / Forward navigation buttons (popstate event)
  useEffect(() => {
    const handlePopState = () => {
      const parsed = parseLocation();
      setCurrentViewInternal(parsed.view);
      setSelectedProductInternal(parsed.product);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'cart' | 'wishlist'>('cart');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastHiding, setToastHiding] = useState<boolean>(false);

  const triggerToast = (msg: string, type: 'cart' | 'wishlist' = 'cart') => {
    setToastMessage(msg);
    setToastType(type);
    setShowToast(true);
    setToastHiding(false);

    // After 3 seconds, start moving up and away animation
    setTimeout(() => {
      setToastHiding(true);
      // Remove from DOM after slide away animation finishes
      setTimeout(() => {
        setShowToast(false);
        setToastHiding(false);
      }, 400);
    }, 3000);
  };

  const handleAddToCart = (productId: number = 1, qty: number = 1) => {
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + qty,
    }));
    triggerToast('Item added to your cart', 'cart');
  };

  const handleToggleWishlist = (productId: number) => {
    const isAdding = !wishlistIds.includes(productId);
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
    if (isAdding) {
      triggerToast('Item added to your wishlist', 'wishlist');
    }
  };

  const handleClearCart = () => {
    setCartQuantities({});
  };

  return (
    <div className="app-root">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartCount={0}
        wishlistCount={wishlistIds.length}
        cartQuantities={cartQuantities}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
        onOpenCheckoutModal={() => {
          setIsCheckoutModalOpen(true);
        }}
        onUpdateCartQty={(id, qty) => {
          setCartQuantities((prev) => {
            const updated = { ...prev };
            if (qty <= 0) {
              delete updated[id];
            } else {
              updated[id] = qty;
            }
            return updated;
          });
        }}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        onSelectProduct={handleSelectProduct}
      />

      <main>
        {currentView === 'home' && (
          <HomePage
            onSelectProduct={handleSelectProduct}
            setCurrentView={setCurrentView}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            cartQuantities={cartQuantities}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={(productId, newQty) => {
              setCartQuantities((prev) => {
                const updated = { ...prev };
                if (newQty <= 0) {
                  delete updated[productId];
                } else {
                  updated[productId] = newQty;
                }
                return updated;
              });
            }}
          />
        )}
        {currentView === 'products' && (
          <ProductsPage
            onSelectProduct={handleSelectProduct}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            cartQuantities={cartQuantities}
            onAddToCart={handleAddToCart}
            onUpdateCartQty={(productId, newQty) => {
              setCartQuantities((prev) => {
                const updated = { ...prev };
                if (newQty <= 0) {
                  delete updated[productId];
                } else {
                  updated[productId] = newQty;
                }
                return updated;
              });
            }}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}
        {currentView === 'detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            setCurrentView={setCurrentView}
            onAddToCart={(qty) => handleAddToCart(selectedProduct.id, qty)}
            cartQty={cartQuantities[selectedProduct.id] || 0}
            onUpdateCartQty={(newQty) => {
              setCartQuantities((prev) => {
                const updated = { ...prev };
                if (newQty <= 0) {
                  delete updated[selectedProduct.id];
                } else {
                  updated[selectedProduct.id] = newQty;
                }
                return updated;
              });
            }}
            onToggleWishlist={() => handleToggleWishlist(selectedProduct.id)}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
          />
        )}
        {currentView === 'wishlist' && (
          <WishlistPage
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            setCurrentView={setCurrentView}
            cartQuantities={cartQuantities}
            onUpdateCartQty={(productId, newQty) => {
              setCartQuantities((prev) => {
                const updated = { ...prev };
                if (newQty <= 0) {
                  delete updated[productId];
                } else {
                  updated[productId] = newQty;
                }
                return updated;
              });
            }}
          />
        )}
        {currentView === 'checkout' && (
          <CheckoutPage
            cartQuantities={cartQuantities}
            setCurrentView={setCurrentView}
            onClearCart={handleClearCart}
          />
        )}
      </main>

      <Footer setCurrentView={setCurrentView} />

      {/* Floating Toast Notification matching Aqualogica style */}
      {showToast && (
        <div
          className={`toast-notification ${toastType === 'wishlist' ? 'toast-wishlist' : ''} ${toastHiding ? 'hide' : ''}`}
          onClick={() => {
            if (toastType === 'wishlist') {
              setCurrentView('wishlist');
            } else {
              setIsCartOpen(true);
            }
            setShowToast(false);
          }}
          style={{ cursor: 'pointer' }}
          title={toastType === 'wishlist' ? 'Click to view wishlist' : 'Click to view cart'}
        >
          <Check size={18} color="#FFFFFF" strokeWidth={3} />
          <span>{toastMessage}</span>
          <button
            onClick={(e) => {
              e.stopPropagation();
              setShowToast(false);
            }}
            style={{ background: 'none', border: 'none', color: '#FFFFFF', cursor: 'pointer', padding: 0, marginLeft: '12px', display: 'flex', alignItems: 'center' }}
          >
            <X size={16} />
          </button>

          {/* Thin Yellow Timeline Progress Line */}
          <div className="toast-timeline" />
        </div>
      )}

      {/* Aqualogica Style Floating Checkout Popover Modal */}
      <CheckoutModal
        isOpen={isCheckoutModalOpen}
        onClose={() => setIsCheckoutModalOpen(false)}
        cartQuantities={cartQuantities}
        setCurrentView={setCurrentView}
        onClearCart={handleClearCart}
        onSelectProduct={handleSelectProduct}
      />
    </div>
  );
}

export default App;
