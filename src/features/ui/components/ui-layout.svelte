<script>
	import { onMount } from "svelte";
	let { children, onmount, onresize } = $props();

	onMount(onmount);
</script>

<svelte:window {onresize} />

<div
	id="app-ui"
	class="relative w-full h-full min-h-screen max-h-screen overflow-x-none pointer-events-none [&>*]:pointer-events-auto"
>
	<!-- Rendere alle Kindslemente, die in deinem Markup vorkommen! -->
	{@render children?.()}
</div>
