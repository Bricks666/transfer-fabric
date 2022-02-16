import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export const useAdminRoute = () => {
	const isAdmin = useSelector((state) => state.user.admin);

	const navigate = useNavigate();

	if (!isAdmin) {
		navigate("/");
	}
};
