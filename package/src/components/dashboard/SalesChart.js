import { useState, useEffect } from "react";
import { Card, CardBody, CardSubtitle } from "reactstrap";
import Chart from "react-apexcharts";

const HealthChart = () => {
  const [healthData, setHealthData] = useState({
    heartRate: [],
    bodyTemperature: [],
    spo2: [],
    categories: [],
  });

  useEffect(() => {
    // Mock health data
    const mockData = [
      { timestamp: "10:00 AM", heartRate: 102, bodyTemperature: 36.8, spo2: 98 },
      { timestamp: "10:30 AM", heartRate: 104, bodyTemperature: 37.0, spo2: 97 },
      { timestamp: "11:00 AM", heartRate: 101, bodyTemperature: 36.7, spo2: 99 },
      { timestamp: "11:30 AM", heartRate: 106, bodyTemperature: 37.2, spo2: 96 },
      { timestamp: "12:00 PM", heartRate: 108, bodyTemperature: 37.5, spo2: 95 },
    ];

    setHealthData({
      heartRate: mockData.map((d) => d.heartRate),
      bodyTemperature: mockData.map((d) => d.bodyTemperature),
      spo2: mockData.map((d) => d.spo2),
      categories: mockData.map((d) => d.timestamp),
    });
  }, []);

  const options = {
    chart: { toolbar: { show: false } },
    dataLabels: { enabled: false },
    stroke: { curve: "smooth", width: 3 },
    xaxis: { categories: healthData.categories },
    colors: ["#0d6efd", "#ffa500", "#00c49f"],
    legend: { show: true },
  };

  const series = [
    { name: "Heart Rate (bpm)", data: healthData.heartRate },
    { name: "Body Temperature (°C)", data: healthData.bodyTemperature },
    { name: "SpO2 (%)", data: healthData.spo2 },
  ];

  return (
    <Card>
      <CardBody>
        <CardSubtitle className="text-muted" tag="h6">
          Real-time Health Monitoring
        </CardSubtitle>
        <Chart options={options} series={series} type="line" height="379" />
      </CardBody>
    </Card>
  );
};

export default HealthChart;
