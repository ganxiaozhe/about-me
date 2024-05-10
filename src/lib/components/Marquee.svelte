<script lang="ts">
	let className: string = '';
	export { className as class };

	export let hoverPause: boolean = false;
	export let fitContent: boolean = false;
	export let reverse: boolean = false;
	export let absolute: boolean = false;
	export let duration: number = 10;
	export let gap: string = '1rem';
  export let repeat: number = 1;

  const repeatList = new Array(repeat);
</script>

<div
	class="marquee {className}"
	class:hover-pause={hoverPause}
	class:fit-content={fitContent}
	class:reverse
	class:pos-absolute={absolute}
	style="--duration: {duration}s; --gap: {gap};"
>
	<div class="marquee__content">
    {#each repeatList as r}
		<slot />
    {/each}
	</div>
	<div class="marquee__content" aria-hidden="true">
		{#each repeatList as r}
		<slot />
    {/each}
	</div>
</div>

<style>
	/* Marquee styles */
	.marquee {
		position: relative;
		display: flex;
		gap: var(--gap);
		overflow: hidden;
		user-select: none;
	}

	.marquee__content {
		display: flex;
		gap: var(--gap);
		min-width: 100%;
		flex-shrink: 0;
		justify-content: space-around;
		animation: scroll 10s linear infinite;
		animation-duration: var(--duration);
	}

	@keyframes scroll {
		from {
			transform: translateX(0);
		}
		to {
			transform: translateX(calc(-100% - var(--gap)));
		}
	}

	/* Pause animation when reduced-motion is set */
	@media (prefers-reduced-motion: reduce) {
		.marquee__content {
			animation-play-state: paused !important;
		}
	}

	/* Reverse animation */
	.reverse .marquee__content {
		animation-direction: reverse;
	}

	/* Pause on hover */
	.hover-pause:hover .marquee__content {
		animation-play-state: paused;
	}

	/* Attempt to size parent based on content. Keep in mind that the parent width is equal to both content containers that stretch to fill the parent. */
	.fit-content {
		max-width: fit-content;
	}

	/* A fit-content sizing fix: Absolute position the duplicate container. This will set the size of the parent wrapper to a single child container. Shout out to Olavi's article that had this solution 👏 @link: https://olavihaapala.fi/2021/02/23/modern-marquee.html  */
	.pos-absolute .marquee__content:last-child {
		position: absolute;
		top: 0;
		left: 0;
		animation-name: scroll-abs;
	}
	@keyframes scroll-abs {
		from {
			transform: translateX(calc(100% + var(--gap)));
		}
		to {
			transform: translateX(0);
		}
	}
</style>
