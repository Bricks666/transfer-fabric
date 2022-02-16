import { UserInfo } from "../UserInfo";
import { useSetOnOffer } from "./useSetOnOffer";

export const User = ({ admin, onOffer, login, ...props }) => {
	console.log(login);
	const onClick = useSetOnOffer(login);
	const showOnOffer = !admin && !onOffer;
	console.log(admin, onOffer, props.user);
	return (
		<div>
			<UserInfo {...props} login={login} admin={admin} onOffer={onOffer} />
			{showOnOffer && <button onClick={onClick}>Set on offer</button>}
		</div>
	);
};
