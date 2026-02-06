import type { Post } from '$lib/types';

const posts = import.meta.glob('/src/content/blog/*.md', { eager: true });

export function load() {
    const allPosts: Post[] = [];

    for (const path in posts) {
        const post = posts[path] as { metadata: Post['metadata'] };
        const slug = path.split('/').pop()?.replace('.md', '') ?? '';

        allPosts.push({
            slug,
            metadata: post.metadata
        });
    }

    // Sort by date descending and take first 6
    allPosts.sort((a, b) => {
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    return { latestPosts: allPosts.slice(0, 6) };
}
