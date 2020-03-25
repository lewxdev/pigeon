import React, { Component, Fragment } from "react";
import { Header } from "semantic-ui-react";
import Card from "../../components/Profile";
import { userIsAuthenticated } from "../../HOCs";
import { NavBar, Feed } from "../../components";

class User extends Component {
  render = () => (
    <Fragment>
      <Header>
        <Card />
      </Header>
      <NavBar />

      <Feed />
    </Fragment>
  );
}

export default userIsAuthenticated(User);
