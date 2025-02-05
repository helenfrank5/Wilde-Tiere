<script>
	let { ref = $bindable() } = $props();
	let mouseDown = $state(false);
</script>

<svelte:body
	onmousedown={(e) => {
		mouseDown = true;
	}}
	onmouseup={(e) => {
		mouseDown = false;
	}}
/>

<div
	id="app-globe"
	class="fixed inset-0 w-full h-full data-[cursor=false]:cursor-grab data-[cursor=true]:cursor-grabbing"
	data-cursor={mouseDown}
	bind:this={ref}
></div>
