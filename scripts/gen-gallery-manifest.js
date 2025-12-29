// Generates docs/gallery-manifest.json listing all images under docs/gallery/<category>/
// Run in GitHub Actions or locally to avoid manual naming.

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const GALLERY_ROOT = path.join(ROOT, 'docs', 'gallery');
const OUTPUT = path.join(ROOT, 'docs', 'gallery-manifest.json');
const ALLOWED_EXT = new Set(['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.heic']);
const EXT_PRIORITY = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.svg', '.heic'];

function listImagesIn(dir) {
  if (!fs.existsSync(dir)) return [];
  return fs
    .readdirSync(dir, { withFileTypes: true })
    .filter((d) => d.isFile() && ALLOWED_EXT.has(path.extname(d.name).toLowerCase()))
    .map((d) => d.name)
    .sort();
}

function preferOnePerBase(files) {
  const map = new Map(); // base -> best filename
  for (const f of files) {
    const ext = path.extname(f).toLowerCase();
    const base = path.basename(f, ext);
    const current = map.get(base);
    if (!current) { map.set(base, f); continue; }
    const curExt = path.extname(current).toLowerCase();
    if (EXT_PRIORITY.indexOf(ext) < 0 || EXT_PRIORITY.indexOf(curExt) < 0) continue;
    if (EXT_PRIORITY.indexOf(ext) <= EXT_PRIORITY.indexOf(curExt)) {
      map.set(base, f);
    }
  }
  return Array.from(map.values());
}

function buildManifest() {
  const categories = fs
    .readdirSync(GALLERY_ROOT, { withFileTypes: true })
    .filter((d) => d.isDirectory())
    .map((d) => d.name);

  const manifest = {};
  for (const cat of categories) {
    const absCat = path.join(GALLERY_ROOT, cat);
    const files = listImagesIn(absCat);
    const preferred = preferOnePerBase(files);
    manifest[cat] = preferred.map((f) => `gallery/${cat}/${f}`);
  }

  return manifest;
}

function main() {
  if (!fs.existsSync(GALLERY_ROOT)) {
    throw new Error(`Gallery root not found: ${GALLERY_ROOT}`);
  }
  const manifest = buildManifest();
  fs.writeFileSync(OUTPUT, JSON.stringify(manifest, null, 2));
  console.log(`Gallery manifest written to: ${OUTPUT}`);
}

main();