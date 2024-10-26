import mysql.connector
from flask import Flask, request, jsonify
import joblib
import numpy as np
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained Logistic Regression model
model = joblib.load('./logistic_regression_model.pkl')

# Load the prognosis labels, allowing pickled objects (strings in this case)
prognosis_labels = np.load('./prognosis_labels.npy', allow_pickle=True)

# List of all symptoms for model input
with open('./symptom_columns.json', 'r') as f:
    symptom_columns = json.load(f)

# Set up MySQL connection
db = mysql.connector.connect(
    host="localhost",
    user="root",
    password="Pitou111122223333",
    database="carenest"
)

def get_description(prognosis):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT description FROM carenest.disease WHERE name = %s", (prognosis,))
    result = cursor.fetchone()
    cursor.close()
    return result['description'] if result else "Description not found."

def get_precautions(prognosis):
    cursor = db.cursor(dictionary=True)
    cursor.execute("SELECT precaution1, precaution2, precaution3, precaution4 FROM carenest.disease WHERE name = %s", (prognosis,))
    result = cursor.fetchone()
    cursor.close()
    return [result[key] for key in result if result[key]] if result else []

@app.route('/predict', methods=['POST'])
def predict():
    try:
        data = request.json['symptoms']
        print(f"Received symptoms: {data}")

        input_data = np.zeros(len(symptom_columns))

        for symptom in data:
            if symptom in symptom_columns:
                index = symptom_columns.index(symptom)
                input_data[index] = 1
            else:
                print(f"Warning: '{symptom}' is not a valid symptom in the model's feature set.")

        input_data = input_data.reshape(1, -1)
        prognosis_index = model.predict(input_data)[0]
        prognosis = prognosis_labels[prognosis_index] if isinstance(prognosis_index, int) else prognosis_index

        precautions = get_precautions(prognosis)
        description = get_description(prognosis)

        return jsonify({
            'prognosis': prognosis,
            'description': description,
            'precautions': precautions
        })
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")
        return jsonify({'error': str(e)})

if __name__ == '__main__':
    app.run(debug=True)
