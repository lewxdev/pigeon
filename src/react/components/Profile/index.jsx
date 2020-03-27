import React, { Component } from "react"
import { Card, Image /*, Button, Icon */ } from "semantic-ui-react"
import { connect } from "react-redux"
import { getUser } from "../../../redux"
import { avatarIcon } from "../../../icons"
import { baseURL } from "../../../redux/helpers"
import "./index.css"

class Profile extends Component {
	state = {}

	componentDidMount = () => {
		this.props.getUser(this.props.username).then(result => this.setState(result.payload.user))
	}

	render = () => (
		<div className="Profile_wrapper">
			<Card fluid className="Profile_Card">
				<Card.Content>
					<Image
						avatar
						size="big"
						floated="left"
						src={this.state.pictureLocation ? baseURL + this.state.pictureLocation : avatarIcon} />
					<Card.Header children={this.state.displayName} />
					<Card.Meta children={`@${this.state.username}`} />
					<Card.Description children={this.state.about} />
					{/* <Button icon circular className="Profile_edit-avatar">
						<Icon name="edit outline"  />
					</Button> */}
				</Card.Content>
			</Card>
		</div>
	);
}

export default connect(() => ({}), { getUser })(Profile)
