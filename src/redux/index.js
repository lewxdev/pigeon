import { createBrowserHistory } from "history";
import { configureStore } from "@reduxjs/toolkit";
import { combineReducers } from "redux";
import { connectRouter } from "connected-react-router";
import { reducers as authReducers } from "./auth";
import { reducers as likesReducers } from "./likes";
import { reducers as messagesReducers } from "./messages"
import { reducers as usersReducers } from "./users";

export * from "./auth";
export * from "./likes";
export * from "./messages"
export * from "./users"

export const history = createBrowserHistory({
	basename: process.env.PUBLIC_URL
});

export const store = configureStore({
	reducer: {
		router: connectRouter(history),
		auth: combineReducers(authReducers),
		likes: combineReducers(likesReducers),
		messages: combineReducers(messagesReducers),
		users: combineReducers(usersReducers)
	},
	preloadedState: {},
	devTools: process.env.NODE_ENV !== "production"
});

store.subscribe(() => {
	localStorage.setItem("login", JSON.stringify(store.getState().auth.login));
});
