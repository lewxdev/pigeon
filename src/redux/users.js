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

const url = domain + "/user"

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
		.catch(err => Promise.reject(dispatch(SIGNUP.FAIL(err))))
}

export const reducers = {
	signup: createReducer(getInitStateFromStorage("signup", asyncInitialState), {
		...asyncCases(SIGNUP),
		[SIGNUP.SUCCESS.toString()]: (state, action) => asyncInitialState
	})
}