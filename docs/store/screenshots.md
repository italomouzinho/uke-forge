# Melodía — Screenshot Automation Plan

Automated screenshots are generated using Playwright against the Capacitor Android
emulator or the web app running on localhost.

## Playwright flows

### 1. Chords tab (portrait, 1080×1920)
- Flow: `test/screenshots/chords.spec.js`
- Steps:
  1. Navigate to `/` (Chords tab active by default)
  2. Select key "G" and mode "Major"
  3. Select preset progression "I–IV–V"
  4. Wait for chord diagrams to render
  5. `page.screenshot({ path: 'screenshots/01-chords.png', clip: { x:0,y:0,w:1080,h:1920 } })`

### 2. Explore tab — fretboard (portrait, 1080×1920)
- Flow: `test/screenshots/explore.spec.js`
- Steps:
  1. Click Explore tab
  2. Tap frets to produce a recognisable chord (e.g. G major)
  3. Wait for chord-name detection overlay
  4. Screenshot

### 3. Performance mode — portrait (1080×1920) and landscape (1920×1080)
- Flow: `test/screenshots/performance.spec.js`
- Steps:
  1. Navigate to Song Builder, create section "Intro" with chord "G"
  2. Enter Performance mode
  3. Screenshot portrait
  4. `page.setViewportSize({ width: 1920, height: 1080 })` then screenshot landscape

### 4. Song Builder — sections list (portrait, 1080×1920)
- Flow: `test/screenshots/songbuilder.spec.js`
- Steps:
  1. Add 3+ named sections with varying chord sequences
  2. Screenshot the sections list view

### 5. Transpose tab (portrait, 1080×1920)
- Flow: `test/screenshots/transpose.spec.js`
- Steps:
  1. Click Transpose tab
  2. Paste a sample chord chart (G C D G)
  3. Shift up 2 semitones → output shows A D E A
  4. Screenshot showing both input and output panels

## Running screenshots

```bash
# Capture all screenshots against the local dev server
npx playwright test test/screenshots/ --project=chromium
```

## Output directory
`screenshots/store/` (gitignored — generated assets, not source)

## Device viewport presets (Playwright)
```js
// portrait phone
{ width: 1080, height: 1920, deviceScaleFactor: 3 }
// landscape phone
{ width: 1920, height: 1080, deviceScaleFactor: 3 }
// 7-inch tablet
{ width: 1200, height: 1920, deviceScaleFactor: 2 }
```
