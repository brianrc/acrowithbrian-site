# Acro with Brian

This is my personal acro yoga teacher website. It includes an event listing, blog of acroyoga videos, a photo gallery, and contact form.

## Tech Stack

This site is built with a modern, high-performance stack:

- **Framework**: [Svelte 5](https://svelte.dev/) & [SvelteKit 2](https://kit.svelte.dev/)
    - Fully static site generation (SSG) for maximum performance.
- **Styling**: [Tailwind CSS 4](https://tailwindcss.com/)
    - Modern, utility-first CSS integration.
- **Content**: [MDSVex](https://mdsvex.pngwn.io/)
    - Markdown-based management for blog posts and events.
- **Image Pipeline**: Custom `sharp`-based optimization script.
    - Automatic **AVIF** conversion for all site images.
    - Incremental processing with manifest tracking.

Hosted on Netlify.