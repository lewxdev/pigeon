import React, { Component } from "react"
import { Header, Image } from "semantic-ui-react"
import { oriBirdIcon } from "../../../icons"

export default class Title extends Component {
	render = () => (
		<Header as="h1" size="huge">
			<Image src={oriBirdIcon} />
			<Header.Content>
				Pigeon
				<Header.Subheader content="Inclusive global micro-blogging" />
			</Header.Content>
		</Header>
	)
}