import { useUserInfo, useUserLoading } from "../../hooks";
import { Loading } from "../Loading";
import { UserInfo } from "../UserInfo";

export const ProfileInfo = () => {
	const info = useUserInfo();
	const isLoading = useUserLoading();
	console.log("asdasd");
	return (
		<div>
			<Loading isLoading={isLoading}>
				<UserInfo {...info} />
			</Loading>
		</div>
	);
};
