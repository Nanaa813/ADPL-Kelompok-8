import { useEffect, useState } from "react";
import { Pie } from "react-chartjs-2";
import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import {
  FaDownload,
  FaEdit,
  FaTrash,
  FaFilter
} from "react-icons/fa";
import { db } from "../firebase-config";
import { collection, getDocs } from "firebase/firestore";
import "../styles/emission-history.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmissionHistory = () => {
  const [data, setData] = useState([]);

  // Ambil data dari Firestore saat komponen dimuat
  useEffect(() => {
    const fetchData = async () => {
      const emissionsCollection = collection(db, "emissions");
      const snapshot = await getDocs(emissionsCollection);
      const emissions = snapshot.docs.map(doc => doc.data());
      setData(emissions);
    };

    fetchData();
  }, []);

  const totalEmission = data.reduce((sum, item) => sum + Number(item.amount || 0), 0).toFixed(1);

  const calculatePieData = () => {
    const food = data.filter(d => d.type === "Makanan").reduce((sum, d) => sum + Number(d.amount), 0);
    const transport = data.filter(d => d.type === "Transportasi").reduce((sum, d) => sum + Number(d.amount), 0);
    const electricity = data.filter(d => d.type === "Listrik").reduce((sum, d) => sum + Number(d.amount), 0);

    return [food, transport, electricity];
  };

  const pieData = {
    labels: ["Makanan", "Transportasi", "Listrik"],
    datasets: [
      {
        data: calculatePieData(),
        backgroundColor: ["#75cda0", "#6466f1", "#aa7dd6"],
        borderWidth: 0
      }
    ]
  };

  return (
    <>
      <section className="summary-section">
        <div className="summary-box">
          <div className="header">
            <h2>Emission History</h2>
            <FaDownload className="icon" title="Download" />
          </div>
          <p>Total Emisi Bulan Ini: <strong>{totalEmission} satuan</strong></p>
          <p>Dibanding bulan lalu: ⬇️ −2.4 satuan (lebih rendah)</p>
        </div>

        <div className="chart-box">
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
              <th>Aktivitas</th>
              <th>Detail</th>
              <th>Jumlah</th>
              <th>Satuan</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.date}</td>
                <td>{item.type}</td>
                <td>{item.detail}</td>
                <td>{item.amount}</td>
                <td>{item.unit}</td>
                <td>
                  <FaEdit className="action-icon" title="Edit" />
                  <FaTrash className="action-icon" title="Hapus" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </>
  );
};

export default EmissionHistory;
