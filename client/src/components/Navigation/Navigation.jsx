import { List } from "../List";
import { NavigationItem } from "../NavigationItem";
import { OnlyAdmin } from "../OnlyAdmin";

const navigation = [
	{
		to: "/",
		label: "Transactions",
	},
	{
		to: "/profile",
		label: "Profile",
	},
];

export const Navigation = () => {
	return (
		<nav>
			<List items={navigation} Card={NavigationItem} indexedBy="to">
				<OnlyAdmin>
					<li>
						<NavigationItem to="/categories" label="Categories" />
					</li>
				</OnlyAdmin>
				<OnlyAdmin>
					<li>
						<NavigationItem to="/samples" label="Samples" />
					</li>
				</OnlyAdmin>
				<OnlyAdmin>
					<li>
						<NavigationItem to="/offers" label="Users and votes" />
					</li>
				</OnlyAdmin>
			</List>
		</nav>
	);
};
