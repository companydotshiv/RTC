<?php
/**
 * RTC Foods - Single Blog Post Page
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$slug = clean_input($_GET['slug'] ?? '');
$post = get_blog_post_by_slug($slug);

if (!$post) {
    http_response_code(404);
    $pageTitle = 'Article Not Found';
    include __DIR__ . '/includes/header.php';
    ?>
    <div class="site-container page-padding text-center">
      <div class="empty-state-box">
        <i data-lucide="alert-circle" class="large-icon text-gold"></i>
        <h2>Article Not Found</h2>
        <p>The requested blog article could not be found.</p>
        <a href="<?php echo url('blog.php'); ?>" class="btn-primary-gold">Explore All Articles</a>
      </div>
    </div>
    <?php
    include __DIR__ . '/includes/footer.php';
    exit;
}

$pageTitle = $post['title'] . ' | RTC Foods Blog';
$pageDescription = $post['summary'] ?? '';

$allPosts = get_all_blog_posts();
$relatedPosts = array_filter($allPosts, fn($p) => ($p['slug'] ?? '') !== $post['slug']);
$relatedPosts = array_slice($relatedPosts, 0, 3);

include __DIR__ . '/includes/header.php';
?>

<div class="blog-article-page">
  <div class="site-container">
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <a href="<?php echo url('blog.php'); ?>">Blog</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current"><?php echo htmlspecialchars($post['title']); ?></span>
    </div>

    <article class="article-container">
      <div class="article-header">
        <span class="article-category-badge"><?php echo htmlspecialchars($post['category']); ?></span>
        <h1 class="article-title"><?php echo htmlspecialchars($post['title']); ?></h1>
        
        <div class="article-meta-row">
          <div class="author-info">
            <span class="author-name"><?php echo htmlspecialchars($post['author']); ?></span>
            <span class="author-role"><?php echo htmlspecialchars($post['authorRole']); ?></span>
          </div>
          <div class="article-date-read">
            <span><i data-lucide="calendar"></i> <?php echo htmlspecialchars($post['date']); ?></span>
            <span><i data-lucide="clock"></i> <?php echo htmlspecialchars($post['readTime']); ?></span>
          </div>
        </div>
      </div>

      <div class="article-featured-image-wrap">
        <img src="<?php echo asset($post['image']); ?>" alt="<?php echo htmlspecialchars($post['title']); ?>" class="article-featured-img" />
      </div>

      <div class="article-body">
        <p class="article-lead"><?php echo htmlspecialchars($post['summary']); ?></p>

        <?php foreach ($post['content'] as $para): ?>
          <p><?php echo htmlspecialchars($para); ?></p>
        <?php endforeach; ?>

        <?php if (!empty($post['takeaways'])): ?>
          <div class="article-takeaways-card">
            <h3><i data-lucide="check-circle" class="green-icon"></i> Key Takeaways</h3>
            <ul>
              <?php foreach ($post['takeaways'] as $t): ?>
                <li><?php echo htmlspecialchars($t); ?></li>
              <?php endforeach; ?>
            </ul>
          </div>
        <?php endif; ?>

        <?php if (!empty($post['nutritionalHighlights'])): ?>
          <div class="article-nutrition-card">
            <h3>Nutritional Highlights:</h3>
            <div class="nutrition-pills-grid">
              <?php foreach ($post['nutritionalHighlights'] as $nh): ?>
                <div class="nutrition-pill">
                  <span class="nh-label"><?php echo htmlspecialchars($nh['label']); ?></span>
                  <strong class="nh-value gold-text"><?php echo htmlspecialchars($nh['value']); ?></strong>
                </div>
              <?php endforeach; ?>
            </div>
          </div>
        <?php endif; ?>

        <?php if (!empty($post['tags'])): ?>
          <div class="article-tags-wrap">
            <span class="tags-label">Tags:</span>
            <?php foreach ($post['tags'] as $tag): ?>
              <span class="article-tag">#<?php echo htmlspecialchars($tag); ?></span>
            <?php endforeach; ?>
          </div>
        <?php endif; ?>
      </div>
    </article>

    <?php if (count($relatedPosts) > 0): ?>
      <div class="related-articles-section">
        <h2 class="section-title">Related Wellness Reads</h2>
        <div class="blog-cards-grid">
          <?php foreach ($relatedPosts as $rPost): ?>
            <article class="blog-card">
              <a href="<?php echo url('blog-post.php?slug=' . urlencode($rPost['slug'])); ?>" class="blog-card-img-link">
                <img src="<?php echo asset($rPost['image']); ?>" alt="<?php echo htmlspecialchars($rPost['title']); ?>" loading="lazy" />
              </a>
              <div class="blog-card-body">
                <h3 class="blog-card-title">
                  <a href="<?php echo url('blog-post.php?slug=' . urlencode($rPost['slug'])); ?>"><?php echo htmlspecialchars($rPost['title']); ?></a>
                </h3>
                <a href="<?php echo url('blog-post.php?slug=' . urlencode($rPost['slug'])); ?>" class="blog-read-more">Read Article <i data-lucide="arrow-right"></i></a>
              </div>
            </article>
          <?php endforeach; ?>
        </div>
      </div>
    <?php endif; ?>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
