import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { acceptTransactionThunk } from "../../models/transactions";

export const useAccept = (id, keyword) => {
	const dispatch = useDispatch();

	return useCallback(
		(evt) => {
			evt.preventDefault();
			dispatch(acceptTransactionThunk(id, keyword));
		},
		[dispatch, id, keyword]
	);
};
