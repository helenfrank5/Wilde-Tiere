<script>
	import { useEarth } from "@features/earth/index";
	import { map } from "@lib/js/math";
	import { CatIcon } from "lucide-svelte/icons";

	let refs = $state([]);
	const earth = useEarth();

	$effect(() => {
		if (earth.data) {
			refs = new Array(earth.dataOffset);
			const clone = structuredClone($state.snapshot(earth.data)).map(
				(d, i, arr) => ({ ...d, id: i }),
			);

			earth.globe
				.htmlElementsData(clone)
				// @ts-ignore
				.htmlElement((d) => refs[d.id])
				.htmlTransitionDuration(2000);

			earth.rerendered = true;
		}
	});
</script>

{#if earth.rerendered}
	{#each earth?.data as d, i (d)}
		<div
			class="cursor-pointer hover:animate-pulse pointer-events-auto w-12"
			bind:this={refs[i]}
		>
			<button
				class="flex gap-x-1 items-center animate-zoom-in-down w-auto px-2 py-3 h-12 duration-300 p-2 focus:ring-2 rounded-lg"
				style="cursor: pointer !important; animation-delay: 500ms; background-color: transparent; border: none;"
				style:scale={map(
					earth.zoomDetails?.altitude,
					1e-4,
					99,
					1.125,
					0.025,
				)}
				class:hidden={earth.zoomDetails?.altitude > 12}
				onclick={() => {
					let { lat, lng } = d;
					console.log(lat, lng);

					console.log($state.snapshot(d));
					earth.globe.pointOfView(
						{
							lat,
							lng,
							// HINT: Hier ranzoomen!
							altitude: 1,
						},
						500,
					);

					// Passiert was...
					earth.selectedElement = d;
				}}
				onblur={() => {
					// earth.selectedElement = null; // Hier ausgeschalten wegen Wikipedia API
				}}
			>
				<div>
					<img
						src={`/png/${d.src}`}
						alt=""
						class="min-w-16 h-auto rounded-lg"
					/>
				</div>
				<div class="w-auto"></div>
			</button>
		</div>
	{/each}
{/if}
