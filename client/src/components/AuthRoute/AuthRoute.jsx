import { Navigate, useLocation } from "react-router-dom";
import { useIsLogin } from "../../hooks";

export const AuthRoute = ({ children }) => {
	const location = useLocation();
	const isLogin = useIsLogin();

	if (!isLogin) {
		console.log(isLogin);
		return <Navigate to="/login" state={location} replace={true} />;
	}

	return children;
};
