import React, { Component } from "react"
import { Form, Input, Icon } from "semantic-ui-react"
import { connect } from "react-redux"
import { create } from "../../../redux"
import "../Post/index.css"
import "./index.css"

class Create extends Component {
	state = { postContent: "" }

	handleChange = event => {
		if (this.state.postContent.length < 255)
			this.setState({ postContent: event.target.value })
		else this.setState(prevState => prevState)
	}

	handleSubmit = event => {
		event.preventDefault()
		this.props.create(this.state.postContent)
			.then(result => console.log(result.payload.message))
			.then(this.setState({ postContent: "" }))
	}

	render = () => (
		<Form className="Create Post_wrapper" onSubmit={this.handleSubmit}>
			<Input
				fluid
				transparent
				placeholder="What's on your mind?"
				onChange={this.handleChange}
				className="Post"
				value={this.state.postContent}
				icon={<Icon className="Create Icon" name="angle double right" circular />} />
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