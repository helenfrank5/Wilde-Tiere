import Home from "@src/components/Home.svelte";
import Quiz from "@components/Quiz.svelte";
import Start from "@components/Startseite.svelte";
import About from "./components/About.svelte";


export default {
	"/": Home,
	"/quiz": Quiz,
	"/start": Start,
	"/about": About,
};
