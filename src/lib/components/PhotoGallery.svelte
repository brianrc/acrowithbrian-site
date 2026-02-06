<script lang="ts">
	interface Props {
		images: string[];
	}

	let { images }: Props = $props();

	let lightboxOpen = $state(false);
	let currentIndex = $state(0);

	function openLightbox(index: number) {
		currentIndex = index;
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
</script>

<svelte:window onkeydown={handleKeydown} />

<div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-2">
	{#each images as image, i (image)}
		<button
			type="button"
			class="aspect-square overflow-hidden cursor-pointer"
			onclick={() => openLightbox(i)}
		>
			<img
				src={image}
				alt="Gallery photo {i + 1}"
				class="w-full h-full object-cover hover:scale-105 transition-transform duration-300"
				loading="lazy"
			/>
		</button>
	{/each}
</div>

{#if lightboxOpen}
	<!-- svelte-ignore a11y_click_events_have_key_events -->
	<!-- svelte-ignore a11y_no_static_element_interactions -->
	<div
		class="fixed inset-0 bg-black/90 z-50 flex items-center justify-center"
		onclick={closeLightbox}
	>
		<button
			type="button"
			class="absolute top-4 right-4 text-white text-4xl hover:text-gray-300 cursor-pointer z-10"
			onclick={closeLightbox}
		>
			&times;
		</button>

		<button
			type="button"
			class="absolute left-4 text-white text-4xl hover:text-gray-300 cursor-pointer z-10"
			onclick={prevImage}
		>
			&#8249;
		</button>

		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<img
			src={images[currentIndex]}
			alt="Gallery photo {currentIndex + 1}"
			class="max-h-[90vh] max-w-[90vw] object-contain"
			onclick={stopProp}
		/>

		<button
			type="button"
			class="absolute right-4 text-white text-4xl hover:text-gray-300 cursor-pointer z-10"
			onclick={nextImage}
		>
			&#8250;
		</button>

		<div class="absolute bottom-4 text-white text-sm">
			{currentIndex + 1} / {images.length}
		</div>
	</div>
{/if}
