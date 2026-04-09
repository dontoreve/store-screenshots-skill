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

1. **Which store?** App Store (macOS = 2560x1600, iOS = 1290x2796) or Microsoft Store (1920x1080)? This determines dimensions and layout orientation.
2. **Languages?** Default to English + Spanish. Ask if they need others.
3. **App screenshots?** Ask: "Do you have any screenshots of your app I can use? (settings screens, main UI, overlays, etc.)" — if provided, integrate them smartly (peaking from sides, rotated, cropped, with shadows).
4. **Key features to highlight?** What are the 4-5 main selling points? (e.g., speed, privacy, AI features, cross-platform, languages)
5. **Brand assets?** Logo/mascot image path, primary colors, font preference.
6. **App name and tagline?**

If the user already provides context (like referencing an existing project), extract what you can from the codebase: colors from CSS variables, logos from assets folders, feature descriptions from landing pages.

## Design System — Editorial Store Style

### Core Principles
- **Typography-first**: Headlines dominate 40-60% of each slide. 130-210px, weight 800, tight letter-spacing (-5 to -10px).
- **Tight compositions**: Elements overlap and layer. NO scattered elements in corners. Everything clusters centrally or in clear left/right split layouts.
- **Playful floating capsules**: Use tilted (rotate -2deg to 2deg) dark pill-shaped capsules with warm gold borders for callouts. Same style for badges, labels, feature tags.
- **Dark backgrounds**: #0f0e0d or #111110 with subtle warm radial orbs (blur 160px), faint grid overlay (80px, 0.012 opacity).
- **NO PowerPoint vibes**: Never use plain subtitle text. Every text element should feel designed — either part of the headline gradient flow, or in a styled capsule/pill.
- **Gradient text**: White-to-cream for primary lines, accent color gradient for secondary lines.
- **Noise texture**: Subtle SVG noise overlay at 0.02 opacity for depth.

### Typography
- **Font**: Google Sans Flex (load from local woff2 or Google Fonts). If not available, use the app's primary font.
- **Headlines**: 130-210px, weight 800, letter-spacing -5px to -10px, line-height 0.90-0.96
- **Subtitles**: 36-40px, weight 400, muted color (rgba white 0.40)
- **Card text**: 22-28px, weight 500
- **Labels/badges**: 13-22px, uppercase, letter-spacing 2px

### Colors (adapt to app's brand)
- **Background**: Very dark (#0f0e0d)
- **Primary accent**: App's brand color (e.g., #f0913a for orange apps)
- **Text primary**: rgba(255,250,240,0.97) — warm white
- **Text secondary**: rgba(255,240,220,0.40) — muted warm
- **Card bg**: rgba(255,255,255,0.02) with 1px border rgba(255,255,255,0.06)
- **Capsule bg**: linear-gradient(135deg, rgba(35,28,18,0.96), rgba(28,24,16,0.98)) with border rgba(accent,0.18)
- **Orbs**: radial-gradient with accent color at 0.10-0.20 opacity, blur 160px

### Layout Patterns

**Split layout** (headline left, screenshot right):
- Text area: 55% width, padding-left 160px
- Screenshot: absolute positioned, peaking from right edge with rotate(2deg), border-radius 24px, heavy shadow, cropped with overflow hidden

**Centered layout** (headline center, elements around):
- Headline dead center
- Supporting elements (mascot, pills, stats) positioned absolutely around it
- Background mascot at 0.55 opacity behind text

**Right-aligned layout** (screenshot left, text right):
- Screenshot peaking from left with rotate(-2deg)
- Text + cards stacked vertically on right, aligned flex-end

### App Screenshot Integration
When user provides screenshots:
- **Peaking from side**: Position absolutely, offset -60px to -80px off-edge, rotate 2deg, border-radius 24px, box-shadow 0 30px 80px rgba(0,0,0,0.6), overflow hidden. Crop by using margin-left negative + width > 100%.
- **Full display**: Center with border-radius, shadow, slight rotation
- **Multiple screenshots**: Overlap them at different angles, varying z-index

### Capsule Component
Reusable for callouts, badges, feature tags:
```css
.capsule {
  display: inline-flex;
  align-items: center;
  gap: 12px;
  background: linear-gradient(135deg, rgba(35,28,18,0.96), rgba(28,24,16,0.98));
  border: 1px solid rgba(255,200,120,0.22);
  border-radius: 20px;
  padding: 14px 32px;
  transform: rotate(-2deg); /* playful tilt */
  box-shadow: 0 10px 35px rgba(0,0,0,0.5);
}
.capsule span {
  font-size: 22px;
  font-weight: 600;
  color: rgba(255,248,240,0.85);
}
```

### Privacy/Feature Card Component
For two-column info cards:
```css
.privacy-card {
  display: flex;
  align-items: stretch;
  background: linear-gradient(135deg, rgba(35,28,18,0.96), rgba(28,24,16,0.98));
  border: 1px solid rgba(accent,0.15);
  border-radius: 28px;
  padding: 40px 60px;
  box-shadow: 0 12px 50px rgba(0,0,0,0.5);
}
/* Items separated by border-left divider */
```

### Real Overlay/UI Element Replication
If the app has a floating overlay, pill, or widget:
- Recreate it in HTML at NATIVE size (no transform:scale — it distorts borders and shadows)
- Copy exact gradients, border colors, box-shadows from the app's source CSS
- For waveform bars: use static heights with the correct color gradient (warm orange → cool blue)

## Slide Structure — Standard 5-Slide Pack

### Slide 1: Hero — Value Proposition
- Giant headline: time-saving claim or main benefit
- Mascot/logo large, overlapping or behind text
- Privacy/trust card at bottom OR key stats
- Overlay pill floating near headline

### Slide 2: Core Mechanic — How It Works
- Demonstrate the main interaction (e.g., "Push and Talk")
- App screenshot peaking from right side
- Headline left, UI right
- Real overlay/widget component displayed

### Slide 3: Key Feature — AI/Smart Capability
- Feature showcase with before/after or input/output
- App screenshot peaking from left side
- Text + example cards stacked on right
- Capsule badge for optional/premium callout

### Slide 4: Differentiator — Translation/Speed/Unique
- Two-card comparison layout (input → output)
- Arrow component between cards with label
- Language capsule badge
- Flag emojis for language features

### Slide 5: Compatibility/Ecosystem
- Bento grid of supported apps/platforms
- Icon + name per card
- "Any App" card with dashed border as accent
- Clean, satisfying grid layout

## Export Process

After generating HTML files, create an export script:

```javascript
// export-slides.js
const puppeteer = require('puppeteer');
const path = require('path');

const SLIDE_WIDTH = 2560;  // adjust per store
const SLIDE_HEIGHT = 1600; // adjust per store
const SLIDES = 5;

const files = [
  { file: 'store-screenshots-en.html', prefix: 'en' },
  { file: 'store-screenshots-es.html', prefix: 'es' },
];

(async () => {
  const browser = await puppeteer.launch({ headless: 'new', args: ['--no-sandbox'] });
  const outDir = path.join(__dirname, 'exports');

  for (const { file, prefix } of files) {
    const page = await browser.newPage();
    await page.setViewport({ width: SLIDE_WIDTH, height: SLIDE_HEIGHT * SLIDES });
    await page.goto(`file://${path.join(__dirname, file).replace(/\\/g, '/')}`, { waitUntil: 'networkidle0', timeout: 30000 });
    await page.evaluate(() => document.fonts.ready);
    await new Promise(r => setTimeout(r, 1500));

    for (let i = 0; i < SLIDES; i++) {
      await page.screenshot({
        path: path.join(outDir, `${prefix}-slide-${i + 1}.png`),
        clip: { x: 0, y: i * SLIDE_HEIGHT, width: SLIDE_WIDTH, height: SLIDE_HEIGHT },
      });
      console.log(`Exported: ${prefix}-slide-${i + 1}.png`);
    }
    await page.close();
  }
  await browser.close();
  console.log('Done!');
})();
```

Run with: `npm install puppeteer && node export-slides.js`

Always create the exports folder, install puppeteer if needed, and export automatically after generating HTML.

## Output Checklist

Before delivering, verify:
- [ ] Each slide uses the full canvas — no huge empty areas
- [ ] Headlines are HUGE (130px+) and dominate the composition
- [ ] Elements overlap and layer — not scattered in corners
- [ ] Capsules/badges are playful with slight rotation
- [ ] App screenshots (if provided) peak from edges with shadow + rotation
- [ ] Dark background with warm orbs, grid, noise texture
- [ ] Gradient text on headlines (white-to-cream primary, accent color secondary)
- [ ] No plain subtitle text — everything styled
- [ ] Both language versions created with proper translations
- [ ] PNGs exported to a clean folder
- [ ] Slide dimensions match the target store

## Adaptations by Store

| Store | Dimensions | Orientation | Notes |
|-------|-----------|-------------|-------|
| Mac App Store | 2560x1600 | Landscape | 16:10, text can be larger |
| iOS App Store | 1290x2796 | Portrait | 9:19.5, stack vertically, phone mockups |
| Microsoft Store | 1920x1080 | Landscape | 16:9, similar to Mac but narrower |
| Google Play | 1024x500 | Landscape (feature) | Feature graphic, very compact |

For portrait (iOS): reorganize to vertical stacking — headline on top, screenshot below, capsules between. Everything still big and editorial.
