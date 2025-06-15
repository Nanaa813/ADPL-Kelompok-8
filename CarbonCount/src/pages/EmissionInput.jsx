import { useState } from "react";
import "../styles/emissioninput.css";
import { FaRegCalendarAlt } from "react-icons/fa";
import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function EmissionInput() {
  const [date, setDate] = useState("");
  const [category, setCategory] = useState("");
  const [detail, setDetail] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");

  // Contoh konversi sederhana ke emisi CO2 (ganti sesuai kebutuhan)
  const calculateEmission = (category, amount) => {
    const n = Number(amount);
    if (category === "Transportasi") return n * 0.2; // misal 0.2 kg CO2/km
    if (category === "Konsumsi Listrik") return n * 0.85; // misal 0.85 kg CO2/kWh
    if (category === "Konsumsi Makanan") return n * 0.001; // misal 0.001 kg CO2/gram
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSuccess("");
    setError("");
    try {
      if (!auth.currentUser) {
        setError("Anda belum login.");
        return;
      }
      const emission = calculateEmission(category, amount);
      await addDoc(collection(db, "emissions"), {
        userId: auth.currentUser.uid,
        date,
        category,
        detail,
        amount: Number(amount),
        unit,
        emission, // simpan hasil perhitungan emisi
        createdAt: new Date()
      });
      setSuccess("Data emisi berhasil disimpan!");
      setDate("");
      setCategory("");
      setDetail("");
      setAmount("");
      setUnit("");
    } catch (err) {
      setError("Gagal menyimpan data: " + err.message);
    }
  };

  return (
    <div className="content-box">
      <div className="form-box">
        <h2 className="form-title">Emission Input</h2>
        <p className="form-subtitle">How much carbon usage do you have today?</p>

        <form onSubmit={handleSubmit}>
          <div className="form-group icon-input">
            <input
              type="text"
              placeholder="Tanggal Aktivitas"
              onFocus={(e) => (e.target.type = "date")}
              onBlur={(e) => (e.target.type = "text")}
              value={date}
              onChange={(e) => setDate(e.target.value)}
              required
            />
            <FaRegCalendarAlt className="calendar-icon" />
          </div>

          <div className="form-group">
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Jenis Aktivitas</option>
              <option value="Konsumsi Makanan">Konsumsi Makanan</option>
              <option value="Transportasi">Transportasi</option>
              <option value="Konsumsi Listrik">Konsumsi Listrik</option>
            </select>
          </div>

          <div className="form-group">
            <input
              type="text"
              placeholder="Detail Aktivitas"
              value={detail}
              onChange={(e) => setDetail(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <input
              type="number"
              placeholder="Jumlah"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              required
            />
          </div>

          <div className="form-group">
            <select value={unit} onChange={(e) => setUnit(e.target.value)} required>
              <option value="">Satuan</option>
              <option value="km">KM</option>
              <option value="kWh">kWh</option>
              <option value="gram">gram</option>
            </select>
          </div>

          {success && <div style={{ color: "green", marginBottom: 8 }}>{success}</div>}
          {error && <div style={{ color: "red", marginBottom: 8 }}>{error}</div>}

          <div className="submit-button">
            <button type="submit">SUBMIT</button>
          </div>
        </form>
      </div>

      <div className="image-box">
        <img src="/carbon-art.png" alt="Ilustrasi Emisi" />
      </div>
    </div>
  );
}

export default EmissionInput;