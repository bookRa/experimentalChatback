// import { axios } from "axios";
const axios = require("axios");

export const testPost = userObj => {
  console.log(userObj);
  return axios.post(
    "https://chatbackfullstacktest.herokuapp.com/users",
    userObj
  );
};

export const testGet = id => {
  console.log("api test get with uid " + id);
  return axios.get("https://chatbackfullstacktest.herokuapp.com/users", {
    params: {
      uid: id
    }
  });
};

let FIREBASE_URL = "http://localhost:5001/newchatback/us-central1"

export const testHi = () =>{
  console.log("testing Fb funcs");
  return axios.get(FIREBASE_URL+"/helloWorld")
}