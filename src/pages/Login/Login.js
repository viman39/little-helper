import { useContext, useState } from "react";
import useAuth from "../../utils/useAuth";
import Button from "../../components/Button";
import Input from "../../components/Input";
import { loginStyles } from "./login.styles";
import { AuthContext } from "../../context/AuthContextProvider";

const Login = () => {
  const { error, setError, login } = useAuth();
  const { user } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <>
      {user !== null && <div>Buna {user.email}</div>}
      {user === null && (
        <div className={loginStyles}>
          {error && <div style={{ color: "red" }}>{error}</div>}
          <Input
            type="text"
            placeholder="email"
            onChange={(e) => {
              setEmail(e.target.value);
              setError("");
            }}
          />
          <Input
            type="text"
            placeholder="password"
            onChange={(e) => {
              setPassword(e.target.value);
              setError("");
            }}
            onKeyDown={(e) => {
              if (e.key === "Enter") login(email, password);
            }}
          />
          <Button onClick={() => login(email, password)}>Login</Button>
        </div>
      )}
    </>
  );
};

export default Login;
