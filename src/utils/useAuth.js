import { useState, useEffect } from "react";
import { auth } from "./firebase";
import { signInWithEmailAndPassword, onAuthStateChanged } from "firebase/auth";

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [error, setError] = useState("");

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
      setError(error.message);
    }
  };

  return { user, error, setError, login };
};

export default useAuth;
