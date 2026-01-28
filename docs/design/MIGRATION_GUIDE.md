# Migration Guide: Old Design → New Warm Minimalist Design

This guide will help you transition from your current blog design to the new Anthropic-inspired warm minimalist design.

## ✅ What Has Been Created

All new design files have been created with `-new` suffix or in new files:

- `src/app/globals-new.css` - New design system CSS
- `src/app/layout-new.tsx` - New layout with top navigation
- `src/app/page-new.tsx` - New home page
- `src/components/top-navigation.tsx` - Top navigation component
- `src/components/cards.tsx` - Reusable card components
- `NEW_PAGES_TEMPLATES.md` - Templates for other pages

## 🔄 Step-by-Step Migration

### Step 1: Review New Design Files

Before making changes, open and review these files:
1. Open `design-preview.html` in a browser to see the visual design
2. Read `DESIGN_SPECIFICATION.md` for the complete design system
3. Review the new component files to understand the structure

### Step 2: Backup Your Current Design

Your current content is already backed up locally (as you mentioned), but let's also back up the current design files:

```bash
# Create backup directory
mkdir -p backup-old-design

# Backup current files
cp src/app/globals.css backup-old-design/
cp src/app/layout.tsx backup-old-design/
cp src/app/page.tsx backup-old-design/
cp src/components/navigation.tsx backup-old-design/
```

### Step 3: Replace with New Design

**Option A: Manual Replacement (Recommended for first time)**

```bash
# 1. Replace CSS
cp src/app/globals-new.css src/app/globals.css

# 2. Replace Layout
cp src/app/layout-new.tsx src/app/layout.tsx

# 3. Replace Home Page
cp src/app/page-new.tsx src/app/page.tsx

# 4. Keep new components (already in place)
# - src/components/top-navigation.tsx
# - src/components/cards.tsx
```

**Option B: Delete Old, Rename New**

```bash
# Remove old files
rm src/app/globals.css
rm src/app/layout.tsx
rm src/app/page.tsx

# Rename new files
mv src/app/globals-new.css src/app/globals.css
mv src/app/layout-new.tsx src/app/layout.tsx
mv src/app/page-new.tsx src/app/page.tsx
```

### Step 4: Update Your Content Structure

The new design uses a simpler navigation structure:
- **Old**: Sidebar with categories and subcategories
- **New**: Top navigation with 5 main sections

You need to create/update these page directories:

```bash
# Create new directories if they don't exist
mkdir -p src/app/research
mkdir -p src/app/projects
mkdir -p src/app/cv
mkdir -p src/app/writing
```

Copy the templates from `NEW_PAGES_TEMPLATES.md` and customize them with your actual content.

### Step 5: Remove Old Navigation Component (Optional)

Once the new navigation is working, you can remove the old one:

```bash
# Backup first
cp src/components/navigation.tsx backup-old-design/

# Then remove
rm src/components/navigation.tsx
```

### Step 6: Update Content References

1. Update any internal links in your existing content to use the new paths:
   - `/study/...` → `/research/...` or `/writing/...`
   - Check your existing posts and update links

2. If you have existing posts, decide where they belong:
   - Research papers → `/research`
   - Technical projects → `/projects`
   - Blog posts → `/writing`

### Step 7: Test the New Design

```bash
# Run development server
npm run dev
# or
bun dev

# Open http://localhost:3000
```

Check:
- ✅ Navigation works on desktop and mobile
- ✅ All pages load correctly
- ✅ Fonts are displaying properly
- ✅ Colors match the design preview
- ✅ Links are working
- ✅ Responsive design works on different screen sizes

## 📝 Customization After Migration

### Update Your Personal Information

1. **In `src/app/page.tsx`** (Home page):
   - Update your bio text
   - Update research interests
   - Update education and work experience
   - Update profile photo path if needed

2. **In `src/app/layout.tsx`** (Layout):
   - Update the site title and description in metadata
   - Update footer links (email, GitHub, LinkedIn, etc.)
   - Update the site name in navigation

3. **In `src/components/top-navigation.tsx`**:
   - Update the logo/name text if you want something different

### Add Your Actual Content

1. **Research Page** (`src/app/research/page.tsx`):
   - Add your actual publications
   - Update paper details, links, abstracts
   - Organize by year

2. **Projects Page** (`src/app/projects/page.tsx`):
   - Add your actual projects
   - Update GitHub links
   - Update tech stacks

3. **CV Page** (`src/app/cv/page.tsx`):
   - Fill in your complete CV
   - Add a real CV PDF to `/public/cv.pdf`
   - Update all sections with your information

4. **Writing Page** (`src/app/writing/page.tsx`):
   - Migrate your existing blog posts
   - Update the list of posts
   - Ensure links work

### Optional: Font Customization

If you want to use Google Fonts (Inter, Merriweather, JetBrains Mono) instead of Pretendard:

```typescript
// In src/app/layout.tsx
import { Inter, Merriweather, JetBrains_Mono } from 'next/font/google';
import localFont from "next/font/local";

const pretendard = localFont({
  src: "../../public/fonts/PretendardVariable.woff2",
  display: "swap",
  variable: '--font-pretendard',
});

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const merriweather = Merriweather({
  weight: ['400', '700'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-merriweather',
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-jetbrains',
});

// Update the html className:
<html lang="en" className={`${inter.variable} ${merriweather.variable} ${jetbrainsMono.variable}`}>
  <body className={`${inter.className} min-w-[320px]`}>
```

Then update `globals.css` to use these fonts:
```css
@theme {
  --font-sans: var(--font-inter);
  --font-serif: var(--font-merriweather);
  --font-mono: var(--font-jetbrains);
}
```

## 🗑️ Complete Old Design Removal

Once you're satisfied with the new design and everything works:

### Remove Old Files

```bash
# Remove old backuped sidebar navigation
rm -rf backup-old-design/

# Remove any old category structures if not needed
# (Check your old routes and remove carefully)
# rm -rf src/app/(routes)/

# Remove temporary new files (if using Option A)
rm src/app/globals-new.css
rm src/app/layout-new.tsx
rm src/app/page-new.tsx
```

### Clean Up Old Routes

If you had old route structures like `/study/development/`, `/study/paper-review/`, etc., you can:

1. Either migrate the content to the new structure
2. Or set up redirects in `next.config.mjs`:

```javascript
/** @type {import('next').NextConfig} */
const nextConfig = {
  async redirects() {
    return [
      {
        source: '/study/paper-review',
        destination: '/research',
        permanent: true,
      },
      {
        source: '/study/project',
        destination: '/projects',
        permanent: true,
      },
      {
        source: '/study/development',
        destination: '/writing',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
```

## 🎨 Color Customization

If you want to adjust the warm color palette, edit `src/app/globals.css`:

```css
@theme {
  /* Change these to your preferred warm colors */
  --color-clay: #E8DED0;
  --color-sky: #E3EBF2;
  --color-coral: #F4E5E0;
  /* ... etc */
}
```

## 📱 Mobile Testing

Test on various screen sizes:
- Mobile (320px - 640px)
- Tablet (640px - 1024px)
- Desktop (1024px+)

Use browser dev tools or real devices.

## 🚀 Deployment

After testing locally:

```bash
# Build for production
npm run build
# or
bun build

# Test the production build
npm start
# or
bun start

# Deploy to your hosting platform
```

## ⚠️ Troubleshooting

### Issue: Fonts not loading
- Check that `public/fonts/PretendardVariable.woff2` exists
- Clear browser cache and hard reload (Cmd/Ctrl + Shift + R)

### Issue: Styles not applying
- Make sure you replaced `globals.css` correctly
- Check that Tailwind is processing the new CSS variables
- Try deleting `.next` folder and rebuilding

### Issue: Navigation not working
- Check that `top-navigation.tsx` is imported in `layout.tsx`
- Verify all route paths exist

### Issue: Images not showing
- Check image paths in `/public/images/`
- Update `src` attributes in components
- Make sure images have correct permissions

## 📚 Additional Resources

- `DESIGN_SPECIFICATION.md` - Complete design system documentation
- `design-preview.html` - Visual design preview
- `NEW_PAGES_TEMPLATES.md` - Page templates with example content

## 🆘 Need Help?

If you encounter issues:
1. Check the browser console for errors
2. Review the migration steps above
3. Compare your code with the template files
4. Make sure all dependencies are installed (`npm install` or `bun install`)

---

**Note**: Take your time with the migration. Test each step thoroughly before moving to the next. You can always refer back to your backup files if needed.
