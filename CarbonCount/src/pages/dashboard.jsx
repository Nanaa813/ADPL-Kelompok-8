import "../styles/dashboard.css";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

function Dashboard() {
  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🌱 CarbonCount</h2>
        <nav>
          <ul>
            <li className="active">
              <Link to="/dashboard">Dashboard</Link>
            </li>
            <li>
              <Link to="/input">Emission Input</Link>
            </li>
            <li>
              <Link to="/history">Emission History</Link>
            </li>
            <li>
              <Link to="/tips">Tips</Link>
            </li>
            <li>
              <Link to="/account">Account</Link>
            </li>
            <li>
              <Link to="/settings">Settings</Link>
            </li>
            <li>
              <Link to="/">Logout</Link>
            </li>
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

        {/* Statistic Cards */}
        <section className="cards-row">
          <div className="card emission-card">
            <h4>🌍 Total Emissions</h4>
            <p className="emission-value">6.2 kg CO₂</p>
            <span className="emission-change up">+18%</span>
          </div>

          <div className="card emission-card">
            <h4>⚡ Electricity</h4>
            <p className="emission-value">2.1 kg CO₂</p>
            <span className="emission-change up">+18%</span>
          </div>

          <div className="card emission-card">
            <h4>🚗 Transport</h4>
            <p className="emission-value">3.5 kg CO₂</p>
            <span className="emission-change up">+18%</span>
          </div>

          <div className="card emission-card">
            <h4>🍽 Food</h4>
            <p className="emission-value">0.5 kg CO₂</p>
            <span className="emission-change down">−18%</span>
          </div>
        </section>

        {/* Charts */}
        <section className="charts-row">
          <div className="chart">📈 Emission Usage Graph</div>
          <div className="chart">📊 Usage Category</div>
        </section>
      </main>
    </div>
  );
}

export default Dashboard;
