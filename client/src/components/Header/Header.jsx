import { Navigation } from "../Navigation";
import { useIsLogin } from "../../hooks";
import { useLogout } from "./useLogout";

export const Header = () => {
	const isLogin = useIsLogin();
	const onClick = useLogout();

	return (
		<header>
			<Navigation />
			{isLogin && <button onClick={onClick}>Logout</button>}
		</header>
	);
};
