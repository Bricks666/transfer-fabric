import { FriendlyList } from "../FriendlyList";
import { ReceivedTransaction } from "../ReceivedTransaction";
import { useReceivedTransactions, useTransactionLoading } from "../../hooks";

export const ReceivedTransactions = () => {
	const transactions = useReceivedTransactions();
	const isLoading = useTransactionLoading();
	return (
		<FriendlyList
			items={transactions}
			Card={ReceivedTransaction}
			indexedBy="id"
			isLoading={isLoading}
			emptyLabel="We haven't had any transactions"
		/>
	);
};
