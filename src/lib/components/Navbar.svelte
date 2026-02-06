<script lang="ts">
	import { page } from '$app/state';

	let scrolled = $state(false);
	let mobileMenuOpen = $state(false);

	const navLinks = [
		{ href: '/about', label: 'About' },
		{ href: '/photos', label: 'Photos' },
		{ href: '/events', label: 'Events' },
		{ href: '/blog', label: 'Blog' },
		{ href: '/contact', label: 'Contact' }
	];

	function handleScroll() {
		if (!mobileMenuOpen) {
			scrolled = window.scrollY > 50;
		}
	}

	function toggleMenu() {
		mobileMenuOpen = !mobileMenuOpen;
	}

	function closeMenu() {
		mobileMenuOpen = false;
	}
</script>

<svelte:window onscroll={handleScroll} />

<nav
	class="fixed top-0 left-0 right-0 z-50 uppercase text-[1.1rem] transition-all duration-300
		{scrolled || mobileMenuOpen
		? 'bg-white shadow-md'
		: 'bg-transparent border-b border-white/20'}"
>
	<div class="max-w-7xl mx-auto px-4 sm:px-9">
		<div class="flex items-center justify-between h-16">
			<!-- Brand -->
			<a
				href="/"
				class="font-medium py-8 px-3 {scrolled || mobileMenuOpen
					? 'text-gray-900'
					: 'text-white'}"
				onclick={closeMenu}
			>
				Brian Cruikshank Acro
			</a>

			<!-- Desktop Nav -->
			<div class="hidden md:flex items-center gap-1">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class="py-8 px-3 transition-colors
							{scrolled ? 'text-gray-900 hover:text-primary' : 'text-white hover:text-white/80'}
							{page.url.pathname === link.href ? 'border-b border-current' : ''}"
					>
						{link.label}
					</a>
				{/each}
			</div>

			<!-- Mobile Burger -->
			<button
				type="button"
				class="md:hidden p-3 cursor-pointer {scrolled || mobileMenuOpen
					? 'text-gray-900'
					: 'text-white'}"
				aria-label="Toggle menu"
				aria-expanded={mobileMenuOpen}
				onclick={toggleMenu}
			>
				<span class="block w-5 h-0.5 bg-current mb-1"></span>
				<span class="block w-5 h-0.5 bg-current mb-1"></span>
				<span class="block w-5 h-0.5 bg-current"></span>
			</button>
		</div>

		<!-- Mobile Menu -->
		{#if mobileMenuOpen}
			<div class="md:hidden bg-white pb-4">
				{#each navLinks as link (link.href)}
					<a
						href={link.href}
						class="block py-3 px-3 text-gray-900 hover:text-primary
							{page.url.pathname === link.href ? 'border-l-2 border-primary' : ''}"
						onclick={closeMenu}
					>
						{link.label}
					</a>
				{/each}
			</div>
		{/if}
	</div>
</nav>
