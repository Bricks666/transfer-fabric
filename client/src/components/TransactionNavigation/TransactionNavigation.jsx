import { List } from "../List";
import { NavigationItem } from "../NavigationItem";

const navigation = [
	{
		to: "sended",
		label: "Sended",
	},
	{
		to: "received",
		label: "Received",
	},
];

export const TransactionNavigation = () => {
	return <List items={navigation} Card={NavigationItem} indexedBy="to" />;
};
