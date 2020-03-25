import React, { Component } from "react"
import { Card, Image } from "semantic-ui-react"
import { connect } from "react-redux"
import { get } from "../../../redux"
import { avatarIcon } from "../../../icons"
import { domain } from "../../../redux/helpers"
import "./index.css"

class Profile extends Component {
	state = {}

	componentDidMount = () => {
		this.props.get(this.props.username).then(result => this.setState(result.payload.user))
	}

	render = () => (
		<Card fluid className=".Profile_wrapper">
			<Card.Content>
				<Image
					avatar
					size="big"
					floated="left"
					src={this.state.pictureLocation ? `${domain}${this.state.pictureLocation}` : avatarIcon} />
				<Card.Header children={this.state.displayName} />
				<Card.Meta children={`@${this.state.username}`} />
				<Card.Description children={this.state.about} />
			</Card.Content>
		</Card>
	);
}

export default connect(
	state => ({
		result: state.users.get.result,
		loading: state.users.get.loading,
		error: state.users.get.error
	}),
	{ get }
)(Profile)
