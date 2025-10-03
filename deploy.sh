#!/bin/bash

# Hyeok Blog Deployment Script
# This script automates the deployment process

set -e  # Exit on error

echo "🚀 Starting deployment..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
print_success() {
    echo -e "${GREEN}✓ $1${NC}"
}

print_error() {
    echo -e "${RED}✗ $1${NC}"
}

print_warning() {
    echo -e "${YELLOW}⚠ $1${NC}"
}

# Check if docker is installed
if ! command -v docker &> /dev/null; then
    print_error "Docker is not installed. Please install Docker first."
    exit 1
fi

# Check if docker-compose is installed
if ! command -v docker-compose &> /dev/null; then
    print_error "Docker Compose is not installed. Please install Docker Compose first."
    exit 1
fi

print_success "Docker and Docker Compose are installed"

# Pull latest changes from git (optional, uncomment if needed)
# echo "📦 Pulling latest changes from git..."
# git pull origin main
# print_success "Git pull completed"

# Stop existing containers
echo "🛑 Stopping existing containers..."
docker-compose down

# Remove old images (optional, uncomment to remove unused images)
# echo "🗑️  Removing old images..."
# docker image prune -f

# Build and start containers
echo "🏗️  Building and starting containers..."
docker-compose up -d --build

# Wait for services to be healthy
echo "⏳ Waiting for services to start..."
sleep 10

# Check if containers are running
if [ "$(docker ps -q -f name=hyeok-blog-app)" ] && [ "$(docker ps -q -f name=hyeok-blog-nginx)" ]; then
    print_success "Containers are running"
    
    echo ""
    echo "📊 Container Status:"
    docker-compose ps
    
    echo ""
    print_success "Deployment completed successfully! 🎉"
    echo ""
    echo "Your blog is now running at:"
    echo "  - http://localhost (via Nginx)"
    echo "  - http://localhost:3000 (direct Next.js)"
    echo ""
    echo "Useful commands:"
    echo "  - View logs: docker-compose logs -f"
    echo "  - Stop services: docker-compose down"
    echo "  - Restart services: docker-compose restart"
else
    print_error "Some containers failed to start"
    echo ""
    echo "Checking logs..."
    docker-compose logs --tail=50
    exit 1
fi

