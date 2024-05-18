import { getAuthToken } from "./handleAuth.mjs";

export async function doFetch(url, isAuth = false, options = {}) {
	try {
		const headers = {
			"Content-Type": "application/json",
		};
		if (isAuth) {
			const authToken = getAuthToken();
			headers["Authorization"] = `Bearer ${authToken}`;
		}

		const combinedOptions = { headers, ...options };
		// If isAuth is true
		// Add auth token to header

		const response = await fetch(url, combinedOptions);
		const json = await response.json();
		return json;
	} catch (error) {
		throw error;
	} finally {
		//
	}
}
