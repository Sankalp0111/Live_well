from flask import Flask, jsonify
from flask_cors import CORS
import random
from pymongo import MongoClient

app = Flask(__name__)
CORS(app)  # Enable CORS for frontend access

# Base values for stability
base_heart_rate = 80
base_temperature = 37.0
base_spo2 = 98

def get_slight_variation(base, range_val):
    return round(base + random.uniform(-range_val / 2, range_val / 2), 1)

@app.route("/health-data", methods=["GET"])
def health_data():
    data = {
        "heart_rate": get_slight_variation(base_heart_rate, 2),
        "temperature": get_slight_variation(base_temperature, 0.2),
        "spo2": get_slight_variation(base_spo2, 0.5),
    }
    return jsonify(data)

# MongoDB Connection
MONGO_URI = "mongodb+srv://vaityjatin13:jatin123@cluster.vbdds.mongodb.net/?retryWrites=true&w=majority&appName=Cluster"

try:
    client = MongoClient(MONGO_URI)
    db_name = "test"  # Replace with the correct database name from MongoDB Atlas
    db = client[db_name]  
    patients_collection = db["patients"]  # Replace with the actual collection name

    print("✅ Connected to MongoDB:", db_name)
except Exception as e:
    print("❌ MongoDB Connection Error:", e)
@app.route("/patients", methods=["GET"])
def get_patients():
    try:
        patients = list(patients_collection.find({}, {"_id": 0}))  # Exclude ObjectId for JSON serialization
        print("📢 Retrieved Patients Data:", patients)  # Console log the data
        return jsonify(patients)
    except Exception as e:
        print("❌ Error Fetching Patients:", str(e))  # Log error to console
        return jsonify({"error": "Failed to fetch patients", "details": str(e)}), 500

if __name__ == "__main__":
    app.run(debug=True)
