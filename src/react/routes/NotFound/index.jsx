import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { userIsNotAuthenticated } from "../../HOCs"

class NotFound extends Component {
	render = () => (
		<Fragment>
			<p>Page not found for {this.props.location.pathname}</p>
			<Link to="/">Go Home</Link>
		</Fragment>
	)
}

export default userIsNotAuthenticated(NotFound)
