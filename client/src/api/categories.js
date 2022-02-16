import { instance } from ".";

export const getCategoriesApi = async () => {
	const response = await instance.get("/categories/");
	return response.data.categories;
};

export const addCategoryApi = async (categoryName) => {
	const response = await instance.put("/categories/add", { categoryName });
	return response.data.category;
};
