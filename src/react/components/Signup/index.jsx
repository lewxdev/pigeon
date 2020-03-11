import React, { Component, Fragment } from "react"
import { Form, Loader } from "semantic-ui-react"
import { connect } from "react-redux"
import { signup } from "../../../redux"

class Signup extends Component {
	state = { username: "", displayName: "", password: ""}

	handleSignup = event => {
		event.preventDefault()
		this.props.signup(this.state)
			.then()
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
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
					<Form.Button
						basic
						color="red"
						content="Signup"
						type="submit"
						disabled={this.props.loading} />
				</Form.Field>
			</Form>
			{this.props.loading && <Loader active inline="centered" />}
			{this.props.error && <p style={{ color: "red" }}>{this.props.error.message}</p>}
		</Fragment>
	)
}

export default connect(
	state => ({
		result: state.users.signup.result,
		loading: state.users.signup.loading,
		error: state.users.signup.loading
	}),
	{ signup }
)(Signup)