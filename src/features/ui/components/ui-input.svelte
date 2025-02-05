<script>
	import { typewriter } from "../lib/typewriter";
	import { FUNCTION_TOOLS, placeholderMessages } from "../lib/constants";
	import { useEarth } from "@features/earth";
	import { chat } from "../lib/ollama";
	import { LoaderCircle, RotateCcwIcon } from "lucide-svelte";

	const earth = useEarth();
	const functions = {
		slice_to: earth.sliceTo,
		search_by_groupname: earth.searchByGroupname,
	}; // functions[name] -> functions["search_by_groupname"] -> earth.searchByGroupname

	let i = $state(-1);
	let processing = $state(false);
	let value = $state("");

	$effect(() => {
		const interval = setInterval(() => {
			i += 1;
			i %= placeholderMessages.length;
		}, 7500);

		return () => {
			clearInterval(interval);
		};
	});

	function handleReset() {
		value = "";
		if (earth.data.length < earth.total) earth.resetData();
	}

	async function handleOnChange() {
		processing = true;
		let messages = [
			{
				role: "user",
				content: value,
			},
		];
		value = "";
		const { done_reason, message } = await chat(messages, FUNCTION_TOOLS);

		if (done_reason === "stop" && Array.isArray(message.tool_calls)) {
			const tools = message.tool_calls;
			console.log(tools);

			for (let i = 0; i < tools?.length; i++) {
				const name = tools[i].function.name;
				const args = tools[i].function.arguments;

				if (name === undefined && args === undefined) {
					break;
				}

				if (functions[name]) {
					functions[name].bind(earth)(args || undefined);
					break;
				} else {
					continue;
				}
			}
		}
		processing = false;
	}
</script>

<div
	class="absolute left-1/2 transform -translate-x-1/2 bottom-2 flex pb-4 items-center gap-x-2 w-full max-w-[540px]"
>
	<input
		id="input:search"
		class="rounded-full bg-white dark:bg-[#1c212c]/70 backdrop-blur-xl border-[#004401] dark:border-[#A8CD89]"
		style="margin-bottom: 0; padding: .5rem 1.25rem; width: 100%;"
		name="prompt"
		placeholder={placeholderMessages[i] || ""}
		aria-busy="true"
		onchange={handleOnChange}
		bind:value
		in:typewriter={{ speed: 5, value }}
	/>

	<button
		class="bg-white border-[#004401] secondary dark:border-[#A8CD89] dark:bg-[#1c212c]/70 rounded-full aspect-square"
		title="Reset all data"
		onclick={handleReset}
		disabled={processing}
	>
		{#if processing}
			<LoaderCircle
				class="bg-white animate-spin text-[#004401] dark:text-white dark:border-[#A8CD89]"
				size={16}
			/>
		{:else}
			<RotateCcwIcon
				class="text-[#004401] dark:text-[#A8CD89]"
				size={16}
			/>
		{/if}
	</button>
</div>
