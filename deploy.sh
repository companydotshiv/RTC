#!/bin/bash
# ==============================================================================
# RTC Foods - Multi-Path cPanel Subfolder Deployment Script
# ==============================================================================
set -e

echo "=== Deploying RTC Foods to cPanel ==="

DESTINATIONS=(
  "/home/icanalog/ranchiwebsite.com/projects/rtc"
  "/home/icanalog/public_html/ranchiwebsite.com/projects/rtc"
  "/home/icanalog/public_html/projects/rtc"
)

for DEST in "${DESTINATIONS[@]}"; do
  echo "Deploying to $DEST ..."
  /bin/mkdir -p "$DEST" 2>/dev/null || :

  if [ -d "ts-app/dist" ]; then
    /bin/cp -rf ts-app/dist/* "$DEST/" 2>/dev/null || :
    /bin/cp -f ts-app/dist/.htaccess "$DEST/.htaccess" 2>/dev/null || :
  elif [ -d "dist" ]; then
    /bin/cp -rf dist/* "$DEST/" 2>/dev/null || :
    /bin/cp -f dist/.htaccess "$DEST/.htaccess" 2>/dev/null || :
  fi

  /bin/chmod -R 755 "$DEST" 2>/dev/null || :
  find "$DEST" -type f -exec /bin/chmod 644 {} + 2>/dev/null || :
done

echo "=== RTC Deployment Completed Successfully ==="


