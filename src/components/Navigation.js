import React from "react";
import { Link } from "react-router-dom";
import SignOutButton from "./SignOut";
import AuthUserContext from "./AuthUserContext";
import * as routes from "../constants/routes";
import "./Navigation.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

const Navigation = () => (
  <AuthUserContext.Consumer>
    {authUser =>
      authUser ? <NavigationAuth user={authUser} /> : <NavigationNonAuth />
    }
  </AuthUserContext.Consumer>
);

function showDropdown() {
  var content = document.querySelector(".dropdown-content");
  content.classList.toggle("show");
}

function enterDropdown(e) {
  if (e.which === 13 && e.shiftKey === false) {
    showDropdown();
  }
}

window.onclick = function(event) {
  if (!event.target.matches(".hamburger") && event.target.tagName !== "path") {
    var content = document.querySelector(".dropdown-content");
    if (content.classList.contains("show")) {
      content.classList.remove("show");
    }
  }
};

const NavigationAuth = props => (
  <div className="navBar">
    <div className="leftSection">
      <Link to={routes.LANDING}>
        <img alt="CB logo" className="logo" src="logo-arimo-bold.png" title="CB logo" />
      </Link>
    </div>
    <div className="rightSection">
      <div className="dropdown">
        <FontAwesomeIcon
          icon={faBars}
          className="hamburger"
          title="menu"
          tabIndex="0"
          onClick={showDropdown}
          onKeyDown={e => enterDropdown(e)}
        />
        <div className="dropdown-content">
          <span id="signedIn" className="menu-item">
            signed in as {props.user.displayName}
          </span>
          <Link className="menu-item" to={routes.HOME}>
            Start a conversation
          </Link>
          <Link className="menu-item" to={routes.ACCOUNT}>
            My account
          </Link>
          <SignOutButton />
        </div>
      </div>
    </div>
  </div>
);
const NavigationNonAuth = () => (
  <div className="navBar">
    <div className="leftSection">
      <Link to={routes.LANDING}>
        <img className="logo" alt="CB logo" title="CB logo" src="logo-arimo-bold.png" />
      </Link>
    </div>
    <div id="rightSection" className="rightSection">
      <div className="dropdown">
        <FontAwesomeIcon
          icon={faBars}
          className="hamburger"
          title="menu"
          tabIndex="0"
          onClick={showDropdown}
          onKeyDown={e => enterDropdown(e)}
        />
        <div className="dropdown-content">
          <Link className="menu-item" to={routes.SIGN_IN}>
            Sign in
          </Link>
          <Link className="menu-item" to={routes.SIGN_UP}>
            Sign up
          </Link>
        </div>
      </div>
    </div>
  </div>
);
export default Navigation;
