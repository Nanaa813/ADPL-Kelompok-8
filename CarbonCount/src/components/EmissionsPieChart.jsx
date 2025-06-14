import {
  Chart as ChartJS,
  ArcElement,
  Tooltip,
  Legend
} from "chart.js";
import { Pie } from "react-chartjs-2";

ChartJS.register(ArcElement, Tooltip, Legend);

const EmissionsPieChart = () => {
  const data = {
    labels: ["Transportation", "Electricity", "Food"],
    datasets: [
      {
        label: "Usage % per Category",
        data: [34.6, 39.1, 26.3],
        backgroundColor: ["#20c997", "#0d6efd", "#ffc107"],
        borderWidth: 1
      }
    ]
  };

  return <Pie data={data} />;
};

export default EmissionsPieChart;
