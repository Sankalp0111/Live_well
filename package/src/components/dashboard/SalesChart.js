import { useState, useEffect } from "react";
import { Line } from "react-chartjs-2";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend);

// Set stable base values
let baseHeartRate = 80;  // Stable around 80 bpm
let baseTemperature = 37.0;  // Stable around 37.0°C
let baseSpO2 = 98;  // Stable around 98%

// Function to generate very small variations
const getSlightVariation = (base, range) => {
  return (base + (Math.random() * range - range / 2)).toFixed(1);
};

const HealthChart = () => {
  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      { label: "Heart Rate (bpm)", data: [], borderColor: "#FF5733", borderWidth: 2 },
      { label: "Temperature (°C)", data: [], borderColor: "#33C4FF", borderWidth: 2 },
      { label: "SpO2 (%)", data: [], borderColor: "#28A745", borderWidth: 2 },
    ],
  });

  useEffect(() => {
    const updateChartData = () => {
      setChartData((prevData) => {
        const time = [...prevData.labels, new Date().toLocaleTimeString()].slice(-10);
        
        const heartRate = [
          ...prevData.datasets[0].data,
          parseFloat(getSlightVariation(baseHeartRate, 2)), // Very small fluctuation (±1 bpm)
        ].slice(-10);

        const temperature = [
          ...prevData.datasets[1].data,
          parseFloat(getSlightVariation(baseTemperature, 0.2)), // Minimal fluctuation (±0.1°C)
        ].slice(-10);

        const spo2 = [
          ...prevData.datasets[2].data,
          parseFloat(getSlightVariation(baseSpO2, 0.5)), // Tiny fluctuation (±0.25%)
        ].slice(-10);

        return {
          labels: time,
          datasets: [
            { label: "Heart Rate (bpm)", data: heartRate, borderColor: "#FF5733", borderWidth: 2 },
            { label: "Temperature (°C)", data: temperature, borderColor: "#33C4FF", borderWidth: 2 },
            { label: "SpO2 (%)", data: spo2, borderColor: "#28A745", borderWidth: 2 },
          ],
        };
      });
    };

    updateChartData();
    const interval = setInterval(updateChartData, 300000); // Update every 5 minutes

    return () => clearInterval(interval);
  }, []);

  const options = {
    responsive: true,
    plugins: { legend: { display: true } },
    scales: {
      x: { title: { display: true, text: "Time" } },
      y: { title: { display: true, text: "Values" } },
    },
  };

  return (
    <div>
      <h3>Live Health Monitoring</h3>
      <Line data={chartData} options={options} />
    </div>
  );
};

export default HealthChart;
