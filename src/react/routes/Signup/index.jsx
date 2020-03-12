import React, { Component, Fragment } from "react"
import { Title, AuthSignup } from "../../components"
import { userIsNotAuthenticated } from "../../HOCs"

class Signup extends Component {
	render = () => (
		<Fragment>
			<Title />
			<AuthSignup />
		</Fragment>
	)
}

export default userIsNotAuthenticated(Signup)