import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import EmissionsLineChart from "../components/EmissionsLineChart";
import EmissionsPieChart from "../components/EmissionsPieChart";
import "../styles/dashboard.css";

function Dashboard() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchEmissions = async () => {
      if (!auth.currentUser) {
        setData([]);
        setLoading(false);
        return;
      }
      const q = query(
        collection(db, "emissions"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const emissions = querySnapshot.docs.map(doc => doc.data());
      setData(emissions);
      setLoading(false);
    };
    fetchEmissions();
  }, []);

  // Hitung total emisi dan per kategori
  const totalEmission = data.reduce((sum, item) => sum + Number(item.emission || 0), 0).toFixed(1);
  const electricity = data.filter(d => d.category === "Konsumsi Listrik").reduce((sum, i) => sum + Number(i.emission || 0), 0).toFixed(1);
  const transport = data.filter(d => d.category === "Transportasi").reduce((sum, i) => sum + Number(i.emission || 0), 0).toFixed(1);
  const food = data.filter(d => d.category === "Konsumsi Makanan").reduce((sum, i) => sum + Number(i.emission || 0), 0).toFixed(1);

  if (loading) return <div>Loading...</div>;

  return (
    <>
      {/* Statistic Cards */}
      <section className="cards-row">
        <div className="card emission-card">
          <h4>🌍 Total Emissions</h4>
          <p className="emission-value">{totalEmission} kg CO₂</p>
        </div>
        <div className="card emission-card">
          <h4>⚡ Electricity</h4>
          <p className="emission-value">{electricity} kg CO₂</p>
        </div>
        <div className="card emission-card">
          <h4>🚗 Transport</h4>
          <p className="emission-value">{transport} kg CO₂</p>
        </div>
        <div className="card emission-card">
          <h4>🍽 Food</h4>
          <p className="emission-value">{food} kg CO₂</p>
        </div>
      </section>

      {/* Charts */}
      <section className="charts-row">
        <div className="chart">
          <h5>Emissions Over Time</h5>
          <EmissionsLineChart data={data} />
        </div>
        <div className="chart">
          <h5>Emissions by Category</h5>
          <EmissionsPieChart data={data} />
        </div>
      </section>
    </>
  );
}

export default Dashboard;