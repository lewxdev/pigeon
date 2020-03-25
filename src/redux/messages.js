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

const url = domain + "/messages"

const LIST = createActions("list")
export const list = username => (dispatch, getState) => {
	dispatch(LIST.START())

	const queryURL = username ? `${url}?username=${username}` : url

	return fetch(queryURL, {
		method: "GET",
		headers: jsonHeaders
	})
		.then(handleJsonResponse)
		.then(result => dispatch(LIST.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(LIST.FAIL(error))))
}

const CREATE = createActions("create")
export const create = message => (dispatch, getState) => {
	dispatch(CREATE.START())

	return fetch(url, {
		method: "POST",
		headers: { ...jsonHeaders, Authorization: "Bearer " + getInitStateFromStorage("login", asyncInitialState).result.token },
		body: JSON.stringify({ text: message })
	})
		.then(handleJsonResponse)
		.then(result => dispatch(CREATE.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(CREATE.FAIL(error))))
}

export const reducers = {
	list: createReducer(asyncInitialState, {
		...asyncCases(LIST)
	}),
	create: createReducer(getInitStateFromStorage("login", asyncInitialState), {
		...asyncCases(CREATE)
	}),
}