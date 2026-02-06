import type { Event } from '$lib/types';

const events = import.meta.glob('/src/content/events/*.md', { eager: true });

export function load({ params }) {
    const path = `/src/content/events/${params.slug}.md`;
    const event = events[path] as { default: ConstructorOfATypedSvelteComponent; metadata: Event['metadata'] };

    if (!event) {
        throw new Error(`Event not found: ${params.slug}`);
    }

    return {
        content: event.default,
        metadata: event.metadata
    };
}
