import React, { Component, Fragment } from "react"
import { Title, AuthLogin } from "../../components"
import { userIsNotAuthenticated } from "../../HOCs"

class Launch extends Component {
	render = () => (
		<Fragment>
			<Title />
			<AuthLogin />
		</Fragment>
	)
}

export default userIsNotAuthenticated(Launch)
