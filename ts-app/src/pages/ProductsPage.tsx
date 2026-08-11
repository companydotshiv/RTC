import React, { useState } from 'react';
import { products } from '../data/productsData';
import type { Product } from '../types/product';
import { Star, ShoppingBag, X, Heart, ChevronDown, Eye, Minus, Plus } from 'lucide-react';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  cartQuantities?: { [id: number]: number };
  onAddToCart?: (productId: number, qty?: number) => void;
  onUpdateCartQty?: (productId: number, qty: number) => void;
  onToggleWishlist?: (productId: number) => void;
  wishlistIds?: number[];
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectProduct,
  searchQuery: propSearchQuery,
  setSearchQuery: propSetSearchQuery,
  cartQuantities = {},
  onAddToCart,
  onUpdateCartQty,
  onToggleWishlist,
  wishlistIds = []
}) => {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [selectedSubCategory, setSelectedSubCategory] = useState<string | null>(null);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  const [isDryFruitsExpanded, setIsDryFruitsExpanded] = useState<boolean>(true);
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    category: true,
    type: true,
    size: true,
    price: true,
  });

  const toggleSection = (section: string) => {
    setOpenSections((prev) => ({ ...prev, [section]: !prev[section] }));
  };

  const toggleType = (t: string) => {
    setSelectedTypes((prev) =>
      prev.includes(t) ? prev.filter((item) => item !== t) : [...prev, t]
    );
  };

  const togglePrice = (p: string) => {
    setSelectedPrices((prev) =>
      prev.includes(p) ? prev.filter((item) => item !== p) : [...prev, p]
    );
  };

  const [localSearchQuery, setLocalSearchQuery] = useState<string>('');
  const [modalProduct, setModalProduct] = useState<Product | null>(null);
  const [sortOption, setSortOption] = useState<string>('default');
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);

  const activeSearchQuery = propSearchQuery !== undefined ? propSearchQuery : localSearchQuery;
  const updateSearchQuery = (val: string) => {
    if (propSetSearchQuery) {
      propSetSearchQuery(val);
    } else {
      setLocalSearchQuery(val);
    }
  };

  const sortOptionsMap: { [key: string]: string } = {
    default: 'Default sorting',
    popularity: 'Sort by popularity',
    rating: 'Sort by average rating',
    latest: 'Sort by latest',
    price_low: 'Sort by price: low to high',
    price_high: 'Sort by price: high to low',
  };

  const filteredProducts = products.filter((p) => {
    // 1. Category & Subcategory Filter
    let matchesCategory = true;
    if (selectedCategory !== 'all') {
      if (selectedSubCategory) {
        // e.g. subcategory "Cashew", "Walnut", "Almonds", "Raisins", "Dried Apricot"
        matchesCategory =
          p.categoryName.toLowerCase().includes(selectedSubCategory.toLowerCase()) ||
          p.name.toLowerCase().includes(selectedSubCategory.toLowerCase());
      } else {
        matchesCategory = p.category === selectedCategory;
      }
    }

    // 2. Search Filter
    const matchesSearch =
      p.name.toLowerCase().includes(activeSearchQuery.toLowerCase()) ||
      p.shortDesc.toLowerCase().includes(activeSearchQuery.toLowerCase());

    // 3. Type Filter (Diamond, Gold, Platinum)
    let matchesType = true;
    if (selectedTypes.length > 0) {
      matchesType = selectedTypes.some((t) => {
        const lowerT = t.toLowerCase();
        return (
          p.name.toLowerCase().includes(lowerT) ||
          p.badge.toLowerCase().includes(lowerT) ||
          (p.productTypes && p.productTypes.some((pt) => pt.toLowerCase() === lowerT))
        );
      });
    }

    // 4. Size Filter
    let matchesSize = true;
    if (selectedSize !== 'all') {
      matchesSize = p.weights && p.weights.some((w) => w.toLowerCase() === selectedSize.toLowerCase());
    }

    // 5. Price Filter Ranges ('10-49', '50-99', '100-199', '200+')
    let matchesPrice = true;
    if (selectedPrices.length > 0) {
      matchesPrice = selectedPrices.some((range) => {
        if (range === '10-49') return p.price >= 10 && p.price <= 49;
        if (range === '50-99') return p.price >= 50 && p.price <= 99;
        if (range === '100-199') return p.price >= 100 && p.price <= 199;
        if (range === '200+') return p.price >= 200;
        return true;
      });
    }

    return matchesCategory && matchesSearch && matchesType && matchesSize && matchesPrice;
  }).sort((a, b) => {
    if (sortOption === 'price_low') return a.price - b.price;
    if (sortOption === 'price_high') return b.price - a.price;
    if (sortOption === 'rating') return b.rating - a.rating;
    if (sortOption === 'popularity') return b.reviewsCount - a.reviewsCount;
    return a.id - b.id;
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

            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <input
                type="text"
                placeholder="Search catalog..."
                value={activeSearchQuery}
                onChange={(e) => updateSearchQuery(e.target.value)}
                style={{
                  padding: '9px 16px',
                  borderRadius: '6px',
                  border: '1px solid #D8D8D8',
                  fontSize: '0.9rem',
                  fontWeight: 400,
                  color: '#222222',
                  background: '#FFFFFF',
                  boxShadow: 'inset 0 1px 2px rgba(0,0,0,0.02)',
                  outline: 'none'
                }}
              />
              
              {/* Custom Sort Dropdown matching Razzi Shop screenshot */}
              <div style={{ position: 'relative', width: '220px' }}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  style={{
                    width: '100%',
                    padding: '10px 16px',
                    background: '#FFFFFF',
                    border: '1px solid #707070',
                    borderRadius: '0px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '0.92rem',
                    color: '#444444',
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 400
                  }}
                >
                  <span>{sortOptionsMap[sortOption]}</span>
                  <ChevronDown size={18} color="#666666" style={{ transition: 'transform 0.2s ease', transform: isSortOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>

                {isSortOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: '100%',
                      left: 0,
                      right: 0,
                      background: '#FFFFFF',
                      border: '1px solid #707070',
                      borderTop: 'none',
                      zIndex: 100,
                      boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
                      display: 'flex',
                      flexDirection: 'column'
                    }}
                  >
                    {Object.keys(sortOptionsMap).map((key) => (
                      <div
                        key={key}
                        onClick={() => {
                          setSortOption(key);
                          setIsSortOpen(false);
                        }}
                        style={{
                          padding: '10px 16px',
                          fontSize: '0.9rem',
                          fontFamily: "'Jost', sans-serif",
                          fontWeight: 400,
                          cursor: 'pointer',
                          background: sortOption === key ? '#707070' : '#FFFFFF',
                          color: sortOption === key ? '#FFFFFF' : '#666666',
                          transition: 'background 0.15s ease, color 0.15s ease',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          if (sortOption !== key) {
                            e.currentTarget.style.background = '#F5F5F5';
                            e.currentTarget.style.color = '#222222';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (sortOption !== key) {
                            e.currentTarget.style.background = '#FFFFFF';
                            e.currentTarget.style.color = '#666666';
                          }
                        }}
                      >
                        {sortOptionsMap[key]}
                      </div>
                    ))}
                  </div>
                )}
              </div>

              <span style={{ color: '#555555', fontSize: '0.9rem', fontWeight: 400 }}>
                Showing <span style={{ fontWeight: 400 }}>{filteredProducts.length}</span> items
              </span>
            </div>
          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '16px' }}>
        <div className="container">
          <div style={{ display: 'grid', gridTemplateColumns: '220px 1fr', gap: '30px', alignItems: 'start' }}>
            {/* Left Sidebar Filter Section matching User Screenshots */}
            <aside style={{ fontFamily: "'Jost', sans-serif", color: '#222222' }}>
              {/* 1. Category Section */}
              <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '18px' }}>
                <div
                  onClick={() => toggleSection('category')}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', paddingBottom: '8px' }}
                >
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1A1A1A', margin: 0 }}>Category</h3>
                  <ChevronDown size={18} color="#666666" style={{ transition: 'transform 0.2s', transform: openSections.category ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </div>

                {openSections.category && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '6px' }}>
                    {/* All Product Range */}
                    <div
                      onClick={() => { setSelectedCategory('all'); setSelectedSubCategory(null); }}
                      style={{
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: selectedCategory === 'all' && !selectedSubCategory ? 600 : 400,
                        color: selectedCategory === 'all' && !selectedSubCategory ? '#007A3D' : '#444444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{ width: '15px', height: '15px', borderRadius: '3px', border: selectedCategory === 'all' && !selectedSubCategory ? '2px solid #007A3D' : '1px solid #CBD5E1', background: selectedCategory === 'all' && !selectedSubCategory ? '#007A3D' : '#E2E8F0', flexShrink: 0 }} />
                      <span>All Product Range ({products.length})</span>
                    </div>

                    {/* Chemical & Herbs */}
                    <div
                      onClick={() => { setSelectedCategory('spices'); setSelectedSubCategory('Chemical'); }}
                      style={{
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: selectedSubCategory === 'Chemical' ? 600 : 400,
                        color: selectedSubCategory === 'Chemical' ? '#007A3D' : '#444444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{ width: '15px', height: '15px', borderRadius: '3px', border: selectedSubCategory === 'Chemical' ? '2px solid #007A3D' : '1px solid #CBD5E1', background: selectedSubCategory === 'Chemical' ? '#007A3D' : '#E2E8F0', flexShrink: 0 }} />
                      <span>Chemical & Herbs (2)</span>
                    </div>

                    {/* Dehydrated Fruits */}
                    <div
                      onClick={() => { setSelectedCategory('dehydrated-fruits'); setSelectedSubCategory(null); }}
                      style={{
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: selectedCategory === 'dehydrated-fruits' && !selectedSubCategory ? 600 : 400,
                        color: selectedCategory === 'dehydrated-fruits' && !selectedSubCategory ? '#007A3D' : '#444444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{ width: '15px', height: '15px', borderRadius: '3px', border: selectedCategory === 'dehydrated-fruits' && !selectedSubCategory ? '2px solid #007A3D' : '1px solid #CBD5E1', background: selectedCategory === 'dehydrated-fruits' && !selectedSubCategory ? '#007A3D' : '#E2E8F0', flexShrink: 0 }} />
                      <span>Dehydrated Fruits (4)</span>
                    </div>

                    {/* Dry Figs */}
                    <div
                      onClick={() => { setSelectedCategory('dry-fruits'); setSelectedSubCategory('Dry Figs'); }}
                      style={{
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: selectedSubCategory === 'Dry Figs' ? 600 : 400,
                        color: selectedSubCategory === 'Dry Figs' ? '#007A3D' : '#444444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{ width: '15px', height: '15px', borderRadius: '3px', border: selectedSubCategory === 'Dry Figs' ? '2px solid #007A3D' : '1px solid #CBD5E1', background: selectedSubCategory === 'Dry Figs' ? '#007A3D' : '#E2E8F0', flexShrink: 0 }} />
                      <span>Dry Figs (2)</span>
                    </div>

                    {/* Dry fruits (Expandable with Arrow) */}
                    <div>
                      <div
                        onClick={() => {
                          setSelectedCategory('dry-fruits');
                          setSelectedSubCategory(null);
                          setIsDryFruitsExpanded(!isDryFruitsExpanded);
                        }}
                        style={{
                          cursor: 'pointer',
                          fontSize: '0.88rem',
                          fontWeight: selectedCategory === 'dry-fruits' && !selectedSubCategory ? 600 : 400,
                          color: selectedCategory === 'dry-fruits' && !selectedSubCategory ? '#007A3D' : '#444444',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between'
                        }}
                      >
                        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                          <div style={{ width: '15px', height: '15px', borderRadius: '3px', border: selectedCategory === 'dry-fruits' && !selectedSubCategory ? '2px solid #007A3D' : '1px solid #CBD5E1', background: selectedCategory === 'dry-fruits' && !selectedSubCategory ? '#007A3D' : '#E2E8F0', flexShrink: 0 }} />
                          <span>Dry fruits (12)</span>
                        </div>
                        <button
                          style={{
                            background: 'none',
                            border: 'none',
                            cursor: 'pointer',
                            padding: '2px',
                            display: 'flex',
                            alignItems: 'center'
                          }}
                          onClick={(e) => {
                            e.stopPropagation();
                            setIsDryFruitsExpanded(!isDryFruitsExpanded);
                          }}
                        >
                          <ChevronDown
                            size={14}
                            color="#666666"
                            style={{
                              transition: 'transform 0.2s ease',
                              transform: isDryFruitsExpanded ? 'rotate(180deg)' : 'rotate(0deg)'
                            }}
                          />
                        </button>
                      </div>

                      {/* Nested Subcategories with Checkboxes, Left Aligned, NO bullets */}
                      {isDryFruitsExpanded && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '23px', paddingTop: '8px' }}>
                          {[
                            { name: 'Cashew', count: 1 },
                            { name: 'Walnut', count: 4 },
                            { name: 'Almonds', count: 1 },
                            { name: 'Raisins', count: 1 },
                            { name: 'Dried Apricot', count: 1 }
                          ].map((subCat) => (
                            <div
                              key={subCat.name}
                              onClick={() => { setSelectedCategory('dry-fruits'); setSelectedSubCategory(subCat.name); }}
                              style={{
                                cursor: 'pointer',
                                fontSize: '0.85rem',
                                color: selectedSubCategory === subCat.name ? '#007A3D' : '#555555',
                                fontWeight: selectedSubCategory === subCat.name ? 600 : 400,
                                display: 'flex',
                                alignItems: 'center',
                                gap: '8px',
                                textAlign: 'left'
                              }}
                            >
                              <div style={{ width: '13px', height: '13px', borderRadius: '3px', border: selectedSubCategory === subCat.name ? '2px solid #007A3D' : '1px solid #CBD5E1', background: selectedSubCategory === subCat.name ? '#007A3D' : '#E2E8F0', flexShrink: 0 }} />
                              <span>{subCat.name} ({subCat.count})</span>
                            </div>
                          ))}
                        </div>
                      )}
                    </div>

                    {/* Fusions */}
                    <div
                      onClick={() => { setSelectedCategory('dry-fruits'); setSelectedSubCategory('Fusion'); }}
                      style={{
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: selectedSubCategory === 'Fusion' ? 600 : 400,
                        color: selectedSubCategory === 'Fusion' ? '#007A3D' : '#444444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{ width: '15px', height: '15px', borderRadius: '3px', border: selectedSubCategory === 'Fusion' ? '2px solid #007A3D' : '1px solid #CBD5E1', background: selectedSubCategory === 'Fusion' ? '#007A3D' : '#E2E8F0', flexShrink: 0 }} />
                      <span>Fusions (5)</span>
                    </div>

                    {/* Seeds */}
                    <div
                      onClick={() => { setSelectedCategory('seeds-berries'); setSelectedSubCategory(null); }}
                      style={{
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: selectedCategory === 'seeds-berries' ? 600 : 400,
                        color: selectedCategory === 'seeds-berries' ? '#007A3D' : '#444444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{ width: '15px', height: '15px', borderRadius: '3px', border: selectedCategory === 'seeds-berries' ? '2px solid #007A3D' : '1px solid #CBD5E1', background: selectedCategory === 'seeds-berries' ? '#007A3D' : '#E2E8F0', flexShrink: 0 }} />
                      <span>Seeds (6)</span>
                    </div>

                    {/* Snacking */}
                    <div
                      onClick={() => { setSelectedCategory('all'); setSelectedSubCategory(null); }}
                      style={{
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: 400,
                        color: '#444444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{ width: '15px', height: '15px', borderRadius: '3px', border: '1px solid #CBD5E1', background: '#E2E8F0', flexShrink: 0 }} />
                      <span>Snacking (13)</span>
                    </div>

                    {/* Spices */}
                    <div
                      onClick={() => { setSelectedCategory('spices'); setSelectedSubCategory(null); }}
                      style={{
                        cursor: 'pointer',
                        fontSize: '0.88rem',
                        fontWeight: selectedCategory === 'spices' && !selectedSubCategory ? 600 : 400,
                        color: selectedCategory === 'spices' && !selectedSubCategory ? '#007A3D' : '#444444',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '8px'
                      }}
                    >
                      <div style={{ width: '15px', height: '15px', borderRadius: '3px', border: selectedCategory === 'spices' && !selectedSubCategory ? '2px solid #007A3D' : '1px solid #CBD5E1', background: selectedCategory === 'spices' && !selectedSubCategory ? '#007A3D' : '#E2E8F0', flexShrink: 0 }} />
                      <span>Spices (4)</span>
                    </div>
                  </div>
                )}
              </div>

              {/* 2. Type Section */}
              <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '18px' }}>
                <div
                  onClick={() => toggleSection('type')}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', paddingBottom: '8px' }}
                >
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1A1A1A', margin: 0 }}>Type</h3>
                  <ChevronDown size={18} color="#666666" style={{ transition: 'transform 0.2s', transform: openSections.type ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </div>

                {openSections.type && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '6px' }}>
                    {['Diamond', 'Gold', 'Platinum'].map((tName) => {
                      const isChecked = selectedTypes.includes(tName);
                      return (
                        <div
                          key={tName}
                          onClick={() => toggleType(tName)}
                          style={{ cursor: 'pointer', fontSize: '0.88rem', fontWeight: 400, color: '#444444', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                          <div style={{ width: '15px', height: '15px', borderRadius: '3px', border: isChecked ? '2px solid #007A3D' : '1px solid #CBD5E1', background: isChecked ? '#007A3D' : '#E2E8F0', flexShrink: 0 }} />
                          <span>{tName}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>

              {/* 3. Size Section */}
              <div style={{ borderBottom: '1px solid #E2E8F0', paddingBottom: '16px', marginBottom: '18px' }}>
                <div
                  onClick={() => toggleSection('size')}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', paddingBottom: '8px' }}
                >
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1A1A1A', margin: 0 }}>Size</h3>
                  <ChevronDown size={18} color="#666666" style={{ transition: 'transform 0.2s', transform: openSections.size ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </div>

                {openSections.size && (
                  <div style={{ paddingTop: '6px' }}>
                    <select
                      value={selectedSize}
                      onChange={(e) => setSelectedSize(e.target.value)}
                      style={{
                        width: '100%',
                        padding: '8px 12px',
                        borderRadius: '4px',
                        border: '1px solid #CBD5E1',
                        fontSize: '0.88rem',
                        color: '#444444',
                        background: '#FFFFFF',
                        outline: 'none',
                        cursor: 'pointer'
                      }}
                    >
                      <option value="all">Any Size</option>
                      <option value="250g">250g</option>
                      <option value="500g">500g</option>
                      <option value="1kg">1kg</option>
                      <option value="50gm">50gm</option>
                      <option value="100gm">100gm</option>
                      <option value="200g">200g</option>
                    </select>
                  </div>
                )}
              </div>

              {/* 4. Price Section */}
              <div style={{ paddingBottom: '16px', marginBottom: '18px' }}>
                <div
                  onClick={() => toggleSection('price')}
                  style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', paddingBottom: '8px' }}
                >
                  <h3 style={{ fontSize: '1.05rem', fontWeight: 600, color: '#1A1A1A', margin: 0 }}>Price</h3>
                  <ChevronDown size={18} color="#666666" style={{ transition: 'transform 0.2s', transform: openSections.price ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </div>

                {openSections.price && (
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '10px', paddingTop: '6px' }}>
                    {[
                      { key: '10-49', label: '₹10.00 - ₹49.00' },
                      { key: '50-99', label: '₹50.00 - ₹99.00' },
                      { key: '100-199', label: '₹100.00 - ₹199.00' },
                      { key: '200+', label: '₹200.00 +' }
                    ].map((priceItem) => {
                      const isChecked = selectedPrices.includes(priceItem.key);
                      return (
                        <div
                          key={priceItem.key}
                          onClick={() => togglePrice(priceItem.key)}
                          style={{ cursor: 'pointer', fontSize: '0.88rem', fontWeight: 400, color: '#444444', display: 'flex', alignItems: 'center', gap: '8px' }}
                        >
                          <div style={{ width: '15px', height: '15px', borderRadius: '3px', border: isChecked ? '2px solid #007A3D' : '1px solid #CBD5E1', background: isChecked ? '#007A3D' : '#E2E8F0', flexShrink: 0 }} />
                          <span>{priceItem.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </aside>

            {/* Right Product Grid */}
            <div>
              <div className="bestsellers-grid">
            {filteredProducts.map((p) => {
              const qty = cartQuantities[p.id] || 0;
              const isWishlisted = wishlistIds.includes(p.id);
              const hoverImgSrc = (p.gallery && p.gallery.length > 1) ? p.gallery[1] : p.image;

              return (
                <div key={p.id} className="bestseller-card" onClick={() => onSelectProduct(p)}>
                  <div className="bestseller-img-container">
                    {p.badge && (
                      <span style={{ position: 'absolute', top: '12px', left: '12px', background: '#007A3D', color: '#FFF', padding: '3px 10px', fontSize: '0.75rem', fontWeight: 600, borderRadius: '4px', zIndex: 3, textTransform: 'uppercase', letterSpacing: '0.5px' }}>
                        {p.badge}
                      </span>
                    )}
                    <img src={p.image} alt={p.name} className="main-img" />
                    <img src={hoverImgSrc} alt={`${p.name} Back`} className="hover-img" />

                    {/* Hover Quick-Actions Overlay */}
                    <div
                      className="card-hover-actions"
                      style={{
                        flexDirection: 'column',
                        gap: '12px',
                        bottom: '16px'
                      }}
                    >
                      {/* View Details Option above the 3 circle icons */}
                      <button
                        className="btn btn-gold"
                        onClick={(e) => {
                          e.stopPropagation();
                          setModalProduct(p);
                        }}
                        style={{
                          background: '#007A3D',
                          borderColor: '#007A3D',
                          color: '#FFFFFF',
                          padding: '8px 18px',
                          borderRadius: '20px',
                          fontSize: '0.82rem',
                          fontWeight: 500,
                          boxShadow: '0 4px 14px rgba(0,0,0,0.25)',
                          cursor: 'pointer',
                          letterSpacing: '0.3px',
                          transition: 'all 0.2s ease'
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = '#F8B84E';
                          e.currentTarget.style.borderColor = '#F8B84E';
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = '#007A3D';
                          e.currentTarget.style.borderColor = '#007A3D';
                        }}
                      >
                        View Details
                      </button>

                      {/* 3 Circle Quick Action Buttons */}
                      <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                        {/* 1. Add to Cart / Quantity Pill Controller */}
                        {qty > 0 ? (
                          <div className="hover-action-item">
                            <span className="tooltip-label">Quantity in cart</span>
                            <div
                              style={{
                                height: '48px',
                                borderRadius: '24px',
                                background: '#ffffff',
                                border: '1px solid #e2e8f0',
                                color: '#222222',
                                display: 'flex',
                                alignItems: 'center',
                                gap: '10px',
                                padding: '0 14px',
                                boxShadow: '0 4px 14px rgba(0, 0, 0, 0.12)'
                              }}
                            >
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onUpdateCartQty) onUpdateCartQty(p.id, qty - 1);
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#222222',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '2px'
                                }}
                                title="Decrease quantity"
                              >
                                <Minus size={16} />
                              </button>
                              <span style={{ fontSize: '0.9rem', fontWeight: 600, minWidth: '16px', textAlign: 'center' }}>
                                {qty}
                              </span>
                              <button
                                onClick={(e) => {
                                  e.stopPropagation();
                                  if (onAddToCart) onAddToCart(p.id, 1);
                                }}
                                style={{
                                  background: 'none',
                                  border: 'none',
                                  color: '#222222',
                                  cursor: 'pointer',
                                  display: 'flex',
                                  alignItems: 'center',
                                  padding: '2px'
                                }}
                                title="Increase quantity"
                              >
                                <Plus size={16} />
                              </button>
                            </div>
                          </div>
                        ) : (
                          <div className="hover-action-item">
                            <span className="tooltip-label">Add to cart</span>
                            <button
                              className="action-circle-btn"
                              onClick={(e) => {
                                e.stopPropagation();
                                if (onAddToCart) onAddToCart(p.id, 1);
                              }}
                            >
                              <ShoppingBag size={20} />
                            </button>
                          </div>
                        )}

                        {/* 2. Quick View Icon */}
                        <div className="hover-action-item">
                          <span className="tooltip-label">Quick View</span>
                          <button
                            className="action-circle-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              setModalProduct(p);
                            }}
                          >
                            <Eye size={20} />
                          </button>
                        </div>

                        {/* 3. Wishlist Heart Icon */}
                        <div className="hover-action-item">
                          <span className="tooltip-label">Wishlist</span>
                          <button
                            className="action-circle-btn"
                            onClick={(e) => {
                              e.stopPropagation();
                              if (onToggleWishlist) onToggleWishlist(p.id);
                            }}
                          >
                            <Heart size={20} fill={isWishlisted ? "#E53935" : "none"} color={isWishlisted ? "#E53935" : "#222222"} />
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Green Bestseller Footer Card matching image 2 */}
                  <div className="bestseller-green-footer">
                    <span className="bestseller-cat">{p.categoryName}</span>
                    <h3 className="bestseller-title">{p.name}</h3>
                    <div className="bestseller-price">
                      ₹{p.price.toFixed(2)}
                      {p.originalPrice > p.price && (
                        <span style={{ fontSize: '0.85rem', textDecoration: 'line-through', opacity: 0.75, marginLeft: '8px', fontWeight: 400 }}>
                          ₹{p.originalPrice.toFixed(2)}
                        </span>
                      )}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  </section>

      {/* Mini Pop-Up Modal Card */}
      {modalProduct && (
        <div
          style={{
            position: 'fixed',
            inset: 0,
            background: 'rgba(0,0,0,0.6)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            zIndex: 99999,
            padding: '20px'
          }}
          onClick={() => setModalProduct(null)}
        >
          <div
            style={{
              background: '#FFFFFF',
              borderRadius: '12px',
              maxWidth: '440px',
              width: '100%',
              padding: '24px',
              position: 'relative',
              boxShadow: '0 20px 50px rgba(0,0,0,0.25)',
              cursor: 'pointer',
              animation: 'toastSlideDown 0.3s ease forwards'
            }}
            onClick={(e) => {
              e.stopPropagation();
              onSelectProduct(modalProduct);
              setModalProduct(null);
            }}
            title="Click to view full product page"
          >
            {/* Top Right Close Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setModalProduct(null);
              }}
              style={{
                position: 'absolute',
                top: '14px',
                right: '14px',
                background: '#F0F0F0',
                border: 'none',
                borderRadius: '50%',
                width: '30px',
                height: '30px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                cursor: 'pointer',
                color: '#555'
              }}
              title="Close preview"
            >
              <X size={18} />
            </button>

            {/* Product Image */}
            <div style={{ width: '100%', height: '240px', background: '#FAF8F5', borderRadius: '8px', overflow: 'hidden', marginBottom: '16px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <img src={modalProduct.image} alt={modalProduct.name} style={{ width: '100%', height: '100%', objectFit: 'contain' }} />
            </div>

            {/* Category */}
            <span style={{ fontSize: '0.78rem', textTransform: 'uppercase', color: '#888888', fontWeight: 600, letterSpacing: '0.5px' }}>
              {modalProduct.categoryName}
            </span>

            {/* Name */}
            <h3 style={{ fontSize: '1.35rem', fontWeight: 700, color: '#222222', margin: '4px 0 8px 0' }}>
              {modalProduct.name}
            </h3>

            {/* Ratings */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '12px' }}>
              <div style={{ display: 'flex', gap: '2px' }}>
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={15} fill="#F5A623" color="#F5A623" />
                ))}
              </div>
              <span style={{ fontSize: '0.85rem', color: '#666', fontWeight: 500 }}>
                ({modalProduct.reviewsCount})
              </span>
            </div>

            {/* Description */}
            <p style={{ fontSize: '0.88rem', color: '#555555', lineHeight: '1.5', margin: 0 }}>
              {modalProduct.shortDesc || modalProduct.description}
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

