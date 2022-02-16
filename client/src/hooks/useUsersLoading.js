import { useSelector } from "react-redux";

export const useUsersLoading = () => {
	return useSelector((state) => state.users.isLoading);
};
