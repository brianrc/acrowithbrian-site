/**
 * Image Optimization Script
 * Generates AVIF versions and thumbnails for all site images.
 * Uses manifest for incremental processing - only processes new/changed files.
 * Run: pnpm run images
 */

import sharp from 'sharp';
import { readdir, readFile, writeFile, mkdir, unlink, stat } from 'fs/promises';
import { createHash } from 'crypto';
import { join, basename, extname, dirname, relative } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));
const ROOT = join(__dirname, '..');
const SOURCE_DIR = join(ROOT, 'static', 'imgs');
const OUTPUT_DIR = join(ROOT, 'static', 'imgs-optimized');
const MANIFEST_PATH = join(OUTPUT_DIR, '.manifest.json');

// Configuration per category
const CONFIG = {
    blog: {
        full: true,
        thumbnail: { width: 400, suffix: '-thumb' }
    },
    events: {
        full: true
    },
    pages: {
        full: true
    },
    'photo-gallery': {
        full: true,
        thumbnail: { width: 600, suffix: '-preview' }
    }
};

const SUPPORTED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif'];
const AVIF_QUALITY = 80;

/**
 * Calculate file hash for change detection
 */
async function getFileHash(filePath) {
    const content = await readFile(filePath);
    return createHash('md5').update(content).digest('hex');
}

/**
 * Load manifest or return empty object
 */
async function loadManifest() {
    try {
        const content = await readFile(MANIFEST_PATH, 'utf-8');
        return JSON.parse(content);
    } catch {
        return {};
    }
}

/**
 * Save manifest to disk
 */
async function saveManifest(manifest) {
    await writeFile(MANIFEST_PATH, JSON.stringify(manifest, null, 2));
}

/**
 * Get all image files in a directory
 */
async function getImageFiles(dir) {
    try {
        const files = await readdir(dir);
        return files.filter((f) => SUPPORTED_EXTENSIONS.includes(extname(f).toLowerCase()));
    } catch {
        return [];
    }
}

/**
 * Ensure directory exists
 */
async function ensureDir(dir) {
    await mkdir(dir, { recursive: true });
}

/**
 * Process a single image
 */
async function processImage(sourcePath, category, config) {
    const name = basename(sourcePath, extname(sourcePath));
    const outputSubDir = join(OUTPUT_DIR, category);
    await ensureDir(outputSubDir);

    const outputs = [];

    // Full-size AVIF
    if (config.full) {
        const fullPath = join(outputSubDir, `${name}.avif`);
        await sharp(sourcePath).avif({ quality: AVIF_QUALITY }).toFile(fullPath);
        outputs.push(fullPath);
    }

    // Thumbnail if configured
    if (config.thumbnail) {
        const thumbPath = join(outputSubDir, `${name}${config.thumbnail.suffix}.avif`);
        await sharp(sourcePath)
            .resize(config.thumbnail.width, null, { withoutEnlargement: true })
            .avif({ quality: AVIF_QUALITY })
            .toFile(thumbPath);
        outputs.push(thumbPath);
    }

    return outputs;
}

/**
 * Delete files that no longer have a source
 */
async function cleanupOrphans(manifest, currentSources) {
    const currentSourceSet = new Set(currentSources);
    const orphanKeys = Object.keys(manifest).filter((key) => !currentSourceSet.has(key));

    for (const key of orphanKeys) {
        const entry = manifest[key];
        if (entry.outputs) {
            for (const outputPath of entry.outputs) {
                try {
                    await unlink(outputPath);
                    console.log(`🗑️  Deleted orphan: ${relative(ROOT, outputPath)}`);
                } catch {
                    // File may already be deleted
                }
            }
        }
        delete manifest[key];
    }
}

/**
 * Main processing function
 */
async function main() {
    console.log('🖼️  Image Optimization Script\n');

    await ensureDir(OUTPUT_DIR);
    const manifest = await loadManifest();
    const allSources = [];

    let processed = 0;
    let skipped = 0;

    for (const [category, config] of Object.entries(CONFIG)) {
        const categoryDir = join(SOURCE_DIR, category);
        const images = await getImageFiles(categoryDir);

        for (const image of images) {
            const sourcePath = join(categoryDir, image);
            const relPath = relative(ROOT, sourcePath);
            allSources.push(relPath);

            const hash = await getFileHash(sourcePath);
            const existing = manifest[relPath];

            if (existing && existing.hash === hash) {
                skipped++;
                continue;
            }

            console.log(`⚙️  Processing: ${relPath}`);
            try {
                const outputs = await processImage(sourcePath, category, config);
                manifest[relPath] = {
                    hash,
                    outputs,
                    processedAt: new Date().toISOString()
                };
                processed++;
            } catch (err) {
                console.error(`❌ Error processing ${relPath}:`, err.message);
            }
        }
    }

    // Cleanup orphaned outputs
    await cleanupOrphans(manifest, allSources);

    await saveManifest(manifest);

    console.log(`\n✅ Done! Processed: ${processed}, Skipped (unchanged): ${skipped}`);
}

main().catch(console.error);
