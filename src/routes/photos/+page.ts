interface PageMetadata {
    title: string;
    hero?: string;
    path?: string;
    layout?: string;
}

const page = import.meta.glob('/src/content/pages/photos.md', { eager: true });
// Automatically discover all images in the gallery folder
const galleryImages = import.meta.glob('/static/img/photo-gallery/*.{jpg,jpeg,png,webp,gif}', { eager: true });

export function load() {
    const pageData = Object.values(page)[0] as {
        default: any;
        metadata: PageMetadata
    };

    // Extract paths from the glob result
    // The keys look like '/static/img/photo-gallery/DSC_0398.jpg'
    // We want them to be accessible via web as '/img/photo-gallery/DSC_0398.jpg'
    const images = Object.keys(galleryImages)
        .map(path => path.replace('/static', ''))
        .sort(); // Keep them sorted for consistency

    return {
        content: pageData.default,
        metadata: pageData.metadata,
        images
    };
}
