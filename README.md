# Melodía

Baritone ukulele chord explorer. Browse chord progressions, detect voicings on an interactive fretboard, transpose song charts, and study fingering patterns. Runs as a PWA in the browser and ships as an Android app via Capacitor. No build step is required to run the web version — open `index.html` directly.

## Quick start

```bash
# Web — open directly (no server needed)
open index.html

# Or serve locally
python3 -m http.server 3000
# → http://localhost:3000
```

## Android build

Prerequisites: Node >= 20, Android SDK, Java 17 (Temurin), Capacitor CLI.

```bash
npm install
npm run build:www        # assembles www/ from source files
npx cap sync android     # copies www/ into android/ WebView assets
cd android
./gradlew assembleDebug  # outputs android/app/build/outputs/apk/debug/app-debug.apk
```

Or use the combined shortcut:

```bash
npm run sync             # runs build:www + cap sync in one step
```

## Tests

```bash
node --test test/app.test.js    # 26 unit tests — chord tables, transposition, note math
npm run test:e2e                # Playwright e2e (requires python3 for the web server)
```

CI runs automatically on push/PR to `main` via `.github/workflows/ci.yml` — unit tests, e2e, then Android debug APK uploaded as artifact.

## File structure

```
index.html               # entire app — HTML + CSS + JS in one file
native.js                # Capacitor bridge (keep-awake, haptics, back-button, status bar)
sw.js                    # service worker (cache-first, skipped in native WebView)
manifest.webmanifest     # PWA manifest
capacitor.config.json    # Capacitor config (appId, webDir, plugin settings)
scripts/build-www.mjs    # copies source files into www/ for Capacitor
android/                 # Capacitor Android project (committed; build outputs gitignored)
assets/
  fonts/                 # self-hosted Poppins + Nunito woff2 (no CDN)
  icons/                 # SVG app icons (192 + 512)
docs/store/listing.md    # Google Play store listing draft
test/
  app.test.js            # Node --test unit tests
  e2e/                   # Playwright specs
  DEVICE_CHECKLIST.md    # manual QA gate for physical device testing
.github/workflows/ci.yml # CI pipeline
```

## Release (Android)

Signing config reads from environment variables: `MELODIA_KEYSTORE_PATH`, `MELODIA_KEYSTORE_PASS`, `MELODIA_KEY_ALIAS`, `MELODIA_KEY_PASS`. The keystore is never committed. For a signed release APK, set those variables then run:

```bash
cd android
./gradlew assembleRelease
```

## App ID

`com.italomouzinho.melodia` — defined in `capacitor.config.json`.
