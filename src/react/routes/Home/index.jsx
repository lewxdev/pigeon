import React, { Component, Fragment } from "react"
import { userIsAuthenticated } from "../../HOCs"
import { NavBar, Feed } from "../../components"

class Home extends Component {
	componentDidMount = () => {
		
	}
	
	componentWillUnmount = () => {
		
	}
	
	render = () => (
		<Fragment>
			<NavBar />
			<Feed />
		</Fragment>
	)
}

export default userIsAuthenticated(Home)