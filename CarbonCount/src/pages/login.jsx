import "../styles/login.css";

function Login() {
  return (
    <div className="login-page">
        <div className="login-card">
          <h2>
            Login to <strong>CarbonCount</strong>
          </h2>
          <p className="subtitle">Let’s reduce your carbon!</p>

          <form>
            <label htmlFor="email">Email Address</label>
            <input type="email" id="email" placeholder="Enter your email" required />

            <label htmlFor="password">Password</label>
            <div className="password-wrapper">
              <input type="password" id="password" placeholder="Enter your password" required />
              <span className="eye-icon">👁</span>
            </div>

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
