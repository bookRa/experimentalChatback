import React from "react";
import { firebase, db } from "../firebase";
import AuthUserContext from "./AuthUserContext";

const withAuthentication = Component => {
  class WithAuthentication extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        authUser: null
      };
    }
    handleUser(user) {
      this.setState({ authUser: user });
      db.addToActiveUsers({
        uid: user.uid,
        userName: user.displayName || "unknown"
      });
      db.removeFromActiveUsersOnDisconnect({ uid: user.uid });
    }
    handleLogout() {
      if (this.state.authUser) {
        db.removeUserOnLogout(this.state.authUser.uid);
        this.setState({ authUser: null });
      }
    }
    componentDidMount() {
      firebase.auth.onAuthStateChanged(authUser => {
        authUser ? this.handleUser(authUser) : this.handleLogout();
      });
    }

    render() {
      const { authUser } = this.state;
      return (
        <AuthUserContext.Provider value={authUser}>
          <Component />
        </AuthUserContext.Provider>
      );
    }
  }
  return WithAuthentication;
};

export default withAuthentication;
