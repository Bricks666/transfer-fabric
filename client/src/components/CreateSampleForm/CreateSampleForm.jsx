import { useCallback } from "react";
import { useDispatch } from "react-redux";
import { useCategories, useField } from "../../hooks";
import { addSampleThunk } from "../../models/samples";

export const CreateSampleForm = () => {
	const categories = useCategories();
	const [name, setName] = useField("");
	const [moneyCount, setMoneyCount] = useField(0);
	const [category, setCategory] = useField(-1);
	const dispatch = useDispatch();

	const reset = useCallback(() => {
		setName({ target: { value: "" } });
		setMoneyCount({ target: { value: 0 } });
		setCategory({ target: { value: -1 } });
	}, [setName, setMoneyCount, setCategory]);

	const onSubmit = useCallback(
		async (evt) => {
			evt.preventDefault();
			await dispatch(addSampleThunk(name, category, moneyCount));
			reset();
		},
		[reset, dispatch, name, category, moneyCount]
	);

	return (
		<form onSubmit={onSubmit}>
			<input placeholder="Sample name" value={name} onChange={setName} />
			<select placeholder="Category" value={category} onChange={setCategory}>
				<option value={-1} />
				{categories.map(({ name, id }) => (
					<option value={id} key={id}>
						{name}
					</option>
				))}
			</select>
			<input
				placeholder="Money count"
				type="number"
				min={0}
				value={moneyCount}
				onChange={setMoneyCount}
			/>
			<button>Create sample</button>
		</form>
	);
};
