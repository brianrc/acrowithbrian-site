<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';

	let { data } = $props();

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			year: 'numeric',
			month: 'long',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.metadata.title} | Blog | Brian Cruikshank Acro</title>
	{#if data.metadata.description}
		<meta name="description" content={data.metadata.description} />
	{/if}
</svelte:head>

<Hero title={data.metadata.title} image={data.metadata.hero ?? '/img/blog-1920x.jpg'} />

<article class="py-16 px-4">
	<div class="max-w-3xl mx-auto">
		<div class="text-muted text-sm mb-8 pb-4 border-b border-gray-200">
			{#if data.metadata.author}
				Post by {data.metadata.author} •
			{/if}
			{formatDate(data.metadata.date)}
		</div>

		<div class="prose prose-lg max-w-none">
			<data.content />
		</div>

		<div class="mt-12 pt-8 border-t border-gray-200">
			<a href="/blog" class="text-primary hover:underline">← Back to Blog</a>
		</div>
	</div>
</article>
