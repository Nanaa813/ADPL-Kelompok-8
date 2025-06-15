import "../styles/account.css";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa"; // ← ikon profil

function Account() {
  const [user, setUser] = useState({
    name: "-",
    email: "-",
    city: "-",
    joined: "-"
  });

  useEffect(() => {
    onAuthStateChanged(auth, async (currentUser) => {
      if (currentUser) {
        const docRef = doc(db, "users", currentUser.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          const data = docSnap.data();
          setUser({
            name: data.name || "-",
            email: data.email || "-",
            city: data.city || "-",
            joined: data.joinedDate || "-"
          });
        }
      }
    });
  }, []);

  return (
    <div className="account-container">
      <div className="account-card">
        <div className="header-section">
          {/* Ganti gambar dengan ikon */}
          <FaUserCircle className="profile-icon" />
          <div className="account-text">
            <h3>Account</h3>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>City: {user.city}</p>
            <p>Joined: {user.joined}</p>
          </div>
          <div className="account-badge">
            <span className="badge">Beginner</span>
            <button className="change-pass">Change Password</button>
          </div>
        </div>

        <div className="target-section">
          <h4>🌿 Monthly Carbon Emissions Target</h4>
          <div className="target-info">
            <div>
              <p className="label">Current Target</p>
              <p className="value">15 kg</p>
              <p className="unit">CO₂/mo</p>
            </div>
            <div>
              <p className="label">Status</p>
              <p className="status">Not Achieved</p>
            </div>
          </div>
        </div>

        <div className="achievement-section">
          <h4>🏅 Achievement</h4>
          <div className="achievement-list">
            <span>🥉 Starter</span>
            <span>🥈 Consistent Tracker</span>
            <span>🏆 Green Hero</span>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Account;
