# Blog Design Specification
## Inspired by Anthropic's Warm Minimalism

---

## Design Philosophy

**Core Principles:**
- Warm minimalism: inviting yet uncluttered
- Content-first: design serves the content, not vice versa
- Sophisticated simplicity: minimal without being cold
- Accessible and readable: prioritize clarity

**Mood:** Warm, kind, sweet, professional, approachable

---

## Color Palette

### Primary Colors
```
Background (Light):    #FFFFFF (pure white)
Background (Subtle):   #FAF9F6 (warm off-white, "oat")
Text Primary:          #1A1A1A (deep charcoal)
Text Secondary:        #4A4A4A (medium gray)
Text Tertiary:         #8A8A8A (light gray for metadata)
```

### Accent Colors (Warm Neutrals)
```
Clay:                  #E8DED0 (warm beige)
Sky:                   #E3EBF2 (soft blue-gray)
Coral:                 #F4E5E0 (peachy cream)
Olive:                 #E8EBE0 (sage green)
Cactus:                #DFE8DC (pale green)
Heather:               #E8E3EB (lavender gray)
```

### Semantic Colors
```
Link Default:          #6B5B3A (warm brown)
Link Hover:            #4A3F28 (darker brown)
Border Subtle:         #EFEFEF (very light gray)
Border Emphasis:       #D4D4D4 (light gray)
```

**Usage Guidelines:**
- Use accent colors as background for cards, sections, or highlights
- Never use more than 2-3 accent colors on a single page
- Primary text always on white or very light backgrounds for readability
- Links use warm brown instead of blue to maintain warmth

---

## Typography

### Font Families

**Primary Stack (if using web-safe fonts):**
```css
--font-sans: 'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-serif: 'Merriweather', 'Georgia', 'Times New Roman', serif;
--font-mono: 'JetBrains Mono', 'Fira Code', 'Monaco', monospace;
```

**Recommended Custom Fonts (Anthropic-inspired):**
- Headings: DM Sans, Plus Jakarta Sans, or Manrope (geometric, modern)
- Body: Inter, Source Sans Pro
- Serif (accents): Merriweather, Lora
- Code: JetBrains Mono, Fira Code

### Type Scale
```
Display (Hero):        48px / 3rem (font-weight: 600)
H1:                    36px / 2.25rem (font-weight: 600)
H2:                    28px / 1.75rem (font-weight: 600)
H3:                    22px / 1.375rem (font-weight: 600)
Body Large:            18px / 1.125rem (font-weight: 400)
Body:                  16px / 1rem (font-weight: 400)
Body Small:            14px / 0.875rem (font-weight: 400)
Caption:               12px / 0.75rem (font-weight: 400)
```

### Line Heights
```
Headings:              1.2
Body:                  1.7
Caption:               1.5
```

### Font Weights
```
Regular:               400
Medium:                500
Semibold:              600
Bold:                  700 (use sparingly)
```

---

## Spacing System

**Base Unit:** 8px

### Spacing Scale
```
xs:   4px   (0.25rem)
sm:   8px   (0.5rem)
md:   16px  (1rem)
lg:   24px  (1.5rem)
xl:   32px  (2rem)
2xl:  48px  (3rem)
3xl:  64px  (4rem)
4xl:  96px  (6rem)
```

### Layout Spacing
```
Section Padding (Vertical):    64px - 96px (2xl - 3xl)
Section Padding (Horizontal):  24px - 48px (responsive)
Component Spacing:             32px - 48px (xl - 2xl)
Element Spacing:               16px - 24px (md - lg)
```

### Container Widths
```
Max Content Width:     1200px
Narrow Content:        800px (for reading-heavy pages like CV, Writings)
Wide Content:          1400px (for grid layouts like Projects)
```

---

## Layout Structure

### Grid System
- **12-column grid** for flexible layouts
- **Gutter:** 24px (lg) on desktop, 16px (md) on mobile
- **Margins:** 48px on desktop, 24px on mobile

### Breakpoints
```
Mobile:        < 640px
Tablet:        640px - 1024px
Desktop:       1024px - 1440px
Large Desktop: > 1440px
```

---

## Component Specifications

### Navigation Bar (Fixed Top)

**Structure:**
- Height: 72px
- Background: White with subtle shadow on scroll
- Logo/Name: Left-aligned
- Navigation Links: Right-aligned (or center-aligned if preferred)
- Padding: 24px horizontal

**States:**
- Default: Clean white background, no shadow
- Scrolled: Add subtle shadow `0 2px 8px rgba(0,0,0,0.05)`

**Navigation Links:**
- Font: 16px, medium weight (500)
- Color: #4A4A4A (secondary text)
- Active/Hover: #1A1A1A (primary text) with subtle underline
- Spacing: 32px between links

**Mobile:**
- Hamburger menu (right side)
- Slide-out or dropdown menu with generous spacing

### Cards (Research, Projects)

**Style:**
- Background: White or accent color (Clay, Sky, Coral, etc.)
- Border: None or 1px solid #EFEFEF
- Border Radius: 12px (subtle rounding)
- Padding: 32px
- Shadow: None (default), `0 4px 16px rgba(0,0,0,0.06)` on hover
- Transition: `all 0.3s ease`

**Content Structure (Research/Project Card):**
1. Title (H3, 22px, semibold)
2. Metadata (14px, tertiary text color)
   - Publication: Authors, Venue, Year
   - Project: Tech stack, Date
3. Description (16px, body text, 2-3 lines)
4. Links (16px, link color with arrow icon)

**Hover Effect:**
- Lift slightly: `transform: translateY(-4px)`
- Add shadow
- Link color darkens

### Buttons & Links

**Primary Button:**
- Background: #6B5B3A (warm brown)
- Text: White, 16px, medium weight
- Padding: 12px 24px
- Border Radius: 8px
- Hover: Darken to #4A3F28

**Secondary Button:**
- Background: Transparent
- Border: 2px solid #6B5B3A
- Text: #6B5B3A, 16px, medium weight
- Padding: 10px 22px
- Border Radius: 8px
- Hover: Background fills with #6B5B3A, text turns white

**Text Link:**
- Color: #6B5B3A
- Underline: None (default), appears on hover
- Transition: `color 0.2s ease`

### Forms & Inputs (if needed for contact)

**Input Field:**
- Border: 2px solid #D4D4D4
- Border Radius: 8px
- Padding: 12px 16px
- Font: 16px body
- Focus: Border color changes to #6B5B3A, add subtle shadow

---

## Page-Specific Layouts

### Home Page

**Hero Section:**
- Height: ~500px (not full viewport)
- Layout: Two-column (60/40 split)
  - Left: Name (Display size), Title/Affiliation, Research interests (2-3 sentences), CTA buttons
  - Right: Professional photo (rounded corners, ~400px)
- Background: White or subtle accent color

**Featured Section:**
- Title: "Recent Highlights" (H2)
- Layout: 2-3 cards in horizontal grid
- Content: Latest paper, featured project, recent blog post
- Background: Alternating white and accent backgrounds

**Updates/News (Optional):**
- Simple chronological list with dates
- 3-4 most recent items
- "View all →" link

### Research Page

**Header:**
- Page title: "Research" (H1)
- Brief statement: 1-2 sentences about research focus

**Layout:**
- Grouped by year (descending): 2024, 2023, etc.
- Each publication as a card or list item
- Filter/sort options at top (optional): All, Conference Papers, Preprints, Workshop Papers

**Publication Entry:**
- Title (H3, bold, clickable to paper)
- Authors (with your name highlighted)
- Venue + Year
- Abstract (collapsible or short excerpt)
- Links: PDF, arXiv, Code (GitHub icon), Project Page (styled as small chips/badges)

### Projects Page

**Header:**
- Page title: "Projects" (H1)
- Brief description: "Open-source implementations and research code"

**Layout:**
- Grid: 2 columns on desktop, 1 on mobile
- Cards with consistent height or masonry layout

**Project Card:**
- Thumbnail/icon at top (optional)
- Title (H3)
- Tech stack tags (small pills: Python, PyTorch, etc.)
- Description (2-3 sentences)
- Links: GitHub (with star count if public), Demo, Paper (if applicable)
- Background: Alternating accent colors for variety

### CV Page

**Layout:**
- Single column, narrow width (800px max) for readability
- Traditional CV structure with clear section headers

**Sections:**
1. Education
2. Research Experience
3. Publications (abbreviated list with "See Research page for full list" link)
4. Technical Skills
5. Awards & Honors
6. Teaching & Service

**Download Button:**
- Prominent "Download PDF" button at top-right
- Sticky position as user scrolls (optional)

**Styling:**
- Clean, professional, print-friendly
- Use serif font for body text (optional, for formal feel)
- Consistent indentation and spacing

### Writings Page

**Header:**
- Page title: "Writing" (H1)
- Tagline: "Technical notes, tutorials, and reflections"

**Layout:**
- Simple chronological list (blog-style)
- Each entry: Date (left), Title, Short excerpt (1 sentence)
- Minimal decoration

**Entry Format:**
```
Jan 2026    Understanding Attention Mechanisms
            A deep dive into the mathematics behind transformer attention...
```

- Click title to read full post
- Tags (optional): Research, Tutorial, Personal

**Individual Post Page:**
- Narrow reading width (700px)
- Large, readable typography
- Generous line spacing
- Back to Writings link at top

---

## Visual Elements

### Borders
- **Section Dividers:** 1px solid #EFEFEF (top border)
- **Card Borders:** None or 1px solid #EFEFEF (optional)
- **Emphasis Borders:** 2px solid accent color (for highlighted items)

### Shadows
- **Default:** None (flat design)
- **Hover:** `0 4px 16px rgba(0,0,0,0.06)` (very subtle)
- **Elevated:** `0 8px 24px rgba(0,0,0,0.08)` (rare, for modals)

### Border Radius
- **Cards:** 12px
- **Buttons:** 8px
- **Images:** 8px - 16px
- **Pills/Tags:** 24px (fully rounded)

### Icons
- **Style:** Line icons (not solid) for consistency with minimal aesthetic
- **Size:** 20px - 24px default
- **Color:** Match text color or link color
- **Recommended Sets:** Lucide, Feather Icons, Heroicons

---

## Interactions & Animations

### Principles
- **Subtle and quick:** 200ms - 300ms transitions
- **Ease:** Use `ease-out` or `ease-in-out`
- **Purpose:** Feedback, not decoration

### Hover States
- Cards: Lift + shadow (`transform: translateY(-4px)`)
- Links: Color change + underline
- Buttons: Slight darken or scale

### Transitions
```css
Default: all 0.3s ease
Links: color 0.2s ease
Cards: transform 0.3s ease, box-shadow 0.3s ease
```

### Scroll Behavior
- Smooth scrolling between sections
- Navigation bar gains shadow after scrolling 50px

---

## Accessibility

### Contrast
- Ensure 4.5:1 minimum contrast ratio for body text
- 3:1 minimum for large text (18px+)

### Focus States
- Visible focus outline on all interactive elements
- Use accent color with 2px outline

### Alt Text
- All images must have descriptive alt text
- Decorative images: `alt=""`

### Semantic HTML
- Use proper heading hierarchy (H1 → H2 → H3)
- Navigation inside `<nav>` element
- Main content inside `<main>` element

---

## Implementation Notes

### Performance
- Load fonts asynchronously
- Optimize images (WebP format, responsive sizes)
- Lazy load images below fold
- Minimize CSS/JS bundle sizes

### Responsive Design
- Mobile-first approach
- Test on actual devices
- Ensure touch targets are at least 44x44px

### Browser Support
- Modern browsers (last 2 versions)
- Graceful degradation for older browsers

---

## Design Inspiration References

- **Anthropic Blog:** Warm accent colors, generous spacing, card-based layouts
- **Claude App:** Friendly typography, minimal interactions, inviting tone
- **Academic Homepages:** Andrew Ng, Yann LeCun (content structure)
- **Minimal Portfolio Sites:** Emphasis on content, subtle animations

---

## Next Steps

1. **Wireframes:** Create low-fidelity wireframes for each page
2. **Visual Mockups:** Design high-fidelity mockups in Figma/Sketch
3. **Prototype:** Build interactive prototype for key user flows
4. **Develop:** Implement with chosen tech stack (Next.js, Hugo, Jekyll, etc.)
5. **Test:** User testing for navigation and readability
6. **Deploy:** Launch and iterate based on feedback

---

*Document Version: 1.0*
*Last Updated: January 28, 2026*
