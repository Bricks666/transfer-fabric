import { CreateCategoryForm } from "../components/CreateCategoryForm";
import { CategoriesList } from "../components/CategoriesList";

export const CategoriesPage = () => {
	return (
		<main>
			<h2>Categories Page</h2>
			<CreateCategoryForm />
			<CategoriesList />
		</main>
	);
};
