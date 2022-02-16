/*
route {
  Component: ComponentType;
  path: string;
  isAuthRoute?: boolean
  isAdminOnly?: boolean
}
*/

import {
	LoginPage,
	ProfilePage,
	RegistrationPage,
	TransactionsPage,
	CategoriesPage,
	SamplesPage,
	OffersPage,
} from "../pages";

export const routes = [
	{
		Component: LoginPage,
		path: "/login",
	},
	{
		Component: RegistrationPage,
		path: "/registration",
	},
	{
		Component: TransactionsPage,
		path: "/*",
		isAuthRoute: true,
	},
	{
		Component: ProfilePage,
		path: "/profile",
		isAuthRoute: true,
	},
	{
		Component: CategoriesPage,
		path: "/categories",
		isAuthRoute: true,
		isAdminOnly: true,
	},
	{
		Component: SamplesPage,
		path: "/samples",
		isAuthRoute: true,
		isAdminOnly: true,
	},
	{
		Component: OffersPage,
		path: "/offers/*",
		isAuthRoute: true,
		isAdminOnly: true,
	},
];
