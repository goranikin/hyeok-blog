#!/bin/bash

# Build script optimized for free tier EC2 instances
# This script handles memory constraints and provides fallback options

set -e

echo "🚀 Starting build process for free tier..."

# Check available memory
AVAILABLE_MEM=$(free -m | awk 'NR==2{printf "%.0f", $7}')
echo "Available memory: ${AVAILABLE_MEM}MB"

if [ "$AVAILABLE_MEM" -lt 800 ]; then
    echo "⚠️  Low memory detected. Using optimized build strategy..."
    
    # Create swap file if needed
    if [ ! -f /swapfile ]; then
        echo "Creating swap file..."
        sudo fallocate -l 1G /swapfile
        sudo chmod 600 /swapfile
        sudo mkswap /swapfile
        sudo swapon /swapfile
        echo '/swapfile none swap sw 0 0' | sudo tee -a /etc/fstab
    fi
    
    # Set memory-optimized Node.js options
    export NODE_OPTIONS="--max-old-space-size=300 --optimize-for-size"
    
    # Build with reduced parallelism
    export BUN_INSTALL_CACHE_DIR=/tmp/bun-cache
    export NEXT_TELEMETRY_DISABLED=1
    
    echo "Building with memory optimizations..."
    docker compose up --build --no-cache
    
else
    echo "✅ Sufficient memory available. Building normally..."
    docker compose up --build
fi

echo "🎉 Build completed!"
