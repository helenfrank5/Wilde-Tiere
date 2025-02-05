export const placeholderMessages = [
	"How many predators are there?",
	"Show me the 100 heaviest animals.",
	"Show all animals that live in Africa.",
	"Please show all animals whose name starts with 'L'.",
	"How many animals have a maximum speed of over 80 km/h?",
	"Show me all animals that can live for more than 10 years.",
	"How many animals have a body length of more than 2 meters?",
	"Please list all animals from the 'Asia' group.",
	"Show me all animals whose maximum speed is higher than that of a cheetah.",
	"Show me all animals that live in Asia.",
	"Show me all animals whose intelligence is above 7.",
	"Show me the animal with the heaviest weight."
];

export const FUNCTION_SCHEMA_SLICE_TO = {
	type: "function",
	function: {
		name: "slice_to",
		description:
			"Updates the data offset and slices the data up to the given offset. Whenever the user tells you to give the first X samples, then return this function.",
		parameters: {
			type: "object",
			properties: {
				offset: {
					type: "number",
					description:
						"The offset up to which the data should be sliced.",
				},
			},
			required: ["offset"],
		},
	},
};

// export const FUNCTION_SCHEMA_SEARCH_BY_NAME = {
// 	type: "function",
// 	function: {
// 		name: "search_by_name",
// 		description:
// 			"Searches through the data and returns all case-insensitive entries that contain the given string according to the name of the volcan.",
// 		parameters: {
// 			type: "object",
// 			properties: {
// 				name: {
// 					type: "string",
// 					description:
// 						"The name of the volcan that should be searched for in the data.",
// 				},
// 			},
// 			required: ["name"],
// 		},
// 	},
// };

export const FUNCTION_SCHEMA_SEARCH_BY_GROUPNAME = {
	type: "function",
	function: {
		name: "search_by_groupname",
		description:
			"Searches through the data and returns all case-insensitive entries that are either 'Predators', 'Water Birds', and so on",
		parameters: {
			type: "object",
			properties: {
				name: {
					type: "string",
					description:
						"The groupname of the animal that should be searched for in the data.",
				},
			},
			required: ["name"],
		},
	},
};

// export const FUNCTION_SCHEMA_SEARCH_BY_COUNTRY = {
// 	type: "function",
// 	function: {
// 		name: "search_by_country",
// 		description:
// 			"Searches through the data and returns all case-insensitive entries that contain the given string according to the name of the country.",
// 		parameters: {
// 			type: "object",
// 			properties: {
// 				name: {
// 					type: "string",
// 					description:
// 						"The name of the country that should be searched for in the data.",
// 				},
// 			},
// 			required: ["name"],
// 		},
// 	},
// };

export const FUNCTION_TOOLS = [
	FUNCTION_SCHEMA_SLICE_TO,
	// FUNCTION_SCHEMA_SEARCH_BY_NAME,
	// FUNCTION_SCHEMA_SEARCH_BY_COUNTRY,
	FUNCTION_SCHEMA_SEARCH_BY_GROUPNAME
];
