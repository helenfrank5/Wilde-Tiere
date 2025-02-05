import Root from "./components/earth.svelte";
import ContextProvider from "./components/earth-context-provider.svelte";
import { useEarth } from "./lib/earth-context-provider.svelte";

export {
	Root,
	ContextProvider,
	//
	Root as Earth,
	ContextProvider as EarthContextProvider,
	useEarth,
};
