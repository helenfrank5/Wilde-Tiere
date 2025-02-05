import ollama from "ollama/browser";

export async function chat(messages, tools) {
	const response = await ollama.chat({
		model: "llama3.2:3b",
		messages,
		stream: false,
		tools,
	});
	return response;
}
