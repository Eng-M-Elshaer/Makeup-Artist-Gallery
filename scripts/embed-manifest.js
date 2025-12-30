// Embeds gallery-manifest.json directly into index.html to avoid CORS issues
const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const MANIFEST_PATH = path.join(ROOT, 'docs', 'gallery-manifest.json');
const HTML_PATH = path.join(ROOT, 'docs', 'index.html');

function embedManifest() {
    if (!fs.existsSync(MANIFEST_PATH)) {
        console.error('gallery-manifest.json not found. Run gen:manifest first.');
        process.exit(1);
    }

    const manifest = JSON.parse(fs.readFileSync(MANIFEST_PATH, 'utf8'));
    let html = fs.readFileSync(HTML_PATH, 'utf8');

    // Remove old embedded manifest if exists
    html = html.replace(/<script id="gallery-manifest"[^>]*>[\s\S]*?<\/script>/g, '');

    // Add embedded manifest before app.js
    const manifestScript = `<script id="gallery-manifest">window.GALLERY_MANIFEST = ${JSON.stringify(manifest).replace(/</g, '\\u003c')};</script>`;
    html = html.replace(/<script src="app\.js"><\/script>/, `${manifestScript}\n    <script src="app.js"></script>`);

    fs.writeFileSync(HTML_PATH, html);
    console.log('Manifest embedded in index.html');
}

embedManifest();

