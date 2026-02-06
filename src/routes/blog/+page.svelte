<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import type { Post } from '$lib/types';

	let { data } = $props();
	const posts = $derived(data.posts as Post[]);
</script>

<svelte:head>
	<title>{data.metadata.title} | Brian Cruikshank Acro</title>
	<meta name="description" content="Acrobatic tutorials and videos by Brian Cruikshank" />
</svelte:head>

<Hero title={data.metadata.title} image={data.metadata.hero ?? '/img/blog-1920x.jpg'} />

<section class="py-16 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="prose prose-lg mx-auto text-center mb-12">
			<data.content />
		</div>

		{#if posts.length === 0}
			<p class="text-center text-muted">No posts yet.</p>
		{:else}
			<div class="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
				{#each posts as post (post.slug)}
					<a
						href="/blog/{post.slug}"
						class="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
					>
						{#if post.metadata.hero}
							<img
								src={post.metadata.hero}
								alt={post.metadata.title}
								class="w-full h-48 object-cover"
							/>
						{/if}
						<div class="p-4">
							<h3 class="font-semibold text-lg mb-2">{post.metadata.title}</h3>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
