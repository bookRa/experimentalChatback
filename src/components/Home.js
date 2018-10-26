import React from "react";
import "./Home.css";
import "./App.css";
import "./Navigation.css";

// import withAuthorization from "./withAuthorization";
import withAuthorization from "./withAuthorization";

import { Link, Redirect } from "react-router-dom";
import AuthUserContext from "./AuthUserContext";
import { db } from "../firebase";
import * as routes from "../constants/routes";
import { convo } from "../api";
import Chat from "./Chat";

const HomePage = ({ match }) => {
  return (
    <AuthUserContext.Consumer>
      {authUser => (
        <div className="pageWrapper">
          <div className="textContainer">
            {authUser ? (
              <h2>Hello, {authUser.displayName}!</h2>
            ) : (
                <h2>Hello!</h2>
              )}
            <h3>This is the "Chat Lobby"</h3>
            <h4>
              When you're ready, click "Start Convo" to begin chatting.
            </h4>
          </div>
          <ActiveUserList />
          {/* <div>
              <Link
                id="enterChatBtn"
                to={{
                  pathname: routes.CHAT,
                  state: { convoId: "dev_chat_02" }
                }}
              >
                Enter Dev Chat
              </Link>{" "}
            </div> */}
          <br />
          <NewConvo userName={authUser.displayName} />
          {/* <SpecificConvo /> //Don't need this now because matching is working!*/}
        </div>
      )}
    </AuthUserContext.Consumer>
    // <div>
    //   <h1>Home Page</h1>
    //   <p>The Home Page is accessible by every signedin User</p>
    // </div>
  );
};

class ActiveUserList extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeUsers: []
    };
  }
  //takes the snapshot from db.showActiveUsers and turns it to an array in our current state
  displayUsers = snapshot => {
    let newActive = [];
    // console.log(snapshot);
    // snapshot.forEach(user => {
    //   newActive.push(user.name);
    // });
    for (let user in snapshot) {
      // console.log(user, snapshot[user].name);
      newActive.push(snapshot[user].name);
    }
    // console.log(newActive);
    this.setState({ activeUsers: newActive });
  };
  componentDidMount() {
    db.showActiveUsers(this.displayUsers);
  }
  render() {
    return (
      <div className="activeUserList">
        <h3>Current partners available:</h3>
        <ul>
          {this.state.activeUsers.map(user => {
            return <li key={user + "_li"}>{user}</li>;
          })}
          {/* {this.state.activeUsers} */}
        </ul>
      </div>
    );
  }
}

class NewConvo extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      gotId: false,
      userName: props.userName
    };
    this.handleTimeout = this.handleTimeout.bind(this)
  }

  handleTimeout() {
    db.unsubscribeMatches()
    db.noMoreMatches()
    .then(
      this.setState({
        gotId: "timedOut"
      })
    )
  }

  subscribeMatch(){
    console.log("Subscribing to match")
    db.waitForMatch((snap) => {
      let currQueue = snap.val()
      console.log("THE NEW USER:", currQueue)
      if (currQueue && currQueue.u2) {
        db.unsubscribeMatches()
        this.setState({
          gotId: currQueue.conversation,
          partner: currQueue.u2
        });
      }
    })
  }

  goToConvo = () => {
    this.setState({ gotId: "fetching", partner: undefined });
    // console.log(this.state.userName);
    // console.log(this.state.gotId);
    convo
      .getConvoId(this.state.userName) //.then(res => console.log(res));
      .then(res => {
        if (res.data.paired) {
          console.log("We got a MATCH BABY!")
          this.setState({
            gotId: res.data.conversation,
            partner: res.data.u1
          });
          console.log(res.data)
        } else {
          console.log("No match yet BABY")
          console.log(res.data)
          this.subscribeMatch()
        }
        // console.log("got response:");
        // console.log(res.data);
        // console.log("got convo ID: " + res.data.conversation);
        // console.log("got partner: " + res.data.partner);
        // this.setState({
        //   gotId: res.data.conversation,
        //   partner: res.data.partner
        // });
      });
  };
  /* STILL NEEDED: ERROR MESSAGES: What to do on time out, server error, improper auth? etc... */
  render() {
    if (this.state.gotId === "fetching") {
      return <div>
        <p> Working on Matching...</p>
        <CountDown timer={5} timeOutFunc={this.handleTimeout} />
      </div>
    } else if (this.state.gotId === "timedOut") {
      return (
        <div>
          <p>Doesn't seem like there's anyone here at the moment</p>
          <button id="startConvo" className="general-button" onClick={this.goToConvo}>
            Try Again?
        </button>
        </div>
      )
    }
    else if (this.state.gotId) {
      return (
        <Redirect
          to={{
            pathname: "/chat", //routes.CHAT,
            state: { convoId: this.state.gotId, partner: this.state.partner }
            // render= {(props) => <Chat {...props} convo= {this.state.gotId} />}
          }}
        />
      );
    }
    return (
      <div>
        <button id="startConvo" className="general-button" onClick={this.goToConvo}>
          Start Convo
        </button>
      </div>
    );
  }
}

class CountDown extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      isMounted_: false,
      time: props.timer
    }
  }
  componentDidMount() {
    this.setState({ isMounted_: true })
    // console.log("HELLO WORLD", this.state.time)
    let timeShow = setInterval(() => {
      if (this.state.isMounted_) {
        console.log("We're working")
        this.setState({
          time: this.state.time - 1
        })
        if (this.state.time === 0) {
          clearInterval(timeShow)
          this.props.timeOutFunc()
        }
      } else {
        console.log("timer clear!");
        clearInterval(timeShow)
      }
    }, 1000)
    this.setState({timeShow: timeShow})

  }
  componentWillUnmount() {
    clearInterval(this.state.timeShow)
    this.setState({ isMounted_: false })
  }

  render() {
    return <p>{this.state.time}</p>
  }
}


const authCondition = authUser => !!authUser;

export default withAuthorization(authCondition)(HomePage);
/* (authCondition) */
/*TODO: Username is not getting picked up directly after a new user is created.
  A refresh is needed for username to display in Active Users and the "signed in as ..." 
  note. Can probably fix by explicitly setting the authstate.user.displayname.
*/