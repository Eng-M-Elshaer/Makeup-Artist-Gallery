// Helper script to clean up HEIC files after manual conversion
// This script deletes .HEIC files if corresponding .jpg exists
// For conversion, use Windows Photos app or online tools

const fs = require('fs');
const path = require('path');

const ROOT = process.cwd();
const GALLERY_ROOT = path.join(ROOT, 'docs', 'gallery');

function cleanupHeicFiles(dir) {
    const files = fs.readdirSync(dir, { withFileTypes: true });
    let deleted = 0;
    let needsConversion = [];
    
    for (const file of files) {
        const fullPath = path.join(dir, file.name);
        
        if (file.isDirectory()) {
            const result = cleanupHeicFiles(fullPath);
            deleted += result.deleted;
            needsConversion = needsConversion.concat(result.needsConversion);
        } else if (file.isFile() && path.extname(file.name).toLowerCase() === '.heic') {
            const jpgPath = fullPath.replace(/\.heic$/i, '.jpg');
            
            // If JPG exists, delete HEIC
            if (fs.existsSync(jpgPath)) {
                try {
                    fs.unlinkSync(fullPath);
                    console.log(`[✓] Deleted ${file.name} (JPG exists)`);
                    deleted++;
                } catch (error) {
                    console.error(`[✗] Failed to delete ${file.name}:`, error.message);
                }
            } else {
                needsConversion.push(fullPath);
            }
        }
    }
    
    return { deleted, needsConversion };
}

function main() {
    if (!fs.existsSync(GALLERY_ROOT)) {
        console.error('Gallery root not found:', GALLERY_ROOT);
        process.exit(1);
    }
    
    console.log('Cleaning up HEIC files...\n');
    
    const result = cleanupHeicFiles(GALLERY_ROOT);
    
    console.log(`\n✓ Deleted ${result.deleted} HEIC file(s)`);
    
    if (result.needsConversion.length > 0) {
        console.log(`\n⚠ ${result.needsConversion.length} HEIC file(s) need conversion:`);
        console.log('\nTo convert HEIC to JPG:');
        console.log('1. Windows: Open in Photos app → Export/Save as JPG');
        console.log('2. Online: https://cloudconvert.com/heic-to-jpg');
        console.log('3. Mac: Open in Preview → Export as JPG');
        console.log('\nFiles that need conversion:');
        result.needsConversion.forEach(file => {
            console.log(`  - ${path.relative(GALLERY_ROOT, file)}`);
        });
        console.log('\nAfter converting, run this script again to delete HEIC files.');
    } else {
        console.log('\n✓ All HEIC files cleaned up!');
    }
}

main();
