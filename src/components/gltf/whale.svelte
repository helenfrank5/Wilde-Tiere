<!--
Auto-generated by: https://github.com/threlte/threlte/tree/main/packages/gltf
Command: npx @threlte/gltf@3.0.0 ./gltf/whale/scene.gltf --transform
Author: CARI'MAM (https://sketchfab.com/CARIMAM)
License: CC-BY-NC-SA-4.0 (http://creativecommons.org/licenses/by-nc-sa/4.0/)
Source: https://sketchfab.com/3d-models/humpback-whale-f85fe853de6b4ff4a0bb3cfed2bc14a4
Title: Humpback whale
-->

<script>
	import { T } from "@threlte/core";
	import { useDraco, useGltf } from "@threlte/extras";

	let { fallback, error, children, ref = $bindable(), ...props } = $props();

	const dracoLoader = useDraco();
	const gltf = useGltf("/glb/whale.glb", {
		dracoLoader,
	});
</script>

<T.Group bind:ref dispose={false} {...props}>
	{#await gltf}
		{@render fallback?.()}
	{:then gltf}
		<T.Group rotation={[-Math.PI / 2, 0, 0]} scale={285.71}>
			<T.Mesh
				geometry={gltf.nodes.polySurface1_lambert1_0.geometry}
				material={gltf.materials.lambert1}
				rotation={[Math.PI / 2, 0, 0]}
				scale={0.01}
			/>
		</T.Group>
	{:catch err}
		{@render error?.({ error: err })}
	{/await}

	{@render children?.({ ref })}
</T.Group>
