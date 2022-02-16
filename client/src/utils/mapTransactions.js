export const mapTransactions = (transactions, categoriesMap) => {
	return transactions.map(({ categoryId, ...transaction }) => {
		const categoryName = categoriesMap[categoryId];
		return {
			...transaction,
			categoryName,
		};
	});
};
