<?php
/**
 * RTC Foods - Product Card Component
 * Expects $p to be a product array
 */
if (!isset($p) || empty($p)) return;

$inWishlist = is_in_wishlist($p['id']);
$productUrl = url('product.php?slug=' . urlencode($p['slug'] ?? $p['id']));
?>
<div class="product-card" data-product-id="<?php echo $p['id']; ?>">
  <div class="product-card-badge-wrap">
    <?php if (!empty($p['badge'])): ?>
      <span class="product-badge <?php echo strtolower(str_replace(' ', '-', $p['badge'])); ?>"><?php echo htmlspecialchars($p['badge']); ?></span>
    <?php endif; ?>
    <button type="button" class="btn-wishlist-toggle <?php echo $inWishlist ? 'active' : ''; ?>" data-product-id="<?php echo $p['id']; ?>" aria-label="Add to Wishlist" title="Save to Wishlist">
      <i data-lucide="heart"></i>
    </button>
  </div>

  <a href="<?php echo $productUrl; ?>" class="product-card-image-link">
    <img src="<?php echo asset($p['image']); ?>" alt="<?php echo htmlspecialchars($p['name']); ?>" class="product-card-img" loading="lazy" />
  </a>

  <div class="product-card-body">
    <div class="product-card-meta">
      <span class="product-category-tag"><?php echo htmlspecialchars($p['categoryName'] ?? 'Dry Fruits'); ?></span>
      <div class="product-rating">
        <i data-lucide="star" class="star-filled"></i>
        <span><?php echo number_format((float)($p['rating'] ?? 4.8), 1); ?></span>
        <span class="reviews-count">(<?php echo (int)($p['reviewsCount'] ?? 10); ?>)</span>
      </div>
    </div>

    <h3 class="product-card-title">
      <a href="<?php echo $productUrl; ?>"><?php echo htmlspecialchars($p['name']); ?></a>
    </h3>

    <?php if (!empty($p['shortDesc'])): ?>
      <p class="product-card-desc"><?php echo htmlspecialchars(mb_strimwidth($p['shortDesc'], 0, 75, '...')); ?></p>
    <?php endif; ?>

    <div class="product-card-footer">
      <div class="product-price-box">
        <span class="current-price"><?php echo format_price($p['price']); ?></span>
        <?php if (!empty($p['originalPrice']) && $p['originalPrice'] > $p['price']): ?>
          <span class="original-price"><?php echo format_price($p['originalPrice']); ?></span>
        <?php endif; ?>
      </div>

      <button type="button" class="btn-add-to-cart btn-cart-gold" data-product-id="<?php echo $p['id']; ?>" data-weight="<?php echo htmlspecialchars($p['weights'][0] ?? '250g'); ?>">
        <i data-lucide="shopping-bag"></i> Add
      </button>
    </div>
  </div>
</div>
