import React, { Component, Fragment } from "react"
import Signup from "../../components/Signup"
import { Header } from "semantic-ui-react"
import { userIsNotAuthenticated } from "../../HOCs"

class Register extends Component {
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
			<Signup />
		</Fragment>
	)
}

export default userIsNotAuthenticated(Register)