<script>
	import { onMount } from "svelte";
	import { Heart, HeartOff } from "lucide-svelte";

	let animals = [];
	let favorites = [];

	onMount(async () => {
		// Tiere laden
		const response = await fetch("/json/animaldata1.json");
		animals = await response.json();

		// Favoriten aus dem localStorage holen
		if (typeof window !== "undefined") {
			const storedFavorites = localStorage.getItem("favorites");
			favorites = storedFavorites ? JSON.parse(storedFavorites) : [];
		}
	});

	// Tier zu Favoriten hinzufügen oder entfernen
	function toggleFavorite(animal) {
		if (favorites.some((fav) => fav.name_german === animal.name_german)) {
			favorites = favorites.filter(
				(fav) => fav.name_german !== animal.name_german,
			);
		} else {
			favorites = [...favorites, animal];
		}

		// Favoriten in localStorage speichern
		localStorage.setItem("favorites", JSON.stringify(favorites));
	}

	// Prüft, ob ein Tier in den Favoriten ist
	function isFavorite(animal) {
		return favorites.some((fav) => fav.name_german === animal.name_german);
	}
</script>

<div class="background">
	<h1 class="font-miltonian text-[#123524] text-center pt-[10rem] text-4xl">
		Alle Tiere in der Übersicht
	</h1>
	<p class="text-center pb-10 max-w-4xl mx-auto sm:max-w-2xl px-6 sm:px-8">
		Hier findest du alle Tiere auf einen Blick! Entdecke die Vielfalt und
		wähle deine Lieblinge – mit der Favoritenfunktion kannst du die Tiere,
		die dir besonders am Herzen liegen, ganz einfach markieren.
	</p>

	<!-- Zeige Favoriten zuerst -->
	{#if favorites.length > 0}
		<h2 class="h2">Deine Favoriten</h2>
		<div class="animal-list">
			{#each favorites as animal}
				<div class="animal-card">
					<!-- Herz-Button -->
					<button
						class="favorite-button"
						on:click={() => toggleFavorite(animal)}
					>
						{#if isFavorite(animal)}
							<HeartOff class="w-6 h-6 text-gray-500" />
						{:else}
							<Heart class="w-6 h-6 text-red-500" />
						{/if}
					</button>

					<img
						class="animal-image"
						src={`/png/${animal.src}`}
						alt={animal.name_german}
					/>
					<div class="animal-info">
						<h2>{animal.name_german}</h2>
						<p><strong>Gewicht:</strong> {animal.max_weight} kg</p>
						<p><strong>Größe:</strong> {animal.max_length} cm</p>
						<p><strong>FunFact:</strong> {animal.trivia_german}</p>
					</div>
				</div>
			{/each}
		</div>
	{/if}

	<h2 class="h2">Alle Tiere</h2>

	<div class="animal-list">
		{#each animals as animal}
			<div class="animal-card">
				<!-- Herz-Button -->
				<button
					class="favorite-button"
					on:click={() => toggleFavorite(animal)}
				>
					{#if isFavorite(animal)}
						<Heart class="w-6 h-6 text-red-500" />
					{:else}
						<Heart class="w-6 h-6 text-gray-500" />
					{/if}
				</button>

				<img
					class="animal-image"
					src={`/png/${animal.src}`}
					alt={animal.name_german}
				/>
				<div class="animal-info">
					<h2>{animal.name_german}</h2>
					<p><strong>Gewicht:</strong> {animal.max_weight} kg</p>
					<p><strong>Größe:</strong> {animal.max_length} cm</p>
					<p><strong>FunFact:</strong> {animal.trivia_german}</p>
				</div>
			</div>
		{/each}
	</div>
</div>

<footer class="bg-[#A8CD89] text-white py-8">
	<div class="max-w-5xl mx-auto text-center">
		<p class="text-[#123524] mb-2">
			Helen Frank<br />IG3 WiSe2425<br />Programmiersprachen 3
		</p>
		<p class="text-[#123524] mb-2">Tierwelt. Alle Rechte vorbehalten.</p>
	</div>
</footer>

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

	.background {
		margin: 0;
		padding: 0;
		width: 100vw;
		min-height: 100vh;
		background-color: #f6fcdf;
	}

	.h1,
	.h2 {
		text-align: center;
		color: #123524;
	}

	.h2 {
		font-family: "Miltonian Tattoo", cursive;
		font-size: 2rem;
		margin-bottom: 1rem;
		color: #123524;
	}

	.animal-list {
		display: grid;
		grid-template-columns: repeat(auto-fit, minmax(300px, 1fr));
		gap: 20px;
		padding: 20px;
		justify-content: center;
		max-width: 1200px;
		margin: 0 auto;
	}

	.animal-card {
		position: relative;
		display: flex;
		align-items: center;
		background: white;
		border-color: #859f3d;
		border-width: 1px;
		padding: 15px;
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}

	.animal-image {
		width: 120px;
		height: 120px;
		object-fit: contain;
		border-radius: 10px;
		margin-right: 20px;
	}

	.animal-info {
		flex: 1;
		font-size: 0.9rem;
		overflow-wrap: break-word;
		word-break: break-word;
	}

	.favorite-button {
		position: absolute;
		top: 1px;
		right: 1px;
		background: none;
		border: none;
		font-size: 1.5rem;
		cursor: pointer;
	}

	.footer {
		background-color: green;
		text-align: center;
		padding: 20px;
		width: 100%;
		height: 150px;
		position: relative;
		margin-top: auto;
	}
</style>
