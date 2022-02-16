export const List = ({ Card, items, indexedBy, children }) => {
	return (
		<ul>
			{items.map((item) => (
				<li key={item[indexedBy]}>
					<Card {...item} />
				</li>
			))}
			{children}
		</ul>
	);
};
