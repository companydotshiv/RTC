<?php
/**
 * RTC Foods - Homepage
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$pageTitle = 'Pure Dry Fruits, Organic Spices & Luxury Gifting';
$pageDescription = 'Discover pure California almonds, Kashmiri walnuts, jumbo cashews, authentic spices, and luxury festive gift boxes from RTC Foods.';

$categories = get_all_categories();
$products = get_all_products();
$blogPosts = array_slice(get_all_blog_posts(), 0, 3);
$featuredProducts = array_slice($products, 0, 8);

include __DIR__ . '/includes/header.php';
?>

<!-- Hero Slider Section -->
<section class="hero-section">
  <div class="hero-slider-container">
    <div class="hero-slide active">
      <img src="<?php echo asset('slide-2.jpg'); ?>" alt="Premium Dry Fruits & Nuts" class="hero-bg-img" />
      <div class="hero-overlay-content">
        <div class="hero-badge">Pure Harvest 2026</div>
        <h1 class="hero-title">Nature's Finest Crunch, <br /><span class="gold-gradient-text">Delivered to Your Door.</span></h1>
        <p class="hero-subtitle">
          Handpicked California almonds, Kashmiri walnuts, and Afghan figs sourced directly from certified orchards for unmatched freshness and wholesome nutrition.
        </p>
        <div class="hero-cta-group">
          <a href="<?php echo url('products.php'); ?>" class="btn-hero-primary">
            Explore All Products <i data-lucide="arrow-right"></i>
          </a>
          <a href="<?php echo url('products.php?category=gifting'); ?>" class="btn-hero-secondary">
            Corporate & Festive Gifting
          </a>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Trust & Value Pillars -->
<section class="trust-pillars-section">
  <div class="site-container">
    <div class="pillars-grid">
      <div class="pillar-card">
        <div class="pillar-icon"><i data-lucide="sparkles"></i></div>
        <div class="pillar-info">
          <h4>100% Pure & Natural</h4>
          <p>Zero preservatives, artificial coloring, or chemical polishing.</p>
        </div>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon"><i data-lucide="award"></i></div>
        <div class="pillar-info">
          <h4>Direct Farm Sourced</h4>
          <p>Carefully imported & handpicked from world's top growing regions.</p>
        </div>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon"><i data-lucide="shield-check"></i></div>
        <div class="pillar-info">
          <h4>Nitrogen Sealed Packaging</h4>
          <p>Keeps every kernel crisp, crunchy, and packed with vitamins.</p>
        </div>
      </div>

      <div class="pillar-card">
        <div class="pillar-icon"><i data-lucide="truck"></i></div>
        <div class="pillar-info">
          <h4>Free & Fast Delivery</h4>
          <p>Free standard shipping across India on orders above ₹499.</p>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Category Showcase Section -->
<section class="category-showcase-section">
  <div class="site-container">
    <div class="section-header text-center">
      <span class="section-pre-title">Curated Collections</span>
      <h2 class="section-title">Explore by Category</h2>
      <p class="section-desc">From nourishing everyday snacking nuts to royal whole spices and festive celebration boxes.</p>
    </div>

    <div class="category-cards-grid">
      <?php
      $catImages = [
        'dry-fruits' => 'cat_dry_fruits_all.png',
        'spices' => 'whole_spices_cardamom.jpg',
        'seeds-berries' => 'cat_seeds.png',
        'dehydrated-fruits' => 'cat_dehydrated.png',
        'chemical-herbs' => 'cat_herbs.png',
        'gifting' => 'thoughtful_gift_boxes.jpg'
      ];
      ?>
      <?php foreach ($categories as $cat): ?>
        <?php
          $catImg = $catImages[$cat['id']] ?? 'cat_dry_fruits_all.png';
          $catUrl = url('products.php?category=' . urlencode($cat['id']));
        ?>
        <a href="<?php echo $catUrl; ?>" class="category-card">
          <div class="category-card-img-wrap">
            <img src="<?php echo asset($catImg); ?>" alt="<?php echo htmlspecialchars($cat['name']); ?>" loading="lazy" />
          </div>
          <div class="category-card-overlay">
            <h3 class="category-card-title"><?php echo htmlspecialchars($cat['name']); ?></h3>
            <p class="category-card-desc"><?php echo htmlspecialchars($cat['desc']); ?></p>
            <span class="category-card-btn">Explore Range <i data-lucide="chevron-right"></i></span>
          </div>
        </a>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Featured Bestsellers Section -->
<section class="featured-products-section">
  <div class="site-container">
    <div class="section-header-flex">
      <div>
        <span class="section-pre-title">Handpicked Favorites</span>
        <h2 class="section-title">Best Sellers of the Season</h2>
      </div>
      <a href="<?php echo url('products.php'); ?>" class="view-all-link">
        View Full Collection <i data-lucide="arrow-right"></i>
      </a>
    </div>

    <div class="products-grid">
      <?php foreach ($featuredProducts as $p): ?>
        <?php include __DIR__ . '/includes/product-card.php'; ?>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<!-- Luxury Gifting Promo Banner -->
<section class="promo-gifting-section">
  <div class="site-container">
    <div class="promo-banner-card">
      <div class="promo-content">
        <span class="promo-badge">Celebration Edition</span>
        <h2 class="promo-title">Thoughtful Festive & Corporate Hampers</h2>
        <p class="promo-desc">
          Elevate your corporate gifting and festive celebrations with RTC Foods custom dry fruit hampers, wooden luxury keepsake boxes, and personalized branding.
        </p>
        <div class="promo-features">
          <div class="promo-feat"><i data-lucide="check-circle"></i> Custom Logo Engraving & Sleeve Printing</div>
          <div class="promo-feat"><i data-lucide="check-circle"></i> Nationwide Multi-Address Doorstep Delivery</div>
          <div class="promo-feat"><i data-lucide="check-circle"></i> Attractive Volume Discounts on Bulk Orders</div>
        </div>
        <div class="promo-actions">
          <a href="<?php echo url('products.php?category=gifting'); ?>" class="btn-primary-gold">
            Browse Gift Hampers <i data-lucide="gift"></i>
          </a>
          <a href="<?php echo url('contact-us.php?topic=bulk'); ?>" class="btn-outline-white">
            Request Bulk Quote
          </a>
        </div>
      </div>
      <div class="promo-media">
        <img src="<?php echo asset('thoughtful_gift_boxes_v3.jpg'); ?>" alt="Luxury Gift Boxes" onerror="this.onerror=null;this.src='<?php echo asset('thoughtful_gift_boxes.jpg'); ?>';" />
      </div>
    </div>
  </div>
</section>

<!-- Customer Reviews Section -->
<section class="testimonials-section">
  <div class="site-container">
    <div class="section-header text-center">
      <span class="section-pre-title">Real Customer Stories</span>
      <h2 class="section-title">Loved by Thousands of Families Across India</h2>
    </div>

    <div class="testimonials-grid">
      <div class="testimonial-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"The California almonds are exceptionally fresh and have that sweet, rich crunch you rarely find in local grocery stores. I soak them overnight for my children every morning."</p>
        <div class="testi-author">
          <strong>Priya Sharma</strong>
          <span>Verified Buyer, Mumbai</span>
        </div>
      </div>

      <div class="testimonial-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"Ordered 50 corporate gift boxes for Diwali. Every client loved the presentation and the uncompromised quality of the cashews and Kashmiri walnuts. Highly recommended!"</p>
        <div class="testi-author">
          <strong>Vikram Singhania</strong>
          <span>CEO, Singhania Logistics, Delhi</span>
        </div>
      </div>

      <div class="testimonial-card">
        <div class="testi-stars">★★★★★</div>
        <p class="testi-text">"The Turkish Figs and Chia Seeds are top-tier. Packaging was clean, vacuum-sealed, and arrived within 2 days in Ranchi. RTC Foods is now our permanent family dry fruits store."</p>
        <div class="testi-author">
          <strong>Ananya Roy</strong>
          <span>Fitness Trainer, Bengaluru</span>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Latest Wellness Blog Section -->
<section class="home-blog-section">
  <div class="site-container">
    <div class="section-header-flex">
      <div>
        <span class="section-pre-title">Wellness & Nutrition Lab</span>
        <h2 class="section-title">Insights for a Healthier Lifestyle</h2>
      </div>
      <a href="<?php echo url('blog.php'); ?>" class="view-all-link">
        Read All Articles <i data-lucide="arrow-right"></i>
      </a>
    </div>

    <div class="blog-cards-grid">
      <?php foreach ($blogPosts as $post): ?>
        <article class="blog-card">
          <a href="<?php echo url('blog-post.php?slug=' . urlencode($post['slug'])); ?>" class="blog-card-img-link">
            <img src="<?php echo asset($post['image']); ?>" alt="<?php echo htmlspecialchars($post['title']); ?>" loading="lazy" />
          </a>
          <div class="blog-card-body">
            <div class="blog-card-meta">
              <span class="blog-tag"><?php echo htmlspecialchars($post['category']); ?></span>
              <span class="blog-read-time"><i data-lucide="clock"></i> <?php echo htmlspecialchars($post['readTime']); ?></span>
            </div>
            <h3 class="blog-card-title">
              <a href="<?php echo url('blog-post.php?slug=' . urlencode($post['slug'])); ?>"><?php echo htmlspecialchars($post['title']); ?></a>
            </h3>
            <p class="blog-card-summary"><?php echo htmlspecialchars(mb_strimwidth($post['summary'], 0, 110, '...')); ?></p>
            <a href="<?php echo url('blog-post.php?slug=' . urlencode($post['slug'])); ?>" class="blog-read-more">
              Read Full Article <i data-lucide="arrow-right"></i>
            </a>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
