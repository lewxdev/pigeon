import React from "react"
import ReactDOM from "react-dom"
import { Provider } from "react-redux"
import { ConnectedRouter } from "connected-react-router"
import { App } from "./react"
import { store, history } from "./redux"
import "./index.css"

import { getInitStateFromStorage, asyncInitialState } from "./redux/helpers"

// console.log(getInitStateFromStorage("login", asyncInitialState).result.token)

ReactDOM.render(
	<Provider store={store}>
		<ConnectedRouter history={history}>
			<App />
		</ConnectedRouter>
	</Provider>,
	document.getElementById("root")
)