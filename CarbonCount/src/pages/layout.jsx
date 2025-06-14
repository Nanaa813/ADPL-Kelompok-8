import { Outlet } from "react-router-dom";
import "./styles/dashboard.css";
import {
  FaSearch,
  FaBell,
  FaUserCircle
} from "react-icons/fa";

function Layout() {
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
            <li><a href="#">Settings</a></li>
            <li><a href="#">Logout</a></li>
          </ul>
        </div>
      </aside>

      {/* Main Content Outlet */}
      <main className="main-content">
        <header className="topbar">
          <div className="greeting">
            <h3>Welcome back, Nana</h3>
            <p>How much carbon usage do you have today?</p>
          </div>
          <div className="topbar-icons">
            <FaSearch className="icon" />
            <FaBell className="icon" />
            <FaUserCircle className="icon" />
          </div>
        </header>

        {/* Ini yang akan berganti tiap page */}
        <Outlet />
      </main>
    </div>
  );
}

export default Layout;
