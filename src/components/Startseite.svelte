<div class="bg-[#F6FCDF]">
	<!-- Gesamter Wrapper für weißen Hintergrund -->
	<div
		class="relative w-full h-screen bg-cover bg-center bg-no-repeat"
		style="background-image: url('/png/hintergrund2.jpg')"
	>
		<h1
			class="absolute inset-0 flex items-center justify-center text-[#123524] text-5xl text-center font-miltonian leading-relaxed"
			style="text-shadow: 2px 2px 0 #FFFFFF, -2px -2px 0 #FFFFFF, 2px -2px 0 #FFFFFF, -2px 2px 0 #FFFFFF;"
		>
			Erfahre mehr über <br /> die Wilden Tiere dieser Welt!
		</h1>
		<img
			src="/png/pfeil1.png"
			alt="Pfeil nach unten"
			class="absolute bottom-14 left-1/2 transform -translate-x-1/2 w-auto h-8"
		/>
	</div>
	<!--Weltkugel-->
	<main class="max-w-6xl mx-auto px-4 py-12">
		<section class="flex flex-col md:flex-row items-center mb-16">
			<img
				src="/weltkugel.png"
				alt="Weltkarte"
				class="thumbnail w-full md:w-1/2 h-auto object-cover mb-6 md:mb-0 md:mr-8"
			/>
			<div class="md:w-1/2">
				<h2 class="text-black text-2xl font-bold mb-4">
					Entdecke die Weltkarte
				</h2>
				<p class="mb-4">
					Auf der Weltkarte findest ein Auswahl an Wilden Tieren, wenn
					du auf die Tier klickst kannst du mehr über sie erfahren.
					Wenn du mehr erfahren willst, klicke hier.
				</p>
				<a
					href="/#/home"
					class="inline-block bg-[#31511E] text-white py-2 px-4 rounded-full hover:bg-[#123524] transition duration-100"
					>Zur Weltkarte</a
				>
			</div>
		</section>
		<!--Quiz -->
		<section class="flex flex-col md:flex-row-reverse items-center mb-16">
			<img
				src="/Quiz.png"
				alt="Quiz"
				class="thumbnail w-full md:w-1/2 h-auto object-cover mb-6 md:mb-0 md:ml-8"
			/>
			<div class="md:w-1/2">
				<h2 class="text-2xl font-bold mb-4">Quiz Jeopardy</h2>
				<p class="mb-4">
					Teste dein Wissen über wilde Tiere in unserem spannenden
					Quiz!
				</p>
				<a
					href="/#/quiz"
					class="inline-block bg-[#31511E] text-white py-2 px-4 rounded-full hover:bg-[#123524] transition duration-100"
					>Zum Quiz</a
				>
			</div>
		</section>
		<!--Tiere -->
		<section class="flex flex-col md:flex-row items-center mb-16">
			<img
				src="/Tiere.png"
				alt="Lieblingstiere"
				class="thumbnail w-full md:w-1/2 h-auto object-cover mb-6 md:mb-0 md:mr-8"
			/>
			<div class="md:w-1/2">
				<h2 class="text-2xl font-bold mb-4">Tiere im Überblick</h2>
				<p class="mb-4">
					Schau dir alle Tiere in der Übersicht an und favourisiere
					deine Lieblingstiere.
				</p>
				<a
					href="/#/about"
					class="inline-block bg-[#31511E] text-white py-2 px-4 rounded-full hover:bg-[#123524] transition duration-100"
					>Zu den Tieren</a
				>
			</div>
		</section>
	</main>

	<footer class="bg-[#A8CD89] text-white py-8">
		<div class="max-w-5xl mx-auto text-center">
			<p class="text-[#123524] mb-2">
				Helen Frank<br />IG3 WiSe2425<br />Programmiersprachen 3
			</p>
			<p class="text-[#123524] mb-2">
				Tierwelt. Alle Rechte vorbehalten.
			</p>
		</div>
	</footer>
</div>

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
	img.thumbnail {
		border-radius: 10px;
		box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
	}
</style>
