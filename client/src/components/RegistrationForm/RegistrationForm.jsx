import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useField } from "../../hooks";
import { registrationThunk } from "../../models/auth";

export const RegistrationForm = () => {
	const [login, onChange] = useField("");
	const dispatch = useDispatch();
	const navigate = useNavigate();

	const onSubmit = async (evt) => {
		evt.preventDefault();
		const isSuccess = await dispatch(registrationThunk(login));

		if (isSuccess) {
			navigate("/login", { replace: true });
			return;
		} else {
			onChange({ target: { value: "" } });
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<input value={login} onChange={onChange} />
			<button>Registration</button>
		</form>
	);
};
