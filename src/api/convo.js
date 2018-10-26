import { functions } from "firebase";

const axios = require("axios");

// const FIREBASE_URL = "https://us-central1-newchatback.cloudfunctions.net"
const FIREBASE_URL = "http://localhost:5001/newchatback/us-central1"


// An asynch method to get ConvoID
// export const getConvoId = userName => {
//   console.log("requesting convo...");
//   return axios.post("https://chatbackfullstacktest.herokuapp.com/match", {
//     self: userName,
//     partner: null,
//     conversation: null
//   });
//   // return new Promise((resolve, reject) => {
//   //   setTimeout(() => {
//   //     resolve(10);
//   //   }, 1000);
//   // });
// };

/*
  Should return the following JSON:
  {
    conversation: convoID
    partner: partnerName
  }
  TODO: Error message on timeout
  */
 export const getConvoId = userName =>{
     console.log("***convo.js requesting match");
     return axios.get(FIREBASE_URL+"/getMatch", {
         params:{
             // TODO: change to userID
             userName: userName
           }
         })
       }
       
/*
  Should return the following JSON:
  {
    conversation: convoID
    partner: partnerName
  }
  TODO: Error message on timeout
  */
// export const getConvoId = userName =>{
//   console.log("Firebase callable...")
//   return functions.httpsCallable('getMatch')({userName: userName})
// }

