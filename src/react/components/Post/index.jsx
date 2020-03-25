import React, { Component } from "react"
import { Feed, Image } from "semantic-ui-react"
import { heartIcon, heartFilledIcon, avatarIcon } from "../../../icons"
import { connect } from "react-redux"
import { get, add, remove } from "../../../redux"
import { domain, getInitStateFromStorage, asyncInitialState } from "../../../redux/helpers"
import "./index.css"

class Post extends Component {
	state = {}

	componentDidMount = () => {
		this.props.get(this.props.username).then(result => this.setState(result.payload.user))
	}
	
	handleRelativeDate = date => {
		let difference = new Date() - new Date(date)
		const minutes = Math.floor(difference / 60000)
		const hours = Math.floor(difference / 3600000)
		const days = Math.floor(difference / 86400000)
		const weeks = Math.floor(difference / 604800000)

		if (difference < 60000)
			return "a few seconds"
		else if (difference < 3600000)
			return `${minutes} minute${minutes > 1 ? "s" : ""}`
		else if (difference < 86400000)
			return `${hours} hour${hours > 1 ? "s" : ""}`
		else if (difference < 604800000)
			return `${days} day${days > 1 ? "s" : ""}`
		else return `${weeks} week${weeks > 1 ? "s" : ""}`
	}

	handleLikeStatus = () => {
		const currentUsername = getInitStateFromStorage("login", asyncInitialState).result.username

		if (this.props.likes.some(data => data.username === currentUsername))
			return true
	}

	handleToggleLike = () => {
		const currentUsername = getInitStateFromStorage("login", asyncInitialState).result.username

		if (!this.handleLikeStatus()) 
			this.props.add(this.props.id)
		else
			this.props.remove(this.props.likes.find(data => data.username === currentUsername).id)
	}

	render = () => (
		<Feed className="Post_wrapper">
			<Feed.Event className="Post">
				<Feed.Label className="Post_user-picture">
					<img alt={`@${this.props.username}'s Avatar`} src={this.state.pictureLocation ? `${domain}${this.state.pictureLocation}` : avatarIcon} />
				</Feed.Label>
				<Feed.Content>
					<Feed.Summary>
						<Feed.User>
							<div>{this.state.displayName}</div>
							<div>@{this.props.username}</div>
						</Feed.User>
						<Feed.Date
							className="Post_timestamp"
							content={`${this.handleRelativeDate(this.props.createdAt)} ago`} />
					</Feed.Summary>
					<Feed.Extra text children={this.props.text} />
						<Feed.Like className="Post_like" onClick={this.handleToggleLike}>
							<Image src={this.handleLikeStatus() ? heartFilledIcon : heartIcon} /> {this.props.likes.length}
						</Feed.Like>
				</Feed.Content>
			</Feed.Event>
		</Feed>
	)
}

export default connect(
	state => ({
		result: state.users.get.result,
		loading: state.users.get.loading,
		error: state.users.get.error
	}),
	{ get, add, remove }
)(Post)