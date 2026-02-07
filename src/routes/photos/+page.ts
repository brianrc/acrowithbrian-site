import type { Picture } from '$lib/types/picture';

interface PageMetadata {
    title: string;
    hero?: string;
    path?: string;
    layout?: string;
}

// Import page metadata
const page = import.meta.glob('/src/content/pages/photos.md', { eager: true });

// Automatically discover all images in the gallery folder with enhanced optimization
const galleryImages = import.meta.glob<{ default: Picture }>(
    '/src/lib/assets/photo-gallery/*.{jpg,jpeg,png,webp,gif}',
    {
        eager: true,
        query: { enhanced: true }
    }
);

export function load() {
    const pageData = Object.values(page)[0] as {
        default: ConstructorOfATypedSvelteComponent;
        metadata: PageMetadata;
    };

    // Extract the enhanced image objects from the glob result
    // Each module.default contains the optimized image data
    const images: Picture[] = Object.values(galleryImages).map((mod) => mod.default);

    return {
        content: pageData.default,
        metadata: pageData.metadata,
        images
    };
}
