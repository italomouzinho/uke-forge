# Melodía — Android App Build Specification

**Version:** 1.0 · **Status:** Ready for execution · **Baseline commit:** `bf03c9a`
**Audience:** Autonomous build agents working in parallel, plus a human reviewer.

This document is the single source of truth for converting the Melodía web app
(`index.html`, single-file, zero-dependency) into an installable Android app without
sacrificing the integrity of its verified music logic or the quality of its UX.
Every story is written to be executable by an independent agent and verifiable by
running a stated command or checklist.

---

## 1. Current-State Analysis

### 1.1 What the app is

| Property | Value |
|---|---|
| Codebase | One file, `index.html` (~1,030 lines: CSS + HTML + vanilla JS) |
| Screens | 5 tabs: Chords, Explore (interactive fretboard lab), Patterns, Song (+ Performance overlay), Transpose |
| Data | `CHORDS` table (300+ baritone-uke DGBE voicings), canonical source `CHORDS.md` |
| Persistence | `localStorage` keys `melodia.prefs`, `melodia.song` |
| Audio | Web Audio API (triangle-wave strum, gesture-initiated — autoplay-policy safe) |
| Rendering | Inline SVG fretboard diagrams, CSS glassmorphism (backdrop-filter) |
| Tests | `node --test` — 12 passing tests incl. CHORDS.md↔app parity check |
| Deploy | Vercel (auto-deploy from `main`) |

### 1.2 Android-relevant findings (from code inspection, line refs at baseline)

| # | Finding | Impact on Android | Addressed by |
|---|---|---|---|
| F1 | Google Fonts loaded from CDN (`index.html:7`) | App typography breaks offline / in APK | E1-S2 |
| F2 | No web manifest, no service worker, no icons | Not installable; no splash; no offline web | E1-S1/S3 |
| F3 | No Android back-button handling | Back press kills the app from any screen — worst-possible UX | E2-S3 + E3-S2 |
| F4 | Screen sleeps during Performance mode | Player's screen goes dark mid-song | E3-S3 |
| F5 | `confirm()` used for "Clear song" (`index.html:987`) | OS-styled blocking dialog, jarring inside an app shell | E2-S4 |
| F6 | Touch targets below 48dp (key grid ≈28px, segs ≈30px, song action buttons 26px) | Android accessibility + Material guidance violation | E2-S1 |
| F7 | No safe-area-inset handling | Content collides with notches / gesture nav bar in edge-to-edge | E2-S2 |
| F8 | `background-attachment:fixed` (`index.html:30`) | Ignored/janky on Android WebView; gradient scrolls or repaints | E2-S2 |
| F9 | `100vh` app height (desktop rule) | WebView viewport quirks; `100dvh` already used ≤860px — must be universal in the shell | E2-S2 |
| F10 | No status-bar/nav-bar theming | White system bars against #0B1622 app = broken look | E3-S1 |
| F11 | `navigator.clipboard` has a working fallback (`index.html:867`) | OK as-is in WebView | — (verify in E5) |
| F12 | `localStorage` only; no export | WebView data-clear silently destroys the user's saved song | E2-S5 |
| F13 | System font scaling untested | Layout may break at 1.3× font scale | E5-S3 |

### 1.3 Architecture decision — how to get to Android

Three candidate paths were evaluated:

| Option | Verdict | Reasoning |
|---|---|---|
| **A. TWA / Bubblewrap** (wrap the hosted PWA) | ❌ Rejected | App integrity becomes hostage to network + Vercel availability; no native plugin access (keep-awake, haptics, back-button nuance); requires Digital Asset Links + hosted HTTPS forever. |
| **B. Native rewrite** (Kotlin/Compose or Flutter) | ❌ Rejected | Throws away ~1,000 lines of *verified* logic (chord data parity test, transpose math, 6 regression-fixed bugs) and the entire test suite. Highest cost, highest regression risk, two codebases forever. |
| **C. Capacitor shell** (assets bundled in APK, native plugins via JS bridge) | ✅ **Selected** | Single codebase stays authoritative; app is fully offline by construction; native UX gaps (F3, F4, F10) are each one small plugin call; web/Vercel deployment continues unchanged; test suite keeps guarding the logic. |

**Decision: Capacitor (latest stable), `webDir` assembled by a build script.**
`minSdkVersion 26` (Android 8.0 — guarantees a Chromium WebView with
`backdrop-filter`, `dvh`, Web Audio), `targetSdkVersion` = current Play Store
requirement at build time. App ID: `com.italomouzinho.melodia`. App name: **Melodía**.

---

## 2. Non-Negotiable Integrity Invariants

Every agent, every story, every merge MUST preserve all of these. Violating any
invariant fails the story regardless of its own acceptance criteria.

- **I1 — Chord data parity.** The `CHORDS` object in `index.html` matches `CHORDS.md`
  exactly. Guarded by the existing parity test. Never edit either side without the other.
- **I2 — Test suite green.** `node --test` passes (12 tests at baseline; count only goes up).
- **I3 — Regression pack stays fixed.** These previously-fixed bugs must never reappear
  (E5 encodes them as automated e2e tests):
  1. Finger dots visible in Performance mode and Transpose popup (unique SVG filter IDs).
  2. Open chords (Em/D/G) render at the nut, not at a false "2fr" position.
  3. Transpose handles extended qualities (`Cmaj9`, `C13`) and slash chords (`D/F#`), including the slash bass.
  4. A chord line like `A A A A` transposes (never misread as PIMA fingering).
  5. Roman numerals preserve case (`i` ≠ `I`).
  6. Key-signature-aware spelling (E minor → F#, Bb major → Eb).
  7. Sidebar never auto-collapses after building a progression.
  8. Explore fretboard keyboard navigation (arrows + Enter/Space, roving tabindex, `aria-pressed`).
- **I4 — Single source of truth.** `index.html` at repo root remains the runnable web
  app (open-in-browser must keep working). The Android build *consumes* it; it never forks it.
- **I5 — No visual redesign.** The Glass design (colors, fonts, layout) is frozen.
  Only additive, Android-necessitated changes (safe areas, touch-target padding) are allowed.
- **I6 — Zero runtime framework.** No React/Vue/etc. Build-time tooling (Capacitor CLI,
  Playwright) is fine; the shipped page stays vanilla.

---

## 3. Repository Layout Contract & File Ownership

Parallel agents avoid conflicts by owning disjoint files. `index.html` is shared, so
Sprint 0 inserts named marker regions first; afterwards each epic may only edit inside
its own markers (or files it owns outright).

```
uke-forge/
├── index.html              # SHARED — edits only inside owned marker regions
├── CHORDS.md               # FROZEN (I1)
├── README.md               # E6
├── ANDROID_SPECS.md        # this file (FROZEN during build)
├── manifest.webmanifest    # E1
├── sw.js                   # E1
├── native.js               # E3 (loaded by index.html; no-op on plain web)
├── assets/
│   ├── fonts/              # E1 (self-hosted woff2 + OFL license files)
│   └── icons/              # E1 (PWA) + E6 (adaptive icon, splash, store art)
├── scripts/
│   └── build-www.mjs       # E4 (assembles www/ from root sources)
├── www/                    # BUILD OUTPUT — gitignored, never hand-edited
├── android/                # E4 (Capacitor-generated platform project, committed)
├── package.json            # E4 (devDependencies + npm scripts only)
├── capacitor.config.json   # E4
├── test/
│   ├── app.test.js         # E5 (may extend; existing tests immutable)
│   └── e2e/                # E5 (committed Playwright suite)
└── .github/workflows/      # E6 (CI)
```

### 3.1 `index.html` marker regions (inserted by Sprint 0)

| Marker | Location | Owner |
|---|---|---|
| `<!-- @region:head-pwa -->…<!-- @endregion -->` | inside `<head>` | E1 |
| `/* @region:css-android */ … /* @endregion */` | end of `<style>` | E2 |
| `// @region:app-facade … // @endregion` | top of `<script>` | E2 |
| `<!-- @region:native-script -->…<!-- @endregion -->` | before `</body>` | E3 (single `<script src="native.js">` tag) |

### 3.2 The App Facade (contract between E2 and E3)

E2 implements this inside `index.html` (`@region:app-facade`); E3 consumes it from
`native.js`. Neither side may change the signature without a spec revision.

```js
window.MelodiaApp = {
  // ---- state queries ----
  isDrawerOpen(),        // bool — mobile nav drawer
  isPerfOpen(),          // bool — performance overlay visible
  isPopupOpen(),         // bool — transpose chord popup visible
  isBrowseOpen(),        // bool — voicing browser expanded
  currentTab(),          // 'chords'|'explore'|'patterns'|'song'|'transpose'
  // ---- actions ----
  closeDrawer(), exitPerformance(), hidePopup(), closeBrowse(),
  showTab(tab),
  // ---- lifecycle events fired BY the app (E3 subscribes) ----
  onPerfChange(cb),      // cb(isOpen:bool) — for keep-awake
  onFretToggle(cb),      // cb() — for haptic tick
};
```

### 3.3 The Native Bridge (contract between E3 and the app)

`native.js` publishes this; on plain web (no `window.Capacitor`) every method is a
safe no-op so the web app never breaks:

```js
window.MelodiaNative = {
  keepAwake(on),         // Capacitor KeepAwake — perf mode only
  haptic(),              // light impact; respects system settings
  isNative(),            // bool
};
```

---

## 4. Target Android UX Definition

The finished app must feel installed, not embedded:

- **U1 — Back button** follows a strict pop-stack: close drawer → hide chord popup →
  exit Performance mode → collapse voicing browser → return to Chords tab → on Chords
  tab, minimize the app (`App.minimizeApp()`, never `exitApp()` — state survives).
- **U2 — Performance mode keeps the screen awake**, and releases the lock on exit
  (including via back button and app background).
- **U3 — System bars** colored `#0B1622`, light icons, edge-to-edge with
  `env(safe-area-inset-*)` padding on header, sidebar, drawer, and performance overlay.
- **U4 — Splash screen**: navy `#0B1622` + waveform logo, no white flash
  (`androidScaleType: CENTER_CROP`, background color set in both splash config and theme).
- **U5 — Touch targets ≥ 48×48dp** for all interactive elements (visual size may stay
  smaller via padding/hit-area expansion; the design is frozen per I5).
- **U6 — Fully offline**: airplane-mode install-to-play works; fonts, icons, all logic local.
- **U7 — Orientation**: portrait and landscape both supported; Performance mode must be
  fully usable in landscape (chord cards reflow, no clipped content).
- **U8 — Audio**: play buttons work on first tap (gesture-unlocked AudioContext —
  already true); context resumes after app background/foreground cycle.
- **U9 — Data safety**: song/prefs survive app updates; export/import guards against
  WebView data-clears (F12).
- **U10 — Accessibility**: TalkBack announces chord detection results (aria-live already
  present), all buttons labeled, usable at 1.3× system font scale.

---

## 5. Epics & Stories

Story ID format: `E<epic>-S<story>`. Each story lists **Files** (ownership), **Deps**
(hard dependencies — empty means it can start immediately), **AC** (acceptance
criteria), and **Verify** (the command/checklist that proves it).

---

### EPIC E1 — PWA Foundation & Asset Self-Containment
*Goal: the web app becomes installable and 100% self-contained (no CDN).*

**E1-S1 — Web manifest + icons.**
Files: `manifest.webmanifest`, `assets/icons/*`, `@region:head-pwa`.
Deps: S0.
AC: manifest with `name: "Melodía"`, `short_name: "Melodía"`, `display: standalone`,
`background_color`/`theme_color: #0B1622`, maskable + any icons (192/512); `<link rel="manifest">`
and `<meta name="theme-color">` in head region. Icon artwork = waveform logo on navy
(extract the existing inline SVG logo; do not redesign).
Verify: Lighthouse PWA installability pass (`npx lighthouse --only-categories=pwa`), or
Chromium DevTools → Application → Manifest shows no errors.

**E1-S2 — Self-hosted fonts.**
Files: `assets/fonts/*` (woff2 + OFL licenses), `@region:head-pwa`.
Deps: S0.
AC: Poppins (300–600) and Nunito (300–700) served via `@font-face` from `assets/fonts/`;
Google Fonts `<link>` removed; `font-display: swap`; page renders identically offline.
Verify: `node --test` green; serve locally, block network in DevTools, reload —
computed `font-family` of `.logo-text` resolves to Poppins (not fallback).

**E1-S3 — Service worker (web/PWA path only).**
Files: `sw.js`, `@region:head-pwa`.
Deps: E1-S1, E1-S2.
AC: cache-first app shell (`index.html`, fonts, icons, manifest, `native.js`);
versioned cache name; activation cleans old caches; registration is **skipped when
`window.Capacitor` exists** (the APK serves local files — SW adds only risk there).
Verify: Playwright: load page, go offline (`context.setOffline(true)`), reload, app renders
and builds a progression.

---

### EPIC E2 — Android UX Hardening (all changes benefit mobile web too)
*Goal: the app behaves like a first-class touch app.*

**E2-S1 — Touch targets ≥ 48dp.**
Files: `@region:css-android`.
Deps: S0.
AC: in the ≤860px media context, all interactive elements (`.kp`, `.seg`, `.chip`,
`.ibtn`, `.tab`, `.cc-play`, `.song-card-actions button`, fretboard hit-rects) have an
effective hit area ≥ 44×44 CSS px (≈48dp) — via padding or pseudo-element hit
expansion, without changing the frozen visual design (I5).
Verify: committed Playwright script asserts `getBoundingClientRect()` ≥ 44px (or
documented hit-area override) for each selector at 390×844.

**E2-S2 — Viewport, safe areas, scroll-paint fixes.**
Files: `@region:css-android`, `viewport` meta (head — coordinate with E1 via marker comment).
Deps: S0.
AC: `viewport-fit=cover` added to the viewport meta; `env(safe-area-inset-*)` padding
on header, aside/drawer, main, and `.perf-overlay`; app root uses `100dvh` universally
(replaces the `100vh` desktop rule); `background-attachment:fixed` replaced with an
equivalent that doesn't repaint-jank on WebView (e.g., fixed-position pseudo-element
layer painting the same gradients).
Verify: Playwright screenshot diff at 390×844 and 844×390 shows gradient + layout intact;
no horizontal scroll at either orientation.

**E2-S3 — App Facade implementation.**
Files: `@region:app-facade` + minimal internal wiring (event emission from
`startPerformance`/`exitPerformance`/`toggleExpFret` — one line each at the existing
function bodies, documented as facade taps).
Deps: S0.
AC: `window.MelodiaApp` implements the exact contract in §3.2; facade functions
delegate to existing internals (no logic duplication); works with `native.js` absent.
Verify: Playwright: evaluate each facade method in-page and assert behavior (open
drawer → `isDrawerOpen()===true` → `closeDrawer()` → `false`; etc.). `node --test` green.

**E2-S4 — Replace `confirm()` with an in-app modal.**
Files: `@region:css-android` (styles), `@region:app-facade` (small `MelodiaApp.confirm(msg)`
promise helper + one call-site change in `clearSong`).
Deps: S0.
AC: "Clear the whole song?" renders as a Glass-styled modal (backdrop blur, accent
buttons, Escape/back-dismissable, focus-trapped); resolves like `confirm`.
Verify: Playwright: click Clear song → modal visible → Cancel keeps sections → Confirm clears.

**E2-S5 — Song export/import (data safety, F12/U9).**
Files: `@region:app-facade` (logic), Song tab sidebar (one `@region`-marked block —
coordinate placement with S0 markers).
Deps: S0.
AC: "Export song" downloads/shares `melodia-song.json` (schema: `{version:1, prefs, song}`);
"Import song" file-picks + validates (reject malformed with in-app message, never crash);
round-trip is lossless.
Verify: new `node --test` cases for validate/serialize logic + Playwright round-trip test.

---

### EPIC E3 — Native Bridge
*Goal: native niceties with graceful web degradation.*

**E3-S1 — `native.js` scaffold + status-bar/splash wiring.**
Files: `native.js`, `@region:native-script`.
Deps: S0 (interface work); E4-S1 (plugin runtime to test against).
AC: implements §3.3 contract; on web every method no-ops (feature-detect
`window.Capacitor`); on device: StatusBar background `#0B1622` + light icons,
splash screen hidden only after first render (no white flash), nav bar themed.
Verify: web — Playwright confirms no console errors and `MelodiaNative.isNative()===false`;
device — E5-S4 checklist items 1–3.

**E3-S2 — Back-button pop-stack (U1).**
Files: `native.js`.
Deps: E2-S3 (facade), E4-S1.
AC: Capacitor `App.addListener('backButton', …)` implements exactly the U1 stack
order; final state minimizes (never exits) the app.
Verify: device checklist (E5-S4 items 4–9): scripted adb back-press sequence from each state.

**E3-S3 — Keep-awake + haptics (U2).**
Files: `native.js`.
Deps: E2-S3, E4-S1.
AC: `onPerfChange` → KeepAwake acquire/release (also released on `pause` app event);
`onFretToggle` → light haptic tick.
Verify: device checklist (E5-S4 items 10–12) — screen stays on >2 min in perf mode,
lock releases after exit.

---

### EPIC E4 — Android Shell & Build Pipeline
*Goal: reproducible APK/AAB from a clean checkout.*

**E4-S1 — Capacitor scaffold + build script.**
Files: `package.json`, `capacitor.config.json`, `scripts/build-www.mjs`, `android/`, `.gitignore` (add `www/`, `node_modules/`).
Deps: S0 (can start immediately; consumes whatever `index.html` exists — later merges just re-run the copy).
AC: `npm run build:www` assembles `www/` (index.html, native.js, manifest, sw.js,
assets/) with a fail-loud check that every referenced asset exists; `npx cap sync android`
succeeds; `cd android && ./gradlew assembleDebug` produces an installable APK;
config: appId `com.italomouzinho.melodia`, appName `Melodía`, `minSdkVersion 26`,
`androidScheme: 'https'`; plugins: `@capacitor/app`, `@capacitor/status-bar`,
`@capacitor/splash-screen`, `@capacitor/haptics`, `@capacitor-community/keep-awake`.
Verify: `npm run build:www && npx cap sync android && cd android && ./gradlew assembleDebug`
exits 0; `adb install` + launch renders the app.

**E4-S2 — Release signing + versioning.**
Files: `android/` (signing config reading env vars — keystore NEVER committed), `docs section in README`.
Deps: E4-S1.
AC: `./gradlew bundleRelease` produces a signed AAB when `MELODIA_KEYSTORE_*` env vars
are set; version name/code derived from `package.json` version; documented release steps.
Verify: release build with a throwaway keystore installs and runs.

---

### EPIC E5 — Test Infrastructure & QA
*Goal: everything above is provable, and the regression pack (I3) is automated.*

**E5-S1 — Committed Playwright e2e suite.**
Files: `test/e2e/*`, `package.json` script `test:e2e`.
Deps: S0 (baseline app); grows as other epics land.
AC: suite runs headless against a local server of `www/` (or root pre-E4); covers:
tab navigation, progression build, explore chord detection, song builder + performance
mode, transpose (including regression pack I3 items 1–6), keyboard nav (I3-8),
sidebar persistence (I3-7); viewports 1280×800 and 390×844.
Verify: `npm run test:e2e` green; intentionally breaking a regression item locally makes it fail.

**E5-S2 — Unit-test extensions.**
Files: `test/app.test.js` (append-only).
Deps: none.
AC: adds tests for `keyPrefersSharp`/`scaleNote` spelling table, back-facade state
transitions (pure parts), export/import schema validation (E2-S5 logic).
Verify: `node --test` green, count > 12.

**E5-S3 — Font-scale & orientation audit (F13, U7).**
Files: `test/e2e/scale.spec.*`.
Deps: E2-S2.
AC: Playwright with page zoom / font-size override at 1.3×: no clipped controls, no
horizontal scroll, performance overlay usable at 844×390.
Verify: `npm run test:e2e` includes and passes these specs.

**E5-S4 — Device verification checklist (manual/adb, the native gate).**
Files: `test/DEVICE_CHECKLIST.md`.
Deps: E3-*, E4-S1.
AC: numbered checklist covering: (1) splash no-flash, (2) status/nav bar color,
(3) safe-area on a notched device profile, (4–9) back-stack per U1 from every state,
(10) keep-awake in perf mode, (11) lock released on exit, (12) haptic on fret toggle,
(13) airplane-mode cold start → full functionality incl. audio, (14) TalkBack pass on
Explore, (15) process-death restore (prefs/song intact), (16) app-update data survival.
Verify: checklist executed on emulator (API 26 + latest) and ≥1 physical device; results
recorded in the file.

---

### EPIC E6 — Release & Distribution
*Goal: shippable artifact + docs. (Sequential, after integration.)*

**E6-S1 — Adaptive icon, splash assets, store listing draft.**
Files: `assets/icons/` (adaptive fg/bg layers), `android/` resources, `docs/store/`.
Deps: E4-S1.
AC: adaptive icon (waveform foreground, navy background) renders correctly on round/
square masks; splash matches U4; store listing text + screenshots (phone, 7" tablet) drafted.
Verify: icon preview on emulator launcher; screenshots generated from e2e runs.

**E6-S2 — CI pipeline.**
Files: `.github/workflows/ci.yml`.
Deps: E4-S1, E5-S1.
AC: on PR/push to main: `node --test` + `npm run test:e2e` + debug APK build, APK
uploaded as workflow artifact.
Verify: green run on the repo.

**E6-S3 — README + release docs update.**
Files: `README.md`.
Deps: everything merged.
AC: README documents web + Android paths, build commands, release process; roadmap updated.
Verify: a fresh agent can produce an APK following only the README.

---

## 6. Sprint 0 (sequential prerequisite — one agent, one commit)

**S0 — Marker regions, facade stubs, freeze tag.**
Files: `index.html` (markers only), `.gitignore`, git tag.
AC: all four marker regions from §3.1 inserted (empty); git tag `android-baseline` on
the S0 commit; `node --test` green; page renders unchanged (Playwright screenshot diff
vs `bf03c9a` is pixel-identical at both viewports).
Verify: diff shows only comments/markers added.

---

## 7. Parallel Execution Plan

```
Sprint 0 (sequential):  S0 ──────────────────────────────────────────┐
                                                                     ▼
Sprint 1 (parallel, isolated worktrees):
  Agent A: E1-S1 → E1-S2 → E1-S3          (owns manifest/sw/fonts/head region)
  Agent B: E2-S1 → E2-S2 → E2-S3 → E2-S4 → E2-S5   (owns css/facade regions)
  Agent C: E4-S1 → E4-S2                   (owns package.json/android/scripts)
  Agent D: E5-S1 → E5-S2                   (owns test/)
  Agent E: E3-S1 (web-degradation half + full native.js written against contracts)

Merge order at end of Sprint 1:  B → A → E → C → D
  (facade first since E depends on it at runtime; C last-but-one so build:www
   picks up final assets; D last so the suite runs against the merged app)

Sprint 2 (integration, max 2 agents):
  E3-S2, E3-S3 (wire native to merged facade)  ∥  E5-S3
  then: E5-S4 device gate (sequential, blocking)

Sprint 3 (sequential): E6-S1 → E6-S2 → E6-S3 → release candidate
```

**Conflict rules for parallel agents:**
1. Never edit outside your owned files/markers (§3).
2. Never reformat, re-indent, or "clean up" code you don't own.
3. Rebase onto the integration branch before merging; if your marker region moved,
   re-locate by marker name, not line number.
4. Every commit message states its story ID.
5. If a contract (§3.2/§3.3) is insufficient, STOP and escalate a spec revision —
   do not unilaterally extend it.

---

## 8. Definition of Done (release gate)

A build ships only when ALL of the following hold:

1. `node --test` green (I2), test count ≥ baseline 12 + E5-S2 additions.
2. `npm run test:e2e` green at both viewports, including the full I3 regression pack.
3. `npm run build:www && npx cap sync android && ./gradlew assembleDebug` from a clean
   clone exits 0.
4. `test/DEVICE_CHECKLIST.md` fully checked on API 26 emulator + latest emulator + one
   physical device, no unresolved failures.
5. Airplane-mode cold start delivers the complete experience (U6).
6. Web deployment (Vercel) still works and is visually unchanged (I4/I5) — screenshot
   diff vs `android-baseline` tag shows only intended additive changes.
7. Human reviewer sign-off on the U1 back-stack feel and U4 splash.

---

## 9. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| WebView fragmentation (`backdrop-filter`, `dvh` on old devices) | Med | minSdk 26 + device gate on API 26 emulator; graceful fallback: solid `rgba` backgrounds where blur unsupported |
| Parallel agents drift on `index.html` | Med | §3.1 markers + §7 conflict rules + merge order; S0 tag as rebase anchor |
| Chord-data drift during build | Low | I1 parity test runs in CI on every PR (E6-S2) |
| `localStorage` eviction in WebView | Low | E2-S5 export/import; document backup in README |
| Web Audio latency/stutter on low-end devices | Low | Oscillator synth is trivial; verify on physical device in E5-S4 item 13 |
| Keystore loss | Low | E4-S2 stores keystore outside repo; document recovery = new signing = new app listing |
| Font licensing | None | Poppins & Nunito are SIL OFL — bundle license files in `assets/fonts/` |

---

## 10. Out of Scope (explicitly)

- iOS build (Capacitor makes it cheap later; not this effort).
- Any feature work (metronome, scale overlay, MIDI) — separate backlog.
- Play Store publication mechanics beyond producing a signed AAB + listing draft.
- Multi-user/cloud sync.

---

*End of specification. Agents: start at §6 (S0), then claim a Sprint-1 lane from §7.*
