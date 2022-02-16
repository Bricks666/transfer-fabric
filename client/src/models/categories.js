/*
state: {
  isLoading: boolean;
  list: category[]
}

CAtegory {
  id: number;
  name: string
}
*/

import { addCategoryApi, getCategoriesApi } from "../api";

export const SET_CATEGORIES = "transfer/categories/SET_CATEGORIES";
export const TOGGLE_LOADING = "transfer/categories/TOGGLE_LOADING";
export const ADD_CATEGORY = "transfer/categories/ADD_CATEGORY";

const initialState = {
	isLoading: false,
	list: [],
};

export const categoriesReducer = (state = initialState, action) => {
	switch (action.type) {
		case SET_CATEGORIES: {
			return {
				...state,
				list: action.payload.categories,
			};
		}
		case TOGGLE_LOADING: {
			return {
				...state,
				isLoading: action.payload.isLoading,
			};
		}
		case ADD_CATEGORY: {
			return {
				...state,
				list: [...state.list, action.payload.category],
			};
		}
		default: {
			return state;
		}
	}
};

export const setCategoriesAC = (categories) => {
	return {
		type: SET_CATEGORIES,
		payload: {
			categories,
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

export const addCategoryAC = (category) => {
	return {
		type: ADD_CATEGORY,
		payload: {
			category,
		},
	};
};

export const loadCategoriesThunk = () => {
	return async (dispatch) => {
		try {
			dispatch(toggleLoadingAC(true));
			const categories = await getCategoriesApi();
			dispatch(setCategoriesAC(categories));
		} catch (e) {
			console.log(e);
		} finally {
			dispatch(toggleLoadingAC(false));
		}
	};
};

export const addCategoryThunk = (categoryName) => {
	return async (dispatch) => {
		try {
			const category = await addCategoryApi(categoryName);
			dispatch(addCategoryAC(category));
		} catch (e) {
			console.log(e);
		}
	};
};
