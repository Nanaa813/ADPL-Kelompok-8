import { useState } from "react";
import "../styles/tips.css";
import { FaLeaf, FaBicycle, FaPlug, FaUtensils } from "react-icons/fa";

const tipsData = [
  {
    id: 1,
    title: "Gunakan Transportasi Ramah Lingkungan",
    category: "Transportasi",
    icon: <FaBicycle />,
    content: "Gunakan sepeda, jalan kaki, atau transportasi umum untuk mengurangi emisi karbon harianmu."
  },
  {
    id: 2,
    title: "Kurangi Konsumsi Daging Merah",
    category: "Makanan",
    icon: <FaUtensils />,
    content: "Produksi daging merah menghasilkan emisi gas rumah kaca yang tinggi. Konsumsi nabati beberapa kali seminggu bisa membantu."
  },
  {
    id: 3,
    title: "Cabut Peralatan Listrik yang Tidak Dipakai",
    category: "Listrik",
    icon: <FaPlug />,
    content: "Peralatan yang tetap dicolok akan menyedot listrik diam-diam. Cabut saat tidak digunakan untuk hemat energi."
  },
  {
    id: 4,
    title: "Tanam Pohon di Sekitar Rumah",
    category: "Umum",
    icon: <FaLeaf />,
    content: "Pohon menyerap CO₂ dan membantu menurunkan suhu lingkungan. Ini cara alami untuk bantu bumi."
  }
];

function Tips() {
  const [openTip, setOpenTip] = useState(null);

  const toggleTip = (id) => {
    setOpenTip(openTip === id ? null : id);
  };

  return (
    <div className="tips-page">
      <h2 className="tips-title">Tips Mengurangi Emisi Karbon</h2>
      <p className="tips-subtitle">Lakukan perubahan kecil untuk dampak besar.</p>

      <div className="tips-container">
        {tipsData.map((tip) => (
          <div
            key={tip.id}
            className={`tip-card ${openTip === tip.id ? "expanded" : ""}`}
            onClick={() => toggleTip(tip.id)}
          >
            <div className="tip-header">
              <div className="tip-icon">{tip.icon}</div>
              <h4 className="tip-title">{tip.title}</h4>
            </div>
            {openTip === tip.id && (
              <p className="tip-content">{tip.content}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tips;
