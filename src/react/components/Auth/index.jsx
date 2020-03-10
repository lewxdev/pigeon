import React, { Component, Fragment } from "react"
import { Form, Loader } from "semantic-ui-react"
import { connect } from "react-redux"
import { login } from "../../../redux"
import "./index.css"

class Auth extends Component {
	state = { username: "", password: "" }

	handleAuth = event => {
		event.preventDefault()
		this.props.login(this.state)
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	render = () =>
		<Fragment>
			<Form className="LoginForm" onSubmit={this.handleAuth}>
				<Form.Field className="LoginForm_input-fields">
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
				<Form.Field className="LoginForm_submit-options">
					<Form.Button
						basic
						color="grey"
						content="Login"
						type="submit"
						disabled={this.props.loading} />
					<Form.Button
						basic
						color="red"
						content="Register"
						type="submit"
						disabled={this.props.loading} />
				</Form.Field>
			</Form>
			{this.props.loading && <Loader active inline="centered" />}
			{this.props.error && <p style={{ color: "red" }}>{this.props.error.message}</p>}
		</Fragment>
}

export default connect(
	state => ({
		result: state.auth.login.result,
		loading: state.auth.login.loading,
		error: state.auth.login.error
	}),
	{ login }
)(Auth)