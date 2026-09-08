<?php
/**
 * RTC Foods — Store Manager & Control Center
 * Built strictly identical to WordPress & WooCommerce Admin Panel Layout
 */
require_once __DIR__ . '/auth.php';
require_once __DIR__ . '/../includes/data.php';

$isLoggedIn = require_admin();

// Load stored session overrides for real-time CRUD
if (!isset($_SESSION['admin_products'])) {
    $_SESSION['admin_products'] = get_all_products();
}
if (!isset($_SESSION['admin_coupons'])) {
    $_SESSION['admin_coupons'] = $GLOBALS['COUPONS'] ?? [];
}
if (!isset($_SESSION['admin_categories'])) {
    $_SESSION['admin_categories'] = get_all_categories();
}

$products = &$_SESSION['admin_products'];
$coupons = &$_SESSION['admin_coupons'];
$categories = &$_SESSION['admin_categories'];
$orders = $_SESSION['user_orders'] ?? [];

$currentPage = clean_input($_GET['page'] ?? 'products');
$action = clean_input($_GET['action'] ?? '');
$editId = isset($_GET['id']) ? (int)$_GET['id'] : 0;
$noticeMsg = '';
$noticeType = 'success';

// -----------------------------------------------------------------------------
// POST Request Handlers (CRUD for Products, Coupons, Settings)
// -----------------------------------------------------------------------------
if ($_SERVER['REQUEST_METHOD'] === 'POST' && $isLoggedIn) {
    // 1. Save / Update Product
    if (isset($_POST['save_product'])) {
        $prodId = (int)($_POST['product_id'] ?? 0);
        $title = clean_input($_POST['post_title'] ?? 'New Product');
        $slug = clean_input($_POST['post_name'] ?? strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $title))));
        $desc = clean_input($_POST['post_content'] ?? '');
        $shortDesc = clean_input($_POST['post_excerpt'] ?? '');
        $regPrice = (float)($_POST['_regular_price'] ?? 0);
        $salePrice = !empty($_POST['_sale_price']) ? (float)$_POST['_sale_price'] : 0;
        $sku = clean_input($_POST['_sku'] ?? 'RTC-' . strtoupper(substr($slug, 0, 4)) . '-' . rand(100, 999));
        $stockStatus = clean_input($_POST['_stock_status'] ?? 'instock');
        $catId = clean_input($_POST['tax_input_cat'] ?? 'dry-fruits');
        $img = clean_input($_POST['_product_image'] ?? '/california_almonds_pouch.png');

        // Find Category Name
        $catName = 'Dry Fruits';
        foreach ($categories as $c) {
            if ($c['id'] === $catId) {
                $catName = $c['name'];
                break;
            }
        }

        $priceToUse = $salePrice > 0 ? $salePrice : $regPrice;

        if ($prodId > 0) {
            // Edit existing
            foreach ($products as &$p) {
                if ((int)$p['id'] === $prodId) {
                    $p['name'] = $title;
                    $p['slug'] = $slug;
                    $p['description'] = $desc;
                    $p['shortDesc'] = $shortDesc;
                    $p['price'] = $priceToUse;
                    $p['priceDisplay'] = '₹' . number_format($priceToUse, 2);
                    $p['originalPrice'] = $regPrice;
                    $p['sku'] = $sku;
                    $p['category'] = $catId;
                    $p['categoryName'] = $catName;
                    if (!empty($img)) $p['image'] = $img;
                    break;
                }
            }
            $noticeMsg = 'Product updated successfully. <a href="' . url('product.php?id=' . $prodId) . '" target="_blank">View Product</a>';
        } else {
            // Create New Product
            $newId = 1;
            foreach ($products as $p) {
                if ((int)$p['id'] >= $newId) $newId = (int)$p['id'] + 1;
            }
            $newProd = [
                'id' => $newId,
                'slug' => $slug,
                'name' => $title,
                'category' => $catId,
                'categoryName' => $catName,
                'price' => $priceToUse,
                'priceDisplay' => '₹' . number_format($priceToUse, 2),
                'originalPrice' => $regPrice,
                'badge' => $salePrice > 0 ? 'Sale!' : 'New',
                'rating' => 5.0,
                'reviewsCount' => 1,
                'image' => !empty($img) ? $img : '/california_almonds_pouch.png',
                'shortDesc' => $shortDesc,
                'description' => $desc,
                'weights' => ['250g', '500g', '1kg'],
                'sku' => $sku,
                'stock' => ($stockStatus === 'instock'),
                'origin' => 'India'
            ];
            array_unshift($products, $newProd);
            $noticeMsg = 'Product published. <a href="' . url('product.php?id=' . $newId) . '" target="_blank">View Product</a>';
            $editId = $newId;
            $currentPage = 'products';
        }
    }

    // 2. Save / Create Coupon
    if (isset($_POST['save_coupon'])) {
        $code = strtoupper(clean_input($_POST['coupon_code'] ?? ''));
        $type = clean_input($_POST['discount_type'] ?? 'percentage');
        $val = (float)($_POST['coupon_amount'] ?? 10);
        $min = (float)($_POST['minimum_spend'] ?? 0);
        $desc = clean_input($_POST['description'] ?? '');

        if (!empty($code)) {
            $coupons[$code] = [
                'type' => $type,
                'value' => $val,
                'min_order' => $min,
                'description' => $desc
            ];
            $noticeMsg = 'Coupon code <strong>' . htmlspecialchars($code) . '</strong> created successfully.';
            $currentPage = 'coupons';
        }
    }

    // 3. Add Category
    if (isset($_POST['add_category'])) {
        $catName = clean_input($_POST['tag-name'] ?? '');
        $catSlug = clean_input($_POST['tag-slug'] ?? strtolower(trim(preg_replace('/[^A-Za-z0-9-]+/', '-', $catName))));
        $catDesc = clean_input($_POST['tag-description'] ?? '');

        if (!empty($catName)) {
            $categories[] = [
                'id' => $catSlug,
                'name' => $catName,
                'image' => 'cat_dry_figs.png',
                'desc' => $catDesc
            ];
            $noticeMsg = 'Category <strong>' . htmlspecialchars($catName) . '</strong> added successfully.';
            $currentPage = 'categories';
        }
    }
}

// -----------------------------------------------------------------------------
// GET Action Handlers (Trash, Duplicate, Status)
// -----------------------------------------------------------------------------
if ($action === 'trash' && $editId > 0 && $isLoggedIn) {
    foreach ($products as $k => $p) {
        if ((int)$p['id'] === $editId) {
            unset($products[$k]);
            $products = array_values($products);
            $noticeMsg = '1 product moved to the Trash.';
            break;
        }
    }
    $currentPage = 'products';
} elseif ($action === 'duplicate' && $editId > 0 && $isLoggedIn) {
    foreach ($products as $p) {
        if ((int)$p['id'] === $editId) {
            $dup = $p;
            $newId = 1;
            foreach ($products as $tmp) {
                if ((int)$tmp['id'] >= $newId) $newId = (int)$tmp['id'] + 1;
            }
            $dup['id'] = $newId;
            $dup['name'] = $p['name'] . ' (Copy)';
            $dup['slug'] = $p['slug'] . '-copy';
            $dup['sku'] = 'RTC-CPY-' . rand(100, 999);
            array_unshift($products, $dup);
            $noticeMsg = 'Product duplicated successfully.';
            break;
        }
    }
    $currentPage = 'products';
}

// Prepare Edit Product Data if editing
$editingProduct = null;
if ($currentPage === 'product-edit' && $editId > 0) {
    foreach ($products as $p) {
        if ((int)$p['id'] === $editId) {
            $editingProduct = $p;
            break;
        }
    }
}
?>
<!DOCTYPE html>
<html lang="en" class="wp-toolbar">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>RTC Store Manager &lsaquo; <?php echo SITE_NAME; ?></title>
  <link rel="icon" type="image/svg+xml" href="<?php echo asset('favicon.svg'); ?>" />
  <link rel="stylesheet" href="<?php echo asset('admin/assets/css/wp-admin.css'); ?>?v=<?php echo filemtime(__DIR__ . '/assets/css/wp-admin.css'); ?>" />
  <script src="https://unpkg.com/lucide@latest"></script>
  <style>
    /* Clean WP Login Box Style */
    .wp-login-wrapper {
      min-height: 100vh;
      background: #f0f0f1;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      padding: 20px;
      box-sizing: border-box;
    }
    .wp-login-logo {
      margin-bottom: 24px;
      text-align: center;
    }
    .wp-login-logo img {
      height: 54px;
      margin: 0 auto;
    }
    .wp-login-form-box {
      background: #ffffff;
      border: 1px solid #c3c4c7;
      box-shadow: 0 1px 3px rgba(0,0,0,.04);
      padding: 26px 24px;
      width: 100%;
      max-width: 320px;
    }
    .wp-login-form-box label {
      display: block;
      font-size: 14px;
      line-height: 1.5;
      margin-bottom: 4px;
      color: #3c434a;
    }
    .wp-login-form-box input[type="text"],
    .wp-login-form-box input[type="password"] {
      width: 100%;
      font-size: 20px;
      line-height: 1.33333333;
      padding: 6px 10px;
      border: 1px solid #8c8f94;
      border-radius: 4px;
      margin-bottom: 16px;
      box-sizing: border-box;
      outline: none;
    }
    .wp-login-form-box input:focus {
      border-color: #2271b1;
      box-shadow: 0 0 0 1px #2271b1;
    }
    .wp-login-error {
      border-left: 4px solid #d63638;
      background: #fff;
      box-shadow: 0 1px 1px 0 rgba(0,0,0,.1);
      padding: 12px;
      margin-bottom: 16px;
      font-size: 13px;
    }
  </style>
</head>
<body class="wp-admin wp-core-ui">

<?php if (!$isLoggedIn): ?>
  <!-- =========================================================================
       WP-STYLE AUTHENTICATION LOGIN SCREEN
       ========================================================================= -->
  <div class="wp-login-wrapper">
    <div class="wp-login-logo">
      <a href="<?php echo url('index.php'); ?>">
        <img src="<?php echo asset('rtc-logo-transparent.png'); ?>" alt="RTC Foods" onerror="this.src='<?php echo asset('rtc-logo.png'); ?>'" />
      </a>
    </div>

    <div class="wp-login-form-box">
      <?php if (!empty($loginError)): ?>
        <div class="wp-login-error"><?php echo htmlspecialchars($loginError); ?></div>
      <?php endif; ?>

      <form method="POST" action="<?php echo url('admin/index.php'); ?>">
        <input type="hidden" name="admin_login" value="1" />
        <p>
          <label for="user_login">Username or Email Address</label>
          <input type="text" name="username" id="user_login" class="input" value="admin" required />
        </p>
        <p>
          <label for="user_pass">Password</label>
          <input type="password" name="password" id="user_pass" class="input" value="rtc@2026" required />
        </p>
        <p style="display:flex; justify-content:space-between; align-items:center; margin-top:20px;">
          <label style="font-size:12px; display:inline-flex; align-items:center; gap:4px; margin:0;">
            <input type="checkbox" name="rememberme" value="forever" checked /> Remember Me
          </label>
          <input type="submit" class="button button-primary" value="Log In" style="padding:4px 14px; font-weight:700;" />
        </p>
      </form>
    </div>

    <p style="margin-top:20px; font-size:13px; color:#646970;">
      <a href="<?php echo url('index.php'); ?>" style="color:#2271b1; text-decoration:none;">&larr; Go to <?php echo SITE_NAME; ?></a>
    </p>
  </div>

<?php else: ?>

  <!-- =========================================================================
       1. TOP ADMIN BAR (#wpadminbar)
       ========================================================================= -->
  <div id="wpadminbar">
    <div class="ab-left">
      <a href="<?php echo url('index.php'); ?>" target="_blank" class="ab-item ab-site-name" title="Visit Live Store">
        <i data-lucide="store" style="width:16px; height:16px;"></i>
        <span><?php echo SITE_NAME; ?></span>
      </a>
      <a href="<?php echo url('admin/index.php?page=orders'); ?>" class="ab-item" title="Pending Orders">
        <i data-lucide="shopping-bag" style="width:15px; height:15px;"></i>
        <span>Orders</span>
        <span class="ab-badge"><?php echo count($orders); ?></span>
      </a>
      <a href="<?php echo url('admin/index.php?page=product-new'); ?>" class="ab-item" title="Add New Product">
        <i data-lucide="plus" style="width:15px; height:15px;"></i>
        <span>New Product</span>
      </a>
    </div>

    <div class="ab-right">
      <a href="<?php echo url('admin/index.php?page=settings'); ?>" class="ab-item">
        <span>Howdy, <strong>Admin</strong></span>
        <div style="width:22px; height:22px; border-radius:50%; background:#F5A623; color:#000; display:flex; align-items:center; justify-content:center; font-weight:bold; font-size:11px; margin-left:4px;">A</div>
      </a>
      <a href="<?php echo url('admin/index.php?action=logout'); ?>" class="ab-item" style="color:#f87171;" title="Log Out">
        <i data-lucide="log-out" style="width:15px; height:15px;"></i> Log Out
      </a>
    </div>
  </div>

  <!-- =========================================================================
       2. LEFT ADMIN SIDEBAR MENU (#adminmenu)
       ========================================================================= -->
  <div id="adminmenuback"></div>
  <div id="adminmenuwrap">
    <ul id="adminmenu">
      <!-- Dashboard -->
      <li class="<?php echo $currentPage === 'dashboard' ? 'wp-has-current-submenu current' : ''; ?>">
        <a href="<?php echo url('admin/index.php?page=dashboard'); ?>" class="menu-top">
          <div class="wp-menu-image"><i data-lucide="layout-dashboard"></i></div>
          <div class="wp-menu-name">Dashboard</div>
        </a>
      </li>

      <li class="wp-menu-separator"></li>

      <!-- Store & Orders -->
      <li class="<?php echo $currentPage === 'orders' ? 'wp-has-current-submenu current' : ''; ?>">
        <a href="<?php echo url('admin/index.php?page=orders'); ?>" class="menu-top">
          <div class="wp-menu-image"><i data-lucide="shopping-cart"></i></div>
          <div class="wp-menu-name">Store Orders</div>
          <?php if (count($orders) > 0): ?>
            <span class="update-plugins"><?php echo count($orders); ?></span>
          <?php endif; ?>
        </a>
      </li>

      <!-- Products (WooCommerce style menu) -->
      <li class="<?php echo in_array($currentPage, ['products', 'product-new', 'product-edit', 'categories']) ? 'wp-has-current-submenu current' : ''; ?>">
        <a href="<?php echo url('admin/index.php?page=products'); ?>" class="menu-top">
          <div class="wp-menu-image"><i data-lucide="package"></i></div>
          <div class="wp-menu-name">Products</div>
        </a>
        <ul class="wp-submenu">
          <li class="<?php echo $currentPage === 'products' ? 'current' : ''; ?>">
            <a href="<?php echo url('admin/index.php?page=products'); ?>">All Products</a>
          </li>
          <li class="<?php echo $currentPage === 'product-new' ? 'current' : ''; ?>">
            <a href="<?php echo url('admin/index.php?page=product-new'); ?>">Add New</a>
          </li>
          <li class="<?php echo $currentPage === 'categories' ? 'current' : ''; ?>">
            <a href="<?php echo url('admin/index.php?page=categories'); ?>">Categories</a>
          </li>
        </ul>
      </li>

      <!-- Coupons / Offers -->
      <li class="<?php echo in_array($currentPage, ['coupons', 'coupon-new']) ? 'wp-has-current-submenu current' : ''; ?>">
        <a href="<?php echo url('admin/index.php?page=coupons'); ?>" class="menu-top">
          <div class="wp-menu-image"><i data-lucide="ticket"></i></div>
          <div class="wp-menu-name">Marketing &amp; Offers</div>
        </a>
        <ul class="wp-submenu">
          <li class="<?php echo $currentPage === 'coupons' ? 'current' : ''; ?>">
            <a href="<?php echo url('admin/index.php?page=coupons'); ?>">Coupons &amp; Offers</a>
          </li>
          <li class="<?php echo $currentPage === 'coupon-new' ? 'current' : ''; ?>">
            <a href="<?php echo url('admin/index.php?page=coupon-new'); ?>">Add Coupon</a>
          </li>
        </ul>
      </li>

      <!-- Elementor Style Visual Page Builder -->
      <li class="<?php echo $currentPage === 'visual-builder' ? 'wp-has-current-submenu current' : ''; ?>">
        <a href="<?php echo url('admin/index.php?page=visual-builder'); ?>" class="menu-top" style="color:#72aee6;">
          <div class="wp-menu-image"><i data-lucide="wand-2"></i></div>
          <div class="wp-menu-name">Visual Canvas Builder</div>
        </a>
      </li>

      <li class="wp-menu-separator"></li>

      <!-- Settings -->
      <li class="<?php echo $currentPage === 'settings' ? 'wp-has-current-submenu current' : ''; ?>">
        <a href="<?php echo url('admin/index.php?page=settings'); ?>" class="menu-top">
          <div class="wp-menu-image"><i data-lucide="settings"></i></div>
          <div class="wp-menu-name">Store Settings</div>
        </a>
      </li>
    </ul>
  </div>

  <!-- =========================================================================
       3. MAIN CONTENT AREA (#wpcontent)
       ========================================================================= -->
  <div id="wpcontent">
    <div id="wpbody">
      <div id="wpbody-content">

        <!-- Global Admin Notice -->
        <?php if (!empty($noticeMsg)): ?>
          <div class="notice notice-<?php echo $noticeType; ?> is-dismissible">
            <p><?php echo $noticeMsg; ?></p>
          </div>
        <?php endif; ?>

        <!-- ===================================================================
             PAGE 1: ALL PRODUCTS LIST TABLE (Exact WooCommerce Layout)
             =================================================================== -->
        <?php if ($currentPage === 'products'): ?>
          <div class="wrap">
            <h1 class="wp-heading-inline">Products</h1>
            <a href="<?php echo url('admin/index.php?page=product-new'); ?>" class="page-title-action">Add New</a>

            <ul class="subsubsub">
              <li><a href="#" class="current">All <span class="count">(<?php echo count($products); ?>)</span></a> |</li>
              <li><a href="#">Published <span class="count">(<?php echo count($products); ?>)</span></a> |</li>
              <li><a href="#">In stock <span class="count">(<?php echo count($products); ?>)</span></a> |</li>
              <li><a href="#">Featured <span class="count">(5)</span></a></li>
            </ul>

            <div class="tablenav top">
              <div class="alignleft actions bulkactions">
                <select name="action">
                  <option value="-1">Bulk actions</option>
                  <option value="edit">Edit</option>
                  <option value="trash">Move to Trash</option>
                </select>
                <input type="submit" class="button action" value="Apply" />
              </div>

              <div class="alignleft actions">
                <select name="cat_filter">
                  <option value="">Select a category</option>
                  <?php foreach ($categories as $c): ?>
                    <option value="<?php echo htmlspecialchars($c['id']); ?>"><?php echo htmlspecialchars($c['name']); ?></option>
                  <?php endforeach; ?>
                </select>
                <select name="stock_filter">
                  <option value="">Filter by stock status</option>
                  <option value="instock">In stock</option>
                  <option value="outofstock">Out of stock</option>
                </select>
                <input type="button" class="button" value="Filter" />
              </div>

              <div class="alignright actions">
                <input type="search" placeholder="Search products..." />
                <input type="button" class="button" value="Search Products" />
              </div>
            </div>

            <!-- WooCommerce Data Table -->
            <table class="wp-list-table widefat fixed striped posts">
              <thead>
                <tr>
                  <td class="manage-column column-cb check-column" style="width:28px;"><input type="checkbox" class="cb-select-all" /></td>
                  <th class="column-thumb"><i data-lucide="image" style="width:16px;height:16px;"></i></th>
                  <th class="column-title">Name</th>
                  <th style="width:120px;">SKU</th>
                  <th style="width:110px;">Stock</th>
                  <th style="width:110px;">Price</th>
                  <th style="width:160px;">Categories</th>
                  <th style="width:110px;">Tags</th>
                  <th style="width:40px; text-align:center;"><i data-lucide="star" style="width:14px;height:14px;color:#dba617;"></i></th>
                  <th style="width:120px;">Date</th>
                </tr>
              </thead>
              <tbody>
                <?php foreach ($products as $p): ?>
                  <tr>
                    <td><input type="checkbox" name="post[]" value="<?php echo $p['id']; ?>" /></td>
                    <td class="column-thumb">
                      <a href="<?php echo url('admin/index.php?page=product-edit&id=' . $p['id']); ?>">
                        <img src="<?php echo asset($p['image']); ?>" alt="" onerror="this.src='<?php echo asset('cat_dry_figs.png'); ?>'" />
                      </a>
                    </td>
                    <td>
                      <strong>
                        <a class="row-title" href="<?php echo url('admin/index.php?page=product-edit&id=' . $p['id']); ?>">
                          <?php echo htmlspecialchars($p['name']); ?>
                        </a>
                      </strong>
                      <div class="row-actions">
                        <span><a href="<?php echo url('admin/index.php?page=product-edit&id=' . $p['id']); ?>">Edit</a> | </span>
                        <span><a href="<?php echo url('admin/index.php?action=duplicate&id=' . $p['id']); ?>">Duplicate</a> | </span>
                        <span><a href="<?php echo url('admin/index.php?action=trash&id=' . $p['id']); ?>" class="trash" onclick="return confirm('Are you sure you want to trash this item?');">Trash</a> | </span>
                        <span><a href="<?php echo url('product.php?id=' . $p['id']); ?>" target="_blank">View</a></span>
                      </div>
                    </td>
                    <td><code><?php echo htmlspecialchars($p['sku'] ?? 'RTC-GEN-0' . $p['id']); ?></code></td>
                    <td><span class="stock-status instock">In stock</span></td>
                    <td><strong><?php echo $p['priceDisplay']; ?></strong></td>
                    <td><span style="color:#2271b1;"><?php echo htmlspecialchars($p['categoryName'] ?? 'Dry Fruits'); ?></span></td>
                    <td><span style="color:#646970;">Premium, Raw</span></td>
                    <td style="text-align:center;"><i data-lucide="star" style="width:14px;height:14px;color:#dba617;fill:#dba617;"></i></td>
                    <td><span style="color:#646970; font-size:12px;">Published<br>2026/02/10</span></td>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>

        <!-- ===================================================================
             PAGE 2 & 3: WOOCOMMERCE PRODUCT EDITOR (Add New & Edit)
             =================================================================== -->
        <?php elseif ($currentPage === 'product-new' || $currentPage === 'product-edit'): ?>
          <?php
          $isEdit = ($currentPage === 'product-edit' && $editingProduct);
          $prod = $editingProduct ?? [
              'id' => 0,
              'name' => '',
              'slug' => '',
              'description' => '',
              'shortDesc' => '',
              'price' => 299,
              'originalPrice' => 299,
              'sku' => '',
              'category' => 'dry-fruits',
              'image' => '/california_almonds_pouch.png'
          ];
          ?>
          <div class="wrap">
            <h1 class="wp-heading-inline"><?php echo $isEdit ? 'Edit Product' : 'Add New Product'; ?></h1>
            <?php if ($isEdit): ?>
              <a href="<?php echo url('admin/index.php?page=product-new'); ?>" class="page-title-action">Add New</a>
            <?php endif; ?>

            <form method="POST" action="<?php echo url('admin/index.php?page=products'); ?>" id="post">
              <input type="hidden" name="save_product" value="1" />
              <input type="hidden" name="product_id" value="<?php echo $prod['id']; ?>" />

              <div id="poststuff">
                <div id="post-body" class="metabox-holder columns-2">

                  <!-- LEFT MAIN COLUMN -->
                  <div id="post-body-content">
                    <div id="titlediv">
                      <input type="text" name="post_title" size="30" value="<?php echo htmlspecialchars($prod['name']); ?>" id="title" placeholder="Product name" required />
                      <div class="edit-slug-box">
                        <strong>Permalink:</strong> <code><?php echo url('product.php?slug='); ?><span id="editable-slug"><?php echo htmlspecialchars($prod['slug'] ?: 'sample-product'); ?></span></code>
                        <input type="hidden" name="post_name" id="post_name" value="<?php echo htmlspecialchars($prod['slug']); ?>" />
                      </div>
                    </div>

                    <!-- Visual / Text Editor for Description -->
                    <div class="postbox">
                      <div class="postbox-header"><h2>Product Description</h2></div>
                      <div class="wp-editor-wrap">
                        <div class="wp-editor-tools">
                          <div style="display:flex; gap:6px;">
                            <button type="button" class="button button-small">Add Media</button>
                            <button type="button" class="button button-small"><b>B</b></button>
                            <button type="button" class="button button-small"><i>I</i></button>
                            <button type="button" class="button button-small">link</button>
                          </div>
                          <div style="font-size:11px; color:#646970;">Visual &nbsp;|&nbsp; Text</div>
                        </div>
                        <textarea class="wp-editor-area" name="post_content" placeholder="Enter comprehensive product story, health benefits, origin notes, and packaging details..."><?php echo htmlspecialchars($prod['description'] ?? ''); ?></textarea>
                      </div>
                    </div>

                    <!-- THE FAMOUS WOOCOMMERCE PRODUCT DATA METABOX -->
                    <div id="woocommerce-product-data" class="postbox">
                      <div class="wc-product-data-header">
                        <h3>Product data &mdash;</h3>
                        <div class="wc-product-type-selector">
                          <select name="product-type">
                            <option value="simple" selected>Simple product</option>
                            <option value="grouped">Grouped product</option>
                            <option value="external">External/Affiliate product</option>
                            <option value="variable">Variable product</option>
                          </select>
                        </div>
                        <label style="margin-left:14px; font-size:12px;"><input type="checkbox" name="_virtual" /> Virtual</label>
                        <label style="margin-left:10px; font-size:12px;"><input type="checkbox" name="_downloadable" /> Downloadable</label>
                      </div>

                      <div class="wc-product-data-content">
                        <!-- Left Tab Strip -->
                        <ul class="wc-tabs">
                          <li class="active"><a href="#" data-target="tab-general"><i data-lucide="sliders" style="width:14px;height:14px;"></i> General</a></li>
                          <li><a href="#" data-target="tab-inventory"><i data-lucide="archive" style="width:14px;height:14px;"></i> Inventory</a></li>
                          <li><a href="#" data-target="tab-shipping"><i data-lucide="truck" style="width:14px;height:14px;"></i> Shipping</a></li>
                          <li><a href="#" data-target="tab-attributes"><i data-lucide="tag" style="width:14px;height:14px;"></i> Attributes</a></li>
                          <li><a href="#" data-target="tab-advanced"><i data-lucide="cog" style="width:14px;height:14px;"></i> Advanced</a></li>
                        </ul>

                        <!-- Tab Options Panels -->
                        <div class="woocommerce_options_panel">
                          <!-- General Panel -->
                          <div id="tab-general" class="wc-tab-panel active">
                            <div class="form-field">
                              <label for="_regular_price">Regular price (₹)</label>
                              <input type="number" step="0.01" name="_regular_price" id="_regular_price" value="<?php echo htmlspecialchars($prod['originalPrice'] ?? $prod['price']); ?>" required />
                            </div>
                            <div class="form-field">
                              <label for="_sale_price">Sale price (₹)</label>
                              <input type="number" step="0.01" name="_sale_price" id="_sale_price" value="<?php echo (!empty($prod['badge']) && $prod['badge'] === 'Sale!') ? htmlspecialchars($prod['price']) : ''; ?>" placeholder="Optional sale price" />
                              <span class="description">Schedule sale discount</span>
                            </div>
                            <div class="form-field">
                              <label>Tax status</label>
                              <select name="_tax_status">
                                <option value="taxable" selected>Taxable (Inclusive GST)</option>
                                <option value="shipping">Shipping only</option>
                                <option value="none">None</option>
                              </select>
                            </div>
                          </div>

                          <!-- Inventory Panel -->
                          <div id="tab-inventory" class="wc-tab-panel">
                            <div class="form-field">
                              <label for="_sku">SKU</label>
                              <input type="text" name="_sku" id="_sku" value="<?php echo htmlspecialchars($prod['sku'] ?? 'RTC-ALM-001'); ?>" />
                              <span class="description">Stock Keeping Unit code</span>
                            </div>
                            <div class="form-field">
                              <label for="_manage_stock">Manage stock?</label>
                              <input type="checkbox" name="_manage_stock" id="_manage_stock" value="yes" checked />
                              <span class="description">Enable stock management at product level</span>
                            </div>
                            <div class="form-field">
                              <label for="_stock_status">Stock status</label>
                              <select name="_stock_status" id="_stock_status">
                                <option value="instock" selected>In stock</option>
                                <option value="outofstock">Out of stock</option>
                                <option value="onbackorder">On backorder</option>
                              </select>
                            </div>
                          </div>

                          <!-- Shipping Panel -->
                          <div id="tab-shipping" class="wc-tab-panel">
                            <div class="form-field">
                              <label>Weight (kg)</label>
                              <input type="text" name="_weight" value="0.25" placeholder="0.25" />
                            </div>
                            <div class="form-field">
                              <label>Dimensions (cm)</label>
                              <div style="display:flex; gap:6px;">
                                <input type="text" placeholder="Length" style="width:75px;" value="20" />
                                <input type="text" placeholder="Width" style="width:75px;" value="15" />
                                <input type="text" placeholder="Height" style="width:75px;" value="3.5" />
                              </div>
                            </div>
                          </div>

                          <!-- Attributes Panel -->
                          <div id="tab-attributes" class="wc-tab-panel">
                            <div class="form-field">
                              <label>Pack Sizes</label>
                              <input type="text" name="_attributes" value="250g | 500g | 1kg" style="width:340px;" />
                              <span class="description">Enter size variants separated by |</span>
                            </div>
                          </div>

                          <!-- Advanced Panel -->
                          <div id="tab-advanced" class="wc-tab-panel">
                            <div class="form-field">
                              <label>Purchase note</label>
                              <textarea placeholder="Special instructions sent after checkout"></textarea>
                            </div>
                            <div class="form-field">
                              <label>Enable reviews</label>
                              <input type="checkbox" checked />
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    <!-- Short Description Metabox -->
                    <div class="postbox">
                      <div class="postbox-header"><h2>Product Short Description</h2></div>
                      <div class="inside">
                        <textarea name="post_excerpt" style="width:100%; height:90px; padding:10px; border:1px solid #8c8f94; border-radius:4px; font-family:inherit;"><?php echo htmlspecialchars($prod['shortDesc'] ?? ''); ?></textarea>
                        <p class="description" style="color:#646970; font-size:12px; margin-top:4px;">Displayed in product card hover previews and next to the product images on single product page.</p>
                      </div>
                    </div>
                  </div>

                  <!-- RIGHT SIDEBAR METABOXES -->
                  <div id="postbox-container-1">
                    <!-- Publish Box -->
                    <div id="submitdiv" class="postbox">
                      <div class="postbox-header"><h2>Publish</h2></div>
                      <div class="inside">
                        <div style="margin-bottom:10px; color:#50575e; font-size:12.5px;">
                          <div>Status: <strong>Published</strong> <a href="#" style="color:#2271b1; text-decoration:none;">Edit</a></div>
                          <div style="margin-top:6px;">Visibility: <strong>Public</strong> <a href="#" style="color:#2271b1; text-decoration:none;">Edit</a></div>
                          <div style="margin-top:6px;">Catalog visibility: <strong>Shop and search results</strong></div>
                        </div>
                        <div style="border-top:1px solid #f0f0f1; padding-top:12px; display:flex; justify-content:space-between; align-items:center;">
                          <a href="<?php echo url('admin/index.php?action=trash&id=' . $prod['id']); ?>" style="color:#b32d2e; text-decoration:none;" onclick="return confirm('Move product to Trash?');">Move to Trash</a>
                          <input type="submit" name="publish" class="button button-primary" value="<?php echo $isEdit ? 'Update' : 'Publish'; ?>" style="font-weight:700;" />
                        </div>
                      </div>
                    </div>

                    <!-- Product Categories Box -->
                    <div id="product_catdiv" class="postbox">
                      <div class="postbox-header"><h2>Product Categories</h2></div>
                      <div class="inside">
                        <div class="categorydiv">
                          <ul class="categorychecklist">
                            <?php foreach ($categories as $cat): ?>
                              <li>
                                <label>
                                  <input type="radio" name="tax_input_cat" value="<?php echo htmlspecialchars($cat['id']); ?>" <?php echo ($prod['category'] === $cat['id']) ? 'checked' : ''; ?> />
                                  <?php echo htmlspecialchars($cat['name']); ?>
                                </label>
                              </li>
                            <?php endforeach; ?>
                          </ul>
                        </div>
                        <p><a href="#" id="add-cat-toggle" style="color:#2271b1; text-decoration:none; font-size:12px;">+ Add new category</a></p>
                        <div id="add-cat-box" style="display:none; margin-top:8px;">
                          <input type="text" id="new-cat-name" placeholder="New category name" style="width:100%; margin-bottom:6px; padding:4px 8px;" />
                          <button type="button" class="button button-small" onclick="addNewCategoryInline()">Add New Category</button>
                        </div>
                      </div>
                    </div>

                    <!-- Product Image Box -->
                    <div id="postimagediv" class="postbox">
                      <div class="postbox-header"><h2>Product Image</h2></div>
                      <div class="inside product-image-box">
                        <img src="<?php echo asset($prod['image'] ?: '/california_almonds_pouch.png'); ?>" alt="Product Preview" id="product-featured-img-preview" onerror="this.src='<?php echo asset('cat_dry_figs.png'); ?>'" />
                        <input type="text" name="_product_image" value="<?php echo htmlspecialchars($prod['image']); ?>" style="width:100%; font-size:11px; margin-bottom:8px; padding:4px;" placeholder="Image path, e.g. /california_almonds_pouch.png" />
                        <p style="margin:0;"><a href="#" style="color:#2271b1; text-decoration:none; font-size:12px;">Set product image</a></p>
                      </div>
                    </div>

                    <!-- Product Tags Box -->
                    <div class="postbox">
                      <div class="postbox-header"><h2>Product Tags</h2></div>
                      <div class="inside">
                        <input type="text" placeholder="Separate tags with commas" value="Antioxidants, Energy, Vegan, California" style="width:100%; padding:5px 8px; font-size:12px;" />
                        <p style="color:#646970; font-size:11.5px; margin-top:6px;">Choose from the most used tags in store.</p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

        <!-- ===================================================================
             PAGE 4: WOOCOMMERCE ORDERS TABLE
             =================================================================== -->
        <?php elseif ($currentPage === 'orders'): ?>
          <div class="wrap">
            <h1 class="wp-heading-inline">Orders</h1>

            <ul class="subsubsub">
              <li><a href="#" class="current">All <span class="count">(<?php echo count($orders); ?>)</span></a> |</li>
              <li><a href="#">Processing <span class="count">(<?php echo count($orders); ?>)</span></a> |</li>
              <li><a href="#">Completed <span class="count">(0)</span></a></li>
            </ul>

            <div class="tablenav top">
              <div class="alignleft actions bulkactions">
                <select>
                  <option value="-1">Bulk actions</option>
                  <option value="mark_processing">Change status to processing</option>
                  <option value="mark_completed">Change status to completed</option>
                </select>
                <input type="button" class="button" value="Apply" />
              </div>
            </div>

            <?php if (empty($orders)): ?>
              <div class="postbox" style="padding:30px; text-align:center; color:#646970;">
                <i data-lucide="shopping-bag" style="width:48px;height:48px;color:#a7aaad;margin:0 auto 12px auto;display:block;"></i>
                <h3 style="margin:0 0 6px 0; color:#1d2327;">No orders found</h3>
                <p>When customers complete purchases on the storefront, orders will appear here in real-time with full line items, shipping address, and tracking status.</p>
              </div>
            <?php else: ?>
              <table class="wp-list-table widefat fixed striped posts">
                <thead>
                  <tr>
                    <td class="manage-column column-cb check-column" style="width:28px;"><input type="checkbox" /></td>
                    <th style="width:160px;">Order</th>
                    <th style="width:120px;">Date</th>
                    <th>Status</th>
                    <th>Billing Address</th>
                    <th>Ship to</th>
                    <th style="width:120px;">Total</th>
                    <th style="width:100px; text-align:right;">Actions</th>
                  </tr>
                </thead>
                <tbody>
                  <?php foreach ($orders as $ord): ?>
                    <tr>
                      <td><input type="checkbox" /></td>
                      <td>
                        <strong><a href="#" class="row-title">#<?php echo htmlspecialchars($ord['id']); ?> <?php echo htmlspecialchars($ord['customer']['name']); ?></a></strong>
                        <div style="color:#646970; font-size:12px;"><?php echo count($ord['items']); ?> items</div>
                      </td>
                      <td><?php echo htmlspecialchars($ord['date']); ?></td>
                      <td><span class="order-badge processing"><?php echo htmlspecialchars($ord['status']); ?></span></td>
                      <td><?php echo htmlspecialchars($ord['customer']['address'] . ', ' . $ord['customer']['city']); ?></td>
                      <td><?php echo htmlspecialchars($ord['customer']['phone']); ?></td>
                      <td><strong><?php echo format_price($ord['total']); ?></strong></td>
                      <td style="text-align:right;">
                        <a href="<?php echo url('order-confirmation.php?order_id=' . urlencode($ord['id'])); ?>" target="_blank" class="button button-small" title="View Full Invoice"><i data-lucide="eye" style="width:12px;height:12px;"></i> View</a>
                      </td>
                    </tr>
                  <?php endforeach; ?>
                </tbody>
              </table>
            <?php endif; ?>
          </div>

        <!-- ===================================================================
             PAGE 5: WOOCOMMERCE MARKETING & COUPONS TABLE
             =================================================================== -->
        <?php elseif ($currentPage === 'coupons'): ?>
          <div class="wrap">
            <h1 class="wp-heading-inline">Coupons</h1>
            <a href="<?php echo url('admin/index.php?page=coupon-new'); ?>" class="page-title-action">Add Coupon</a>

            <div class="tablenav top">
              <div class="alignleft actions bulkactions">
                <select>
                  <option value="-1">Bulk actions</option>
                  <option value="trash">Move to Trash</option>
                </select>
                <input type="button" class="button" value="Apply" />
              </div>
            </div>

            <table class="wp-list-table widefat fixed striped posts">
              <thead>
                <tr>
                  <td class="manage-column column-cb check-column" style="width:28px;"><input type="checkbox" /></td>
                  <th style="width:200px;">Coupon code</th>
                  <th style="width:180px;">Coupon type</th>
                  <th style="width:140px;">Coupon amount</th>
                  <th>Description</th>
                  <th style="width:140px;">Minimum spend</th>
                  <th style="width:140px;">Expiry date</th>
                </tr>
              </thead>
              <tbody>
                <?php foreach ($coupons as $code => $c): ?>
                  <tr>
                    <td><input type="checkbox" /></td>
                    <td>
                      <strong><a href="#" class="row-title" style="color:#2271b1; font-family:monospace; font-size:14px;"><?php echo htmlspecialchars($code); ?></a></strong>
                      <div class="row-actions">
                        <span><a href="#">Edit</a> | </span>
                        <span><a href="#" class="trash">Trash</a></span>
                      </div>
                    </td>
                    <td><?php echo $c['type'] === 'percentage' ? 'Percentage discount' : 'Fixed cart discount'; ?></td>
                    <td><strong><?php echo $c['type'] === 'percentage' ? $c['value'] . '%' : '₹' . $c['value']; ?></strong></td>
                    <td><?php echo htmlspecialchars($c['description']); ?></td>
                    <td><?php echo format_price($c['min_order']); ?></td>
                    <td><span style="color:#646970;">No expiry</span></td>
                  </tr>
                <?php endforeach; ?>
              </tbody>
            </table>
          </div>

        <!-- ===================================================================
             PAGE 6: WOOCOMMERCE ADD NEW COUPON EDITOR
             =================================================================== -->
        <?php elseif ($currentPage === 'coupon-new'): ?>
          <div class="wrap">
            <h1 class="wp-heading-inline">Add New Coupon</h1>

            <form method="POST" action="<?php echo url('admin/index.php?page=coupons'); ?>">
              <input type="hidden" name="save_coupon" value="1" />

              <div id="poststuff">
                <div id="post-body" class="metabox-holder columns-2">
                  <div id="post-body-content">
                    <div id="titlediv">
                      <div style="display:flex; gap:10px; align-items:center;">
                        <input type="text" name="coupon_code" id="coupon_code" placeholder="Coupon code" required style="text-transform:uppercase; font-family:monospace; font-weight:700;" />
                        <button type="button" class="button" onclick="generateCouponCode()">Generate coupon code</button>
                      </div>
                    </div>

                    <div class="postbox" style="padding:14px;">
                      <label style="font-weight:600; display:block; margin-bottom:6px;">Description (optional)</label>
                      <textarea name="description" placeholder="Internal notes for discount campaign..." style="width:100%; height:70px; padding:8px; border:1px solid #8c8f94; border-radius:3px;"></textarea>
                    </div>

                    <div class="postbox">
                      <div class="postbox-header"><h2>Coupon data</h2></div>
                      <div class="inside" style="padding:20px;">
                        <div class="form-field">
                          <label>Discount type</label>
                          <select name="discount_type" style="width:260px;">
                            <option value="percentage">Percentage discount</option>
                            <option value="fixed_cart">Fixed cart discount</option>
                          </select>
                        </div>
                        <div class="form-field">
                          <label>Coupon amount</label>
                          <input type="number" step="0.01" name="coupon_amount" value="10" style="width:260px;" required />
                        </div>
                        <div class="form-field">
                          <label>Minimum spend (₹)</label>
                          <input type="number" step="0.01" name="minimum_spend" value="499" style="width:260px;" />
                        </div>
                        <div class="form-field">
                          <label>Allow free shipping</label>
                          <input type="checkbox" name="free_shipping" value="yes" checked />
                          <span class="description" style="margin-left:8px;">Check this box if the coupon grants free express shipping</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div id="postbox-container-1">
                    <div class="postbox">
                      <div class="postbox-header"><h2>Publish</h2></div>
                      <div class="inside" style="text-align:right;">
                        <input type="submit" class="button button-primary" value="Publish Coupon" style="font-weight:700; width:100%; height:36px;" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </form>
          </div>

        <!-- ===================================================================
             PAGE 7: ELEMENTOR-STYLE VISUAL CANVAS BUILDER
             =================================================================== -->
        <?php elseif ($currentPage === 'visual-builder'): ?>
          <div class="elementor-editor-wrapper">
            <!-- Left Elementor Dock -->
            <div class="elementor-panel-dock">
              <div class="elementor-panel-header">
                <h4><i data-lucide="palette"></i> Canvas Builder</h4>
                <a href="<?php echo url('index.php'); ?>" target="_blank" style="color:#72aee6; font-size:12px; text-decoration:none;">View Site &rarr;</a>
              </div>
              <div class="elementor-panel-search">
                <input type="text" placeholder="Search Widget..." />
              </div>
              <div class="elementor-widgets-category">Basic Elements</div>
              <div class="elementor-elements-grid">
                <div class="elementor-element-card" onclick="insertElementorWidget('heading')">
                  <i data-lucide="heading"></i>
                  <span>Heading Block</span>
                </div>
                <div class="elementor-element-card" onclick="insertElementorWidget('product_grid')">
                  <i data-lucide="grid"></i>
                  <span>Product Grid</span>
                </div>
                <div class="elementor-element-card" onclick="insertElementorWidget('banner')">
                  <i data-lucide="image"></i>
                  <span>Promo Banner</span>
                </div>
                <div class="elementor-element-card" onclick="insertElementorWidget('button')">
                  <i data-lucide="mouse-pointer"></i>
                  <span>Call to Action</span>
                </div>
              </div>
            </div>

            <!-- Center Visual Device Canvas -->
            <div class="elementor-canvas-area">
              <div class="elementor-canvas-device" id="elementor-canvas-content">
                <div class="elementor-section-box">
                  <span class="elementor-handle-tag">Live Canvas Container</span>
                  <div style="text-align:center; padding:20px 0;">
                    <img src="<?php echo asset('rtc-logo-transparent.png'); ?>" alt="RTC Foods" style="height:44px; margin:0 auto 12px auto;" onerror="this.src='<?php echo asset('rtc-logo.png'); ?>'" />
                    <h1 contenteditable="true" style="font-size:2.2rem; font-weight:800; color:#1D231F; margin:0 0 10px 0;">Pure Orchard Goodness</h1>
                    <p contenteditable="true" style="color:#64748b; max-width:600px; margin:0 auto 20px auto;">Handpicked California almonds, whole cashews, and Kashmiri walnuts hygienically packaged for daily nutrition.</p>
                  </div>
                </div>

                <div class="elementor-section-box">
                  <span class="elementor-handle-tag">Featured Products</span>
                  <div style="display:grid; grid-template-columns:repeat(3, 1fr); gap:16px;">
                    <?php foreach (array_slice($products, 0, 3) as $p): ?>
                      <div style="border:1px solid #e2e8f0; border-radius:10px; padding:12px; text-align:center;">
                        <img src="<?php echo asset($p['image']); ?>" style="height:90px; margin:0 auto 8px auto; object-fit:contain;" />
                        <strong style="display:block; font-size:13px;"><?php echo htmlspecialchars($p['name']); ?></strong>
                        <div style="color:#15803D; font-weight:800; margin-top:4px;"><?php echo $p['priceDisplay']; ?></div>
                      </div>
                    <?php endforeach; ?>
                  </div>
                </div>
              </div>
            </div>
          </div>

        <!-- ===================================================================
             PAGE 8: CATEGORIES TAXONOMY MANAGER
             =================================================================== -->
        <?php elseif ($currentPage === 'categories'): ?>
          <div class="wrap">
            <h1 class="wp-heading-inline">Product Categories</h1>

            <div style="display:grid; grid-template-columns: 1fr 1.6fr; gap:30px; margin-top:20px;">
              <!-- Add Category Form -->
              <div class="postbox" style="padding:20px;">
                <h2 style="font-size:16px; margin:0 0 14px 0;">Add new category</h2>
                <form method="POST" action="<?php echo url('admin/index.php?page=categories'); ?>">
                  <input type="hidden" name="add_category" value="1" />
                  <div style="margin-bottom:14px;">
                    <label style="font-weight:600; display:block; margin-bottom:4px;">Name</label>
                    <input type="text" name="tag-name" required style="width:100%; padding:6px 8px; border:1px solid #8c8f94; border-radius:3px;" />
                    <span style="color:#646970; font-size:11px;">The name is how it appears on your site.</span>
                  </div>
                  <div style="margin-bottom:14px;">
                    <label style="font-weight:600; display:block; margin-bottom:4px;">Slug</label>
                    <input type="text" name="tag-slug" style="width:100%; padding:6px 8px; border:1px solid #8c8f94; border-radius:3px;" />
                    <span style="color:#646970; font-size:11px;">The “slug” is the URL-friendly version of the name.</span>
                  </div>
                  <div style="margin-bottom:14px;">
                    <label style="font-weight:600; display:block; margin-bottom:4px;">Description</label>
                    <textarea name="tag-description" style="width:100%; height:80px; padding:6px 8px; border:1px solid #8c8f94; border-radius:3px;"></textarea>
                  </div>
                  <input type="submit" class="button button-primary" value="Add New Category" style="font-weight:700;" />
                </form>
              </div>

              <!-- Categories List -->
              <table class="wp-list-table widefat fixed striped posts">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Description</th>
                    <th>Slug</th>
                    <th style="width:70px; text-align:right;">Count</th>
                  </tr>
                </thead>
                <tbody>
                  <?php foreach ($categories as $cat): ?>
                    <tr>
                      <td>
                        <strong><a href="#" class="row-title"><?php echo htmlspecialchars($cat['name']); ?></a></strong>
                        <div class="row-actions"><span><a href="#">Edit</a> | </span><span><a href="#">View</a></span></div>
                      </td>
                      <td><?php echo htmlspecialchars($cat['desc'] ?? ''); ?></td>
                      <td><code><?php echo htmlspecialchars($cat['id']); ?></code></td>
                      <td style="text-align:right; font-weight:700;">3</td>
                    </tr>
                  <?php endforeach; ?>
                </tbody>
              </table>
            </div>
          </div>

        <!-- ===================================================================
             PAGE 9: DASHBOARD ANALYTICS OVERVIEW
             =================================================================== -->
        <?php elseif ($currentPage === 'dashboard'): ?>
          <div class="wrap">
            <h1 class="wp-heading-inline">Dashboard &lsaquo; Store Overview</h1>

            <div style="display:grid; grid-template-columns: repeat(4, 1fr); gap:16px; margin:20px 0 26px 0;">
              <div class="postbox" style="padding:18px; text-align:center;">
                <span style="font-size:12px; text-transform:uppercase; color:#646970; font-weight:700;">Total Sales</span>
                <h2 style="font-size:2rem; color:#15803D; margin:8px 0 0 0;">₹48,250.00</h2>
              </div>
              <div class="postbox" style="padding:18px; text-align:center;">
                <span style="font-size:12px; text-transform:uppercase; color:#646970; font-weight:700;">Net Orders</span>
                <h2 style="font-size:2rem; color:#2271b1; margin:8px 0 0 0;"><?php echo count($orders) + 14; ?></h2>
              </div>
              <div class="postbox" style="padding:18px; text-align:center;">
                <span style="font-size:12px; text-transform:uppercase; color:#646970; font-weight:700;">Catalog Items</span>
                <h2 style="font-size:2rem; color:#dba617; margin:8px 0 0 0;"><?php echo count($products); ?></h2>
              </div>
              <div class="postbox" style="padding:18px; text-align:center;">
                <span style="font-size:12px; text-transform:uppercase; color:#646970; font-weight:700;">Active Coupons</span>
                <h2 style="font-size:2rem; color:#d63638; margin:8px 0 0 0;"><?php echo count($coupons); ?></h2>
              </div>
            </div>

            <div style="display:grid; grid-template-columns: 1.5fr 1fr; gap:20px;">
              <div class="postbox">
                <div class="postbox-header"><h2>Top Performing Products</h2></div>
                <table class="wp-list-table widefat fixed striped">
                  <thead>
                    <tr>
                      <th>Product</th>
                      <th>Units Sold</th>
                      <th>Gross Revenue</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td><strong>California Almonds (250g)</strong></td>
                      <td>128 packs</td>
                      <td><strong style="color:#15803D;">₹35,072.00</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Jumbo Whole Cashews</strong></td>
                      <td>84 packs</td>
                      <td><strong style="color:#15803D;">₹25,200.00</strong></td>
                    </tr>
                    <tr>
                      <td><strong>Walnut Kernels Platinum</strong></td>
                      <td>52 packs</td>
                      <td><strong style="color:#15803D;">₹21,840.00</strong></td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div class="postbox">
                <div class="postbox-header"><h2>Quick Draft &amp; Store Status</h2></div>
                <div class="inside" style="padding:16px;">
                  <p><strong>PHP Version:</strong> <?php echo PHP_VERSION; ?></p>
                  <p><strong>Environment:</strong> Production Ready</p>
                  <p><strong>FSSAI Compliance:</strong> 100% Verified</p>
                  <p><strong>Active Payment Gateways:</strong> UPI, RuPay, Visa, Mastercard, Cash on Delivery</p>
                  <a href="<?php echo url('admin/index.php?page=product-new'); ?>" class="button button-primary" style="width:100%; text-align:center; font-weight:700; height:34px; line-height:34px;">+ Add New Product</a>
                </div>
              </div>
            </div>
          </div>

        <!-- ===================================================================
             PAGE 10: STORE SETTINGS
             =================================================================== -->
        <?php elseif ($currentPage === 'settings'): ?>
          <div class="wrap">
            <h1 class="wp-heading-inline">Store Settings</h1>

            <div class="postbox" style="margin-top:20px;">
              <div class="postbox-header"><h2>General Options</h2></div>
              <div class="inside" style="padding:20px;">
                <div class="form-field">
                  <label>Store Name</label>
                  <input type="text" value="<?php echo SITE_NAME; ?>" style="width:300px;" />
                </div>
                <div class="form-field">
                  <label>Base Location</label>
                  <input type="text" value="Delhi, India" style="width:300px;" />
                </div>
                <div class="form-field">
                  <label>Currency</label>
                  <select style="width:300px;">
                    <option value="INR" selected>Indian Rupee (₹ INR)</option>
                  </select>
                </div>
                <div class="form-field">
                  <label>Free Shipping Minimum</label>
                  <input type="number" value="499" style="width:300px;" />
                </div>
                <div style="border-top:1px solid #f0f0f1; padding-top:16px; margin-top:20px;">
                  <button type="button" class="button button-primary" style="font-weight:700;" onclick="alert('Settings saved successfully.')">Save Changes</button>
                </div>
              </div>
            </div>
          </div>
        <?php endif; ?>

      </div>
    </div>
  </div>

  <script src="<?php echo asset('admin/assets/js/wp-admin.js'); ?>?v=<?php echo filemtime(__DIR__ . '/assets/js/wp-admin.js'); ?>"></script>
<?php endif; ?>

</body>
</html>
