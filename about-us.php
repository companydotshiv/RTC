<?php
/**
 * RTC Foods - About Us Page
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$pageTitle = 'About Us - Our Heritage & Quality Promise';
$pageDescription = 'Learn about RTC Foods: 25+ years of sourcing authentic dry fruits, spices, and seeds directly from certified global growers and Indian heritage farms.';

include __DIR__ . '/includes/header.php';
?>

<div class="content-page-section">
  <div class="site-container">
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current">About Us</span>
    </div>

    <!-- About Hero -->
    <div class="about-hero-card text-center">
      <span class="section-pre-title text-gold">Heritage of Purity</span>
      <h1 class="about-hero-title">Passion for <span class="gold-gradient-text">Uncompromised Wellness</span></h1>
      <p class="about-hero-desc">
        From the bustling heart of Asia's historic spice hub in Khari Baoli to our modern ISO-certified processing plant in Kundli, RTC Foods brings India the purest dry fruits, nuts, seeds, and spices directly from farm sources.
      </p>
    </div>

    <!-- Milestones Stats Grid -->
    <div class="about-stats-grid">
      <div class="about-stat-card">
        <span class="stat-number gold-text">25+</span>
        <span class="stat-label">Years of Spice & Nut Heritage</span>
      </div>
      <div class="about-stat-card">
        <span class="stat-number gold-text">150+</span>
        <span class="stat-label">100% Pure & Natural SKUs</span>
      </div>
      <div class="about-stat-card">
        <span class="stat-number gold-text">50,000+</span>
        <span class="stat-label">Happy Families Across India</span>
      </div>
      <div class="about-stat-card">
        <span class="stat-number gold-text">100%</span>
        <span class="stat-label">Direct Farm Orchard Sourced</span>
      </div>
    </div>

    <!-- Our Journey & Mission -->
    <div class="about-story-grid">
      <div class="story-content">
        <span class="section-pre-title">Our Story</span>
        <h2 class="section-title">Rooted in Tradition, Driven by Hygiene</h2>
        <p>
          Founded on the uncompromising principle that nutritious food must never be chemically altered or superficially polished, RTC Foods started as a trusted wholesale purveyor of whole spices and Californian raw almonds.
        </p>
        <p>
          Over decades of dedicated sourcing, our relationships with almond growers in the Sacramento Valley of California, walnut orchards in the valleys of Kashmir, and spice farmers across Kerala and Rajasthan have flourished. We bypass unnecessary middlemen so our customers receive the freshest harvest at honest prices.
        </p>
        <p>
          Today, our state-of-the-art packaging unit utilizes automated multi-head weighers and nitrogen-flush sealing to ensure that the aroma, crisp crunch, and natural oils remain locked in until the moment you break the seal.
        </p>
      </div>
      <div class="story-image-wrap">
        <img src="<?php echo asset('bulk_order_wall.jpg'); ?>" alt="RTC Sourcing & Packaging" class="story-img" />
      </div>
    </div>

    <!-- Core Pillars -->
    <div class="about-values-section">
      <div class="section-header text-center">
        <span class="section-pre-title">What Defines Us</span>
        <h2 class="section-title">The 4 RTC Quality Pillars</h2>
      </div>

      <div class="values-grid">
        <div class="value-card">
          <div class="value-icon"><i data-lucide="globe"></i></div>
          <h3>Direct Origin Sourcing</h3>
          <p>Every almond, walnut, and spice kernel is traced to verified certified orchards with zero unauthorized blending.</p>
        </div>

        <div class="value-card">
          <div class="value-icon"><i data-lucide="shield-check"></i></div>
          <h3>Nitrogen-Sealed Freshness</h3>
          <p>We eliminate oxygen and moisture in our vacuum and nitrogen packaging to prevent rancidity naturally.</p>
        </div>

        <div class="value-card">
          <div class="value-icon"><i data-lucide="leaf"></i></div>
          <h3>Zero Chemical Polish</h3>
          <p>Natural raw dry fruits should look and taste natural. We never use artificial gloss, mineral oils, or sulphur fumigation.</p>
        </div>

        <div class="value-card">
          <div class="value-icon"><i data-lucide="award"></i></div>
          <h3>Food Safety First</h3>
          <p>FSSAI certified and lab tested for purity, microbial safety, moisture levels, and essential nutritional density.</p>
        </div>
      </div>
    </div>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
