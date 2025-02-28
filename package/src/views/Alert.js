import { useState, useEffect } from "react";

export default function HealthDashboard() {
  const [fallData, setFallData] = useState(null);
  const [healthData, setHealthData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    // Fetch fall detection data first
    fetch("http://192.168.186.32:5000/fall-detection")
      .then((response) => response.json())
      .then((fallResponse) => {
        setFallData(fallResponse);

        if (fallResponse.fallDetected) {
          return fetch("http://192.168.186.32:5000/get_health_data");
        }
        return null;
      })
      .then((healthResponse) => {
        if (healthResponse) {
          return healthResponse.json();
        }
        return null;
      })
      .then((healthData) => {
        if (healthData) {
          setHealthData(healthData);
        }
        setLoading(false);
      })
      .catch((err) => {
        setError("Failed to fetch data");
        setLoading(false);
      });
  }, []);

  const currentDate = new Date();

  return (
    <div
      style={{
        maxWidth: "900px",
        margin: "40px auto",
        padding: "30px",
        backgroundColor: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0 6px 15px rgba(0, 0, 0, 0.1)",
        fontFamily: "Inter, sans-serif",
      }}
    >
      {loading && (
        <p style={{ textAlign: "center", color: "#6b7280", fontSize: "18px" }}>
          Loading...
        </p>
      )}
      {error && (
        <p style={{ textAlign: "center", color: "#dc2626", fontSize: "18px" }}>
          {error}
        </p>
      )}

      {fallData && (
        <>
          {/* Health Overview */}
          {healthData && (
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                padding: "25px",
                borderRadius: "12px",
                backgroundColor: "#ffffff",
                boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)",
                marginBottom: "30px",
              }}
            >
              <div>
                <h2 style={{ fontSize: "22px", fontWeight: "700", color: "#1e40af" }}>
                  Health Alert
                </h2>
                <div style={{ fontSize: "18px", color: "#374151" }}>
                  <div>
                    Heart Rate: <span style={{ fontWeight: "bold" }}>{healthData.heartRate}</span>
                  </div>
                  <div>
                    SPO2: <span style={{ fontWeight: "bold" }}>{healthData.spo2}%</span>
                  </div>
                  <div>
                    Body Temperature: <span style={{ fontWeight: "bold" }}>{healthData.temperature}°C</span>
                  </div>
                </div>
              </div>
              <div style={{ textAlign: "right", fontSize: "16px", color: "#6b7280" }}>
                <div>Date: {currentDate.toLocaleDateString()}</div>
                <div>Time: {currentDate.toLocaleTimeString()}</div>
              </div>
            </div>
          )}

          {/* Fall Alert Section */}
          {fallData.fallDetected && (
            <div
              style={{
                padding: "20px",
                borderRadius: "12px",
                backgroundColor: "#fee2e2",
                borderLeft: "6px solid #dc2626",
              }}
            >
              <p style={{ fontWeight: "700", color: "#b91c1c", fontSize: "18px" }}>
                ⚠ Fall Alert detected
              </p>
              <p style={{ fontSize: "16px", color: "#6b7280" }}>{fallData.timestamp}</p>
              <p style={{ fontSize: "16px", color: "#6b7280" }}>{fallData.details}</p>
              <div style={{ display: "flex", gap: "15px", marginTop: "15px" }}>
                {fallData.images &&
                  fallData.images.map((img, index) => (
                    <img
                      key={index}
                      src={img}
                      alt="Fall Alert"
                      style={{
                        width: "100px",
                        height: "100px",
                        objectFit: "cover",
                        borderRadius: "10px",
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
