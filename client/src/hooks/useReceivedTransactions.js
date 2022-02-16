import { useEffect, useMemo } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadReceivedTransactionThunk } from "../models/transactions";
import { useCategoriesMap } from ".";
import { mapTransactions } from "../utils";

export const useReceivedTransactions = () => {
	const transactions = useSelector((state) => state.transactions.received);
	const categoriesMap = useCategoriesMap();
	const dispatch = useDispatch();

	useEffect(() => {
		if (!transactions.length) {
			dispatch(loadReceivedTransactionThunk());
		}
	}, [transactions.length, dispatch]);

	return useMemo(
		() => mapTransactions(transactions, categoriesMap),
		[transactions, categoriesMap]
	);
};
