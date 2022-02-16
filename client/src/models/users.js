/*
state {
  list: User[]
  isLoading: boolean
}
*/

import { getUsersApi } from "../api";
import { toValidUser } from "../utils";

export const SET_USERS = "transfer/users/SET_USERS";
export const TOGGLE_LOADING = "transfer/users/TOGGLE_LOADING";
export const SET_ON_OFFER = "transfer/users/SET_ON_OFFER";

const initialState = {
	isLoading: false,
	list: [],
};

export const usersReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_USERS: {
			return {
				...state,
				list: action.payload.users,
			};
		}
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: action.payload.isLoading,
			};
		}
		case SET_ON_OFFER: {
			return {
				...state,
				list: state.list.map((user) =>
					user.login === action.payload.login
						? { ...user, onOffer: true }
						: user
				),
			};
		}
		default: {
			return state;
		}
	}
};

export const setUsersAC = (users) => {
	return {
		type: SET_USERS,
		payload: {
			users,
		},
	};
};
export const toggleLoadingAC = (isLoading) => {
	return {
		type: TOGGLE_LOADING,
		payload: {
			isLoading,
		},
	};
};
export const setOnOfferAC = (login) => {
	return {
		type: SET_ON_OFFER,
		payload: {
			login,
		},
	};
};

export const loadUsersThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(toggleLoadingAC(true));
			const users = Object.values(await getUsersApi());
			dispatch(setUsersAC(users.map(toValidUser)));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(toggleLoadingAC(false));
		}
	};
};
