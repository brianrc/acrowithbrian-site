import type { Post } from '$lib/types';

interface HomepageMetadata {
    title: string;
    metaTitle?: string;
    hero?: string;
    heroImage?: unknown;
    aboutPhoto?: string;
    photoHighlight?: string;
    aboutPhotoBig?: string;
    facebookImage?: string;
}

const page = import.meta.glob('/src/content/pages/index.md', { eager: true });
const posts = import.meta.glob('/src/content/blog/*.md', { eager: true });

import { lookupHeroImage } from '$lib/utils/hero-images';

export function load() {
    const pageData = Object.values(page)[0] as {
        default: ConstructorOfATypedSvelteComponent;
        metadata: HomepageMetadata
    };

    const allPosts: Post[] = [];

    for (const path in posts) {
        const post = posts[path] as { metadata: Post['metadata'] };
        const slug = path.split('/').pop()?.replace('.md', '') ?? '';

        // Resolve hero image for thumbnails - pass full Picture object for responsive sizing
        const heroPicture = lookupHeroImage(post.metadata.hero);

        allPosts.push({
            slug,
            metadata: {
                ...post.metadata,
                heroPicture
            }
        });
    }

    allPosts.sort((a, b) => {
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    // Resolve hero image from frontmatter path
    const heroImage = lookupHeroImage(pageData.metadata.hero) ?? pageData.metadata.hero;

    // Resolve other images - extract URL string for use in img src and CSS
    const aboutPhotoResolved = lookupHeroImage(pageData.metadata.aboutPhoto);
    const aboutPhoto = aboutPhotoResolved?.img.src ?? pageData.metadata.aboutPhoto;

    const photoHighlightResolved = lookupHeroImage(pageData.metadata.photoHighlight);
    const photoHighlight = photoHighlightResolved?.img.src ?? pageData.metadata.photoHighlight;

    return {
        content: pageData.default,
        metadata: {
            ...pageData.metadata,
            heroImage,
            aboutPhoto,
            photoHighlight
        },
        latestPosts: allPosts.slice(0, 6)
    };
}
