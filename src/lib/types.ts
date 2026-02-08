export interface Post {
    slug: string;
    metadata: {
        title: string;
        date: string;
        author?: string;
        hero?: string;
        category?: string;
        description?: string;
    };
}

export interface Event {
    slug: string;
    metadata: {
        title: string;
        date: string;
        start: string;
        end: string;
        location: string;
        address: string;
        category?: string;
        description?: string;
        hero?: string;
        teaching?: boolean;
    };
}
