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

import { LegalPolicyPage, type PolicyType } from './pages/LegalPolicyPage';
import { AboutUsPage } from './pages/AboutUsPage';
import { CertificatesPage } from './pages/CertificatesPage';
import { FaqsPage } from './pages/FaqsPage';
import { BlogPage } from './pages/BlogPage';
import { BlogPostPage } from './pages/BlogPostPage';
import { ContactUsPage } from './pages/ContactUsPage';
import { AdminPage } from './pages/AdminPage';
import { AccountPage } from './pages/AccountPage';

// Helper to derive view state from window.location.pathname
const parseLocation = (): { view: string; product: Product | null; blogSlug: string } => {
  const path = window.location.pathname.toLowerCase().replace(/\/$/, '');
  if (!path || path === '') {
    return { view: 'home', product: null, blogSlug: '' };
  }
  if (path === '/admin') {
    return { view: 'admin', product: null, blogSlug: '' };
  }
  if (path === '/account' || path === '/my-account') {
    return { view: 'account', product: null, blogSlug: '' };
  }
  if (path === '/products' || path === '/shop') {
    return { view: 'products', product: null, blogSlug: '' };
  }
  if (path === '/wishlist') {
    return { view: 'wishlist', product: null, blogSlug: '' };
  }
  if (path === '/checkout') {
    return { view: 'checkout', product: null, blogSlug: '' };
  }
  if (path === '/shipping-policy') {
    return { view: 'shipping-policy', product: null, blogSlug: '' };
  }
  if (path === '/privacy-policy') {
    return { view: 'privacy-policy', product: null, blogSlug: '' };
  }
  if (path === '/returns-policy' || path === '/returns-cancellation') {
    return { view: 'returns-policy', product: null, blogSlug: '' };
  }
  if (path === '/terms-conditions' || path === '/terms-and-conditions') {
    return { view: 'terms-conditions', product: null, blogSlug: '' };
  }
  if (path === '/about-us' || path === '/about') {
    return { view: 'about-us', product: null, blogSlug: '' };
  }
  if (path === '/certificate' || path === '/certificates') {
    return { view: 'certificates', product: null, blogSlug: '' };
  }
  if (path === '/faqs' || path === '/faq') {
    return { view: 'faqs', product: null, blogSlug: '' };
  }
  if (path === '/blog' || path === '/blogs') {
    return { view: 'blog', product: null, blogSlug: '' };
  }
  if (path.startsWith('/blog/')) {
    const slug = path.replace('/blog/', '');
    return { view: 'blog-post', product: null, blogSlug: slug };
  }
  if (path === '/contact-us' || path === '/contact') {
    return { view: 'contact-us', product: null, blogSlug: '' };
  }
  if (path.startsWith('/product/')) {
    const slug = path.replace('/product/', '');
    const found = products.find((p) => p.slug.toLowerCase() === slug || p.id.toString() === slug);
    if (found) {
      return { view: 'detail', product: found, blogSlug: '' };
    }
  }
  return { view: 'home', product: null, blogSlug: '' };
};

export default function App() {
  const initial = parseLocation();
  const [currentView, setCurrentViewInternal] = useState<string>(initial.view);
  const [selectedProduct, setSelectedProductInternal] = useState<Product | null>(initial.product);
  const [selectedBlogSlug, setSelectedBlogSlug] = useState<string>(initial.blogSlug);
  const [selectedCategoryFilter, setSelectedCategoryFilter] = useState<string>('all');
  const [selectedSubCategoryFilter, setSelectedSubCategoryFilter] = useState<string>('');
  const [cartQuantities, setCartQuantities] = useState<{ [id: number]: number }>({});
  const [wishlistIds, setWishlistIds] = useState<number[]>([]);
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isCheckoutModalOpen, setIsCheckoutModalOpen] = useState<boolean>(false);

  const handleNavigateToCategory = (category: string, subCategory = '') => {
    setSelectedCategoryFilter(category);
    setSelectedSubCategoryFilter(subCategory);
    if (category === 'all' && !subCategory) {
      setSearchQuery('');
    }
    setCurrentView('products');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Synchronize view state with browser URL & history
  const setCurrentView = (view: string, pushHistory = true) => {
    if (view.startsWith('blog-') && view !== 'blog-post' && view !== 'blog') {
      const slug = view.replace('blog-', '');
      setSelectedBlogSlug(slug);
      setCurrentViewInternal('blog-post');
      if (pushHistory) {
        window.history.pushState({ view: 'blog-post', blogSlug: slug }, '', `/blog/${slug}`);
      }
      return;
    }

    setCurrentViewInternal(view);
    if (pushHistory) {
      let path = '/';
      if (view === 'products') path = '/products';
      else if (view === 'wishlist') path = '/wishlist';
      else if (view === 'checkout') path = '/checkout';
      else if (view === 'account') path = '/account';
      else if (view === 'admin') path = '/admin';
      else if (view === 'shipping-policy') path = '/shipping-policy';
      else if (view === 'privacy-policy') path = '/privacy-policy';
      else if (view === 'returns-policy') path = '/returns-policy';
      else if (view === 'terms-conditions') path = '/terms-conditions';
      else if (view === 'about-us') path = '/about-us';
      else if (view === 'certificates') path = '/certificates';
      else if (view === 'faqs') path = '/faqs';
      else if (view === 'blog') path = '/blog';
      else if (view === 'blog-post' && selectedBlogSlug) path = `/blog/${selectedBlogSlug}`;
      else if (view === 'contact-us') path = '/contact-us';
      else if (view === 'detail' && selectedProduct) path = `/product/${selectedProduct.slug}`;

      if (window.location.pathname !== path) {
        window.history.pushState({ view, productSlug: selectedProduct?.slug, blogSlug: selectedBlogSlug }, '', path);
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

  const handleSelectBlogPost = (slug: string) => {
    setSelectedBlogSlug(slug);
    setCurrentViewInternal('blog-post');
    window.history.pushState({ view: 'blog-post', blogSlug: slug }, '', `/blog/${slug}`);
  };

  // Handle browser Back & Forward navigation buttons
  useEffect(() => {
    const handlePopState = (event: PopStateEvent) => {
      if (event.state && event.state.view) {
        setCurrentViewInternal(event.state.view);
        if (event.state.productSlug) {
          const found = products.find((p) => p.slug === event.state.productSlug);
          if (found) setSelectedProductInternal(found);
        }
        if (event.state.blogSlug) {
          setSelectedBlogSlug(event.state.blogSlug);
        }
      } else {
        const currentLoc = parseLocation();
        setCurrentViewInternal(currentLoc.view);
        setSelectedProductInternal(currentLoc.product);
        setSelectedBlogSlug(currentLoc.blogSlug);
      }
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Toast Notification State
  const [toastMessage, setToastMessage] = useState<string>('');
  const [toastType, setToastType] = useState<'cart' | 'wishlist'>('cart');
  const [showToast, setShowToast] = useState<boolean>(false);
  const [toastHiding, setToastHiding] = useState<boolean>(false);

  const triggerToast = (message: string, type: 'cart' | 'wishlist') => {
    setToastMessage(message);
    setToastType(type);
    setToastHiding(false);
    setShowToast(true);

    setTimeout(() => {
      setToastHiding(true);
      setTimeout(() => {
        setShowToast(false);
        setToastHiding(false);
      }, 500);
    }, 4500);
  };

  const handleAddToCart = (productId: number, qtyToAdd = 1) => {
    setCartQuantities((prev) => {
      const currentQty = prev[productId] || 0;
      return { ...prev, [productId]: currentQty + qtyToAdd };
    });

    const product = products.find((p) => p.id === productId);
    const prodName = product ? product.name : 'Item';
    triggerToast(`"${prodName}" has been added to your cart.`, 'cart');
  };

  const handleToggleWishlist = (productId: number) => {
    const isCurrentlyIn = wishlistIds.includes(productId);
    const product = products.find((p) => p.id === productId);
    const prodName = product ? product.name : 'Item';

    if (isCurrentlyIn) {
      setWishlistIds((prev) => prev.filter((id) => id !== productId));
      triggerToast(`"${prodName}" removed from wishlist.`, 'wishlist');
    } else {
      setWishlistIds((prev) => [...prev, productId]);
      triggerToast(`"${prodName}" added to your wishlist.`, 'wishlist');
    }
  };

  const handleClearCart = () => {
    setCartQuantities({});
  };

  if (currentView === 'admin') {
    return <AdminPage setCurrentView={setCurrentView} />;
  }

  return (
    <div className="app-container">
      <Header
        currentView={currentView}
        setCurrentView={setCurrentView}
        cartQuantities={cartQuantities}
        wishlistCount={wishlistIds.length}
        searchQuery={searchQuery}
        setSearchQuery={setSearchQuery}
        isCartOpen={isCartOpen}
        setIsCartOpen={setIsCartOpen}
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
        onRemoveCartItem={(productId) => {
          setCartQuantities((prev) => {
            const updated = { ...prev };
            delete updated[productId];
            return updated;
          });
        }}
        onOpenCheckoutModal={() => {
          setIsCheckoutModalOpen(true);
        }}
        onNavigateToCategory={handleNavigateToCategory}
      />

      <main className="main-content">
        {currentView === 'home' && (
          <HomePage
            setCurrentView={setCurrentView}
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
          />
        )}
        {currentView === 'products' && (
          <ProductsPage
            onAddToCart={handleAddToCart}
            onSelectProduct={handleSelectProduct}
            onToggleWishlist={handleToggleWishlist}
            wishlistIds={wishlistIds}
            searchQuery={searchQuery}
            setSearchQuery={setSearchQuery}
            setCurrentView={setCurrentView}
            initialCategory={selectedCategoryFilter}
            initialSubCategory={selectedSubCategoryFilter}
          />
        )}
        {currentView === 'detail' && selectedProduct && (
          <ProductDetailPage
            product={selectedProduct}
            onAddToCart={handleAddToCart}
            onToggleWishlist={handleToggleWishlist}
            isWishlisted={wishlistIds.includes(selectedProduct.id)}
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
        {['shipping-policy', 'privacy-policy', 'returns-policy', 'terms-conditions'].includes(currentView) && (
          <LegalPolicyPage
            initialPolicy={currentView as PolicyType}
            setCurrentView={setCurrentView}
          />
        )}
        {currentView === 'about-us' && (
          <AboutUsPage setCurrentView={setCurrentView} />
        )}
        {currentView === 'certificates' && (
          <CertificatesPage setCurrentView={setCurrentView} />
        )}
        {currentView === 'faqs' && (
          <FaqsPage setCurrentView={setCurrentView} />
        )}
        {currentView === 'blog' && (
          <BlogPage setCurrentView={setCurrentView} onSelectPost={handleSelectBlogPost} />
        )}
        {currentView === 'blog-post' && (
          <BlogPostPage
            slug={selectedBlogSlug}
            setCurrentView={setCurrentView}
            onAddToCart={handleAddToCart}
          />
        )}
        {currentView === 'account' && (
          <AccountPage
            setCurrentView={setCurrentView}
            cartQuantities={cartQuantities}
            wishlistIds={wishlistIds}
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
            onSelectProduct={handleSelectProduct}
          />
        )}
        {currentView === 'contact-us' && (
          <ContactUsPage setCurrentView={setCurrentView} />
        )}
      </main>

      <Footer setCurrentView={setCurrentView} />

      {/* Floating Toast Notification */}
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

      {/* Floating Checkout Popover Modal */}
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
