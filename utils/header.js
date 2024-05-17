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

// Close modal when clicking outside of it
window.addEventListener("click", (e) => {
	if (e.target === loginModal) {
		loginModal.classList.add("hidden");
	}
});
