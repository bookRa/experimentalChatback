import { auth } from "./firebase";

export const doCreateUserWithEmailAndPassword = (email, pass) => {
  return auth.createUserWithEmailAndPassword(email, pass);
};
export const doSignInWithEmailAndPassword = (email, pass) => {
  return auth.signInWithEmailAndPassword(email, pass);
};
export const doSignOut = () => {
  return auth.signOut();
};

// Password Reset
export const doPasswordReset = email => {
  return auth.sendPasswordResetEmail(email);
};

// Password Change
export const doPasswordUpdate = password => {
  return auth.currentUser.updatePassword(password);
};

//update profile Name and info:
export const doUpdateProfile = userObject => {
  return auth.currentUser.updateProfile(userObject);
};
