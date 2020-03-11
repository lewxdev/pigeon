import React, { Component, Fragment } from "react"
import { Link } from "react-router-dom"
import { Form, Loader } from "semantic-ui-react"
import { connect } from "react-redux"
import { login } from "../../../redux"
import "./index.css"

class Login extends Component {
	state = { username: "", password: "" }

	handleLogin = event => {
		event.preventDefault()
		this.props.login(this.state)
	}

	handleChange = event => {
		this.setState({ [event.target.name]: event.target.value })
	}

	render = () => (
		<Fragment>
			<Form className="LoginForm" onSubmit={this.handleLogin}>
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
					<Link to="/signup">
						<Form.Button
							basic
							color="red"
							content="Signup"
							disabled={this.props.loading} />
					</Link>
				</Form.Field>
			</Form>
			{this.props.loading && <Loader active inline="centered" />}
			{this.props.error && <p style={{ color: "red" }}>{this.props.error.message}</p>}
		</Fragment>
	)
}

export default connect(
	state => ({
		result: state.auth.login.result,
		loading: state.auth.login.loading,
		error: state.auth.login.error
	}),
	{ login }
)(Login)