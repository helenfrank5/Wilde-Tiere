import { fontFamily } from "tailwindcss/defaultTheme";

/** @type {import('tailwindcss').Config} */
export default {
	darkMode: ["class"],
	content: ["./src/**/*.{html,js,svelte,ts}"],
	safelist: ["dark"],
	theme: {
		extend: {
			colors: {
				background: "hsl(var(--background) / <alpha-value>)",
			},
			keyframes: {
				"zoom-in-down": {
					from: {
						opacity: 0,
						transform:
							"scale3d(0.1, 0.1, 0.1) translate3d(0, -100px, 0)",
						animationTimingFunction:
							"cubic-bezier(0.55, 0.055, 0.675, 0.19)",
					},
					"60%": {
						opacity: 1,
						transform:
							"scale3d(0.475, 0.475, 0.475) translate3d(0, 60px, 0)",
						animationTimingFunction:
							"cubic-bezier(0.175, 0.885, 0.32, 1)",
					},
				},
			},
			animation: {
				"zoom-in-down": "zoom-in-down 1s both ease-in-out",
			},
		},
	},
	plugins: [],
};
