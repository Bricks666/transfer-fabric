import { useMemo } from "react";
import { useSamples, useCategoriesMap } from ".";
import { mapSamples } from "../utils";

export const useMappedSamples = () => {
	const samples = useSamples();
	const categoriesMap = useCategoriesMap();

	return useMemo(
		() => mapSamples(samples, categoriesMap),
		[samples, categoriesMap]
	);
};
