import { registerUser } from "../utils/registerUser.mjs";

const registerForm = document.querySelector("#register-form");

registerForm.addEventListener("submit", (event) => {
	event.preventDefault();

	const name = event.target[0].value;
	const email = event.target[1].value;
	const password = event.target[2].value;
	registerUser(name, email, password);
});
