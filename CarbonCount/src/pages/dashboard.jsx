import "../styles/dashboard.css";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🌱 CarbonCount</h2>
        <nav>
          <ul>
            <li className="active">Dashboard</li>
            <li>Emission Input</li>
            <li>Emission History</li>
            <li>Tips</li>
            <li>Account</li>
            <li>Settings</li>
            <li>Logout</li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="main-content">
        {/* Header */}
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

        {/* Content Placeholder */}
        <section className="cards-row">
          <div className="card">🌍 Total Emissions</div>
          <div className="card">⚡ Electric</div>
          <div className="card">🚗 Transport</div>
          <div className="card">🍽 Food</div>
        </section>

        <section className="charts-row">
          <div className="chart">📈 Line Chart</div>
          <div className="chart">📊 Pie Chart</div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
