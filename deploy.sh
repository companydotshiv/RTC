#!/bin/bash
# ==============================================================================
# RTC Foods - cPanel Deployment Script
# ==============================================================================
set -e

TARGET="/home/icanalog/public_html/projects/rtc"
PARENT="/home/icanalog/public_html/projects"

echo "Deploying RTC Website to: $TARGET"

# 1. Create target directories
/bin/mkdir -p "$PARENT"
/bin/mkdir -p "$TARGET"
/bin/chmod 755 "$PARENT" 2>/dev/null || :
/bin/chmod 755 "$TARGET" 2>/dev/null || :

# 2. Copy compiled assets
if [ -d "ts-app/dist" ]; then
  /bin/cp -rf ts-app/dist/* "$TARGET/"
  /bin/cp -f ts-app/dist/.htaccess "$TARGET/.htaccess" 2>/dev/null || :
elif [ -d "dist" ]; then
  /bin/cp -rf dist/* "$TARGET/"
  /bin/cp -f dist/.htaccess "$TARGET/.htaccess" 2>/dev/null || :
fi

# 3. Set proper web server permissions (755 for dirs, 644 for files)
/bin/chmod -R 755 "$TARGET" 2>/dev/null || :
find "$TARGET" -type f -exec /bin/chmod 644 {} + 2>/dev/null || :

echo "RTC Deployment successful!"

