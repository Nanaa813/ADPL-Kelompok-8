import { Link } from 'react-router-dom';
import '../styles/login.css'; // kita pakai file CSS custom buat styling khusus

function Login() {
  return (
    <div className="login-container d-flex align-items-center justify-content-center vh-100">
      <div className="login-card d-flex shadow rounded-4 overflow-hidden">

        {/* Kiri: Form Login */}
        <div className="form-side p-5 bg-light-subtle">
          <h3 className="mb-2 fw-bold">Login to CarbonCount</h3>
          <p className="mb-4 text-muted">Let's reduce your carbon!</p>

          <form>
            <div className="mb-3">
              <label htmlFor="email" className="form-label">Email Address</label>
              <input type="email" className="form-control" id="email" placeholder="name@example.com" />
            </div>

            <div className="mb-4">
              <label htmlFor="password" className="form-label">Password</label>
              <input type="password" className="form-control" id="password" placeholder="••••••••" />
            </div>

            <button type="submit" className="btn btn-success w-100 rounded-pill">Login</button>
          </form>

          <p className="mt-3 text-center">
            Don't have an account? <Link to="/register">Sign up</Link>
          </p>
        </div>

        {/* Kanan: Gambar */}
        <div className="image-side d-none d-md-block bg-success-subtle p-4 text-center">
          <img src="/image-login.jpg" alt="eco" className="img-fluid hexagon-img" />
        </div>

      </div>
    </div>
  );
}

export default Login;
