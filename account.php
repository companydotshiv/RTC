<?php
/**
 * RTC Foods - User Account & Order Tracking
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$pageTitle = 'My Account & Order Tracking';
$orders = $_SESSION['user_orders'] ?? [];

$trackedOrder = null;
$searchOrderId = clean_input($_GET['track_id'] ?? '');
if (!empty($searchOrderId)) {
    foreach ($orders as $ord) {
        if (strtoupper($ord['id']) === strtoupper($searchOrderId)) {
            $trackedOrder = $ord;
            break;
        }
    }
}

include __DIR__ . '/includes/header.php';
?>

<div class="account-page-section">
  <div class="site-container">
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current">My Account</span>
    </div>

    <h1 class="page-title">My Account & Order Tracking</h1>

    <!-- Order Tracking Search Box -->
    <div class="track-order-card">
      <div class="track-order-header">
        <i data-lucide="truck" class="gold-icon"></i>
        <div>
          <h3>Track Your Consignment</h3>
          <p>Enter your RTC Order ID to see real-time shipment status and dispatch updates.</p>
        </div>
      </div>

      <form method="GET" action="<?php echo url('account.php'); ?>" class="track-order-form">
        <div class="track-input-group">
          <input type="text" name="track_id" placeholder="e.g. RTC-20260907-XXXX" value="<?php echo htmlspecialchars($searchOrderId); ?>" required />
          <button type="submit" class="btn-primary-gold">Track Order</button>
        </div>
      </form>

      <?php if (!empty($searchOrderId)): ?>
        <div class="track-result-box">
          <?php if ($trackedOrder): ?>
            <div class="track-status-header">
              <span class="status-badge status-confirmed">Status: <?php echo htmlspecialchars($trackedOrder['status']); ?></span>
              <span>Estimated Delivery: <strong><?php echo htmlspecialchars($trackedOrder['estimated_delivery']); ?></strong></span>
            </div>

            <!-- Tracking Timeline -->
            <div class="tracking-timeline">
              <div class="timeline-step completed">
                <div class="step-circle"><i data-lucide="check"></i></div>
                <div class="step-label">Order Confirmed</div>
              </div>
              <div class="timeline-step completed">
                <div class="step-circle"><i data-lucide="package"></i></div>
                <div class="step-label">Hygienically Packed</div>
              </div>
              <div class="timeline-step active">
                <div class="step-circle"><i data-lucide="truck"></i></div>
                <div class="step-label">Dispatched for Delivery</div>
              </div>
              <div class="timeline-step">
                <div class="step-circle"><i data-lucide="home"></i></div>
                <div class="step-label">Delivered</div>
              </div>
            </div>
          <?php else: ?>
            <div class="alert-box alert-error">
              No matching active order found for ID "<strong><?php echo htmlspecialchars($searchOrderId); ?></strong>". Please verify your order number.
            </div>
          <?php endif; ?>
        </div>
      <?php endif; ?>
    </div>

    <!-- Past Orders List -->
    <div class="past-orders-section">
      <h2 class="section-title">Your Recent Orders (<?php echo count($orders); ?>)</h2>

      <?php if (empty($orders)): ?>
        <div class="empty-state-box text-center">
          <div class="empty-icon"><i data-lucide="package"></i></div>
          <p>You haven't placed any orders in this session yet.</p>
          <a href="<?php echo url('products.php'); ?>" class="btn-primary-gold">Explore Products</a>
        </div>
      <?php else: ?>
        <div class="orders-list">
          <?php foreach ($orders as $ord): ?>
            <div class="account-order-card">
              <div class="order-card-header">
                <div>
                  <strong>Order #<?php echo htmlspecialchars($ord['id']); ?></strong>
                  <span class="order-date-text"><?php echo htmlspecialchars($ord['date']); ?></span>
                </div>
                <span class="status-badge status-confirmed"><?php echo htmlspecialchars($ord['status']); ?></span>
              </div>

              <div class="order-card-body">
                <div class="order-items-preview">
                  <?php foreach ($ord['items'] as $it): ?>
                    <div class="preview-item">
                      <img src="<?php echo asset($it['image']); ?>" alt="<?php echo htmlspecialchars($it['name']); ?>" class="preview-thumb" />
                      <div>
                        <span><?php echo htmlspecialchars($it['name']); ?></span>
                        <small><?php echo htmlspecialchars($it['weight'] ?? '250g'); ?> &times; <?php echo (int)$it['quantity']; ?></small>
                      </div>
                    </div>
                  <?php endforeach; ?>
                </div>

                <div class="order-card-footer">
                  <div class="order-total-info">
                    <span>Total Paid:</span>
                    <strong class="gold-text"><?php echo format_price($ord['total']); ?></strong>
                  </div>
                  <a href="<?php echo url('order-confirmation.php?order_id=' . urlencode($ord['id'])); ?>" class="btn-view-invoice">View Full Receipt</a>
                </div>
              </div>
            </div>
          <?php endforeach; ?>
        </div>
      <?php endif; ?>
    </div>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
