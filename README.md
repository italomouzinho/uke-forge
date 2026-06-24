# Melodía — Baritone Ukulele Chord Builder

Interactive tool for baritone ukulele players. Build chord progressions, visualize fretboard diagrams, learn fingering patterns, and transpose songs to your voice.

## Features

- **Chord Builder** — Pick key + mode (minor/major/blues) → select preset progression or custom Roman numerals → see fretboard diagrams + scale tones
- **Explore Lab** — Click an interactive fretboard to build any voicing and detect the chord name; jump straight to a harmonisation preset
- **Fingering Patterns** — 8 patterns (Travis pick, arpeggio, drone, pinch, waltz, delta strum, island calypso, reggae skank) with beat-by-beat PIMA grids
- **Song Transposer** — Paste chords + lyrics → shift by semitone → auto-fit to bass/baritone/tenor voice + capo suggestions
- **Song Builder** — Assemble sections into a setlist; performance mode for live play
- **Glass Design** — Dark navy glassmorphism; Poppins + Nunito; orange + teal palette
- **Zero dependencies** — Pure HTML + CSS + vanilla JS

## Quick Start

### Online

Open `index.html` directly in your browser — works offline, or visit the live deployment.

### Local Dev Server

```bash
# Python 3
python3 -m http.server 8000

# Node
npx http-server

# Then visit http://localhost:8000
```

## How to Use

### Chords Tab
1. **Root key** — Select A–B (12 keys)
2. **Mode** — Minor, Major, or Blues
3. **Progression** — Pick a preset (e.g., "i — VI — III — VII") or paste custom Roman numerals
   - Minor: `i iv V7 i`
   - Major: `I IV V I`
   - Blues: `I7 I7 I7 I7 IV7 IV7 I7 I7 V7 IV7 I7 V7`
4. **Output** — Fretboard diagrams for each chord + scale tone strip

### Explore Tab
Click anywhere on the interactive fretboard to build a voicing. The sidebar detects the chord and suggests progressions you can send directly to the Chords tab.

### Patterns Tab
Fingering techniques with beat-by-beat PIMA (thumb/index/middle/ring) layouts:
- **Travis pick** — Percussive, dark blues (thumb every beat)
- **Arpeggio** — Sustain, slow ballads (diagonal sweep)
- **Bass drone** — Minimal, hypnotic (thumb lock + touches)
- **Pinch pulse** — Turnaround, percussive accent
- **Waltz** — 3/4 time folk
- **Delta strum** — Traditional down-up strumming
- **Island strum** — Calypso D · DU · UDDU pattern
- **Reggae skank** — Muted upstroke offbeat

### Transpose Tab
1. **Paste** chord chart (ChordPro format `[Am]` or inline chords)
2. **Shift** — Use ± buttons (semitone steps) or auto-fit to voice
3. **Capo** — 0–7 frets; output keeps the sounding pitch but shows the shapes to finger with the capo on
4. **Output** — Transposed chart with chords highlighted

**Get a chart via AI** — Type "Song Title Artist" → **Copy prompt** puts a ready-made chord-chart request on your clipboard. Paste it into Claude (or any AI chat), then paste the reply into the input box and transpose.

## Customization

### Add or Change a Chord
All chord shapes live in [`CHORDS.md`](./CHORDS.md) — the canonical reference, with both the common EBGD (high-to-low string) notation and the app's DGBE (low-to-high) array format.

```javascript
const CHORDS={
  'Cmaj7':[2,4,1,3],  // [D, G, B, E] frets (null = muted)
  // ...
};
```

To add a new chord: add a row to `CHORDS.md` with its EBGD notation, convert it (DGBE is EBGD reversed), then add the `[D,G,B,E]` array to `CHORDS` under the chord's name (both sharp and flat spellings if relevant, e.g. `'C#m7'` and `'Dbm7'`).

### Add a Progression Preset
Edit `PRESETS[mode]` (e.g., `PRESETS.minor`):
```javascript
PRESETS.minor = [
  {l:'My progression', d:['i','VII','VI','III']},
  // ...
];
```

### Add a Fingering Pattern
Edit `PATDATA`:
```javascript
{
  id:'mypattern',
  title:'My Pattern',
  desc:'Description here',
  strings:['D  (P)','G  (I)','B  (M)','E  (A)'],
  beats:['1','2','3','4'],
  grid:[
    ['P','','P',''],  // D string
    ['','I','',''],   // G string
    ['','','M',''],   // B string
    ['','','','A'],   // E string
  ]
}
```

## File Structure

```
melodia/
├── index.html        # Self-contained app (all HTML/CSS/JS)
├── CHORDS.md         # Canonical chord shape library (source of truth for diagrams)
├── test/
│   └── app.test.js   # Zero-dependency tests (node --test)
├── README.md         # This file
├── LICENSE           # MIT
└── .gitignore
```

## Tests

No dependencies, no build — just Node's built-in test runner:

```bash
node --test
```

The suite extracts the inline `<script>` from `index.html`, runs it in a sandbox, and verifies chord-table validity, sharp/flat alias consistency, agreement with `CHORDS.md`, lookup fallbacks, and transposition math.

## Tech Stack

- **No build tools** — Pure vanilla JS, CSS Grid, SVG fretboard diagrams
- **No database** — Client-side only; `localStorage` keys `melodia.prefs` and `melodia.song`
- **Fonts** — Poppins + Nunito (Google Fonts CDN)
- **Design** — Dark navy glassmorphism, orange (#EF8434) + teal (#33C2CE) palette

## Deployment

Hosted on Vercel with GitHub auto-deploy from `main`. Also works on Netlify, GitHub Pages, or any static host.

## Roadmap

- [x] localStorage — Remember key, mode, voice & capo across visits
- [x] Explore lab — Interactive fretboard chord detection
- [x] Song builder — Sections + performance mode
- [x] Island strum + Reggae skank patterns
- [ ] MIDI export — Send patterns to DAW
- [ ] PNG export — Save fretboard diagrams
- [ ] Tuning selector — Switch between DGBE, standard concert, sopranino
- [ ] Tab export — ASCII tab notation for patterns

## License

MIT — Use freely, modify, redistribute.

---

**Tuning:** D · G · B · E (baritone, steel strings)  
**Built for:** Blues, folk, fingerstyle players on baritone uke
