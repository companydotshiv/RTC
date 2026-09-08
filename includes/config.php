<?php
/**
 * RTC Foods - Global Configuration
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

date_default_timezone_set('Asia/Kolkata');

// Site Constants
define('SITE_NAME', 'RTC Foods');
define('SITE_TAGLINE', 'Pure Dry Fruits, Spices & Gourmet Gifting');
define('CURRENCY_SYMBOL', '₹');
define('ADMIN_USERNAME', 'admin');
define('ADMIN_PASSWORD', 'rtc@2026'); // Change in production

/**
 * Automatically determine the base URL path (e.g. /projects/rtc/ or /)
 */
function get_base_url_prefix() {
    $script = $_SERVER['SCRIPT_NAME'] ?? '';
    // Normalize path separators
    $scriptDir = str_replace('\\', '/', dirname($script));
    
    // If inside includes/ or admin/, go up to root
    if (preg_match('#/(includes|admin)$#', $scriptDir)) {
        $scriptDir = str_replace('\\', '/', dirname($scriptDir));
    }
    
    $scriptDir = trim(str_replace('\\', '/', $scriptDir), '/');
    return $scriptDir === '' ? '' : '/' . $scriptDir;
}

define('BASE_URL', get_base_url_prefix());
