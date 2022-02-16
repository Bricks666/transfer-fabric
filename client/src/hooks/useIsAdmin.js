import { useUserInfo } from ".";

export const useIsAdmin = () => {
	console.log("isAdmin");
	const { admin } = useUserInfo();

	return admin;
};
