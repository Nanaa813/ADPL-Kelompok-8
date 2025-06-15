import { useEffect, useState } from "react";
import { collection, query, where, getDocs, deleteDoc, doc as docRef, updateDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";
import { Pie } from "react-chartjs-2";
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { FaFilter, FaEdit, FaTrash } from "react-icons/fa";
import "../styles/emission-history.css";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmissionHistory = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editItem, setEditItem] = useState(null);
  const [sortConfig, setSortConfig] = useState({ key: "date", direction: "asc" });
  const [showSortMenu, setShowSortMenu] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (!user) {
        setData([]);
        setLoading(false);
        return;
      }
      const q = query(
        collection(db, "emissions"),
        where("userId", "==", user.uid)
      );
      const querySnapshot = await getDocs(q);
      const emissions = querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      }));
      setData(emissions);
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Helper: get month-year from date string
  const getMonthYear = (dateStr) => {
    if (!dateStr) return "";
    const d = new Date(dateStr);
    return `${d.getFullYear()}-${d.getMonth() + 1}`;
  };

  const now = new Date();
  const thisMonth = `${now.getFullYear()}-${now.getMonth() + 1}`;
  const lastMonthDate = new Date(now.getFullYear(), now.getMonth() - 1, 1);
  const lastMonth = `${lastMonthDate.getFullYear()}-${lastMonthDate.getMonth() + 1}`;

  const totalThisMonth = data
    .filter(item => getMonthYear(item.date) === thisMonth)
    .reduce((sum, item) => sum + Number(item.emission || 0), 0);

  const totalLastMonth = data
    .filter(item => getMonthYear(item.date) === lastMonth)
    .reduce((sum, item) => sum + Number(item.emission || 0), 0);

  const diff = (totalThisMonth - totalLastMonth).toFixed(1);
  const diffText = diff > 0
    ? `⬆️ +${Math.abs(diff)} kg CO₂ (lebih tinggi)`
    : diff < 0
      ? `⬇️ −${Math.abs(diff)} kg CO₂ (lebih rendah)`
      : "Tidak ada perubahan";

  // Pie chart data
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

  // Hapus data
  const handleDelete = async (id) => {
    if (!window.confirm("Yakin ingin menghapus data ini?")) return;
    await deleteDoc(docRef(db, "emissions", id));
    setData(data.filter(item => item.id !== id));
  };

  // Edit data
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    const { id, ...updateData } = editItem;
    updateData.amount = Number(updateData.amount) || 0;
    updateData.emission = Number(updateData.emission) || 0;
    await updateDoc(docRef(db, "emissions", id), updateData);
    setData(data.map(item => item.id === id ? { ...editItem } : item));
    setEditItem(null);
  };

  // Sorting
  const handleSort = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
  };

  const handleSortMenu = (key) => {
    setSortConfig((prev) => ({
      key,
      direction: prev.key === key && prev.direction === "asc" ? "desc" : "asc"
    }));
    setShowSortMenu(false);
  };

  const renderSortIcon = (key) => {
    if (sortConfig.key !== key) return null;
    return sortConfig.direction === "asc" ? "▲" : "▼";
  };

  const sortedData = [...data].sort((a, b) => {
    const { key, direction } = sortConfig;
    let valA = a[key] ?? "";
    let valB = b[key] ?? "";

    if (key === "amount" || key === "emission") {
      valA = Number(valA);
      valB = Number(valB);
      return direction === "asc" ? valA - valB : valB - valA;
    }
    if (key === "date") {
      return direction === "asc"
        ? new Date(valA) - new Date(valB)
        : new Date(valB) - new Date(valA);
    }
    return direction === "asc"
      ? String(valA).localeCompare(String(valB))
      : String(valB).localeCompare(String(valA));
  });

  if (loading) return <div>Loading...</div>;

  return (
    <>
      <section className="summary-section">
        <div className="summary-box">
          <div className="header">
            <h2>Emission History</h2>
          </div>
          <p>Total Emisi Bulan Ini: <strong>{totalThisMonth.toFixed(1)} kg CO₂</strong></p>
          <p>Dibanding bulan lalu: {diffText}</p>
        </div>

        <div className="chart-box">
          <h5>Emissions by Category</h5>
          <Pie data={pieData} options={{ maintainAspectRatio: false, plugins: { legend: { position: "bottom" } } }} width={220} height={220} />
        </div>
      </section>

      <section className="table-section">
        <div className="table-header" style={{ position: "relative" }}>
          <h4>Riwayat Aktivitas</h4>
          <FaFilter className="icon" style={{ cursor: "pointer" }} onClick={() => setShowSortMenu(v => !v)} />
          {showSortMenu && (
            <div style={{
              position: "absolute", right: 0, top: 32, background: "#fff", border: "1px solid #eee",
              borderRadius: 8, boxShadow: "0 2px 8px rgba(0,0,0,0.08)", zIndex: 10, minWidth: 140
            }}>
              <div style={{ padding: 8, cursor: "pointer" }} onClick={() => handleSortMenu("date")}>Sortir Tanggal</div>
              <div style={{ padding: 8, cursor: "pointer" }} onClick={() => handleSortMenu("category")}>Sortir Jenis</div>
              <div style={{ padding: 8, cursor: "pointer" }} onClick={() => handleSortMenu("amount")}>Sortir Jumlah</div>
              <div style={{ padding: 8, cursor: "pointer" }} onClick={() => handleSortMenu("emission")}>Sortir Emisi</div>
            </div>
          )}
        </div>

        <table>
          <thead>
            <tr>
              <th onClick={() => handleSort("date")} style={{ cursor: "pointer" }}>
                Tanggal {renderSortIcon("date")}
              </th>
              <th onClick={() => handleSort("category")} style={{ cursor: "pointer" }}>
                Jenis {renderSortIcon("category")}
              </th>
              <th>Detail</th>
              <th onClick={() => handleSort("amount")} style={{ cursor: "pointer" }}>
                Jumlah {renderSortIcon("amount")}
              </th>
              <th onClick={() => handleSort("emission")} style={{ cursor: "pointer" }}>
                Emisi (kg CO₂) {renderSortIcon("emission")}
              </th>
              <th>Aksi</th>
            </tr>
          </thead>
          <tbody>
            {sortedData.length === 0 ? (
              <tr>
                <td colSpan="6" style={{ textAlign: "center" }}>Belum ada data emisi.</td>
              </tr>
            ) : (
              sortedData.map((item) => (
                <tr key={item.id}>
                  <td>{item.date || "-"}</td>
                  <td>{item.category || "-"}</td>
                  <td>{item.detail || "-"}</td>
                  <td>{item.amount} {item.unit}</td>
                  <td>{item.emission}</td>
                  <td>
                    <FaEdit className="action-icon" title="Edit" onClick={() => setEditItem({ ...item })} />
                    <FaTrash className="action-icon" title="Hapus" onClick={() => handleDelete(item.id)} />
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </section>

      {/* Modal Edit */}
      {editItem && (
        <div className="modal-edit" style={{
          position: "fixed", top: 0, left: 0, right: 0, bottom: 0,
          background: "rgba(0,0,0,0.3)", display: "flex", alignItems: "center", justifyContent: "center", zIndex: 1000
        }}>
          <form
            onSubmit={handleEditSubmit}
            style={{
              background: "#fff", padding: 24, borderRadius: 8, minWidth: 320, boxShadow: "0 2px 12px rgba(0,0,0,0.12)"
            }}
          >
            <h4>Edit Data Emisi</h4>
            <label>Tanggal</label>
            <input type="date" value={editItem.date || ""} onChange={e => setEditItem({ ...editItem, date: e.target.value })} required />
            <label>Jenis</label>
            <select value={editItem.category || ""} onChange={e => setEditItem({ ...editItem, category: e.target.value })} required>
              <option value="Konsumsi Makanan">Konsumsi Makanan</option>
              <option value="Transportasi">Transportasi</option>
              <option value="Konsumsi Listrik">Konsumsi Listrik</option>
            </select>
            <label>Detail</label>
            <input type="text" value={editItem.detail || ""} onChange={e => setEditItem({ ...editItem, detail: e.target.value })} required />
            <label>Jumlah</label>
            <input type="number" value={editItem.amount || ""} onChange={e => setEditItem({ ...editItem, amount: e.target.value })} required />
            <label>Satuan</label>
            <select value={editItem.unit || ""} onChange={e => setEditItem({ ...editItem, unit: e.target.value })} required>
              <option value="km">KM</option>
              <option value="kWh">kWh</option>
              <option value="gram">gram</option>
            </select>
            <label>Emisi (kg CO₂)</label>
            <input type="number" value={editItem.emission || ""} onChange={e => setEditItem({ ...editItem, emission: e.target.value })} required />
            <div style={{ marginTop: 16, display: "flex", gap: 8 }}>
              <button type="submit">Simpan</button>
              <button type="button" onClick={() => setEditItem(null)}>Batal</button>
            </div>
          </form>
        </div>
      )}
    </>
  );
};

export default EmissionHistory;