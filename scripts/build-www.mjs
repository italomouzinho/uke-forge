#!/usr/bin/env node
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const ROOT = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const WWW  = path.join(ROOT, 'www');

function cp(src, dest) {
  const full = path.join(ROOT, src);
  if (!fs.existsSync(full)) throw new Error(`Missing required asset: ${src}`);
  const out = path.join(WWW, dest || src);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.copyFileSync(full, out);
  console.log(`  copied ${src}`);
}

function cpDir(srcDir, destDir) {
  const full = path.join(ROOT, srcDir);
  if (!fs.existsSync(full)) {
    console.warn(`  warning: ${srcDir} does not exist yet — skipping`);
    return;
  }
  for (const entry of fs.readdirSync(full, { recursive: true, withFileTypes: true })) {
    if (entry.isFile()) {
      const rel = path.relative(full, path.join(entry.path || entry.parentPath || full, entry.name));
      cp(path.join(srcDir, rel), path.join(destDir || srcDir, rel));
    }
  }
}

// Clear www/
if (fs.existsSync(WWW)) fs.rmSync(WWW, { recursive: true });
fs.mkdirSync(WWW, { recursive: true });

console.log('Building www/...');

cp('index.html');
cp('manifest.webmanifest');

// native.js is optional (may not exist yet in early builds)
if (fs.existsSync(path.join(ROOT, 'native.js'))) cp('native.js');
else { fs.writeFileSync(path.join(WWW, 'native.js'), '// native.js placeholder\n'); console.log('  native.js: placeholder written'); }

// sw.js is optional
if (fs.existsSync(path.join(ROOT, 'sw.js'))) cp('sw.js');

cpDir('assets');

console.log('www/ assembled successfully.');
