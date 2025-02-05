<script>
	import { onMount } from "svelte";
	import { Earth } from "../index";
	import { setEarth } from "../lib/earth-context-provider.svelte";
	import { UI } from "@features/ui/index";
	import { creatEarth } from "../lib/functions";

	let props = $props();
	/** @type {null | HTMLDivElement} */ let ref = $state();
	/** @type {import("globe.gl").GlobeInstance} */ let earth = $state();

	/**
	 * Firstly, we create the Earth instance by invoking a custom
	 * function called `creatEarth`. It then returns a `GlobeInstance`
	 * with predefined configurations.
	 */
	onMount(() => {
		earth = creatEarth(ref);
	});

	/**
	 * As soon as the Globe is created, we set it in the context
	 * to provide it to the children for programmatic use.
	 */
	$effect(() => {
		if (earth) {
			setEarth(earth);
		}
	});
</script>

<Earth bind:ref />

{#if earth}
	<UI />
	{@render props?.children?.()}
{/if}
