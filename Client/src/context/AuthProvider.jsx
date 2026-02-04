import React, { useEffect, useState } from "react";
import { AuthContext } from "./AuthContext";
import { auth } from "../firebase/firebase.init";
import {
  createUserWithEmailAndPassword,
  deleteUser,
  GoogleAuthProvider,
  onAuthStateChanged,
  sendEmailVerification,
  sendPasswordResetEmail,
  signInWithEmailAndPassword,
  signInWithPopup,
  signOut,
} from "firebase/auth";

// Provider-ti baire declare kora best practice
const googleProvider = new GoogleAuthProvider();

const AuthProvider = ({ children }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  const createUser = (email, password) => {
    setLoading(true);
    return createUserWithEmailAndPassword(auth, email, password);
  };

  const signInUser = (email, password) => {
    setLoading(true);
    return signInWithEmailAndPassword(auth, email, password);
  };

  const signInGoogle = () => {
    setLoading(true);
    // select_account dile protibar account choose korar option ashbe
    googleProvider.setCustomParameters({ prompt: "select_account" });
    return signInWithPopup(auth, googleProvider);
  };

  const verifiedEmail = () => {
    return sendEmailVerification(auth.currentUser);
  };

  const resetPassword = (email) => {
    return sendPasswordResetEmail(auth, email);
  };

  const deleteUserAccount = (user) => {
    setLoading(true);
    return deleteUser(user);
  };

  const signOutUser = () => {
    setLoading(true);
    return signOut(auth);
  };

  useEffect(() => {
    const unSubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });
    return () => unSubscribe();
  }, []);

  const info = {
    createUser,
    signInUser,
    signInGoogle,
    verifiedEmail,
    resetPassword,
    deleteUserAccount,
    signOutUser,
    loading,
    setLoading,
    user,
  };

  return <AuthContext.Provider value={info}>{children}</AuthContext.Provider>;
};

export default AuthProvider;
