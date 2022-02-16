import { instance } from ".";

export const getSendedTransactionsApi = async () => {
	const response = await instance.get("/transactions/sended");
	return response.data.transactions;
};

export const getReceivedTransactionsApi = async () => {
	const response = await instance.get("/transactions/received");
	return response.data.transactions;
};

export const sendTransactionApi = async (
	receiver,
	money,
	keyword,
	description,
	categoryId
) => {
	const response = await instance.put("/transactions/add", {
		receiver,
		keyword,
		description,
		categoryId,
		money,
	});

	return response.data.transaction;
};

export const acceptTransactionApi = async (transactionId, keyword) => {
	const response = await instance.post(`transactions/${transactionId}/accept`, {
		keyword,
	});

	return response.data.transaction;
};

export const cancelTransactionApi = async (transactionId) => {
	const response = await instance.post(`transactions/${transactionId}/cancel`);

	return response.data.transaction;
};
