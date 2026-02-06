<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import PhotoGallery from '$lib/components/PhotoGallery.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Photos | Brian Cruikshank Acro</title>
	<meta name="description" content="Acrobatic photography by Brian Cruikshank" />
</svelte:head>

<Hero title="Photos" image="/img/photos-1920x.jpg" />

<section class="py-16 px-4">
	<div class="max-w-6xl mx-auto">
		<p class="text-lg text-muted mb-12 text-center">
			I have a passion for photography and discovering different shapes our bodies can create. The
			following photos were all taken with my professional camera.
			<a href="/contact" class="text-primary hover:underline">Contact me</a> if you're interested in a
			photography session.
		</p>

		<PhotoGallery images={data.images} />
	</div>
</section>
