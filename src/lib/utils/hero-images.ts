import type { Picture } from '$lib/types/picture';

const isDev = import.meta.env.DEV;

// Only load enhanced images in production builds
// In dev mode, we skip processing for faster loading
const heroImages = isDev
    ? {}
    : import.meta.glob<{ default: Picture }>(
        '/src/lib/assets/imgs/**/*.{jpg,jpeg,png}',
        {
            eager: true,
            query: { enhanced: true }
        }
    );

// Build the lookup map (empty in dev mode)
const heroMap = new Map<string, Picture>();

if (!isDev) {
    for (const [path, mod] of Object.entries(heroImages)) {
        heroMap.set(path, mod.default);
    }
}

/**
 * lookupHeroImage
 * Takes a path from Markdown frontmatter and returns the optimized Picture object.
 * In dev mode: always returns null (components will use raw path fallback)
 * In production: returns the processed Picture object for responsive images
 */
export function lookupHeroImage(path?: string): Picture | null {
    if (!path || isDev) return null;
    return heroMap.get(path) ?? null;
}
