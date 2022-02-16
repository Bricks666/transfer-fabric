import { Navigate, Route, Routes } from "react-router-dom";
import { OffersNavigation } from "../components/OffersNavigation";
import { UsersList } from "../components/UsersList";
import { VotesList } from "../components/VotesList";

export const OffersPage = () => {
	return (
		<main>
			<h2>Offers Page</h2>
			<OffersNavigation />
			<Routes>
				<Route path="users" element={<UsersList />} />
				<Route path="votes" element={<VotesList />} />
				<Route path="*" element={<Navigate to="users" replace={true} />} />
			</Routes>
		</main>
	);
};
