import { REGISTER_URL } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";

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
