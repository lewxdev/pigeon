import React, { Component } from "react"
import { connect } from "react-redux"
import { getUser, getMessage, deleteMessage, like, unlike } from "../../../redux"
import { baseURL } from "../../../redux/helpers"

import { Feed, Image } from "semantic-ui-react"
import { deleteIcon, heartIcon, heartFilledIcon, avatarIcon } from "../../../icons"
import "./index.css"

class Post extends Component {
	state = {
		userData: {},
		messageData: this.props.initialMessageData
	}

	componentDidMount = () => {
		this.props.getUser(this.state.messageData.username)
			.then(result => this.setState({ userData: result.payload.user }))

		this.updateData = () => {
			this.props.getMessage(this.state.messageData.id).then(result => {
				this.setState({
					messageData: {
						relativeDate: this.handleRelativeDate(this.state.messageData.createdAt),
						likes: [ result.payload.likes ],
						...this.state.messageData
					}
				})
			})
		}
		
		this.updateData()
		this.componentIntervalUpdate = setInterval(this.updateData, 60000)
	}

	componentWillUnmount = () => {
		clearInterval(this.componentIntervalUpdate)
	}
	
	handleRelativeDate = date => {
		let difference = new Date() - new Date(date)
		const minutes = Math.floor(difference / 60000)
		const hours = Math.floor(difference / 3600000)
		const days = Math.floor(difference / 86400000)
		const weeks = Math.floor(difference / 604800000)

		if (difference < 60000)
			return "a few seconds ago"
		else if (difference < 3600000)
			return `${minutes} minute${minutes > 1 ? "s" : ""} ago`
		else if (difference < 86400000)
			return `${hours} hour${hours > 1 ? "s" : ""} ago`
		else if (difference < 604800000)
			return `${days} day${days > 1 ? "s" : ""} ago`
		else return `${weeks} week${weeks > 1 ? "s" : ""} ago`
	}

	currentUserLikesPost = () => {
		if (this.state.messageData.likes
			.some(data => data.username === this.props.currentUser))
				return true
	}

	toggleLike = () => {
		const process = !this.currentUserLikesPost() ? "like" : "unlike"
		const associatedId = !this.currentUserLikesPost() ? 
			this.state.messageData.id :
			this.state.messageData.likes.find(data => data.username === this.props.currentUser).id
		
		this.props[process](associatedId)
			.then(result => {
				if (process === "like")
					this.setState({ 
						messageData: { 
							...this.state.messageData,
							likes: [ ...this.state.messageData.likes, result.payload.like ]
						}
					})
				else this.setState({
					messageData: { 
						...this.state.messageData,
						likes: this.state.messageData.likes.filter(like => like.id !== result.payload.id)
					}
				})
			})
	}

	render = () => (
		<Feed className="Post_wrapper">
			<Feed.Event className="Post">
				<Feed.Label className="Post_user-picture">
					<Image
						avatar
						alt={`@${this.props.username}'s Avatar`}
						src={this.state.userData.pictureLocation ? baseURL + this.state.userData.pictureLocation : avatarIcon} />
				</Feed.Label>
				<Feed.Content>
					<Feed.Summary>
						<Feed.User
							href={`/user/${this.state.messageData.username}`} >
							<div>{this.state.userData.displayName}</div>
							<div>@{this.state.messageData.username}</div>
						</Feed.User>
						<Feed.Date
							className="Post_timestamp"
							content={this.state.messageData.relativeDate} />
					</Feed.Summary>
					<Feed.Extra text children={this.state.messageData.text} />
					<div className="Post_meta-content">
						<Feed.Like className="Post_like" onClick={this.toggleLike}>
							<Image src={this.currentUserLikesPost() ? heartFilledIcon : heartIcon} />
							{this.state.messageData.likes.length}
						</Feed.Like>
						{ this.state.messageData.username === this.props.currentUser && 
							<Feed.Label className="Post_delete" onClick={this.props.handleDeletePost}>
								<Image src={deleteIcon} />
							</Feed.Label> }
					</div>
				</Feed.Content>
			</Feed.Event>
		</Feed>
	)
}

export default connect(
	state => ({ currentUser: state.auth.login.result.username }),
	{ getUser, getMessage, deleteMessage, like, unlike }
)(Post)