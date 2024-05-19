// Toggle mobile menu visibility
const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

menuButton.addEventListener("click", () => {
	mobileMenu.classList.toggle("hidden");
});

// Function to clear text in forms
function clearFormFields(formId) {
	const form = document.getElementById(formId);
	form.reset();
}

// Toggle login modal visibility
const loginModal = document.getElementById("login-modal");
const openLoginModalButtons = document.querySelectorAll("#open-login-modal, #open-login-modal-mobile");
const closeLoginModal = document.getElementById("close-login-modal");

openLoginModalButtons.forEach((button) => {
	button.addEventListener("click", () => {
		loginModal.classList.remove("hidden");
	});
});

closeLoginModal.addEventListener("click", () => {
	loginModal.classList.add("hidden");
	clearFormFields("login-form");
});

// Toggle sign-up modal visibility
const signupModal = document.getElementById("signup-modal");
const openSignupModalButtons = document.querySelectorAll("#open-signup-modal, #open-signup-modal-mobile");
const closeSignupModal = document.getElementById("close-signup-modal");

openSignupModalButtons.forEach((button) => {
	button.addEventListener("click", () => {
		signupModal.classList.remove("hidden");
	});
});

closeSignupModal.addEventListener("click", () => {
	signupModal.classList.add("hidden");
	clearFormFields("signup-form");
});

// Close modals when clicking outside of them
window.addEventListener("click", (e) => {
	if (e.target === loginModal) {
		loginModal.classList.add("hidden");
	}
	if (e.target === signupModal) {
		signupModal.classList.add("hidden");
	}
});

// Get modal elements
const listingModal = document.getElementById("listing-modal");
const openListingModalButtons = document.querySelectorAll("#open-listing-modal");
const closeListingModal = document.getElementById("close-listing-modal");

// Open modal
openListingModalButtons.forEach((button) => {
	button.addEventListener("click", () => {
		listingModal.classList.remove("hidden");
	});
});

// Close modal
closeListingModal.addEventListener("click", () => {
	listingModal.classList.add("hidden");
	clearFormFields("create-listing-form");
});

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
	if (e.target === listingModal) {
		listingModal.classList.add("hidden");
	}
});

// Form submission handling
document.getElementById("create-listing-form").addEventListener("submit", async (e) => {
	e.preventDefault();
	const token = localStorage.getItem("token");
	const title = document.getElementById("title").value;
	const description = document.getElementById("description").value;
	const deadline = document.getElementById("deadline").value;
	const mediaURLs = document
		.getElementById("media")
		.value.split("\n")
		.filter((url) => url.trim() !== ""); // Split URLs by newline and filter out empty URLs

	const formData = new FormData();
	formData.append("title", title);
	formData.append("description", description);
	formData.append("deadline", deadline);
	for (const url of mediaURLs) {
		formData.append("mediaURLs", url);
	}

	const response = await fetch("LISTINGS_URL", {
		method: "POST",
		headers: {
			Authorization: `Bearer ${token}`,
		},
		body: formData,
	});

	const result = await response.json();
	if (response.ok) {
		window.location.href = "dashboard.html";
	} else {
		alert("Listing creation failed: " + result.message);
	}
});
