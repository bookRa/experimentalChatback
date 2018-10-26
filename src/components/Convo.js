/* This is a test case component, not for real use */
import React from "react";
import AuthUserContext from "./AuthUserContext";

export class Convo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      convoId: props.location.state.convoId
    };
  }
  componentDidMount() {
    console.log(this.props);
  }
  render() {
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            <h1>
              Hello {authUser.displayName}, to Convo {this.state.convoId}
            </h1>
          ) : (
            <h1>Loading User</h1>
          )
        }
      </AuthUserContext.Consumer>
    );
  }
}
