import React, { useEffect, useState } from "react";
import axios from "axios";
import { Card, CardBody, CardTitle, Row, Col } from "reactstrap";
import { FaHeartbeat, FaTemperatureLow } from "react-icons/fa";
import { GiHealthPotion } from "react-icons/gi";

const Feeds = () => {
  const [healthData, setHealthData] = useState([
    { today: "Heart Rate", title: "Loading..." },
    { today: "Body Temperature", title: "Loading..." },
    { today: "SpO2", title: "Loading..." },
  ]);

  // Define color mapping
  const colorMapping = {
    "Heart Rate": "#0d6efd",
    "Body Temperature": "#ffa500",
    "SpO2": "#00c49f",
  };

  // Define icon mapping
  const iconMapping = {
    "Heart Rate": <FaHeartbeat />,
    "Body Temperature": <FaTemperatureLow />,
    "SpO2": <GiHealthPotion />,
  };

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/health-metrics");
        if (response.data && response.data.length > 0) {
          setHealthData(response.data);
        }
      } catch (error) {
        console.error("Error fetching health data:", error);
      }
    };

    fetchData();
    const interval = setInterval(fetchData, 5000); // Fetch data every 5 seconds
    return () => clearInterval(interval);
  }, []);

  return (
    <Card className="border-0 shadow-sm">
      <CardBody>
        <CardTitle tag="h5" className="text-center mb-3 text-primary">
          Health Metrics
        </CardTitle>
        <Row>
          {healthData.map((item, index) => (
            <Col md="12" key={index} className="mb-2">
              <Card
                className="d-flex flex-row align-items-center p-2 text-white shadow"
                style={{ backgroundColor: colorMapping[item.today] || "#0d6efd" }}
              >
                <div className="me-3" style={{ fontSize: "2.5rem" }}>
                  {iconMapping[item.today] || <FaHeartbeat />}
                </div>
                <div>
                  <h6 className="mb-1">{item.today}</h6>
                  <h5 className="fw-bold">{item.title}</h5>
                </div>
              </Card>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

export default Feeds;
