import type { Post } from '$lib/types';
import { lookupHeroImage } from '$lib/utils/hero-images';

const posts = import.meta.glob('/src/content/blog/*.md', { eager: true });

export function load({ params }) {
    const path = `/src/content/blog/${params.slug}.md`;
    const post = posts[path] as { default: ConstructorOfATypedSvelteComponent; metadata: Post['metadata'] };

    if (!post) {
        throw new Error(`Post not found: ${params.slug}`);
    }

    // Resolve hero image - returns Picture if found, falls back to string path
    const heroImage = lookupHeroImage(post.metadata.hero) ?? post.metadata.hero;

    return {
        content: post.default,
        metadata: {
            ...post.metadata,
            heroImage
        }
    };
}
