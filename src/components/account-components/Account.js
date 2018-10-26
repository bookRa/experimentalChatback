import React from "react";
import withAuthorization from "../withAuthorization";
import { PasswordChangeForm } from "./PasswordChange";
import "../App.css";
import AuthUserContext from "../AuthUserContext";
import { auth, db } from "../../firebase";
import BioForm from "./BioForm.js";
import { users } from "../../api";
import FormField from "../FormField";

const AccountPage = () => {
  return (
    <AuthUserContext.Consumer>
      {authUser =>
        authUser ? (
          <div className="pageWrapper">
            <h2>Account Page for: {authUser.displayName || authUser.email}</h2>
            <h3>Change Username</h3>
            <UserNameForm />
            <h3>Change Password</h3>
            <PasswordChangeForm />
            <BioForm userId={authUser.uid} />
          </div>
        ) : (
          <h2>Loading User...</h2>
        )
      }
    </AuthUserContext.Consumer>
  );
};

class UserNameForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      newUName: "",
      statusUpdate: ""
    };
  }

  handleSubmit = e => {
    e.preventDefault();
    auth
      .doUpdateProfile({
        displayName: this.state.newUName
      })
      .then(() => {
        this.setState({
          newUName: "",
          statusUpdate: "Username changed successfully!"
        });
        // console.log("username Changed!");
      })
      .catch(e => {
        this.setState({ statusUpdate: "There was an error" + e.message });
        console.log("error: " + e);
      });
  };
  render() {
    return (
      <form onSubmit={this.handleSubmit}>
        <p className="statusUpdate">{this.state.statusUpdate}</p>
        <FormField
          type="text"
          value={this.state.newUName}
          onChange={e => {
            this.setState({ newUName: e.target.value });
          }}
          label="New Username"
          helper="You can use letters, numbers & symbols"
          req={true}
        />
        <button className="general-button" disabled={this.state.newUName === ""}>
          Submit Username
        </button>
      </form>
    );
  }
}

const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(AccountPage);