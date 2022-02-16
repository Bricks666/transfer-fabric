import { RegistrationForm } from "../components/RegistrationForm";
import { SaveLink } from "../components/SaveLink";

export const RegistrationPage = () => {
	return (
		<main>
			<h2>Registration Page</h2>
			<RegistrationForm />
			<SaveLink to="/login">Login</SaveLink>
		</main>
	);
};
