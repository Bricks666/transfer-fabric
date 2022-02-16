/*
state: {
  isLoading: boolean;
  list: Sample[]
}

Sample {
  categoryId: number;
  name: string;
  moneyCount: number
}
*/

import { addSampleApi, getSamplesApi } from "../api";
import { toValidSample } from "../utils";

export const SET_SAMPLES = "transfer/samples/SET_SAMPLES";
export const TOGGLE_LOADING = "transfer/samples/TOGGLE_LOADING";
export const ADD_SAMPLE = "transfer/samples/ADD_SAMPLE";

const initialState = {
	isLoading: false,
	list: [],
};

export const samplesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_SAMPLES: {
			return {
				...state,
				list: action.payload.samples,
			};
		}
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: action.payload.isLoading,
			};
		}
		case ADD_SAMPLE: {
			return {
				...state,
				list: [...state.list, action.payload.sample],
			};
		}
		default: {
			return state;
		}
	}
};

export const setSamplesAC = (samples) => {
	return {
		type: SET_SAMPLES,
		payload: {
			samples,
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

export const addSampleAC = (sample) => {
	return {
		type: ADD_SAMPLE,
		payload: {
			sample,
		},
	};
};

export const loadSamplesThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(toggleLoadingAC(true));
			const samples = Object.values(await getSamplesApi());
			dispatch(setSamplesAC(samples.map(toValidSample)));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(toggleLoadingAC(false));
		}
	};
};

export const addSampleThunk = (name, categoryId, moneyCount) => {
	return async (dispatch) => {
		try {
			const sample = await addSampleApi(name, categoryId, moneyCount);

			dispatch(addSampleAC(toValidSample(sample)));
		} catch (e) {
			console.log(e);
		}
	};
};
