import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { auth } from "../firebase";
import { SignInLink } from "./SignIn";
import { users } from "../api";
import "./App.css";
import FormField from "./FormField";

import * as routes from "../constants/routes";
import "../constants/userNames";
import { fakeNames } from "../constants/userNames";

const SignUpPage = ({ history }) => {
  return (
    <div className="pageWrapper">
      <h2>
        Facing troubles together is better, <br /> create an account for chats
        that actually bring relief{" "}
      </h2>
      <SignUpForm history={history} />
      <SignInLink />
      <PolicyLink />
    </div>
  );
};

const INITIAL_STATE = {
  username: "",
  email: "",
  passwordOne: "",
  passwordTwo: "",
  error: null
};

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = { ...INITIAL_STATE };
  }
  genFakeName = e => {
    e.preventDefault();
    let randFirst =
      fakeNames.first[Math.floor(Math.random() * fakeNames.first.length)];
    let randSec =
      fakeNames.second[Math.floor(Math.random() * fakeNames.second.length)];
    let randN = Math.floor(Math.random() * 100).toString();
    this.setState({ username: randFirst + randSec + randN });
  };
  onSubmit = event => {
    event.preventDefault();
    const { username, email, passwordOne } = this.state;
    const { history } = this.props;
    let tempUID;
    auth
      .doCreateUserWithEmailAndPassword(email, passwordOne)
      .then(authUser => {
        tempUID = authUser.user.uid;
        console.log("added to fb: uid " + tempUID);
        auth
          .doUpdateProfile({
            displayName: username
          })
          .then(() => console.log("profile updated with: " + username))
          .catch(e => console.log("problem with username: " + e));
        this.setState(() => ({ ...INITIAL_STATE }));
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({ error: error });
      });
    // From here, create user to post to JAVA API
    let userObj = {
      id: Math.ceil(Math.random() * 100),
      gender: "Female",
      preferredGenderOfPartner: "Female",
      age: 100,
      username: username,
      uid: tempUID
    };
  };

  render() {
    const { username, email, passwordOne, passwordTwo, error } = this.state;

    const isInvalid =
      passwordOne !== passwordTwo ||
      passwordOne === "" ||
      email === "" ||
      username === "";

    return (
      <form onSubmit={this.onSubmit}>
        <FormField
          type="text"
          value={username}
          onChange={event => this.setState({ username: event.target.value })}
          label="Choose a Display Name"
          helper="You can use letters, numbers & symbols"
          focus={true}
          req={true}
        />
        <button className="general-button" onClick={this.genFakeName}>
          Or Generate a Random Username!
        </button>
        <FormField
          type="text"
          value={email}
          onChange={event => this.setState({ email: event.target.value })}
          label="Email Address"
          req={true}
        />
        <FormField
          type="password"
          value={passwordOne}
          onChange={event => this.setState({ passwordOne: event.target.value })}
          label="Password"
          helper="Use 6 or more characters with a mix of letters, numbers & symbols"
          bar={true}
          req={true}
        />
        <FormField
          type="password"
          value={passwordTwo}
          onChange={event => this.setState({ passwordTwo: event.target.value })}
          label="Confirm Password"
          req={true}
        />
        <button className="general-button" disabled={isInvalid} type="submit">
          Sign Up
        </button>
        <h6>{error && <p>{error.message}</p>}</h6>
      </form>
    );
  }
}

const SignUpLink = () => {
  return (
    <p>
      Don't have an account?
      {"  "}
      <Link to={routes.SIGN_UP}> Sign Up </Link>
    </p>
  );
};

const PolicyLink = () => {
  return (
    <p>
      Please read our
      {"  "}
      <a href="/">Privacy Policy</a>
    </p>
  );
};

export default withRouter(SignUpPage);

export { SignUpForm, SignUpLink };
