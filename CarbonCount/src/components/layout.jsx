import { Outlet, useNavigate } from "react-router-dom";
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
        navigate("/"); // redirect ke login
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
            <li className="active"><a href="/dashboard">Dashboard</a></li>
            <li><a href="/input">Emission Input</a></li>
            <li><a href="/history">History</a></li>
            <li><a href="/tips">Tips</a></li>
            <li><a href="/account">Account</a></li>
          </ul>
        </div>

        {/* Logout only */}
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

        {/* Halaman akan dimuat di sini */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
