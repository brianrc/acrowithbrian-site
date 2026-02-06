<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import type { Event } from '$lib/types';

	let { data } = $props();
	const upcoming = $derived(data.upcoming as Event[]);
	const past = $derived(data.past as Event[]);

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			weekday: 'short',
			year: 'numeric',
			month: 'short',
			day: 'numeric'
		});
	}
</script>

<svelte:head>
	<title>{data.metadata.title} | Brian Cruikshank Acro</title>
	<meta name="description" content="Upcoming acro events and workshops with Brian Cruikshank" />
</svelte:head>

<Hero title={data.metadata.title} image={data.metadata.hero ?? '/img/events-1920x.jpg'} />

<section class="py-16 px-4">
	<div class="max-w-4xl mx-auto">
		<div class="prose prose-lg mx-auto text-center mb-12">
			<data.content />
		</div>

		{#if upcoming.length > 0}
			<h2 class="text-2xl font-bold mb-6">Upcoming Events</h2>
			<div class="space-y-4 mb-16">
				{#each upcoming as event (event.slug)}
					<a
						href="/events/{event.slug}"
						class="block p-6 bg-white rounded-lg shadow hover:shadow-lg transition-shadow border-l-4 border-primary"
					>
						<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-2">
							<div>
								<h3 class="font-semibold text-lg">{event.metadata.title}</h3>
								<p class="text-muted text-sm">{event.metadata.location}</p>
							</div>
							<div class="text-sm text-muted whitespace-nowrap">
								{formatDate(event.metadata.start)}
							</div>
						</div>
					</a>
				{/each}
			</div>
		{:else}
			<p class="text-center text-muted mb-12">No upcoming events scheduled at this time.</p>
		{/if}

		{#if past.length > 0}
			<h2 class="text-2xl font-bold mb-6 text-muted">Past Events</h2>
			<div class="space-y-3 opacity-70">
				{#each past.slice(0, 20) as event (event.slug)}
					<a
						href="/events/{event.slug}"
						class="block p-4 bg-gray-50 rounded hover:bg-gray-100 transition-colors"
					>
						<div class="flex flex-col md:flex-row md:items-center md:justify-between gap-1">
							<span class="font-medium">{event.metadata.title}</span>
							<span class="text-sm text-muted">{formatDate(event.metadata.start)}</span>
						</div>
					</a>
				{/each}
				{#if past.length > 20}
					<p class="text-center text-muted text-sm pt-4">
						...and {past.length - 20} more past events
					</p>
				{/if}
			</div>
		{/if}
	</div>
</section>
