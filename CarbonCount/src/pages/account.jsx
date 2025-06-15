import "../styles/account.css";
import { FaUserCircle } from "react-icons/fa";
import { useEffect, useState } from "react";
import { auth, db } from "../firebase-config";
import { doc, getDoc, collection, query, where, getDocs } from "firebase/firestore";

function Account() {
  const [user, setUser] = useState(null);
  const [totalEmissions, setTotalEmissions] = useState("0 kg CO₂");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!auth.currentUser) {
        setLoading(false);
        return;
      }
      // Ambil data profil user
      const userDoc = await getDoc(doc(db, "users", auth.currentUser.uid));
      if (userDoc.exists()) {
        setUser(userDoc.data());
      }
      // Hitung total emisi user
      const q = query(
        collection(db, "emissions"),
        where("userId", "==", auth.currentUser.uid)
      );
      const querySnapshot = await getDocs(q);
      const emissions = querySnapshot.docs.map(doc => doc.data());
      const total = emissions.reduce((sum, item) => sum + Number(item.emission || 0), 0);
      setTotalEmissions(`${total.toFixed(1)} kg CO₂`);
      setLoading(false);
    };
    fetchUserData();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="account-page">
      <h2>👤 Profil Pengguna</h2>
      <div className="account-card">
        <FaUserCircle className="profile-icon" />
        <div className="info">
          <p><strong>Nama:</strong> {user?.name || "-"}</p>
          <p><strong>Email:</strong> {user?.email || "-"}</p>
          <p><strong>Total Emisi:</strong> {totalEmissions}</p>
        </div>
      </div>
    </div>
  );
}

export default Account;