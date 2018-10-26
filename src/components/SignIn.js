import React, { Component } from "react";
import { Link, withRouter } from "react-router-dom";
import { SignUpLink } from "./SignUp";
import { PasswordForgetLink } from "./PasswordForget";
import "./App.css";
import FormField from "./FormField";

import { auth } from "../firebase";
import * as routes from "../constants/routes";

const SignInPage = ({ history }) => {
  return (
    <div className="pageWrapper">
      <h2>Sign in with your email address</h2>
      <SignInForm history={history} />
      <PasswordForgetLink />
      <SignUpLink />
    </div>
  );
};

const INITIAL_STATE = {
  email: "",
  password: "",
  error: null
};
const SignInLink = () => {
  return (
    <p>
      Already have an account?
      {"  "}
      <Link to={routes.SIGN_IN}> Sign In </Link>
    </p>
  );
};

class SignInForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      ...INITIAL_STATE
    };
  }
  handleSubmit = event => {
    const { email, password } = this.state;
    const { history } = this.props;

    auth
      .doSignInWithEmailAndPassword(email, password)
      .then(() => {
        this.setState({ ...INITIAL_STATE });
        history.push(routes.HOME);
      })
      .catch(error => {
        this.setState({ error: error });
      });
    event.preventDefault();
  };
  render() {
    const { email, password, error } = this.state;
    const isInvalid = password === "" || email === "";
    return (
      <form onSubmit={this.handleSubmit}>
        <FormField
          type="text"
          value={email}
          onChange={e => {this.setState({ email: e.target.value });}} 
          label="Email"
          focus={true}
          req={true}
        />
        <FormField
          type="password"
          value={password}
          onChange={e => {this.setState({ password: e.target.value });}} 
          label="Password"
          req={true}
        />
        <button className="general-button" disabled={isInvalid} type="submit">
          {" "}
          Sign In{" "}
        </button>
        {error && <p>{error.message}</p>}
      </form>
    );
  }
}

export default withRouter(SignInPage);
export { SignInForm, SignInLink };
