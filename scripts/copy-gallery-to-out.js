// Copies docs/gallery to out/gallery after Next.js build
// This ensures images are available in the static export

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const SOURCE = path.join(ROOT, 'docs', 'gallery');
const DEST = path.join(ROOT, 'out', 'gallery');

function copyDir(src, dest) {
  if (!fs.existsSync(src)) {
    console.log(`[copy] Source not found: ${src}`);
    return;
  }

  if (!fs.existsSync(dest)) {
    fs.mkdirSync(dest, { recursive: true });
  }

  const entries = fs.readdirSync(src, { withFileTypes: true });

  for (const entry of entries) {
    const srcPath = path.join(src, entry.name);
    const destPath = path.join(dest, entry.name);

    if (entry.isDirectory()) {
      copyDir(srcPath, destPath);
    } else {
      fs.copyFileSync(srcPath, destPath);
      console.log(`[copy] ${entry.name}`);
    }
  }
}

function main() {
  if (!fs.existsSync(path.join(ROOT, 'out'))) {
    console.log('[copy] out/ directory not found. Run "npm run build" first.');
    return;
  }

  console.log('[copy] Copying docs/gallery to out/gallery...');
  copyDir(SOURCE, DEST);
  console.log('[copy] Done!');
}

main();

