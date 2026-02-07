// Type for enhanced image assets (from @sveltejs/enhanced-img)
export interface Picture {
    img: {
        src: string;
        w: number;
        h: number;
    };
    sources: Record<string, string>;
}
