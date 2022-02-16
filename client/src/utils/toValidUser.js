export const toValidUser = (userResponse) => {
	return {
		id: userResponse.id,
		login: userResponse.login,
		admin: userResponse.isAdmin,
		onOffer: userResponse.onOffer,
		balance: userResponse.balance,
	};
};
