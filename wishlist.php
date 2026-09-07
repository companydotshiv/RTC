<?php
/**
 * RTC Foods - Wishlist Page
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$wishlistIds = get_wishlist();
$allProducts = get_all_products();

$wishlistProducts = array_filter($allProducts, function($p) use ($wishlistIds) {
    return in_array((int)$p['id'], $wishlistIds, true);
});

$pageTitle = 'My Wishlist (' . count($wishlistProducts) . ')';
include __DIR__ . '/includes/header.php';
?>

<div class="wishlist-page-section">
  <div class="site-container">
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current">My Wishlist</span>
    </div>

    <h1 class="page-title">My Wishlist (<span class="wishlist-count-badge"><?php echo count($wishlistProducts); ?></span>)</h1>

    <?php if (empty($wishlistProducts)): ?>
      <div class="empty-state-box text-center">
        <div class="empty-icon"><i data-lucide="heart"></i></div>
        <h2>Your Wishlist is Empty</h2>
        <p>Save your favorite healthy dry fruits and wholesome spices here to buy them later.</p>
        <a href="<?php echo url('products.php'); ?>" class="btn-primary-gold">Browse Products</a>
      </div>
    <?php else: ?>
      <div class="products-grid">
        <?php foreach ($wishlistProducts as $p): ?>
          <?php include __DIR__ . '/includes/product-card.php'; ?>
        <?php endforeach; ?>
      </div>
    <?php endif; ?>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
