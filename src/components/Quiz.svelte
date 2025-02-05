<script>
	import JeopardyBoard from "./JeopardyBoard.svelte";
	import QuestionModal from "./QuestionModal.svelte";
	import { questions } from "../assets/questions.svelte.js";
	import { SvelteSet } from "svelte/reactivity";

	let selectedQuestion = $state(null);
	let answeredQuestions = new SvelteSet();
	let playerScores = $state([0, 0]);
	let currentPlayer = $state(0);
	const playerColors = $state(["#7C96AB", "#FF9100"]);
	const jeopardySound = new Audio("/audio/jeopardymusic.mp3");
	jeopardySound.loop = true;
	let showWinnerOverlay = $state(false);
	let winnerMessage = $state("");

	const handleQuestionSelect = ({ categoryIndex, questionIndex }) => {
		selectedQuestion = { categoryIndex, questionIndex };
	};

	const handleQuestionAnswered = (isCorrect) => {
		if (selectedQuestion) {
			const { categoryIndex, questionIndex } = selectedQuestion;
			const question = questions[categoryIndex].questions[questionIndex];

			if (isCorrect) {
				playerScores[currentPlayer] += question.points;
			}
			answeredQuestions.add(`${categoryIndex}-${questionIndex}`);
			selectedQuestion = null;
			currentPlayer = (currentPlayer + 1) % 2;
		}

		jeopardySound.pause();
		jeopardySound.currentTime = 0;

		if (
			answeredQuestions.size ===
			questions.reduce((sum, cat) => sum + cat.questions.length, 0)
		) {
			announceWinner();
		}
	};

	const announceWinner = () => {
		if (playerScores[0] > playerScores[1]) {
			winnerMessage = "Spieler 1 gewinnt!";
		} else if (playerScores[1] > playerScores[0]) {
			winnerMessage = "Spieler 2 gewinnt!";
		} else {
			winnerMessage = "Unentschieden!";
		}
		showWinnerOverlay = true;
	};

	const resetGame = () => {
		playerScores = [0, 0];
		answeredQuestions.clear();
		showWinnerOverlay = false;
	};

	$inspect(questions);
</script>

{#if showWinnerOverlay}
	<div
		class="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 bg-white shadow-lg p-4 sm:p-6 rounded-lg text-center z-50 w-11/12 sm:w-4/5 md:w-2/3 lg:w-1/2 h-auto flex flex-col items-center justify-center"
	>
		<h2 class="text-xl sm:text-2xl font-bold mb-4">{winnerMessage}</h2>
		<button class="bg-[#31511e] text-white py-2 px-4" onclick={resetGame}>
			Neues Spiel starten
		</button>
	</div>
{/if}

<main class="min-h-screen bg-[#FFFDF5] p-2 sm:p-4 md:p-6 lg:p-8 flex flex-col">
	<div class="flex-grow w-full flex flex-col">
		<h1
			class="text-4xl sm:text-3xl md:text-4xl font-bold font-miltonian text-center mb-4 sm:mb-6 pt-[8rem] text-[#123524]"
		>
			Jeopardy Quiz
		</h1>

		<p
			class="text-[16px] sm:text-base text-gray-800 mb-12 max-w-2xl mx-auto text-center"
		>
			Tritt gegen einen Freund an und entdecke, wer von euch beiden das
			bessere Wissen über die wilden Tiere dieser Welt hat!
		</p>

		<p class="text-[16px] sm:text-base text-center text-gray-800 mb-2">
			Aktueller Spieler: <span
				style="color: {playerColors[currentPlayer]}"
				>Spieler {currentPlayer + 1}</span
			>
		</p>

		<div
			class="scores flex flex-col sm:flex-row justify-between text-sm sm:text-base md:text-lg font-semibold mb-4 space-y-2 sm:space-y-0 sm:space-x-4"
		>
			<div
				class="player text-[16px] bg-white p-2 shadow rounded-lg border-[#859F3D] border-[1px] sm:w-1/4 text-center"
				style="color: {playerColors[0]}"
			>
				Spieler 1: {playerScores[0]} Punkte
			</div>

			<div
				class="player text-[16px] bg-white p-2 shadow rounded-lg border-[#859F3D] border-[1px] sm:w-1/4 text-center"
				style="color: {playerColors[1]}"
			>
				Spieler 2: {playerScores[1]} Punkte
			</div>
		</div>

		<div
			class="bg-white p-2 sm:p-4 rounded-lg shadow border-[#859F3D] border-[1px] mt-4 flex"
		>
			<JeopardyBoard
				{questions}
				{answeredQuestions}
				onSelectQuestion={handleQuestionSelect}
				{jeopardySound}
			/>
		</div>

		{#if selectedQuestion}
			<QuestionModal
				{selectedQuestion}
				{questions}
				onAnswered={handleQuestionAnswered}
			/>
		{/if}
	</div>
</main>

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
	button {
		margin: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		border-radius: 2rem;
	}
</style>
