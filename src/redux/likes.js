import {
	baseURL,
	requestHeaders,
	handleHTTPResponse,
	asyncInitialState,
	asyncCases,
	createActions,
	createReducer
} from "./helpers"

const url = baseURL + "/likes"

const LIKE = createActions("like")
export const like = messageId => (dispatch, getState) => {
	dispatch(LIKE.START())

	const token = getState().auth.login.result.token

	return fetch(url, {
		method: "POST",
		headers: { Authorization: "Bearer " + token, ...requestHeaders },
		body: JSON.stringify({ messageId })
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(LIKE.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(LIKE.FAIL(error))))
}

const UNLIKE = createActions("unlike")
export const unlike = likeId => (dispatch, getState) => {
	dispatch(UNLIKE.START())

	const token = getState().auth.login.result.token

	return fetch(`${url}/${likeId}`, {
		method: "DELETE",
		headers: { Authorization: "Bearer " + token, ...requestHeaders }
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(UNLIKE.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(UNLIKE.FAIL(error))))
}

export const reducers = {
	like: createReducer(asyncInitialState, { ...asyncCases(LIKE) }),
	unlike: createReducer(asyncInitialState, { ...asyncCases(UNLIKE) }),
}