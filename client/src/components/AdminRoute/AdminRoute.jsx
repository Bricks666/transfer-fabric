import { Navigate } from "react-router-dom";
import { useIsAdmin } from "../../hooks";

export const AdminRoute = ({ children }) => {
	const isAdmin = useIsAdmin();

	if (!isAdmin) {
		return <Navigate to="/" replace={true} />;
	}

	return children;
};
