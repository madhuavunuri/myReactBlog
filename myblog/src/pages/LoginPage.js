import { getAuth, signInWithEmailAndPassword } from "@firebase/auth";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";

const LoginPage = () => {
  const navigate = useNavigate();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const login = async () => {
    try {
      await signInWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");
    } catch (e) {
      setError(e.error);
    }
  };
  return (
    <>
      <h1>Log In</h1>
      {error && <p className="error">{error}</p>}
      <input
        placeholder="Enter email.."
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type="password"
        placeholder="Enter password.."
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={login}>Log In</button>
      <Link to={"/create-account"}>No Account? Register Here</Link>
    </>
  );
};
export default LoginPage;
