<script lang="ts">
	import Hero from '$lib/components/Hero.svelte';
	import contactHero from '$lib/assets/imgs/pages/contact-1920x.jpg?enhanced';

	let formState: 'idle' | 'submitting' | 'success' | 'error' = $state('idle');
	let errorMessage = $state('');

	async function handleSubmit(event: SubmitEvent) {
		event.preventDefault();
		formState = 'submitting';

		const form = event.target as HTMLFormElement;
		const formData = new FormData(form);

		try {
			const response = await fetch('/', {
				method: 'POST',
				headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
				body: new URLSearchParams(formData as unknown as Record<string, string>).toString()
			});

			if (response.ok) {
				formState = 'success';
				form.reset();
			} else {
				throw new Error('Form submission failed');
			}
		} catch (err) {
			formState = 'error';
			errorMessage = 'Something went wrong. Please try again or email directly.';
		}
	}
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

		{#if formState === 'success'}
			<div class="text-center py-12">
				<h2 class="text-2xl font-semibold text-green-600 mb-4">Thank You!</h2>
				<p class="text-lg text-muted mb-8">
					Thank you for your message! I'll get back to you as soon as possible.
				</p>
				<button
					type="button"
					onclick={() => (formState = 'idle')}
					class="inline-block border-2 border-primary text-primary px-6 py-3 hover:bg-primary hover:text-white transition-colors cursor-pointer"
				>
					Send Another Message
				</button>
			</div>
		{:else}
			<form
				name="contact"
				method="POST"
				data-netlify="true"
				data-netlify-honeypot="bot-field"
				class="space-y-6"
				onsubmit={handleSubmit}
			>
				<input type="hidden" name="form-name" value="contact" />

				<!-- Honeypot field for spam protection -->
				<div class="hidden">
					<label>
						Don't fill this out:
						<input name="bot-field" />
					</label>
				</div>

				{#if formState === 'error'}
					<div class="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded">
						{errorMessage}
					</div>
				{/if}

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
					disabled={formState === 'submitting'}
					class="bg-primary text-white px-8 py-3 font-medium hover:bg-primary/90 transition-colors cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
				>
					{formState === 'submitting' ? 'Sending...' : 'Send'}
				</button>
			</form>
		{/if}
	</div>
</section>
