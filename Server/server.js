require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors());
app.use(bodyParser.json());

// MongoDB Connection
mongoose
  .connect("mongodb+srv://vaityjatin13:jatin123@cluster.vbdds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster", { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.error("MongoDB Connection Error:", err));

// Patient Schema
const patientSchema = new mongoose.Schema({
  firstName: String,
  lastName: String,
  dob: String,
  gender: String,
  phone: String,
  email: String,
  bloodType: String,
  height: String,
  weight: String,
  allergies: String,
  medications: String,
  chronicConditions: String,
  emergencyContactName: String,
  emergencyRelationship: String,
  emergencyPhone: String,
  preferredHospital: String,
});

const Patient = mongoose.model("Patient", patientSchema);

// Route to Save Patient Data
app.post("/submit", async (req, res) => {
  try {
    const newPatient = new Patient(req.body);
    await newPatient.save();
    res.status(201).json({ message: "Patient data saved successfully!" });
  } catch (error) {
    res.status(500).json({ error: "Error saving patient data" });
  }
});

// Route to Fetch All Patients
app.get("/patients", async (req, res) => {
  try {
    const patients = await Patient.find();
    res.json(patients);
  } catch (error) {
    res.status(500).json({ error: "Error fetching patients" });
  }
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

