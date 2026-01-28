# CV and Card Layout Updates

## Summary of Changes

All three requested updates have been completed successfully!

---

## 1. CV Page Updated with PDF Content ✅

### Changes Made

Updated `/src/app/(routes)/cv/page.tsx` with information from your CV:

#### Hero Section
- Changed name display to "Janghyeok Choi · AI Engineer"
- Updated bio to reflect AI Engineering specialization

#### Education Section
- **Seoul National University**
- B.S. in Industrial Engineering
- Mar. 2020 - Present
- CGPA: 3.54/4.3

#### Experience Section
- **Dalpha - AI Engineer** (Aug. 2025 - Nov. 2025)
  - Order Quantity Prediction (Contracted Project): Data Pipeline, Statistical Analysis, Machine Learning
  - Customer Service Chatbot (Discontinued): Data Augmentation & Refinement, LLM Agent, Prompt Engineering, Data Pipeline

#### Projects Section (New!)
- **LitSearch Data Augmentation** (Mar. 2025 - Jun. 2025)
- Link to Projects page for more details

#### Publications Section
- **(Under Writing) DALDALL: Data Augmentation for Lexical and Semantic Diverse in Legal Domain by leveraging LLM-Persona**
- Authors: Janghyeok Choi, Jaewon Lee
- Link to Research page for complete list

#### Technical Skills
- **Programming Languages**: Python, JavaScript, TypeScript, Rust

#### Military Service (New!)
- **Republic of Korea Air Force** (Apr. 2022 - Jan. 2024)

#### Awards & Honors
- **Altwell Mincho Scholarship** (Mar. 2021 - Present)
- Merit-based scholarship awarded to promising students

#### CV PDF
- ✅ Copied to `/public/cv.pdf` for download functionality

---

## 2. Cards Changed to 3 Columns ✅

### Research Page (`/src/app/(routes)/research/page.tsx`)

**Before:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
```

**After:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Result:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns (previously 2)

### Projects Page (`/src/app/(routes)/projects/page.tsx`)

**Before:**
```tsx
<div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
```

**After:**
```tsx
<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
```

**Result:**
- Mobile: 1 column
- Tablet: 2 columns
- Desktop: 3 columns (previously 2)

---

## 3. Thumbnail Images Fixed ✅

### Research Page Thumbnail

**Before:**
```tsx
<div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 -mt-8 -mx-8 mb-4">
  <Image
    src={post.thumbnailUrl}
    alt={post.title}
    fill
    className="object-cover"
  />
</div>
```

**After:**
```tsx
<div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 -mt-8 -mx-8 mb-4">
  <Image
    src={post.thumbnailUrl}
    alt={post.title}
    fill
    className="object-contain"
  />
</div>
```

### Projects Page Thumbnail

**Before:**
```tsx
<div className="relative w-full h-48 rounded-lg overflow-hidden bg-gray-100 -mt-8 -mx-8 mb-4">
  <Image
    src={project.thumbnailUrl}
    alt={project.title}
    fill
    className="object-cover"
  />
</div>
```

**After:**
```tsx
<div className="relative w-full aspect-video rounded-lg overflow-hidden bg-gray-100 -mt-8 -mx-8 mb-4">
  <Image
    src={project.thumbnailUrl}
    alt={project.title}
    fill
    className="object-contain"
  />
</div>
```

### Changes Explained

1. **`h-48` → `aspect-video`**
   - Changed from fixed height (192px) to 16:9 aspect ratio
   - More flexible and maintains proper proportions
   - Adapts to card width automatically

2. **`object-cover` → `object-contain`**
   - `object-cover`: Crops image to fill space (can cut off parts)
   - `object-contain`: Fits entire image within space (no cropping)
   - Better for thumbnails where you want to see the full image

---

## Visual Impact

### Card Layout

**Before (2 columns):**
```
┌──────────────┐  ┌──────────────┐
│   Card 1     │  │   Card 2     │
│              │  │              │
└──────────────┘  └──────────────┘
┌──────────────┐  ┌──────────────┐
│   Card 3     │  │   Card 4     │
│              │  │              │
└──────────────┘  └──────────────┘
```

**After (3 columns):**
```
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Card 1  │  │  Card 2  │  │  Card 3  │
│          │  │          │  │          │
└──────────┘  └──────────┘  └──────────┘
┌──────────┐  ┌──────────┐  ┌──────────┐
│  Card 4  │  │  Card 5  │  │  Card 6  │
│          │  │          │  │          │
└──────────┘  └──────────┘  └──────────┘
```

**Benefits:**
- ✅ More compact layout
- ✅ See more content at once
- ✅ Better use of screen space
- ✅ Still readable and not cramped

### Thumbnail Improvements

**Before:**
- Fixed height could distort tall/wide images
- `object-cover` might crop important parts
- Inconsistent aspect ratios

**After:**
- 16:9 aspect ratio consistent across all cards
- `object-contain` shows full image
- No cropping or distortion
- Professional presentation

---

## Testing Checklist

After these changes, verify:

- [ ] CV page shows all your information correctly
- [ ] CV PDF download works
- [ ] Research page shows 3 cards per row on desktop
- [ ] Projects page shows 3 cards per row on desktop
- [ ] Thumbnails display properly without cropping
- [ ] Thumbnails maintain aspect ratio
- [ ] Cards look good on mobile (1 column)
- [ ] Cards look good on tablet (2 columns)
- [ ] All links work correctly

---

## File Changes Summary

### Modified Files
1. `/src/app/(routes)/cv/page.tsx` - Updated CV content
2. `/src/app/(routes)/research/page.tsx` - 3 columns + thumbnail fix
3. `/src/app/(routes)/projects/page.tsx` - 3 columns + thumbnail fix

### New Files
1. `/public/cv.pdf` - Your CV PDF for download

---

## Next Steps (Optional)

If you want to further customize:

### Adjust Card Size
```tsx
// Make cards even smaller
lg:grid-cols-4  // 4 columns instead of 3

// Make cards larger
lg:grid-cols-2  // Back to 2 columns
```

### Change Thumbnail Aspect Ratio
```tsx
aspect-video    // Current: 16:9
aspect-square   // 1:1 (square)
aspect-[4/3]    // 4:3
aspect-[21/9]   // Ultrawide
```

### Thumbnail Object Fit Options
```tsx
object-contain  // Current: show full image
object-cover    // Fill space (may crop)
object-fill     // Stretch to fill
object-none     // Original size
```

---

*Updated: January 28, 2026*
