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
export const list = () => (dispatch, getState) => {
	dispatch(LIST.START())

	return fetch(url, {
		method: "GET",
		headers: jsonHeaders
	})
		.then(handleJsonResponse)
		.then(result => dispatch(LIST.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(LIST.FAIL(error))))
}

export const reducers = {
	list: createReducer(asyncInitialState, {
		...asyncCases(LIST)
	})
}