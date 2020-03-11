import React, { Component } from "react";
import Auth from "./components/Auth"
import { userIsNotAuthenticated } from "./HOCs";

class Lanuch extends Component {
	render() {
		return (
			<>
				<Auth />
			</>
		);
	}
}

export default userIsNotAuthenticated(Lanuch);
