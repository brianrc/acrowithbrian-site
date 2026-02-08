import type { Picture } from '$lib/types/picture';

interface PageMetadata {
    title: string;
    hero?: string;
    heroImage?: unknown;
    path?: string;
    layout?: string;
}

const isDev = import.meta.env.DEV;

// Import page metadata
const page = import.meta.glob('/src/content/pages/photos.md', { eager: true });

// In dev mode: skip enhancement for fast loading
// In production: use enhanced images with responsive sizes
const galleryImages = isDev
    ? import.meta.glob<{ default: string }>(
        '/src/lib/assets/photo-gallery/*.{jpg,jpeg,png,webp,gif}',
        { eager: true, query: '?url' }
    )
    : import.meta.glob<{ default: Picture }>(
        '/src/lib/assets/photo-gallery/*.{jpg,jpeg,png,webp,gif}',
        { eager: true, query: { enhanced: true } }
    );

import { lookupHeroImage } from '$lib/utils/hero-images';

export function load() {
    const pageData = Object.values(page)[0] as {
        default: ConstructorOfATypedSvelteComponent;
        metadata: PageMetadata;
    };

    // Extract the image data from the glob result
    // In dev: just URLs, in prod: optimized Picture objects
    const images = Object.values(galleryImages).map((mod) => mod.default);

    // Resolve hero image from frontmatter path
    const heroImage = lookupHeroImage(pageData.metadata.hero) ?? pageData.metadata.hero;

    return {
        content: pageData.default,
        metadata: {
            ...pageData.metadata,
            heroImage
        },
        images
    };
}
