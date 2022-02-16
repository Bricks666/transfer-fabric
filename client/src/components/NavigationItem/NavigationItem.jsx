import { NavLink } from "react-router-dom";

export const NavigationItem = ({ to, label }) => {
	return <NavLink to={to}>{label}</NavLink>;
};
