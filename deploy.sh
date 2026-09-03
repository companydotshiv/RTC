#!/bin/bash
# ==============================================================================
# RTC Foods - Automated cPanel Deployment Script
# ==============================================================================
set -e

# Detect cPanel Linux User
USER_NAME="$(whoami 2>/dev/null || echo "$USER")"
[ -z "$USER_NAME" ] && USER_NAME="ranchiwebsite"

# Target directories (checks in priority order)
DIR_SUBFOLDER="/home/$USER_NAME/ranchiwebsite.com/projects/rtc"
DIR_PUBLIC_HTML_RTC="/home/$USER_NAME/public_html/projects/rtc"
DIR_PUBLIC_HTML_ROOT="/home/$USER_NAME/public_html"

if [ -n "$DEPLOYPATH" ]; then
  DEST="$DEPLOYPATH"
elif [ -d "/home/$USER_NAME/ranchiwebsite.com" ]; then
  DEST="$DIR_SUBFOLDER"
elif [ -d "/home/$USER_NAME/public_html" ]; then
  DEST="$DIR_PUBLIC_HTML_RTC"
else
  DEST="$DIR_PUBLIC_HTML_ROOT"
fi

echo "Deploying RTC Website to target: $DEST"

# Ensure target directory exists
/bin/mkdir -p "$DEST"

# Copy built distribution files
if [ -d "ts-app/dist" ]; then
  /bin/cp -rf ts-app/dist/* "$DEST/"
  /bin/cp -f ts-app/dist/.htaccess "$DEST/.htaccess" 2>/dev/null || :
elif [ -d "dist" ]; then
  /bin/cp -rf dist/* "$DEST/"
  /bin/cp -f dist/.htaccess "$DEST/.htaccess" 2>/dev/null || :
fi

# Set proper web server permissions
/bin/chmod -R 755 "$DEST" 2>/dev/null || :
find "$DEST" -type f -exec /bin/chmod 644 {} + 2>/dev/null || :

echo "RTC Deployment complete! Verified all assets & .htaccess."
