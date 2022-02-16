import { Transaction } from "../Transaction";
import { useCancel } from "./useCancel";

export const SendedTransaction = ({ id, status, ...props }) => {
	const onClick = useCancel(id);
	return (
		<Transaction {...props} id={id} status={status}>
			{!status && <button onClick={onClick}>Cancel</button>}
		</Transaction>
	);
};
