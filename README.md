# UkeForge — Baritone Ukulele Chord Builder

Interactive tool for baritone ukulele players. Build chord progressions, visualize fretboard diagrams, learn fingering patterns, and transpose songs to your voice.

## ✨ Features

- **Chord Builder** — Pick key + mode (minor/major/blues) → select preset progression or custom Roman numerals → see fretboard diagrams + scale tones
- **Fingering Patterns** — 6 patterns (Travis pick, arpeggio, drone, pinch, waltz, delta strum) with beat-by-beat PIMA grids
- **Song Transposer** — Paste chords + lyrics → shift by semitone → auto-fit to bass/baritone/tenor voice + capo suggestions
- **Responsive UI** — Dark gold/teal theme, works on desktop & tablet
- **Zero dependencies** — Pure HTML + CSS + vanilla JS

## 🚀 Quick Start

### Online
Open `index.html` directly in your browser — works offline.

### Local Dev Server
```bash
# Python 3
python3 -m http.server 8000

# Node
npx http-server

# Then visit http://localhost:8000
```

## 📖 How to Use

### Chords Tab
1. **Root key** — Select A–B (12 keys)
2. **Mode** — Minor, Major, or Blues
3. **Progression** — Pick a preset (e.g., "i — VI — III — VII") or paste custom Roman numerals in the textarea
   - Minor: `i iv V7 i`
   - Major: `I IV V I`
   - Blues: `I7 I7 I7 I7 IV7 IV7 I7 I7 V7 IV7 I7 V7`
4. **Output** — Fretboard diagrams for each chord + scale tone strip

### Patterns Tab
Fingering techniques with beat-by-beat PIMA (thumb/index/middle/ring) layouts:
- **Travis pick** — Percussive, dark blues (thumb every beat)
- **Arpeggio** — Sustain, slow ballads (diagonal sweep)
- **Bass drone** — Minimal, hypnotic (thumb lock + touches)
- **Pinch pulse** — Turnaround, percussive accent
- **Waltz** — 3/4 time folk
- **Delta strum** — Traditional down-up strumming

### Transpose Tab
1. **Paste** chord chart (ChordPro format `[Am]` or inline chords)
2. **Shift** — Use ± buttons (semitone steps) or auto-fit to voice
3. **Capo** — Adjust 0–7 frets
4. **Output** — Transposed chart with chords highlighted

**Song Lookup** — Type "Song Title Artist" → fetches from Anthropic Claude (requires internet). Returns KEY, CAPO, and full chart.

## 🎨 Customization

### Add a Chord
Edit the `VX` object in `<script>`:
```javascript
const VX={
  'Cmaj7':[null,0,0,0],  // [D, G, B, E] frets (null = muted)
  // ... existing chords
};
```

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

## 📋 File Structure

```
uke-forge/
├── index.html       # Self-contained app (all HTML/CSS/JS)
├── README.md        # This file
└── .gitignore
```

## 🎯 Tech Stack

- **No build tools** — Pure vanilla JS, CSS Grid, SVG fretboard diagrams
- **No database** — Client-side only; optional localStorage for user preferences
- **APIs** — Optional Anthropic Claude for song lookup
- **Fonts** — DM Serif Display + DM Mono (Google Fonts CDN)

## 🌐 Deployment

### GitHub Pages
1. Settings → **Pages**
2. Source: **Deploy from a branch** → `main`
3. Live at `https://italomouzinho.github.io/uke-forge`

### Other Hosts
Works anywhere static files are served (Netlify, Vercel, Surge, etc.).

## 🔮 Roadmap

- [ ] **localStorage** — Save favorite progressions & transpositions
- [ ] **MIDI export** — Send patterns to DAW
- [ ] **PNG export** — Save fretboard diagrams
- [ ] **Tuning selector** — Switch between DGBE, standard concert, sopranino
- [ ] **Chord library** — Extended voicings (slash chords, add9, etc.)
- [ ] **Tab export** — ASCII tab notation for patterns
- [ ] **Dark/light toggle** — Alternate themes
- [ ] **Mobile gesture support** — Swipe between tabs

## 📞 Support

Questions or ideas? Open an **Issue** or **Discussion**.

## 📄 License

MIT — Use freely, modify, redistribute.

---

**Tuning:** D · G · B · E (baritone, steel strings)  
**Built for:** Blues, folk, fingerstyle players on baritone uke
