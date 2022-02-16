import { getUserRole } from "../../utils";

export const UserInfo = ({
	login,
	user,
	admin,
	onOffer,
	children,
	balance,
}) => {
	return (
		<section>
			<h3>Info</h3>
			<p>{`Login: ${login}`}</p>
			<p>{`Your role: ${getUserRole(user, admin, onOffer)}`}</p>
			<p>Balance: {balance}</p>
			{children}
		</section>
	);
};
