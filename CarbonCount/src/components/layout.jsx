import { Outlet, useNavigate } from "react-router-dom";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import "../styles/dashboard.css";

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
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/input">Emission Input</a></li>
            <li><a href="/history">History</a></li>
            <li><a href="/tips">Tips</a></li>
            <li><a href="/account">Account</a></li>
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


      <main className="main-content-wrapper">
        <div className="main-content">
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
        </div>
      </main>
    </div>
  );
}

export default Layout;
