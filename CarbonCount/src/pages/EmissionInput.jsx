import { useState } from "react";
import "../styles/emissioninput.css";
import { FaRegCalendarAlt } from "react-icons/fa";

import { collection, addDoc } from "firebase/firestore";
import { auth, db } from "../firebase-config";

function EmissionInput() {
  const [date, setDate] = useState("");
  const [type, setType] = useState("");
  const [detail, setDetail] = useState("");
  const [amount, setAmount] = useState("");
  const [unit, setUnit] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await addDoc(collection(db, "emissions"), {
        userId: auth.currentUser.uid, // simpan UID user
        date,
        type,
        detail,
        amount,
        unit,
        createdAt: new Date()
      });
      // reset form atau tampilkan pesan sukses
    } catch (err) {
      // tampilkan pesan error
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
            <select value={type} onChange={(e) => setType(e.target.value)} required>
              <option value="">Jenis Aktivitas</option>
              <option value="transport">Transportasi</option>
              <option value="electricity">Listrik</option>
              <option value="food">Makanan</option>
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
