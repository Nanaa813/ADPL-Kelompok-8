import "../styles/account.css";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";

function Account() {
  const [user, setUser] = useState({ name: "-", email: "-", city: "-", joinDate: "-" });
  const [totalEmissions, setTotalEmissions] = useState("0 kg CO₂");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (firebaseUser) => {
      const fetchData = async () => {
        if (!firebaseUser) {
          setLoading(false);
          return;
        }

        try {
          const userDoc = await getDoc(doc(db, "users", firebaseUser.uid));
          let userData = userDoc.exists() ? userDoc.data() : {};

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
        } catch (error) {
          console.error("❌ Error fetching data:", error);
        }

        setLoading(false);
      };

      fetchData();
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="account-page">
      <div className="account-header">
        <FaUserCircle className="profile-icon" />
        <div>
          <h2>{user.name}</h2>
          <p>{user.email}</p>
          <p><strong>City:</strong> {user.city}</p>
          <p><strong>Joined:</strong> {user.joinDate}</p>
        </div>
        <button className="btn-change">Change Password</button>
      </div>

      <div className="account-stats">
        <div className="card">
          <h4>📊 Monthly Carbon Emissions Target</h4>
          <p>Current Target: 15 kg CO₂/mo</p>
          <p>Status: <strong>Not Achieved</strong></p>
        </div>
        <div className="card">
          <h4>🏆 Achievement</h4>
          <ul>
            <li>🎯 Starter</li>
            <li>✅ Consistent Tracker</li>
            <li>🌿 Green Hero</li>
          </ul>
        </div>
      </div>
    </div>
  );
}

export default Account;
