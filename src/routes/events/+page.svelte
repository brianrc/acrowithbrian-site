<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
</script>

<svelte:head>
	<title>Events | Brian Cruikshank Acro</title>
	<meta name="description" content="Upcoming acro events and workshops with Brian Cruikshank" />
</svelte:head>

<Hero title="Events" image="/img/events-1920x.jpg" />

<section class="py-16 px-4">
	<div class="max-w-4xl mx-auto text-center">
		<p class="text-lg text-muted mb-8">
			I travel around quite a bit. You can find me at these upcoming events!
		</p>

		<p class="text-muted mb-12">No upcoming events scheduled at this time.</p>

		<a
			href="/contact"
			class="inline-block border-2 border-primary text-primary px-6 py-3 hover:bg-primary hover:text-white transition-colors"
		>
			Contact for Private Lessons
		</a>
	</div>
</section>
