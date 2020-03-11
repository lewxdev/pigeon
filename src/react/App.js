import React from "react"
import { Switch, Route } from "react-router-dom"
import { Launch, NotFound, Register, User } from "./routes"
import "../index.css"

class App extends React.Component {
	render() {
		return (
			<Switch>
				<Route exact path="/" component={Launch} />
				<Route exact path="/signup" component={Register} />
				<Route exact path="/user/:username" component={User} />
				<Route path="*" component={NotFound} />
			</Switch>
		)
	}
}

export default App;
