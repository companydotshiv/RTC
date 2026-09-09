<?php
/**
 * RTC Foods - Local PHP Built-in Server Router
 * Usage: php -S localhost:8000 router.php
 */

$uri = urldecode(parse_url($_SERVER['REQUEST_URI'], PHP_URL_PATH));

// Serve static assets directly if they exist
$filePath = __DIR__ . $uri;
if ($uri !== '/' && file_exists($filePath) && !is_dir($filePath)) {
    return false;
}

// Clean Product Route: /product/{slug}
if (preg_match('#^/product/([a-zA-Z0-9\-_]+)/?$#', $uri, $matches)) {
    $_GET['slug'] = $matches[1];
    require __DIR__ . '/product.php';
    return;
}

// Clean Category Route: /category/{slug}
if (preg_match('#^/category/([a-zA-Z0-9\-_]+)/?$#', $uri, $matches)) {
    $_GET['category'] = $matches[1];
    require __DIR__ . '/products.php';
    return;
}

// Direct clean page mappings
$pageMap = [
    '/admin' => '/admin/index.php',
    '/products' => '/products.php',
    '/catalog' => '/products.php',
    '/about-us' => '/about-us.php',
    '/about' => '/about-us.php',
    '/cart' => '/cart.php',
    '/checkout' => '/checkout.php',
    '/account' => '/account.php',
    '/contact-us' => '/contact-us.php',
    '/contact' => '/contact-us.php',
    '/faqs' => '/faqs.php',
    '/faq' => '/faqs.php',
    '/certificates' => '/certificates.php',
    '/blog' => '/blog.php',
    '/policy' => '/policy.php',
    '/wishlist' => '/wishlist.php',
    '/thank-you'  => '/thank-you.php',
    '/order-confirmation' => '/order-confirmation.php',
];

if (isset($pageMap[rtrim($uri, '/')])) {
    require __DIR__ . $pageMap[rtrim($uri, '/')];
    return;
}

// Directory index fallback (e.g. /admin/)
if (is_dir($filePath) && file_exists($filePath . '/index.php')) {
    require $filePath . '/index.php';
    return;
}

// If direct php script requested
if (preg_match('#\.php$#', $uri) && file_exists(__DIR__ . $uri)) {
    require __DIR__ . $uri;
    return;
}

// Fallback to index.php
require __DIR__ . '/index.php';
