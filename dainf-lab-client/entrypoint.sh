#!/bin/sh
set -e

CONFIG_DIR="/usr/share/nginx/html/config"
CONFIG_FILE="$CONFIG_DIR/config.json"
TEMPLATE="/config.template.json"

mkdir -p "$CONFIG_DIR"

# Perform substitution
echo "Generating runtime config from template..."
envsubst < "$TEMPLATE" > "$CONFIG_FILE"

echo "✅ Config generated at $CONFIG_FILE"
exec nginx -g 'daemon off;'
