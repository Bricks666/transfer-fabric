import { useSelector } from "react-redux";

export const useCategoriesLoading = () => {
	return useSelector((state) => state.categories.isLoading);
};
