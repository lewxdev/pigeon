import React, { Component, Fragment } from "react"
import { Form, Loader } from "semantic-ui-react"
import { Redirect, Link } from "react-router-dom"
import { connect } from "react-redux"
import { signup } from "../../../redux"
import "./index.css"

class AuthSignup extends Component {
	state = {
		redirect: false,
		userData: {
			displayName: "",
			username: "",
			password: ""
		}
	}

	handleSignup = event => {
		event.preventDefault()
		this.props.signup(this.state.userData)
			.then(response => this.setState({ redirect: true }))
	}

	handleChange = event => {
		this.setState({ userData: { ...this.state.userData, [event.target.name]: event.target.value } })
	}

	handleErrors = error => {
		if (error === "username must be unique") {
			return "Username already exists"
		} else if (error.includes("String too short.")) {
			const lengthError = "should be at least 3 characters"

			if (error.includes("displayName"))
				return `Display Name ${lengthError}`
			else if (error.includes("username"))
				return `Username ${lengthError}`
			else if (error.includes("password"))
				return `Password ${lengthError}`
		} else if (error.includes("String too long.")) {
			const lengthError = "can't be more than 20 characters"

			if (error.includes("displayName"))
				return `Display Name ${lengthError}`
			else if (error.includes("username"))
				return `Username ${lengthError}`
			else if (error.includes("password"))
				return `Password ${lengthError}`
		}
	}

	render = () => (
		<Fragment>
			<Form className="SignupForm" onSubmit={this.handleSignup}>
				<Form.Field className="SignupForm_input-fields">
					<Form.Input
						required
						name="displayName"
						placeholder="Display Name"
						onChange={this.handleChange} />
					<Form.Input
						required
						name="username"
						placeholder="Username"
						onChange={this.handleChange} />
					<Form.Input
						required
						name="password"
						placeholder="Password"
						type="password"
						onChange={this.handleChange} />
				</Form.Field>
				<Form.Field className="SignupForm_submit-options">
					<Link to="/">
						<Form.Button
							basic
							content="Back" />
					</Link>
					<Form.Button
						basic
						color="red"
						content="Signup"
						type="submit"
						disabled={this.props.loading} />
				</Form.Field>
			</Form>
			{this.props.loading && <Loader active inline="centered" />}
			{this.props.error && <p style={{ color: "red" }}>{this.handleErrors(this.props.error.message)}</p>}
			{this.state.redirect && <Redirect to="/" />}
		</Fragment>
	)
}

export default connect(
	state => ({
		result: state.users.signup.result,
		loading: state.users.signup.loading,
		error: state.users.signup.error
	}),
	{ signup }
)(AuthSignup)