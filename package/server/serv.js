require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors()); // Allow requests from frontend
app.use(express.json()); // Parse JSON data

// Secure MongoDB Connection
mongoose
  .connect("mongodb+srv://vaityjatin13:130404@cluster.vbdds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster").then(() => console.log("MongoDB connected"))
  .catch((err) => console.log("Database connection error:", err));

// Define Patient Schema & Model
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

// API Routes
app.post("/submit", async (req, res) => {
  try {
    const patient = new Patient(req.body);
    await patient.save();
    res.json({ message: "Patient data saved", id: patient._id });
  } catch (error) {
    res.status(500).json({ error: "Failed to save patient data" });
  }
});

app.get("/patients/:id", async (req, res) => {
  try {
    const patient = await Patient.findById(req.params.id);
    if (!patient) return res.status(404).json({ error: "Patient not found" });
    res.json(patient);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch patient data" });
  }
});

app.put("/update/:id", async (req, res) => {
  try {
    const updatedPatient = await Patient.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!updatedPatient) return res.status(404).json({ error: "Patient not found" });
    res.json({ message: "Patient data updated", data: updatedPatient });
  } catch (error) {
    res.status(500).json({ error: "Failed to update patient data" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
