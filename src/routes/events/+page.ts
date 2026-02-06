import type { Event } from '$lib/types';

const events = import.meta.glob('/src/content/events/*.md', { eager: true });

export function load() {
    const allEvents: Event[] = [];
    const now = new Date();

    for (const path in events) {
        const event = events[path] as { metadata: Event['metadata'] };
        const slug = path.split('/').pop()?.replace('.md', '') ?? '';

        allEvents.push({
            slug,
            metadata: event.metadata
        });
    }

    // Sort by start date
    allEvents.sort((a, b) => {
        return new Date(a.metadata.start).getTime() - new Date(b.metadata.start).getTime();
    });

    // Separate into upcoming and past
    const upcoming = allEvents.filter(e => new Date(e.metadata.start) >= now);
    const past = allEvents.filter(e => new Date(e.metadata.start) < now).reverse();

    return { upcoming, past };
}
