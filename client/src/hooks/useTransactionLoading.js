import { useSelector } from "react-redux";

export const useTransactionLoading = () => {
	return useSelector((state) => state.transactions.isLoading);
};
