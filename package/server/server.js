const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const twilio = require("twilio");

const app = express();
app.use(cors());
app.use(bodyParser.json());

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

// Start the Server
const PORT = 5000;
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
