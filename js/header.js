// Toggle mobile menu visibility
const menuButton = document.getElementById("mobile-menu-button");
const mobileMenu = document.getElementById("mobile-menu");

menuButton.addEventListener("click", () => {
	mobileMenu.classList.toggle("hidden");
});

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
