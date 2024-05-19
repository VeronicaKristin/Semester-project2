export const addAuthToken = (token) => {
	console.log("Add Token", token);
	localStorage.setItem("access-token", token);
	// get auth token from local storage
};

export const getAuthToken = () => {
	const accessToken = localStorage.getItem("access-token");
	console.log(accessToken);
	return accessToken;
};
