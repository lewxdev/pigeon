import React from "react";
import Auth from "./components/Auth"
import { Menu } from "./components";
import { userIsNotAuthenticated } from "./HOCs";

class Home extends React.Component {
  render() {
    return (
      <>
        <Menu />
        <h2>Your favorite microblogging platform</h2>
        <Auth />
      </>
    );
  }
}

export default userIsNotAuthenticated(Home);
