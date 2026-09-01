import React from 'react';
import type { Product } from '../types/product';
import { ShoppingBag, Minus, Plus, Star } from 'lucide-react';

interface ProductCardProps {
  product: Product;
  onSelectProduct: (product: Product) => void;
  onAddToCart?: (productId: number, qty?: number) => void;
  onUpdateCartQty?: (productId: number, qty: number) => void;
  cartQty?: number;
  isWishlisted?: boolean;
  onToggleWishlist?: (productId: number) => void;
  onQuickView?: (product: Product) => void;
}

const getCategoryTheme = (category: string = '', catName: string = '') => {
  const text = `${category} ${catName}`.toLowerCase();
  if (text.includes('seed') || text.includes('chia') || text.includes('flax') || text.includes('pumpkin')) {
    return {
      themeClass: 'theme-seeds',
      accentColor: '#15803D',
      badgeBg: '#ECFDF5',
      badgeColor: '#047857',
      badgeBorder: 'rgba(5, 150, 105, 0.2)',
      imgBg: 'radial-gradient(circle at 50% 50%, #FFFFFF 30%, #F0FDF4 100%)',
      topBar: 'linear-gradient(90deg, #15803D, #34D399)'
    };
  }
  if (text.includes('dehydrated') || text.includes('berry') || text.includes('cranberr') || text.includes('kiwi') || text.includes('fruit')) {
    return {
      themeClass: 'theme-fruits',
      accentColor: '#D97706',
      badgeBg: '#FFF7ED',
      badgeColor: '#C2410C',
      badgeBorder: 'rgba(234, 88, 12, 0.2)',
      imgBg: 'radial-gradient(circle at 50% 50%, #FFFFFF 30%, #FFF7ED 100%)',
      topBar: 'linear-gradient(90deg, #EA580C, #FDBA74)'
    };
  }
  if (text.includes('spice') || text.includes('herb') || text.includes('cardamom') || text.includes('clove')) {
    return {
      themeClass: 'theme-spices',
      accentColor: '#B45309',
      badgeBg: '#FFFBEB',
      badgeColor: '#92400E',
      badgeBorder: 'rgba(217, 119, 6, 0.2)',
      imgBg: 'radial-gradient(circle at 50% 50%, #FFFFFF 30%, #FFFBEB 100%)',
      topBar: 'linear-gradient(90deg, #D97706, #FCD34D)'
    };
  }
  if (text.includes('gift') || text.includes('box')) {
    return {
      themeClass: 'theme-gifting',
      accentColor: '#7C3AED',
      badgeBg: '#FAF5FF',
      badgeColor: '#6D28D9',
      badgeBorder: 'rgba(139, 92, 246, 0.2)',
      imgBg: 'radial-gradient(circle at 50% 50%, #FFFFFF 30%, #FAF5FF 100%)',
      topBar: 'linear-gradient(90deg, #8B5CF6, #C4B5FD)'
    };
  }
  // Default: Dry Fruits & Nuts
  return {
    themeClass: 'theme-dry-fruits',
    accentColor: '#15803D',
    badgeBg: '#F0FDF4',
    badgeColor: '#15803D',
    badgeBorder: 'rgba(21, 128, 61, 0.2)',
    imgBg: 'radial-gradient(circle at 50% 50%, #FFFFFF 30%, #F4FBF6 100%)',
    topBar: 'linear-gradient(90deg, #15803D, #86EFAC)'
  };
};

export const ProductCard: React.FC<ProductCardProps> = ({
  product,
  onSelectProduct,
  onAddToCart,
  onUpdateCartQty,
  cartQty = 0
}) => {
  const firstImg = product.gallery && product.gallery.length > 0 && product.gallery[0]
    ? product.gallery[0]
    : product.image;
  const secondImg = product.gallery && product.gallery.length > 1
    ? product.gallery[1]
    : null;
  const isOutOfStock = !product.stock;
  const theme = getCategoryTheme(product.category, product.categoryName);

  return (
    <div className={`product-card-modern ${theme.themeClass}`} onClick={() => onSelectProduct(product)}>
      {/* Top Subtle Color Accent Line */}
      <div className="card-top-accent-line" style={{ background: theme.topBar }}></div>

      {/* Product Image Stage with Subtle Ambient Radial Glow */}
      <div className="product-card-img-wrap" style={{ background: theme.imgBg }}>
        {/* Badges */}
        {isOutOfStock && (
          <div className="product-card-badges">
            <span className="card-badge card-badge-danger">Out of Stock</span>
          </div>
        )}

        {/* Images */}
        <img
          src={firstImg}
          alt={product.name}
          className="product-card-main-img"
          style={{ opacity: product.stock ? 1 : 0.6 }}
        />
        {secondImg && (
          <img
            src={secondImg}
            alt={`${product.name} Preview`}
            className="product-card-hover-img"
            style={{ opacity: product.stock ? 1 : 0.6 }}
          />
        )}
      </div>

      {/* Card Info Details */}
      <div className="product-card-info">
        <div className="product-card-meta">
          <div className="product-card-rating">
            <Star size={11} fill="#F59E0B" color="#F59E0B" />
            <span className="rating-num">{product.rating ? product.rating.toFixed(1) : '4.9'}</span>
          </div>
        </div>

        <h3 className="product-card-title" title={product.name}>
          {product.name}
        </h3>

        <div className="product-card-footer">
          <div className="product-card-price-block">
            <span className="product-card-price">
              {product.priceDisplay ? product.priceDisplay : `₹${product.price.toFixed(2)}`}
            </span>
            {product.weights && product.weights.length > 1 && (
              <span className="product-card-subtext">{product.weights.length} pack sizes</span>
            )}
          </div>

          {/* Animating Add to Cart Button */}
          {cartQty > 0 ? (
            <div
              className="product-card-qty-stepper"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                type="button"
                className="qty-step-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onUpdateCartQty) onUpdateCartQty(product.id, cartQty - 1);
                }}
                title="Decrease"
              >
                <Minus size={12} />
              </button>
              <span className="qty-step-val">{cartQty}</span>
              <button
                type="button"
                className="qty-step-btn"
                onClick={(e) => {
                  e.stopPropagation();
                  if (onAddToCart) onAddToCart(product.id, 1);
                }}
                title="Increase"
              >
                <Plus size={12} />
              </button>
            </div>
          ) : (
            <button
              type="button"
              className="product-card-quick-buy"
              onClick={(e) => {
                e.stopPropagation();
                if (onAddToCart) onAddToCart(product.id, 1);
              }}
              title="Add to Cart"
            >
              <ShoppingBag size={14} className="quick-buy-icon" />
              <span className="quick-buy-text">Add to Cart</span>
            </button>
          )}
        </div>
      </div>
    </div>
  );
};
