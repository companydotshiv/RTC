<?php
$page_title = 'Products Catalog - Premium Dry Fruits, Spices & Nuts';
$current_page = 'products';
require_once 'data/products.php';

$selected_cat = isset($_GET['cat']) ? $_GET['cat'] : 'all';
$filtered_products = getProductsByCategory($selected_cat);

include 'includes/header.php';
?>

<!-- Catalog Header Banner -->
<section style="background: var(--bg-dark); color: #FFF; padding: 60px 0; border-bottom: 2px solid var(--primary-gold);">
    <div class="container text-center" style="text-align: center;">
        <h1 style="font-size: 2.8rem; color: #FFF; margin-bottom: 12px;">Our Complete Product Range</h1>
        <p style="color: rgba(255,255,255,0.75); max-width: 600px; margin: 0 auto;">Explore our 100% natural, triple-sorted dry fruits, gourmet nuts, authentic Kashmiri saffron, and culinary seeds.</p>
    </div>
</section>

<!-- Filter Navigation Tabs -->
<section class="section" style="padding: 40px 0 20px 0;">
    <div class="container">
        <div style="display: flex; justify-content: space-between; align-items: center; flex-wrap: wrap; gap: 20px; border-bottom: 1px solid rgba(0,0,0,0.08); padding-bottom: 20px;">
            <div style="display: flex; gap: 10px; flex-wrap: wrap;">
                <a href="products.php" class="btn <?php echo ($selected_cat == 'all') ? 'btn-primary' : 'btn-outline'; ?>" style="padding: 8px 20px; font-size: 0.9rem;">All Categories</a>
                <a href="products.php?cat=dry-fruits" class="btn <?php echo ($selected_cat == 'dry-fruits') ? 'btn-primary' : 'btn-outline'; ?>" style="padding: 8px 20px; font-size: 0.9rem;">Dry Fruits & Nuts</a>
                <a href="products.php?cat=spices" class="btn <?php echo ($selected_cat == 'spices') ? 'btn-primary' : 'btn-outline'; ?>" style="padding: 8px 20px; font-size: 0.9rem;">Spices & Herbs</a>
                <a href="products.php?cat=seeds-berries" class="btn <?php echo ($selected_cat == 'seeds-berries') ? 'btn-primary' : 'btn-outline'; ?>" style="padding: 8px 20px; font-size: 0.9rem;">Seeds & Berries</a>
            </div>
            
            <div style="color: var(--text-muted); font-size: 0.9rem;">
                Showing <strong><?php echo count($filtered_products); ?></strong> items
            </div>
        </div>
    </div>
</section>

<!-- Products Grid Section -->
<section class="section" style="padding-top: 20px;">
    <div class="container">
        <div class="products-grid">
            <?php foreach ($filtered_products as $p): ?>
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
                            <span>(<?php echo $p['reviews_count']; ?>)</span>
                        </div>
                        <p style="font-size: 0.85rem; color: var(--text-muted); margin-bottom: 16px;">
                            <?php echo $p['short_desc']; ?>
                        </p>
                        <div class="card-price-row">
                            <div class="price-box">
                                <span class="current-price">₹<?php echo $p['price']; ?></span>
                                <span class="old-price">₹<?php echo $p['original_price']; ?></span>
                            </div>
                            <a href="product-detail.php?id=<?php echo $p['id']; ?>" class="btn btn-primary" style="padding: 8px 16px; font-size: 0.85rem;">View Details</a>
                        </div>
                    </div>
                </div>
            <?php endforeach; ?>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
