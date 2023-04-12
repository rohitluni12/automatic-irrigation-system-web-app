import React, { createContext, useState, useContext, useEffect } from "react";

import {
  signInWithEmailAndPassword,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  createUserWithEmailAndPassword,
  onAuthStateChanged,
} from "firebase/auth";
import { auth, db } from "../firebase";
import { ref, set } from "firebase/database";

const userAuthContext = createContext();

export function UserAuthContextProvider({ children }) {
  const [user, setUser] = useState(null);
  const [userRole, setUserRole] = useState(null);

  function logIn(email, password) {
    return signInWithEmailAndPassword(auth, email, password);
  }

  function signUp(email, password) {
    return createUserWithEmailAndPassword(auth, email, password);
  }

  function googleSignIn() {
    const googleAuthProvider = new GoogleAuthProvider();
    return signInWithPopup(auth, googleAuthProvider);
  }

  function logOut() {
    return signOut(auth);
  }

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (currentUser) => {
      setUser(currentUser);
      const { uid, providerData } = currentUser;
      // Set custom user claims based on user role
      if (currentUser.email.endsWith("000@gmail.com")) {
        setUserRole("admin");
      } else {
        setUserRole("user");
      }
      // Save user info to database
      const dbRef = ref(db, `User_Info/Users/${uid}`);
      set(dbRef, {
        Info: providerData[0],
        Role: userRole
      });
    });

    return () => unsubscribe();
  }, []);

  return (
    <userAuthContext.Provider
      value={{ user, userRole, logIn, signUp, logOut, googleSignIn }}
    >
      {children}
    </userAuthContext.Provider>
  );
}

export function useUserAuth() {
  return useContext(userAuthContext);
}
