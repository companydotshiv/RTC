<?php
/**
 * RTC Foods - AJAX API Endpoints
 */
require_once __DIR__ . '/config.php';
require_once __DIR__ . '/functions.php';
require_once __DIR__ . '/data.php';

header('Content-Type: application/json; charset=utf-8');

$action = $_REQUEST['action'] ?? '';

init_cart();

if ($action === 'add_to_cart') {
    $productId = (int)($_POST['product_id'] ?? 0);
    $quantity = max(1, (int)($_POST['quantity'] ?? 1));
    $weight = clean_input($_POST['weight'] ?? '');

    $product = get_product_by_id($productId);
    if (!$product) {
        echo json_encode(['success' => false, 'message' => 'Product not found']);
        exit;
    }

    $cartKey = $productId . ($weight ? '_' . $weight : '');

    if (isset($_SESSION['cart'][$cartKey])) {
        $_SESSION['cart'][$cartKey]['quantity'] += $quantity;
    } else {
        // Calculate price variant if weight selected
        $basePrice = (float)$product['price'];
        $itemPrice = $basePrice;
        if ($weight === '500g') {
            $itemPrice = round($basePrice * 1.95, 2);
        } elseif ($weight === '1kg') {
            $itemPrice = round($basePrice * 3.8, 2);
        }

        $_SESSION['cart'][$cartKey] = [
            'id' => $product['id'],
            'name' => $product['name'],
            'slug' => $product['slug'],
            'price' => $itemPrice,
            'image' => $product['image'],
            'weight' => $weight ?: ($product['weights'][0] ?? '250g'),
            'quantity' => $quantity
        ];
    }

    echo json_encode([
        'success' => true,
        'message' => $product['name'] . ' added to cart',
        'cart_count' => get_cart_count(),
        'subtotal' => get_cart_subtotal(),
        'subtotal_formatted' => format_price(get_cart_subtotal()),
        'cart' => array_values($_SESSION['cart'])
    ]);
    exit;
}

if ($action === 'update_qty') {
    $cartKey = clean_input($_POST['cart_key'] ?? '');
    $qty = (int)($_POST['quantity'] ?? 1);

    if (isset($_SESSION['cart'][$cartKey])) {
        if ($qty <= 0) {
            unset($_SESSION['cart'][$cartKey]);
        } else {
            $_SESSION['cart'][$cartKey]['quantity'] = $qty;
        }
    }

    echo json_encode([
        'success' => true,
        'cart_count' => get_cart_count(),
        'subtotal' => get_cart_subtotal(),
        'subtotal_formatted' => format_price(get_cart_subtotal()),
        'cart' => array_values($_SESSION['cart'])
    ]);
    exit;
}

if ($action === 'remove_from_cart') {
    $cartKey = clean_input($_POST['cart_key'] ?? '');
    if (isset($_SESSION['cart'][$cartKey])) {
        unset($_SESSION['cart'][$cartKey]);
    }

    echo json_encode([
        'success' => true,
        'cart_count' => get_cart_count(),
        'subtotal' => get_cart_subtotal(),
        'subtotal_formatted' => format_price(get_cart_subtotal()),
        'cart' => array_values($_SESSION['cart'])
    ]);
    exit;
}

if ($action === 'get_cart') {
    echo json_encode([
        'success' => true,
        'cart_count' => get_cart_count(),
        'subtotal' => get_cart_subtotal(),
        'subtotal_formatted' => format_price(get_cart_subtotal()),
        'cart' => array_values(get_cart())
    ]);
    exit;
}

if ($action === 'toggle_wishlist') {
    $productId = (int)($_POST['product_id'] ?? 0);
    if (!isset($_SESSION['wishlist'])) {
        $_SESSION['wishlist'] = [];
    }

    $idx = array_search($productId, $_SESSION['wishlist'], true);
    $added = false;
    if ($idx !== false) {
        array_splice($_SESSION['wishlist'], $idx, 1);
        $added = false;
    } else {
        $_SESSION['wishlist'][] = $productId;
        $added = true;
    }

    echo json_encode([
        'success' => true,
        'added' => $added,
        'wishlist_count' => count($_SESSION['wishlist']),
        'wishlist' => $_SESSION['wishlist']
    ]);
    exit;
}

if ($action === 'apply_coupon') {
    $code = strtoupper(trim(clean_input($_POST['code'] ?? '')));
    $coupons = $GLOBALS['COUPONS'] ?? [];

    if (!isset($coupons[$code])) {
        echo json_encode(['success' => false, 'message' => 'Invalid coupon code']);
        exit;
    }

    $coupon = $coupons[$code];
    $subtotal = get_cart_subtotal();

    if ($subtotal < $coupon['min_order']) {
        echo json_encode([
            'success' => false,
            'message' => 'Minimum order amount for this coupon is ' . format_price($coupon['min_order'])
        ]);
        exit;
    }

    $discount = 0;
    if ($coupon['type'] === 'percentage') {
        $discount = round(($subtotal * $coupon['value']) / 100, 2);
    } elseif ($coupon['type'] === 'shipping') {
        $discount = 0; // Free delivery
    }

    $_SESSION['applied_coupon'] = [
        'code' => $code,
        'discount' => $discount,
        'description' => $coupon['description']
    ];

    echo json_encode([
        'success' => true,
        'message' => 'Coupon ' . $code . ' applied successfully!',
        'discount' => $discount,
        'discount_formatted' => format_price($discount),
        'total' => max(0, $subtotal - $discount),
        'total_formatted' => format_price(max(0, $subtotal - $discount))
    ]);
    exit;
}

echo json_encode(['success' => false, 'message' => 'Invalid action']);
