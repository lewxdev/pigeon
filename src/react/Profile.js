import React, { Component } from "react";
import NavBar from "./components/NavBar";
import { userIsAuthenticated } from "./HOCs";

class Profile extends Component {
	render() {
		return (
			<>
				<NavBar isAuthenticated={this.props.isAuthenticated} />
				<h2>Profile</h2>
			</>
		);
	}
}

export default userIsAuthenticated(Profile);
