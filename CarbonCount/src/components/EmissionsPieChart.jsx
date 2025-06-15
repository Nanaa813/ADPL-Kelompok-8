import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmissionsPieChart = ({ data }) => {
  // Hitung total emisi per kategori
  const categoryTotals = {
    "Transportasi": 0,
    "Konsumsi Listrik": 0,
    "Konsumsi Makanan": 0
  };
  data.forEach(item => {
    if (categoryTotals[item.category] !== undefined) {
      categoryTotals[item.category] += Number(item.emission || 0);
    }
  });

  const chartData = {
    labels: ["Transportasi", "Konsumsi Listrik", "Konsumsi Makanan"],
    datasets: [
      {
        label: "Emisi per Kategori (kg CO₂)",
        data: [
          categoryTotals["Transportasi"],
          categoryTotals["Konsumsi Listrik"],
          categoryTotals["Konsumsi Makanan"]
        ],
        backgroundColor: ["#20c997", "#0d6efd", "#ffc107"],
        borderWidth: 1
      }
    ]
  };

  return (
    <div style={{ width: 220, height: 220 }}>
      <Pie
        data={chartData}
        options={{
          maintainAspectRatio: false,
          plugins: {
            legend: { position: "bottom" }
          }
        }}
      />
    </div>
  );
};

export default EmissionsPieChart;