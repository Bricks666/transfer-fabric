export const getReceivedTransactions = (address, transactions) => {
	return transactions.filter((transaction) => transaction.receiver === address);
};
