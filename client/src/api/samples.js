import { instance } from ".";

export const getSamplesApi = async () => {
	const response = await instance.get("/samples");
	return response.data.samples;
};

export const addSampleApi = async (sampleName, categoryId, money) => {
	const response = await instance.put("/samples/add", {
		sampleName,
		money,
		categoryId,
	});

	return response.data.sample;
};
