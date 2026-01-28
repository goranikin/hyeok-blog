# Velite Integration Guide

This guide explains how to integrate the new blog design with your existing Velite MDX setup.

## 📦 What Has Been Created

### New Page Implementations

All pages are now created and ready to use with Velite:

1. **Research Pages**
   - `/src/app/research/page.tsx` - List of publications
   - `/src/app/research/[slug]/page.tsx` - Individual publication detail

2. **Projects Pages**
   - `/src/app/projects/page.tsx` - Grid of projects
   - `/src/app/projects/[slug]/page.tsx` - Individual project detail

3. **Writing Pages**
   - `/src/app/writing/page.tsx` - List of blog posts
   - `/src/app/writing/[slug]/page.tsx` - Individual post detail

4. **CV Page**
   - `/src/app/cv/page.tsx` - Static CV page

5. **Collections Config**
   - `/src/config/collections-new.ts` - New configuration for Velite

---

## 🔄 Integration Steps

### Step 1: Update Velite Config

Replace the import in `velite.config.js`:

```diff
- import { collectionsConfig } from "./src/config/collections.ts";
+ import { collectionsConfig } from "./src/config/collections-new.ts";
```

### Step 2: Migrate Content Structure

You need to reorganize your MDX files from the old structure to the new one:

**Old Structure:**
```
src/contents/
├── study/
│   ├── development/
│   ├── paper-review/
│   └── project/
└── writing/
    ├── book-review/
    └── personal-essay/
```

**New Structure:**
```
src/contents/
├── research/      # Papers and research work
├── projects/      # Technical projects
├── writing/       # Blog posts, essays
└── cv/           # Optional CV sections
```

**Migration Strategy:**

```bash
# Create new directories
mkdir -p src/contents/{research,projects,writing,cv}

# Map old categories to new ones:
# study/paper-review → research
# study/project → projects
# study/development → writing (or projects depending on content)
# writing/book-review → writing
# writing/personal-essay → writing

# Example:
mv src/contents/study/paper-review/* src/contents/research/
mv src/contents/study/project/* src/contents/projects/
mv src/contents/study/development/* src/contents/writing/
mv src/contents/writing/personal-essay/* src/contents/writing/
mv src/contents/writing/book-review/* src/contents/writing/
```

**Important**: You decide how to categorize your existing content:
- **Research**: Academic papers, research notes, paper reviews
- **Projects**: Code projects, implementations, demos
- **Writing**: Tutorials, blog posts, essays, book reviews, personal thoughts

### Step 3: Replace Collections Config

```bash
# Backup old config
cp src/config/collections.ts src/config/collections-old.ts

# Replace with new config
cp src/config/collections-new.ts src/config/collections.ts
```

### Step 4: Run Velite Build

After reorganizing content, rebuild Velite:

```bash
# Clean previous build
rm -rf .velite

# Rebuild with new structure
bun run build
# or
npm run build
```

Velite will now generate:
- `research` collection from `src/contents/research/**/*.mdx`
- `projects` collection from `src/contents/projects/**/*.mdx`
- `writing` collection from `src/contents/writing/**/*.mdx`
- `cv` collection from `src/contents/cv/**/*.mdx` (optional)

---

## 📝 MDX Frontmatter Format

All MDX files should have this frontmatter:

```mdx
---
title: Your Title Here
publishDate: 2026-01-28
description: A brief description of the content
thumbnailUrl: /path/to/image.png  # Optional
---

Your content here...
```

### Examples

**Research Paper:**
```mdx
---
title: "Efficient Attention Mechanisms for Long Documents"
publishDate: 2024-11-15
description: "We propose a novel attention mechanism that reduces computational complexity from O(n²) to O(n log n)."
thumbnailUrl: /research/efficient-attention/thumbnail.png
---

## Abstract
...
```

**Project:**
```mdx
---
title: "Transformer Toolkit"
publishDate: 2025-12-20
description: "A lightweight library for training and deploying transformer models with minimal boilerplate."
thumbnailUrl: /projects/transformer-toolkit/demo.png
---

## Overview
...
```

**Blog Post:**
```mdx
---
title: "Understanding Attention in Transformers"
publishDate: 2026-01-15
description: "A deep dive into attention mechanisms with interactive visualizations."
---

## Introduction
...
```

---

## 🎨 Design Integration

The new pages use the warm minimalist design components:

### Research Page
- Uses `WritingCard` component for clean list view
- Groups publications by year
- Shows date and description

### Projects Page
- Uses `Card` component with accent colors
- Grid layout (2 columns on desktop)
- Shows thumbnails if available
- Alternates accent colors for visual variety

### Writing Page
- Uses `WritingCard` component
- Simple chronological list
- Clean, readable format

### Detail Pages
- All use existing `PostPageLayout` component
- Renders MDX content with proper styling
- Full-width reading experience

---

## 🔧 Customization Options

### Change Accent Colors in Projects

In `/src/app/projects/page.tsx`:

```typescript
// Current colors
const accentColors = ["olive", "heather", "sky", "coral", "clay", "cactus"];

// You can reorder or change colors:
const accentColors = ["sky", "coral", "heather", "olive"];
```

### Adjust Layout Widths

In any page file:

```typescript
// Narrow (for reading-heavy content)
<div className="max-w-4xl mx-auto">

// Standard (for mixed content)
<div className="max-w-7xl mx-auto">

// Wide (for image galleries)
<div className="max-w-[1400px] mx-auto">
```

### Customize Date Formats

```typescript
// Current format: "Jan 2026"
const formattedDate = date.toLocaleDateString("en-US", {
  month: "short",
  year: "numeric",
});

// Full date: "January 28, 2026"
const formattedDate = date.toLocaleDateString("en-US", {
  month: "long",
  day: "numeric",
  year: "numeric",
});

// Short: "01/28/2026"
const formattedDate = date.toLocaleDateString("en-US");
```

---

## 🚀 Testing Your Setup

### 1. Check Velite Collections

After running `bun run build`, check `.velite/index.js`:

```javascript
// You should see exports for:
export { research } from './research.js'
export { projects } from './projects.js'
export { writing } from './writing.js'
export { cv } from './cv.js'
```

### 2. Test Each Page

```bash
bun dev
```

Visit:
- http://localhost:3000/research
- http://localhost:3000/projects
- http://localhost:3000/writing
- http://localhost:3000/cv

### 3. Test Detail Pages

Click on any item to test the detail view. Make sure:
- ✅ MDX content renders correctly
- ✅ Images display
- ✅ Code blocks have syntax highlighting
- ✅ Math equations render (if using KaTeX)
- ✅ Navigation works

---

## 📂 File Organization Tips

### Organize by Date

```
src/contents/research/
├── 2024-neurips-attention/
│   ├── index.mdx
│   └── images/
├── 2024-acl-translation/
│   └── index.mdx
└── 2023-emnlp-summarization/
    └── index.mdx
```

### Organize by Topic

```
src/contents/writing/
├── machine-learning/
│   ├── intro-to-transformers.mdx
│   └── attention-mechanisms.mdx
├── engineering/
│   ├── production-ml-systems.mdx
│   └── ci-cd-best-practices.mdx
└── personal/
    ├── reflections-on-research.mdx
    └── career-advice.mdx
```

### Include Assets

```
src/contents/projects/transformer-toolkit/
├── index.mdx
├── thumbnail.png
├── demo.gif
└── architecture.svg
```

Then reference in MDX:
```mdx
![Architecture](/projects/transformer-toolkit/architecture.svg)
```

---

## 🐛 Troubleshooting

### Error: "Cannot find module '#site/contents'"

**Cause**: Velite hasn't generated the collections yet.

**Solution**:
```bash
rm -rf .velite
bun run build
```

### Error: "collection is undefined"

**Cause**: Collection key doesn't match between `collections-new.ts` and the page.

**Solution**: Check that the key in `getCollectionByKey("research")` matches the key in `collections-new.ts`.

### Posts not showing up

**Cause**: MDX files might be in the wrong directory or missing frontmatter.

**Solution**:
1. Check file location matches pattern in `collections-new.ts`
2. Verify frontmatter has `title`, `publishDate`, `description`
3. Rebuild: `rm -rf .velite && bun run build`

### Images not loading

**Cause**: Image paths might be incorrect.

**Solution**:
- Static images: Put in `/public/` directory
- Reference as: `/images/my-image.png`
- Velite assets: Configured to go to `/public/static/`

### Styling looks wrong

**Cause**: New CSS might not be loaded.

**Solution**:
1. Make sure you replaced `globals.css` with the new one
2. Clear Next.js cache: `rm -rf .next`
3. Hard reload browser: Cmd/Ctrl + Shift + R

---

## 📚 Additional Resources

- **Velite Documentation**: https://velite.js.org
- **Design System**: See `DESIGN_SPECIFICATION.md`
- **Component Usage**: See `NEW_PAGES_TEMPLATES.md`
- **Migration Guide**: See `MIGRATION_GUIDE.md`

---

## ✅ Final Checklist

Before going live:

- [ ] Reorganized content into new structure
- [ ] Updated Velite config to use `collections-new.ts`
- [ ] Rebuilt Velite collections
- [ ] Tested all list pages
- [ ] Tested all detail pages
- [ ] Verified images load correctly
- [ ] Checked responsive design on mobile
- [ ] Updated navigation links
- [ ] Added CV PDF to `/public/cv.pdf`
- [ ] Customized CV page with your information
- [ ] Updated home page featured content

---

**You're all set!** Your blog now has a beautiful warm minimalist design integrated with Velite MDX. 🎉
