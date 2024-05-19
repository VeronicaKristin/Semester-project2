/*import { LOGIN_URL } from "./constants.mjs";
import { doFetch } from "./doFetch.mjs";
import { addAuthToken } from "./handleAuth.mjs";

export async function loginUser(email, password) {
	const response = await doFetch(LOGIN_URL, false, {
		method: "POST",
		body: JSON.stringify({
			email,
			password,
		}),
	});
	const accessToken = response.accessToken;
	if (accessToken) {
		addAuthToken(accessToken);
		setTimeout(() => {
			window.location.href = "../loggedIn.html";
		}, 2000);
	} else {
		throw new Error("No access token provided");
	}
}
*/
