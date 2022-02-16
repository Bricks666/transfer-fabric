import { useField } from "../../hooks";
import { useAccept } from "./useAccept";

export const AcceptTransactionForm = ({ id }) => {
	const [keyword, onChange] = useField("");
	const onSubmit = useAccept(id, keyword);

	return (
		<form onSubmit={onSubmit}>
			<input
				value={keyword}
				onChange={onChange}
				placeholder="keyword"
				type="password"
			/>
			<button>Accept</button>
		</form>
	);
};
