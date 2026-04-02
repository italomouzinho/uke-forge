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
