<?php
/**
 * RTC Foods - Products Catalog with Left Sidebar Filters
 */
require_once __DIR__ . '/includes/config.php';
require_once __DIR__ . '/includes/functions.php';
require_once __DIR__ . '/includes/data.php';

$categories  = get_all_categories();
$allProducts = get_all_products();

$selectedCategory = clean_input($_GET['category'] ?? 'all');
$searchQuery      = clean_input($_GET['q'] ?? '');
$sortOption       = clean_input($_GET['sort'] ?? 'featured');
$minPrice         = isset($_GET['min_price']) ? (float)$_GET['min_price'] : 0;
$maxPrice         = isset($_GET['max_price']) ? (float)$_GET['max_price'] : 99999;
$minRating        = isset($_GET['rating']) ? (float)$_GET['rating'] : 0;
$inStockOnly      = isset($_GET['in_stock']) && $_GET['in_stock'] === '1';

// --- Compute global min/max prices for the range slider ---
$allPrices  = array_column($allProducts, 'price');
$globalMin  = (int)floor(min($allPrices));
$globalMax  = (int)ceil(max($allPrices));
$sliderMin  = ($minPrice > 0) ? (int)$minPrice : $globalMin;
$sliderMax  = ($maxPrice < 99999) ? (int)$maxPrice : $globalMax;

// --- Filter by Category ---
$filteredProducts = $allProducts;
if ($selectedCategory !== 'all') {
    $filteredProducts = array_filter($filteredProducts, fn($p) => product_matches_category($p, $selectedCategory));
}

// --- Filter by Search ---
if (!empty($searchQuery)) {
    $qLower = strtolower($searchQuery);
    $filteredProducts = array_filter($filteredProducts, fn($p) =>
        str_contains(strtolower($p['name'] ?? ''), $qLower) ||
        str_contains(strtolower($p['shortDesc'] ?? ''), $qLower) ||
        str_contains(strtolower($p['categoryName'] ?? ''), $qLower)
    );
}

// --- Filter by Price ---
if ($minPrice > 0 || $maxPrice < 99999) {
    $filteredProducts = array_filter($filteredProducts, fn($p) =>
        (float)($p['price'] ?? 0) >= $minPrice && (float)($p['price'] ?? 0) <= $maxPrice
    );
}

// --- Filter by Rating ---
if ($minRating > 0) {
    $filteredProducts = array_filter($filteredProducts, fn($p) =>
        (float)($p['rating'] ?? 0) >= $minRating
    );
}

// --- Sort ---
if ($sortOption === 'price_asc') {
    usort($filteredProducts, fn($a, $b) => (float)$a['price'] <=> (float)$b['price']);
} elseif ($sortOption === 'price_desc') {
    usort($filteredProducts, fn($a, $b) => (float)$b['price'] <=> (float)$a['price']);
} elseif ($sortOption === 'rating') {
    usort($filteredProducts, fn($a, $b) => (float)($b['rating'] ?? 0) <=> (float)($a['rating'] ?? 0));
} elseif ($sortOption === 'newest') {
    $filteredProducts = array_reverse($filteredProducts);
}

// --- Count per category ---
$categoryCounts = [];
foreach ($categories as $cat) {
    $categoryCounts[$cat['id']] = count(array_filter($allProducts, fn($p) => product_matches_category($p, $cat['id'])));
}

// --- Page meta & SEO Optimization ---
$currentCategoryObj = null;
foreach ($categories as $cat) {
    if ($cat['id'] === $selectedCategory) { $currentCategoryObj = $cat; break; }
}

if ($currentCategoryObj) {
    $pageTitle       = 'Buy ' . $currentCategoryObj['name'] . ' Online at Best Price in India';
    $heroHeading     = 'Buy ' . $currentCategoryObj['name'] . ' Online';
    $pageDescription = $currentCategoryObj['desc'] ?? ('Order fresh, 100% natural ' . strtolower($currentCategoryObj['name']) . ' online from RTC Foods with fast doorstep delivery across India.');
} elseif (!empty($searchQuery)) {
    $pageTitle       = 'Search results for "' . htmlspecialchars($searchQuery) . '"';
    $heroHeading     = 'Search: "' . htmlspecialchars($searchQuery) . '"';
    $pageDescription = 'Browse products matching your search query.';
} else {
    $pageTitle       = 'Buy Premium Dry Fruits, Nuts & Spices Online at Best Price';
    $heroHeading     = 'Premium Dry Fruits, Nuts &amp; Spices';
    $pageDescription = 'Browse our complete range of pure, farm-fresh dry fruits, healthy seeds, exotic berries, and whole spices online.';
}

// Build base URL for filter links
function filterUrl($overrides = []) {
    // If a category is selected or changed, reset all active filters (price, rating, search, stock, sort)
    if (isset($overrides['category'])) {
        $params = [
            'category' => $overrides['category'],
        ];
        if (isset($overrides['sort'])) {
            $params['sort'] = $overrides['sort'];
        }
    } else {
        $params = [
            'category'  => $_GET['category'] ?? 'all',
            'q'         => $_GET['q'] ?? '',
            'sort'      => $_GET['sort'] ?? 'featured',
            'min_price' => $_GET['min_price'] ?? '',
            'max_price' => $_GET['max_price'] ?? '',
            'rating'    => $_GET['rating'] ?? '',
            'in_stock'  => $_GET['in_stock'] ?? '',
        ];
        foreach ($overrides as $k => $v) { $params[$k] = $v; }
    }
    $query = http_build_query(array_filter($params, fn($v) => $v !== '' && $v !== 'all' && $v !== '0'));
    return url('products.php') . ($query ? '?' . $query : '');
}

$activeFilters = ($selectedCategory !== 'all' || $minPrice > 0 || $maxPrice < 99999 || $minRating > 0 || !empty($searchQuery));

// Determine hero image
$heroImg = 'cat_dry_fruits_all.png';
if ($currentCategoryObj && !empty($currentCategoryObj['image'])) {
    $heroImg = $currentCategoryObj['image'];
}

include __DIR__ . '/includes/header.php';
?>

<!-- Clean Category & Catalog Hero Section -->
<section class="cat-catalog-hero">
  <div class="site-container">
    <div class="cat-hero-grid">
      <!-- Left Column: Content & Metadata -->
      <div class="cat-hero-content">
        <nav class="cat-hero-breadcrumbs" aria-label="Breadcrumb">
          <a href="<?php echo url('index.php'); ?>"><i data-lucide="home"></i> Home</a>
          <span class="crumb-separator">/</span>
          <a href="<?php echo url('products.php'); ?>">Categories</a>
          <?php if ($currentCategoryObj): ?>
            <span class="crumb-separator">/</span>
            <span class="crumb-current"><?php echo htmlspecialchars($currentCategoryObj['name']); ?></span>
          <?php elseif (!empty($searchQuery)): ?>
            <span class="crumb-separator">/</span>
            <span class="crumb-current">Search</span>
          <?php else: ?>
            <span class="crumb-separator">/</span>
            <span class="crumb-current">All Products</span>
          <?php endif; ?>
        </nav>

        <h1 class="cat-hero-title"><?php echo $heroHeading; ?></h1>
        <p class="cat-hero-desc"><?php echo htmlspecialchars($pageDescription); ?></p>
      </div>

      <!-- Right Column: Visual Category Card -->
      <div class="cat-hero-visual">
        <div class="cat-hero-card">
          <div class="cat-hero-halo">
            <img src="<?php echo asset($heroImg); ?>"
                 alt="<?php echo htmlspecialchars($heroHeading); ?>"
                 class="cat-hero-product-img" />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

<!-- Shop Main: Sidebar + Grid -->
<div class="shop-content-section">
  <div class="site-container">
    <div class="shop-layout-with-sidebar">

      <!-- ══════════════════════ LEFT SIDEBAR ══════════════════════ -->
      <aside class="shop-sidebar-col" id="shop-sidebar">

        <!-- Sidebar Header -->
        <div class="sidebar-header">
          <h3 class="sidebar-heading"><i data-lucide="sliders-horizontal"></i> Filters</h3>
          <?php if ($activeFilters): ?>
            <a href="<?php echo filterUrl(['category' => $selectedCategory]); ?>" class="clear-all-filters">Clear All</a>
          <?php endif; ?>
        </div>

        <!-- ── Search Box ── -->
        <form method="GET" action="<?php echo url('products.php'); ?>" class="sidebar-search-form">
          <input type="hidden" name="category" value="<?php echo htmlspecialchars($selectedCategory); ?>" />
          <div class="sidebar-search-wrap">
            <i data-lucide="search" class="sidebar-search-icon"></i>
            <input type="text" name="q" placeholder="Search products…"
                   value="<?php echo htmlspecialchars($searchQuery); ?>"
                   class="sidebar-search-input" />
            <button type="submit" class="sidebar-search-btn" aria-label="Search"><i data-lucide="arrow-right"></i></button>
          </div>
        </form>

        <!-- ── Categories ── -->
        <div class="sidebar-section">
          <h4 class="sidebar-section-title">Categories</h4>
          <ul class="sidebar-category-list">
            <li>
              <a href="<?php echo filterUrl(['category' => 'all']); ?>"
                 class="sidebar-cat-link <?php echo $selectedCategory === 'all' ? 'active' : ''; ?>">
                <span class="cat-link-name">All Products</span>
                <span class="cat-link-count"><?php echo count($allProducts); ?></span>
              </a>
            </li>
            <?php foreach ($categories as $cat): ?>
              <li>
                <a href="<?php echo filterUrl(['category' => $cat['id']]); ?>"
                   class="sidebar-cat-link <?php echo $selectedCategory === $cat['id'] ? 'active' : ''; ?>">
                  <span class="cat-link-name"><?php echo htmlspecialchars($cat['name']); ?></span>
                  <span class="cat-link-count"><?php echo $categoryCounts[$cat['id']] ?? 0; ?></span>
                </a>
                <?php if (!empty($cat['subcategories']) && $selectedCategory === $cat['id']): ?>
                  <ul class="sidebar-subcat-list">
                    <?php foreach ($cat['subcategories'] as $sub): ?>
                      <li>
                        <a href="<?php echo filterUrl(['category' => $cat['id'], 'q' => strtolower($sub)]); ?>"
                           class="sidebar-subcat-link <?php echo strtolower($searchQuery) === strtolower($sub) ? 'active' : ''; ?>">
                          <i data-lucide="corner-down-right"></i>
                          <?php echo htmlspecialchars($sub); ?>
                        </a>
                      </li>
                    <?php endforeach; ?>
                  </ul>
                <?php endif; ?>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>

        <!-- ── Price Range ── -->
        <div class="sidebar-section">
          <h4 class="sidebar-section-title">Price Range</h4>
          <form method="GET" action="<?php echo url('products.php'); ?>" id="price-filter-form">
            <input type="hidden" name="category" value="<?php echo htmlspecialchars($selectedCategory); ?>" />
            <input type="hidden" name="q" value="<?php echo htmlspecialchars($searchQuery); ?>" />
            <input type="hidden" name="sort" value="<?php echo htmlspecialchars($sortOption); ?>" />
            <input type="hidden" name="rating" value="<?php echo htmlspecialchars($minRating); ?>" />
            <div class="price-range-display">
              <span>₹<span id="price-min-label"><?php echo $sliderMin; ?></span></span>
              <span>₹<span id="price-max-label"><?php echo $sliderMax; ?></span></span>
            </div>
            <div class="dual-range-wrap">
              <input type="range" id="range-min" name="min_price"
                     min="<?php echo $globalMin; ?>" max="<?php echo $globalMax; ?>"
                     value="<?php echo $sliderMin; ?>"
                     class="range-slider range-min" />
              <input type="range" id="range-max" name="max_price"
                     min="<?php echo $globalMin; ?>" max="<?php echo $globalMax; ?>"
                     value="<?php echo $sliderMax; ?>"
                     class="range-slider range-max" />
              <div class="range-track">
                <div class="range-fill" id="range-fill"></div>
              </div>
            </div>
            <button type="submit" class="btn-apply-price-filter">Apply Price Filter</button>
          </form>
        </div>

        <!-- ── Minimum Rating ── -->
        <div class="sidebar-section">
          <h4 class="sidebar-section-title">Minimum Rating</h4>
          <ul class="sidebar-rating-list">
            <?php
            $ratings = [4.5 => '4.5★ & above', 4.0 => '4.0★ & above', 3.5 => '3.5★ & above', 0 => 'Any Rating'];
            foreach ($ratings as $val => $label):
            ?>
              <li>
                <a href="<?php echo filterUrl(['rating' => $val > 0 ? $val : '']); ?>"
                   class="sidebar-rating-link <?php echo (string)$minRating === (string)$val ? 'active' : ''; ?>">
                  <span class="rating-stars">
                    <?php for ($s = 1; $s <= 5; $s++) echo $s <= floor($val) ? '★' : ($s - 0.5 <= $val ? '½' : '☆'); ?>
                  </span>
                  <span class="rating-label"><?php echo $label; ?></span>
                </a>
              </li>
            <?php endforeach; ?>
          </ul>
        </div>

        <!-- ── Mobile Close Button (appended via JS) ── -->
      </aside>

      <!-- ══════════════════════ RIGHT CONTENT ══════════════════════ -->
      <div class="shop-main-col">

        <!-- Toolbar: Results + Sort -->
        <div class="shop-toolbar">
          <div class="results-count">
            Showing <strong><?php echo count($filteredProducts); ?></strong>
            <?php echo count($filteredProducts) === 1 ? 'product' : 'products'; ?>
            <?php if ($searchQuery): ?>
              for "<em><?php echo htmlspecialchars($searchQuery); ?></em>"
              (<a href="<?php echo filterUrl(['q' => '']); ?>" class="clear-search-link">clear</a>)
            <?php endif; ?>
          </div>

          <div class="toolbar-right-controls">
            <!-- Mobile filter toggle -->
            <button type="button" class="btn-mobile-filter-toggle" id="filter-toggle-btn" aria-label="Open Filters">
              <i data-lucide="sliders-horizontal"></i> Filters
              <?php if ($activeFilters): ?><span class="filter-active-dot"></span><?php endif; ?>
            </button>

            <!-- Sort select -->
            <div class="shop-sorting-wrap">
              <label for="sort-select">Sort:</label>
              <select id="sort-select" onchange="window.location.href = this.value;">
                <?php
                  $sorts = [
                    'featured'   => 'Featured',
                    'price_asc'  => 'Price: Low → High',
                    'price_desc' => 'Price: High → Low',
                    'rating'     => 'Best Rated',
                    'newest'     => 'Newest First',
                  ];
                  foreach ($sorts as $val => $label):
                ?>
                  <option value="<?php echo filterUrl(['sort' => $val]); ?>"
                    <?php echo $sortOption === $val ? 'selected' : ''; ?>>
                    <?php echo $label; ?>
                  </option>
                <?php endforeach; ?>
              </select>
            </div>
          </div>
        </div>

        <!-- Active Filter Tags -->
        <?php if ($activeFilters): ?>
          <div class="active-filter-tags">
            <?php if ($selectedCategory !== 'all' && $currentCategoryObj): ?>
              <span class="filter-tag">
                <?php echo htmlspecialchars($currentCategoryObj['name']); ?>
                <a href="<?php echo filterUrl(['category' => 'all']); ?>" class="filter-tag-remove">×</a>
              </span>
            <?php endif; ?>
            <?php if ($minPrice > 0 || $maxPrice < 99999): ?>
              <span class="filter-tag">
                ₹<?php echo $sliderMin; ?> – ₹<?php echo $sliderMax; ?>
                <a href="<?php echo filterUrl(['min_price' => '', 'max_price' => '']); ?>" class="filter-tag-remove">×</a>
              </span>
            <?php endif; ?>
            <?php if ($minRating > 0): ?>
              <span class="filter-tag">
                <?php echo $minRating; ?>★ & above
                <a href="<?php echo filterUrl(['rating' => '']); ?>" class="filter-tag-remove">×</a>
              </span>
            <?php endif; ?>
            <?php if ($searchQuery): ?>
              <span class="filter-tag">
                "<?php echo htmlspecialchars($searchQuery); ?>"
                <a href="<?php echo filterUrl(['q' => '']); ?>" class="filter-tag-remove">×</a>
              </span>
            <?php endif; ?>
            <a href="<?php echo url('products.php'); ?>" class="filter-tag clear-tag">Clear All ×</a>
          </div>
        <?php endif; ?>

        <!-- Products Grid -->
        <?php if (count($filteredProducts) > 0): ?>
          <div class="products-grid shop-products-grid">
            <?php foreach ($filteredProducts as $p): ?>
              <?php include __DIR__ . '/includes/product-card.php'; ?>
            <?php endforeach; ?>
          </div>
        <?php else: ?>
          <div class="no-products-found">
            <div class="empty-icon"><i data-lucide="search-x"></i></div>
            <h3>No Products Found</h3>
            <p>We couldn't find anything matching your filters. Try adjusting or clearing them.</p>
            <a href="<?php echo url('products.php'); ?>" class="btn-primary-gold">View All Products</a>
          </div>
        <?php endif; ?>

      </div><!-- /.shop-main-col -->
    </div><!-- /.shop-layout-with-sidebar -->
  </div>
</div>

<!-- Mobile Sidebar Overlay -->
<div class="sidebar-mobile-overlay" id="sidebar-overlay"></div>

<script>
  // Mobile filter drawer toggle
  const filterBtn   = document.getElementById('filter-toggle-btn');
  const sidebar     = document.getElementById('shop-sidebar');
  const overlay     = document.getElementById('sidebar-overlay');

  function openSidebar() {
    sidebar.classList.add('mobile-open');
    overlay.classList.add('active');
    document.body.style.overflow = 'hidden';
  }
  function closeSidebar() {
    sidebar.classList.remove('mobile-open');
    overlay.classList.remove('active');
    document.body.style.overflow = '';
  }

  if (filterBtn) filterBtn.addEventListener('click', openSidebar);
  if (overlay)   overlay.addEventListener('click', closeSidebar);

  // Dual price range slider
  const rangeMin  = document.getElementById('range-min');
  const rangeMax  = document.getElementById('range-max');
  const fillEl    = document.getElementById('range-fill');
  const labelMin  = document.getElementById('price-min-label');
  const labelMax  = document.getElementById('price-max-label');
  const globalMin = <?php echo $globalMin; ?>;
  const globalMax = <?php echo $globalMax; ?>;

  function updateSlider() {
    let minVal = parseInt(rangeMin.value, 10);
    let maxVal = parseInt(rangeMax.value, 10);
    if (minVal > maxVal - 50) { rangeMin.value = maxVal - 50; minVal = maxVal - 50; }
    if (maxVal < minVal + 50) { rangeMax.value = minVal + 50; maxVal = minVal + 50; }
    labelMin.textContent = minVal;
    labelMax.textContent = maxVal;
    const pct = (v) => ((v - globalMin) / (globalMax - globalMin)) * 100;
    if (fillEl) {
      fillEl.style.left  = pct(minVal) + '%';
      fillEl.style.width = (pct(maxVal) - pct(minVal)) + '%';
    }
  }

  if (rangeMin) { rangeMin.addEventListener('input', updateSlider); rangeMax.addEventListener('input', updateSlider); updateSlider(); }
</script>

<?php include __DIR__ . '/includes/footer.php'; ?>
