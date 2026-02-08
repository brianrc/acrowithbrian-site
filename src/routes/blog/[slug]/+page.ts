import type { Post } from '$lib/types';

const posts = import.meta.glob('/src/content/blog/*.md', { eager: true });

// Generate all blog post entries for static prerendering
export function entries() {
    return Object.keys(posts).map((path) => {
        const slug = path.split('/').pop()?.replace('.md', '') ?? '';
        return { slug };
    });
}

export function load({ params }) {
    const path = `/src/content/blog/${params.slug}.md`;
    const post = posts[path] as { default: ConstructorOfATypedSvelteComponent; metadata: Post['metadata'] };

    if (!post) {
        throw new Error(`Post not found: ${params.slug}`);
    }

    return {
        content: post.default,
        metadata: {
            ...post.metadata,
            heroImage: post.metadata.hero
        }
    };
}
