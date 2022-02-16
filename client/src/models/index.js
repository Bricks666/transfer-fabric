import { applyMiddleware, combineReducers, createStore } from "redux";
import thunk from "redux-thunk";
import { composeWithDevTools } from "@redux-devtools/extension";
import { authReducer } from "./auth";
import { userReducer } from "./user";
import { transactionsReducer } from "./transactions";
import { categoriesReducer } from "./categories";
import { samplesReducer } from "./samples";
import { usersReducer } from "./users";
import { votesReducer } from "./votes";

const rootReducer = combineReducers({
	auth: authReducer,
	user: userReducer,
	transactions: transactionsReducer,
	categories: categoriesReducer,
	samples: samplesReducer,
	users: usersReducer,
	votes: votesReducer,
});

export const store = createStore(
	rootReducer,
	composeWithDevTools(applyMiddleware(thunk))
);
