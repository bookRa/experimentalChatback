import React from "react";
import Ribbon from "./Ribbon";
import ChatBubble from "./ChatBubble";
import IndexCard from "./IndexCard";
//import Slider from "./Slider";

const mainWindow = props => {
  return (
    <div className="mainWindow">
      <div id="chatWindow">
        <IndexCard
          id="welcome"
          classes="indexCard"
          tooltip="Welcome. You and your chat buddy will share your concerns with each other. Use the “I'm concerned” button to begin."
          exit={props.exit}
        />
        {props.messages ? (
          Object.keys(props.messages).map((key, index) => {
            if (props.user.displayName === props.messages[key].senderName) {
              return (
                <ChatBubble
                  time={props.messages[key].time}
                  username={props.messages[key].senderName}
                  message={props.messages[key].msg}
                  key={key}
                  class="message">
                </ChatBubble>
              );
            } else {
              return (
                <ChatBubble
                  time={props.messages[key].time}
                  username={props.messages[key].senderName}
                  message={props.messages[key].msg}
                  key={key}
                  class="partnerMessage">
                </ChatBubble>
              );
            }
          }).reverse()
        ) : (
          <div>Now chatting with {props.partnerName}. Say Hi!</div>
        )}
      </div>
      <div id="ribbon" className="ribbon">
        <Ribbon
          submit={props.submit}
          prompts={props.prompts}
          activePrompts={props.activePrompts}
          finishedPrompts={props.finishedPrompts}
          exit={props.exit}
          clicked={e => props.clicked(e)}
        />
      </div>
      <textarea id="chatText" onKeyDown={props.enter}  onFocus={props.focus} />
    </div>
  );
};

export default mainWindow;

// REcap: I have it set up where state is gathering the messages from dev_chat_id on the db. then it's mapping each of those msgs to a div, and throwing it into mainwindow. Now I have to change the append message so that it plays nicely with this.
