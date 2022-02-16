/*
state: {
  isLoading: boolean
  list: Vote[]
}

Vote {
  id: number;
  candidate: string;
  voters: string[]
  against: string;
  isFinish: boolean
}
*/

import {
	getVotesApi,
	voteAgainstApi,
	voteForApi,
	setUserOnOfferApi,
} from "../api";
import { toValidVote } from "../utils";
import { setOnOfferAC } from "./users";

export const SET_VOTES = "transfer/votes/SET_VOTES";
export const TOGGLE_LOADING = "transfer/votes/TOGGLE_LOADING";
export const VOTE = "transfer/votes/VOTE";
export const ADD_OFFER = "transfer/votes/ADD_OFFER";

const initialState = {
	isLoading: false,
	list: [],
};

const vote = (votes, receivedVote) => {
	return votes.map((vote) =>
		+vote.id === +receivedVote.id ? receivedVote : vote
	);
};

export const votesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_VOTES: {
			return {
				...state,
				list: action.payload.votes,
			};
		}
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: action.payload.isLoading,
			};
		}
		case VOTE: {
			const { vote: receivedVote } = action.payload;
			return {
				...state,
				list: vote(state.list, receivedVote),
			};
		}
		case ADD_OFFER: {
			return {
				...state,
				list: [...state.list, action.payload.offer],
			};
		}
		default: {
			return state;
		}
	}
};

export const setVotesAC = (votes) => {
	return {
		type: SET_VOTES,
		payload: {
			votes,
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
export const voteAC = (vote) => {
	return {
		type: VOTE,
		payload: {
			vote,
		},
	};
};
export const addOfferAC = (offer) => {
	return {
		type: ADD_OFFER,
		payload: {
			offer,
		},
	};
};

export const loadVotesThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(toggleLoadingAC(true));
			const votes = await getVotesApi();

			dispatch(setVotesAC(votes.map(toValidVote)));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(toggleLoadingAC(false));
		}
	};
};

export const voteForThunk = (voteId) => {
	return async (dispatch) => {
		try {
			const vote = await voteForApi(voteId);
			dispatch(voteAC(toValidVote(vote)));
		} catch (e) {
			console.log(e);
		}
	};
};

export const voteAgainstThunk = (voteId) => {
	return async (dispatch) => {
		try {
			const vote = await voteAgainstApi(voteId);
			dispatch(voteAC(toValidVote(vote)));
		} catch (e) {
			console.log(e);
		}
	};
};

export const setOnOfferThunk = (login) => {
	return async (dispatch) => {
		try {
			const offer = await setUserOnOfferApi(login);
			dispatch(addOfferAC(toValidVote(offer)));
			dispatch(setOnOfferAC(login));
		} catch (e) {
			console.log(e);
		}
	};
};
