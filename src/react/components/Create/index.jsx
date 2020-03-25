import React, { Component } from "react"
import { Form, Input } from "semantic-ui-react"
import { connect } from "react-redux"
import { create } from "../../../redux"
import "../Post/index.css"
import "./index.css"

class Create extends Component {
	state = { postContent: "" }

	handleChange = event => {
		this.setState({ postContent: event.target.value })
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.create(this.state.postContent)
	}

	render = () => (
		<Form className="Create Post_wrapper" onSubmit={this.handleSubmit}>
			<Input onChange={this.handleChange} className="Post" transparent action="Post" fluid />
		</Form>
	)
}
 
export default connect(
	state => ({
		result: state.messages.create.result,
		loading: state.messages.create.loading,
		error: state.messages.create.error
	}),
	{ create }
)(Create)