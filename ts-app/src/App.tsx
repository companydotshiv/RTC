import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import { WishlistPage } from './pages/WishlistPage';
import { CheckoutPage } from './pages/CheckoutPage';
import { CheckoutModal } from './components/CheckoutModal';
import type { Product } from './types/product';
import './App.css';

import { Check, X } from 'lucide-react';

export function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartQuantities, setCartQuantities] = useState<{ [id: number]: number }>({ 1: 1, 6: 2 }); // Initial demo items
  const [wishlistIds, setWishlistIds] = useState<number[]>([1, 6, 7]); // Initial demo wishlist
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string>('');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastHiding, setToastHiding] = useState<boolean>(false);

  const triggerToast = (msg: string) => {
    setToastMessage(msg);
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

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  const handleAddToCart = (productId: number = 1, qty: number = 1) => {
    setCartQuantities((prev) => ({
      ...prev,
      [productId]: (prev[productId] || 0) + qty,
    }));
    triggerToast('Item added to your cart');
  };

  const handleToggleWishlist = (productId: number) => {
    setWishlistIds((prev) =>
      prev.includes(productId) ? prev.filter((id) => id !== productId) : [...prev, productId]
    );
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
          <HomePage onSelectProduct={handleSelectProduct} setCurrentView={setCurrentView} />
        )}
        {currentView === 'products' && (
          <ProductsPage onSelectProduct={handleSelectProduct} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
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
          />
        )}
        {currentView === 'wishlist' && (
          <WishlistPage
            wishlistIds={wishlistIds}
            onToggleWishlist={handleToggleWishlist}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            setCurrentView={setCurrentView}
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
          className={`toast-notification ${toastHiding ? 'hide' : ''}`}
          onClick={() => {
            setIsCartOpen(true);
            setShowToast(false);
          }}
          style={{ cursor: 'pointer' }}
          title="Click to view cart"
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
      />
    </div>
  );
}

export default App;
