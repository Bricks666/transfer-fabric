export const mapSamples = (samples, categoriesMap) => {
	return samples.map(({ categoryId, ...sample }) => {
		const categoryName = categoriesMap[categoryId];

		return {
			...sample,
			categoryName,
		};
	});
};
