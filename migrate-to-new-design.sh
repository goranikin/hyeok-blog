#!/bin/bash

# Migration Script: Old Design → New Warm Minimalist Design
# This script automates the migration process

set -e  # Exit on error

echo "🎨 Blog Design Migration Script"
echo "================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Function to print colored output
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
if [ ! -f "package.json" ]; then
    print_error "Error: package.json not found. Please run this script from the project root."
    exit 1
fi

echo "This script will:"
echo "1. Backup your current design files"
echo "2. Replace them with the new warm minimalist design"
echo "3. Clean up temporary files"
echo ""
read -p "Continue? (y/n) " -n 1 -r
echo ""

if [[ ! $REPLY =~ ^[Yy]$ ]]; then
    echo "Migration cancelled."
    exit 0
fi

echo ""
echo "📦 Step 1: Creating backup..."

# Create backup directory with timestamp
BACKUP_DIR="backup-old-design-$(date +%Y%m%d-%H%M%S)"
mkdir -p "$BACKUP_DIR"

# Backup current files if they exist
if [ -f "src/app/globals.css" ]; then
    cp src/app/globals.css "$BACKUP_DIR/"
    print_status "Backed up globals.css"
fi

if [ -f "src/app/layout.tsx" ]; then
    cp src/app/layout.tsx "$BACKUP_DIR/"
    print_status "Backed up layout.tsx"
fi

if [ -f "src/app/page.tsx" ]; then
    cp src/app/page.tsx "$BACKUP_DIR/"
    print_status "Backed up page.tsx"
fi

if [ -f "src/components/navigation.tsx" ]; then
    cp src/components/navigation.tsx "$BACKUP_DIR/"
    print_status "Backed up navigation.tsx"
fi

print_status "Backup completed in $BACKUP_DIR/"

echo ""
echo "🔄 Step 2: Installing new design..."

# Replace CSS
if [ -f "src/app/globals-new.css" ]; then
    cp src/app/globals-new.css src/app/globals.css
    print_status "Replaced globals.css with new design"
else
    print_error "Error: globals-new.css not found"
    exit 1
fi

# Replace Layout
if [ -f "src/app/layout-new.tsx" ]; then
    cp src/app/layout-new.tsx src/app/layout.tsx
    print_status "Replaced layout.tsx with new structure"
else
    print_error "Error: layout-new.tsx not found"
    exit 1
fi

# Replace Home Page
if [ -f "src/app/page-new.tsx" ]; then
    cp src/app/page-new.tsx src/app/page.tsx
    print_status "Replaced page.tsx with new home page"
else
    print_error "Error: page-new.tsx not found"
    exit 1
fi

# Check if new components exist
if [ -f "src/components/top-navigation.tsx" ]; then
    print_status "Top navigation component ready"
else
    print_warning "Warning: top-navigation.tsx not found"
fi

if [ -f "src/components/cards.tsx" ]; then
    print_status "Card components ready"
else
    print_warning "Warning: cards.tsx not found"
fi

echo ""
echo "🧹 Step 3: Cleaning up temporary files..."

# Remove -new files
rm -f src/app/globals-new.css
rm -f src/app/layout-new.tsx
rm -f src/app/page-new.tsx

print_status "Removed temporary files"

echo ""
echo "📁 Step 4: Creating page directories..."

# Create directories for new pages
mkdir -p src/app/research
mkdir -p src/app/projects
mkdir -p src/app/cv
mkdir -p src/app/writing

print_status "Created page directories"

echo ""
echo "✅ Migration Complete!"
echo ""
echo "Next steps:"
echo "1. Review the changes: npm run dev (or bun dev)"
echo "2. Update page content using templates in docs/design/NEW_PAGES_TEMPLATES.md"
echo "3. Customize your personal information in:"
echo "   - src/app/page.tsx (home page)"
echo "   - src/app/layout.tsx (site metadata)"
echo "4. Read docs/design/MIGRATION_GUIDE.md for detailed instructions"
echo ""
echo "📚 Documentation: docs/design/"
echo "   - IMPLEMENTATION_SUMMARY.md - Quick start guide"
echo "   - DESIGN_SPECIFICATION.md - Design system reference"
echo "   - MIGRATION_GUIDE.md - Detailed migration guide"
echo "   - NEW_PAGES_TEMPLATES.md - Page templates"
echo ""
echo "Your old design is backed up in: $BACKUP_DIR/"
echo ""
print_warning "Remember to update your content and test thoroughly!"
echo ""
