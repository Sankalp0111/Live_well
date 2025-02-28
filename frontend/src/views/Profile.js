import React, { useState, useEffect } from "react";
import "./PatientForm.css";

const PatientForm = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    dob: "",
    gender: "",
    phone: "",
    email: "",
    bloodType: "",
    height: "",
    weight: "",
    allergies: "",
    medications: "",
    chronicConditions: "",
    emergencyContactName: "",
    emergencyRelationship: "",
    emergencyPhone: "",
    preferredHospital: "",
  });

  const [selectedSection, setSelectedSection] = useState(0);
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const sections = ["Patient Information", "Health Information", "Emergency Contact"];

  useEffect(() => {
    const savedData = localStorage.getItem("patientReport");
    if (savedData) {
      setFormData(JSON.parse(savedData));
      setSubmitted(true);
    }
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const requiredFields = ["firstName", "lastName", "dob", "gender", "phone", "email", "emergencyContactName", "emergencyPhone"];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(`Please fill in the required field: ${field}`);
        return false;
      }
    }
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setLoading(true);
    try {
      const response = await fetch("http://localhost:5000/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save data");
      }

      localStorage.setItem("patientReport", JSON.stringify(formData));
      setSubmitted(true);
      alert("Patient data submitted successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Error submitting data.");
    } finally {
      setLoading(false);
    }
  };

  const handleEdit = () => {
    setSubmitted(false);
  };

  const handleLogout = () => {
    localStorage.removeItem("patientReport");
    setSubmitted(false);
  };

  return (
    <div className="container">
      <h2>Patient Profile</h2>

      {submitted ? (
        <div className="summary">
          <h3>Patient Summary</h3>
          {Object.entries(formData).map(([key, value]) => (
            <p key={key}>
              <strong>{key.replace(/([A-Z])/g, " $1")}: </strong> {value || "N/A"}
            </p>
          ))}
          <button onClick={handleEdit}>Edit Information</button>
        
        </div>
      ) : (
        <form onSubmit={handleSubmit}>
          <h3>{sections[selectedSection]}</h3>

          {selectedSection === 0 && (
            <div className="form-section">
              <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} placeholder="First Name" required />
              <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} placeholder="Last Name" required />
              <input type="date" name="dob" value={formData.dob} onChange={handleChange} required />
              <select name="gender" value={formData.gender} onChange={handleChange} required>
                <option value="">Select Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <input type="text" name="phone" value={formData.phone} onChange={handleChange} placeholder="Phone Number" required />
              <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="Email" required />
            </div>
          )}

          {selectedSection === 1 && (
            <div className="form-section">
              <input type="text" name="bloodType" value={formData.bloodType} onChange={handleChange} placeholder="Blood Type" />
              <input type="number" name="height" value={formData.height} onChange={handleChange} placeholder="Height (cm)" />
              <input type="number" name="weight" value={formData.weight} onChange={handleChange} placeholder="Weight (kg)" />
              <textarea name="allergies" value={formData.allergies} onChange={handleChange} placeholder="List any allergies"></textarea>
              <textarea name="medications" value={formData.medications} onChange={handleChange} placeholder="Current Medications"></textarea>
              <textarea name="chronicConditions" value={formData.chronicConditions} onChange={handleChange} placeholder="Chronic Conditions"></textarea>
            </div>
          )}

          {selectedSection === 2 && (
            <div className="form-section">
              <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} placeholder="Contact Name" required />
              <input type="text" name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} placeholder="Relationship" />
              <input type="text" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} placeholder="Emergency Phone" required />
              <input type="text" name="preferredHospital" value={formData.preferredHospital} onChange={handleChange} placeholder="Preferred Hospital" />
            </div>
          )}

          <div className="button-group">
            {selectedSection > 0 && (
              <button type="button" className="prev-btn" onClick={() => setSelectedSection(selectedSection - 1)}>
                Previous
              </button>
            )}
            {selectedSection < sections.length - 1 ? (
              <button type="button" className="next-btn" onClick={() => setSelectedSection(selectedSection + 1)}>
                Next
              </button>
            ) : (
              <button type="submit" disabled={loading}>
                {loading ? "Submitting..." : "Submit"}
              </button>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

export default PatientForm;
