import EmissionsLineChart from "../components/EmissionsLineChart";
import EmissionsPieChart from "../components/EmissionsPieChart";
import "../styles/dashboard.css";

function Dashboard() {
  return (
    <>
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
        <div className="chart">
          <h5>Emissions Over Time</h5>
          <EmissionsLineChart />
        </div>

        <div className="chart">
          <h5>Emissions by Category</h5>
          <EmissionsPieChart />
        </div>
      </section>
    </>
  );
}

export default Dashboard;
