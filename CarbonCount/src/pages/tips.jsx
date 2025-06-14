import "../styles/tips.css";

function Tips() {
  const tipsList = [
    {
      category: "Transportasi",
      icon: "🚲",
      tips: [
        "Gunakan sepeda untuk perjalanan dekat",
        "Manfaatkan transportasi umum",
        "Carpool dengan teman saat pergi kuliah"
      ]
    },
    {
      category: "Listrik",
      icon: "💡",
      tips: [
        "Matikan lampu saat tidak digunakan",
        "Cabut charger jika tidak dipakai",
        "Gunakan lampu LED hemat energi"
      ]
    },
    {
      category: "Makanan",
      icon: "🥦",
      tips: [
        "Kurangi konsumsi daging merah",
        "Pilih produk lokal & musiman",
        "Kurangi makanan cepat saji"
      ]
    }
  ];

  return (
    <div className="tips-page">
      <h2>🌱 Tips Mengurangi Jejak Karbon</h2>
      <div className="tips-container">
        {tipsList.map((section, index) => (
          <div className="tips-card" key={index}>
            <h3>{section.icon} {section.category}</h3>
            <ul>
              {section.tips.map((tip, i) => (
                <li key={i}>• {tip}</li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Tips;
