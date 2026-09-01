import React, { useState, useEffect } from 'react';
import { adminStore } from '../data/adminStore';
import type { Product } from '../types/product';
import { Star, X, ChevronDown, Check, SlidersHorizontal } from 'lucide-react';
import { ProductCard } from '../components/ProductCard';

interface ProductsPageProps {
  onSelectProduct: (product: Product) => void;
  searchQuery?: string;
  setSearchQuery?: (query: string) => void;
  cartQuantities?: { [id: number]: number };
  onAddToCart?: (productId: number, qty?: number) => void;
  onUpdateCartQty?: (productId: number, qty: number) => void;
  onToggleWishlist?: (productId: number) => void;
  wishlistIds?: number[];
  initialCategory?: string;
  initialSubCategory?: string;
  setCurrentView?: (view: string) => void;
}

export const ProductsPage: React.FC<ProductsPageProps> = ({
  onSelectProduct,
  searchQuery: propSearchQuery,
  setSearchQuery: propSetSearchQuery,
  cartQuantities = {},
  onAddToCart,
  onUpdateCartQty,
  onToggleWishlist,
  wishlistIds = [],
  initialCategory = 'all',
  initialSubCategory = '',
  setCurrentView
}) => {
  const [, setRenderTick] = useState(0);

  useEffect(() => {
    const unsubscribe = adminStore.subscribe(() => {
      setRenderTick((prev) => prev + 1);
    });
    return () => unsubscribe();
  }, []);

  const products = adminStore.products;
  const [selectedCategories, setSelectedCategories] = useState<string[]>(() => {
    if (initialCategory && initialCategory !== 'all') return [initialCategory];
    return [];
  });
  const [selectedSubCategories, setSelectedSubCategories] = useState<string[]>(() => {
    if (initialSubCategory) return [initialSubCategory];
    return [];
  });
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>('all');
  const [selectedPrices, setSelectedPrices] = useState<string[]>([]);

  // Synchronize when initialCategory or initialSubCategory change from navigation
  useEffect(() => {
    if (initialCategory && initialCategory !== 'all') {
      setSelectedCategories([initialCategory]);
    } else {
      setSelectedCategories([]);
    }

    if (initialSubCategory) {
      setSelectedSubCategories([initialSubCategory]);
    } else {
      setSelectedSubCategories([]);
    }
  }, [initialCategory, initialSubCategory]);

  const toggleCategorySelection = (catKey: string, subKey?: string | null) => {
    if (subKey) {
      setSelectedSubCategories((prev) =>
        prev.includes(subKey) ? prev.filter((s) => s !== subKey) : [...prev, subKey]
      );
    } else {
      setSelectedCategories((prev) =>
        prev.includes(catKey) ? prev.filter((c) => c !== catKey) : [...prev, catKey]
      );
    }
  };

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
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState<boolean>(false);

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
    name_asc: 'Sort by name: A ↓ Z',
    name_desc: 'Sort by name: A ↑ Z',
  };

  const filteredProducts = products.filter((p) => {
    // 1. Category & Subcategory Filter
    let matchesCategory = true;
    if (selectedCategories.length > 0 || selectedSubCategories.length > 0) {
      const catMatch = selectedCategories.length > 0 && selectedCategories.some((cat) => {
        if (cat === 'all') return true;
        return p.category === cat;
      });

      const subMatch = selectedSubCategories.length > 0 && selectedSubCategories.some((sub) => {
        return (
          p.categoryName.toLowerCase().includes(sub.toLowerCase()) ||
          p.name.toLowerCase().includes(sub.toLowerCase())
        );
      });

      matchesCategory = catMatch || subMatch;
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
    if (sortOption === 'name_asc') return a.name.localeCompare(b.name);
    if (sortOption === 'name_desc') return b.name.localeCompare(a.name);
    return a.id - b.id;
  });

  const hasActiveFilters =
    selectedCategories.length > 0 ||
    selectedSubCategories.length > 0 ||
    selectedTypes.length > 0 ||
    selectedSize !== 'all' ||
    selectedPrices.length > 0 ||
    activeSearchQuery.trim() !== '';

  const resetAllFilters = () => {
    setSelectedCategories([]);
    setSelectedSubCategories([]);
    setSelectedTypes([]);
    setSelectedSize('all');
    setSelectedPrices([]);
    updateSearchQuery('');
  };

  // Fetch active Products Page banner from adminStore
  const productsBanner = adminStore.banners.find(b => (b.page === 'products' || (b.page as string) === 'products_page') && b.isActive);

  return (
    <div>
      {/* Premium Hero Banner */}
      <section
        style={{
          background: 'linear-gradient(135deg, #042616 0%, #0A3D24 50%, #15803D 100%)',
          backgroundImage: `linear-gradient(rgba(4, 38, 22, 0.72), rgba(4, 38, 22, 0.85)), url(${productsBanner?.imageUrl || 'https://images.unsplash.com/photo-1596040033229-a9821ebd058d?auto=format&fit=crop&q=80&w=1600'})`,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          color: '#FFF',
          padding: '56px 0 60px 0',
          position: 'relative',
          overflow: 'hidden',
          boxShadow: 'inset 0 -1px 0 rgba(255, 255, 255, 0.1)'
        }}
      >
        <div className="container" style={{ textAlign: 'center', position: 'relative', zIndex: 2 }}>
          {/* Breadcrumb */}
          <div style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', fontSize: '0.86rem', color: 'rgba(255, 255, 255, 0.75)', marginBottom: '14px' }}>
            <span>Home</span> &gt; <span style={{ color: '#FCD34D', fontWeight: 600 }}>Shop</span>
          </div>

          <div style={{ display: 'flex', justifyContent: 'center', marginBottom: '12px' }}>
            <span
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '6px',
                background: 'rgba(255, 255, 255, 0.12)',
                border: '1px solid rgba(255, 255, 255, 0.25)',
                backdropFilter: 'blur(8px)',
                color: '#FEF3C7',
                fontSize: '0.82rem',
                fontWeight: 600,
                padding: '4px 14px',
                borderRadius: '20px',
                textTransform: 'uppercase',
                letterSpacing: '0.5px'
              }}
            >
              🌿 100% Pure Natural Harvest
            </span>
          </div>

          <h1 style={{ fontSize: '2.8rem', color: '#FFFFFF', marginBottom: '12px', fontWeight: 800, letterSpacing: '-0.5px' }}>
            {productsBanner?.title || 'Explore Our Complete Wholesome Range'}
          </h1>
          <p style={{ color: 'rgba(255,255,255,0.9)', maxWidth: '680px', margin: '0 auto', fontSize: '1.05rem', lineHeight: 1.6 }}>
            {productsBanner?.subtitle || '100% natural, triple-sorted dry fruits, gourmet nuts, authentic Kashmiri saffron, and culinary seeds delivered fresh to your doorstep.'}
          </p>
        </div>
      </section>

      {/* Top Controls Toolbar: Items Count on Left, Sort Dropdown on Right */}
      <section style={{ padding: '20px 0 16px 0', borderBottom: '1px solid #E5E7EB', background: '#FAFAF9' }}>
        <div className="container">
          <div className="shop-toolbar-flex">
            
            {/* Left: Products Count Badge & Mobile Filter Button */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', flexWrap: 'wrap' }}>
              <button
                className="shop-mobile-filter-btn"
                onClick={() => setIsMobileFilterOpen(!isMobileFilterOpen)}
                style={{
                  display: 'none',
                  alignItems: 'center',
                  gap: '8px',
                  background: isMobileFilterOpen ? '#007A3D' : '#FFFFFF',
                  color: isMobileFilterOpen ? '#FFFFFF' : '#111827',
                  border: '1px solid #D1D5DB',
                  borderRadius: '8px',
                  padding: '8px 16px',
                  fontWeight: 600,
                  fontSize: '0.9rem',
                  cursor: 'pointer'
                }}
              >
                <SlidersHorizontal size={16} />
                <span>{isMobileFilterOpen ? 'Hide Filters' : 'Filters'}</span>
                {hasActiveFilters && (
                  <span style={{ background: isMobileFilterOpen ? '#FFF' : '#007A3D', color: isMobileFilterOpen ? '#007A3D' : '#FFF', fontSize: '0.75rem', borderRadius: '50%', width: '18px', height: '18px', display: 'inline-flex', alignItems: 'center', justifyContent: 'center' }}>
                    {selectedCategories.length + selectedSubCategories.length + selectedPrices.length}
                  </span>
                )}
              </button>

              <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                <span style={{ fontSize: '1.05rem', fontWeight: 700, color: '#111827' }}>
                  All Products
                </span>
                <span
                  style={{
                    background: '#E5E7EB',
                    color: '#374151',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    padding: '3px 10px',
                    borderRadius: '12px'
                  }}
                >
                  Showing {filteredProducts.length} items
                </span>
              </div>
            </div>

            {/* Right: Sort Dropdown */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
              <label style={{ fontSize: '0.88rem', color: '#6B7280', fontWeight: 500 }}>
                Sort by:
              </label>
              <div style={{ position: 'relative', width: '220px' }}>
                <button
                  onClick={() => setIsSortOpen(!isSortOpen)}
                  style={{
                    width: '100%',
                    padding: '9px 14px',
                    background: '#FFFFFF',
                    border: '1px solid #D1D5DB',
                    borderRadius: '8px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                    cursor: 'pointer',
                    fontSize: '0.9rem',
                    color: '#374151',
                    fontFamily: "'Jost', sans-serif",
                    fontWeight: 500,
                    boxShadow: '0 1px 2px rgba(0,0,0,0.04)'
                  }}
                >
                  <span>{sortOptionsMap[sortOption]}</span>
                  <ChevronDown size={16} color="#666666" style={{ transition: 'transform 0.2s ease', transform: isSortOpen ? 'rotate(180deg)' : 'rotate(0deg)' }} />
                </button>

                {isSortOpen && (
                  <div
                    style={{
                      position: 'absolute',
                      top: 'calc(100% + 4px)',
                      left: 0,
                      right: 0,
                      background: '#FFFFFF',
                      border: '1px solid #E5E7EB',
                      borderRadius: '8px',
                      zIndex: 100,
                      boxShadow: '0 10px 25px rgba(0,0,0,0.1)',
                      overflow: 'hidden'
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
                          padding: '10px 14px',
                          fontSize: '0.88rem',
                          fontFamily: "'Jost', sans-serif",
                          fontWeight: sortOption === key ? 600 : 400,
                          cursor: 'pointer',
                          background: sortOption === key ? '#F0FDF4' : '#FFFFFF',
                          color: sortOption === key ? '#15803D' : '#374151',
                          transition: 'background 0.15s ease, color 0.15s ease',
                          textAlign: 'left'
                        }}
                        onMouseEnter={(e) => {
                          if (sortOption !== key) {
                            e.currentTarget.style.background = '#F9FAFB';
                          }
                        }}
                        onMouseLeave={(e) => {
                          if (sortOption !== key) {
                            e.currentTarget.style.background = '#FFFFFF';
                          }
                        }}
                      >
                        {sortOptionsMap[key]}
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

      <section className="section" style={{ paddingTop: '24px' }}>
        <div className="container">
          <div className="shop-main-layout">
            {/* Left Sidebar Filter Section */}
            <aside
              className={`shop-sidebar ${isMobileFilterOpen ? 'mobile-open' : ''}`}
            >
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '16px', paddingBottom: '12px', borderBottom: '1px solid #E2E8F0' }}>
                <h2 style={{ fontSize: '1.1rem', fontWeight: 700, color: '#111827', margin: 0 }}>Filters</h2>
                {hasActiveFilters && (
                  <button
                    onClick={resetAllFilters}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#DC2626',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline'
                    }}
                  >
                    Reset All
                  </button>
                )}
              </div>

              {/* Search Box in Filter Sidebar */}
              <div style={{ marginBottom: '18px', paddingBottom: '16px', borderBottom: '1px solid #E2E8F0' }}>
                <label style={{ display: 'block', fontSize: '0.88rem', fontWeight: 600, color: '#374151', marginBottom: '8px' }}>
                  Search Products
                </label>
                <div style={{ position: 'relative' }}>
                  <input
                    type="text"
                    placeholder="Search by name..."
                    value={activeSearchQuery}
                    onChange={(e) => updateSearchQuery(e.target.value)}
                    style={{
                      width: '100%',
                      padding: '9px 32px 9px 12px',
                      borderRadius: '8px',
                      border: '1px solid #D1D5DB',
                      fontSize: '0.88rem',
                      color: '#111827',
                      background: '#F9FAFB',
                      outline: 'none',
                      boxSizing: 'border-box'
                    }}
                  />
                  {activeSearchQuery && (
                    <button
                      onClick={() => updateSearchQuery('')}
                      style={{
                        position: 'absolute',
                        right: '8px',
                        top: '50%',
                        transform: 'translateY(-50%)',
                        background: 'none',
                        border: 'none',
                        cursor: 'pointer',
                        color: '#9CA3AF',
                        display: 'flex',
                        alignItems: 'center'
                      }}
                    >
                      <X size={14} />
                    </button>
                  )}
                </div>
              </div>

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
                    {/* Chemical & Herbs */}
                    {(() => {
                      const isSel = selectedCategories.includes('chemical-herbs');
                      return (
                        <div
                          onClick={() => toggleCategorySelection('chemical-herbs')}
                          style={{
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: isSel ? 600 : 400,
                            color: isSel ? '#111111' : '#777777',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              width: '15px',
                              height: '15px',
                              borderRadius: '2px',
                              border: isSel ? 'none' : '1px solid #D1D5DB',
                              background: isSel ? '#222222' : '#EAEAEA',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {isSel && <Check size={11} color="#FFFFFF" strokeWidth={3.5} />}
                          </div>
                          <span>Chemical & Herbs (2)</span>
                        </div>
                      );
                    })()}

                    {/* Dehydrated Fruits */}
                    {(() => {
                      const isSel = selectedCategories.includes('dehydrated-fruits');
                      return (
                        <div
                          onClick={() => toggleCategorySelection('dehydrated-fruits')}
                          style={{
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: isSel ? 600 : 400,
                            color: isSel ? '#111111' : '#777777',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              width: '15px',
                              height: '15px',
                              borderRadius: '2px',
                              border: isSel ? 'none' : '1px solid #D1D5DB',
                              background: isSel ? '#222222' : '#EAEAEA',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {isSel && <Check size={11} color="#FFFFFF" strokeWidth={3.5} />}
                          </div>
                          <span>Dehydrated Fruits (4)</span>
                        </div>
                      );
                    })()}

                    {/* Dry Figs */}
                    {(() => {
                      const isSel = selectedSubCategories.includes('Dry Figs');
                      return (
                        <div
                          onClick={() => toggleCategorySelection('dry-fruits', 'Dry Figs')}
                          style={{
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: isSel ? 600 : 400,
                            color: isSel ? '#111111' : '#777777',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              width: '15px',
                              height: '15px',
                              borderRadius: '2px',
                              border: isSel ? 'none' : '1px solid #D1D5DB',
                              background: isSel ? '#222222' : '#EAEAEA',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {isSel && <Check size={11} color="#FFFFFF" strokeWidth={3.5} />}
                          </div>
                          <span>Dry Figs (2)</span>
                        </div>
                      );
                    })()}

                    {/* Dry fruits (Expandable with Arrow) */}
                    <div>
                      {(() => {
                        const isSel = selectedCategories.includes('dry-fruits') && selectedSubCategories.length === 0;
                        return (
                          <div
                            onClick={() => {
                              toggleCategorySelection('dry-fruits');
                              setIsDryFruitsExpanded(!isDryFruitsExpanded);
                            }}
                            style={{
                              cursor: 'pointer',
                              fontSize: '0.88rem',
                              fontWeight: isSel ? 600 : 400,
                              color: isSel ? '#111111' : '#777777',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'space-between'
                            }}
                          >
                            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                              <div
                                style={{
                                  width: '15px',
                                  height: '15px',
                                  borderRadius: '2px',
                                  border: isSel ? 'none' : '1px solid #D1D5DB',
                                  background: isSel ? '#222222' : '#EAEAEA',
                                  display: 'flex',
                                  alignItems: 'center',
                                  justifyContent: 'center',
                                  flexShrink: 0
                                }}
                              >
                                {isSel && <Check size={11} color="#FFFFFF" strokeWidth={3.5} />}
                              </div>
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
                        );
                      })()}

                      {/* Nested Subcategories with Checkboxes, Left Aligned, NO bullets */}
                      {isDryFruitsExpanded && (
                        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px', paddingLeft: '23px', paddingTop: '8px' }}>
                          {[
                            { name: 'Almonds', count: 1 },
                            { name: 'Cashew', count: 1 },
                            { name: 'Dried Apricot', count: 1 },
                            { name: 'Raisins', count: 1 },
                            { name: 'Walnut', count: 4 }
                          ].map((subCat) => {
                            const isSelSub = selectedSubCategories.includes(subCat.name);
                            return (
                              <div
                                key={subCat.name}
                                onClick={() => toggleCategorySelection('dry-fruits', subCat.name)}
                                style={{
                                  cursor: 'pointer',
                                  fontSize: '0.85rem',
                                  color: isSelSub ? '#111111' : '#777777',
                                  fontWeight: isSelSub ? 600 : 400,
                                  display: 'flex',
                                  alignItems: 'center',
                                  gap: '8px',
                                  textAlign: 'left'
                                }}
                              >
                                <div
                                  style={{
                                    width: '14px',
                                    height: '14px',
                                    borderRadius: '2px',
                                    border: isSelSub ? 'none' : '1px solid #D1D5DB',
                                    background: isSelSub ? '#222222' : '#EAEAEA',
                                    display: 'flex',
                                    alignItems: 'center',
                                    justifyContent: 'center',
                                    flexShrink: 0
                                  }}
                                >
                                  {isSelSub && <Check size={10} color="#FFFFFF" strokeWidth={3.5} />}
                                </div>
                                <span>{subCat.name} ({subCat.count})</span>
                              </div>
                            );
                          })}
                        </div>
                      )}
                    </div>

                    {/* Fusions */}
                    {(() => {
                      const isSel = selectedSubCategories.includes('Fusion');
                      return (
                        <div
                          onClick={() => toggleCategorySelection('dry-fruits', 'Fusion')}
                          style={{
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: isSel ? 600 : 400,
                            color: isSel ? '#111111' : '#777777',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              width: '15px',
                              height: '15px',
                              borderRadius: '2px',
                              border: isSel ? 'none' : '1px solid #D1D5DB',
                              background: isSel ? '#222222' : '#EAEAEA',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {isSel && <Check size={11} color="#FFFFFF" strokeWidth={3.5} />}
                          </div>
                          <span>Fusions (5)</span>
                        </div>
                      );
                    })()}

                    {/* Seeds */}
                    {(() => {
                      const isSel = selectedCategories.includes('seeds-berries');
                      return (
                        <div
                          onClick={() => toggleCategorySelection('seeds-berries')}
                          style={{
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: isSel ? 600 : 400,
                            color: isSel ? '#111111' : '#777777',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              width: '15px',
                              height: '15px',
                              borderRadius: '2px',
                              border: isSel ? 'none' : '1px solid #D1D5DB',
                              background: isSel ? '#222222' : '#EAEAEA',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {isSel && <Check size={11} color="#FFFFFF" strokeWidth={3.5} />}
                          </div>
                          <span>Seeds (6)</span>
                        </div>
                      );
                    })()}

                    {/* Snacking */}
                    {(() => {
                      const isSel = selectedCategories.includes('snacking');
                      return (
                        <div
                          onClick={() => toggleCategorySelection('snacking')}
                          style={{
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: isSel ? 600 : 400,
                            color: isSel ? '#111111' : '#777777',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              width: '15px',
                              height: '15px',
                              borderRadius: '2px',
                              border: isSel ? 'none' : '1px solid #D1D5DB',
                              background: isSel ? '#222222' : '#EAEAEA',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {isSel && <Check size={11} color="#FFFFFF" strokeWidth={3.5} />}
                          </div>
                          <span>Snacking (13)</span>
                        </div>
                      );
                    })()}

                    {/* Spices */}
                    {(() => {
                      const isSel = selectedCategories.includes('spices') && !selectedSubCategories.includes('Chemical');
                      return (
                        <div
                          onClick={() => toggleCategorySelection('spices')}
                          style={{
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: isSel ? 600 : 400,
                            color: isSel ? '#111111' : '#777777',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              width: '15px',
                              height: '15px',
                              borderRadius: '2px',
                              border: isSel ? 'none' : '1px solid #D1D5DB',
                              background: isSel ? '#222222' : '#EAEAEA',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {isSel && <Check size={11} color="#FFFFFF" strokeWidth={3.5} />}
                          </div>
                          <span>Spices (4)</span>
                        </div>
                      );
                    })()}
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
                          style={{
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: isChecked ? 600 : 400,
                            color: isChecked ? '#111111' : '#777777',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              width: '15px',
                              height: '15px',
                              borderRadius: '2px',
                              border: isChecked ? 'none' : '1px solid #D1D5DB',
                              background: isChecked ? '#222222' : '#EAEAEA',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {isChecked && <Check size={11} color="#FFFFFF" strokeWidth={3.5} />}
                          </div>
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
              <div style={{ paddingBottom: '16px' }}>
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
                          style={{
                            cursor: 'pointer',
                            fontSize: '0.88rem',
                            fontWeight: isChecked ? 600 : 400,
                            color: isChecked ? '#111111' : '#777777',
                            display: 'flex',
                            alignItems: 'center',
                            gap: '8px'
                          }}
                        >
                          <div
                            style={{
                              width: '15px',
                              height: '15px',
                              borderRadius: '2px',
                              border: isChecked ? 'none' : '1px solid #D1D5DB',
                              background: isChecked ? '#222222' : '#EAEAEA',
                              display: 'flex',
                              alignItems: 'center',
                              justifyContent: 'center',
                              flexShrink: 0
                            }}
                          >
                            {isChecked && <Check size={11} color="#FFFFFF" strokeWidth={3.5} />}
                          </div>
                          <span>{priceItem.label}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </aside>

            {/* Right Product Grid Area */}
            <div>
              {/* Active Filter Chips */}
              {hasActiveFilters && (
                <div style={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: '8px', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.82rem', color: '#6B7280', fontWeight: 600 }}>Active Filters:</span>
                  {selectedCategories.map((c) => (
                    <span
                      key={c}
                      onClick={() => toggleCategorySelection(c)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#F0FDF4',
                        border: '1px solid #BBF7D0',
                        color: '#15803D',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {c} <X size={12} />
                    </span>
                  ))}
                  {selectedSubCategories.map((s) => (
                    <span
                      key={s}
                      onClick={() => toggleCategorySelection('', s)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#F0FDF4',
                        border: '1px solid #BBF7D0',
                        color: '#15803D',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      {s} <X size={12} />
                    </span>
                  ))}
                  {selectedTypes.map((t) => (
                    <span
                      key={t}
                      onClick={() => toggleType(t)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#EFF6FF',
                        border: '1px solid #BFDBFE',
                        color: '#1D4ED8',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Type: {t} <X size={12} />
                    </span>
                  ))}
                  {selectedSize !== 'all' && (
                    <span
                      onClick={() => setSelectedSize('all')}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#FEF3C7',
                        border: '1px solid #FDE68A',
                        color: '#B45309',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      Size: {selectedSize} <X size={12} />
                    </span>
                  )}
                  {selectedPrices.map((p) => (
                    <span
                      key={p}
                      onClick={() => togglePrice(p)}
                      style={{
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '6px',
                        background: '#F3E8FF',
                        border: '1px solid #E9D5FF',
                        color: '#7E22CE',
                        padding: '4px 10px',
                        borderRadius: '20px',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        cursor: 'pointer'
                      }}
                    >
                      ₹{p} <X size={12} />
                    </span>
                  ))}
                  <button
                    onClick={resetAllFilters}
                    style={{
                      background: 'none',
                      border: 'none',
                      color: '#6B7280',
                      fontSize: '0.8rem',
                      fontWeight: 600,
                      cursor: 'pointer',
                      textDecoration: 'underline',
                      marginLeft: '4px'
                    }}
                  >
                    Clear All
                  </button>
                </div>
              )}

              {/* 3-Column Product Grid */}
              {filteredProducts.length > 0 ? (
                <div className="shop-products-grid">
                  {filteredProducts.map((p) => (
                    <ProductCard
                      key={p.id}
                      product={p}
                      onSelectProduct={onSelectProduct}
                      onAddToCart={onAddToCart}
                      onUpdateCartQty={onUpdateCartQty}
                      cartQty={cartQuantities[p.id] || 0}
                      isWishlisted={wishlistIds.includes(p.id)}
                      onToggleWishlist={onToggleWishlist}
                      onQuickView={(prod) => setModalProduct(prod)}
                    />
                  ))}
                </div>
              ) : (
                <div
                  style={{
                    background: '#FAF8F5',
                    border: '1px dashed #D1D5DB',
                    borderRadius: '16px',
                    padding: '60px 20px',
                    textAlign: 'center'
                  }}
                >
                  <div style={{ fontSize: '3rem', marginBottom: '16px' }}>🍃</div>
                  <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#111827', marginBottom: '8px' }}>
                    No Products Found
                  </h3>
                  <p style={{ color: '#6B7280', fontSize: '0.95rem', maxWidth: '420px', margin: '0 auto 20px auto' }}>
                    We couldn't find any products matching your selected filters or search terms.
                  </p>
                  <button
                    className="btn btn-primary"
                    onClick={resetAllFilters}
                    style={{ padding: '10px 24px', fontSize: '0.92rem' }}
                  >
                    Reset All Filters
                  </button>
                </div>
              )}
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
              <img
                src={modalProduct.gallery && modalProduct.gallery.length > 0 && modalProduct.gallery[0] ? modalProduct.gallery[0] : modalProduct.image}
                alt={modalProduct.name}
                style={{ width: '100%', height: '100%', objectFit: 'contain' }}
              />
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

