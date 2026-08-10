import { useState } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { HomePage } from './pages/HomePage';
import { ProductsPage } from './pages/ProductsPage';
import { ProductDetailPage } from './pages/ProductDetailPage';
import type { Product } from './types/product';
import './App.css';

export function App() {
  const [currentView, setCurrentView] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [cartCount, setCartCount] = useState<number>(0);
  const [searchQuery, setSearchQuery] = useState<string>('');

  const handleSelectProduct = (product: Product) => {
    setSelectedProduct(product);
    setCurrentView('detail');
  };

  const handleAddToCart = () => {
    setCartCount(cartCount + 1);
    alert('Product added to bag!');
  };

  return (
    <div className="app-root">
      <Header currentView={currentView} setCurrentView={setCurrentView} cartCount={cartCount} searchQuery={searchQuery} setSearchQuery={setSearchQuery} onSelectProduct={handleSelectProduct} />

      <main>
        {currentView === 'home' && (
          <HomePage onSelectProduct={handleSelectProduct} setCurrentView={setCurrentView} />
        )}
        {currentView === 'products' && (
          <ProductsPage onSelectProduct={handleSelectProduct} searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
        )}
        {currentView === 'detail' && selectedProduct && (
          <ProductDetailPage product={selectedProduct} setCurrentView={setCurrentView} onAddToCart={handleAddToCart} />
        )}
      </main>

      <Footer setCurrentView={setCurrentView} />
    </div>
  );
}

export default App;
