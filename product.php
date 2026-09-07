<?php
/**
 * RTC Foods - Product Detail Page
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$slug = clean_input($_GET['slug'] ?? $_GET['id'] ?? '');
$product = get_product_by_slug($slug);

if (!$product) {
    http_response_code(404);
    $pageTitle = 'Product Not Found';
    include __DIR__ . '/includes/header.php';
    ?>
    <div class="site-container page-padding text-center">
      <div class="empty-state-box">
        <i data-lucide="alert-circle" class="large-icon text-gold"></i>
        <h2>Product Not Found</h2>
        <p>Sorry, the product you are looking for does not exist or has been relocated.</p>
        <a href="<?php echo url('products.php'); ?>" class="btn-primary-gold">Browse Catalog</a>
      </div>
    </div>
    <?php
    include __DIR__ . '/includes/footer.php';
    exit;
}

$pageTitle = $product['name'] . ' - Buy Online | RTC Foods';
$pageDescription = $product['shortDesc'] ?? 'Shop ' . $product['name'] . ' online at best price with fast delivery across India.';

$inWishlist = is_in_wishlist($product['id']);
$allProducts = get_all_products();
$relatedProducts = array_filter($allProducts, function($p) use ($product) {
    return ($p['category'] ?? '') === ($product['category'] ?? '') && $p['id'] !== $product['id'];
});
$relatedProducts = array_slice($relatedProducts, 0, 4);

$gallery = !empty($product['gallery']) ? $product['gallery'] : [$product['image']];
$defaultWeight = $product['weights'][0] ?? '250g';

include __DIR__ . '/includes/header.php';
?>

<div class="product-detail-page">
  <div class="site-container">
    <!-- Breadcrumbs -->
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <a href="<?php echo url('products.php'); ?>">Products</a>
      <span class="crumb-separator">/</span>
      <a href="<?php echo url('products.php?category=' . urlencode($product['category'])); ?>"><?php echo htmlspecialchars($product['categoryName'] ?? 'Dry Fruits'); ?></a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current"><?php echo htmlspecialchars($product['name']); ?></span>
    </div>

    <!-- Main Product Layout Grid -->
    <div class="product-main-grid">
      <!-- Media Gallery Column -->
      <div class="product-gallery-col">
        <div class="main-image-viewport">
          <img id="pdp-main-image" src="<?php echo asset($gallery[0]); ?>" alt="<?php echo htmlspecialchars($product['name']); ?>" />
          <?php if (!empty($product['badge'])): ?>
            <span class="product-badge pdp-badge <?php echo strtolower(str_replace(' ', '-', $product['badge'])); ?>">
              <?php echo htmlspecialchars($product['badge']); ?>
            </span>
          <?php endif; ?>
        </div>

        <?php if (count($gallery) > 1): ?>
          <div class="gallery-thumbs-row">
            <?php foreach ($gallery as $idx => $img): ?>
              <button type="button" class="thumb-btn <?php echo $idx === 0 ? 'active' : ''; ?>" onclick="switchPdpImage('<?php echo asset($img); ?>', this)">
                <img src="<?php echo asset($img); ?>" alt="Thumbnail <?php echo $idx + 1; ?>" />
              </button>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>
      </div>

      <!-- Product Information Column -->
      <div class="product-info-col">
        <div class="pdp-meta-row">
          <span class="pdp-category-tag"><?php echo htmlspecialchars($product['categoryName'] ?? 'Dry Fruits & Nuts'); ?></span>
          <div class="product-rating">
            <i data-lucide="star" class="star-filled"></i>
            <span><?php echo number_format((float)($product['rating'] ?? 4.9), 1); ?></span>
            <span class="reviews-count">(<?php echo (int)($product['reviewsCount'] ?? 10); ?> verified reviews)</span>
          </div>
        </div>

        <h1 class="pdp-product-title"><?php echo htmlspecialchars($product['name']); ?></h1>

        <div class="pdp-price-row">
          <span class="pdp-current-price" id="pdp-price-display"><?php echo format_price($product['price']); ?></span>
          <?php if (!empty($product['originalPrice']) && $product['originalPrice'] > $product['price']): ?>
            <span class="pdp-original-price"><?php echo format_price($product['originalPrice']); ?></span>
            <span class="pdp-discount-badge">Save <?php echo round((($product['originalPrice'] - $product['price']) / $product['originalPrice']) * 100); ?>%</span>
          <?php endif; ?>
          <span class="tax-inclusive-tag">Inclusive of all taxes</span>
        </div>

        <p class="pdp-short-desc"><?php echo htmlspecialchars($product['shortDesc'] ?? ''); ?></p>

        <!-- Weight Variants Selection -->
        <?php if (!empty($product['weights'])): ?>
          <div class="pdp-variant-section">
            <label class="variant-label">Select Pack Size:</label>
            <div class="weight-pills-group" id="weight-selector-group">
              <?php foreach ($product['weights'] as $wIdx => $w): ?>
                <button type="button" 
                        class="weight-pill <?php echo $wIdx === 0 ? 'active' : ''; ?>" 
                        data-weight="<?php echo htmlspecialchars($w); ?>"
                        data-base-price="<?php echo $product['price']; ?>"
                        onclick="selectWeightVariant('<?php echo htmlspecialchars($w); ?>', this)">
                  <?php echo htmlspecialchars($w); ?>
                </button>
              <?php endforeach; ?>
            </div>
          </div>
        <?php endif; ?>

        <!-- Quantity & Add to Cart Controls -->
        <div class="pdp-purchase-row">
          <div class="pdp-qty-control">
            <button type="button" class="pdp-qty-btn" onclick="changePdpQty(-1)">-</button>
            <input type="number" id="pdp-qty-input" value="1" min="1" max="50" readonly />
            <button type="button" class="pdp-qty-btn" onclick="changePdpQty(1)">+</button>
          </div>

          <button type="button" class="btn-pdp-add-cart" onclick="executePdpAddToCart(false)">
            <i data-lucide="shopping-bag"></i> Add to Cart
          </button>

          <button type="button" class="btn-pdp-buy-now" onclick="executePdpAddToCart(true)">
            Buy Now
          </button>

          <button type="button" class="btn-wishlist-toggle pdp-wishlist-btn <?php echo $inWishlist ? 'active' : ''; ?>" data-product-id="<?php echo $product['id']; ?>" aria-label="Wishlist">
            <i data-lucide="heart"></i>
          </button>
        </div>

        <!-- Trust Badges Bar -->
        <div class="pdp-trust-bar">
          <div class="trust-item"><i data-lucide="shield-check"></i> 100% Genuine Quality</div>
          <div class="trust-item"><i data-lucide="truck"></i> Free Shipping > ₹499</div>
          <div class="trust-item"><i data-lucide="refresh-cw"></i> 7-Day Easy Replacement</div>
        </div>

        <!-- Highlights Bullets -->
        <?php if (!empty($product['bullets'])): ?>
          <div class="pdp-highlights-box">
            <h4>Highlights & Key Benefits:</h4>
            <ul class="pdp-bullets-list">
              <?php foreach ($product['bullets'] as $b): ?>
                <li>
                  <strong><?php echo htmlspecialchars($b['title'] ?? ''); ?>:</strong>
                  <span><?php echo htmlspecialchars($b['text'] ?? ''); ?></span>
                </li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endif; ?>
      </div>
    </div>

    <!-- Product Details Tabs Section -->
    <div class="pdp-tabs-section">
      <div class="pdp-tab-nav">
        <button type="button" class="pdp-tab-btn active" onclick="switchPdpTab('tab-desc', this)">Detailed Description</button>
        <?php if (!empty($product['nutrition'])): ?>
          <button type="button" class="pdp-tab-btn" onclick="switchPdpTab('tab-nutrition', this)">Nutritional Facts</button>
        <?php endif; ?>
        <?php if (!empty($product['additionalInfoTable'])): ?>
          <button type="button" class="pdp-tab-btn" onclick="switchPdpTab('tab-specs', this)">Product Specifications</button>
        <?php endif; ?>
        <button type="button" class="pdp-tab-btn" onclick="switchPdpTab('tab-reviews', this)">Customer Reviews (<?php echo count($product['reviews'] ?? []); ?>)</button>
      </div>

      <div class="pdp-tab-content">
        <!-- Description Tab -->
        <div class="pdp-tab-panel active" id="tab-desc">
          <div class="pdp-desc-text">
            <p><?php echo nl2br(htmlspecialchars($product['description'] ?? '')); ?></p>
            <?php if (!empty($product['paragraphs'])): ?>
              <?php foreach ($product['paragraphs'] as $para): ?>
                <p><?php echo htmlspecialchars($para); ?></p>
              <?php endforeach; ?>
            <?php endif; ?>
          </div>
        </div>

        <!-- Nutrition Tab -->
        <?php if (!empty($product['nutrition'])): ?>
          <div class="pdp-tab-panel" id="tab-nutrition" style="display:none;">
            <table class="pdp-spec-table">
              <thead>
                <tr>
                  <th>Nutrient</th>
                  <th>Value Per 100g</th>
                </tr>
              </thead>
              <tbody>
                <?php foreach ($product['nutrition'] as $k => $v): ?>
                  <tr>
                    <td><strong><?php echo htmlspecialchars($k); ?></strong></td>
                    <td><?php echo htmlspecialchars($v); ?></td>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        <?php endif; ?>

        <!-- Specifications Tab -->
        <?php if (!empty($product['additionalInfoTable'])): ?>
          <div class="pdp-tab-panel" id="tab-specs" style="display:none;">
            <table class="pdp-spec-table">
              <tbody>
                <?php foreach ($product['additionalInfoTable'] as $info): ?>
                  <tr>
                    <td class="spec-label"><?php echo htmlspecialchars($info['label'] ?? ''); ?></td>
                    <td class="spec-value"><?php echo htmlspecialchars($info['value'] ?? ''); ?></td>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>
        <?php endif; ?>

        <!-- Reviews Tab -->
        <div class="pdp-tab-panel" id="tab-reviews" style="display:none;">
          <div class="reviews-list">
            <?php if (!empty($product['reviews'])): ?>
              <?php foreach ($product['reviews'] as $rev): ?>
                <div class="review-item">
                  <div class="review-header">
                    <strong><?php echo htmlspecialchars($rev['name']); ?></strong>
                    <span class="review-verified"><i data-lucide="check-circle"></i> Verified Buyer</span>
                    <span class="review-date"><?php echo htmlspecialchars($rev['date']); ?></span>
                  </div>
                  <div class="review-stars">
                    <?php for ($i = 0; $i < (int)$rev['rating']; $i++): ?>★<?php endfor; ?>
                  </div>
                  <h4 class="review-title"><?php echo htmlspecialchars($rev['title']); ?></h4>
                  <p class="review-text"><?php echo htmlspecialchars($rev['text']); ?></p>
                </div>
              <?php endforeach; ?>
            <?php else: ?>
              <p>No reviews yet. Be the first to review this product!</p>
            <?php endif; ?>
          </div>
        </div>
      </div>
    </div>

    <!-- Related Products -->
    <?php if (count($relatedProducts) > 0): ?>
      <section class="related-products-section">
        <h2 class="section-title">You May Also Like</h2>
        <div class="products-grid">
          <?php foreach ($relatedProducts as $p): ?>
            <?php include __DIR__ . '/includes/product-card.php'; ?>
          <?php endforeach; ?>
        </div>
      </section>
    <?php endif; ?>
  </div>
</div>

<script>
  let selectedWeight = '<?php echo $defaultWeight; ?>';
  const basePrice = <?php echo (float)$product['price']; ?>;

  function switchPdpImage(src, btn) {
    document.getElementById('pdp-main-image').src = src;
    document.querySelectorAll('.thumb-btn').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');
  }

  function selectWeightVariant(weight, btn) {
    selectedWeight = weight;
    document.querySelectorAll('.weight-pill').forEach(b => b.classList.remove('active'));
    btn.classList.add('active');

    let multiplier = 1;
    if (weight === '500g') multiplier = 1.95;
    else if (weight === '1kg') multiplier = 3.8;

    const newPrice = (basePrice * multiplier).toFixed(2);
    document.getElementById('pdp-price-display').textContent = '₹' + Number(newPrice).toLocaleString('en-IN', { minimumFractionDigits: 2 });
  }

  function changePdpQty(delta) {
    const input = document.getElementById('pdp-qty-input');
    let val = parseInt(input.value, 10) + delta;
    if (val < 1) val = 1;
    if (val > 50) val = 50;
    input.value = val;
  }

  function executePdpAddToCart(isBuyNow = false) {
    const qty = parseInt(document.getElementById('pdp-qty-input').value, 10);
    const productId = <?php echo $product['id']; ?>;

    const formData = new FormData();
    formData.append('product_id', productId);
    formData.append('quantity', qty);
    formData.append('weight', selectedWeight);

    const apiUrl = '<?php echo url("includes/api.php?action=add_to_cart"); ?>';

    fetch(apiUrl, { method: 'POST', body: formData })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          if (isBuyNow) {
            window.location.href = '<?php echo url("checkout.php"); ?>';
          } else {
            window.showToast(data.message || 'Added to cart!', 'success');
            if (typeof window.openCartDrawer === 'function') {
              window.openCartDrawer();
            }
          }
        }
      });
  }

  function switchPdpTab(tabId, btn) {
    document.querySelectorAll('.pdp-tab-btn').forEach(b => b.classList.remove('active'));
    document.querySelectorAll('.pdp-tab-panel').forEach(p => p.style.display = 'none');
    btn.classList.add('active');
    const target = document.getElementById(tabId);
    if (target) target.style.display = 'block';
  }
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
