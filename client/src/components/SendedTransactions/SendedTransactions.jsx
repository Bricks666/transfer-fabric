import { FriendlyList } from "../FriendlyList";
import { useSendedTransactions, useTransactionLoading } from "../../hooks";
import { SendedTransaction } from "../SendedTransaction";

export const SendedTransactions = () => {
	const transactions = useSendedTransactions();
	const isLoading = useTransactionLoading();

	return (
		<FriendlyList
			items={transactions}
			Card={SendedTransaction}
			indexedBy="id"
			isLoading={isLoading}
			emptyLabel="You haven't had any transactions"
		/>
	);
};
