import type { Event } from '$lib/types';
import { lookupHeroImage } from '$lib/utils/hero-images';

const events = import.meta.glob('/src/content/events/*.md', { eager: true });

export function load({ params }) {
    const path = `/src/content/events/${params.slug}.md`;
    const event = events[path] as { default: ConstructorOfATypedSvelteComponent; metadata: Event['metadata'] };

    if (!event) {
        throw new Error(`Event not found: ${params.slug}`);
    }

    // Resolve hero image - returns Picture if found, falls back to string path
    const heroImage = lookupHeroImage(event.metadata.hero) ?? event.metadata.hero;

    return {
        content: event.default,
        metadata: {
            ...event.metadata,
            heroImage
        }
    };
}
