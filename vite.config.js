import { defineConfig } from "vite";
import { svelte } from "@sveltejs/vite-plugin-svelte";
import path from "path";

// https://vite.dev/config/
export default defineConfig({
	// Source: https://dev.to/tilly/aliasing-in-vite-w-typescript-1lfo
	resolve: {
		alias: {
			"@lib": path.resolve(__dirname, "./src/lib"),
			"@features": path.resolve(__dirname, "./src/features"),
			"@components": path.resolve(__dirname, "./src/components"),
			"@src": path.resolve(__dirname, "./src"),
		},
	},
	plugins: [svelte()],
});
