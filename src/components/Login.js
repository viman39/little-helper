import { useState } from "react";
import useAuth from "../utils/useAuth";

const Login = () => {
  const { user, login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {user !== null && <div>Buna {user.email}</div>}
      {user === null && (
        <>
          <input
            type="text"
            placeholder="email"
            onChange={(e) => setEmail(e.target.value)}
          ></input>
          <input
            type="text"
            placeholder="password"
            onChange={(e) => setPassword(e.target.value)}
          ></input>
          <button onClick={() => login(email, password)}>Login</button>
        </>
      )}
    </>
  );
};

export default Login;
