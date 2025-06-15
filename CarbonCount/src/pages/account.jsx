// Account.jsx
import "../styles/account.css";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { FaUserCircle } from "react-icons/fa";

function Account() {
  const [user, setUser] = useState({
    name: "-",
    email: "-",
    city: "-",
    joinDate: "-"
  });
  const [totalEmissions, setTotalEmissions] = useState("0 kg CO₂");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (firebaseUser) => {
      if (!firebaseUser) {
        setLoading(false);
        return;
      }

      try {
        const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
        const userData = userDoc.exists() ? userDoc.data() : {};

        setUser({
          name: userData.name || firebaseUser.displayName || "-",
          email: userData.email || firebaseUser.email || "-",
          city: userData.city || "Kendari",
          joinDate: userData.joinDate || "13 Juni 2024"
        });

        const q = query(
          collection(db, "emissions"),
          where("userId", "==", firebaseUser.uid)
        );
        const querySnapshot = await getDocs(q);
        const emissions = querySnapshot.docs.map(doc => doc.data());
        const total = emissions.reduce((sum, item) => sum + Number(item.emission || 0), 0);
        setTotalEmissions(`${total.toFixed(1)} kg CO₂`);
      } catch (err) {
        console.error("Gagal mengambil data:", err);
      }

      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="account-container">
      <div className="account-card">
        <div className="header-section">
          <FaUserCircle className="profile-icon" />
          <div className="account-text">
            <h3>Account</h3>
            <h1>{user.name}</h1>
            <p>{user.email}</p>
            <p>City: {user.city}</p>
            <p>Joined: {user.joinDate}</p>
            <p>Total Emission: {totalEmissions}</p>
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
