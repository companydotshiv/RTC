<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title><?php echo isset($page_title) ? $page_title . ' | RTC Foods' : 'RTC Foods - Premium Dry Fruits, Nuts & Spices'; ?></title>
    <meta name="description" content="RTC Foods - Over 30 years of excellence in sourcing and supplying top-grade Dry Fruits, Nuts, Spices, and Healthy Snacking Fusions in India.">
    <!-- Google Fonts -->
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&family=Outfit:wght@600;700;800&display=swap" rel="stylesheet">
    <!-- FontAwesome Icons -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <!-- Main CSS -->
    <link rel="stylesheet" href="assets/css/style.css">
</head>
<body>
    <!-- Top Announcement Bar -->
    <div class="top-bar">
        <div class="container">
            <div class="top-bar-info">
                <span><i class="fa-solid fa-truck-fast"></i> Free shipping over ₹500</span>
                <span><i class="fa-solid fa-tag"></i> 20% off on all products | Buy Now</span>
            </div>
            <div class="top-bar-info">
                <span><i class="fa-solid fa-phone"></i> Helpline: +91 98765 43210</span>
            </div>
        </div>
    </div>

    <!-- Main Navigation Bar -->
    <header class="main-header">
        <div class="container">
            <nav class="navbar">
                <a href="index.php" class="brand-logo">
                    <img src="assets/images/rtc-logo.png" alt="RTC Foods Logo" style="height: 44px; width: auto;">
                </a>

                <ul class="nav-menu">
                    <li><a href="index.php" class="nav-link <?php echo ($current_page == 'home') ? 'active' : ''; ?>">Home</a></li>
                    <li><a href="products.php" class="nav-link <?php echo ($current_page == 'products') ? 'active' : ''; ?>">All Products</a></li>
                    <li><a href="products.php?cat=dry-fruits" class="nav-link">Dry Fruits</a></li>
                    <li><a href="products.php?cat=seeds-berries" class="nav-link">Seeds</a></li>
                    <li><a href="#wholesale" class="nav-link">Bulk Order</a></li>
                    <li><a href="#wholesale" class="nav-link">Private Labelling</a></li>
                </ul>

                <div class="header-actions">
                    <button class="icon-btn" onclick="window.location.href='products.php'" title="Search Products">
                        <i class="fa-solid fa-magnifying-glass"></i>
                    </button>
                    <button class="icon-btn" onclick="showToast('Cart is currently empty')" title="Shopping Cart">
                        <i class="fa-solid fa-bag-shopping"></i>
                        <span class="badge-count">0</span>
                    </button>
                    <a href="products.php" class="btn btn-primary" style="padding: 8px 18px; font-size: 0.85rem;">Shop Now</a>
                </div>
            </nav>
        </div>
    </header>
