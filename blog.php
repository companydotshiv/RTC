<?php
/**
 * RTC Foods - Wellness & Nutrition Blog
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$pageTitle = 'Wellness & Nutrition Blog';
$pageDescription = 'Science-backed insights on dry fruit health benefits, daily memory nutrition, superfood recipes, and Ayurvedic dietary wellness from RTC Foods.';

$blogPosts = get_all_blog_posts();

include __DIR__ . '/includes/header.php';
?>

<div class="content-page-section">
  <div class="site-container">
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current">Wellness Blog</span>
    </div>

    <div class="section-header text-center">
      <span class="section-pre-title text-gold">RTC Nutrition Lab</span>
      <h1 class="section-title">Wholesome Living & Nutrition Insights</h1>
      <p class="section-desc">Discover the science, Ayurvedic wisdom, and culinary secrets behind nature's most nutrient-dense nuts, seeds, and spices.</p>
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
            <h2 class="blog-card-title">
              <a href="<?php echo url('blog-post.php?slug=' . urlencode($post['slug'])); ?>"><?php echo htmlspecialchars($post['title']); ?></a>
            </h2>
            <p class="blog-card-summary"><?php echo htmlspecialchars(mb_strimwidth($post['summary'], 0, 120, '...')); ?></p>
            <div class="blog-card-footer">
              <span class="blog-author"><i data-lucide="user"></i> <?php echo htmlspecialchars($post['author']); ?></span>
              <a href="<?php echo url('blog-post.php?slug=' . urlencode($post['slug'])); ?>" class="blog-read-more">Read More <i data-lucide="arrow-right"></i></a>
            </div>
          </div>
        </article>
      <?php endforeach; ?>
    </div>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
