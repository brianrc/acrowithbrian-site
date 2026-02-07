interface PageMetadata {
    title: string;
    hero?: string;
    heroImage?: unknown;
    path?: string;
    layout?: string;
}

const page = import.meta.glob('/src/content/pages/about.md', { eager: true });

import { lookupHeroImage } from '$lib/utils/hero-images';

export function load() {
    const pageData = Object.values(page)[0] as {
        default: ConstructorOfATypedSvelteComponent;
        metadata: PageMetadata
    };

    // Resolve hero image from frontmatter path
    const heroImage = lookupHeroImage(pageData.metadata.hero) ?? pageData.metadata.hero;

    return {
        content: pageData.default,
        metadata: {
            ...pageData.metadata,
            heroImage
        }
    };
}
