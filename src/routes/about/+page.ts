interface PageMetadata {
    title: string;
    hero?: string;
    path?: string;
    layout?: string;
}

const page = import.meta.glob('/src/content/pages/about.md', { eager: true });

export function load() {
    const pageData = Object.values(page)[0] as {
        default: ConstructorOfATypedSvelteComponent;
        metadata: PageMetadata
    };

    return {
        content: pageData.default,
        metadata: {
            ...pageData.metadata,
            heroImage: pageData.metadata.hero
        }
    };
}
