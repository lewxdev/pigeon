import React, { Component } from "react"
import { Title, AuthLogin } from "../../components"
import { userIsNotAuthenticated } from "../../HOCs"
import "./index.css"

class Login extends Component {
	render = () => (
		<section className="Login_wrapper">
			<Title />
			<AuthLogin />
		</section>
	)
}

export default userIsNotAuthenticated(Login)
