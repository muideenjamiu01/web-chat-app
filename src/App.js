import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

import Channel from "./Channel";
import Button from "./Button";
import React, { useState, useEffect } from "react";

firebase.initializeApp({
  apiKey: "AIzaSyDoppLLAxVtY3V8XkhwTN04l5C1X3Y1bjU",
  authDomain: "web-chat-app-14334.firebaseapp.com",
  projectId: "web-chat-app-14334",
  storageBucket: "web-chat-app-14334.appspot.com",
  messagingSenderId: "197957902864",
  appId: "1:197957902864:web:d7dd301aa38419a78aa095",
});

const auth = firebase.auth();
const db = firebase.firestore();

function App() {
  const [user, setUser] = useState(() => auth.currentUser);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
      if (initializing) {
        setInitializing(false);
      }
    });

    // Cleanup subscription
    return unsubscribe;
  }, []);

  const signInWithGoogle = async () => {
    // Retrieve Google provider object
    const provider = new firebase.auth.GoogleAuthProvider();
    // Set language to the default browser preference
    firebase.auth().useDeviceLanguage();
    // Start sign in process
    try {
      await firebase.auth().signInWithPopup(provider);
    } catch (error) {
      console.log(error.message);
    }
  };

  const signOut = async () => {
    try {
      await firebase.auth().signOut();
    } catch (error) {
      console.log(error.message);
    }
  };

  if (initializing) return "Loading";

  return (
    <div>
      <h1>hello</h1>
      {user ? (
        <>
          <Button onClick={signOut}>Sign out</Button>
          <Channel user={user} db={db}></Channel>
        </>
      ) : (
        <Button onClick={signInWithGoogle}>Sign in with Google</Button>
      )}
    </div>
  );
}

export default App;
