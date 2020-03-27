import React, { Component } from "react"
import { connect } from "react-redux"
import { logout } from "../../../redux"
import { Link } from "react-router-dom"
import { Menu, Image } from "semantic-ui-react"
import { userIcon, homeIcon, logoutIcon } from "../../../icons"
import "./index.css"

class NavBar extends Component {
	state = { activeItem: "user" }

	handleSelect = (event) => this.setState({ activeItem: event.target.name })

	handleLogout = event => {
		event.preventDefault()
		this.props.logout()
	}

	render = () => (
		<Menu
			icon
			pointing
			secondary
			vertical
			className="NavBar"
			color="grey" >
			<Link
				to="/you"
				name="user"
				onClick={this.handleSelect}>
				<Menu.Item
					active={this.state.activeItem === "user"}
					style={{color:"#767676"}}>
					<Image src={userIcon} />
				</Menu.Item>
			</Link>
			
			<Link
				to="/"
				name="home"
				onClick={this.handleSelect}>
				<Menu.Item
					active={this.state.activeItem === "home"}
					style={{color:"#767676"}}>
					<Image src={homeIcon} />
				</Menu.Item>
			</Link>
			
			<Link
				to="/"
				onClick={this.handleLogout}>
				<Menu.Item
					style={{color:"#767676"}}>
					<Image src={logoutIcon} />
				</Menu.Item>
			</Link>
		</Menu>
	)
}

export default connect(
	state => ({
		result: state.auth.logout.result,
		loading: state.auth.logout.loading,
		error: state.auth.logout.error
	}),
	{ logout }
)( NavBar )