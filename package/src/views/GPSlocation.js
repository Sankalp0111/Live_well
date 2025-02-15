import React, { useEffect, useState } from "react";

const GPSMap = () => {
  const [position, setPosition] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchGPSData = async () => {
      try {
        const response = await fetch("http://192.168.186.122:5000/get_location_data");
        if (!response.ok) throw new Error("Failed to fetch location data");
        
        const data = await response.json();
        console.log("Received Data:", data);

        if (data.latitude !== undefined && data.longitude !== undefined) {
          setPosition({ lat: data.latitude, lng: data.longitude });
        } else {
          setError("Invalid GPS data received");
        }
      } catch (err) {
        console.error("Error fetching GPS data:", err);
        setError("Error fetching GPS data");
      }
    };

    fetchGPSData(); // Fetch immediately
    const interval = setInterval(fetchGPSData, 10000); // Fetch every 10 sec
    return () => clearInterval(interval);
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "20px" }}>
      <h2>Live GPS Location</h2>
      {error ? (
        <p style={{ color: "red" }}>{error}</p>
      ) : position ? (
        <>
          <iframe
            title="gps-map"
            width="100%"
            height="500"
            src={`https://www.openstreetmap.org/export/embed.html?bbox=${position.lng - 0.01},${position.lat - 0.01},${position.lng + 0.01},${position.lat + 0.01}&layer=mapnik&marker=${position.lat},${position.lng}`}
            style={{ border: "1px solid black" }}
          ></iframe>
          <p><strong>Latitude:</strong> {position.lat}</p>
          <p><strong>Longitude:</strong> {position.lng}</p>
        </>
      ) : (
        <p>Loading GPS data...</p>
      )}
    </div>
  );
};

export default GPSMap;
