import React from "react"
import { Switch, Route } from "react-router-dom"
import Lanuch from "./Launch"
import Profile from "./Profile"
import NotFound from "./NotFound"
import "../index.css"

class App extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Lanuch} />
				<Route exact path="/profiles/:username" component={Profile} />
				<Route path="*" component={NotFound} />
			</Switch>
		)
	}
}

export default App;
