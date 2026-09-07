<?php
/**
 * RTC Foods - Live Production Application Entry Point
 * Delivers the complete, fully styled application with all assets, cart, and structure.
 */
$htmlFile = __DIR__ . '/index.html';
if (file_exists($htmlFile)) {
    readfile($htmlFile);
    exit;
} else {
    http_response_code(500);
    echo "RTC Foods: index.html not found. Please verify deployment.";
    exit;
}
