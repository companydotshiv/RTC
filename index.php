<?php
$page_title = 'RTC Foods - Premium Dry Fruits, Nuts & Spices';
$current_page = 'home';
require_once 'data/products.php';
include 'includes/header.php';
?>

<!-- Hero Banner Section -->
<section class="hero-section">
    <div class="hero-bg-overlay" style="background-image: url('assets/images/hero_dry_fruits_1785924400069.png');"></div>
    <div class="container">
        <div class="hero-content-grid">
            <div class="hero-text-side">
                <div class="hero-tag">
                    <i class="fa-solid fa-award"></i> 30+ Years of Pure Quality Legacy
                </div>
                <h1 class="hero-title">
                    Taste the Authentic Goodness of <span>Pure Dry Fruits & Spices</span>
                </h1>
                <p class="hero-desc">
                    Hygienically sorted, triple-graded whole cashews, almonds, pure Kashmiri saffron, and premium nuts delivered fresh from nature to your doorstep.
                </p>
                <div class="hero-actions">
                    <a href="products.php" class="btn btn-gold"><i class="fa-solid fa-cart-shopping"></i> Explore Collection</a>
                    <a href="#wholesale" class="btn btn-outline" style="border-color: rgba(255,255,255,0.4); color: #fff;">Bulk Inquiry</a>
                </div>
                <div class="hero-stats">
                    <div class="stat-item">
                        <h3>100%</h3>
                        <p>Natural & Lab Tested</p>
                    </div>
                    <div class="stat-item">
                        <h3>500+</h3>
                        <p>Wholesale Retailers</p>
                    </div>
                    <div class="stat-item">
                        <h3>30+ Yrs</h3>
                        <p>Industry Trust</p>
                    </div>
                </div>
            </div>
            <div class="hero-image-wrapper">
                <img src="assets/images/hero_dry_fruits_1785924400069.png" alt="RTC Foods Premium Dry Fruits" class="hero-main-img">
            </div>
        </div>
    </div>
</section>

<!-- Category Showcase Grid -->
<section class="section">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Our Product Lineup</span>
            <h2 class="section-title">Explore Our Pure Offerings</h2>
            <p>From jumbo king cashews to GI-tagged Kashmiri saffron strands, every item is carefully curated for uncompromised purity.</p>
        </div>

        <div class="products-grid" style="grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));">
            <?php foreach ($categories as $cat_key => $cat): ?>
                <div class="product-card" style="padding: 30px; text-align: center;">
                    <div style="width: 70px; height: 70px; background: rgba(27,77,62,0.1); border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 20px auto; color: var(--brand-green); font-size: 1.8rem;">
                        <i class="fa-solid <?php echo $cat['icon']; ?>"></i>
                    </div>
                    <h3 style="font-size: 1.25rem; margin-bottom: 12px;"><?php echo $cat['name']; ?></h3>
                    <p style="font-size: 0.9rem; color: var(--text-muted); margin-bottom: 20px; line-height: 1.5;"><?php echo $cat['desc']; ?></p>
                    <a href="products.php?cat=<?php echo $cat_key; ?>" class="btn btn-outline" style="padding: 8px 20px; font-size: 0.85rem;">View Range</a>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Bestselling Featured Products -->
<section class="section" style="background: #F4F1EA;">
    <div class="container">
        <div class="section-header">
            <span class="section-subtitle">Handpicked Selection</span>
            <h2 class="section-title">Top Bestselling Products</h2>
            <p>Direct from our state-of-the-art grading & packing facility in Sonipat.</p>
        </div>

        <div class="products-grid">
            <?php foreach ($products as $p): ?>
                <div class="product-card">
                    <div class="card-img-wrapper">
                        <span class="product-badge"><?php echo $p['badge']; ?></span>
                        <img src="assets/images/<?php echo $p['image']; ?>" alt="<?php echo $p['name']; ?>" class="card-img">
                    </div>
                    <div class="card-body">
                        <span class="card-category"><?php echo $p['category_name']; ?></span>
                        <h3 class="card-title">
                            <a href="product-detail.php?id=<?php echo $p['id']; ?>"><?php echo $p['name']; ?></a>
                        </h3>
                        <div class="card-rating">
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <i class="fa-solid fa-star"></i>
                            <span>(<?php echo $p['reviews_count']; ?> reviews)</span>
                        </div>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px; min-height: 40px;">
                            <?php echo $p['short_desc']; ?>
                        </p>
                        <div class="card-price-row">
                            <div class="price-box">
                                <span class="current-price">₹<?php echo $p['price']; ?></span>
                                <span class="old-price">₹<?php echo $p['original_price']; ?></span>
                            </div>
                            <a href="product-detail.php?id=<?php echo $p['id']; ?>" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">View Product</a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<!-- Wholesale & Private Labeling Banner -->
<section id="wholesale" class="section" style="background: var(--brand-green); color: #FFF;">
    <div class="container">
        <div class="hero-content-grid">
            <div>
                <span style="color: var(--primary-gold); font-weight: 700; text-transform: uppercase; letter-spacing: 2px;">Bulk Orders & Private Labeling</span>
                <h2 style="font-size: 2.5rem; color: #FFF; margin: 12px 0 20px 0;">Looking for Wholesale Supply or Customized Packaging?</h2>
                <p style="color: rgba(255,255,255,0.85); font-size: 1.05rem; margin-bottom: 30px;">
                    We cater to supermarket chains, hotel groups, corporate gifting partners, and sweet manufacturers across India. Get direct factory pricing, custom sizing, and private label branding.
                </p>
                <div style="display: flex; gap: 16px; flex-wrap: wrap;">
                    <a href="tel:+919876543210" class="btn btn-gold"><i class="fa-solid fa-phone"></i> Call Wholesale Team</a>
                    <button onclick="showToast('Inquiry request submitted. Our team will contact you within 2 hours.')" class="btn btn-outline" style="border-color: #FFF; color: #FFF;">Submit Business Inquiry</button>
                </div>
            </div>
            <div>
                <div style="background: rgba(255,255,255,0.06); padding: 36px; border-radius: var(--radius-md); border: 1px solid rgba(212,175,55,0.3);">
                    <h3 style="color: var(--primary-gold); margin-bottom: 20px; font-size: 1.4rem;">Quick Business Inquiry</h3>
                    <form onsubmit="event.preventDefault(); showToast('Inquiry sent successfully!');">
                        <div style="margin-bottom: 14px;">
                            <input type="text" placeholder="Your Name / Business Name" required style="width: 100%; padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: #fff;">
                        </div>
                        <div style="margin-bottom: 14px;">
                            <input type="tel" placeholder="Mobile Number" required style="width: 100%; padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: #fff;">
                        </div>
                        <div style="margin-bottom: 18px;">
                            <textarea placeholder="Requirement Details (e.g. 500kg Cashews W180)" rows="3" style="width: 100%; padding: 12px; border-radius: 6px; border: 1px solid rgba(255,255,255,0.2); background: rgba(0,0,0,0.2); color: #fff;"></textarea>
                        </div>
                        <button type="submit" class="btn btn-gold" style="width: 100%;">Send Bulk Inquiry</button>
                    </form>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
