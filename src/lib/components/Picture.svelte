<!--
  Picture Component
  Renders <picture> with AVIF source and original fallback.
  Automatically resolves /imgs/ paths to /imgs-optimized/ AVIF versions.
  
  Props:
  - src: Original image path (e.g., "/imgs/blog/example.jpg")
  - alt: Alt text (required for accessibility)
  - variant: "thumb" | "preview" | undefined (for thumbnails)
  - class: CSS classes to apply
  - loading: "lazy" | "eager" (default: "lazy")
-->
<script lang="ts">
	interface Props {
		src: string;
		alt: string;
		variant?: 'thumb' | 'preview';
		class?: string;
		loading?: 'lazy' | 'eager';
	}

	let { src, alt, variant, class: className = '', loading = 'lazy' }: Props = $props();

	/**
	 * Convert original path to optimized AVIF path
	 * /imgs/blog/example.jpg -> /imgs-optimized/blog/example.avif
	 * With variant: /imgs-optimized/blog/example-thumb.avif
	 */
	function getAvifPath(originalSrc: string, variantType?: string): string {
		// Only process /imgs/ paths
		if (!originalSrc.startsWith('/imgs/')) {
			return originalSrc;
		}

		// Replace /imgs/ with /imgs-optimized/
		let avifPath = originalSrc.replace('/imgs/', '/imgs-optimized/');

		// Remove original extension and add .avif
		const lastDot = avifPath.lastIndexOf('.');
		if (lastDot > 0) {
			const basePath = avifPath.substring(0, lastDot);
			const suffix =
				variantType === 'thumb' ? '-thumb' : variantType === 'preview' ? '-preview' : '';
			avifPath = `${basePath}${suffix}.avif`;
		}

		return avifPath;
	}

	const avifSrc = $derived(getAvifPath(src, variant));
</script>

<picture>
	<source srcset={avifSrc} type="image/avif" />
	<img {src} {alt} class={className} {loading} />
</picture>
