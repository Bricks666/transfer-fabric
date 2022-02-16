import { List } from "../List";
import { NavigationItem } from "../NavigationItem";

const navigation = [
	{
		to: "users",
		label: "Users",
	},
	{
		to: "votes",
		label: "Votes",
	},
];

export const OffersNavigation = () => {
	return <List items={navigation} Card={NavigationItem} indexedBy="to" />;
};
