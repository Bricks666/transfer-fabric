export const toValidSample = (sample) => {
	return {
		id: sample.id,
		categoryId: sample.categoryId,
		name: sample.nameSample,
		moneyCount: sample.money,
	};
};
