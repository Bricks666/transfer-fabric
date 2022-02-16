import { FriendlyList } from "../FriendlyList";
import { useUsers, useUsersLoading } from "../../hooks";
import { User } from "../User";

export const UsersList = () => {
	const users = useUsers();
	const isLoading = useUsersLoading();

	return (
		<FriendlyList
			items={users}
			Card={User}
			indexedBy="login"
			isLoading={isLoading}
		/>
	);
};
