import React, { Component, Fragment } from "react"
import Login from "../../components/Login"
import { Header } from "semantic-ui-react"
import { userIsNotAuthenticated } from "../../HOCs"

class Launch extends Component {
	render = () => (
		<Fragment>
			<Header
				as="h1"
				size="huge"
				color="grey">
				KA Kwitter
				<Header.Subheader
					content="Inclusive global micro-blogging" />
			</Header>
			<Login />
		</Fragment>
	)
}

export default userIsNotAuthenticated(Launch)
