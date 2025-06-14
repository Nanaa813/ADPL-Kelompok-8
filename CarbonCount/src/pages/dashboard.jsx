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
          <div className="card stat-card bg-green">
            <p className="card-title">🌍 Total Emissions Today</p>
            <h2 className="card-value">6,2 <span className="unit">Kg CO₂</span></h2>
            <p className="growth green">+18%</p>
          </div>
          <div className="card stat-card bg-yellow">
            <p className="card-title">⚡ Electric Emission</p>
            <h2 className="card-value">2,1 <span className="unit">Kg CO₂</span></h2>
            <p className="growth green">+18%</p>
          </div>
          <div className="card stat-card bg-blue">
            <p className="card-title">🚗 Transportation Emissions</p>
            <h2 className="card-value">3,5 <span className="unit">Kg CO₂</span></h2>
            <p className="growth green">+18%</p>
          </div>
          <div className="card stat-card bg-red">
            <p className="card-title">🍽 Food Emissions</p>
            <h2 className="card-value">0,5 <span className="unit">Kg CO₂</span></h2>
            <p className="growth red">-18%</p>
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
