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

  const [selectedSection, setSelectedSection] = useState("patientInfo");
  const [showSummary, setShowSummary] = useState(false);

  // Load data from localStorage on component mount
  useEffect(() => {
    const savedData = localStorage.getItem("patientFormData");
    if (savedData) {
      setFormData(JSON.parse(savedData));
    }
  }, []);

  // Save data to localStorage whenever formData changes
  useEffect(() => {
    localStorage.setItem("patientFormData", JSON.stringify(formData));
  }, [formData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setShowSummary(true);

    try {
      const response = await fetch("http://192.168.71.122:5000/submit", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();
      if (!response.ok) {
        throw new Error(data.error || "Failed to save data");
      }

      console.log("Response from server:", data);
      alert("Patient data submitted successfully!");
    } catch (error) {
      console.error("Error sending data:", error);
      alert("Failed to submit patient data. Please try again.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white shadow-md rounded-lg">
      <h2 className="text-2xl font-bold text-center mb-4">Patient Profile</h2>

      {!showSummary ? (
        <>
          <div className="flex justify-center gap-4 mb-4">
            <button
              onClick={() => setSelectedSection("patientInfo")}
              className={`px-4 py-2 rounded border ${
                selectedSection === "patientInfo"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black border-gray-400"
              }`}
            >
              Patient Info
            </button>
            <button
              onClick={() => setSelectedSection("healthInfo")}
              className={`px-4 py-2 rounded border ${
                selectedSection === "healthInfo"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black border-gray-400"
              }`}
            >
              Health Info
            </button>
            <button
              onClick={() => setSelectedSection("emergencyContact")}
              className={`px-4 py-2 rounded border ${
                selectedSection === "emergencyContact"
                  ? "bg-blue-500 text-white"
                  : "bg-white text-black border-gray-400"
              }`}
            >
              Emergency Contact
            </button>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {selectedSection === "patientInfo" && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Patient Info</h3>
                <input type="text" name="firstName" value={formData.firstName} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Enter First Name" />
                <input type="text" name="lastName" value={formData.lastName} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Enter Last Name" />
                <input type="date" name="dob" value={formData.dob} onChange={handleChange} className="border p-2 w-full mb-2" />
                <select name="gender" value={formData.gender} onChange={handleChange} className="border p-2 w-full mb-2">
                  <option value="">Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
                <input type="text" name="phone" value={formData.phone} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Enter Phone Number" />
                <input type="email" name="email" value={formData.email} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Enter Email" />
              </div>
            )}

            {selectedSection === "healthInfo" && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Health Info</h3>
                <input type="text" name="bloodType" value={formData.bloodType} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Enter Blood Type" />
                <input type="number" name="height" value={formData.height} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Enter Height (cm)" />
                <input type="number" name="weight" value={formData.weight} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Enter Weight (kg)" />
                <textarea name="allergies" value={formData.allergies} onChange={handleChange} className="border p-2 w-full mb-2" rows="2" placeholder="List any allergies"></textarea>
              </div>
            )}

            {selectedSection === "emergencyContact" && (
              <div>
                <h3 className="text-xl font-semibold mb-3">Emergency Contact</h3>
                <input type="text" name="emergencyContactName" value={formData.emergencyContactName} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Enter Emergency Contact Name" />
                <input type="text" name="emergencyRelationship" value={formData.emergencyRelationship} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Enter Relationship" />
                <input type="text" name="emergencyPhone" value={formData.emergencyPhone} onChange={handleChange} className="border p-2 w-full mb-2" placeholder="Enter Emergency Phone" />
              </div>
            )}

            <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded mt-4">Submit</button>
          </form>
        </>
      ) : (
        <div className="p-6 bg-gray-100 rounded-lg">
          <h3 className="text-xl font-bold mb-4">Patient Summary</h3>
          {Object.entries(formData).map(([key, value]) => (
            <p key={key} className="mb-2"><strong>{key.replace(/([A-Z])/g, ' $1')}: </strong> {value}</p>
          ))}
          <button onClick={() => setShowSummary(false)} className="mt-4 px-4 py-2 bg-blue-500 text-white rounded">
            Edit Information
          </button>
        </div>
      )}
    </div>
  );
};

export default PatientForm;
