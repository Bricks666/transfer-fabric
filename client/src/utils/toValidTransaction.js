export const toValidTransaction = (transaction) => {
  debugger
	return {
		id: transaction.id,
		sender: transaction.loginSender,
		receiver: transaction.loginRecipient,
		count: transaction.money,
		status: transaction.finished,
		description: transaction.description,
		categoryId: transaction.categoryId,
	};
};
