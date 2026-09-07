<?php
/**
 * RTC Foods - Checkout Page
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$cart = get_cart();
if (empty($cart)) {
    header('Location: ' . url('cart.php'));
    exit;
}

$subtotal = get_cart_subtotal();
$appliedCoupon = $_SESSION['applied_coupon'] ?? null;
$discount = $appliedCoupon['discount'] ?? 0;
$shipping = ($subtotal >= 499 || ($appliedCoupon['type'] ?? '') === 'shipping') ? 0 : 50;
$total = max(0, $subtotal - $discount + $shipping);

$errors = [];

// Handle Form Submission
if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $fullName = clean_input($_POST['full_name'] ?? '');
    $phone = clean_input($_POST['phone'] ?? '');
    $email = clean_input($_POST['email'] ?? '');
    $address = clean_input($_POST['address'] ?? '');
    $city = clean_input($_POST['city'] ?? '');
    $state = clean_input($_POST['state'] ?? '');
    $pincode = clean_input($_POST['pincode'] ?? '');
    $paymentMethod = clean_input($_POST['payment_method'] ?? 'cod');

    if (empty($fullName)) $errors[] = 'Full name is required.';
    if (empty($phone) || strlen($phone) < 10) $errors[] = 'A valid 10-digit phone number is required.';
    if (empty($address)) $errors[] = 'Delivery address is required.';
    if (empty($city)) $errors[] = 'City is required.';
    if (empty($pincode) || strlen($pincode) !== 6) $errors[] = 'A valid 6-digit postal pincode is required.';

    if (empty($errors)) {
        $orderId = 'RTC-' . date('Ymd') . '-' . strtoupper(substr(uniqid(), -4));

        $orderData = [
            'id' => $orderId,
            'date' => date('d M Y, h:i A'),
            'customer' => [
                'name' => $fullName,
                'phone' => $phone,
                'email' => $email,
                'address' => $address,
                'city' => $city,
                'state' => $state,
                'pincode' => $pincode
            ],
            'items' => array_values($cart),
            'subtotal' => $subtotal,
            'discount' => $discount,
            'shipping' => $shipping,
            'total' => $total,
            'payment_method' => $paymentMethod,
            'status' => 'Confirmed',
            'estimated_delivery' => date('d M Y', strtotime('+4 days'))
        ];

        // Store order in session and local orders list
        $_SESSION['last_order'] = $orderData;
        if (!isset($_SESSION['user_orders'])) {
            $_SESSION['user_orders'] = [];
        }
        $_SESSION['user_orders'][] = $orderData;

        // Clear cart
        $_SESSION['cart'] = [];
        unset($_SESSION['applied_coupon']);

        header('Location: ' . url('order-confirmation.php?order_id=' . urlencode($orderId)));
        exit;
    }
}

$pageTitle = 'Secure Checkout';
include __DIR__ . '/includes/header.php';
?>

<div class="checkout-page-section">
  <div class="site-container">
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <a href="<?php echo url('cart.php'); ?>">Cart</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current">Checkout</span>
    </div>

    <h1 class="page-title">Secure Checkout</h1>

    <?php if (!empty($errors)): ?>
      <div class="alert-box alert-error">
        <ul>
          <?php foreach ($errors as $err): ?>
            <li><?php echo htmlspecialchars($err); ?></li>
          <?php endforeach; ?>
        </ul>
      </div>
    <?php endif; ?>

    <form method="POST" action="<?php echo url('checkout.php'); ?>" class="checkout-layout-grid">
      <!-- Shipping Form Column -->
      <div class="checkout-form-col">
        <!-- 1. Contact Information -->
        <div class="checkout-card">
          <h2 class="card-heading"><i data-lucide="user"></i> 1. Contact Information</h2>
          <div class="form-grid-2">
            <div class="form-group">
              <label for="full_name">Full Name *</label>
              <input type="text" id="full_name" name="full_name" required placeholder="e.g. Ramesh Kumar" value="<?php echo htmlspecialchars($_POST['full_name'] ?? ''); ?>" />
            </div>
            <div class="form-group">
              <label for="phone">Mobile Phone (for delivery SMS) *</label>
              <input type="tel" id="phone" name="phone" required placeholder="10-digit mobile number" maxlength="10" pattern="[0-9]{10}" value="<?php echo htmlspecialchars($_POST['phone'] ?? ''); ?>" />
            </div>
          </div>
          <div class="form-group">
            <label for="email">Email Address (for invoice receipt)</label>
            <input type="email" id="email" name="email" placeholder="ramesh@example.com" value="<?php echo htmlspecialchars($_POST['email'] ?? ''); ?>" />
          </div>
        </div>

        <!-- 2. Delivery Address -->
        <div class="checkout-card">
          <h2 class="card-heading"><i data-lucide="map-pin"></i> 2. Delivery Address</h2>
          <div class="form-group">
            <label for="address">Flat / House No. / Building / Street *</label>
            <textarea id="address" name="address" rows="3" required placeholder="Apartment / Road / Area"><?php echo htmlspecialchars($_POST['address'] ?? ''); ?></textarea>
          </div>
          <div class="form-grid-3">
            <div class="form-group">
              <label for="city">City / District *</label>
              <input type="text" id="city" name="city" required placeholder="e.g. Ranchi / Delhi" value="<?php echo htmlspecialchars($_POST['city'] ?? ''); ?>" />
            </div>
            <div class="form-group">
              <label for="state">State *</label>
              <input type="text" id="state" name="state" required placeholder="e.g. Jharkhand" value="<?php echo htmlspecialchars($_POST['state'] ?? 'Jharkhand'); ?>" />
            </div>
            <div class="form-group">
              <label for="pincode">PIN Code *</label>
              <input type="text" id="pincode" name="pincode" required placeholder="6-digit PIN" maxlength="6" pattern="[0-9]{6}" value="<?php echo htmlspecialchars($_POST['pincode'] ?? ''); ?>" />
            </div>
          </div>
        </div>

        <!-- 3. Payment Option -->
        <div class="checkout-card">
          <h2 class="card-heading"><i data-lucide="credit-card"></i> 3. Payment Method</h2>
          <div class="payment-options-list">
            <label class="payment-option-label">
              <input type="radio" name="payment_method" value="cod" checked />
              <div class="payment-option-info">
                <strong>Cash on Delivery (COD)</strong>
                <span>Pay in cash or UPI when your parcel arrives.</span>
              </div>
            </label>

            <label class="payment-option-label">
              <input type="radio" name="payment_method" value="upi" />
              <div class="payment-option-info">
                <strong>Instant UPI / QR Code (GPay, PhonePe, Paytm)</strong>
                <span>Scan and pay instantly from any UPI application.</span>
              </div>
            </label>

            <label class="payment-option-label">
              <input type="radio" name="payment_method" value="online" />
              <div class="payment-option-info">
                <strong>Cards & Net Banking</strong>
                <span>Visa, Mastercard, RuPay, and all major Indian banks.</span>
              </div>
            </label>
          </div>
        </div>
      </div>

      <!-- Order Summary Column -->
      <div class="checkout-summary-col">
        <div class="summary-card sticky-card">
          <h3>Items in Order (<?php echo get_cart_count(); ?>)</h3>
          
          <div class="checkout-items-preview">
            <?php foreach ($cart as $item): ?>
              <div class="checkout-item-row">
                <img src="<?php echo asset($item['image']); ?>" alt="<?php echo htmlspecialchars($item['name']); ?>" class="checkout-item-thumb" />
                <div class="checkout-item-info">
                  <span class="checkout-item-title"><?php echo htmlspecialchars($item['name']); ?></span>
                  <span class="checkout-item-meta"><?php echo htmlspecialchars($item['weight'] ?? '250g'); ?> &times; <?php echo (int)$item['quantity']; ?></span>
                </div>
                <span class="checkout-item-total"><?php echo format_price((float)$item['price'] * (int)$item['quantity']); ?></span>
              </div>
            <?php endforeach; ?>
          </div>

          <hr class="summary-divider" />

          <div class="summary-rows-list">
            <div class="summary-line">
              <span>Subtotal:</span>
              <strong><?php echo format_price($subtotal); ?></strong>
            </div>

            <?php if ($discount > 0): ?>
              <div class="summary-line discount-line">
                <span>Discount:</span>
                <strong class="text-green">-<?php echo format_price($discount); ?></strong>
              </div>
            <?php endif; ?>

            <div class="summary-line">
              <span>Shipping:</span>
              <span><?php echo $shipping === 0 ? '<strong class="text-green">FREE</strong>' : format_price($shipping); ?></span>
            </div>

            <hr class="summary-divider" />

            <div class="summary-line grand-total-line">
              <span>Final Total to Pay:</span>
              <strong class="grand-total-amount gold-text"><?php echo format_price($total); ?></strong>
            </div>
          </div>

          <button type="submit" class="btn-place-order">
            <i data-lucide="check"></i> Place Order Now
          </button>

          <p class="terms-acknowledgement">
            By placing your order, you agree to RTC Foods' <a href="<?php echo url('policy.php?type=terms'); ?>" target="_blank">Terms of Service</a> and <a href="<?php echo url('policy.php?type=privacy'); ?>" target="_blank">Privacy Policy</a>.
          </p>
        </div>
      </div>
    </form>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
