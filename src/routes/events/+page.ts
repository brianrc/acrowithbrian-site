import type { Event } from '$lib/types';

interface PageMetadata {
    title: string;
    hero?: string;
    path?: string;
    layout?: string;
}

const page = import.meta.glob('/src/content/pages/events.md', { eager: true });
const events = import.meta.glob('/src/content/events/*.md', { eager: true });

export function load() {
    const pageData = Object.values(page)[0] as {
        default: ConstructorOfATypedSvelteComponent;
        metadata: PageMetadata
    };

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

    allEvents.sort((a, b) => {
        return new Date(a.metadata.start).getTime() - new Date(b.metadata.start).getTime();
    });

    const upcoming = allEvents.filter(e => new Date(e.metadata.start) >= now);
    const past = allEvents.filter(e => new Date(e.metadata.start) < now).reverse();

    return {
        content: pageData.default,
        metadata: {
            ...pageData.metadata,
            heroImage: pageData.metadata.hero
        },
        upcoming,
        past
    };
}
