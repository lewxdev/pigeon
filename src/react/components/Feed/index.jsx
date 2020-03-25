import React, { Component } from "react"
import { Feed as FeedUI } from "semantic-ui-react"
import { Post } from "../../components"
import { connect } from "react-redux"
import { list } from "../../../redux"

class Feed extends Component {
	state = { messages: [] }

	componentDidMount = () => {
		this.props.list(this.props.username).then(result => this.setState({ messages: result.payload.messages }))
	}
	
	render = () => (
		<FeedUI>
			{this.state.messages.map(messageData =>
				<Post key={messageData.id} {...messageData}  />)}
		</FeedUI>
	)
}

export default connect(
	state => ({
		result: state.messages.list.result,
		loading: state.messages.list.loading,
		error: state.messages.list.error
	}),
	{ list }
)(Feed)