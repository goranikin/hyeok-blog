#!/bin/bash

# Content Structure Migration Script
# Migrates from old category structure to new simplified structure

set -e

echo "📁 Content Structure Migration Script"
echo "======================================"
echo ""

# Colors
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m'

print_status() {
    echo -e "${GREEN}✓${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}⚠${NC}  $1"
}

print_error() {
    echo -e "${RED}✗${NC} $1"
}

# Check if we're in the right directory
if [ ! -d "src/contents" ]; then
    print_error "Error: src/contents directory not found. Please run from project root."
    exit 1
fi

echo "This script will:"
echo "1. Create new content directories (research, projects, writing, cv)"
echo "2. Help you reorganize your existing MDX files"
echo "3. Create backup of original structure"
echo ""
echo "⚠️  This is a MANUAL process - you'll need to decide how to categorize your content"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Migration cancelled."
    exit 0
fi

echo ""
echo "📦 Step 1: Creating backup..."

# Create backup with timestamp
BACKUP_DIR="backup-content-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"
cp -r src/contents "$BACKUP_DIR/"
print_status "Backed up contents to $BACKUP_DIR/"

echo ""
echo "📁 Step 2: Creating new directory structure..."

# Create new directories
mkdir -p src/contents/research
mkdir -p src/contents/projects
mkdir -p src/contents/writing
mkdir -p src/contents/cv

print_status "Created new directories"

echo ""
echo "📋 Step 3: Content categorization guide"
echo ""
echo "Your current structure:"
echo "  study/development/     → Move to writing/ (tutorials) OR projects/ (demos)"
echo "  study/paper-review/    → Move to research/"
echo "  study/project/         → Move to projects/"
echo "  writing/personal-essay/ → Move to writing/"
echo "  writing/book-review/   → Move to writing/"
echo ""
echo "New structure:"
echo "  research/  - Papers, research notes, paper reviews"
echo "  projects/  - Code projects, implementations, demos"
echo "  writing/   - Blog posts, tutorials, essays, reviews"
echo "  cv/        - Optional CV sections (can be static)"
echo ""

# Function to move content
move_content() {
    local source=$1
    local dest=$2

    if [ -d "$source" ] && [ "$(ls -A $source 2>/dev/null)" ]; then
        echo "Move content from $source to $dest?"
        echo "Files in $source:"
        ls -1 "$source" | head -5
        if [ "$(ls -1 "$source" | wc -l)" -gt 5 ]; then
            echo "... and more"
        fi
        echo ""
        read -p "Move these files? (y/n) " -n 1 -r
        echo ""

        if [[ $REPLY =~ ^[Yy]$ ]]; then
            mv "$source"/* "$dest/" 2>/dev/null || true
            print_status "Moved content from $source to $dest"
        else
            print_warning "Skipped $source"
        fi
    fi
}

echo "🔄 Step 4: Moving content..."
echo ""

# Paper reviews → Research
move_content "src/contents/study/paper-review" "src/contents/research"

# Projects → Projects
move_content "src/contents/study/project" "src/contents/projects"

# Development posts (you choose)
if [ -d "src/contents/study/development" ] && [ "$(ls -A src/contents/study/development)" ]; then
    echo ""
    echo "Development posts can go to either:"
    echo "  1. writing/   (if they're tutorials/guides)"
    echo "  2. projects/  (if they're project documentation)"
    echo ""
    echo "Files in study/development:"
    ls -1 src/contents/study/development | head -5
    if [ "$(ls -1 src/contents/study/development | wc -l)" -gt 5 ]; then
        echo "... and more"
    fi
    echo ""
    read -p "Move to (w)riting or (p)rojects? (w/p) " -n 1 -r
    echo ""

    if [[ $REPLY =~ ^[Ww]$ ]]; then
        mv src/contents/study/development/* src/contents/writing/ 2>/dev/null || true
        print_status "Moved development posts to writing/"
    elif [[ $REPLY =~ ^[Pp]$ ]]; then
        mv src/contents/study/development/* src/contents/projects/ 2>/dev/null || true
        print_status "Moved development posts to projects/"
    else
        print_warning "Skipped development posts"
    fi
fi

# Personal essays → Writing
move_content "src/contents/writing/personal-essay" "src/contents/writing"

# Book reviews → Writing
move_content "src/contents/writing/book-review" "src/contents/writing"

echo ""
echo "🧹 Step 5: Cleaning up..."

# Remove empty directories
find src/contents/study -type d -empty -delete 2>/dev/null || true
find src/contents/writing -type d -empty -delete 2>/dev/null || true

print_status "Cleaned up empty directories"

echo ""
echo "✅ Content migration complete!"
echo ""
echo "Next steps:"
echo "1. Review the new structure: ls -R src/contents/"
echo "2. Update velite.config.js to use collections-new.ts:"
echo "   import { collectionsConfig } from './src/config/collections-new.ts'"
echo "3. Rebuild Velite: rm -rf .velite && bun run build"
echo "4. Test the new pages: bun dev"
echo ""
echo "Your original content is backed up in: $BACKUP_DIR/"
echo ""
print_warning "Don't forget to update image paths in your MDX files if needed!"
echo ""
