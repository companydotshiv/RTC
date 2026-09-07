#!/bin/bash
# ==============================================================================
# RTC Foods - cPanel Subfolder Deployment Script
# ==============================================================================
set -e

echo "=== RTC Foods Deploy: Cleaning working directory ==="

# Reset any uncommitted changes so cPanel can always deploy cleanly
git reset --hard HEAD 2>/dev/null || :
git clean -fd 2>/dev/null || :

echo "=== Deploying RTC Foods to public_html ==="

# Only deploy to public_html paths (NOT back into the repo directory itself)
DESTINATIONS=(
  "/home/icanalog/public_html/projects/rtc"
  "/home/icanalog/public_html/ranchiwebsite.com/projects/rtc"
)

for DEST in "${DESTINATIONS[@]}"; do
  echo "Deploying to $DEST ..."
  /bin/mkdir -p "$DEST" 2>/dev/null || :

  if [ -d "ts-app/dist" ]; then
    /bin/cp -rf ts-app/dist/. "$DEST/" 2>/dev/null || :
  fi

  /bin/chmod -R 755 "$DEST" 2>/dev/null || :
  find "$DEST" -type f -exec /bin/chmod 644 {} + 2>/dev/null || :
  echo "  Done: $DEST"
done

echo "=== RTC Deployment Completed Successfully ==="
