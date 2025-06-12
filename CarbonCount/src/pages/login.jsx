import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      await signInWithEmailAndPassword(auth, email, password);
      navigate("/dashboard");
    } catch (err) {
      setError("Email atau password salah.");
    }
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <h2>
          Login to <strong>CarbonCount</strong>
        </h2>
        <p className="subtitle">Let’s reduce your carbon!</p>

        <form onSubmit={handleLogin}>
          <label htmlFor="email">Email Address</label>
          <input type="email" id="email" placeholder="Enter your email" value={email} onChange={(e) => setEmail(e.target.value)} required />

          <label htmlFor="password">Password</label>
          <div className="password-wrapper">
            <input type="password" id="password" placeholder="Enter your password" value={password} onChange={(e) => setPassword(e.target.value)} required />
            <span className="eye-icon">👁</span>
          </div>

          {error && <p style={{ color: "red", fontSize: "13px" }}>{error}</p>}

          <button type="submit">Login</button>
        </form>

        <p className="register-link">
          Don’t have an account? <a href="/register">Sign up</a>
        </p>
      </div>
    </div>
  );
}

export default Login;
