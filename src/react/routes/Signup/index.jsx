import React, { Component } from "react"
import { Title, AuthSignup } from "../../components"
import { userIsNotAuthenticated } from "../../HOCs"
import "./index.css"

class Signup extends Component {
	render = () => (
		<section className="Signup_wrapper">
			<Title />
			<AuthSignup />
		</section>
	)
}

export default userIsNotAuthenticated(Signup)