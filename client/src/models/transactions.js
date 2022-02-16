/*
state: {
  isLoading: boolean;
  received: Transaction[]
  sended: Transaction[]
}

Transaction {
  id: number;
  sender: string;
  receiver: string;
  count: number;
  status: boolean
  description: string;
  categoryId: string;
}
*/

import {
	acceptTransactionApi,
	cancelTransactionApi,
	sendTransactionApi,
	getReceivedTransactionsApi,
	getSendedTransactionsApi,
} from "../api";
import { toValidTransaction } from "../utils";
import { changeBalanceAC } from "./user";

export const SET_SENDED_TRANSACTIONS =
	"transfer/transactions/SET_SENDED_TRANSACTIONS";
export const SET_RECEIVED_TRANSACTIONS =
	"transfer/transactions/SET_RECEIVED_TRANSACTIONS";

export const TOGGLE_LOADING = "transfer/transactions/TOGGLE_LOADING";
export const ADD_SEND_TRANSACTION =
	"transfer/transactions/ADD_SEND_TRANSACTION";
export const CHANGE_STATUS = "transfer/transactions/CHANGE_STATUS";

const initialState = {
	isLoading: false,
	received: [],
	sended: [],
};

const haveTransaction = (transactions, id) =>
	!!transactions.find((transaction) => transaction.id === id);
const finishTransaction = (transactions, id) => {
	return transactions.map((transaction) =>
		transaction.id === id ? { ...transaction, status: true } : transaction
	);
};

export const transactionsReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SENDED_TRANSACTIONS: {
			return {
				...state,
				sended: action.payload.transactions,
			};
		}
		case SET_RECEIVED_TRANSACTIONS: {
			return {
				...state,
				received: action.payload.transactions,
			};
		}
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: action.payload.isLoading,
			};
		}
		case ADD_SEND_TRANSACTION: {
			return {
				...state,
				sended: [...state.sended, action.payload.send],
			};
		}
		case CHANGE_STATUS: {
			const id = action.payload.id;
			const sended = haveTransaction(state.sended, id)
				? finishTransaction(state.sended, id)
				: state.sended;

			const received = haveTransaction(state.received, id)
				? finishTransaction(state.received, id)
				: state.received;
			return {
				...state,
				sended,
				received,
			};
		}
		default: {
			return state;
		}
	}
};

export const setSendedTransactionsAC = (transactions) => {
	return {
		type: SET_SENDED_TRANSACTIONS,
		payload: {
			transactions,
		},
	};
};

export const setReceivedTransactionsAC = (transactions) => {
	return {
		type: SET_RECEIVED_TRANSACTIONS,
		payload: {
			transactions,
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

export const addSendTransactionAC = (send) => {
	return {
		type: ADD_SEND_TRANSACTION,
		payload: {
			send,
		},
	};
};

export const changeStatus = (id) => {
	return {
		type: CHANGE_STATUS,
		payload: {
			id,
		},
	};
};

export const loadSendedTransactionThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(toggleLoadingAC(true));
			const sendedTransactions = await getSendedTransactionsApi();
			const transactions = sendedTransactions.map(toValidTransaction);

			dispatch(setSendedTransactionsAC(transactions));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(toggleLoadingAC(false));
		}
	};
};

export const loadReceivedTransactionThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(toggleLoadingAC(true));
			const receivedTransactions = await getReceivedTransactionsApi();
			const transactions = receivedTransactions.map(toValidTransaction);

			dispatch(setReceivedTransactionsAC(transactions));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(toggleLoadingAC(false));
		}
	};
};

export const sendTransactionThunk = (
	receiver,
	value,
	keyword,
	description,
	category
) => {
	return async (dispatch) => {
		try {
			const transaction = await sendTransactionApi(
				receiver,
				value,
				keyword,
				description,
				category
			);

			dispatch(addSendTransactionAC(toValidTransaction(transaction)));
			dispatch(changeBalanceAC(-value));
		} catch (e) {
			console.log(e);
		}
	};
};

export const acceptTransactionThunk = (id, keyword) => {
	return async (dispatch) => {
		try {
			const transaction = await acceptTransactionApi(id, keyword);
			dispatch(changeBalanceAC(transaction.money));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(changeStatus(id));
		}
	};
};

export const cancelTransactionThunk = (id) => {
	return async (dispatch) => {
		try {
			const transaction = await cancelTransactionApi(id);
			dispatch(changeStatus(id));
			dispatch(changeBalanceAC(transaction.money));
		} catch (e) {
			console.log(e);
		}
	};
};
