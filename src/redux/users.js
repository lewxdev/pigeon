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

const url = domain + "/users"

const SIGNUP = createActions("signup")
export const signup = signupData => dispatch => {
	dispatch(SIGNUP.START())

	return fetch(url, {
		method: "POST",
		headers: jsonHeaders,
		body: JSON.stringify(signupData)
	})
		.then(handleJsonResponse)
		.then(result => dispatch(SIGNUP.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(SIGNUP.FAIL(error))))
}

const GET = createActions("get")
export const get = () => dispatch => {
	dispatch(GET.START())

	return fetch(url, {
		method: "GET",
		headers: jsonHeaders
	})
		.then(handleJsonResponse)
		.then(result => dispatch(GET.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(GET.FAIL(error))))
}

export const reducers = {
	signup: createReducer(getInitStateFromStorage("signup", asyncInitialState), {
		...asyncCases(SIGNUP),
		[SIGNUP.SUCCESS.toString()]: (state, action) => asyncInitialState
	}),
	get: createReducer(asyncInitialState, {
		...asyncCases(GET)
	})
}