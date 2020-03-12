import React, { Component } from "react"
import { Switch, Route } from "react-router-dom"
import { Home, Login, NotFound, Signup, User } from "./routes"

export default class App extends Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Home} />
				<Route exact path="/login" component={Login} />
				<Route exact path="/signup" component={Signup} />
				<Route exact path="/user/:username" component={User} />
				<Route path="*" component={NotFound} />
			</Switch>
		)
	}
}