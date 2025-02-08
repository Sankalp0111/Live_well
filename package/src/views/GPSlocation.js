import React, { useEffect, useState } from "react";
import axios from "axios";

const GPSMap = () => {
  const [position, setPosition] = useState({ lat: 19.261639, lng: 73.172007 });

  useEffect(() => {
    const fetchGPSData = async () => {
      try {
        // Replace with your ESP32 API URL
        const response = await axios.get("http://your-esp32-ip/gps");
        const { latitude, longitude } = response.data;

        if (latitude && longitude) {
          setPosition({ lat: latitude, lng: longitude });
        }
      } catch (error) {
        console.error("Error fetching GPS data:", error);
      }
    };

    // Fetch GPS data every 5 seconds
    const interval = setInterval(fetchGPSData, 5000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div>
      <h2>Live GPS Location</h2>
      <iframe
        title="gps-map"
        width="100%"
        height="500"
        src={`https://www.openstreetmap.org/export/embed.html?bbox=${position.lng - 0.01},${position.lat - 0.01},${position.lng + 0.01},${position.lat + 0.01}&layer=mapnik&marker=${position.lat},${position.lng}`}
        style={{ border: "1px solid black" }}
      ></iframe>
      <p>Latitude: {position.lat}, Longitude: {position.lng}</p>
    </div>
  );
};

export default GPSMap;
