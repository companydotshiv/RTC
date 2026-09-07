<?php
/**
 * RTC Foods - Order Confirmation Receipt Page
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$orderId = clean_input($_GET['order_id'] ?? '');
$order = $_SESSION['last_order'] ?? null;

// If user refreshed or came from direct link, look up in session orders
if (!$order && !empty($orderId) && isset($_SESSION['user_orders'])) {
    foreach ($_SESSION['user_orders'] as $ord) {
        if ($ord['id'] === $orderId) {
            $order = $ord;
            break;
        }
    }
}

if (!$order) {
    header('Location: ' . url('index.php'));
    exit;
}

$pageTitle = 'Order Confirmed - ' . $order['id'];
include __DIR__ . '/includes/header.php';
?>

<div class="order-confirmation-section">
  <div class="site-container">
    <div class="confirmation-card text-center">
      <div class="success-icon-wrap">
        <i data-lucide="check-circle" class="success-icon"></i>
      </div>

      <span class="confirmation-badge">Order Confirmed</span>
      <h1 class="confirmation-title">Thank You For Your Order!</h1>
      <p class="confirmation-subtitle">
        Your order <strong>#<?php echo htmlspecialchars($order['id']); ?></strong> has been received and is being prepared with natural freshness at our packaging facility.
      </p>

      <div class="order-quick-details-grid">
        <div class="quick-detail-item">
          <span class="detail-label">Order Number</span>
          <strong class="detail-val"><?php echo htmlspecialchars($order['id']); ?></strong>
        </div>
        <div class="quick-detail-item">
          <span class="detail-label">Date Placed</span>
          <strong class="detail-val"><?php echo htmlspecialchars($order['date']); ?></strong>
        </div>
        <div class="quick-detail-item">
          <span class="detail-label">Payment Method</span>
          <strong class="detail-val"><?php echo strtoupper(htmlspecialchars($order['payment_method'])); ?></strong>
        </div>
        <div class="quick-detail-item">
          <span class="detail-label">Estimated Delivery</span>
          <strong class="detail-val text-green"><?php echo htmlspecialchars($order['estimated_delivery']); ?></strong>
        </div>
      </div>

      <!-- Order Receipt Breakdown -->
      <div class="order-receipt-box text-left">
        <h3>Order Items</h3>
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
                <td>
                  <strong><?php echo htmlspecialchars($item['name']); ?></strong>
                </td>
                <td><?php echo htmlspecialchars($item['weight'] ?? '250g'); ?></td>
                <td><?php echo (int)$item['quantity']; ?></td>
                <td class="text-right"><?php echo format_price((float)$item['price'] * (int)$item['quantity']); ?></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
          <tfoot>
            <tr>
              <td colspan="3">Subtotal:</td>
              <td class="text-right"><?php echo format_price($order['subtotal']); ?></td>
            </tr>
            <?php if ($order['discount'] > 0): ?>
              <tr>
                <td colspan="3" class="text-green">Discount:</td>
                <td class="text-right text-green">-<?php echo format_price($order['discount']); ?></td>
              </tr>
            <?php endif; ?>
            <tr>
              <td colspan="3">Shipping:</td>
              <td class="text-right"><?php echo $order['shipping'] === 0 ? 'FREE' : format_price($order['shipping']); ?></td>
            </tr>
            <tr class="font-bold receipt-total-row">
              <td colspan="3">Grand Total:</td>
              <td class="text-right gold-text"><?php echo format_price($order['total']); ?></td>
            </tr>
          </tfoot>
        </table>

        <!-- Shipping Address -->
        <div class="receipt-address-box">
          <h4>Delivery Destination:</h4>
          <p>
            <strong><?php echo htmlspecialchars($order['customer']['name']); ?></strong><br />
            <?php echo nl2br(htmlspecialchars($order['customer']['address'])); ?><br />
            <?php echo htmlspecialchars($order['customer']['city']); ?>, <?php echo htmlspecialchars($order['customer']['state']); ?> - <?php echo htmlspecialchars($order['customer']['pincode']); ?><br />
            Phone: <?php echo htmlspecialchars($order['customer']['phone']); ?><br />
            Email: <?php echo htmlspecialchars($order['customer']['email']); ?>
          </p>
        </div>
      </div>

      <div class="confirmation-actions">
        <a href="<?php echo url('products.php'); ?>" class="btn-primary-gold">Continue Shopping</a>
        <a href="<?php echo url('account.php'); ?>" class="btn-outline-gold">View Order in Account</a>
        <button type="button" class="btn-print-receipt" onclick="window.print()"><i data-lucide="printer"></i> Print Invoice</button>
      </div>
    </div>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
