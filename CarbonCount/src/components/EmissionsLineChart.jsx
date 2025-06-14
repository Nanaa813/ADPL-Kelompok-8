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

const EmissionsLineChart = () => {
  const data = {
    labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun"],
    datasets: [
      {
        label: "Monthly Emissions (kg CO₂)",
        data: [24, 18, 35, 27, 44, 30],
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

  return <Line options={options} data={data} />;
};

export default EmissionsLineChart;
