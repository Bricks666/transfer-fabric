import { Navigate, Route, Routes } from "react-router-dom";
import { AuthRoute } from "./components/AuthRoute";
import { routes } from "./routes";
import { Header } from "./components/Header";
import { AdminRoute } from "./components/AdminRoute";

export const App = () => {
	return (
		<div>
			<Routes>
				<Route path="/login" />
				<Route path="/registration" />
				<Route path="*" element={<Header />} />
			</Routes>

			<Routes>
				{routes.map(({ Component, path, isAuthRoute, isAdminOnly }) => (
					<Route
						path={path}
						element={
							(isAdminOnly && (
								<AuthRoute>
									<AdminRoute>
										<Component />
									</AdminRoute>
								</AuthRoute>
							)) ||
							(isAuthRoute && (
								<AuthRoute>
									<Component />
								</AuthRoute>
							)) || <Component />
						}
						key={path}
					/>
				))}
				<Route path="*" element={<Navigate to="/" />} />
			</Routes>
		</div>
	);
};
