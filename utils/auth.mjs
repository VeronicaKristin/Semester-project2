/*export const addAuthToken = (token) => {
	console.log("Add Token", token);
	localStorage.setItem("access-token", token);
	// get auth token from local storage
};

export const getAuthToken = () => {
	const accessToken = localStorage.getItem("access-token");
	console.log(accessToken);
	return accessToken;
};
*/

document.getElementById("login-modal").addEventListener("submit", async (e) => {
	e.preventDefault();
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const response = await fetch("LOGIN_URL", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ email, password }),
	});

	const result = await response.json();
	if (response.ok) {
		localStorage.setItem("token", result.token);
		window.location.href = "dashboard.html";
	} else {
		alert("Login failed: " + result.message);
	}
});

document.getElementById("signup-modal").addEventListener("submit", async (e) => {
	e.preventDefault();
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	const response = await fetch("REGISTER_URL", {
		method: "POST",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify({ name, email, password }),
	});

	const result = await response.json();
	if (response.ok) {
		window.location.href = "../index.html";
	} else {
		alert("Registration failed: " + result.message);
	}
});
