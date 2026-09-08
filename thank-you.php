<?php
/**
 * RTC Foods - Thank You / Order Success Page
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$orderId = clean_input($_GET['order_id'] ?? '');
$order   = $_SESSION['last_order'] ?? null;

// Try to find the order from session orders list on page refresh
if (!$order && !empty($orderId) && isset($_SESSION['user_orders'])) {
    foreach ($_SESSION['user_orders'] as $ord) {
        if ($ord['id'] === $orderId) {
            $order = $ord;
            break;
        }
    }
}

// Redirect away if no order in session
if (!$order) {
    header('Location: ' . url('index.php'));
    exit;
}

$pageTitle       = 'Order Confirmed — Thank You! | RTC Foods';
$pageDescription = 'Your order has been successfully placed. RTC Foods will dispatch your premium dry fruits and spices soon.';
include __DIR__ . '/includes/header.php';
?>

<div class="thankyou-page-wrap">
  <div class="thankyou-card">

    <!-- Animated success icon -->
    <div class="thankyou-icon-ring">
      <i data-lucide="check-circle"></i>
    </div>

    <span class="thankyou-badge">Order Confirmed</span>

    <h1 class="thankyou-title">Thank You for Your Order!</h1>

    <p class="thankyou-subtitle">
      We've received your order and our team is already preparing your premium quality
      dry fruits and spices with natural freshness. You'll receive updates via SMS.
    </p>

    <!-- Order ID display -->
    <div class="thankyou-order-id">
      Order #<?php echo htmlspecialchars($order['id']); ?>
    </div>

    <!-- Estimated delivery -->
    <div class="thankyou-delivery-badge">
      <i data-lucide="truck"></i>
      <span>Estimated Delivery: <strong><?php echo htmlspecialchars($order['estimated_delivery']); ?></strong></span>
    </div>

    <!-- Order summary mini table -->
    <div class="order-receipt-box text-left" style="margin-bottom:28px;">
      <h3>Items in Your Order</h3>
      <table class="receipt-table">
        <thead>
          <tr>
            <th>Item</th>
            <th>Pack</th>
            <th>Qty</th>
            <th class="text-right">Total</th>
          </tr>
        </thead>
        <tbody>
          <?php foreach ($order['items'] as $item): ?>
            <tr>
              <td><strong><?php echo htmlspecialchars($item['name']); ?></strong></td>
              <td><?php echo htmlspecialchars($item['weight'] ?? '250g'); ?></td>
              <td><?php echo (int)$item['quantity']; ?></td>
              <td class="text-right"><?php echo format_price((float)$item['price'] * (int)$item['quantity']); ?></td>
            </tr>
          <?php endforeach; ?>
        </tbody>
        <tfoot>
          <?php if ($order['discount'] > 0): ?>
            <tr>
              <td colspan="3" class="text-green">Discount:</td>
              <td class="text-right text-green">-<?php echo format_price($order['discount']); ?></td>
            </tr>
          <?php endif; ?>
          <tr>
            <td colspan="3">Shipping:</td>
            <td class="text-right"><?php echo $order['shipping'] === 0 ? '<strong class="text-green">FREE</strong>' : format_price($order['shipping']); ?></td>
          </tr>
          <tr class="receipt-total-row">
            <td colspan="3"><strong>Grand Total Paid:</strong></td>
            <td class="text-right gold-text"><strong><?php echo format_price($order['total']); ?></strong></td>
          </tr>
        </tfoot>
      </table>
    </div>

    <!-- Delivery address snippet -->
    <div style="background:#f8fafc;border:1px solid #e5e7eb;border-radius:10px;padding:16px 20px;margin-bottom:28px;text-align:left;font-size:0.88rem;">
      <strong style="font-size:0.78rem;text-transform:uppercase;letter-spacing:.05em;color:#6b7280;display:block;margin-bottom:8px;">Delivering To</strong>
      <span style="font-weight:600;"><?php echo htmlspecialchars($order['customer']['name']); ?></span><br>
      <?php echo nl2br(htmlspecialchars($order['customer']['address'])); ?>,
      <?php echo htmlspecialchars($order['customer']['city']); ?>,
      <?php echo htmlspecialchars($order['customer']['state']); ?> — <?php echo htmlspecialchars($order['customer']['pincode']); ?><br>
      <span style="color:#6b7280;">📞 <?php echo htmlspecialchars($order['customer']['phone']); ?></span>
    </div>

    <!-- Action buttons -->
    <div class="thankyou-actions">
      <a href="<?php echo url('products.php'); ?>" class="btn-primary-gold">
        <i data-lucide="shopping-bag"></i> Continue Shopping
      </a>
      <a href="<?php echo url('account.php'); ?>" class="btn-outline-gold">
        <i data-lucide="package"></i> Track My Order
      </a>
      <button type="button" class="btn-print-receipt" onclick="window.print()">
        <i data-lucide="printer"></i> Print Invoice
      </button>
    </div>

    <!-- Small reassurance -->
    <p style="margin-top:24px;font-size:0.8rem;color:#9ca3af;line-height:1.6;">
      Questions? Call us at <a href="tel:+919876543210" style="color:var(--brand-green);font-weight:600;">+91 98765 43210</a>
      or email <a href="mailto:care@rtcfoods.com" style="color:var(--brand-green);font-weight:600;">care@rtcfoods.com</a>
    </p>

  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
