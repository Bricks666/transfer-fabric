import { useIsAdmin } from "../../hooks";

export const OnlyAdmin = ({ children }) => {
	const isAdmin = useIsAdmin();

	if (!isAdmin) {
		return null;
	}

	return children;
};
