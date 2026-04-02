# UkeForge — Baritone Ukulele Chord Builder
![UkeForge Hero Image Placeholder](https://via.placeholder.com/1000x350/1a1710/e8b860?text=UkeForge+Baritone+DGBE)

Interactive tool specifically tailored for baritone ukulele players. Build chord progressions, visualize fretboard diagrams, learn linear fingering patterns, and transpose songs to your voice.

🔗 **[Live Demo: Play UkeForge Here](https://italomouzinho.github.io/uke-forge)**

---

## 🎼 The Baritone Methodology (Linear Tetrachordal Logic)
Unlike soprano or tenor ukuleles which commonly utilize re-entrant (High G) tuning, the baritone operates strictly on **Linear G-Tuning (D3, G3, B3, E4)**. 

Because the baritone lacks the 5th and 6th strings of a standard guitar, translating dense Western chromatic harmony onto a rigid four-string matrix requires advanced algorithmic compression. Our chord library utilizes "linear tetrachordal logic," which programmatically discards acoustically redundant intervals (like perfect fifths) or sacrifices root notes in advanced voicings to preserve harmonic weight and guide tones.

## ✨ Features

* **Chord Builder** — Pick a root key + mode (minor/major/blues) → select a preset progression or build custom Roman numerals → see mathematically correct fretboard diagrams + scale tones.
* **Linear Fingering Patterns** — High-fidelity SVG visualizer mapping PIMA (Thumb/Index/Middle/Ring) patterns onto a horizontal string timeline. Learn techniques like the Travis pick, arpeggio sweeps, and pinch pulses.
* **Song Transposer** — Paste chords + lyrics → shift by semitone → auto-fit to bass/baritone/tenor vocal ranges.
* **Zero dependencies** — Pure HTML + CSS + Vanilla JS. Entirely client-side and lightning fast.

## 🚀 Quick Start

**Online**
Simply open `index.html` directly in your browser — it works entirely offline.

**Local Dev Server**
```bash
# Python 3
python3 -m http.server 8000
# Node
npx http-server
# Then visit http://localhost:8000

📖 How to Use
Chords Tab

Root key — Select A–B (12 keys).

Mode — Minor, Major, or Blues.

Progression — Pick a preset or paste custom Roman numerals (e.g., i iv V7 i).

Output — Fretboard diagrams for each chord + highlighted scale tone strip.

Patterns Tab

Fingering techniques with beat-by-beat PIMA layouts mapping perfectly to the DGBE layout:

Travis pick — Percussive, dark blues (thumb alternates every beat).

Arpeggio — Sustain, slow ballads (diagonal sweep).

Pinch pulse — Turnaround, percussive accent.

Transpose Tab

Paste — Drop a chord chart (ChordPro format [Am] or inline chords).

Shift — Use ± buttons (semitone steps) or let the engine auto-fit to your voice.

Song Lookup — (Note: Requires local proxy or injected Anthropic API key during development). Fetches directly from Claude to return KEY, CAPO, and full chart.

🎨 Customization
Add a Chord

Edit the VX object in the <script> tag.
Note: UkeForge uses a High-to-Low internal vector mapping (E-B-G-D) to match scientific acoustic mapping.

JavaScript
const VX = {
  // Array maps to [High E, B, G, Low D].
  // 0 = open string, null = muted, 1+ = fret number
  'Cmaj7': [2, 0, 0, 0], 
  'G':     [0, 0, 0, 3]  
};
Add a Progression Preset

Edit PRESETS[mode] (e.g., PRESETS.minor):

JavaScript
PRESETS.minor = [
  {l:'My progression', d:['i','VII','VI','III']},
];
📋 File Structure
Plaintext
uke-forge/
├── index.html       # Self-contained app (all HTML/CSS/JS)
├── README.md        # This file
└── .gitignore
🎯 Tech Stack
No build tools — Pure vanilla JS, CSS Grid, SVG fretboard diagrams.

No database — Client-side only.

Fonts — DM Serif Display + DM Mono.

📄 License
MIT — Use freely, modify, redistribute.
Tuning: D · G · B · E (baritone, steel strings)
