import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
} from "chart.js";
import { Line } from "react-chartjs-2";

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

function getMonthLabel(monthIdx) {
  // monthIdx: 0-11
  return [
    "Jan", "Feb", "Mar", "Apr", "May", "Jun",
    "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
  ][monthIdx];
}

const EmissionsLineChart = ({ data }) => {
  // Proses data: total emisi per bulan di tahun berjalan
  const now = new Date();
  const year = now.getFullYear();
  const monthlyTotals = Array(12).fill(0);

  data.forEach(item => {
    if (!item.date) return;
    const d = new Date(item.date);
    if (d.getFullYear() === year) {
      const month = d.getMonth(); // 0-11
      monthlyTotals[month] += Number(item.emission || 0);
    }
  });

  const chartData = {
    labels: Array.from({ length: 12 }, (_, i) => getMonthLabel(i)),
    datasets: [
      {
        label: `Monthly Emissions (${year}) (kg CO₂)`,
        data: monthlyTotals,
        borderColor: "#28a745",
        backgroundColor: "rgba(40,167,69,0.1)",
        tension: 0.3
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { position: "top" },
      title: { display: false }
    }
  };

  return <Line options={options} data={chartData} />;
};

export default EmissionsLineChart;