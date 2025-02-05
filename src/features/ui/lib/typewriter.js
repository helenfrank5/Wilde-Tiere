export function typewriter(node, { speed = 1, value }) {
	if (value) return;
	const text = node.placeholder;
	const duration = text.length / (speed * 0.01);

	return {
		duration,
		tick: (t) => {
			const i = Math.trunc(text.length * t);
			node.placeholder = text.slice(0, i);
		},
	};
}
