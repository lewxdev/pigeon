import {
	baseURL,
	requestHeaders,
	handleHTTPResponse,
	asyncInitialState,
	asyncCases,
	createActions,
	createReducer
} from "./helpers"

const url = baseURL + "/messages"

const FEED = createActions("feed")
export const feed = (username, limit, offset) => dispatch => {
	dispatch(FEED.START())

	const parameters = { username, limit, offset }
	let queryURL = url

	for (let query in parameters)
		if (parameters[query])
			queryURL += `?${query}=${parameters[query]}`

	return fetch(queryURL, {
		method: "GET",
		headers: requestHeaders
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(FEED.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(FEED.FAIL(error))))
}

const CREATE = createActions("create")
export const create = message => (dispatch, getState) => {
	dispatch(CREATE.START())

	const token = getState().auth.login.result.token

	return fetch(url, {
		method: "POST",
		headers: { Authorization: "Bearer " + token, ...requestHeaders },
		body: JSON.stringify({ text: message })
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(CREATE.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(CREATE.FAIL(error))))
}

const GET_MESSAGE = createActions("getMessage")
export const getMessage = messageId => (dispatch, getState) => {
	dispatch(GET_MESSAGE.START())

	return fetch(`${url}/${messageId}`, {
		method: "GET",
		headers: requestHeaders
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(GET_MESSAGE.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(GET_MESSAGE.FAIL(error))))
}

const DELETE_MESSAGE = createActions("deleteMessage")
export const deleteMessage = messageId => (dispatch, getState) => {
	dispatch(DELETE_MESSAGE.START())

	const token = getState().auth.login.result.token

	return fetch(`${url}/${messageId}`, {
		method: "DELETE",
		headers: { Authorization: "Bearer " + token, ...requestHeaders }
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(DELETE_MESSAGE.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(DELETE_MESSAGE.FAIL(error))))
}

export const reducers = {
	feed: createReducer(asyncInitialState, { ...asyncCases(FEED) }),
	create: createReducer(asyncInitialState, { ...asyncCases(CREATE) }),
	deleteMessage: createReducer(asyncInitialState, { ...asyncCases(DELETE_MESSAGE) })
}