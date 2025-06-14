import { Outlet, useNavigate, NavLink } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import "../styles/dashboard.css";
import {
  FaSearch,
  FaBell,
  FaUserCircle
} from "react-icons/fa";

function Layout() {
  const navigate = useNavigate();

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout gagal:", error);
      });
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🌱 CarbonCount</h2>

        <div className="nav-main">
          <ul>
            <li>
              <NavLink to="/dashboard" className={({ isActive }) => isActive ? "active" : ""}>Dashboard</NavLink>
            </li>
            <li>
              <NavLink to="/input" className={({ isActive }) => isActive ? "active" : ""}>Emission Input</NavLink>
            </li>
            <li>
              <NavLink to="/history" className={({ isActive }) => isActive ? "active" : ""}>History</NavLink>
            </li>
            <li>
              <NavLink to="/tips" className={({ isActive }) => isActive ? "active" : ""}>Tips</NavLink>
            </li>
            <li>
              <NavLink to="/account" className={({ isActive }) => isActive ? "active" : ""}>Account</NavLink>
            </li>
          </ul>
        </div>

        <div className="nav-bottom">
          <ul>
            <li>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          </ul>
        </div>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        <header className="topbar">
          <div className="greeting">
            <h3>Welcome Back, Nana</h3>
            <p>How much carbon usage do you have today?</p>
          </div>
          <div className="topbar-icons">
            <FaSearch className="icon" />
            <FaBell className="icon" />
            <FaUserCircle className="icon" />
          </div>
        </header>

        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
