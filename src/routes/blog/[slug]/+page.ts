import type { Post } from '$lib/types';

const posts = import.meta.glob('/src/content/blog/*.md', { eager: true });

export function load({ params }) {
    const path = `/src/content/blog/${params.slug}.md`;
    const post = posts[path] as { default: ConstructorOfATypedSvelteComponent; metadata: Post['metadata'] };

    if (!post) {
        throw new Error(`Post not found: ${params.slug}`);
    }

    return {
        content: post.default,
        metadata: post.metadata
    };
}
