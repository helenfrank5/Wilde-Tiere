import { getContext, setContext } from "svelte";
import * as topojson from "topojson-client";
import {
	GLOBE_POLYGON_CAP_MATERIAL_COLOR,
	GLOBE_POLYGON_SIDE_COLOR,
	GLOBE_POLYGONS_DATA,
	SYMBOL_KEY,
} from "./constants";
import { DoubleSide, MeshLambertMaterial } from "three";

class EarthState {
	/**
	 * Specifies if the globe has been initialized and is being rebuilt.
	 * @type {boolean}
	 */
	rerendered = $state(false);
	/**
	 * Specifies if the globe is currently loading custom data as requested by the user.
	 * @type {boolean}
	 */
	loading = $state(false);
	/**
	 * The clicked globe coordinates provided by `onGlobeClick`.
	 * @type {null | {lat: number, lng: number, altitude?: number}}
	 */
	coordinatesOnClick = $state(null);
	/**
	 * The MouseEvent provided by `onGlobeClick`.
	 * @type {null | MouseEvent}
	 */
	eventOnClick = $state(null);
	/**
	 * The clicked polygon provided by `onPolygonClick`.
	 * @type {object | null}
	 */
	polygonOnClick = $state(null);
	/**
	 * This is the original data store of the globe. This variable
	 * holds any arbitrary data that you want to store and access
	 *
	 * @type {Array<any>}
	 */
	#data = [];
	/**
	 * This is the common data store of the globe. This variable
	 * holds any arbitrary data that you want to store and access
	 *
	 * @type {Array<any>}
	 */
	data = $state(null);
	/**
	 * The offset of the data array to slice and display.
	 * @type {number} The offset of the data array
	 */
	dataOffset = $state(50);
	/**
	 * The details about the zoom event provided by `onZoom`.
	 *
	 * @type {{lat: number, lng: number, altitude: number} | null}
	 */
	zoomDetails = $state(null);
	/**
	 * This boolean specifies if the globe is active or not
	 * @type {boolean}
	 */
	activated = $state(true);
	/**
	 * This is the currently selected element by the user. Please have
	 * a look at UI.Markers
	 *
	 * @type {{[key: string]: any}}
	 */
	selectedElement = $state(null);
	/**
	 * This is the currently selected theme by the user.
	 */
	theme = $state("light");

	/**
	 * @param {import("globe.gl").GlobeInstance} globe
	 */
	constructor(globe) {
		this.globe = globe;

		this.globe.onGlobeReady(async () => {
			try {
				const responsePoly = await fetch(GLOBE_POLYGONS_DATA);
				const dataPoly = await responsePoly.json();
				const features = topojson.feature(
					dataPoly,
					dataPoly.objects.land
					// @ts-ignore
				).features;

				const material = new MeshLambertMaterial({
					color: GLOBE_POLYGON_CAP_MATERIAL_COLOR,
					side: DoubleSide,
				});
				this.globe
					.polygonsData(features)
					.polygonCapMaterial(material)
					.polygonSideColor(() => GLOBE_POLYGON_SIDE_COLOR)
					.onPolygonHover(() => false);
			} catch (e) {
				console.error(e);
			}
		});

		this.globe.onGlobeClick(({ lat, lng }, event) => {
			this.coordinatesOnClick = { lat, lng };
			this.eventOnClick = event;
		});

		this.globe.onPolygonClick((polygon, event, { lat, lng }) => {
			this.polygonOnClick = polygon;
			this.eventOnClick = event;
			this.coordinatesOnClick = { lat, lng };
		});

		this.globe.onZoom(({ lat, lng, altitude }) => {
			this.zoomDetails = { lat, lng, altitude };
		});

		let controls = this.globe.controls();
		controls.autoRotate = true;
		controls.autoRotateSpeed = 0.125;
	}

	/**
	 * This function requests a path to a file and loads it into the globe.
	 * It will then be available to the `htmlElementsData` property.
	 *
	 * @param {string} path The path to the file to load
	 * @param {(d: any, i: number, array: any[]) => any[]} [map] The map function to apply to the data
	 */
	load(path, map = (d, i, array) => ({ ...d, id: i })) {
		this.loading = true;

		if (this.#data?.length > 0) {
			this.loading = false;
			return;
		}

		fetch(path)
			.then((response) => response.json())
			.then((_data) => {
				// Obtain original copy of data
				this.#data = _data.map(map);
				// Cut the data to the offset for variable display
				this.data = this.#data.slice(0, this.dataOffset).filter(({ theme = "light" }) => this.theme === theme);;

				this.loading = false;
			})
			.catch(console.error);
	}

	/**
	 * This function slices the data array and returns a subset of it.
	 * This is useful for pagination or other data manipulation.
	 *
	 * @param {number} [start] The start index of the slice
	 * @param {number} [end] The end index of the slice
	 * @returns {any[]} The sliced data array
	 */
	slice(start, end) {
		if (start && end === undefined) {
			return this.#data.slice(0, start);
		}
		if (start === undefined && end === undefined) {
			return this.#data;
		}
		if (start < 0 || start >= this.data.length) {
			return [];
		}
		if (end < 0 || end >= this.data.length) {
			return [];
		}
		if (start >= end) {
			return [];
		}
		if (end <= start) {
			return [];
		}

		return this.#data.slice(start, end);
	}

	/**
	 * This function offsets the data array by the given amount.
	 * This is useful for pagination or other data manipulation.
	 *
	 * @param {{offset: number}} options The offset by which the data array should be sliced
	 */
	sliceTo({ offset }) {
		if (offset <= 0) {
			this.data = this.#data.slice(0, this.dataOffset);
			this.#rerender();
			return;
		}
		if (offset >= this.#data.length) {
			this.dataOffset = this.#data.length;
			this.data = this.#data.slice(0, this.dataOffset);
			this.#rerender();
			return;
		}

		this.dataOffset = Math.min(this.#data.length, offset);
		this.data = this.#data.slice(0, this.dataOffset);
		this.#rerender();
	}

	/**
	 * This function searches through the data array and returns all entries
	 * that contain the given string according to the name attribute. It is case-insensitive.
	 *
	 * @param {{name: string}} options
	 */
	searchByName({ name }) {
		this.data = this.#data.filter((d) =>
			d.name.toLowerCase().includes(name.toLowerCase())
		);
		this.#rerender();
	}

	searchByGroupname({ name }) {
		this.data = this.#data.filter((d) =>
			d.groupname.toLowerCase().includes(name.toLowerCase())
		);
		this.#rerender();
	}

	/**
	 * This function searches through the data array and returns all entries
	 * that contain the given string according to the country attribute. It is case-insensitive.
	 *
	 * @param {{name: string}} options
	 */
	searchByCountry({ name }) {
		this.data = this.#data.filter((d) =>
			d.country.toLowerCase().includes(name.toLowerCase())
		);
		this.#rerender();
	}


	/**
	 * @param {string} mode The currently toggled theme
	 */
	setTheme(mode) {
		this.data = this.#data.slice(0, this.dataOffset).filter(({ theme = "light" }) => mode === theme);
		this.#rerender();
	}

	/**
	 * This function resets the data array to its original state.
	 */
	resetData() {
		this.data = this.#data.slice();
		console.log($state.snapshot(this.data));
		this.#rerender();
	}

	#rerender() {
		this.globe.htmlElementsData([]);
		// This line is crucial since it is basically a reactivity trigger for <UI.Markers />
		if (this.rerendered) this.rerendered = false;
	}

	/**
	 * Resizes the globe manually based on window dimensions
	 *
	 * @param {UIEvent & { currentTarget: EventTarget & Window; }} event - The window resize event
	 * @returns {void}
	 */
	resize(event) {
		this.globe.width(event.currentTarget.innerWidth);
		this.globe.height(event.currentTarget.innerHeight);
	}

	deactivate() {
		this.globe.enablePointerInteraction(false);
		this.globe.pauseAnimation();
		this.activated = false;
	}

	activate() {
		this.globe.enablePointerInteraction(true);
		this.globe.resumeAnimation();
		this.activated = true;
	}

	toggle() {
		if (this.activated) {
			this.deactivate();
			return;
		}
		this.activate();
	}

	/**
	 * Returns the total number of entries in the data array.
	 */
	get total() {
		return this.#data.length;
	}
}

/**
 * Instantiates a new `EarthState` object and sets it as the context for
 * the given globe instance.
 *
 * @param {import("globe.gl").GlobeInstance} globe
 * @returns {EarthState} The context for accessing the globe instance
 */
export function setEarth(globe) {
	return setContext(Symbol.for(SYMBOL_KEY), new EarthState(globe));
}

/**
 * Retrieves the `EarthState` object from the context. Since this is a
 * reactive class instance, you cannot destructure it directly.
 *
 * @returns {EarthState} An instance of `EarthState` containing the globe instance from `globe.gl`
 */
export function useEarth() {
	return getContext(Symbol.for(SYMBOL_KEY));
}
