import { useDispatch } from "react-redux";
import { useField } from "../../hooks";
import { addCategoryThunk } from "../../models/categories";

export const CreateCategoryForm = () => {
	const [categoryName, setCategoryName] = useField("");
	const dispatch = useDispatch();

	const onSubmit = async (evt) => {
		evt.preventDefault();
		await dispatch(addCategoryThunk(categoryName));
		setCategoryName({ target: { value: "" } });
	};

	return (
		<form onSubmit={onSubmit}>
			<input
				value={categoryName}
				onChange={setCategoryName}
				placeholder={"category name"}
			/>
			<button>Create category</button>
		</form>
	);
};
