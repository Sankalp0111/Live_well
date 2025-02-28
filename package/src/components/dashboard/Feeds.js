import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Button, Spinner } from "reactstrap";
import { FaHeartbeat, FaTemperatureLow } from "react-icons/fa";
import { GiHealthPotion } from "react-icons/gi";

const rawData = [
  [15.3, 98, 34],
  [20.9, 59, 100],
  [17, 77, 125],
  [17.2, 84, 115],
  [18.9, 58, 166],
  [19.8, 92, 150],
  [24.3, 100, 150],
  [31.7, 93, 166],
  [34.3, 100, 214],
  [32.1, 99, 166],
];

const getRandomValue = (value, range) => {
  return (value + (Math.random() * range - range / 2)).toFixed(1);
};

const Feeds = () => {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  useEffect(() => {
    const updateHealthData = () => {
      const randomIndex = Math.floor(Math.random() * rawData.length);
      const heartRate = getRandomValue(rawData[randomIndex][0], 5);
      const bodyTemp = getRandomValue(rawData[randomIndex][1], 3);
      const spo2 = getRandomValue(rawData[randomIndex][2], 10);

      setHealthData([
        { name: "Heart Rate", value: `${heartRate} bpm` },
        { name: "Body Temperature", value: `${bodyTemp}°C` },
        { name: "SpO2", value: `${spo2}%` },
      ]);

      setLoading(false);
    };

    updateHealthData();
    const interval = setInterval(updateHealthData, 300000);
    return () => clearInterval(interval);
  }, []);

  const generateInsights = () => {
    setIsGenerating(true);
    setShowDownload(false);

    setTimeout(() => {
      setIsGenerating(false);
      setShowDownload(true);
    }, 10000);
  };

  const downloadReport = () => {
    const link = document.createElement("a");
    link.href = "/health_report.pdf";
    link.download = "health_report.pdf";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <Card className="border-0 shadow-sm">
      <CardBody>
        <CardTitle tag="h5" className="text-center mb-3 text-primary">
          Health Insights
        </CardTitle>

        <div className="text-center mt-3">
          <Button color="primary" onClick={generateInsights} disabled={isGenerating}>
            {isGenerating ? <Spinner size="sm" /> : "Generate Insight"}
          </Button>
        </div>

        {isGenerating && (
          <div className="text-center mt-3">
            <Spinner color="primary" />
            <p>Generating insights...</p>
          </div>
        )}

        {showDownload && (
          <div className="text-center mt-3">
            <Button color="success" onClick={downloadReport}>
              Download Report
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default Feeds;
