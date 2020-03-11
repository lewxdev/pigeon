import React, { Component, Fragment } from "react"
import NavBar from "../../components/NavBar"
import { userIsAuthenticated } from "../../HOCs"

class User extends Component {
	render = () => (
		<Fragment>
			<NavBar isAuthenticated={this.props.isAuthenticated} />
			<h2>Profile</h2>
		</Fragment>
	)
}

export default userIsAuthenticated(User)
