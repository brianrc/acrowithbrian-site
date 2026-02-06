import type { Post } from '$lib/types';

// Import all markdown files from the content/blog directory
const posts = import.meta.glob('/src/content/blog/*.md', { eager: true });

export function load() {
    const allPosts: Post[] = [];

    for (const path in posts) {
        const post = posts[path] as { metadata: Post['metadata'] };
        // Keep the full filename as slug (including date prefix)
        const slug = path.split('/').pop()?.replace('.md', '') ?? '';

        allPosts.push({
            slug,
            metadata: post.metadata
        });
    }

    // Sort by date descending
    allPosts.sort((a, b) => {
        return new Date(b.metadata.date).getTime() - new Date(a.metadata.date).getTime();
    });

    return { posts: allPosts };
}
