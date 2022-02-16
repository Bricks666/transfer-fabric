import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { cancelTransactionThunk } from "../../models/transactions";

export const useCancel = (id) => {
	const dispatch = useDispatch();

	return useCallback(
		() => dispatch(cancelTransactionThunk(id)),
		[dispatch, id]
	);
};
