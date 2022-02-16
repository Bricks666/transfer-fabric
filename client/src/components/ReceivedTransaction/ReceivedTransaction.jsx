import { Transaction } from "../Transaction";
import { AcceptTransactionForm } from "../AcceptTransactionForm";

export const ReceivedTransaction = ({ id, status, ...props }) => {
	return (
		<Transaction {...props} id={id} status={status}>
			{!status && <AcceptTransactionForm id={id} />}
		</Transaction>
	);
};
