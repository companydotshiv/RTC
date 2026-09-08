<?php
/**
 * RTC Foods - Header Partial
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';
require_once __DIR__ . '/data.php';

$cartCount = get_cart_count();
$wishlistCount = count(get_wishlist());
$categories = get_all_categories();
$currentUrl = $_SERVER['REQUEST_URI'] ?? '';
?>
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0" />
  <title><?php echo isset($pageTitle) ? htmlspecialchars($pageTitle) . ' | ' . SITE_NAME : SITE_NAME . ' - ' . SITE_TAGLINE; ?></title>
  <meta name="description" content="<?php echo isset($pageDescription) ? htmlspecialchars($pageDescription) : 'Shop premium quality dry fruits, whole spices, berries, seeds, and luxury festive gifting boxes online from RTC Foods.'; ?>" />
  <link rel="icon" type="image/svg+xml" href="<?php echo asset('favicon.svg'); ?>" />

  <!-- Google Fonts: Poppins (Body/General) & Roboto (Headings/Titles) -->
  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />
  <link href="https://fonts.googleapis.com/css2?family=Poppins:ital,wght@0,300;0,400;0,500;0,600;0,700;1,400;1,600&family=Roboto:ital,wght@0,400;0,500;0,700;0,900;1,400;1,700&display=swap" rel="stylesheet" />

  <!-- Lucide Icons Library -->
  <script src="https://unpkg.com/lucide@latest"></script>

  <!-- Main Stylesheet -->
  <link rel="stylesheet" href="<?php echo asset('assets/css/style.css'); ?>?v=<?php echo filemtime(__DIR__ . '/../assets/css/style.css'); ?>" />

  <script>
    window.RTC_BASE_URL = <?php echo json_encode(BASE_URL); ?>;
  </script>
</head>
<body>

  <!-- Top Announcement Bar (Carousel + Centered Phone) -->
  <div class="announcement-bar">
    <div class="announcement-container">
      <!-- Promo Messages Carousel (One-by-One) -->
      <div class="announcement-carousel" id="announcement-carousel">
        <div class="announcement-track">
          <div class="announcement-slide active">
            <span>✨ Use Code <strong>WELCOME10</strong> for 10% OFF your first order!</span>
          </div>
          <div class="announcement-slide">
            <span>🚚 Free Express Shipping across India on orders above ₹499</span>
          </div>
          <div class="announcement-slide mobile-only-slide">
            <a href="tel:+919876543210" class="announcement-phone-mobile">
              <i data-lucide="phone"></i> Call Us: <strong>+91 98765 43210</strong>
            </a>
          </div>
        </div>
      </div>

      <!-- Centered Phone Number (Desktop) -->
      <div class="announcement-center-phone">
        <a href="tel:+919876543210" class="announcement-phone-link">
          <i data-lucide="phone"></i> +91 98765 43210
        </a>
      </div>

      <!-- Right Spacer for Symmetric Dead-Centering -->
      <div class="announcement-right-space" aria-hidden="true"></div>
    </div>
  </div>

  <script>
    // Announcement Bar Ticker Carousel
    (function () {
      const slides = document.querySelectorAll('.announcement-slide');
      if (!slides || slides.length < 2) return;
      let idx = 0;
      setInterval(function () {
        slides[idx].classList.remove('active');
        idx = (idx + 1) % slides.length;
        slides[idx].classList.add('active');
      }, 3500);
    })();
  </script>

  <!-- Main Header -->
  <header class="site-header">
    <div class="header-container">
      <!-- Mobile Hamburger Button -->
      <button type="button" class="mobile-menu-btn" id="mobile-menu-btn" aria-label="Open Navigation">
        <i data-lucide="menu"></i>
      </button>

      <!-- Brand Logo -->
      <div class="header-logo-container">
        <a href="<?php echo url('index.php'); ?>" class="site-logo-link">
          <img src="<?php echo asset('rtc-logo.png'); ?>" alt="RTC Foods Logo" class="header-logo" onerror="this.onerror=null;this.src='<?php echo asset('rtc-logo-transparent.png'); ?>';" />
        </a>
      </div>

      <!-- Desktop Navigation Menu -->
      <nav class="main-navigation" aria-label="Primary Navigation">
        <ul class="nav-menu">
          <li class="nav-item"><a href="<?php echo url('index.php'); ?>" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) === 'index.php' ? 'active' : ''; ?>">Home</a></li>
          
          <!-- Products Dropdown -->
          <li class="nav-item dropdown">
            <a href="<?php echo url('products.php'); ?>" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) === 'products.php' ? 'active' : ''; ?>">
              Shop Products <i data-lucide="chevron-down" class="dropdown-icon"></i>
            </a>
            <ul class="dropdown-menu">
              <li><a href="<?php echo url('products.php'); ?>">All Products</a></li>
              <?php foreach ($categories as $cat): ?>
                <li><a href="<?php echo url('products.php?category=' . urlencode($cat['id'])); ?>"><?php echo htmlspecialchars($cat['name']); ?></a></li>
              <?php endforeach; ?>
            </ul>
          </li>

          <li class="nav-item"><a href="<?php echo url('about-us.php'); ?>" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) === 'about-us.php' ? 'active' : ''; ?>">About Us</a></li>
          <li class="nav-item"><a href="<?php echo url('certificates.php'); ?>" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) === 'certificates.php' ? 'active' : ''; ?>">Certificates</a></li>
          <li class="nav-item"><a href="<?php echo url('blog.php'); ?>" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) === 'blog.php' ? 'active' : ''; ?>">Wellness Blog</a></li>
          <li class="nav-item"><a href="<?php echo url('contact-us.php'); ?>" class="nav-link <?php echo basename($_SERVER['PHP_SELF']) === 'contact-us.php' ? 'active' : ''; ?>">Contact</a></li>
        </ul>
      </nav>

      <!-- Header Action Icons -->
      <div class="header-actions">
        <!-- Search Trigger -->
        <button type="button" class="header-icon-btn" id="header-search-btn" aria-label="Search">
          <i data-lucide="search"></i>
        </button>

        <!-- Wishlist Link -->
        <a href="<?php echo url('wishlist.php'); ?>" class="header-icon-btn" aria-label="Wishlist" title="Wishlist">
          <i data-lucide="heart"></i>
          <span class="badge-count wishlist-count-badge" style="<?php echo $wishlistCount > 0 ? '' : 'display:none;'; ?>"><?php echo $wishlistCount; ?></span>
        </a>

        <!-- Account Link -->
        <a href="<?php echo url('account.php'); ?>" class="header-icon-btn" aria-label="My Account" title="My Account">
          <i data-lucide="user"></i>
        </a>

        <!-- Shopping Cart Trigger Button -->
        <button type="button" class="header-icon-btn cart-trigger-btn" aria-label="Shopping Cart" title="View Cart">
          <i data-lucide="shopping-bag"></i>
          <span class="badge-count cart-count-badge" style="<?php echo $cartCount > 0 ? '' : 'display:none;'; ?>"><?php echo $cartCount; ?></span>
        </button>
      </div>
    </div>
  </header>

  <!-- Mobile Navigation Drawer -->
  <div class="mobile-nav-overlay" id="mobile-nav-overlay"></div>
  <aside class="mobile-nav-drawer" id="mobile-nav-drawer">
    <div class="mobile-nav-header">
      <img src="<?php echo asset('rtc-logo.png'); ?>" alt="RTC Logo" class="mobile-logo" />
      <button type="button" class="close-drawer-btn" id="mobile-nav-close" aria-label="Close menu">
        <i data-lucide="x"></i>
      </button>
    </div>
    <ul class="mobile-menu-links">
      <li><a href="<?php echo url('index.php'); ?>"><i data-lucide="home"></i> Home</a></li>
      <li><a href="<?php echo url('products.php'); ?>"><i data-lucide="package"></i> Shop All Products</a></li>
      <li class="mobile-category-header">Categories</li>
      <?php foreach ($categories as $cat): ?>
        <li class="mobile-sublink"><a href="<?php echo url('products.php?category=' . urlencode($cat['id'])); ?>"><?php echo htmlspecialchars($cat['name']); ?></a></li>
      <?php endforeach; ?>
      <li class="mobile-category-header">Company</li>
      <li><a href="<?php echo url('about-us.php'); ?>"><i data-lucide="info"></i> About RTC Foods</a></li>
      <li><a href="<?php echo url('certificates.php'); ?>"><i data-lucide="shield-check"></i> Quality & Certifications</a></li>
      <li><a href="<?php echo url('blog.php'); ?>"><i data-lucide="book-open"></i> Health & Recipes Blog</a></li>
      <li><a href="<?php echo url('faqs.php'); ?>"><i data-lucide="help-circle"></i> FAQs</a></li>
      <li><a href="<?php echo url('contact-us.php'); ?>"><i data-lucide="phone"></i> Contact Us</a></li>
      <li><a href="<?php echo url('account.php'); ?>"><i data-lucide="user"></i> My Account & Orders</a></li>
    </ul>
  </aside>

  <!-- Slide-Out Cart Drawer -->
  <div class="cart-overlay" id="cart-overlay"></div>
  <aside class="cart-drawer" id="cart-drawer" aria-label="Shopping Cart Drawer">
    <div class="cart-drawer-header">
      <div class="cart-drawer-title-box">
        <i data-lucide="shopping-bag"></i>
        <h3>Your Cart (<span class="cart-count-badge"><?php echo $cartCount; ?></span>)</h3>
      </div>
      <button type="button" class="close-drawer-btn" id="cart-close-btn" aria-label="Close cart">
        <i data-lucide="x"></i>
      </button>
    </div>

    <div class="cart-drawer-body">
      <div id="cart-drawer-empty" class="cart-empty-state" style="<?php echo $cartCount === 0 ? 'display:block;' : 'display:none;'; ?>">
        <div class="empty-icon"><i data-lucide="shopping-bag"></i></div>
        <h4>Your cart is empty</h4>
        <p>Explore our premium dry fruits and fresh spices!</p>
        <a href="<?php echo url('products.php'); ?>" class="btn-primary-gold" onclick="closeCartDrawer()">Start Shopping</a>
      </div>

      <div id="cart-drawer-items" class="cart-drawer-items-list">
        <!-- Rendered dynamically by app.js -->
        <?php foreach (get_cart() as $cartKey => $item): ?>
          <div class="cart-drawer-item" data-cart-key="<?php echo htmlspecialchars($cartKey); ?>">
            <img src="<?php echo asset($item['image']); ?>" alt="<?php echo htmlspecialchars($item['name']); ?>" class="cart-item-thumb" />
            <div class="cart-item-details">
              <h4 class="cart-item-title"><?php echo htmlspecialchars($item['name']); ?></h4>
              <div class="cart-item-meta">
                <span class="cart-item-weight"><?php echo htmlspecialchars($item['weight'] ?? '250g'); ?></span>
                <span class="cart-item-price"><?php echo format_price($item['price']); ?></span>
              </div>
              <div class="cart-item-qty-row">
                <div class="qty-control">
                  <button type="button" class="qty-btn qty-minus" data-key="<?php echo htmlspecialchars($cartKey); ?>" data-qty="<?php echo max(0, $item['quantity'] - 1); ?>">-</button>
                  <span class="qty-val"><?php echo (int)$item['quantity']; ?></span>
                  <button type="button" class="qty-btn qty-plus" data-key="<?php echo htmlspecialchars($cartKey); ?>" data-qty="<?php echo $item['quantity'] + 1; ?>">+</button>
                </div>
                <button type="button" class="cart-item-remove" data-key="<?php echo htmlspecialchars($cartKey); ?>" title="Remove item">
                  <i data-lucide="trash-2"></i>
                </button>
              </div>
            </div>
          </div>
        <?php endforeach; ?>
      </div>
    </div>

    <div class="cart-drawer-footer" id="cart-drawer-footer" style="<?php echo $cartCount > 0 ? 'display:block;' : 'display:none;'; ?>">
      <div class="cart-drawer-summary">
        <div class="summary-row">
          <span>Estimated Subtotal:</span>
          <strong id="cart-drawer-subtotal" class="gold-text"><?php echo format_price(get_cart_subtotal()); ?></strong>
        </div>
        <p class="shipping-note">Taxes & shipping calculated at checkout.</p>
      </div>
      <div class="cart-drawer-actions">
        <a href="<?php echo url('checkout.php'); ?>" class="btn-checkout-primary">Proceed to Checkout <i data-lucide="arrow-right"></i></a>
        <a href="<?php echo url('cart.php'); ?>" class="btn-view-cart-link">View Full Cart</a>
      </div>
    </div>
  </aside>

  <!-- Search Modal Overlay -->
  <div class="search-modal" id="search-modal">
    <div class="search-modal-content">
      <div class="search-modal-header">
        <h3>Search RTC Foods</h3>
        <button type="button" class="close-drawer-btn" id="search-modal-close"><i data-lucide="x"></i></button>
      </div>
      <form action="<?php echo url('products.php'); ?>" method="GET" class="search-modal-form">
        <div class="search-input-wrapper">
          <i data-lucide="search"></i>
          <input type="text" name="q" id="search-modal-input" placeholder="Search almonds, cashews, saffron, spices..." required />
          <button type="submit" class="btn-search-submit">Search</button>
        </div>
      </form>
    </div>
  </div>

  <main class="site-main">
