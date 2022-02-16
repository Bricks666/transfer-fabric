/*
state {
  isLogin: boolean;
}
*/
import { loginApi, registrationApi } from "../api";
export const LOGIN = "transfer/auth/LOGIN";
export const LOGOUT = "transfer/auth/LOGOUT";

const initialState = {
	isLogin: false,
};

export const authReducer = (state = initialState, action) => {
	switch (action.type) {
		case LOGIN: {
			return {
				...state,
				isLogin: true,
			};
		}
		case LOGOUT: {

			clearInterval(state.intervalId);
			return {
				...state,
				isLogin: false,
				intervalId: null,
			};
		}
		default: {
			return state;
		}
	}
};

export const loginAC = () => {
	return {
		type: LOGIN,
	};
};

export const logoutAC = () => {
	return {
		type: LOGOUT,
	};
};

export const registrationThunk = (login) => {
	return async () => {
		try {
			await registrationApi(login);

			return true;
		} catch (e) {
			console.log(e);

			return false;
		}
	};
};

export const loginThunk = (login) => {
	return async (dispatch) => {
		try {
			await loginApi(login);

			dispatch(loginAC());

			return true;
		} catch (e) {
			console.log(e);
		}
	};
};

export const logoutThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(logoutAC());
		} catch (e) {
			console.log(e);
		}
	};
};
