<script>
	export let questions;
	export let answeredQuestions;
	export let onSelectQuestion;
	export let jeopardySound;

	const selectQuestion = (categoryIndex, questionIndex) => {
		const questionKey = `${categoryIndex}-${questionIndex}`;
		if (!answeredQuestions.has(questionKey)) {
			if (jeopardySound) {
				jeopardySound.currentTime = 0;
				jeopardySound.play();
			}
			onSelectQuestion({ categoryIndex, questionIndex });
		}
	};
</script>

<div class="flex flex-col sm:flex-row gap-2 sm:gap-4 w-full h-full">
	{#each questions as category, categoryIndex}
		<div class="category flex-1 flex flex-col">
			<h3
				class="text-gray-800 text-sm sm:text-base font-semibold mb-2 text-center w-full"
			>
				{category.category}
			</h3>
			<div class="flex sm:text-xs flex-col gap-2 flex-grow">
				{#each category.questions as question, questionIndex}
					<button
						class="py-4 px-6 font-medium rounded-md transition duration-100 ease-in-out flex-grow"
						class:answered={answeredQuestions.has(
							`${categoryIndex}-${questionIndex}`,
						)}
						on:click={() =>
							selectQuestion(categoryIndex, questionIndex)}
						disabled={answeredQuestions.has(
							`${categoryIndex}-${questionIndex}`,
						)}
					>
						{question.points}
					</button>
				{/each}
			</div>
		</div>
	{/each}
</div>

<style>
	button {
		background-color: #a8cd89;
		color: #123524;
		border-color: #a8cd89;
	}

	button.answered {
		background-color: #868686;
		color: white;
		cursor: not-allowed;
	}

	button:disabled {
		opacity: 1;
	}

	button:not(.answered):hover {
		background-color: #123524;
		color: white;
	}

	@media (hover: hover) {
		button:not(.answered):hover {
			box-shadow: 0 2px 4px rgba(0, 0, 0, 0.2);
			background-color: #123524;
		}
	}
</style>
