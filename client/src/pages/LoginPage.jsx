import { LoginForm } from "../components/LoginForm";
import { SaveLink } from "../components/SaveLink";

export const LoginPage = () => {
	return (
		<main>
			<h2>Login page</h2>
			<LoginForm />
			<SaveLink to="/registration">Registration</SaveLink>
		</main>
	);
};
