// Zero-dependency tests for the Melodía inline script.
// Run with: node --test
//
// The app is a single <script> block inside index.html. We extract it, run it
// in a vm sandbox with minimal DOM stubs (enough for init() to complete), and
// test the pure logic: chord tables, lookups, transposition, and consistency
// between index.html's CHORDS object and the canonical CHORDS.md.

'use strict';
const { test } = require('node:test');
const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const vm = require('node:vm');

const ROOT = path.join(__dirname, '..');
const html = fs.readFileSync(path.join(ROOT, 'index.html'), 'utf8');
const md = fs.readFileSync(path.join(ROOT, 'CHORDS.md'), 'utf8');

// ---- DOM stubs ----
function fakeEl() {
  const el = {
    children: [], style: {}, dataset: {},
    classList: { add() {}, remove() {}, toggle() {} },
    innerHTML: '', textContent: '', value: '',
    appendChild(c) { el.children.push(c); return c; },
    setAttribute() {}, removeAttribute() {},
    addEventListener() {}, scrollIntoView() {},
    insertRow() { return fakeRow(); },
    createTHead() { return { insertRow: () => fakeRow() }; },
  };
  return el;
}
function fakeRow() {
  const r = fakeEl();
  r.insertCell = () => fakeEl();
  return r;
}

function loadApp() {
  const m = html.match(/<script>([\s\S]*)<\/script>/);
  assert.ok(m, 'index.html must contain an inline <script> block');
  const store = new Map();
  const sandbox = {
    document: {
      getElementById: () => fakeEl(),
      createElement: () => fakeEl(),
      querySelectorAll: () => [],
      addEventListener: () => {},
    },
    localStorage: {
      getItem: k => (store.has(k) ? store.get(k) : null),
      setItem: (k, v) => store.set(k, String(v)),
      removeItem: k => store.delete(k),
    },
    navigator: {},
    console,
  };
  const code = m[1] + `
;globalThis.__exports = { CHORDS, NOTES, NOTESF, DEGMAP, PRESETS,
  getV, deg2chord, txChord, nIdx, nAt, f2s, dispNote, S };`;
  vm.runInNewContext(code, sandbox);
  return sandbox.__exports;
}

const app = loadApp();

// vm-realm objects have foreign prototypes; JSON-normalize before deep comparison.
const J = v => JSON.parse(JSON.stringify(v));

// ---- Chord table sanity ----
test('every CHORDS entry is a 4-string shape with valid fret values', () => {
  for (const [name, frets] of Object.entries(app.CHORDS)) {
    assert.ok(Array.isArray(frets) && frets.length === 4, `${name}: must be a 4-element array`);
    for (const f of frets) {
      assert.ok(f === null || (Number.isInteger(f) && f >= 0 && f <= 12),
        `${name}: fret value ${f} out of range`);
    }
    assert.ok(frets.some(f => f !== null), `${name}: at least one string must be played`);
  }
});

test('sharp and flat spellings of the same chord share the same shape', () => {
  const pairs = [['A#', 'Bb'], ['C#', 'Db'], ['D#', 'Eb'], ['F#', 'Gb'], ['G#', 'Ab']];
  for (const [sharp, flat] of pairs) {
    for (const name of Object.keys(app.CHORDS)) {
      if (name.startsWith(sharp)) {
        const alias = flat + name.slice(sharp.length);
        assert.deepEqual(J(app.CHORDS[name]), J(app.CHORDS[alias]),
          `${name} and ${alias} should be identical`);
      }
    }
  }
});

test('known-good spot checks (previously buggy voicings)', () => {
  assert.deepEqual(J(app.CHORDS['D']), [0, 2, 3, 2]);
  assert.deepEqual(J(app.CHORDS['Dm']), [0, 2, 3, 1]);
  assert.deepEqual(J(app.CHORDS['Bbm']), [3, 3, 2, 1]);
  assert.deepEqual(J(app.CHORDS['Cm']), [1, 0, 1, 3]);
  assert.deepEqual(J(app.CHORDS['G7']), [0, 0, 0, 1]);
});

// ---- CHORDS.md consistency ----
test('CHORDS.md app-array column matches the CHORDS object', () => {
  // Table rows look like: | Am | Minor | 0122 | 2210 | \[2, 2, 1, 0\] |
  const rowRe = /^\|\s*([A-G][#b]?[^|]*?)\s*\|(?:[^|]*\|){2,3}\s*\\\[([^\]]*)\\\]\s*\|$/gm;
  let rows = 0, m;
  while ((m = rowRe.exec(md)) !== null) {
    const name = m[1].trim();
    if (name === 'Chord') continue;
    if (!/^[A-G][#b]?/.test(name)) continue;
    const arr = m[2].split(',').map(s => {
      s = s.trim();
      return s === 'null' ? null : Number(s);
    });
    assert.ok(name in app.CHORDS, `CHORDS.md lists ${name} but it is missing from index.html`);
    assert.deepEqual(J(app.CHORDS[name]), arr, `${name}: index.html disagrees with CHORDS.md`);
    rows++;
  }
  assert.ok(rows > 130, `expected to parse most of CHORDS.md, only matched ${rows} rows`);
});

// ---- getV lookup & fallback chain ----
test('getV resolves every chord any preset progression can generate, in all 12 keys', () => {
  for (const key of app.NOTES) {
    for (const presets of Object.values(app.PRESETS)) {
      for (const preset of presets) {
        for (const deg of preset.d) {
          const { name } = app.deg2chord(deg, key);
          const v = app.getV(name);
          assert.ok(Array.isArray(v) && v.length === 4, `${key} ${deg} → ${name}: getV failed`);
          assert.ok(name in app.CHORDS, `${key} ${deg} → ${name}: should be a direct hit, not a fallback`);
        }
      }
    }
  }
});

test('getV falls back gracefully for unlisted qualities', () => {
  // Unknown minor-family suffix falls back to the plain minor shape
  assert.deepEqual(J(app.getV('Am13b9')), J(app.CHORDS['Am']));
  // Unknown other suffix falls back to the major shape
  assert.deepEqual(J(app.getV('Cmaj13')), J(app.CHORDS['C']));
  // Garbage input returns a playable default rather than crashing
  assert.deepEqual(J(app.getV('???')), [0, 0, 0, 0]);
});

// ---- Note math & transposition ----
test('note name utilities', () => {
  assert.equal(app.nIdx('C'), 0);
  assert.equal(app.nIdx('Bb'), app.nIdx('A#'));
  assert.equal(app.nAt(app.nIdx('A'), 3), 'C');
  assert.equal(app.f2s('Eb'), 'D#');
  assert.equal(app.f2s('E'), 'E');
});

test('txChord shifts the root and preserves the suffix', () => {
  assert.equal(app.txChord('Am', 2), 'Bm');
  assert.equal(app.txChord('G7', 5), 'C7');
  assert.equal(app.txChord('F#maj7', 1), 'Gmaj7');
  assert.equal(app.txChord('Am', 0), 'Am');   // zero shift = untouched
  assert.equal(app.txChord('Bb', 12), 'Bb');  // full octave normalizes spelling only
});

test('txChord always displays flat spellings for accidentals', () => {
  assert.equal(app.txChord('C#', 0), 'Db');
  assert.equal(app.txChord('G#m7', 0), 'Abm7');
  assert.equal(app.txChord('D#', 1), 'E');
});

test('dispNote always returns flat spellings', () => {
  assert.equal(app.dispNote('C#'), 'Db');
  assert.equal(app.dispNote('A#'), 'Bb');
  assert.equal(app.dispNote('Bb'), 'Bb');
  assert.equal(app.dispNote('C'), 'C');
});

test('a full chromatic cycle of txChord returns to the start', () => {
  let name = 'Em';
  for (let i = 0; i < 12; i++) name = app.txChord(name, 1);
  assert.equal(name, 'Em');
});

// ---- Degree → chord naming ----
test('deg2chord produces correct names for the harmonic-minor staples', () => {
  assert.deepEqual(J(app.deg2chord('i', 'E')), { name: 'Em', deg: 'i' });
  assert.deepEqual(J(app.deg2chord('V7', 'E')), { name: 'B7', deg: 'V7' });
  assert.deepEqual(J(app.deg2chord('VI', 'A')), { name: 'F', deg: 'VI' });
  assert.deepEqual(J(app.deg2chord('IV', 'C')), { name: 'F', deg: 'IV' });
});
