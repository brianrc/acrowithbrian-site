<script lang="ts">
	import type { Picture } from '$lib/types/picture';

	interface Props {
		images: (Picture | string)[];
	}

	let { images }: Props = $props();

	let lightboxOpen = $state(false);
	let currentIndex = $state(0);

	// Adaptive column count
	let innerWidth = $state(0);
	let cols = $derived(innerWidth < 640 ? 1 : innerWidth < 1024 ? 2 : 3);

	// Helper to check if image is a Picture object (production) or string URL (dev)
	function isPicture(img: Picture | string): img is Picture {
		return typeof img === 'object' && img !== null && 'sources' in img;
	}

	// Get image src for both types
	function getImageSrc(img: Picture | string): string {
		return isPicture(img) ? img.img.src : img;
	}

	// Distribute images into columns
	let columns = $derived.by(() => {
		const result: (Picture | string)[][] = Array.from({ length: cols }, () => []);
		images.forEach((img, i) => {
			result[i % cols].push(img);
		});
		return result;
	});

	function openLightbox(imageIndex: number) {
		currentIndex = imageIndex;
		lightboxOpen = true;
	}

	function closeLightbox() {
		lightboxOpen = false;
	}

	function nextImage(e: MouseEvent) {
		e.stopPropagation();
		currentIndex = (currentIndex + 1) % images.length;
	}

	function prevImage(e: MouseEvent) {
		e.stopPropagation();
		currentIndex = (currentIndex - 1 + images.length) % images.length;
	}

	function handleKeydown(e: KeyboardEvent) {
		if (!lightboxOpen) return;
		if (e.key === 'Escape') closeLightbox();
		if (e.key === 'ArrowRight') nextImage(e as unknown as MouseEvent);
		if (e.key === 'ArrowLeft') prevImage(e as unknown as MouseEvent);
	}

	function stopProp(e: MouseEvent) {
		e.stopPropagation();
	}

	// Get original index in the full images array
	function getGlobalIndex(colIndex: number, rowIndex: number): number {
		return rowIndex * cols + colIndex;
	}
</script>

<svelte:window onkeydown={handleKeydown} bind:innerWidth />

<div class="flex gap-4">
	{#each columns as column, colIndex (colIndex)}
		<div class="flex-1 flex flex-col gap-4">
			{#each column as image, rowIndex (rowIndex)}
				{@const globalIndex = getGlobalIndex(colIndex, rowIndex)}
				<button
					type="button"
					class="w-full overflow-hidden cursor-pointer rounded-lg"
					onclick={() => openLightbox(globalIndex)}
					aria-label="View gallery image {globalIndex + 1}"
				>
					{#if isPicture(image)}
						<!-- Production: Render optimized picture element -->
						<picture>
							{#each Object.entries(image.sources) as [format, srcset]}
								<source
									{srcset}
									type="image/{format}"
									sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
								/>
							{/each}
							<img
								src={image.img.src}
								width={image.img.w}
								height={image.img.h}
								alt="Gallery item {globalIndex + 1}"
								class="w-full h-auto block hover:scale-[1.02] transition-transform duration-300"
								loading="lazy"
							/>
						</picture>
					{:else}
						<!-- Dev: Simple img tag -->
						<img
							src={image}
							alt="Gallery item {globalIndex + 1}"
							class="w-full h-auto block hover:scale-[1.02] transition-transform duration-300"
							loading="lazy"
						/>
					{/if}
				</button>
			{/each}
		</div>
	{/each}
</div>

{#if lightboxOpen}
	{@const currentImage = images[currentIndex]}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4"
		onclick={closeLightbox}
	>
		<button
			type="button"
			class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 cursor-pointer z-10"
			onclick={closeLightbox}
			aria-label="Close lightbox"
		>
			&times;
		</button>

		<button
			type="button"
			class="absolute left-4 text-white text-4xl hover:text-gray-300 cursor-pointer z-10"
			onclick={prevImage}
			aria-label="Previous image"
		>
			&#8249;
		</button>

		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		{#if isPicture(currentImage)}
			<picture onclick={stopProp}>
				{#each Object.entries(currentImage.sources) as [format, srcset]}
					<source {srcset} type="image/{format}" />
				{/each}
				<img
					src={currentImage.img.src}
					alt="Gallery photo {currentIndex + 1}"
					class="max-h-[85vh] max-w-full object-contain shadow-2xl"
				/>
			</picture>
		{:else}
			<img
				src={currentImage}
				alt="Gallery photo {currentIndex + 1}"
				class="max-h-[85vh] max-w-full object-contain shadow-2xl"
				onclick={stopProp}
			/>
		{/if}

		<button
			type="button"
			class="absolute right-4 text-white text-4xl hover:text-gray-300 cursor-pointer z-10"
			onclick={nextImage}
			aria-label="Next image"
		>
			&#8250;
		</button>

		<div class="absolute bottom-4 text-white text-sm bg-black/50 px-3 py-1 rounded-full">
			{currentIndex + 1} / {images.length}
		</div>
	</div>
{/if}
