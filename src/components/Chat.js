import React, { Component } from "react";
import MainWindow from "./chat-components/MainWindow";
//import StageHandler from "./chat-components/StageHandler";
import { withRouter } from "react-router-dom";
import { PROMPTS } from "../constants/prompts";
//import { RESPONSES } from "../constants/responses";
import "./Chat.css";
import AuthUserContext from "./AuthUserContext";
import { db } from "../firebase";
import { auth } from "../firebase/firebase"; //Just TEMPORARY DO NOT EXPOSE AUTH() TO THIS COMPONENT

class Chat extends Component {
  constructor(props) {
    super(props);
    // console.log("props");
    // console.log(props);
    let myConvId = props.location.state.convoId;
    this.state = {
      activePrompts: ["concerns"],
      queuedPrompts: [],
      finishedPrompts: [],
      convoId: myConvId || "dev_chat_02",
      partner: props.location.state.partner,
      messages: {},
      user: {},
      pushedButtons: [],
      selectedButtons: []
    };
  }

  //subscribes to the firebase convoid upon loading **ID HARDCODED FOR NOW**
  componentDidMount() {
    console.log("MountedChat");
    // console.log(this.state.convoId);
    // console.log(this.props);
    let storeMsgsAsState = snap => {
      let messageList = snap.val();
      let lastMsg = messageList ? 
        messageList[
          Object.keys(messageList)[Object.keys(messageList).length - 1]
        ] 
        :
        undefined;
      this.setState({ user: auth.currentUser }, () => this.appendResponses(lastMsg));
      this.setState({ messages: snap.val() });
      //   console.log(snap.val());
    };
    db.convoSubscribe(this.state.convoId, storeMsgsAsState);
  }
  // appendResponses(msgObj) {
  //   console.log(msgObj);
  // }
  appendResponses(msgObj) {
    // this function is being called before user is fully mounted into State
    if (msgObj && msgObj.prompt) {
      if (msgObj.sender === this.state.user.uid || msgObj.prompt.length === 0) {
       return;
      }
      let prompt = msgObj.prompt.filter(p => !p.includes("Double"))[0]; //array of prompts from prev message
      //Do some logic on prompts to call up appropriate Responses, and append to this.state.activePrompts
      if (prompt) {
        let ourPrompt;
        let ourResponse;
        for (let lookup of PROMPTS) {
          if (lookup.key === prompt) {
            ourPrompt = lookup;
            break;
          } else if (lookup.response) {
            if (lookup.response.key === prompt) {
              ourResponse = lookup;
              break;
            }
          }
        }
        let currPrompts = this.state.activePrompts.slice();
        let qPrompts = this.state.queuedPrompts.slice();
        let fPrompts = this.state.finishedPrompts.slice();
        if (ourPrompt) {
          if (ourPrompt.response) {
            if (fPrompts.includes(prompt)) {
              currPrompts.push(ourPrompt.response.key);
            } else {
              qPrompts.push(ourPrompt.response.key);
            }
          }
        }
        if (ourResponse) {
          if (qPrompts.length !== 0) {
            currPrompts.push(qPrompts[0]);
            qPrompts.splice(0, 1);
          }
        }
        fPrompts.push(prompt + "Partner");
        this.setState({ activePrompts: currPrompts });
        this.setState({ queuedPrompts: qPrompts });
        this.setState({ finishedPrompts: fPrompts });
      }
    }
  }

  addText(e) {
    let button = e.target;
    let textarea = document.getElementById("chatText");
    if (button.tagName === "B") {
      button = button.parentElement;
    }
    if (button.classList.contains("cardButton")) {
      if (button.title === "custom") {
        this.exitIndexCard(e);
      } else {
        let currSelected = this.state.selectedButtons.slice();
        if (button.classList.contains("pressed")) {
          button.classList.remove("pressed");
          let index = this.state.selectedButtons.indexOf(button);
          currSelected.splice(index, 1);
        } else {
          button.classList.add("pressed");
          currSelected.push(button);
        }
        this.setState({ selectedButtons: currSelected });
      }
    } else {
      let card = document.getElementById(button.id + "Card");
      if (card.classList.contains("hidden")) {
        card.classList.remove("hidden");
      }
      button.classList.add("hidden");
      let currPushed = this.state.pushedButtons.slice();
      currPushed.push(button.id);
      this.setState({ pushedButtons: currPushed });
      textarea.value += button.value;
    }
  }

  exitIndexCard() {
    this.setState({ selectedButtons: [] });
    this.hideCards();
    this.focusText();
  }

  hideCards() {
    let selectedButtons = document.querySelectorAll(".pressed");
    for (let i = 0; i < selectedButtons.length; i++) {
      let button = selectedButtons[i];
      button.classList.remove("pressed");
    }
    let cards = document.querySelectorAll(".indexCard");
    for (let i = 0; i < cards.length; i++) {
      let card = cards[i];
      if (!card.classList.contains("hidden")) {
        card.classList.add("hidden");
      }
    }
  }

  focusText() {
    let textarea = document.getElementById("chatText");
    textarea.focus();
    textarea.setSelectionRange(textarea.value.length, textarea.value.length);
  }

  submitIndexCard(e) {
    let prompt = this.state.pushedButtons[this.state.pushedButtons.length - 1];
    let textarea = document.getElementById("chatText");
    let selectedButtons = this.state.selectedButtons.slice();
    this.hideCards();
    this.focusText();
    console.log("prompt: " + prompt);
    if (prompt) {
      for (let i = 0; i < PROMPTS.length; i++) {
        let double = PROMPTS[i].double;
        if (double) {
          let currPrompts = this.state.activePrompts.slice();
          if (double.key === prompt + "Double" && !currPrompts.includes(double.key)) {
            currPrompts.push(double.key);
            this.setState({ activePrompts : currPrompts });
            break;
          }
        }
      }
      if (selectedButtons.length > 0) {
        let string = "";
        let tail = undefined;
        let tailPlural = undefined;
        for (let i = 0; i < PROMPTS.length; i++) {
          let key = PROMPTS[i].key;
          if (key === prompt) {
            tail = PROMPTS[i].mainBtn.tail;
            tailPlural = PROMPTS[i].mainBtn.tailPlural;
          }
        }
        for (let j = 0; j < selectedButtons.length; j++) {
          let value = selectedButtons[j].value;
          if (selectedButtons.length === 1) {
            if (tail) {
              if (tail.charAt(0) === tail.charAt(0).toUpperCase()) {
                string += value.substr(0, value.length - 1) + ". ";
              } else {
                string += value;
              }
            } else {
              string += value;
            }
          } else if (selectedButtons.length === 2) {
            if (j === 0) {
              string += value + "and ";
            } else {
              if (tail) {
                if (tail.charAt(0) === tail.charAt(0).toUpperCase()) {
                  string += value.substr(0, value.length - 1) + ". ";
                } else {
                  string += value;
                }
              } else {
                string += value;
              }
            }
          } else {
            if (j < selectedButtons.length - 2) {
              string += value.substring(0, value.length - 1) + ", ";
            } else if (j === selectedButtons.length - 2) {
              string += value.substring(0, value.length - 1) + " and ";
            } else {
              if (tail) {
                if (tail.charAt(0) === tail.charAt(0).toUpperCase()) {
                  string += value.substr(0, value.length - 1) + ". ";
                } else {
                  string += value;
                }
              } else {
                string += value;
              }
            }
          }
        }
        if (tail) {
          if (tailPlural) {
            if (selectedButtons.length === 1) {
              string += tail;
            } else {
              string += tailPlural;
            }
          } else {
            string += tail;
          }
        }
        if (textarea.value === "" || textarea.value.slice(-2) === ". ") {
          textarea.value += string.charAt(0).toUpperCase() + string.slice(1);
        } else if (textarea.value.slice(-1) === ".") {
          textarea.value +=
            " " + string.charAt(0).toUpperCase() + string.slice(1);
        } else {
          textarea.value += string;
        }
        this.setState({ selectedButtons: [] });
      }
    }
  }

  sendMessage = event => {
    let textarea = document.getElementById("chatText");
    if (event.which === 13 && event.shiftKey === false) {
      console.log(this.state.activePrompts);
      event.preventDefault();
      let msg = textarea.value;
      if (msg !== "") {
        // checks if a prompt-button has been clicked then updates activePrompts/finishedPrompts
        // to progress to next prompt
        let currPrompts = this.state.activePrompts.slice();
        let qPrompts = this.state.queuedPrompts.slice();
        //let finishedPrompts = this.state.finishedPrompts.slice();
        let fPrompts = this.state.finishedPrompts.slice();
        for (let i = 0; i < this.state.pushedButtons.length; i++) {
          let id = this.state.pushedButtons[i];
          for (let j = 0; j < PROMPTS.length; j++) {
            let prompt = PROMPTS[j];
            let response = prompt.response;
            let double = prompt.double;
            if (prompt.key === id) {
              fPrompts.push(prompt.key);
              currPrompts.splice(0, 1);
              if (double) {
                if (!fPrompts.includes(double.key)) {
                  fPrompts.push(double.key);
                  currPrompts.splice(0, 1);
                }
              }
              // edge case that does not execute for the last prompt
              if (j !== PROMPTS.length - 1) {
                if (!response) {
                  currPrompts.push(PROMPTS[j + 1].key);
                } else {
                  if (qPrompts.length !== 0) {
                    currPrompts.push(qPrompts[0]);
                    qPrompts.splice(0, 1);
                  }
                }
              }
            }
            if (prompt.response) {
              if (prompt.response.key === id) {
                fPrompts.push(id);
                currPrompts.splice(0, 1);
                if (!fPrompts.includes(id + "Partner")) {
                  qPrompts.push(PROMPTS[j + 1].key);
                } else {
                  currPrompts.push(PROMPTS[j + 1].key);
                }
              }
            }
            /*
            if (double) {
              if (double.key === id) {
                if (!finishedPrompts.includes(double.key)) {
                  if (!finishedPrompts.includes(prompt.key)) {
                    finishedPrompts.push(prompt.key);
                    activePrompts.splice(activePrompts.indexOf(prompt.key), 1);
                    if (j !== prompts.length - 1) {
                      activePrompts.push(prompts[j + 1].key);
                    }
                  }
                  finishedPrompts.push(double.key);
                  activePrompts.splice(activePrompts.indexOf(double.key), 1);
                }
              }
            }*/
          }
        }
        db.postMsg(this.state.convoId, {
          prompt: this.state.pushedButtons,
          msg: msg,
          sender: this.state.user.uid,
          senderName: this.state.user.displayName,
          time: Date.now()
        });
        this.setState({ activePrompts: currPrompts });
        this.setState({ queuedPrompts: qPrompts });
        this.setState({ finishedPrompts: fPrompts});
        this.setState({ selectedButtons: [] });
        this.setState({ pushedButtons: [] });
        textarea.value = "";
      }
    } else if (event.which === 8 || event.which === 46 && this.state.pushedButtons.length > 0) {
      let buttons = document.querySelectorAll(".ribbonButton.hidden");
      for (let i = 0; i < buttons.length; i++) {
        let button = buttons[i];
        button.classList.remove("hidden");
      }
      this.setState({ pushedButtons: [] });
    }
  };

  render() {
    //<StageHandler clicked={this.enterChat} />
    return (
      <AuthUserContext.Consumer>
        {authUser =>
          authUser ? (
            // <Navbar />
            <div className="chat">
              <MainWindow
                partnerName={this.state.partner}
                messages={this.state.messages}
                prompts={PROMPTS}
                activePrompts={this.state.activePrompts}
                finishedPrompts={this.state.finishedPrompts}
                clicked={e => this.addText(e)}
                submit={e => this.submitIndexCard(e)}
                exit={() => this.exitIndexCard()}
                focus={() => this.hideCards()}
                enter={e => this.sendMessage(e)}
                user={this.state.user}
              />
            </div>
          ) : (
            <h1> Loading User </h1>
          )
        }
      </AuthUserContext.Consumer>
    );
    //return React.createElement('div', {classkey: 'App'}, React.createElement('h1', null, 'Hi, I\'m a React App!!!'));
  }
}

export default withRouter(Chat);
