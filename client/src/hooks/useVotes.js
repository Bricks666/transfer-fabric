import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadVotesThunk } from "../models/votes";

export const useVotes = () => {
	const votes = useSelector((state) => state.votes.list);
	const dispatch = useDispatch();

	useEffect(() => {
		dispatch(loadVotesThunk());
	}, [dispatch]);

	return votes;
};
