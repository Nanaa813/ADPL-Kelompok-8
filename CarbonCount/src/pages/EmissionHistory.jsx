import { useState } from "react";
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
import "../styles/emission-history.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmissionHistory = () => {
  const [data] = useState([
    {
      date: "31 Mei 2025",
      category: "Konsumsi Makanan",
      type: "Ayam Goreng",
      amount: "250 gram",
      emission: 2.3
    },
    {
      date: "29 Mei 2025",
      category: "Transportasi",
      type: "Naik Motor",
      amount: "10 km",
      emission: 1.5
    },
    {
      date: "27 Mei 2025",
      category: "Konsumsi Listrik",
      type: "Peralatan Rumah",
      amount: "5 kWh",
      emission: 3.8
    },
    {
      date: "25 Mei 2025",
      category: "Konsumsi Makanan",
      type: "Tahu Tempe",
      amount: "300 gram",
      emission: 0.7
    },
    {
      date: "22 Mei 2025",
      category: "Transportasi",
      type: "Naik Sepeda",
      amount: "5 km",
      emission: 0.0
    }
  ]);

  const totalEmission = data.reduce((sum, item) => sum + item.emission, 0).toFixed(1);

  const pieData = {
    labels: ["Konsumsi Makanan", "Transportasi", "Konsumsi Listrik"],
    datasets: [
      {
        data: [3.0, 1.5, 3.8],
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
          <p>Total Emisi Bulan Ini: <strong>{totalEmission} kg CO₂</strong></p>
          <p>Dibanding bulan lalu: ⬇️ −2.4 kg CO₂ (lebih rendah)</p>
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
              <th>Jenis</th>
              <th>Jumlah</th>
              <th>Emisi (kg CO₂)</th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, i) => (
              <tr key={i}>
                <td>{item.date}</td>
                <td>{item.category}</td>
                <td>{item.type}</td>
                <td>{item.amount}</td>
                <td>{item.emission}</td>
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
