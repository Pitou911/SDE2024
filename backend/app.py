from flask import Flask, request, jsonify
import joblib
import numpy as np
import pandas as pd
import json
from flask_cors import CORS

app = Flask(__name__)
CORS(app)

# Load the trained Logistic Regression model
model = joblib.load('./../training_model/logistic_regression_model.pkl')

# Load the prognosis labels, allowing pickled objects (strings in this case)
prognosis_labels = np.load('./../training_model/prognosis_labels.npy', allow_pickle=True)

# Load the precautions dataset
precautions_df = pd.read_csv('./../training_model/symptom_precaution.csv')  # This CSV contains "Prognosis" and "Precautions" columns

# Load the descriptions dataset
descriptions_df = pd.read_csv('./../training_model/symptom_Description.csv')

# List of all symptoms for model input
with open('symptom_columns.json', 'r') as f:
    symptom_columns = json.load(f)


def get_description(prognosis):
    description_row = descriptions_df[descriptions_df['Prognosis'] == prognosis]
    
    if not description_row.empty:
        return description_row['Description'].values[0]  # Return the first description found
    else:
        return "Description not found."

# Function to get precautions based on the predicted prognosis
def get_precautions(prognosis):
    precautions_row = precautions_df[precautions_df['Prognosis'] == prognosis]
    
    if not precautions_row.empty:
        # Collect all precaution columns into a list and filter out None or empty strings
        precautions = []
        for col in precautions_row.columns[1:]:  # Skip the 'Prognosis' column
            if pd.notna(precautions_row[col].values[0]) and precautions_row[col].values[0] != '':
                precautions.append(precautions_row[col].values[0])
        return precautions
    else:
        return []

@app.route('/predict', methods=['POST'])
def predict():
    try:
        # Get the input data (symptoms) from the request JSON
        data = request.json['symptoms']
        print(f"Received symptoms: {data}")  # Log the received symptoms

        # Initialize an array of zeros for the input features
        input_data = np.zeros(len(symptom_columns))

        # Encode the symptoms into the input array
        for symptom in data:
            if symptom in symptom_columns:
                index = symptom_columns.index(symptom)
                input_data[index] = 1  # Mark presence of symptom
            else:
                print(f"Warning: '{symptom}' is not a valid symptom in the model's feature set.")

        # Reshape the input to match the model's input shape
        input_data = input_data.reshape(1, -1)

        # Debugging: Print the shape of the input data and expected shape
        print(f"Input data shape: {input_data.shape}, Expected shape: (1, {len(symptom_columns)})")

        # Check if the input data shape matches the model's expected input
        if input_data.shape[1] != len(symptom_columns):
            raise ValueError(f"Expected input shape (1, {len(symptom_columns)}), but got {input_data.shape}.")

        # Predict using the trained model
        prognosis_index = model.predict(input_data)[0]  # Get the predicted prognosis index

        # Use the predicted index to find the corresponding prognosis label
        prognosis = prognosis_labels[prognosis_index] if isinstance(prognosis_index, int) else prognosis_index

        # Get the precautions for the predicted prognosis
        precautions = get_precautions(prognosis)

        # Get the description for the predicted prognosis
        description = get_description(prognosis)

        return jsonify({
            'prognosis': prognosis,
            'description': description,
            'precautions': precautions
        })
    
    except Exception as e:
        print(f"Error occurred: {str(e)}")  # Log the error
        return jsonify({'error': str(e)})



if __name__ == '__main__':
    app.run(debug=True)
