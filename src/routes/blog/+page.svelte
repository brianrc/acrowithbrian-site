<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import type { Post } from '$lib/types';

	let { data } = $props();
	const posts: Post[] = data.posts;

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>Blog | Brian Cruikshank Acro</title>
	<meta name="description" content="Acrobatic tutorials and videos by Brian Cruikshank" />
</svelte:head>

<Hero title="Blog" image="/img/blog-1920x.jpg" />

<section class="py-16 px-4">
	<div class="max-w-4xl mx-auto">
		<p class="text-lg text-muted mb-12 text-center">
			Check out my acrobatic tutorials and flow videos!
		</p>

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
							<p class="text-sm text-muted">{formatDate(post.metadata.date)}</p>
						</div>
					</a>
				{/each}
			</div>
		{/if}
	</div>
</section>
