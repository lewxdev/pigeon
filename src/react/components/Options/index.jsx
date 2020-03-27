import React, { Component } from "react"
import { Modal } from "semantic-ui-react"

export default class Options extends Component {
	state = { open: false }

	show = () => this.setState({ open: true })
	hide = () => this.setState({ open: false })

	render = () => (
		<Modal
			closeIcon
			onClose={this.hide}
			open={this.state.open} >
		</Modal>
	)
}