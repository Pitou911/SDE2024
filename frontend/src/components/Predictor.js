import React, { useEffect, useState } from "react";
import axios from "axios";
import Select from "react-select"; // Import react-select

const Predictor = () => {
  const [symptomsList, setSymptomsList] = useState([]);
  const [selectedSymptoms, setSelectedSymptoms] = useState([]);
  const [prediction, setPrediction] = useState(null);
  const [precautions, setPrecautions] = useState([]);
  const [description, setDescription] = useState("");
  const [error, setError] = useState("");
  useEffect(() => {
    axios
      .get("/datas/symptom_columns.json")
      .then((response) => {
        setSymptomsList(response.data);
      })
      .catch((error) => {
        console.error("Error Loading symptom list: ", error);
      });
  }, []);

  const options = symptomsList.map((symptom) => ({
    value: symptom,
    label: symptom.replace(/_/g, " "), // Format for display
  }));

  const handleChange = (selectedOptions) => {
    setSelectedSymptoms(selectedOptions.map((option) => option.value)); // Extract values from selected options
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    setError("");
    setPrediction(null);
    setPrecautions([]);
    setDescription("");
    // Check if any symptom is selected
    if (selectedSymptoms.length === 0) {
      setError("Please select at least one symptom.");
      return;
    }
    try {
      const response = await axios.post(
        "http://127.0.0.1:5000/predict",
        {
          symptoms: selectedSymptoms,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );
      setPrediction(response.data.prognosis);
      setPrecautions(response.data.precautions || []);
      setDescription(response.data.description);
    } catch (err) {
      console.error(err);
      setError("Error occurred while making the prediction.");
    }
  };

  return (
    <div>
      <h1>Prognosis Predictor</h1>
      <form onSubmit={handleSubmit}>
        <h3>Select Symptoms:</h3>
        <Select
          isMulti
          options={options}
          onChange={handleChange}
          placeholder='Search and select symptoms...'
        />
        <br />
        <button type='submit'>Predict</button>
      </form>
      {error && <p style={{ color: "red" }}>{error}</p>}
      {prediction && <h2>Predicted Prognosis: {prediction}</h2>}
      {precautions.length > 0 && (
        <div>
          <h3>Precautions:</h3>
          <ul>
            {precautions.map((precaution, index) => (
              <li key={index}>{precaution}</li>
            ))}
          </ul>
        </div>
      )}
      {description && (
        <div>
          <h3>Description:</h3>
          <p>{description}</p>
        </div>
      )}
    </div>
  );
};

export default Predictor;
