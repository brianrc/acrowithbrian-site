interface PageMetadata {
    title: string;
    hero?: string;
    path?: string;
    layout?: string;
}

// Import page metadata
const page = import.meta.glob('/src/content/pages/photos.md', { eager: true });

// Simple URL glob for gallery images from static folder
const galleryImages = import.meta.glob<{ default: string }>(
    '/static/imgs/photo-gallery/*.{jpg,jpeg,png,webp,gif}',
    { eager: true, query: '?url' }
);

export function load() {
    const pageData = Object.values(page)[0] as {
        default: ConstructorOfATypedSvelteComponent;
        metadata: PageMetadata;
    };

    // Extract image URLs - convert /static paths to root-relative paths
    const images = Object.entries(galleryImages).map(([path, mod]) => {
        // Convert '/static/imgs/photo-gallery/x.jpg' to '/imgs/photo-gallery/x.jpg'
        return path.replace('/static', '');
    });

    return {
        content: pageData.default,
        metadata: {
            ...pageData.metadata,
            heroImage: pageData.metadata.hero
        },
        images
    };
}
