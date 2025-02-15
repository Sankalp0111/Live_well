require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection (Ensure the correct database `location` is used)
mongoose
  .connect("mongodb://localhost:27017/location", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.error("MongoDB connection error:", err));

// Define GPS Schema and Explicitly Set Collection Name to `location`
const gpsSchema = new mongoose.Schema({
  latitude: Number,
  longitude: Number
}, { collection: "location" }); // Ensure it uses the correct collection

const GPSData = mongoose.model("GPSData", gpsSchema);

app.get("/gps", async (req, res) => {
    try {
      const latestGPSData = await GPSData.findOne().sort({ _id: -1 }); // Get the latest GPS entry
  
      if (latestGPSData) {
        res.json(latestGPSData); // Return only the latest entry
      } else {
        res.status(404).json({ error: "No GPS data found" });
      }
    } catch (error) {
      console.error("Error fetching GPS data:", error);
      res.status(500).json({ error: "Internal server error" });
    }
  });
  

// API to fetch all GPS data from `location` collection (For testing and logging all records)
app.get("/gps/all", async (req, res) => {
  try {
    const allGPSData = await GPSData.find().sort({ _id: 1 }); // Fetch all data sorted by insertion order
    
    console.log("All Fetched GPS Data:", allGPSData); // Log all records to the console

    res.json(allGPSData);
  } catch (error) {
    console.error("Error fetching all GPS data:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Twilio Credentials (Replace these with your actual credentials)
const ACCOUNT_SID = "AC77231b035dc698fdf1b76840fca2638a";
const AUTH_TOKEN = "3238da2b7d2ac75cabf0e8c555502c27";
const TWILIO_PHONE_NUMBER = "+16826289922"; // Your Twilio phone number

const client = twilio(ACCOUNT_SID, AUTH_TOKEN);

// API Endpoint to Send SMS Reminder
app.post("/api/sendReminder", async (req, res) => {
    const { pillName, time, phoneNumber } = req.body;

    // Ensure phone number is in E.164 format (international format)
    const formattedNumber = phoneNumber.startsWith("+") ? phoneNumber : `+91${phoneNumber}`;

    try {
        const messageBody = `Reminder: Take your ${pillName} at ${time}!`;

        const response = await client.messages.create({
            body: messageBody,
            from: TWILIO_PHONE_NUMBER,
            to: formattedNumber,
        });

        res.status(200).json({ success: true, message: "Reminder sent!", response });
    } catch (error) {
        console.error("Twilio Error:", error); // Log the error
        res.status(500).json({ success: false, error: error.message });
    }
});

const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
