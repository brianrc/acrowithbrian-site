<script lang="ts">
	interface Props {
		title?: string;
		subtitle?: string;
		image?: string;
		imagePosition?: string;
		variant?: 'default' | 'homepage';
	}

	let {
		title = '',
		subtitle = '',
		image = '/imgs/pages/home-1920x.jpg',
		imagePosition = '50% 50%',
		variant = 'default'
	}: Props = $props();

	const isHomepage = $derived(variant === 'homepage');
</script>

<section
	class="relative flex items-center bg-gray-500 overflow-hidden
		{isHomepage ? 'min-h-screen' : 'min-h-[70vh]'}"
>
	<!-- Hero Background Image -->
	<div class="absolute inset-0 z-0">
		<img
			src={image}
			alt=""
			class="w-full h-full object-cover"
			style:object-position={imagePosition}
			fetchpriority="high"
		/>
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
