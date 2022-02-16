import { useSelector } from "react-redux";

export const useVotesLoading = () => {
	return useSelector((state) => state.votes.info);
};
