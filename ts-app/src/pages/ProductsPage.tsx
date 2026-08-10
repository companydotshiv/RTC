import React, { useState } from 'react';
import { products } from '../data/productsData';
import type { Product } from '../types/product';
import { Star } from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({ onSelectProduct, searchQuery: propSearchQuery, setSearchQuery: propSetSearchQuery }) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [localSearchQuery, setLocalSearchQuery] = useState<string>('');

  const activeSearchQuery = propSearchQuery !== undefined ? propSearchQuery : localSearchQuery;
  const updateSearchQuery = (val: string) => {
    if (propSetSearchQuery) {
      propSetSearchQuery(val);
    } else {
      setLocalSearchQuery(val);
    }
  };

  const filteredProducts = products.filter((p) => {
    const matchesCategory = selectedCategory === 'all' || p.category === selectedCategory;
    const matchesSearch = p.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) || p.shortDesc.toLowerCase().includes(activeSearchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  return (
    <div>
      <section style={{ background: 'var(--bg-dark)', color: '#FFF', padding: '60px 0', borderBottom: '2px solid var(--primary-gold)' }}>
        <div className="container" style={{ textAlign: 'center' }}>
          <h1 style={{ fontSize: '2.8rem', color: '#FFF', marginBottom: '12px' }}>Our Complete Product Range</h1>
          <p style={{ color: 'rgba(255,255,255,0.75)', maxWidth: '600px', margin: '0 auto' }}>
            Explore our 100% natural, triple-sorted dry fruits, gourmet nuts, authentic Kashmiri saffron, and culinary seeds.
          </p>
        </div>
      </section>

      <section className="section" style={{ padding: '40px 0 20px 0' }}>
        <div className="container">
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px', borderBottom: '1px solid rgba(0,0,0,0.08)', paddingBottom: '20px' }}>
            <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
              <button className={`btn ${selectedCategory === 'all' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setSelectedCategory('all')} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>All Categories</button>
              <button className={`btn ${selectedCategory === 'dry-fruits' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setSelectedCategory('dry-fruits')} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Dry Fruits & Nuts</button>
              <button className={`btn ${selectedCategory === 'seeds-berries' ? 'btn-primary' : 'btn-outline'}`} onClick={() => setSelectedCategory('seeds-berries')} style={{ padding: '8px 20px', fontSize: '0.9rem' }}>Seeds & Berries</button>
            </div>

            <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search catalog..."
                value={activeSearchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
                style={{ padding: '8px 16px', borderRadius: '6px', border: '1px solid rgba(0,0,0,0.2)', fontSize: '0.9rem' }}
              />
              <span style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>
                Showing <strong>{filteredProducts.length}</strong> items
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '20px' }}>
        <div className="container">
          <div className="products-grid">
            {filteredProducts.map((p) => (
              <div key={p.id} className="product-card">
                <div className="card-img-wrapper">
                  <span className="product-badge">{p.badge}</span>
                  <img src={p.image} alt={p.name} className="card-img" />
                </div>
                <div className="card-body">
                  <span className="card-category">{p.categoryName}</span>
                  <h3 className="card-title" onClick={() => onSelectProduct(p)} style={{ cursor: 'pointer' }}>
                    {p.name}
                  </h3>
                  <div className="card-rating">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={14} fill="#F5A623" color="#F5A623" />
                    ))}
                    <span>({p.reviewsCount})</span>
                  </div>
                  <p style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '16px' }}>{p.shortDesc}</p>
                  <div className="card-price-row">
                    <div className="price-box">
                      <span className="current-price">₹{p.price}</span>
                      <span className="old-price">₹{p.originalPrice}</span>
                    </div>
                    <button className="btn btn-primary" style={{ padding: '8px 16px', fontSize: '0.85rem' }} onClick={() => onSelectProduct(p)}>
                      View Details
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};
