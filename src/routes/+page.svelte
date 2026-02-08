<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import LatestPosts from '$lib/components/LatestPosts.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.metadata.metaTitle ?? data.metadata.title}</title>
	<meta name="description" content="Partner Acrobatics with Brian Cruikshank" />
</svelte:head>

<!-- Hero Section -->
<Hero
	title={data.metadata.title}
	image={data.metadata.heroImage ?? '/src/lib/assets/imgs/pages/home-1920x.jpg'}
	imagePosition="50% 30%"
	variant="homepage"
/>

<!-- About Section -->
<section class="py-16 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="flex flex-col md:flex-row items-center gap-8 md:gap-16">
			<div class="w-full md:w-1/2 max-w-[400px] mx-auto">
				<img
					src={data.metadata.aboutPhoto}
					alt="Brian Cruikshank"
					class="w-full rounded-lg shadow-lg"
				/>
			</div>
			<div class="w-full md:w-1/2 text-center md:text-left">
				<h2 class="text-3xl font-bold mb-6">About Me</h2>
				<div class="text-muted leading-8 text-lg mb-6 prose prose-lg">
					<data.content />
				</div>
				<a
					href="/about"
					class="inline-block border-2 border-primary text-primary px-6 py-3 hover:bg-primary hover:text-white transition-colors"
				>
					Learn More
				</a>
			</div>
		</div>
	</div>
</section>

<!-- Photo Highlight Parallax -->
<section class="py-0">
	<div
		class="h-[70vh] w-full bg-fixed bg-cover bg-center flex items-center justify-center"
		style="background-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0)), url('{data
			.metadata.photoHighlight}'); box-shadow: inset 0 0 8px rgba(0,0,0,0.4);"
	>
		<a
			href="/photos"
			class="border-2 border-white text-white px-8 py-4 text-lg hover:bg-white/10 transition-colors"
		>
			View Photos
		</a>
	</div>
</section>

<!-- Events Section -->
<section class="py-16 px-4">
	<div class="max-w-6xl mx-auto text-center">
		<h2 class="text-3xl font-bold mb-4">Events</h2>
		<p class="text-muted mb-8">
			I travel around quite a bit. You can find me at these upcoming events!
		</p>
		<p class="text-muted mb-8">No upcoming events yet.</p>
		<a
			href="/events"
			class="inline-block border-2 border-primary text-primary px-6 py-3 hover:bg-primary hover:text-white transition-colors"
		>
			More Events
		</a>
	</div>
</section>

<!-- Blog Section -->
<section class="py-16 px-4 bg-gray-100">
	<div class="max-w-6xl mx-auto text-center">
		<h2 class="text-3xl font-bold mb-8">Blog</h2>

		<LatestPosts posts={data.latestPosts} />

		<a
			href="/blog"
			class="inline-block border-2 border-primary text-primary px-6 py-3 hover:bg-primary hover:text-white transition-colors"
		>
			More Posts
		</a>
	</div>
</section>
