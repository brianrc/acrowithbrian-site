// See https://svelte.dev/docs/kit/types#app.d.ts
// for information about these interfaces
declare global {
	namespace App {
		// interface Error {}
		// interface Locals {}
		// interface PageData {}
		// interface PageState {}
		// interface Platform {}
	}
}

declare module '@event-calendar/core' {
	import type { Component } from 'svelte';
	export const Calendar: Component<{ plugins: unknown[]; options: unknown }>;
	export const DayGrid: unknown;
	export const List: unknown;
	export const TimeGrid: unknown;
}

export { };
