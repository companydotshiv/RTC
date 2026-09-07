<?php
/**
 * RTC Foods - Subdirectory Entry Point
 * If Apache or LiteSpeed evaluates index.php as the directory index,
 * deliver index.html cleanly so the React SPA renders without 404.
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
