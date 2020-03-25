import {
	domain,
	jsonHeaders,
	handleJsonResponse,
	getInitStateFromStorage,
	asyncInitialState,
	asyncCases,
	createActions,
	createReducer
} from "./helpers"

const url = domain + "/likes"

const ADD = createActions("add")
export const add = id => (dispatch, getState) => {
	dispatch(ADD.START())

	return fetch(url, {
		method: "POST",
		headers: { ...jsonHeaders, Authorization: "Bearer " + getInitStateFromStorage("login", asyncInitialState).result.token },
		body: JSON.stringify({ messageId: id })
	})
		.then(handleJsonResponse)
		.then(result => dispatch(ADD.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(ADD.FAIL(error))))
}

const REMOVE = createActions("remove")
export const remove = id => (dispatch, getState) => {
	dispatch(REMOVE.START())

	return fetch(`${url}/${id}`, {
		method: "DELETE",
		headers: { ...jsonHeaders, Authorization: "Bearer " + getInitStateFromStorage("login", asyncInitialState).result.token }
	})
		.then(handleJsonResponse)
		.then(result => dispatch(REMOVE.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(REMOVE.FAIL(error))))
}

export const reducers = {
	add: createReducer(getInitStateFromStorage("login", asyncInitialState), {
		...asyncCases(ADD)
	}),
	remove: createReducer(getInitStateFromStorage("login", asyncInitialState), {
		...asyncCases(REMOVE)
	}),
}