import * as firebase from "firebase/app";
import "firebase/auth"
import "firebase/database"

// const config = {
//   apiKey: "AIzaSyBCVy7QIFCrTOgnHrHPj2Zy8RtKRa4-NLA",
//   authDomain: "chatback-d00f9.firebaseapp.com",
//   databaseURL: "https://chatback-d00f9.firebaseio.com",
//   projectId: "chatback-d00f9",
//   storageBucket: "chatback-d00f9.appspot.com",
//   messagingSenderId: "165444001038"
// };
// TODO: create a second Firebase project for Production and Development
var config = {
  apiKey: "AIzaSyBSPcEnaQJ71j2DyU_lA63HuQQcnSbvEkc",
  authDomain: "newchatback.firebaseapp.com",
  databaseURL: "https://newchatback.firebaseio.com",
  projectId: "newchatback",
  storageBucket: "newchatback.appspot.com",
  messagingSenderId: "644962688436"
};


let fbase = firebase.initializeApp(config); //loads the firebase from index.html script.

// export const provider = new firebase.firebase_.auth.GoogleAuthProvider();
export const auth = fbase.auth();
// export default firebase;

export const database = fbase.database();
