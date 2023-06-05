import { useState, useEffect } from "react";
import { auth } from "./utils";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email, password) => {
    try {
      await signInWithEmailAndPassword(auth, email, password);
    } catch (error) {
      console.log("Login error:", error);
    }
  };

  return { user, login };
};

export default useAuth;
