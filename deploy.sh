#!/bin/bash
# ==============================================================================
# RTC Foods - cPanel Deployment Script
# ==============================================================================
set -e

echo "=== RTC Foods: Setting file permissions ==="

find . -maxdepth 2 -type d -exec /bin/chmod 755 {} + 2>/dev/null || :
find . -maxdepth 2 -type f -exec /bin/chmod 644 {} + 2>/dev/null || :

EXTERNAL_DEST="/home/icanalog/public_html/projects/rtc"
CURRENT_DIR="$(pwd)"

if [ "$CURRENT_DIR" != "$EXTERNAL_DEST" ] && [ -d "/home/icanalog/public_html" ]; then
  /bin/mkdir -p "$EXTERNAL_DEST" 2>/dev/null || :
  /bin/cp -rf index.html index.php assets .htaccess *.png *.jpg *.svg "$EXTERNAL_DEST/" 2>/dev/null || :
fi

echo "=== RTC Deployment Completed Successfully ==="
