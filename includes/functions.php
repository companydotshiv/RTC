<?php
/**
 * RTC Foods - Helper Functions
 */
require_once __DIR__ . '/config.php';

/**
 * Generate a relative internal URL respecting subdirectory hosting
 */
function url($path = '') {
    $cleanPath = ltrim($path, '/');
    if (BASE_URL === '') {
        return '/' . $cleanPath;
    }
    return BASE_URL . '/' . $cleanPath;
}

/**
 * Generate clean product detail URL
 */
function product_url($slug = '') {
    $cleanSlug = trim($slug, '/');
    return url('product/' . urlencode($cleanSlug));
}

/**
 * Resolve static assets (images, css, js)
 */
function asset($path = '') {
    if (preg_match('#^(https?:|data:|blob:)#', $path)) {
        return $path;
    }
    return url($path);
}

/**
 * Format price in Indian Rupees
 */
function format_price($amount) {
    return CURRENCY_SYMBOL . number_format((float)$amount, 2, '.', ',');
}

/**
 * Initialize Cart in Session
 */
function init_cart() {
    if (!isset($_SESSION['cart']) || !is_array($_SESSION['cart'])) {
        $_SESSION['cart'] = [];
    }
}

/**
 * Get current Cart
 */
function get_cart() {
    init_cart();
    return $_SESSION['cart'];
}

/**
 * Get Cart items total quantity
 */
function get_cart_count() {
    $cart = get_cart();
    $count = 0;
    foreach ($cart as $item) {
        $count += (int)($item['quantity'] ?? 1);
    }
    return $count;
}

/**
 * Calculate Cart Subtotal
 */
function get_cart_subtotal() {
    $cart = get_cart();
    $subtotal = 0;
    foreach ($cart as $item) {
        $subtotal += ((float)($item['price'] ?? 0) * (int)($item['quantity'] ?? 1));
    }
    return $subtotal;
}

/**
 * Wishlist helpers
 */
function get_wishlist() {
    if (!isset($_SESSION['wishlist']) || !is_array($_SESSION['wishlist'])) {
        $_SESSION['wishlist'] = [];
    }
    return $_SESSION['wishlist'];
}

function is_in_wishlist($productId) {
    $wishlist = get_wishlist();
    return in_array((int)$productId, $wishlist, true);
}

/**
 * Sanitize string input
 */
function clean_input($data) {
    return htmlspecialchars(trim((string)$data), ENT_QUOTES, 'UTF-8');
}
