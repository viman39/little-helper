import { useState, useEffect, useContext } from "react";
import { auth } from "./firebase";
import {
  signInWithEmailAndPassword,
  onAuthStateChanged,
  signOut,
} from "firebase/auth";
import { AuthContext } from "../context/AuthContextProvider";

const useAuth = () => {
  console.log("useAuth new state");
  const { setUser } = useContext(AuthContext);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("useAuth useEffect");
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      console.log("useAuth update state");
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      setError(error.message);
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  return { error, setError, login, logout };
};

export default useAuth;
