<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';

	let { data } = $props();

	function formatDate(dateStr: string): string {
		return new Date(dateStr).toLocaleDateString('en-US', {
			weekday: 'long',
			year: 'numeric',
			month: 'long',
			day: 'numeric',
			hour: 'numeric',
			minute: '2-digit'
		});
	}

	const mapUrl = $derived(
		data.metadata.location && data.metadata.address
			? `https://www.google.com/maps/embed/v1/place?key=AIzaSyDzq49VRIOq9h7ykw2GiwJrXW-zdKGQHVM&q=${encodeURIComponent(data.metadata.location + ', ' + data.metadata.address)}`
			: ''
	);
</script>

<svelte:head>
	<title>{data.metadata.title} | Events | Brian Cruikshank Acro</title>
	{#if data.metadata.description}
		<meta name="description" content={data.metadata.description} />
	{/if}
</svelte:head>

<Hero
	title={data.metadata.title}
	subtitle={data.metadata.start}
	image={data.metadata.hero ?? '/img/events-1920x.jpg'}
/>

<article class="py-16 px-4">
	<div class="max-w-4xl mx-auto">
		<div class="prose prose-lg max-w-none mb-12">
			<data.content />
		</div>

		<div class="grid md:grid-cols-2 gap-8 mb-12">
			<div class="bg-gray-50 p-6 rounded-lg">
				<h3 class="font-bold text-lg mb-4">Event Details</h3>
				<dl class="space-y-2">
					<div>
						<dt class="text-sm text-muted">Start</dt>
						<dd class="font-medium">{data.metadata.start}</dd>
					</div>
					<div>
						<dt class="text-sm text-muted">End</dt>
						<dd class="font-medium">{data.metadata.end}</dd>
					</div>
					{#if data.metadata.category}
						<div>
							<dt class="text-sm text-muted">Category</dt>
							<dd class="font-medium">{data.metadata.category}</dd>
						</div>
					{/if}
				</dl>
			</div>

			<div class="bg-gray-50 p-6 rounded-lg">
				<h3 class="font-bold text-lg mb-4">Venue Details</h3>
				<dl class="space-y-2">
					<div>
						<dt class="text-sm text-muted">Location</dt>
						<dd class="font-medium">{data.metadata.location}</dd>
					</div>
					<div>
						<dt class="text-sm text-muted">Address</dt>
						<dd class="font-medium">{data.metadata.address}</dd>
					</div>
				</dl>
			</div>
		</div>

		{#if data.metadata.location && data.metadata.address}
			<div class="rounded-lg overflow-hidden">
				<iframe
					src={mapUrl}
					width="100%"
					height="300"
					style="border:0"
					allowfullscreen
					loading="lazy"
					title="Event location map"
				></iframe>
			</div>
		{/if}

		<div class="mt-12 pt-8 border-t border-gray-200">
			<a href="/events" class="text-primary hover:underline">← Back to Events</a>
		</div>
	</div>
</article>
