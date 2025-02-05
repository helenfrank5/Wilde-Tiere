<script>
	import "ldrs/trio";
	import { GLOBE_POLYGON_CAP_MATERIAL_COLOR } from "@features/earth/lib/constants";
	import { scale } from "svelte/transition";
	import { backOut } from "svelte/easing";
	import { useEarth } from "@features/earth";

	const earth = useEarth();
</script>

{#if !earth.rerendered || earth.loading}
	<l-trio
		class="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
		size="40"
		speed="1.3"
		color={GLOBE_POLYGON_CAP_MATERIAL_COLOR}
		out:scale={{ opacity: 0, easing: backOut, duration: 700 }}
	></l-trio>
{/if}
