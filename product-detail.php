<?php
require_once 'data/products.php';

$product_id = isset($_GET['id']) ? intval($_GET['id']) : 1;
$product = getProductById($product_id);

$page_title = $product['name'] . ' - Premium Quality';
$current_page = 'products';

include 'includes/header.php';
?>

<!-- Breadcrumbs Navigation -->
<div style="background: #F4F1EA; padding: 16px 0; border-bottom: 1px solid rgba(0,0,0,0.06);">
    <div class="container" style="font-size: 0.88rem; color: var(--text-muted);">
        <a href="index.php">Home</a> &nbsp;/&nbsp; 
        <a href="products.php">Products</a> &nbsp;/&nbsp; 
        <a href="products.php?cat=<?php echo $product['category']; ?>"><?php echo $product['category_name']; ?></a> &nbsp;/&nbsp; 
        <span style="color: var(--text-main); font-weight: 600;"><?php echo $product['name']; ?></span>
    </div>
</div>

<!-- Product Detail Main View -->
<section class="section">
    <div class="container">
        <div class="product-detail-layout">
            <!-- Left Side Image Gallery -->
            <div class="gallery-container">
                <img id="main-product-img" src="assets/images/<?php echo $product['image']; ?>" alt="<?php echo $product['name']; ?>" class="main-gallery-img">
                <div style="display: flex; gap: 12px;">
                    <?php foreach ($product['gallery'] as $idx => $g_img): ?>
                        <img src="assets/images/<?php echo $g_img; ?>" class="thumb-img" style="width: 80px; height: 80px; border-radius: 8px; cursor: pointer; object-fit: cover; border: 2px solid <?php echo ($idx === 0) ? 'var(--brand-green)' : 'rgba(0,0,0,0.1)'; ?>;">
                    <?php endforeach; ?>
                </div>
            </div>

            <!-- Right Side Product Meta & Purchase Options -->
            <div class="product-info-col">
                <span class="product-badge" style="position: relative; top: 0; left: 0; display: inline-block; margin-bottom: 12px;"><?php echo $product['badge']; ?></span>
                <h1 style="font-size: 2.2rem; margin-bottom: 12px; color: var(--text-main);"><?php echo $product['name']; ?></h1>
                
                <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 20px;">
                    <div style="color: #F5A623; font-size: 1rem;">
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                        <i class="fa-solid fa-star"></i>
                    </div>
                    <span style="font-weight: 700; font-size: 0.95rem;"><?php echo $product['rating']; ?></span>
                    <span style="color: var(--text-muted); font-size: 0.88rem;">(<?php echo $product['reviews_count']; ?> Verified Customer Reviews)</span>
                </div>

                <div class="price-box" style="margin-bottom: 20px; border-bottom: 1px solid rgba(0,0,0,0.08); padding-bottom: 20px;">
                    <span class="current-price" style="font-size: 2rem;">₹<?php echo $product['price']; ?></span>
                    <span class="old-price" style="font-size: 1.2rem;">₹<?php echo $product['original_price']; ?></span>
                    <span style="color: #27AE60; font-weight: 700; font-size: 0.9rem; background: rgba(39,174,96,0.1); padding: 4px 10px; border-radius: 4px;">Save <?php echo round((($product['original_price'] - $product['price'])/$product['original_price'])*100); ?>%</span>
                </div>

                <p style="color: var(--text-muted); font-size: 1rem; line-height: 1.6; margin-bottom: 24px;">
                    <?php echo $product['short_desc']; ?>
                </p>

                <!-- Weight Selection -->
                <div style="margin-bottom: 24px;">
                    <label style="font-weight: 700; display: block; margin-bottom: 8px;">Select Pack Size:</label>
                    <div class="weight-selector">
                        <?php foreach ($product['weights'] as $idx => $w): ?>
                            <button class="weight-btn <?php echo ($idx === 0) ? 'active' : ''; ?>"><?php echo $w; ?></button>
                        <?php endforeach; ?>
                    </div>
                </div>

                <!-- Quantity & Actions -->
                <div style="display: flex; gap: 16px; margin-bottom: 30px; flex-wrap: wrap;">
                    <div style="display: flex; align-items: center; border: 1px solid rgba(0,0,0,0.2); border-radius: 6px; overflow: hidden; background: #fff;">
                        <button class="qty-minus" style="padding: 12px 16px; border: none; background: transparent; cursor: pointer; font-weight: 700;">-</button>
                        <input type="text" class="qty-input" value="1" readonly style="width: 40px; text-align: center; border: none; font-weight: 700; font-size: 1rem;">
                        <button class="qty-plus" style="padding: 12px 16px; border: none; background: transparent; cursor: pointer; font-weight: 700;">+</button>
                    </div>
                    
                    <button onclick="showToast('Added to bag successfully!')" class="btn btn-primary" style="flex: 1; min-width: 180px;"><i class="fa-solid fa-bag-shopping"></i> Add to Cart</button>
                    <button onclick="showToast('Proceeding to instant checkout...')" class="btn btn-gold" style="flex: 1; min-width: 180px;"><i class="fa-solid fa-bolt"></i> Buy Now</button>
                </div>

                <!-- Guarantees Bar -->
                <div style="background: #F9F8F3; padding: 20px; border-radius: 12px; border: 1px solid var(--border-color); display: grid; grid-template-columns: 1fr 1fr; gap: 16px;">
                    <div style="display: flex; gap: 12px; align-items: center; font-size: 0.85rem;">
                        <i class="fa-solid fa-leaf" style="color: var(--brand-green); font-size: 1.2rem;"></i>
                        <span>100% Pure & Organic Certified</span>
                    </div>
                    <div style="display: flex; gap: 12px; align-items: center; font-size: 0.85rem;">
                        <i class="fa-solid fa-rotate-left" style="color: var(--brand-green); font-size: 1.2rem;"></i>
                        <span>Easy Replacement Guarantee</span>
                    </div>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- Tabbed Detailed Information (Specs, Nutrition, Reviews) -->
<section class="section" style="background: #F4F1EA;">
    <div class="container">
        <div style="background: #FFF; border-radius: var(--radius-md); padding: 40px; border: 1px solid rgba(0,0,0,0.08); box-shadow: var(--shadow-sm);">
            <h2 style="font-size: 1.6rem; margin-bottom: 16px; border-bottom: 2px solid var(--primary-gold); padding-bottom: 10px; display: inline-block;">Product Specifications & Quality Promise</h2>
            
            <p style="font-size: 1rem; color: var(--text-muted); line-height: 1.7; margin-bottom: 30px;">
                <?php echo $product['description']; ?>
            </p>

            <div style="display: grid; grid-template-columns: 1fr 1fr; gap: 40px;">
                <div>
                    <h3 style="font-size: 1.2rem; margin-bottom: 16px; color: var(--brand-green);">Key Features & Benefits</h3>
                    <ul style="list-style: none; display: flex; flex-direction: column; gap: 12px;">
                        <?php foreach ($product['features'] as $ft): ?>
                            <li style="display: flex; gap: 10px; align-items: center; font-size: 0.95rem;">
                                <i class="fa-solid fa-circle-check" style="color: var(--brand-green);"></i>
                                <span><?php echo $ft; ?></span>
                            </li>
                        <?php endforeach; ?>
                    </ul>
                </div>

                <div>
                    <h3 style="font-size: 1.2rem; margin-bottom: 16px; color: var(--brand-green);">Nutritional Value (Per 100g)</h3>
                    <table style="width: 100%; border-collapse: collapse; font-size: 0.9rem;">
                        <?php foreach ($product['nutrition'] as $key => $val): ?>
                            <tr style="border-bottom: 1px solid rgba(0,0,0,0.06);">
                                <td style="padding: 10px 0; font-weight: 600; color: var(--text-muted);"><?php echo $key; ?></td>
                                <td style="padding: 10px 0; font-weight: 700; text-align: right; color: var(--brand-green);"><?php echo $val; ?></td>
                            </tr>
                        <?php endforeach; ?>
                    </table>
                </div>
            </div>
        </div>
    </div>
</section>

<?php include 'includes/footer.php'; ?>
