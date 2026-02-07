<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import EventCalendar from '$lib/components/EventCalendar.svelte';
	import type { Event } from '$lib/types';
	import type { Picture } from '$lib/types/picture';

	let { data } = $props();
	const allEvents = $derived([...data.upcoming, ...data.past] as Event[]);
</script>

<svelte:head>
	<title>{data.metadata.title} | Brian Cruikshank Acro</title>
	<meta name="description" content="Upcoming acro events and workshops with Brian Cruikshank" />
</svelte:head>

<Hero
	title={data.metadata.title}
	image={(data.metadata.heroImage ?? '/src/lib/assets/imgs/pages/events-1920x.jpg') as
		| Picture
		| string}
/>

<section class="py-16 px-4">
	<div class="max-w-6xl mx-auto">
		<div class="prose prose-lg mx-auto text-center mb-12">
			<data.content />
		</div>

		<EventCalendar events={allEvents} />
	</div>
</section>
