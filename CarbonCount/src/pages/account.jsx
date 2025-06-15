import "../styles/account.css";
import { FaUserCircle } from "react-icons/fa";

function Account() {
  // Ini data statis sementara (kalau mau pakai dari Firebase bisa ditambah)
  const user = {
    name: "Nana",
    email: "nana@email.com",
    totalEmissions: "68.5 kg CO₂"
  };

  return (
    <div className="account-page">
      <h2>👤 Profil Pengguna</h2>
      <div className="account-card">
        <FaUserCircle className="profile-icon" />
        <div className="info">
          <p><strong>Nama:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Total Emisi:</strong> {user.totalEmissions}</p>
        </div>
      </div>
    </div>
  );
}

export default Account;
