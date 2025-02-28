import React, { useEffect, useState } from "react";
import { Card, CardBody, CardTitle, Button, Spinner } from "reactstrap";
import { FaHeartbeat, FaTemperatureLow } from "react-icons/fa";
import { GiHealthPotion } from "react-icons/gi";

const Feeds = () => {
  const [healthData, setHealthData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isGenerating, setIsGenerating] = useState(false);
  const [showDownload, setShowDownload] = useState(false);

  const fetchHealthData = async () => {
    try {
      const response = await fetch("http://127.0.0.1:5000/health-data");
      const data = await response.json();

      setHealthData([
        { name: "Heart Rate", value: `${data.heart_rate} bpm`, icon: <FaHeartbeat size={28} color="#ff4d4f" /> },
        { name: "Body Temperature", value: `${data.temperature}°C`, icon: <FaTemperatureLow size={28} color="#1890ff" /> },
        { name: "SpO2", value: `${data.spo2}%`, icon: <GiHealthPotion size={28} color="#52c41a" /> },
      ]);

      setLoading(false);
    } catch (error) {
      console.error("Error fetching health data:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchHealthData();
    const interval = setInterval(fetchHealthData, 5000);
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
    <Card className="border-0 shadow p-4 rounded" style={{ background: "#f0f8ff", borderColor: "#1890ff" }}>
      <CardBody>
        <CardTitle tag="h4" className="text-center mb-4" style={{ color: "#1890ff", fontWeight: "bold" }}>
          Health Insights
        </CardTitle>

        {loading ? (
          <div className="text-center">
            <Spinner color="primary" />
            <p className="mt-2" style={{ color: "#595959" }}>Fetching latest health data...</p>
          </div>
        ) : (
          <div>
            {healthData.map((item, index) => (
              <Card key={index} className="d-flex flex-row align-items-center shadow-sm mb-3 p-3 border-0" style={{ background: "#ffffff", borderRadius: "12px" }}>
                <div className="me-3">{item.icon}</div>
                <div>
                  <h6 style={{ color: "#595959", fontWeight: "bold" }}>{item.name}</h6>
                  <p style={{ fontSize: "16px", color: "#333", margin: 0 }}>{item.value}</p>
                </div>
              </Card>
            ))}
          </div>
        )}

        <div className="text-center mt-4">
          <Button color="primary" onClick={generateInsights} disabled={isGenerating} style={{ background: "#1890ff", borderColor: "#1890ff" }}>
            {isGenerating ? <Spinner size="sm" /> : "Generate Insights"}
          </Button>
        </div>

        {isGenerating && (
          <div className="text-center mt-3">
            <Spinner color="primary" />
            <p className="mt-2" style={{ color: "#595959" }}>Processing insights...</p>
          </div>
        )}

        {showDownload && (
          <div className="text-center mt-4">
            <Button color="success" onClick={downloadReport} style={{ background: "#52c41a", borderColor: "#52c41a" }}>
              Download Report
            </Button>
          </div>
        )}
      </CardBody>
    </Card>
  );
};

export default Feeds;
