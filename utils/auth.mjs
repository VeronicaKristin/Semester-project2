import { APIKEY_URL } from "./constants.mjs";
import { LOGIN_URL } from "./constants.mjs";

// Function to add authentication token to localStorage
export const addAuthToken = (token) => {
	console.log("Add Token", token);
	localStorage.setItem("access-token", token);
};

// Function to get authentication token from localStorage
export const getAuthToken = () => {
	const accessToken = localStorage.getItem("access-token");
	console.log(accessToken);
	return accessToken;
};

// Function to check if the user is logged in
const isLoggedIn = () => {
	return !!getAuthToken(); // Returns true if authentication token exists
};

// Function to logout
const logout = () => {
	localStorage.removeItem("access-token");
	window.location.href = "../index.html"; // Redirect to index.html after logout
};

// Event listener for login form submission
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
		addAuthToken(result.token); // Set authentication token
		// Close the modal
		const modal = document.getElementById("login-modal");
		modal.classList.remove("show");
		modal.style.display = "none";
		// Redirect to loggedIn.html after successful login
		window.location.href = "../loggedIn.html";
	} else {
		alert("Login failed: " + result.message);
	}
});

// Event listener for registration form submission
document.getElementById("signup-modal").addEventListener("submit", async (e) => {
	e.preventDefault();
	const name = document.getElementById("name").value;
	const email = document.getElementById("email").value;
	const password = document.getElementById("password").value;

	// Fetch API key from APIKEY_URL
	const apiKeyResponse = await fetch("APIKEY_URL");
	const apiKeyResult = await apiKeyResponse.json();

	// Check if API key fetch was successful
	if (apiKeyResponse.ok) {
		const apiKey = apiKeyResult.key;

		// Perform registration with API key in headers
		const response = await fetch("REGISTER_URL", {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${apiKey}`, // Add API key to headers
			},
			body: JSON.stringify({ name, email, password }),
		});

		const result = await response.json();
		if (response.ok) {
			addAuthToken(result.token); // Set authentication token
			// Close the modal
			const modal = document.getElementById("signup-modal");
			modal.classList.remove("show");
			modal.style.display = "none";
			// Redirect to loggedIn.html after successful registration
			window.location.href = "../loggedIn.html"; // <-- Update redirection URL
		} else {
			alert("Registration failed: " + result.message);
		}
	} else {
		alert("Failed to fetch API key");
	}
});

// Check authentication status on page load
window.addEventListener("load", () => {
	if (isLoggedIn()) {
		window.location.href = "../loggedIn.html"; // Redirect to loggedIn.html if logged in
	}
});

// Example: Logout button event listener
document.getElementById("logout-button").addEventListener("click", logout);
