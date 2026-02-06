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
