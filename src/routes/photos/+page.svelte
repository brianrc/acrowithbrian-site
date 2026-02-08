<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import PhotoGallery from '$lib/components/PhotoGallery.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.metadata.title} | Brian Cruikshank Acro</title>
	<meta name="description" content="Acrobatic photography by Brian Cruikshank" />
</svelte:head>

<Hero
	title={data.metadata.title}
	image={data.metadata.heroImage ?? '/imgs/pages/photos-1920x.jpg'}
/>

<section class="py-16 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="prose prose-lg mx-auto text-center mb-12">
			<data.content />
		</div>

		<PhotoGallery images={data.images} />
	</div>
</section>
