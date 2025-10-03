#!/bin/bash

# Quick update script for Hyeok Blog
# Use this script to pull latest changes and redeploy

set -e

echo "🔄 Updating Hyeok Blog..."

# Pull latest changes
echo "📦 Pulling latest changes from git..."
git pull origin main

# Rebuild and restart containers
echo "🏗️  Rebuilding and restarting containers..."
docker-compose down
docker-compose up -d --build

echo "✅ Update completed!"
echo ""
echo "View logs with: docker-compose logs -f"

