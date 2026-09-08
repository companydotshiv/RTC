<?php
/**
 * RTC Foods - Full Shopping Cart Page
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$pageTitle = 'Shopping Cart';
$pageDescription = 'Review your selected dry fruits, spices, and gifting items before proceeding to secure checkout.';

$cart = get_cart();
$subtotal = get_cart_subtotal();
$appliedCoupon = $_SESSION['applied_coupon'] ?? null;
$discount = $appliedCoupon['discount'] ?? 0;
$shipping = ($subtotal >= 499 || ($appliedCoupon['type'] ?? '') === 'shipping') ? 0 : 50;
$total = max(0, $subtotal - $discount + ($subtotal > 0 ? $shipping : 0));

include __DIR__ . '/includes/header.php';
?>

<div class="cart-page-section">
  <div class="site-container">
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current">Shopping Cart</span>
    </div>

    <h1 class="page-title">Shopping Cart (<?php echo get_cart_count(); ?> items)</h1>

    <?php if (empty($cart)): ?>
      <div class="cart-empty-box text-center">
        <div class="empty-icon"><i data-lucide="shopping-bag"></i></div>
        <h2>Your Cart is Currently Empty</h2>
        <p>Explore our fresh harvest of California almonds, cashews, and Kashmiri walnuts!</p>
        <a href="<?php echo url('products.php'); ?>" class="btn-primary-gold">Start Shopping Now</a>
      </div>
    <?php else: ?>
      <div class="cart-page-grid">
        <!-- Cart Items Table -->
        <div class="cart-table-wrapper">
          <table class="cart-table">
            <thead>
              <tr>
                <th>Product</th>
                <th>Price</th>
                <th>Quantity</th>
                <th>Total</th>
                <th></th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($cart as $key => $item): ?>
                <?php $lineTotal = (float)$item['price'] * (int)$item['quantity']; ?>
                <tr class="cart-row" data-key="<?php echo htmlspecialchars($key); ?>">
                  <td class="cart-col-product">
                    <img src="<?php echo asset($item['image']); ?>" alt="<?php echo htmlspecialchars($item['name']); ?>" class="cart-product-img" />
                    <div>
                      <h3 class="cart-product-name"><a href="<?php echo product_url($item['slug'] ?? $item['id']); ?>"><?php echo htmlspecialchars($item['name']); ?></a></h3>
                      <span class="cart-product-weight">Pack Size: <?php echo htmlspecialchars($item['weight'] ?? '250g'); ?></span>
                    </div>
                  </td>
                  <td class="cart-col-price"><?php echo format_price($item['price']); ?></td>
                  <td class="cart-col-qty">
                    <div class="qty-control">
                      <button type="button" class="qty-btn" onclick="updatePageQty('<?php echo htmlspecialchars($key); ?>', <?php echo max(0, $item['quantity'] - 1); ?>)">-</button>
                      <span class="qty-val"><?php echo (int)$item['quantity']; ?></span>
                      <button type="button" class="qty-btn" onclick="updatePageQty('<?php echo htmlspecialchars($key); ?>', <?php echo $item['quantity'] + 1; ?>)">+</button>
                    </div>
                  </td>
                  <td class="cart-col-total font-bold"><?php echo format_price($lineTotal); ?></td>
                  <td class="cart-col-remove">
                    <button type="button" class="btn-table-remove" onclick="removePageItem('<?php echo htmlspecialchars($key); ?>')" title="Remove item">
                      <i data-lucide="trash-2"></i>
                    </button>
                  </td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>

          <div class="cart-table-footer-actions">
            <a href="<?php echo url('products.php'); ?>" class="btn-continue-shopping">
              <i data-lucide="arrow-left"></i> Continue Shopping
            </a>
          </div>
        </div>

        <!-- Cart Summary Sidebar -->
        <div class="cart-summary-sidebar">
          <div class="summary-card">
            <h3>Order Summary</h3>

            <!-- Coupon Input -->
            <div class="coupon-box">
              <label for="coupon-input">Have a Promo Code?</label>
              <div class="coupon-input-group">
                <input type="text" id="coupon-input" placeholder="e.g. WELCOME10" value="<?php echo htmlspecialchars($appliedCoupon['code'] ?? ''); ?>" />
                <button type="button" class="btn-apply-coupon" onclick="applyCouponCode()">Apply</button>
              </div>
              <?php if ($appliedCoupon): ?>
                <span class="coupon-applied-msg">✓ Coupon <strong><?php echo htmlspecialchars($appliedCoupon['code']); ?></strong> applied!</span>
              <?php endif; ?>
            </div>

            <div class="summary-rows-list">
              <div class="summary-line">
                <span>Items Subtotal:</span>
                <strong><?php echo format_price($subtotal); ?></strong>
              </div>

              <?php if ($discount > 0): ?>
                <div class="summary-line discount-line">
                  <span>Coupon Discount:</span>
                  <strong class="text-green">-<?php echo format_price($discount); ?></strong>
                </div>
              <?php endif; ?>

              <div class="summary-line">
                <span>Shipping:</span>
                <span>
                  <?php if ($shipping === 0): ?>
                    <span class="free-shipping-tag">FREE</span>
                  <?php else: ?>
                    <?php echo format_price($shipping); ?>
                  <?php endif; ?>
                </span>
              </div>

              <?php if ($subtotal < 499): ?>
                <p class="free-shipping-hint">Add <?php echo format_price(499 - $subtotal); ?> more to unlock <strong>FREE Shipping</strong>!</p>
              <?php endif; ?>

              <hr class="summary-divider" />

              <div class="summary-line grand-total-line">
                <span>Estimated Total:</span>
                <strong class="grand-total-amount gold-text"><?php echo format_price($total); ?></strong>
              </div>
            </div>

            <a href="<?php echo url('checkout.php'); ?>" class="btn-proceed-checkout">
              Proceed to Checkout <i data-lucide="arrow-right"></i>
            </a>

            <div class="secure-checkout-guarantee">
              <i data-lucide="lock"></i>
              <span>Guaranteed Safe & Secure Checkout</span>
            </div>
          </div>
        </div>
      </div>
    <?php endif; ?>
  </div>
</div>

<script>
  function updatePageQty(key, qty) {
    const formData = new FormData();
    formData.append('cart_key', key);
    formData.append('quantity', qty);

    fetch('<?php echo url("includes/api.php?action=update_qty"); ?>', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          window.location.reload();
        }
      });
  }

  function removePageItem(key) {
    const formData = new FormData();
    formData.append('cart_key', key);

    fetch('<?php echo url("includes/api.php?action=remove_from_cart"); ?>', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          window.location.reload();
        }
      });
  }

  function applyCouponCode() {
    const code = document.getElementById('coupon-input').value.trim();
    if (!code) return;

    const formData = new FormData();
    formData.append('code', code);

    fetch('<?php echo url("includes/api.php?action=apply_coupon"); ?>', {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(data => {
        if (data.success) {
          window.showToast(data.message, 'success');
          setTimeout(() => window.location.reload(), 600);
        } else {
          window.showToast(data.message, 'error');
        }
      });
  }
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
