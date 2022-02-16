import { instance } from ".";

export const setUserOnOfferApi = async (candidate) => {
	const response = await instance.put("/offers/add", { candidate });

	return response.data.offer;
};

export const getVotesApi = async () => {
	const response = await instance.get("/offers");
	return response.data.offers;
};

export const voteForApi = async (voteId) => {
	const response = await instance.post(`offers/${voteId}/vote/for`);

	return response.data.offer;
};

export const voteAgainstApi = async (voteId) => {
	const response = await instance.post(`offers/${voteId}/vote/against`);

	return response.data.offer;
};
