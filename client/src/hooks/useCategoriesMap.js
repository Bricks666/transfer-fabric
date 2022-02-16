import { useMemo } from "react";
import { useCategories } from ".";

export const useCategoriesMap = () => {
	const categories = useCategories();

	return useMemo(
		() => categories.reduce((map, { id, name }) => ((map[id] = name), map), {}),
		[categories]
	);
};
