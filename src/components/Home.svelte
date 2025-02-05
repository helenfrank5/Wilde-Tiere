<script>
	import { useEarth } from "@src/features/earth";
	import { quintOut } from "svelte/easing";
	import { X as Close } from "lucide-svelte/icons";
	import { fly } from "svelte/transition";
	import { Canvas } from "@threlte/core";
	import * as GLTF from "./gltf/index.js";
	import { OrbitControls } from "@threlte/extras";
	import { T } from "@threlte/core";
	import { onMount } from "svelte";

	const earth = useEarth();

	let response = $state(null);
	let Model = $state(null);

	const getUrl = async (title) => {
		const response = await fetch(
			`https://de.wikipedia.org/w/api.php?action=query&prop=extracts%7Cpageimages&exintro&explaintext&format=json&origin=*&titles=${encodeURIComponent(title)}&piprop=thumbnail&pithumbsize=300&redirects`,
		);
		return response.json();
	};

	const extractData = (data) => {
		if (!data)
			return {
				error: "No data",
			};

		const { query } = data;
		const keys = Object.keys(query.pages);
		const page = query.pages[keys[0]];

		let extract = page.extract || "";
		let sentences = extract.split(". ");
		extract =
			sentences.slice(0, 7).join(". ") +
			(sentences.length > 7 ? "." : "");

		return {
			title: page.title,
			extract: extract,
			thumbnail: page.thumbnail?.source,
		};
	};

	$effect(() => {
		if (earth.selectedElement !== null) {
			console.log(JSON.stringify(earth.selectedElement));

			response = getUrl(earth.selectedElement.name_german);
			Model = GLTF[earth.selectedElement.name.replace(/\s/gi, "")];
		}
	});

	onMount(() => {
		if (!localStorage.getItem("introShown")) {
			localStorage.setItem("introShown", "true");
			window.location.href = "/start";
		}
	});
</script>

{#if earth.selectedElement !== null}
	<div
		class="fixed p-2 overflow-x-hidden left-4 top-24 bottom-2 max-h-128 overflow-auto right-auto w-96 h-[80vh] bg-white/95 dark:bg-[#1c212c]/70 dark:text-white border-[#004401] dark:border-[#004401] backdrop-blur-xl rounded-md data-[hidden=true]:hidden"
		data-hidden={earth.selectedElement === null}
		in:fly={{
			y: 40,
			duration: 500,
			easing: quintOut,
			delay: 300,
			opacity: 0,
		}}
	>
		{#if earth.selectedElement.name_german}
			{#await response}
				<p>Loading...</p>
			{:then data}
				{@const d = extractData(data)}

				<div class="flex items-center pl-2 justify-between py-2">
					<h2
						class="mb-0 font-miltonian text-[#123524] dark:text-[#A8CD89]"
					>
						{d.title}
					</h2>
					<button
						class="p-3 bg-[#31511E] dark:bg-[#123524] dark:text-[#A8CD89] dark:border-[#123524] rounded-full mr-2"
						onclick={() => (earth.selectedElement = null)}
					>
						<Close size="16" />
					</button>
				</div>

				<div class="w-full h-60 mb-4">
					<Canvas>
						<Model>
							<T.PerspectiveCamera
								makeDefault
								position={[6, 6, 6]}
								fov={25}
							>
								<T.AmbientLight intensity={0.5} />
								<T.DirectionalLight
									intensity={3}
									position={[0, 2, 5]}
									castShadow
								/>
								<T.PointLight
									intensity={1.5}
									position={[2, 2, 2]}
								/>

								<OrbitControls
									enableDamping
									target={[0, 0, 0]}
								/>
							</T.PerspectiveCamera>
							<T.DirectionalLight
								intensity={3.0}
								position={[0, 2, 5]}
								castShadow
								shadow.bias={-0.0001}
							/>
						</Model>
					</Canvas>
				</div>

				{#if d.thumbnail}
					<img
						class="w-full h-44 object-cover rounded-md"
						src={d.thumbnail}
						alt={d.title}
					/>
				{/if}
				<p class="pt-4 m-0 dark:text-white">{d.extract}</p>
			{:catch error}
				<p>{error.message}</p>
			{/await}
		{/if}
	</div>
{/if}

<style>
	@font-face {
		font-family: "Miltonian Tattoo";
		src: url("/font/MiltonianTattoo-Regular.ttf") format("truetype");
		font-weight: normal;
		font-style: normal;
	}
	.font-miltonian {
		font-family: "Miltonian Tattoo", cursive;
	}
</style>
