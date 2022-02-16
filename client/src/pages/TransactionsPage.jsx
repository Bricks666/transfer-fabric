import { Navigate, Route, Routes } from "react-router-dom";
import { TransactionNavigation } from "../components/TransactionNavigation";
import { SendedTransactions } from "../components/SendedTransactions";
import { CreateTransactionForm } from "../components/CreateTransactionForm";
import { ReceivedTransactions } from "../components/ReceivedTransactions";
import { Balance } from "../components/Balance";

export const TransactionsPage = () => {
	return (
		<main>
			<h2>Transactions</h2>
			<TransactionNavigation />
			<Balance />
			<Routes>
				<Route
					path="sended"
					element={
						<>
							<CreateTransactionForm />
							<SendedTransactions />
						</>
					}
				/>
				<Route path="received" element={<ReceivedTransactions />} />
				<Route path="*" element={<Navigate to="sended" replace={true} />} />
			</Routes>
		</main>
	);
};
