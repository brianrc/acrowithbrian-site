import type { Event } from '$lib/types';

const events = import.meta.glob('/src/content/events/*.md', { eager: true });

// Generate all event entries for static prerendering
export function entries() {
    return Object.keys(events).map((path) => {
        const slug = path.split('/').pop()?.replace('.md', '') ?? '';
        return { slug };
    });
}

export function load({ params }) {
    const path = `/src/content/events/${params.slug}.md`;
    const event = events[path] as { default: ConstructorOfATypedSvelteComponent; metadata: Event['metadata'] };

    if (!event) {
        throw new Error(`Event not found: ${params.slug}`);
    }

    return {
        content: event.default,
        metadata: {
            ...event.metadata,
            heroImage: event.metadata.hero
        }
    };
}
