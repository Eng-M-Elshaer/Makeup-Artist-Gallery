// Convert all images under docs/gallery/<category> to JPG next to originals
// Requires: npm install sharp

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const ROOT = process.cwd();
const GALLERY_ROOT = path.join(ROOT, 'docs', 'gallery');
const INPUT_EXT = new Set(['.heic', '.jpeg', '.jpg', '.png', '.webp', '.gif', '.svg']);

async function convertFile(absPath) {
  const dir = path.dirname(absPath);
  const base = path.basename(absPath, path.extname(absPath));
  const target = path.join(dir, `${base}.jpg`);
  if (fs.existsSync(target)) return { skipped: true };
  try {
    // Convert to JPEG with good quality; for GIF/SVG only first frame/vector rasterized
    await sharp(absPath).jpeg({ quality: 85 }).toFile(target);
    return { converted: true, target };
  } catch (e) {
    console.warn(`Failed to convert ${absPath}: ${e.message}`);
    return { failed: true };
  }
}

async function convertCategory(catDir) {
  const entries = fs.readdirSync(catDir, { withFileTypes: true });
  const files = entries.filter((e) => e.isFile());
  let stats = { converted: 0, skipped: 0, failed: 0 };
  for (const f of files) {
    const ext = path.extname(f.name).toLowerCase();
    if (!INPUT_EXT.has(ext)) continue;
    const abs = path.join(catDir, f.name);
    const res = await convertFile(abs);
    if (res.converted) stats.converted++;
    else if (res.skipped) stats.skipped++;
    else if (res.failed) stats.failed++;
  }
  return stats;
}

async function main() {
  if (!fs.existsSync(GALLERY_ROOT)) {
    throw new Error(`Gallery root not found: ${GALLERY_ROOT}`);
  }
  const cats = fs.readdirSync(GALLERY_ROOT, { withFileTypes: true }).filter((d) => d.isDirectory()).map((d) => d.name);
  let total = { converted: 0, skipped: 0, failed: 0 };
  for (const c of cats) {
    const dir = path.join(GALLERY_ROOT, c);
    const stats = await convertCategory(dir);
    total.converted += stats.converted;
    total.skipped += stats.skipped;
    total.failed += stats.failed;
    console.log(`Category ${c}: +${stats.converted} converted, ${stats.skipped} skipped, ${stats.failed} failed`);
  }
  console.log(`Done: ${total.converted} converted, ${total.skipped} skipped, ${total.failed} failed`);
}

main();