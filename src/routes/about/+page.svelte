<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';

	let { data } = $props();
</script>

<svelte:head>
	<title>{data.metadata.title} | Brian Cruikshank Acro</title>
	<meta
		name="description"
		content="Learn about Brian Cruikshank, certified Acro Revolution teacher based in Washington, DC."
	/>
</svelte:head>

<Hero
	title={data.metadata.title}
	image={data.metadata.heroImage ?? '/imgs/pages/about-1920x.jpg'}
/>

<section class="py-16 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="prose prose-lg mx-auto">
			<data.content />
		</div>
	</div>
</section>
