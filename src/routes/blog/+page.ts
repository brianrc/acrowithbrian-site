import type { Post } from '$lib/types';

interface PageMetadata {
    title: string;
    hero?: string;
    heroImage?: unknown;
    path?: string;
    layout?: string;
}

const page = import.meta.glob('/src/content/pages/blog.md', { eager: true });
const posts = import.meta.glob('/src/content/blog/*.md', { eager: true });

export function load() {
    const pageData = Object.values(page)[0] as {
        default: ConstructorOfATypedSvelteComponent;
        metadata: PageMetadata
    };

    const allPosts: Post[] = [];

    for (const path in posts) {
        const post = posts[path] as { metadata: Post['metadata'] };
        const slug = path.split('/').pop()?.replace('.md', '') ?? '';

        allPosts.push({
            slug,
            metadata: post.metadata
        });
    }

    allPosts.sort((a, b) => {
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    return {
        content: pageData.default,
        metadata: pageData.metadata,
        posts: allPosts
    };
}
