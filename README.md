UkeForge — Baritone Ukulele Atelier
An interactive tool specifically tailored for baritone ukulele players. Build chord progressions, visualise fretboard diagrams, experiment with unknown shapes, learn linear fingering patterns, and transpose songs to your voice.
🔗 Live Demo: Play UkeForge Here
🎼 The Baritone Methodology (Linear Tetrachordal Logic)
Unlike soprano or tenor ukuleles which commonly utilise re-entrant (High G) tuning, the baritone operates strictly on Linear G-Tuning (D3, G3, B3, E4).
Because the baritone lacks the 5th and 6th strings of a standard guitar, translating dense Western chromatic harmony onto a rigid four-string matrix requires advanced algorithmic compression. Our chord library utilises "linear tetrachordal logic," which programmatically discards acoustically redundant intervals (like perfect fifths) or sacrifices root notes in advanced voicings to preserve harmonic weight and guide tones.
✨ Features & Tabs
Chord Builder: Pick a root key + mode (minor/major/blues) → select a preset progression or build custom Roman numerals → see mathematically correct fretboard diagrams + scale tones.
Experimentation Laboratory: Click directly on an interactive SVG fretboard to place your fingers. The real-time analyser instantly identifies the chord name, root, and quality, then suggests harmonisations to seamlessly send back to your Builder.
Linear Fingering Patterns: High-fidelity SVG visualiser mapping PIMA (Thumb/Index/Middle/Ring) patterns onto a horizontal string timeline. Learn techniques like the Travis pick, arpeggio sweeps, and pinch pulses.
Advanced Transposer: Paste chords + lyrics (or a direct URL from Ultimate Guitar/CifraClub) → shift by semitone → auto-fit to bass/baritone/tenor vocal ranges.
🚀 Quick Start
Online Simply open index.html directly in your browser — it works entirely offline with zero dependencies.
Local Dev Server
# Python 3
python3 -m http.server 8000

# Node
npx http-server

# Then visit http://localhost:8000

🎨 Customisation
Add a Chord
Edit the VX object in the <script> tag. Note: UkeForge uses a High-to-Low internal vector mapping (E-B-G-D) to match scientific acoustic mapping.
const VX = {
  // Array maps to [High E, B, G, Low D].
  // 0 = open string, null = muted, 1+ = fret number
  'Cmaj7': [[0, 0, 0, 2]], 
  'G':     [[3, 0, 0, 0]]  
};

Add a Progression Preset
Edit the PRESETS object for the desired mode (e.g., PRESETS.minor):
PRESETS.minor.push({
  l: 'My progression', 
  d: ['i', 'VII', 'VI', 'III']
});

📋 File Structure
uke-forge/
├── index.html       # Self-contained app (all HTML/CSS/JS)
├── README.md        # This file
└── .gitignore

🎯 Tech Stack
No build tools: Pure vanilla JS, CSS Grid, and native SVG fretboard diagrams.
No database: 100% client-side and lightning fast.
Fonts: DM Serif Display + DM Mono.
📄 License
MIT — Use freely, modify, redistribute. Tuning: D · G · B · E (baritone, steel strings)

