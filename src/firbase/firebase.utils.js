import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyDJK90t7hb4JjNK_tiwbCnq2T0_-kua8ok",
  authDomain: "crwn-db-7609e.firebaseapp.com",
  projectId: "crwn-db-7609e",
  storageBucket: "crwn-db-7609e.appspot.com",
  messagingSenderId: "732714987569",
  appId: "1:732714987569:web:e78c364f3a8b3421482510",
  measurementId: "G-36XQG2918G",
};
firebase.initializeApp(firebaseConfig);

export const creatUserProfileDocument = async (userAuth, additionalData) => {
  if (!userAuth) return;
  //documentSnapshot object.
  const userRef = firestore.doc(`users/${userAuth.uid}`);

  const snapShot = await userRef.get();

  if (!snapShot.exists) {
    const { displayName, email } = userAuth;
    const createdAt = new Date();
    try {
      await userRef.set({
        displayName,
        email,
        createdAt,
        ...additionalData,
      });
    } catch (error) {
      console.log("error creating user", error.message);
    }
  } 
  return userRef;
};

export const auth = firebase.auth();
export const firestore = firebase.firestore();

const provider = new firebase.auth.GoogleAuthProvider();
provider.setCustomParameters({ prompt: "select_account" });
export const signInWithGoogle = () => auth.signInWithPopup(provider);

export default firebase;
