import React, { Component, Fragment } from "react"
import Profile from "../../components/Profile"
import { userIsAuthenticated } from "../../HOCs"
import { Create, NavBar, Feed } from "../../components"
import { connect } from "react-redux"

class User extends Component {
	render = () => (
		<Fragment>
			<NavBar />
			<Profile username={this.props.navigatedUser} />
			{this.props.currentUser === this.props.navigatedUser && <Create />}
			<Feed username={this.props.navigatedUser} />
		</Fragment>
	)
}

export default connect(state => ({
	currentUser:
		state.auth &&
    	state.auth.login &&
		state.auth.login.result &&
		state.auth.login.result.username,
	navigatedUser: state.router.location.pathname.slice(state.router.location.pathname.lastIndexOf("/") + 1)
}))(userIsAuthenticated(User))