import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { loadCategoriesThunk } from "../models/categories";

export const useCategories = () => {
	const categories = useSelector((state) => state.categories.list);
	const dispatch = useDispatch();

	useEffect(() => {
		if (!categories.length) {
			dispatch(loadCategoriesThunk());
		}
	}, [categories.length, dispatch]);

	return categories;
};
