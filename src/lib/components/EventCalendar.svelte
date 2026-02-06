<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';
	import type { Event } from '$lib/types';

	interface Props {
		events: Event[];
	}

	let { events }: Props = $props();
	let mounted = $state(false);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let CalendarComponent: any = $state(null);
	// eslint-disable-next-line @typescript-eslint/no-explicit-any
	let plugins: any[] = $state([]);

	// Transform our events to @event-calendar format
	const calendarEvents = $derived(
		events.map((event) => ({
			id: event.slug,
			title: event.metadata.title,
			start: new Date(event.metadata.start),
			end: new Date(event.metadata.end),
			allDay: true,
			classNames: [
				event.metadata.category ? `cat-${event.metadata.category.toLowerCase()}` : '',
				event.metadata.teaching ? 'teaching' : ''
			].filter(Boolean),
			extendedProps: {
				slug: event.slug,
				location: event.metadata.location
			}
		}))
	);

	// Calendar options
	const options = $derived({
		view: 'listMonth',
		date: new Date(),
		headerToolbar: {
			start: 'prev,next today',
			center: 'title',
			end: 'listMonth dayGridMonth timeGridWeek'
		},
		buttonText: {
			today: 'Today',
			listMonth: 'List',
			dayGridMonth: 'Month',
			timeGridWeek: 'Week'
		},
		views: {
			listMonth: { duration: { months: 1 } },
			dayGridMonth: { duration: { months: 1 } },
			timeGridWeek: { duration: { weeks: 1 } }
		},
		events: calendarEvents,
		eventClick: (info: { event: { extendedProps: { slug: string } } }) => {
			goto(`/events/${info.event.extendedProps.slug}`);
		},
		height: '700px',
		noEventsContent: 'No events this month'
	});

	onMount(async () => {
		const ec = await import('@event-calendar/core');
		CalendarComponent = ec.Calendar;
		plugins = [ec.DayGrid, ec.List, ec.TimeGrid];
		mounted = true;
	});
</script>

<svelte:head>
	<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/@event-calendar/core@5/index.min.css" />
</svelte:head>

<div class="event-calendar">
	{#if mounted && CalendarComponent}
		<CalendarComponent {plugins} {options} />
	{:else}
		<div class="flex items-center justify-center h-64 text-muted">Loading calendar...</div>
	{/if}
</div>

<style>
	.event-calendar {
		margin: 0 auto;
		max-width: 1200px;
	}

	.event-calendar :global(.ec) {
		font-family: inherit;
	}

	.event-calendar :global(.ec-toolbar) {
		margin-bottom: 1rem;
	}

	.event-calendar :global(.ec-button) {
		text-transform: capitalize;
	}
</style>
