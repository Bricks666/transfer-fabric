import { useSelector } from "react-redux";

export const useSamplesLoading = () => {
	return useSelector((state) => state.samples.isLoading);
};
