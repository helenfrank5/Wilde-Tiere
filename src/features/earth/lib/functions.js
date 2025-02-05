import Globe from "globe.gl";
import { GLOBE_BACKGROUND_COLOR, GLOBE_CONFIG_OPTIONS } from "./constants";

/**
 * Creates a new instance of the globe and returns it. It chooses
 * the default settings behind the Earth component.
 *
 * @param {null| HTMLDivElement} ref
 * @returns {import("globe.gl").GlobeInstance} A new instance of the globe
 */
export function creatEarth(ref) {
	const globe = new Globe(ref, GLOBE_CONFIG_OPTIONS)
		.backgroundColor(GLOBE_BACKGROUND_COLOR)
		.showGlobe(false)
		.showAtmosphere(false);

	return globe;
}
