import { useEffect, useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { signOut, onAuthStateChanged } from "firebase/auth";
import { db, auth } from "../firebase-config";
import { FaSearch, FaBell, FaUserCircle } from "react-icons/fa";
import "../styles/dashboard.css";
import { doc, getDoc } from "firebase/firestore";

function Layout() {
  const navigate = useNavigate();
  const [displayName, setDisplayName] = useState("");

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, async (user) => {
      if (user) {
        // Ambil data user dari Firestore (collection "users", doc id = uid)
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          setDisplayName(userDoc.data().name || user.displayName || user.email || "User");
        } else {
          setDisplayName(user.displayName || user.email || "User");
        }
      } else {
        setDisplayName("User");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    signOut(auth)
      .then(() => {
        navigate("/");
      })
      .catch((error) => {
        console.error("Logout gagal:", error);
      });
  };

  return (
    <div className="dashboard-wrapper">
      {/* Sidebar */}
      <aside className="sidebar">
        <h2 className="logo">🌱 CarbonCount</h2>

        <div className="nav-main">
          <ul>
            <li><a href="/dashboard">Dashboard</a></li>
            <li><a href="/input">Emission Input</a></li>
            <li><a href="/history">History</a></li>
            <li><a href="/tips">Tips</a></li>
            <li><a href="/account">Account</a></li>
          </ul>
        </div>

        <div className="nav-bottom">
          <ul>
            <li>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </li>
          </ul>
        </div>
      </aside>

      <main className="main-content-wrapper">
        <div className="main-content">
          <header className="topbar">
            <div className="greeting">
              <h3>Welcome Back, {displayName || "User"}</h3>
              <p>How much carbon usage do you have today?</p>
            </div>
            <div className="topbar-icons">
              <FaSearch className="icon" />
              <FaBell className="icon" />
              <FaUserCircle className="icon" />
            </div>
          </header>

          <Outlet />
        </div>
      </main>
    </div>
  );
}

export default Layout;