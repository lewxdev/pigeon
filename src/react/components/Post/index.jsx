import React, { Component } from "react"
import { Feed, Image } from "semantic-ui-react"
import { heartIcon, avatarIcon } from "../../../icons"
import "./index.css"

export default class Post extends Component {
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

	render = () => (
		<Feed className="Post_wrapper">
			<Feed.Event className="Post">
				<Feed.Label className="Post_user-picture">
					<img src={avatarIcon} />
				</Feed.Label>
				<Feed.Content>
					<Feed.Summary>
						<Feed.User>
							<div>@{this.props.username}</div>
						</Feed.User>
						<Feed.Date
							className="Post_timestamp"
							content={`${this.handleRelativeDate(this.props.createdAt)} ago`} />
					</Feed.Summary>
					<Feed.Extra text children={this.props.text} />
						<Feed.Like className="Post_like">
							<Image src={heartIcon} /> {this.props.likes.length}
						</Feed.Like>
				</Feed.Content>
			</Feed.Event>
		</Feed>
	)
}