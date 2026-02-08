import type { Picture } from './types/picture';

export interface Post {
    slug: string;
    metadata: {
        title: string;
        date: string;
        author?: string;
        hero?: string;
        heroImage?: Picture | string;
        heroPicture?: Picture | null;
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
        heroImage?: Picture | string;
        teaching?: boolean;
    };
}
