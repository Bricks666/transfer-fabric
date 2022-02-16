import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAuthRoute = () => {
	const isLogin = useSelector((state) => state.auth.isLogin);

	const navigate = useNavigate();

	if (!isLogin) {
		navigate("/login");
	}
};
