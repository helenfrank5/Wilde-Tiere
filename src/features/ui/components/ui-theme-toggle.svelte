<script>
	import { toggleMode, mode } from "mode-watcher";
	import { Moon, Sun } from "lucide-svelte";
	import { useEarth } from "@src/features/earth";

	const earth = useEarth();
</script>

<button
	class="z-[10000] p-2 m-0 fixed top-24 right-6 text-[#123524] bg-[#A8CD89] border-[#A8CD89] dark:border-[#A8CD89] dark:text-[#123524] w-12 h-12 flex items-center justify-center rounded-full"
	on:click={() => {
		toggleMode();
		earth.setTheme($mode);
		document.querySelector("html").dataset.theme = $mode;
	}}
>
	{#if $mode === "dark"}
		<Sun stroke-width="1" />
	{:else}
		<Moon stroke-width="1" />
	{/if}
</button>
