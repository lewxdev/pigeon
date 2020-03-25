import React, { Component, Fragment } from "react"
import Profile from "../../components/Profile"
import { userIsAuthenticated } from "../../HOCs"
import { Create, NavBar, Feed } from "../../components"
import { connect } from "react-redux"

class User extends Component {
	render = () => (
		<Fragment>
			<NavBar />
			<Profile username={this.props.result.username} />
			<Create />
			<Feed username={this.props.result.username} />
		</Fragment>
	)
}

export default connect(state => ({
	result: state.auth.login.result,
	loading: state.auth.login.loading,
	error: state.auth.login.error
}))(userIsAuthenticated(User))