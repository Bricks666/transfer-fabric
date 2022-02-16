import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useField, useLocationState } from "../../hooks";
import { loginThunk } from "../../models/auth";

export const LoginForm = () => {
	const [login, onChange] = useField("");
	const dispatch = useDispatch();
	const state = useLocationState();
	const navigate = useNavigate();

	const onSubmit = async (evt) => {
		evt.preventDefault();
		const isLogin = await dispatch(loginThunk(login));
		if (isLogin) {

			const to = state || "/";
			navigate(to, { replace: true });
		}
	};

	return (
		<form onSubmit={onSubmit}>
			<input value={login} onChange={onChange} />
			<button disabled={!login}>Login</button>
		</form>
	);
};
