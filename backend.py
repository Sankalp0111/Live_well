from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for cross-origin requests

# Store the latest data
latest_health_data = {}
latest_location_data = {}

@app.route('/health_parameters', methods=['POST'])
def receive_health_data():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid data"}), 400
    
    latest_health_data.update(data)
    print("Received Health Data:", data)
    return jsonify({"message": "Health data received successfully"})

@app.route('/location', methods=['POST'])
def receive_location_data():
    data = request.get_json()
    if not data:
        return jsonify({"error": "Invalid data"}), 400
    
    latest_location_data.update(data)
    print("Received Location Data:", data)
    return jsonify({"message": "Location data received successfully"})

@app.route('/get_health_data', methods=['GET'])
def get_health_data():
    return jsonify(latest_health_data)

@app.route('/get_location_data', methods=['GET'])
def get_location_data():
    return jsonify(latest_location_data)



@app.route('/submit', methods=['POST'])
def receive_data():
    data = request.json  # Get JSON data from the request

    # Store the data in variables
    first_name = data.get('firstName', '')
    last_name = data.get('lastName', '')
    dob = data.get('dob', '')
    gender = data.get('gender', '')
    phone = data.get('phone', '')
    email = data.get('email', '')
    address = data.get('address', '')
    city = data.get('city', '')
    state = data.get('state', '')
    zip_code = data.get('zip', '')
    country = data.get('country', '')
    occupation = data.get('occupation', '')
    marital_status = data.get('maritalStatus', '')
    blood_type = data.get('bloodType', '')
    height = data.get('height', '')
    weight = data.get('weight', '')
    allergies = data.get('allergies', '')
    medications = data.get('medications', '')
    chronic_conditions = data.get('chronicConditions', '')
    past_surgeries = data.get('pastSurgeries', '')
    family_history = data.get('familyHistory', '')
    smoker = data.get('smoker', '')
    alcohol_consumption = data.get('alcoholConsumption', '')
    exercise_frequency = data.get('exerciseFrequency', '')
    emergency_contact_name = data.get('emergencyContactName', '')
    emergency_relationship = data.get('emergencyRelationship', '')
    emergency_phone = data.get('emergencyPhone', '')
    preferred_hospital = data.get('preferredHospital', '')

    # Print the received data
    print(f"Received data: {data}")

    return jsonify({"message": "Data received successfully!"}), 200

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000, debug=True)  # Run the app on port 5000 in debug
