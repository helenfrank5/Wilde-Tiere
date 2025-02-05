<script>
	import { onMount } from "svelte";

	let currentPath = "/";

	const setActiveLink = () => {
		currentPath = window.location.hash.slice(1) || "/";
	};

	onMount(() => {
		setActiveLink();
		window.addEventListener("hashchange", setActiveLink);
		return () => window.removeEventListener("hashchange", setActiveLink);
	});
</script>

<nav class="z-[9999] fixed w-full h-20 flex items-center bg-[#A8CD89] px-6">
	<!-- Logo -->
	<!-- Logo mit Link zur Startseite -->
	<a href="/#/start" class="logo-link flex items-center w-12 h-auto mr-6">
		<img src="/png/logo1.png" alt="Logo" class="h-center w-auto" />
	</a>

	<!-- Navigation links neben dem Logo -->
	<ul class="flex items-center space-x-2">
		<li>
			<a
				href="/#/"
				class="nav-link inline-block text-[#123524] px-4 py-2 transition duration-300 hover:bg-white/20"
				class:active={currentPath === "/"}
			>
				Weltkugel
			</a>
		</li>
		<li>
			<a
				href="/#/quiz"
				class="nav-link inline-block text-[#123524] px-4 py-2 transition duration-300 hover:bg-white/20"
				class:active={currentPath === "/quiz"}
			>
				Quiz
			</a>
		</li>
		<li>
			<a
				href="/#/about"
				class="nav-link inline-block text-[#123524] px-4 py-2 transition duration-300 hover:bg-white/20"
				class:active={currentPath === "/about"}
			>
				Tiere
			</a>
		</li>
	</ul>
</nav>

<style>
	.nav-link {
		position: relative;
		display: inline-block;
	}

	.nav-link.active::after {
		content: "";
		position: absolute;
		left: 0;
		bottom: -2px;
		width: 100%;
		height: 2px;
		background-color: #004401;
	}
</style>
