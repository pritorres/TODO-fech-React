const BASE_URL = "https://assets.breatheco.de/apis/fake/todos/";
const baseOptions = {
	headers: {
		"Content-Type": "application/json"
	},
	mode: "cors"
};

export const request = (endpoint, customsOptions) => {
	const url = `${BASE_URL}${endpoint}`;
	const options = { ...baseOptions, ...customsOptions };

	return fetch(url, options).then(result => {
		return result.json();
	});
};
