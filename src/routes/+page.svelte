<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import LatestPosts from '$lib/components/LatestPosts.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>Brian Cruikshank Acro</title>
	<meta name="description" content="Partner Acrobatics with Brian Cruikshank" />
</svelte:head>

<!-- Hero Section -->
<Hero
	title="Hi, I'm Brian."
	image="/img/home-1920x.jpg"
	imagePosition="50% 30%"
	variant="homepage"
/>

<!-- About Section -->
<section class="py-16 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="flex flex-col md:flex-row items-center gap-8 md:gap-16">
			<div class="w-full md:w-1/2 max-w-[400px] mx-auto">
				<img src="/img/brian-640x.jpg" alt="Brian Cruikshank" class="w-full rounded-lg shadow-lg" />
			</div>
			<div class="w-full md:w-1/2 text-center md:text-left">
				<h2 class="text-3xl font-bold mb-6">About Me</h2>
				<p class="text-muted leading-8 text-lg mb-6">
					I am a certified Acro Revolution teacher based in Washington, DC. Over the years I've
					traveled the country going to many festivals, training hard, and playing with some of the
					most advanced acrobats. In that time I've learned some unique skills and valuable
					techniques. I want to share this knowledge with you.
				</p>
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
		style="background-image: linear-gradient(to right, rgba(0,0,0,0), rgba(0,0,0,0.1), rgba(0,0,0,0)), url('/img/photo-highlight-1920x.jpg'); box-shadow: inset 0 0 8px rgba(0,0,0,0.4);"
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
	<div class="max-w-4xl mx-auto text-center">
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
