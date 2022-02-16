import { Loading } from "../Loading";
import { List } from "../List";

export const FriendlyList = ({
	isLoading,
	items,
	Card,
	emptyLabel,
	indexedBy,
}) => {
	return (
		<Loading isLoading={isLoading}>
			{items.length ? (
				<List items={items} Card={Card} indexedBy={indexedBy} />
			) : (
				<p>{emptyLabel}</p>
			)}
		</Loading>
	);
};
