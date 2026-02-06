<script lang="ts">
	import facebookIcon from '$lib/assets/facebook.svg';
	import instagramIcon from '$lib/assets/instagram.svg';
</script>

<footer class="py-8 text-center opacity-60">
	<div class="text-sm">
		<p>
			Website by
			<a
				href="https://www.brianswebstudio.com/"
				class="underline hover:no-underline"
				target="_blank"
				rel="noopener noreferrer"
			>
				Brian's Web Studio </a
			>. Made with <span class="text-red-500">♥</span> and
			<a
				href="https://svelte.dev/"
				class="underline hover:no-underline"
				target="_blank"
				rel="noopener noreferrer"
			>
				SvelteKit </a
			>.
		</p>

		<div class="flex justify-center gap-4 mt-4">
			<a
				href="https://www.facebook.com/brianrc"
				target="_blank"
				rel="me noopener noreferrer"
				aria-label="Facebook"
			>
				<img src={facebookIcon} alt="Facebook" class="w-6 h-6" />
			</a>
			<a
				href="https://www.instagram.com/briancruikshank"
				target="_blank"
				rel="me noopener noreferrer"
				aria-label="Instagram"
			>
				<img src={instagramIcon} alt="Instagram" class="w-6 h-6" />
			</a>
		</div>
	</div>
</footer>
