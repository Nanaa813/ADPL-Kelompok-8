import { useEffect, useState } from "react";
import { collection, query, where, getDocs } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaDownload, FaFilter, FaEdit, FaTrash } from "react-icons/fa";
import "../styles/emission-history.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmissionHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  // Ambil data emisi dari Firestore khusus user yang sedang login
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

  // Hitung total emisi
  const totalEmission = data.reduce((sum, item) => sum + Number(item.emission || 0), 0).toFixed(1);

  // Hitung data untuk Pie Chart
  const categoryTotals = {
    "Konsumsi Makanan": 0,
    "Transportasi": 0,
    "Konsumsi Listrik": 0
  };
  data.forEach(item => {
    if (categoryTotals[item.category] !== undefined) {
      categoryTotals[item.category] += Number(item.emission || 0);
    }
  });

  const pieData = {
    labels: ["Konsumsi Makanan", "Transportasi", "Konsumsi Listrik"],
    datasets: [
      {
        data: [
          categoryTotals["Konsumsi Makanan"],
          categoryTotals["Transportasi"],
          categoryTotals["Konsumsi Listrik"]
        ],
        backgroundColor: ["#75cda0", "#6466f1", "#aa7dd6"],
        borderWidth: 0
      }
    ]
  };

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <section className="summary-section">
        <div className="summary-box">
          <div className="header">
            <h2>Emission History</h2>
            <FaDownload className="icon" title="Download" />
          </div>
          <p>Total Emisi Bulan Ini: <strong>{totalEmission} kg CO₂</strong></p>
          <p>Dibanding bulan lalu: ⬇️ −2.4 kg CO₂ (lebih rendah)</p>
        </div>

        <div className="chart-box">
          <h5>Emissions by Category</h5>
          <Pie data={pieData} />
        </div>
      </section>

      <section className="table-section">
        <div className="table-header">
          <h4>Riwayat Aktivitas</h4>
          <FaFilter className="icon" />
        </div>

        <table>
          <thead>
            <tr>
              <th>Tanggal</th>
              <th>Jenis</th>
              <th>Detail</th>
              <th>Jumlah</th>
              <th>Emisi (kg CO₂)</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>Belum ada data emisi.</td>
              </tr>
            ) : (
              data.map((item, i) => (
                <tr key={i}>
                  <td>{item.date}</td>
                  <td>{item.category}</td>
                  <td>{item.detail}</td>
                  <td>{item.amount} {item.unit}</td>
                  <td>{item.emission}</td>
                  <td>
                    <FaEdit className="action-icon" title="Edit" />
                    <FaTrash className="action-icon" title="Hapus" />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default EmissionHistory;