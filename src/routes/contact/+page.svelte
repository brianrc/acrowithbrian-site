<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import contactHero from '$lib/assets/imgs/pages/contact-1920x.jpg?enhanced';
</script>

<svelte:head>
	<title>Contact | Brian Cruikshank Acro</title>
	<meta
		name="description"
		content="Contact Brian Cruikshank for private acro lessons, classes, or photography"
	/>
</svelte:head>

<Hero title="Contact" image={contactHero} />

<section class="py-16 px-4">
	<div class="max-w-2xl mx-auto">
		<p class="text-lg text-muted mb-8 text-center">
			To contact me about a private lesson, class, photo session, or anything else please email
			<em class="font-medium">brian@acrowithbrian.com</em> or use the form below.
		</p>

		<form
			name="contact"
			method="POST"
			action="/contact/thanks"
			data-netlify="true"
			data-netlify-honeypot="bot-field"
			class="space-y-6"
		>
			<input type="hidden" name="form-name" value="contact" />

			<!-- Honeypot field for spam protection -->
			<div class="hidden">
				<label>
					Don't fill this out:
					<input name="bot-field" />
				</label>
			</div>

			<div>
				<label for="name" class="block text-sm font-medium mb-2">Your name</label>
				<input
					type="text"
					id="name"
					name="name"
					required
					class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
				/>
			</div>

			<div>
				<label for="email" class="block text-sm font-medium mb-2">Email</label>
				<input
					type="email"
					id="email"
					name="email"
					required
					class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent"
				/>
			</div>

			<div>
				<label for="message" class="block text-sm font-medium mb-2">Message</label>
				<textarea
					id="message"
					name="message"
					required
					rows="5"
					class="w-full px-4 py-3 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-primary focus:border-transparent resize-y"
				></textarea>
			</div>

			<button
				type="submit"
				class="bg-primary text-white px-8 py-3 font-medium hover:bg-primary/90 transition-colors cursor-pointer"
			>
				Send
			</button>
		</form>
	</div>
</section>
