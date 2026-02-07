<script lang="ts">
	import type { Picture } from '$lib/types/picture';

	interface Props {
		title?: string;
		subtitle?: string;
		image?: Picture | string; // Accept both optimized (Picture) and unoptimized (string)
		imagePosition?: string;
		variant?: 'default' | 'homepage';
	}

	let {
		title = '',
		subtitle = '',
		image = '/img/home-1920x.jpg',
		imagePosition = '50% 50%',
		variant = 'default'
	}: Props = $props();

	const isHomepage = $derived(variant === 'homepage');

	// Helper to determine if we have an optimized picture object
	const isOptimized = $derived(typeof image === 'object' && image !== null && 'sources' in image);
</script>

<section
	class="relative flex items-center bg-gray-500 overflow-hidden
		{isHomepage ? 'min-h-screen' : 'min-h-[70vh]'}"
>
	<!-- Hero Background Image -->
	<div class="absolute inset-0 z-0">
		{#if isOptimized}
			{@const pic = image as Picture}
			<picture>
				{#each Object.entries(pic.sources) as [format, srcset]}
					<source {srcset} type="image/{format}" sizes="100vw" />
				{/each}
				<img
					src={pic.img.src}
					alt=""
					class="w-full h-full object-cover"
					style:object-position={imagePosition}
					fetchpriority="high"
				/>
			</picture>
		{:else}
			<img
				src={image as string}
				alt=""
				class="w-full h-full object-cover"
				style:object-position={imagePosition}
			/>
		{/if}
		<!-- Dark Overlay -->
		<div class="absolute inset-0 bg-black/20"></div>
		<!-- Gradient Overlay -->
		<div
			class="absolute inset-0"
			style="background: linear-gradient(rgba(0,0,0,0.1), rgba(0,0,0,0));"
		></div>
	</div>

	<!-- Content -->
	<div
		class="relative z-10 w-full px-4 py-24
			{isHomepage
			? 'text-left mt-[35vh] ml-[5vh] md:mt-[10vh] md:ml-[10vh] lg:mt-[15vh] lg:ml-[20vh]'
			: 'text-center'}"
	>
		{#if title}
			<h1
				class="text-white text-shadow-hero font-bold tracking-wide
					{isHomepage ? 'text-4xl md:text-5xl lg:text-6xl text-left' : 'text-3xl md:text-5xl'}"
			>
				{title}
			</h1>
		{/if}

		{#if subtitle}
			<h2 class="text-white text-shadow-hero uppercase text-xl md:text-2xl mt-4">
				{subtitle}
			</h2>
		{/if}
	</div>
</section>
