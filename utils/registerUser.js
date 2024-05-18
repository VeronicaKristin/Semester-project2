import { REGISTER_URL } from "./constants.js";
import { doFetch } from "./doFetch.js";

export async function registerUser(name, email, password) {
	console.log("Register user");
	await doFetch(REGISTER_URL, false, {
		method: "POST",
		body: JSON.stringify({
			name,
			email,
			password,
		}),
	});
}
