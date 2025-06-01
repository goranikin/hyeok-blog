import { API_URL } from "@/constants/network";
import { objToQueryString } from "@/services/convertParams";

export const getRequest = async (url: string, params: object = {}) => {
	const queryString = objToQueryString(params);
	const resp = await _fetch(`${API_URL}${url}${queryString}`, "GET");
	return await resp.json();
};

const _fetch = async (url: string, method: string) => {
	const resp = await fetch(url, {
		method: method,
		headers: {
			"Content-Type": "application/json",
		},
	});

	if (!resp.ok) {
		console.error(`${method} ${url} failed: ${resp.status}`);
		throw new Error(resp.status.toString());
	}

	return resp;
};
