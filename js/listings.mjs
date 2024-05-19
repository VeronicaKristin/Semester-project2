// display all listings

import { LISTINGS_URL } from "../utils/constants.mjs";

async function doFetch(url, useCache) {
	try {
		const response = await fetch(url);
		if (!response.ok) {
			throw new Error(`HTTP error! status: ${response.status}`);
		}
		const data = await response.json();
		console.log("Fetched data:", data); // Log fetched data
		return data;
	} catch (error) {
		console.error("Error fetching data:", error);
		throw error;
	}
}

const generateSinglePostHtml = (post) => {
	const postContainer = document.createElement("div");
	postContainer.classList.add("max-w-xs", "rounded", "overflow-hidden", "shadow-lg", "bg-white", "m-4", "border", "border-gray-300");
	postContainer.classList.add("w-full", "md:w-1/3", "mb-4"); // Add mb-4 for margin-bottom

	const postMedia = document.createElement("img");
	// If there are media items, use the first one's URL; otherwise, use a placeholder
	if (post.media && post.media.length > 0) {
		postMedia.src = post.media[0].url;
		postMedia.alt = post.media[0].alt || `${post.title} Image`;
	} else {
		postMedia.src = "https://place-hold.it/300x300";
		postMedia.alt = `${post.title} Image`;
	}
	postMedia.classList.add("w-full");

	const postTitle = document.createElement("h3");
	postTitle.textContent = post.title;
	postTitle.classList.add("font-bold", "text-xl", "mb-2");

	const postDescription = document.createElement("p");
	postDescription.textContent = post.description;
	postDescription.classList.add("text-gray-700", "text-base");

	const postTimer = document.createElement("p");
	postTimer.textContent = `Ends at: ${new Date(post.endsAt).toLocaleString()}`;
	postTimer.classList.add("text-gray-600", "text-sm");

	postContainer.append(postMedia, postTitle, postDescription, postTimer);

	return postContainer;
};

export async function displayPosts(extra = "") {
	const postsDisplayContainer = document.querySelector("#post-display-container");
	if (!postsDisplayContainer) {
		console.error("#post-display-container not found");
		return;
	}
	postsDisplayContainer.textContent = "";

	try {
		const data = await doFetch(LISTINGS_URL + extra, true);
		console.log("Fetched posts data:", data); // Log the data received

		const posts = data.data.slice(0, 18); // Load only the first 18 posts

		if (!posts || !Array.isArray(posts) || posts.length === 0) {
			console.error("No posts to display or posts is not an array");
			return;
		}

		posts.forEach((post) => {
			const postHtml = generateSinglePostHtml(post);
			postsDisplayContainer.appendChild(postHtml);
		});

		// Add Load More button if there are more than 18 posts
		if (data.data.length > 18) {
			const loadMoreButton = document.createElement("button");
			loadMoreButton.textContent = "Load More";
			loadMoreButton.classList.add("bg-blue-500", "hover:bg-grey-700", "text-white", "font-bold", "py-2", "px-4", "rounded", "mt-4");
			loadMoreButton.addEventListener("click", async () => {
				const additionalPosts = data.data.slice(18, 36); // Load next 18 posts
				additionalPosts.forEach((post) => {
					const postHtml = generateSinglePostHtml(post);
					postsDisplayContainer.appendChild(postHtml);
				});
				// Hide the Load More button if all posts have been loaded
				if (data.data.length <= 36) {
					loadMoreButton.style.display = "none";
				}
			});
			postsDisplayContainer.appendChild(loadMoreButton);
		}
	} catch (error) {
		console.error("Error displaying posts:", error);
	}
}

async function main() {
	await displayPosts();
}

main();
