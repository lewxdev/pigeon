import {
	baseURL,
	requestHeaders,
	handleHTTPResponse,
	asyncInitialState,
	asyncCases,
	createActions,
	createReducer
} from "./helpers"

const url = baseURL + "/users"

const GET_USER_LIST = createActions("getUserList")
export const getUserList = () => dispatch => {
	dispatch(GET_USER_LIST.START())

	return fetch(url, {
		method: "GET",
		headers: requestHeaders
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(GET_USER_LIST.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(GET_USER_LIST.FAIL(error))))
}

const SIGNUP = createActions("signup")
export const signup = signupData => dispatch => {
	dispatch(SIGNUP.START())

	return fetch(url, {
		method: "POST",
		headers: requestHeaders,
		body: JSON.stringify(signupData)
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(SIGNUP.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(SIGNUP.FAIL(error))))
}

const GET_USER = createActions("getUser")
export const getUser = username => dispatch => {
	dispatch(GET_USER.START())

	return fetch(`${url}/${username}`, {
		method: "GET",
		headers: requestHeaders
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(GET_USER.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(GET_USER.FAIL(error))))
}

const UPDATE_USER = createActions("updateUser")
export const updateUser = (username, userData) => dispatch => {
	dispatch(UPDATE_USER.START())

	return fetch(`${url}/${username}`, {
		method: "PATCH",
		headers: requestHeaders,
		body: JSON.stringify(userData)
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(UPDATE_USER.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(UPDATE_USER.FAIL(error))))
}

const DELETE_USER = createActions("deleteUser")
export const deleteUser = username => dispatch => {
	dispatch(DELETE_USER.START())

	return fetch(`${url}/${username}`, {
		method: "DELETE",
		headers: requestHeaders
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(DELETE_USER.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(DELETE_USER.FAIL(error))))
}

const GET_USER_AVATAR = createActions("getUserAvatar")
export const getUserAvatar = username => dispatch => {
	dispatch(GET_USER_AVATAR.START())

	return fetch(`${url}/${username}/picture`, {
		method: "GET",
		headers: requestHeaders
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(GET_USER_AVATAR.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(GET_USER_AVATAR.FAIL(error))))
}

const SET_USER_AVATAR = createActions("setUserAvatar")
export const setUserAvatar = (username, pictureData) => (dispatch, getState) => {
	dispatch(SET_USER_AVATAR.START())

	const token = getState().auth.login.result.token

	return fetch(`${url}/${username}/picture`, {
		method: "PUT",
		headers: { Authorization: "Bearer " + token, ...requestHeaders },
		body: JSON.stringify({ pictureData })
	})
		.then(handleHTTPResponse)
		.then(result => dispatch(SET_USER_AVATAR.SUCCESS(result)))
		.catch(error => Promise.reject(dispatch(SET_USER_AVATAR.FAIL(error))))
}

export const reducers = {
	getUserList: createReducer(asyncInitialState, { ...asyncCases(GET_USER_LIST) }),
	signup: createReducer(asyncInitialState, { ...asyncCases(SIGNUP) }),
	getUser: createReducer(asyncInitialState, { ...asyncCases(GET_USER) }),
	updateUser: createReducer(asyncInitialState, { ...asyncCases(UPDATE_USER) }),
	getUserAvatar: createReducer(asyncInitialState, { ...asyncCases(GET_USER_AVATAR) }),
	setUserAvatar: createReducer(asyncInitialState, { ...asyncCases(SET_USER_AVATAR) }),
	deleteUser: createReducer(asyncInitialState, { ...asyncCases(DELETE_USER) })
}