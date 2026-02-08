<script lang="ts">
	import type { Post } from '$lib/types';

	interface Props {
		posts: Post[];
	}

	let { posts }: Props = $props();
</script>

<div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
	{#each posts as post (post.slug)}
		<a
			href="/blog/{post.slug}"
			class="block bg-white rounded-lg shadow-md overflow-hidden hover:shadow-lg transition-shadow"
		>
			{#if post.metadata.heroPicture}
				<figure class="aspect-video">
					<picture>
						{#each Object.entries(post.metadata.heroPicture.sources) as [type, srcset] (type)}
							<source {srcset} {type} />
						{/each}
						<img
							src={post.metadata.heroPicture.img.src}
							alt={post.metadata.title}
							class="w-full h-full object-cover"
							loading="lazy"
						/>
					</picture>
				</figure>
			{:else if post.metadata.hero}
				<figure class="aspect-video">
					<img
						src={post.metadata.hero}
						alt={post.metadata.title}
						class="w-full h-full object-cover"
						loading="lazy"
					/>
				</figure>
			{/if}
			<div class="p-4">
				<h3 class="font-semibold text-lg">{post.metadata.title}</h3>
			</div>
		</a>
	{/each}
</div>
