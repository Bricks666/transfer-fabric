import { Link, useLocation } from "react-router-dom";
import { useLocationState } from "../../hooks/useLocationState";

export const SaveLink = ({ to, children }) => {
	const location = useLocation();
	const state = useLocationState();
	return (
		<Link to={to} state={state || location}>
			{children}
		</Link>
	);
};
