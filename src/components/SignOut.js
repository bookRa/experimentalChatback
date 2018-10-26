import React from "react";
import { auth } from "../firebase";
import { withRouter } from "react-router-dom";
import * as routes from "../constants/routes";

const SignOutButton = ({ history }) => {
  return (
    <span
    	id="signOut"
		className="menu-item"
		onClick={() => {
			auth.doSignOut();
			history.push(routes.LANDING);
		}}
    >Sign out</span>
  );
};

export default withRouter(SignOutButton);
