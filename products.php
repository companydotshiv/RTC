<?php
/**
 * RTC Foods - Products Catalog & Filter
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$categories = get_all_categories();
$allProducts = get_all_products();

$selectedCategory = clean_input($_GET['category'] ?? 'all');
$searchQuery = clean_input($_GET['q'] ?? '');
$sortOption = clean_input($_GET['sort'] ?? 'featured');

// Filter by Category
$filteredProducts = $allProducts;
if (!empty($selectedCategory) && $selectedCategory !== 'all') {
    $filteredProducts = array_filter($filteredProducts, function ($p) use ($selectedCategory) {
        return ($p['category'] ?? '') === $selectedCategory;
    });
}

// Filter by Search Query
if (!empty($searchQuery)) {
    $qLower = strtolower($searchQuery);
    $filteredProducts = array_filter($filteredProducts, function ($p) use ($qLower) {
        return strpos(strtolower($p['name'] ?? ''), $qLower) !== false
            || strpos(strtolower($p['shortDesc'] ?? ''), $qLower) !== false
            || strpos(strtolower($p['categoryName'] ?? ''), $qLower) !== false
            || strpos(strtolower($p['subCategory'] ?? ''), $qLower) !== false;
    });
}

// Sort Products
if ($sortOption === 'price_asc') {
    usort($filteredProducts, fn($a, $b) => (float)$a['price'] <=> (float)$b['price']);
} elseif ($sortOption === 'price_desc') {
    usort($filteredProducts, fn($a, $b) => (float)$b['price'] <=> (float)$a['price']);
} elseif ($sortOption === 'rating') {
    usort($filteredProducts, fn($a, $b) => (float)($b['rating'] ?? 0) <=> (float)($a['rating'] ?? 0));
}

// Find Category Name for Title
$currentCategoryObj = null;
foreach ($categories as $cat) {
    if ($cat['id'] === $selectedCategory) {
        $currentCategoryObj = $cat;
        break;
    }
}

$pageTitle = $currentCategoryObj ? $currentCategoryObj['name'] . ' Collection' : ($searchQuery ? 'Search results for "' . htmlspecialchars($searchQuery) . '"' : 'All Products');
$pageDescription = $currentCategoryObj ? $currentCategoryObj['desc'] : 'Browse our comprehensive selection of fresh dry fruits, raw nuts, exotic berries, whole spices, and corporate gift hampers.';

include __DIR__ . '/includes/header.php';
?>

<!-- Shop Header Banner -->
<div class="shop-header-banner">
  <div class="site-container">
    <div class="breadcrumbs">
      <a href="<?php echo url('index.php'); ?>">Home</a>
      <span class="crumb-separator">/</span>
      <span class="crumb-current"><?php echo htmlspecialchars($pageTitle); ?></span>
    </div>
    <h1 class="shop-page-title"><?php echo htmlspecialchars($pageTitle); ?></h1>
    <p class="shop-page-desc"><?php echo htmlspecialchars($pageDescription); ?></p>
  </div>
</div>

<!-- Shop Main Content Area -->
<div class="shop-content-section">
  <div class="site-container">
    <!-- Category Filter Pills Bar -->
    <div class="category-pills-bar">
      <a href="<?php echo url('products.php' . ($searchQuery ? '?q=' . urlencode($searchQuery) : '')); ?>" 
         class="category-pill <?php echo $selectedCategory === 'all' ? 'active' : ''; ?>">
        All Products (<?php echo count($allProducts); ?>)
      </a>
      <?php foreach ($categories as $cat): ?>
        <?php
          $catCount = count(array_filter($allProducts, fn($p) => ($p['category'] ?? '') === $cat['id']));
          $isActive = $selectedCategory === $cat['id'];
          $pillUrl = url('products.php?category=' . urlencode($cat['id']) . ($searchQuery ? '&q=' . urlencode($searchQuery) : ''));
        ?>
        <a href="<?php echo $pillUrl; ?>" class="category-pill <?php echo $isActive ? 'active' : ''; ?>">
          <?php echo htmlspecialchars($cat['name']); ?> <span class="pill-count">(<?php echo $catCount; ?>)</span>
        </a>
      <?php endforeach; ?>
    </div>

    <!-- Toolbar: Results Count and Sorting -->
    <div class="shop-toolbar">
      <div class="results-count">
        Showing <strong><?php echo count($filteredProducts); ?></strong> <?php echo count($filteredProducts) === 1 ? 'product' : 'products'; ?>
        <?php if ($searchQuery): ?>
          for "<em><?php echo htmlspecialchars($searchQuery); ?></em>" (<a href="<?php echo url('products.php'); ?>" class="clear-search-link">clear search</a>)
        <?php endif; ?>
      </div>

      <div class="shop-sorting-wrap">
        <label for="sort-select">Sort By:</label>
        <select id="sort-select" onchange="window.location.href = this.value;">
          <?php
            $baseUrlParams = 'products.php?category=' . urlencode($selectedCategory) . ($searchQuery ? '&q=' . urlencode($searchQuery) : '');
          ?>
          <option value="<?php echo url($baseUrlParams . '&sort=featured'); ?>" <?php echo $sortOption === 'featured' ? 'selected' : ''; ?>>Featured</option>
          <option value="<?php echo url($baseUrlParams . '&sort=price_asc'); ?>" <?php echo $sortOption === 'price_asc' ? 'selected' : ''; ?>>Price: Low to High</option>
          <option value="<?php echo url($baseUrlParams . '&sort=price_desc'); ?>" <?php echo $sortOption === 'price_desc' ? 'selected' : ''; ?>>Price: High to Low</option>
          <option value="<?php echo url($baseUrlParams . '&sort=rating'); ?>" <?php echo $sortOption === 'rating' ? 'selected' : ''; ?>>Customer Rating</option>
        </select>
      </div>
    </div>

    <!-- Products Grid -->
    <?php if (count($filteredProducts) > 0): ?>
      <div class="products-grid">
        <?php foreach ($filteredProducts as $p): ?>
          <?php include __DIR__ . '/includes/product-card.php'; ?>
        <?php endforeach; ?>
      </div>
    <?php else: ?>
      <div class="no-products-found">
        <div class="empty-icon"><i data-lucide="search-x"></i></div>
        <h3>No Products Found</h3>
        <p>We couldn't find any products matching your current filters or search query.</p>
        <a href="<?php echo url('products.php'); ?>" class="btn-primary-gold">View All Products</a>
      </div>
    <?php endif; ?>
  </div>
</div>

<?php include __DIR__ . '/includes/footer.php'; ?>
