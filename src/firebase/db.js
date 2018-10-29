import { database as db } from "./firebase";

let activeUserRef = db.ref("activeUsers/");
let profileRef = db.ref("userProfiles/");
let convoRef = db.ref("conversations/");
let matchRef = db.ref("matchRequests/")
/* Active User-Related DB Functions */

//this is the function that will store an active user in the fb db

export const addToActiveUsers = userObj => {
  return activeUserRef.child(userObj.uid).set({
    name: userObj.userName || "unknown"
  });
};

//this function removes the user from "Active Users" upon client disconnect
export const removeFromActiveUsersOnDisconnect = userObj => {
  return activeUserRef
    .child(userObj.uid)
    .onDisconnect()
    .remove();
};

//removes from "Active Users" upon SignOut
export const removeUserOnLogout = userId => {
  return activeUserRef.child(userId).remove();
};

//will return a snapshot of active users on which we perform a callback
export const showActiveUsers = cb => {
  return activeUserRef.on("value", snapshot => {
    cb(snapshot.val());
  });
};

/* User Profile-Related DB Functions */

//updates user profile
export const updateProfile = (uid, profileObj) => {
  return profileRef.child(uid).set(profileObj);
};

//returns user profile
export const getUserProfile = uid => {
  return profileRef.child(uid).once("value");
};

/* Conversation-Related DB Functions */
// const DEV_CONVO_ID = "dev_chat_01"; //Hardcoded convo id for dev purposes

//Pushes message to a conversation thread. Also appends that message to a user's chat history.
export const postMsg = (convoId, msgObject) => {
  var pushMsgRef = convoRef.child(convoId).push(
    msgObject,
    // {
    //   sender: id,
    //   senderName: name, //This will have to be changed in the future to dynamically update based on changed displayNames
    //   time: rightNow,
    //   msg: msg
    // }
    () => {
      profileRef
        .child(msgObject.sender + "/chatHistory/" + pushMsgRef.key)
        .set("true");
    }
  );
};

export const convoSubscribe = (id, cb) => {
  convoRef.child(id + "/").on("value", cb);
};

/* Matching Functions */
// Subscribes to the matchRequests node

export const waitForMatch = (cb)=>{
  return matchRef.on('value',cb)
}

export const unsubscribeMatches = ()=>{
  matchRef
  .onDisconnect()
  .cancel()
  return matchRef.off("value")
}
export const noMoreMatches = ()=>{
  matchRef
  .onDisconnect()
  .cancel()
  return matchRef.update({
    u1: null
  })
}

export const removeFromConvoSubOnDisconnect = () =>{
  return matchRef
  .onDisconnect()
  .update({
    u1:null
  })
}