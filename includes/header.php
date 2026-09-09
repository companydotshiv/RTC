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

      <!-- Right Social Media Icons -->
      <div class="announcement-social-links">
        <span class="announcement-social-label">Follow Us:</span>
        <a href="https://instagram.com" target="_blank" rel="noopener noreferrer" aria-label="Follow RTC Foods on Instagram" class="announcement-social-link" title="Instagram">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round">
            <rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line>
          </svg>
        </a>
        <a href="https://facebook.com" target="_blank" rel="noopener noreferrer" aria-label="Follow RTC Foods on Facebook" class="announcement-social-link" title="Facebook">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"/>
          </svg>
        </a>
        <a href="https://wa.me/919876543210" target="_blank" rel="noopener noreferrer" aria-label="Chat with RTC Foods on WhatsApp" class="announcement-social-link" title="WhatsApp">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946.003-6.556 5.338-11.891 11.893-11.891 3.181.001 6.167 1.24 8.413 3.488 2.245 2.248 3.481 5.236 3.48 8.414-.003 6.557-5.338 11.892-11.893 11.892-1.99-.001-3.951-.5-5.688-1.448l-6.305 1.654zm6.597-3.807c1.676.995 3.276 1.591 5.392 1.592 5.448 0 9.886-4.434 9.889-9.885.002-5.462-4.415-9.89-9.881-9.892-5.452 0-9.887 4.434-9.889 9.884-.001 2.225.651 3.891 1.746 5.634l-.999 3.648 3.742-.981zm11.387-5.464c-.074-.124-.272-.198-.57-.347-.297-.149-1.758-.868-2.031-.967-.272-.099-.47-.149-.669.149-.198.297-.768.967-.941 1.165-.173.198-.347.223-.644.074-.297-.149-1.255-.462-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.297-.347.446-.521.151-.172.2-.296.3-.495.099-.198.05-.372-.025-.521-.075-.148-.669-1.611-.916-2.206-.242-.579-.487-.501-.669-.51l-.57-.01c-.198 0-.52.074-.792.372s-1.04 1.016-1.04 2.479 1.065 2.876 1.213 3.074c.149.198 2.095 3.2 5.076 4.487.709.306 1.263.489 1.694.626.712.226 1.36.194 1.872.118.571-.085 1.758-.719 2.006-1.413.248-.695.248-1.29.173-1.414z"/>
          </svg>
        </a>
        <a href="https://youtube.com" target="_blank" rel="noopener noreferrer" aria-label="Subscribe to RTC Foods on YouTube" class="announcement-social-link" title="YouTube">
          <svg viewBox="0 0 24 24" width="13" height="13" fill="currentColor">
            <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z"/>
          </svg>
        </a>
      </div>
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
