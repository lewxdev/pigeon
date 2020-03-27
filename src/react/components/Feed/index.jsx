import React, { Component } from "react"
import { Feed as FeedUI } from "semantic-ui-react"
import { Post } from "../../components"
import { connect } from "react-redux"
import { feed, deleteMessage } from "../../../redux"

class Feed extends Component {
	constructor(props) {
		super(props)
		this.feed = React.createRef()
		this.state = {
			messages: [],
			listData: {
				lastPostId: null,
				totalPages: null,
				page: 0
			}
		}
	}

	componentDidMount = () => {
		this.updateFeed = (page, limit = 15) => {
			this.props.feed(this.props.username, limit, limit + limit * this.state.listData.page)
				.then(result => {
					this.setState({
						listData: {
							...this.state.listData,
							totalPages: Math.ceil(result.payload.count / result.payload.messages.length),
							lastPostId: result.payload.messages[0].id
						}
					})

					this.setState({ messages: result.payload.messages })
				})
		}

		this.updateFeed()
		this.componentIntervalUpdate = setInterval(this.updateFeed, 1000)

		this.handleScroll = event => {
			console.log(this.feed.current)
		}

		window.addEventListener("scroll", this.handleScroll)
	}

	componentWillUnmount = () => {
		clearInterval(this.componentIntervalUpdate)
	}

	handleDeletePost = id => {
		if (window.confirm("Are you sure you want to delete this post?")) {
			this.props.deleteMessage(id)
			this.setState({ messages: this.state.messages.filter(message => message.id !== id) })
		}
	}
	
	render = () => (
		<div ref={this.feed}>
			<FeedUI >
			{this.state.messages.map(messageData =>
				<Post
					key={messageData.id}
					handleDeletePost={() => this.handleDeletePost(messageData.id)}
					initialMessageData={messageData}  />)}
			</FeedUI>
		</div>
	)
}             

export default connect(
	state => ({ result: state.messages.feed.result }),
	{ feed, deleteMessage }
)(Feed)