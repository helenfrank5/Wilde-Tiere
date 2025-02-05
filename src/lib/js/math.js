/**
 * Maps a value from one range to another range.
 * @param {number} value - The value to be mapped.
 * @param {number} minS - The minimum value of the source range.
 * @param {number} maxS - The maximum value of the source range.
 * @param {number} minT - The minimum value of the target range.
 * @param {number} maxT - The maximum value of the target range.
 * @returns {number} The mapped value in the target range.
 * @example
 *
 * // Map the value 50 from the range [0, 100] to the range [0, 1]
 * const mappedValue = map(50, 0, 100, 0, 1); // 0.5
 */
export function map(value, minS, maxS, minT, maxT) {
	return ((value - minS) / (maxS - minS)) * (maxT - minT) + minT;
}
