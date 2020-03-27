import {
	baseURL,
	requestHeaders,
	handleHTTPResponse,
	getInitStateFromStorage,
	asyncInitialState,
	asyncCases,
	createActions,
	createReducer
} from "./helpers"

const url = baseURL + "/auth"

const LOGIN = createActions("login")
export const login = loginData => dispatch => {
	dispatch(LOGIN.START())

	return fetch(url + "/login", {
		method: "POST",
		headers: requestHeaders,
		body: JSON.stringify(loginData)
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(LOGIN.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(LOGIN.FAIL(error))))
}

const LOGOUT = createActions("logout")
export const logout = () => (dispatch, getState) => {
	dispatch(LOGOUT.START())

	const token = getState().auth.login.result.token

	return fetch(url + "/logout", {
		method: "GET",
		headers: { Authorization: "Bearer " + token, ...requestHeaders }
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(LOGOUT.SUCCESS(result)))
		.catch(err => Promise.reject(dispatch(LOGOUT.FAIL(err))))
}

export const reducers = {
	login: createReducer(getInitStateFromStorage("login", asyncInitialState), {
		...asyncCases(LOGIN),
		[LOGOUT.SUCCESS.toString()]: (state, action) => asyncInitialState
	}),
	logout: createReducer(asyncInitialState, { ...asyncCases(LOGOUT) })
}
