<script>
	export let selectedQuestion;
	export let questions;
	export let onAnswered;

	let userAnswer = "";
	let feedbackMessage = "";
	let showNextButton = false;

	const question =
		questions[selectedQuestion.categoryIndex].questions[
			selectedQuestion.questionIndex
		];

	const submitAnswer = () => {
		const isCorrect =
			userAnswer.trim().toLowerCase() === question.answer.toLowerCase();

		if (isCorrect) {
			feedbackMessage = "Correct!";
			showNextButton = true; // Zeige den "Weiter"-Button an
		} else {
			feedbackMessage = `Leider falsch, die richtige Antwort wäre: "${question.answer}"`;
			showNextButton = true; // Zeige den "Weiter"-Button auch bei falscher Antwort
		}

		// Das Signal, dass die Frage beantwortet wurde, erfolgt nach dem Klicken auf "Weiter".
	};

	const goToNext = () => {
		const isCorrect =
			userAnswer.trim().toLowerCase() === question.answer.toLowerCase();

		// Werte zurücksetzen und das Spiel fortsetzen
		showNextButton = false;
		userAnswer = "";
		feedbackMessage = "";

		// Signalisiere, ob die Antwort korrekt war oder nicht
		onAnswered(isCorrect);
	};
</script>

<div class="modal">
	<div class="modal-content sm:w-[90%]">
		<h2 class="text-[#31511e] pb: 4rem text-2xl font-bold">
			{question.question}
		</h2>
		<p>
			Gebe hier den Namen des Tieres ein, auf den sich diese Aussage
			beziehen könnte.
		</p>

		<!-- Eingabefeld für die Antwort -->
		<input
			bind:value={userAnswer}
			type="text"
			placeholder="Deine Antwort"
			disabled={feedbackMessage !== ""}
		/>

		<!-- Submit-Button -->
		<button
			on:click={submitAnswer}
			disabled={feedbackMessage !== ""}
			class="bg-[#31511e] text-white py-2 px-4"
		>
			Antwort abschicken
		</button>

		<!-- Back-Button -->
		<button
			on:click={() => onAnswered(false)}
			disabled={feedbackMessage !== ""}
			class="bg-[#31511e] bg-opacity-50 text-white py-2 px-4 border-none"
		>
			Zurück (ohne Punkte)
		</button>

		<!-- Feedback-Nachricht -->
		{#if feedbackMessage}
			<p>{feedbackMessage}</p>
		{/if}

		<!-- "Weiter"-Button -->
		{#if showNextButton}
			<button
				on:click={goToNext}
				class="mt-4 bg-blue-500 text-white py-3 px-6 rounded"
			>
				Weiter
			</button>
		{/if}
	</div>
</div>

<style>
	p {
		padding-top: 4rem;
		color: rgb(22, 11, 11);
		font-size: 14px;
	}
	.modal {
		position: fixed;
		top: 0;
		left: 0;
		width: 100vw;
		height: 100vh;
		background-color: rgba(95, 95, 95, 0.7);
		display: flex;
		justify-content: center;
		align-items: center;
	}
	.modal-content {
		background: rgb(255, 255, 255);
		padding: 2rem;
		width: 60%;
		padding-top: 5rem;
		border-radius: 8px;
		text-align: center;
	}
	input {
		width: 100%;
		padding: 1rem;
		margin: 1rem 0;
		border-radius: 2rem;
		border-color: #31511e;
	}
	button {
		margin: 0.5rem;
		padding: 0.5rem 1rem;
		font-size: 1rem;
		border-radius: 2rem;
	}

	/* Stil für den "Weiter"-Button */
	.mt-4 {
		margin-top: 1rem;
	}
	.bg-blue-500 {
		background-color: #31511e;
	}
	.text-white {
		color: #ffffff;
	}
	.py-2 {
		padding-top: 0.5rem;
		padding-bottom: 0.5rem;
	}
	.px-4 {
		padding-left: 1rem;
		padding-right: 1rem;
	}
	.rounded {
		border-radius: 2rem;
	}

	/* Mobile styles */
	@media (max-width: 640px) {
		.modal-content {
			width: 90%; /* Verkleinert die Breite des Modal-Containers auf 80% auf Smartphones */
			padding: 1.5rem; /* Reduziert das Padding */
		}
		p {
			font-size: 14px;
		}
	}
</style>
