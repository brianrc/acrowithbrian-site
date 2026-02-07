import type { Picture } from '$lib/types/picture';

// Import all hero images with enhanced optimization
const heroImages = import.meta.glob<{ default: Picture }>(
    '/src/lib/assets/imgs/**/*.{jpg,jpeg,png}',
    {
        eager: true,
        query: { enhanced: true }
    }
);

// Direct 1:1 mapping: frontmatter path === glob key
// No transformation needed since frontmatter now uses: /src/lib/assets/imgs/...
const heroMap = new Map<string, Picture>();

for (const [path, mod] of Object.entries(heroImages)) {
    heroMap.set(path, mod.default);
}

/**
 * lookupHeroImage
 * Takes a path from Markdown frontmatter and returns the optimized Picture object.
 * Returns null if no matching image is found.
 */
export function lookupHeroImage(path?: string): Picture | null {
    if (!path) return null;
    return heroMap.get(path) ?? null;
}
