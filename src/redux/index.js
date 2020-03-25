import { createBrowserHistory } from "history";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducers as authReducers } from "./auth";
import { reducers as usersReducers } from "./users";
import { reducers as messagesReducers } from "./messages"

export * from "./auth";
export * from "./messages"
export * from "./users"

export const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL
});

export const store = configureStore({
	reducer: {
		router: connectRouter(history),
		auth: combineReducers(authReducers),
		messages: combineReducers(messagesReducers),
		users: combineReducers(usersReducers)
	},
	preloadedState: {},
	devTools: process.env.NODE_ENV !== "production"
});

store.subscribe(() => {
	localStorage.setItem("login", JSON.stringify(store.getState().auth.login));
});
