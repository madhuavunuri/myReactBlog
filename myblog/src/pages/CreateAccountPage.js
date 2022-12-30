import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
const CreateAccountPage = () => {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");

  const createAccount = async () => {
    try {
      if (password !== confirmPassword) {
        setError("Password not matched!!");
        return;
      }

      await createUserWithEmailAndPassword(getAuth(), email, password);
      navigate("/articles");

    } catch (e) {
      setError(e.message);
    }
  };

  return (
    <>
      <h1>Register Account</h1>
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
      <input
        type="password"
        placeholder="Re-enter password.."
        value={confirmPassword}
        onChange={(e) => setConfirmPassword(e.target.value)}
      />
      <button onClick={createAccount}>Register</button>
      <Link to={"/login"}>Alreay have an account? Login Here</Link>
    </>
  );
};
export default CreateAccountPage;
