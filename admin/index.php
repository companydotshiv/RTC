<?php
/**
 * RTC Foods - Admin Dashboard
 */
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../includes/data.php';

$isLoggedIn = require_admin();

$products = get_all_products();
$categories = get_all_categories();
$coupons = $GLOBALS['COUPONS'] ?? [];
$orders = $_SESSION['user_orders'] ?? [];

$activeTab = clean_input($_GET['tab'] ?? 'products');
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Admin Dashboard | <?php echo SITE_NAME; ?></title>
  <link rel="icon" type="image/svg+xml" href="<?php echo asset('favicon.svg'); ?>" />
  <link href="https://fonts.googleapis.com/css2?family=Jost:wght@400;500;600;700&display=swap" rel="stylesheet" />
  <script src="https://unpkg.com/lucide@latest"></script>
  <link rel="stylesheet" href="<?php echo asset('assets/css/style.css'); ?>" />
  <link rel="stylesheet" href="<?php echo asset('assets/css/admin.css'); ?>" />
  <style>
    body { background-color: #0d1610; color: #f0f3f1; font-family: 'Jost', sans-serif; }
    .admin-login-wrapper { min-height: 100vh; display: flex; align-items: center; justify-content: center; padding: 20px; }
    .admin-login-card { background: #16241a; border: 1px solid rgba(212, 175, 55, 0.3); border-radius: 16px; padding: 40px; width: 100%; max-width: 420px; box-shadow: 0 16px 40px rgba(0,0,0,0.5); }
    .admin-nav-bar { background: #121e15; border-bottom: 1px solid rgba(212, 175, 55, 0.2); padding: 16px 30px; display: flex; justify-content: space-between; align-items: center; }
    .admin-nav-logo { display: flex; align-items: center; gap: 12px; font-weight: 700; color: #F5A623; font-size: 1.25rem; }
    .admin-content-wrap { max-width: 1300px; margin: 30px auto; padding: 0 20px; }
    .stat-cards-grid { display: grid; grid-template-columns: repeat(auto-fit, minmax(220px, 1fr)); gap: 20px; margin-bottom: 30px; }
    .admin-stat-card { background: #16241a; border: 1px solid rgba(255,255,255,0.08); border-radius: 12px; padding: 24px; display: flex; align-items: center; gap: 16px; }
    .admin-stat-icon { width: 50px; height: 50px; border-radius: 12px; background: rgba(245, 166, 35, 0.15); color: #F5A623; display: flex; align-items: center; justify-content: center; font-size: 1.5rem; }
    .admin-tabs-nav { display: flex; gap: 10px; margin-bottom: 24px; border-bottom: 1px solid rgba(255,255,255,0.1); padding-bottom: 12px; }
    .admin-tab-btn { background: none; border: none; color: #8c9b90; padding: 10px 18px; border-radius: 8px; font-weight: 600; cursor: pointer; text-decoration: none; display: inline-flex; align-items: center; gap: 8px; }
    .admin-tab-btn.active, .admin-tab-btn:hover { background: rgba(245, 166, 35, 0.15); color: #F5A623; }
    .admin-data-card { background: #16241a; border: 1px solid rgba(255,255,255,0.08); border-radius: 16px; padding: 24px; overflow-x: auto; }
    .admin-table { width: 100%; border-collapse: collapse; font-size: 0.95rem; }
    .admin-table th { text-align: left; padding: 12px 16px; border-bottom: 2px solid rgba(255,255,255,0.1); color: #F5A623; }
    .admin-table td { padding: 14px 16px; border-bottom: 1px solid rgba(255,255,255,0.05); }
    .admin-product-thumb { width: 44px; height: 44px; object-fit: contain; border-radius: 8px; background: #fff; padding: 2px; }
    .badge-pill { padding: 4px 10px; border-radius: 20px; font-size: 0.8rem; font-weight: 600; display: inline-block; }
    .badge-pill.gold { background: rgba(245, 166, 35, 0.2); color: #F5A623; }
    .badge-pill.green { background: rgba(34, 197, 94, 0.2); color: #22c55e; }
  </style>
</head>
<body>

<?php if (!$isLoggedIn): ?>
  <!-- Admin Login Screen -->
  <div class="admin-login-wrapper">
    <div class="admin-login-card">
      <div class="text-center" style="margin-bottom: 24px;">
        <img src="<?php echo asset('rtc-logo-transparent.png'); ?>" alt="RTC" style="height: 50px; margin-bottom: 12px;" onerror="this.src='<?php echo asset('rtc-logo.png'); ?>'" />
        <h2>RTC Foods Admin</h2>
        <p style="color: #8c9b90; font-size: 0.9rem;">Enter administrative credentials to manage store.</p>
      </div>

      <?php if (!empty($loginError)): ?>
        <div style="background: rgba(239, 68, 68, 0.2); border: 1px solid #ef4444; color: #fca5a5; padding: 10px 14px; border-radius: 8px; margin-bottom: 20px; font-size: 0.9rem;">
          <?php echo htmlspecialchars($loginError); ?>
        </div>
      <?php endif; ?>

      <form method="POST" action="<?php echo url('admin/index.php'); ?>">
        <input type="hidden" name="admin_login" value="1" />
        <div style="margin-bottom: 16px;">
          <label style="display: block; margin-bottom: 6px; font-size: 0.9rem; color: #ccc;">Username</label>
          <input type="text" name="username" required value="admin" style="width: 100%; padding: 12px; border-radius: 8px; background: #0d1610; border: 1px solid rgba(255,255,255,0.15); color: #fff;" />
        </div>
        <div style="margin-bottom: 24px;">
          <label style="display: block; margin-bottom: 6px; font-size: 0.9rem; color: #ccc;">Password</label>
          <input type="password" name="password" required value="rtc@2026" style="width: 100%; padding: 12px; border-radius: 8px; background: #0d1610; border: 1px solid rgba(255,255,255,0.15); color: #fff;" />
        </div>
        <button type="submit" class="btn-primary-gold" style="width: 100%; padding: 14px; font-weight: 700;">Sign In to Dashboard</button>
      </form>

      <div style="margin-top: 20px; text-align: center;">
        <a href="<?php echo url('index.php'); ?>" style="color: #8c9b90; font-size: 0.85rem;">&larr; Return to Customer Store</a>
      </div>
    </div>
  </div>

<?php else: ?>
  <!-- Admin Dashboard Screen -->
  <nav class="admin-nav-bar">
    <div class="admin-nav-logo">
      <img src="<?php echo asset('rtc-logo-transparent.png'); ?>" alt="RTC" style="height: 36px;" onerror="this.src='<?php echo asset('rtc-logo.png'); ?>'" />
      <span>RTC Control Panel</span>
    </div>
    <div style="display: flex; align-items: center; gap: 16px;">
      <a href="<?php echo url('index.php'); ?>" target="_blank" style="color: #F5A623; display: flex; align-items: center; gap: 6px; font-size: 0.9rem;">
        <i data-lucide="external-link"></i> Live Store
      </a>
      <a href="<?php echo url('admin/index.php?action=logout'); ?>" style="background: rgba(239, 68, 68, 0.2); color: #ef4444; padding: 8px 14px; border-radius: 8px; font-size: 0.85rem; font-weight: 600; text-decoration: none;">
        Log Out
      </a>
    </div>
  </nav>

  <div class="admin-content-wrap">
    <!-- Stat Cards -->
    <div class="stat-cards-grid">
      <div class="admin-stat-card">
        <div class="admin-stat-icon"><i data-lucide="package"></i></div>
        <div>
          <strong style="font-size: 1.6rem; display: block;"><?php echo count($products); ?></strong>
          <span style="color: #8c9b90; font-size: 0.88rem;">Live Products</span>
        </div>
      </div>

      <div class="admin-stat-card">
        <div class="admin-stat-icon"><i data-lucide="layers"></i></div>
        <div>
          <strong style="font-size: 1.6rem; display: block;"><?php echo count($categories); ?></strong>
          <span style="color: #8c9b90; font-size: 0.88rem;">Catalog Categories</span>
        </div>
      </div>

      <div class="admin-stat-card">
        <div class="admin-stat-icon"><i data-lucide="tag"></i></div>
        <div>
          <strong style="font-size: 1.6rem; display: block;"><?php echo count($coupons); ?></strong>
          <span style="color: #8c9b90; font-size: 0.88rem;">Active Coupons</span>
        </div>
      </div>

      <div class="admin-stat-card">
        <div class="admin-stat-icon"><i data-lucide="shopping-cart"></i></div>
        <div>
          <strong style="font-size: 1.6rem; display: block;"><?php echo count($orders); ?></strong>
          <span style="color: #8c9b90; font-size: 0.88rem;">Customer Orders</span>
        </div>
      </div>
    </div>

    <!-- Navigation Tabs -->
    <div class="admin-tabs-nav">
      <a href="<?php echo url('admin/index.php?tab=products'); ?>" class="admin-tab-btn <?php echo $activeTab === 'products' ? 'active' : ''; ?>">
        <i data-lucide="package"></i> Products Catalog (<?php echo count($products); ?>)
      </a>
      <a href="<?php echo url('admin/index.php?tab=orders'); ?>" class="admin-tab-btn <?php echo $activeTab === 'orders' ? 'active' : ''; ?>">
        <i data-lucide="shopping-bag"></i> Orders (<?php echo count($orders); ?>)
      </a>
      <a href="<?php echo url('admin/index.php?tab=coupons'); ?>" class="admin-tab-btn <?php echo $activeTab === 'coupons' ? 'active' : ''; ?>">
        <i data-lucide="tag"></i> Promo Coupons (<?php echo count($coupons); ?>)
      </a>
    </div>

    <!-- Tab Contents -->
    <?php if ($activeTab === 'products'): ?>
      <div class="admin-data-card">
        <h3 style="margin-bottom: 20px; color: #fff;">Product Inventory</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Image</th>
              <th>Product Name</th>
              <th>Category</th>
              <th>SKU</th>
              <th>Price</th>
              <th>Pack Sizes</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($products as $p): ?>
              <tr>
                <td>
                  <img src="<?php echo asset($p['image']); ?>" alt="" class="admin-product-thumb" />
                </td>
                <td>
                  <strong><?php echo htmlspecialchars($p['name']); ?></strong>
                  <?php if (!empty($p['badge'])): ?>
                    <span class="badge-pill gold" style="margin-left: 8px;"><?php echo htmlspecialchars($p['badge']); ?></span>
                  <?php endif; ?>
                </td>
                <td><?php echo htmlspecialchars($p['categoryName'] ?? ''); ?></td>
                <td><code><?php echo htmlspecialchars($p['sku'] ?? 'RTC-N/A'); ?></code></td>
                <td><strong style="color: #F5A623;"><?php echo format_price($p['price']); ?></strong></td>
                <td><?php echo implode(', ', $p['weights'] ?? []); ?></td>
                <td>
                  <a href="<?php echo url('product.php?slug=' . urlencode($p['slug'])); ?>" target="_blank" style="color: #F5A623; font-size: 0.85rem;">View &rarr;</a>
                </td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>

    <?php elseif ($activeTab === 'orders'): ?>
      <div class="admin-data-card">
        <h3 style="margin-bottom: 20px; color: #fff;">Customer Orders</h3>
        <?php if (empty($orders)): ?>
          <p style="color: #8c9b90; padding: 20px 0;">No orders placed yet in this session. Orders submitted through the checkout page will appear here instantly.</p>
        <?php else: ?>
          <table class="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Date</th>
                <th>Customer</th>
                <th>Phone</th>
                <th>City</th>
                <th>Items</th>
                <th>Total</th>
                <th>Status</th>
              </tr>
            </thead>
            <tbody>
              <?php foreach ($orders as $ord): ?>
                <tr>
                  <td><strong><?php echo htmlspecialchars($ord['id']); ?></strong></td>
                  <td><?php echo htmlspecialchars($ord['date']); ?></td>
                  <td><?php echo htmlspecialchars($ord['customer']['name']); ?></td>
                  <td><?php echo htmlspecialchars($ord['customer']['phone']); ?></td>
                  <td><?php echo htmlspecialchars($ord['customer']['city']); ?></td>
                  <td><?php echo count($ord['items']); ?> items</td>
                  <td><strong style="color: #F5A623;"><?php echo format_price($ord['total']); ?></strong></td>
                  <td><span class="badge-pill green"><?php echo htmlspecialchars($ord['status']); ?></span></td>
                </tr>
              <?php endforeach; ?>
            </tbody>
          </table>
        <?php endif; ?>
      </div>

    <?php elseif ($activeTab === 'coupons'): ?>
      <div class="admin-data-card">
        <h3 style="margin-bottom: 20px; color: #fff;">Active Promo Coupons</h3>
        <table class="admin-table">
          <thead>
            <tr>
              <th>Coupon Code</th>
              <th>Type</th>
              <th>Discount Value</th>
              <th>Minimum Order</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            <?php foreach ($coupons as $code => $c): ?>
              <tr>
                <td><strong style="color: #F5A623; font-size: 1.1rem;"><?php echo htmlspecialchars($code); ?></strong></td>
                <td><?php echo ucfirst(htmlspecialchars($c['type'])); ?></td>
                <td><?php echo $c['type'] === 'percentage' ? $c['value'] . '%' : 'Free Shipping'; ?></td>
                <td><?php echo format_price($c['min_order']); ?></td>
                <td><?php echo htmlspecialchars($c['description']); ?></td>
                <td><span class="badge-pill green">Active</span></td>
              </tr>
            <?php endforeach; ?>
          </tbody>
        </table>
      </div>
    <?php endif; ?>
  </div>
<?php endif; ?>

<script>
  if (window.lucide) {
    window.lucide.createIcons();
  }
</script>
</body>
</html>
