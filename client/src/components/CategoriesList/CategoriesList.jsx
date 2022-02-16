import { useCategories, useCategoriesLoading } from "../../hooks";
import { Loading } from "../Loading";

export const CategoriesList = () => {
	const categories = useCategories();
	const isLoading = useCategoriesLoading();

	return (
		<Loading isLoading={isLoading}>
			<ul>
				{categories.map(({ name, id }) => (
					<li key={id}>{name}</li>
				))}
			</ul>
		</Loading>
	);
};
