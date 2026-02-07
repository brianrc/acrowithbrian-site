<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
</script>

<svelte:head>
	<title>Thank You | Brian Cruikshank Acro</title>
</svelte:head>

<Hero title="Thank You" image="/src/lib/assets/imgs/pages/contact-1920x.jpg" />

<section class="py-16 px-4">
	<div class="max-w-2xl mx-auto text-center">
		<p class="text-xl text-muted mb-8">
			Thank you for your message! I'll get back to you as soon as possible.
		</p>

		<a
			href="/"
			class="inline-block border-2 border-primary text-primary px-6 py-3 hover:bg-primary hover:text-white transition-colors"
		>
			Back to Home
		</a>
	</div>
</section>
