---
name: store-screenshots
description: Generate beautiful, editorial-style App Store and Microsoft Store screenshots as HTML, then export them as PNG images. Supports multiple languages, app screenshot integration, and adaptive layouts for different store formats. Use when the user needs store listing screenshots, promotional images, or marketing slides for any app.
---

Generate production-quality store screenshots for App Store (macOS/iOS) and Microsoft Store. Output is self-contained HTML files (one per language) with all slides stacked vertically, then exported as individual PNG images via Puppeteer.

## Activation

Use this skill when the user asks for:
- App Store screenshots / capturas
- Microsoft Store screenshots
- Store listing images / marketing slides
- Promotional images for an app
- "Screenshots para la store" or similar

## First Steps — Gather Context

Before designing, ask the user:

1. **Which store?** App Store (macOS = 2560x1600, iOS = 1290x2796) or Microsoft Store (1920x1080)?
2. **Languages?** Default to English + Spanish. Ask if others needed.
3. **App screenshots?** "Do you have screenshots of your app? (settings, main UI, overlays)" — if provided, integrate smartly in phone mockups, glass containers, or peaking from sides.
4. **Key features?** What are the 4-5 main selling points?
5. **Brand assets?** Logo/mascot image path, primary accent color, font preference.
6. **App name and tagline?**

If the user has a codebase, extract context: colors from CSS variables, logos from assets, feature descriptions from landing pages. Detect if the app is iOS/Android native, desktop, or web — adapt mockup presentation accordingly.

## Design System — Adaptive Store Style

### CRITICAL: Adapt to Each App's Brand

**NEVER** use a single fixed color scheme for all apps. The design MUST match the app's identity:
- Extract the app's primary color and use it as the dominant accent
- Use the app's font if available, otherwise pick a high-quality alternative
- Background color should complement the app: dark backgrounds work for most, but bright/colored backgrounds (brand color as bg) can be MORE impactful
- Example: Orange app → orange gradient bg or dark bg with orange accents. Blue app → deep navy bg with cyan accents. Yellow app → bold yellow sections on dark.

### Background Treatments (choose based on app brand)

**Dark solid** (most versatile): #0f0e0d to #1a1a2e — works for any accent color. Add subtle radial orbs of the accent color at 0.10-0.20 opacity with blur 160px.

**Brand color gradient**: Use the app's primary color as a full gradient background. Bold and eye-catching. E.g., deep blue → purple for a productivity app, warm orange → amber for a creative app.

**Color-blocked sections**: Different colored backgrounds per section within a slide. Pink on left, blue on right — great for showing 2 features. (See: Photomath, Storytel patterns)

**Light/white with accent**: #fafafa with colored mesh gradients. Fresh, modern, Apple-like. Good for productivity/utility apps.

### Typography Rules

**CRITICAL: Every text must be LARGE and readable. No tiny text ever.**

- **Font**: Use the app's font if available. Otherwise: Inter (800-900 weight), SF Pro, or another distinctive sans-serif. NEVER generic system fonts.
- **Headlines (iOS portrait)**: 80-120px, weight 800-900, letter-spacing -3 to -5px
- **Headlines (landscape)**: 130-210px, weight 800-900, letter-spacing -5 to -10px
- **Subheadlines**: 32-44px, weight 400-500, 60-70% opacity
- **Feature text**: 24-32px, weight 500-600
- **Labels/badges**: 18-24px, uppercase or sentence case
- **Max 3 text levels per slide. Max 4 lines of copy. Short, punchy.**
- ALL-CAPS headlines work great for strong, action-oriented messaging (see: Discord pattern)

### Color Strategy

**1-2 dominant accent colors per slide.** Never more.

Derive from the app's brand:
- Primary accent: App's main brand color
- Secondary accent: Complementary or analogous color
- Text: White on dark backgrounds, dark on light backgrounds
- Gradient text for headlines: primary → secondary accent colors

Common high-impact palettes:
- Deep navy + electric blue (tech/productivity)
- Black + vibrant yellow (social/dating — Bumble pattern)
- Black + pink + blue (education — Photomath pattern)
- Charcoal + lime green (messaging — privacy apps)
- Charcoal + warm orange (creative tools)

### Layout Patterns

**Centered with phone mockup (iOS/mobile)**:
- Headline top-center (80-120px)
- Phone mockup center-bottom, taking 50-60% of height
- 1-2 lines subtitle between headline and phone
- Mockup has rounded corners (40-48px), subtle shadow

**Side-by-side dual mockups**:
- Two phone mockups showing different features
- Headline above or between
- Equal visual weight, slight rotation on each (-2deg / +2deg)
- Great for "before/after" or "two features"

**Split layout (landscape)**:
- Text 50-55% left, screenshot 45-50% right (or vice versa)
- Screenshot peaking from edge with rotation and shadow

**Color-blocked dual**:
- Split slide into 2 colored sections (left/right or top/bottom)
- Each section highlights a different feature with its own accent color
- Phone mockup in each section

**Full-bleed hero**:
- Giant headline filling most of the slide
- Logo/icon at top
- Minimal supporting text
- Background carries the visual weight through color/gradient

### App Screenshot Integration

**CRITICAL: Determine if the app is mobile or desktop.**
- **Mobile app**: Show screenshots inside phone mockups with rounded corners (40-48px radius), subtle glass frame effect
- **Desktop app**: Show screenshots as floating windows with macOS-style rounded corners, title bar dots, rotation, depth shadow
- **Web app**: Show in browser-style frame or floating panels

**Phone mockup CSS pattern:**
```css
.phone-mockup {
  background: #1a1a1a;
  border-radius: 44px;
  padding: 12px;
  box-shadow: 0 24px 70px rgba(0,0,0,0.4), 0 0 0 1px rgba(255,255,255,0.08);
  overflow: hidden;
}
.phone-mockup .screen {
  border-radius: 36px;
  overflow: hidden;
}
.phone-mockup .screen img { width: 100%; display: block; }
```

**When user provides screenshots:**
- In phone mockup: Wrap in .phone-mockup container
- Peaking from side: offset -60px to -80px off-edge, rotate 2-3deg, border-radius 24-40px, box-shadow heavy
- Full display: Center with rotation, shadow, phone frame
- Multiple screenshots: Overlap at different angles/z-indexes, or side-by-side with slight rotation

**When user has NO screenshots:**
- Use solid colored rectangles with the app's UI elements recreated in HTML
- Show key features as designed cards/sections
- Use the app icon/logo prominently
- Create abstract representations of the app's functionality

### Glassmorphism Components

Use for feature cards, callout containers:
```css
.glass-card {
  background: rgba(255,255,255,0.06);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(255,255,255,0.10);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 8px 32px rgba(0,0,0,0.2);
}
```

For light backgrounds:
```css
.glass-card-light {
  background: rgba(255,255,255,0.7);
  backdrop-filter: blur(16px);
  border: 1px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  padding: 32px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.06);
}
```

### Capsule/Pill Component
```css
.capsule {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: rgba(accent, 0.08);
  border: 1px solid rgba(accent, 0.20);
  border-radius: 100px;
  padding: 14px 32px;
}
```

### Feature Card (colored icon + text)
```css
.feat-card {
  background: white; /* or glass */
  border: 1.5px solid rgba(0,0,0,0.06);
  border-radius: 24px;
  padding: 44px 40px;
  box-shadow: 0 4px 20px rgba(0,0,0,0.04);
}
.feat-icon {
  width: 56px; height: 56px;
  border-radius: 16px;
  background: rgba(accent, 0.08);
}
.feat-card h3 { font-size: 28px; font-weight: 800; }
.feat-card p { font-size: 19px; color: rgba(0,0,0,0.5); }
```

## Slide Structure — Standard 5-Slide Pack

### Slide 1: Hero — Value Proposition
- App icon/logo at top (centered, 80-120px)
- Giant headline: main benefit in 2-3 words
- Short subtitle (1 line max)
- Phone mockup or app preview taking bottom 50%
- OR: Full-bleed headline with colored background, no mockup

### Slide 2: Core Feature
- Demonstrate the main interaction
- Phone mockup(s) showing the feature in action
- Bold headline (2-4 words, ALL-CAPS works well)
- 1 line description

### Slide 3: Key Feature / Differentiator
- Before/after or comparison layout
- Color-blocked sections if showing two aspects
- Cards with examples if relevant

### Slide 4: Additional Feature
- Another selling point
- Different layout from slides 2-3 for variety
- Can use dual phone mockups

### Slide 5: Social Proof / Compatibility / CTA
- Bento grid of supported platforms/apps
- Rating/reviews highlight
- OR: Strong closing statement with CTA

### Continuity Between Slides (optional)
Some apps use connected backgrounds where slide 1 flows into slide 2. Create this by:
- Using the same gradient direction across adjacent slides
- Aligning elements at edges so they "continue"
- Maintaining consistent color temperature

## Portrait (iOS) Specific Rules

**CRITICAL for iOS portrait (1290x2796):**
- This is a TALL format. Fill the space vertically.
- Headline at top: 80-120px, centered
- Phone mockup below: should take 50-65% of the slide height
- Phone mockup width: 80-90% of slide width for impact
- NO huge empty gaps between headline and mockup
- Subtitle between headline and mockup if needed (32-40px)
- Feature badges/pills below headline, above mockup
- Mockup should reach near the bottom edge (with margin)

**Phone mockup sizing for iOS slides:**
- Width: ~1000-1100px out of 1290px total (77-85%)
- This makes the app UI clearly readable
- Rounded corners: 44px outer frame, 36px inner screen
- Subtle shadow: 0 24px 70px rgba(0,0,0,0.4)

## Landscape (macOS/Windows) Specific Rules

- Headlines can be much larger (130-210px)
- Split layouts work well (text left, screenshot right)
- App screenshots as floating windows with macOS chrome
- More horizontal space for side-by-side comparisons
- Bento grids work great for feature/compatibility slides

## Export Process

After generating HTML files, create an export script:

```javascript
const puppeteer = require('puppeteer');
const path = require('path');
const fs = require('fs');

const config = {
  // Adjust per store:
  width: 1290,   // iOS: 1290, Mac: 2560, Win: 1920
  height: 2796,  // iOS: 2796, Mac: 1600, Win: 1080
  slides: 5,
};

const files = [
  { file: 'screenshots-en.html', prefix: 'en' },
  { file: 'screenshots-es.html', prefix: 'es' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const outDir = path.join(__dirname, 'exports');
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true });

  for (const { file, prefix } of files) {
    const page = await browser.newPage();
    await page.setViewport({ width: config.width, height: config.height * config.slides });
    await page.goto(`file://${path.join(__dirname, file).replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 1500));

    for (let i = 0; i < config.slides; i++) {
      await page.screenshot({
        path: path.join(outDir, `${prefix}-slide-${i + 1}.png`),
        clip: { x: 0, y: i * config.height, width: config.width, height: config.height },
      });
      console.log(`Exported: ${prefix}-slide-${i + 1}.png`);
    }
    await page.close();
  }
  await browser.close();
  console.log('Done!');
})();
```

Always create the exports folder, install puppeteer if needed, and export automatically.

## Output Checklist

Before delivering, verify:
- [ ] **No empty space**: Every slide is filled — no dead zones larger than 15% of canvas
- [ ] **Headlines readable**: 80px+ on portrait, 130px+ on landscape
- [ ] **ALL text is large**: Nothing below 18px. If text isn't important enough to be 18px+, remove it
- [ ] **Brand colors used**: Background and/or accents match the app's identity
- [ ] **Not all slides look the same**: Vary layouts (centered, split, dual mockup, full-bleed)
- [ ] **Phone mockups** (if mobile app): Proper rounded frame, visible UI, large enough to read
- [ ] **Desktop screenshots** (if desktop app): macOS/Windows chrome, rotation, shadow
- [ ] **Gradient text** on headlines for visual punch
- [ ] **Glass/capsule components** used for callouts and badges
- [ ] **Both language versions** created with proper translations
- [ ] **PNGs exported** to a clean folder
- [ ] **Dimensions match** target store exactly

## Adaptations by Store

| Store | Dimensions | Orientation | Notes |
|-------|-----------|-------------|-------|
| Mac App Store | 2560x1600 | Landscape | Desktop screenshots, split layouts |
| iOS App Store | 1290x2796 | Portrait | Phone mockups, vertical stack, fill height |
| Microsoft Store | 1920x1080 | Landscape | Similar to Mac, desktop windows |
| Google Play | 1024x500 | Landscape | Feature graphic, very compact, icon-focused |
