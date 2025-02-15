import { useState, useEffect } from "react";

export default function HealthDashboard() {
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Simulating API response with dummy data
    const dummyData = {
      heartRate: 78,
      spo2: 96,
      temperature: 36.5,
      fallAlerts: [
        {
          timestamp: "2025-02-14 14:30:00",
          details: "Detected fall in the living room",
          images: [
            "https://via.placeholder.com/100",
            "https://via.placeholder.com/100",
          ],
        },
      ],
    };

    setTimeout(() => {
      setHealthData(dummyData);
      setLoading(false);
    }, 1000);
  }, []);

  const currentDate = new Date();

  return (
    <div
      style={{
        maxWidth: "900px", // Increased width
        margin: "40px auto",
        padding: "30px", // Increased padding
        backgroundColor: "#ffffff",
        borderRadius: "15px", // Rounded corners
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)", // Larger shadow
        fontFamily: "Inter, sans-serif",
      }}
    >
      {loading && <p style={{ textAlign: "center", color: "#6b7280", fontSize: "18px" }}>Loading...</p>}
      {error && <p style={{ textAlign: "center", color: "#dc2626", fontSize: "18px" }}>{error}</p>}

      {healthData && (
        <>
          {/* Health Overview */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              padding: "25px", // Increased padding
              borderRadius: "12px", // Rounded corners
              backgroundColor: "#ffffff",
              boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)", // Larger shadow
              marginBottom: "30px", // Increased margin
            }}
          >
            <div>
              <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1e40af" }}>
                Health Alert
              </h2>
              <div style={{ fontSize: "18px", color: "#374151" }}>
                <div>Heart Rate: <span style={{ fontWeight: "bold" }}>{healthData.heartRate}</span></div>
                <div>SPO2: <span style={{ fontWeight: "bold" }}>{healthData.spo2}%</span></div>
                <div>Body Temperature: <span style={{ fontWeight: "bold" }}>{healthData.temperature}°C</span></div>
              </div>
            </div>
            <div style={{ textAlign: "right", fontSize: "16px", color: "#6b7280" }}>
              <div>Date: {currentDate.toLocaleDateString()}</div>
              <div>Time: {currentDate.toLocaleTimeString()}</div>
            </div>
          </div>

          {/* Fall Alert Section */}
          {healthData.fallAlerts.length > 0 && (
            <div
              style={{
                padding: "20px", // Increased padding
                borderRadius: "12px", // Rounded corners
                backgroundColor: "#fee2e2",
                borderLeft: "6px solid #dc2626", // Thicker left border
              }}
            >
              <p style={{ fontWeight: "700", color: "#b91c1c", fontSize: "18px" }}>⚠ Fall Alert detected</p>
              <p style={{ fontSize: "16px", color: "#6b7280" }}>{healthData.fallAlerts[0].timestamp}</p>
              <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                {healthData.fallAlerts[0].images.map((img, index) => (
                  <img
                    key={index}
                    src={img}
                    alt="Fall Alert"
                    style={{
                      width: "100px", // Larger images
                      height: "100px",
                      objectFit: "cover",
                      borderRadius: "10px", // More rounded corners
                      border: "1px solid #d1d5db",
                    }}
                  />
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}
