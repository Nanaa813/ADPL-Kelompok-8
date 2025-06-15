import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { signInWithEmailAndPassword } from "firebase/auth";
import { auth } from "../firebase-config";
import "../styles/login.css";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);
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
    <div className="login-bg">
      <div className="login-glass">
        <h1>
          <span className="login-bold">Login to</span><br />
          <span className="login-bold">CarbonCount</span>
        </h1>
        <p className="login-subtitle">Let’s reduce your carbon!</p>
        <form onSubmit={handleLogin}>
          <div className="login-label">Email Address</div>
          <input
            type="email"
            className="login-input"
            placeholder="Enter your email"
            value={email}
            onChange={e => setEmail(e.target.value)}
            required
          />

          <div className="login-label">Password</div>
          <div className="login-input-wrapper">
            <input
              type={showPass ? "text" : "password"}
              className="login-input"
              placeholder="Enter your password"
              value={password}
              onChange={e => setPassword(e.target.value)}
              required
            />
            <span
              className="login-eye"
              onClick={() => setShowPass(v => !v)}
              title={showPass ? "Hide" : "Show"}
            >
              {showPass ? "🙈" : "👁"}
            </span>
          </div>
          {error && <div className="login-error">{error}</div>}
          <button className="login-btn" type="submit">Login</button>
        </form>
        <div className="login-bottom">
          Don’t have an account? <a href="/register">Sign up</a>
        </div>
      </div>
    </div>
  );
}

export default Login;