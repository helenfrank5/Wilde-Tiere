<script>
	import "ldrs/trio";
	import { useEarth } from "@features/earth/index";
	import { GLOBE_HTML_ELEMENTS_DATA } from "@features/earth/lib/constants";
	import * as UI from "../index";
	import Router from "svelte-spa-router";
	import { location } from "svelte-spa-router";
	import routes from "@src/routes";

	const earth = useEarth();
</script>

<UI.Layout
	onmount={() => earth.load(GLOBE_HTML_ELEMENTS_DATA)}
	onresize={(event) => earth.resize(event)}
>
	<UI.Loader />
	<UI.Nav />
	<UI.Markers />

	{#if $location !== "/start" && $location !== "/about" && $location !== "/quiz"}
		<UI.Input />
		<UI.ThemeToggle />
	{/if}

	<Router {routes} />
</UI.Layout>
