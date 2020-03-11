import React, { Component } from "react"
import { connect } from "react-redux"
import { logout } from "../../../redux"
import { Link } from "react-router-dom"
import { Menu, Image } from "semantic-ui-react"
import user_icon from "../../../icons/svg/user.svg"
import home_icon from "../../../icons/svg/home.svg"
import settings_icon from "../../../icons/svg/settings.svg"
import logout_icon from "../../../icons/svg/logout.svg"
import "./index.css"

class NavBar extends Component {
	state = { activeItem: "home" }

	handleSelect = (event, { name }) => this.setState({ activeItem: name })

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
			color="grey"
			size="mini">
			<Link
				to="/you"
				name="user"
				onClick={this.handleSelect}>
				<Menu.Item
					active={this.state.activeItem === "user"}
					style={{color:"#767676"}}>
					<Image src={user_icon} fluid size="tiny" />
				</Menu.Item>
			</Link>
			
			<Link
				to="/home"
				name="home"
				onClick={this.handleSelect}>
				<Menu.Item
					active={this.state.activeItem === "home"}
					style={{color:"#767676"}}>
					<Image src={home_icon} fluid size="tiny" />
				</Menu.Item>
			</Link>
			
			<Link
				to="/settings"
				name="settings"
				onClick={this.handleSelect}>
				<Menu.Item
					active={this.state.activeItem === "settings"}
					style={{color:"#767676"}}>
					<Image src={settings_icon} fluid size="tiny" />
				</Menu.Item>
			</Link>
			
			<Link
				to="/"
				onClick={this.handleLogout}>
				<Menu.Item
					style={{color:"#767676"}}>
					<Image src={logout_icon} fluid size="tiny" />
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