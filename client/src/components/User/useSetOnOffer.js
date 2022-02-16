import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { setOnOfferThunk } from "../../models/votes";

export const useSetOnOffer = (login) => {
	const dispatch = useDispatch();
	return useCallback(() => {
		dispatch(setOnOfferThunk(login));
	}, [dispatch, login]);
};
